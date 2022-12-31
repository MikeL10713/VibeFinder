import requests
from clientCredentials import client_id, client_secret 

# setup for making API calls
data = {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
}
auth_response = requests.post("https://accounts.spotify.com/api/token", data=data)
access_token = auth_response.json().get('access_token')
headers = {
    'Authorization': 'Bearer {}'.format(access_token)
}

# function that server.py can call to provide a response for front end
def get_recommendations(target_track_name_search_query, target_track_artist_search_query, new_artist_search_query, recommendation_count):
  # searching for target track given name and artist by user
  querystring = {"q": target_track_name_search_query + " artist:" + target_track_artist_search_query,"type":"track"}
  response = requests.get("https://api.spotify.com/v1/search",headers=headers,params=querystring)
  target_track = response.json().get("tracks").get("items")[0]

  # searching for all of the albums by new artist
  querystring = {"q":new_artist_search_query,"type":"artist"}
  response = requests.get("https://api.spotify.com/v1/search",headers=headers,params=querystring)
  new_artist_id = response.json().get("artists").get("items")[0].get("id")
  new_artist_name = response.json().get("artists").get("items")[0].get("name")
  new_artist_image_url = response.json().get("artists").get("items")[0].get("images")[0].get("url")
  querystring = {"limit":50}
  response = requests.get("https://api.spotify.com/v1/artists/" + new_artist_id + "/albums",headers=headers,params=querystring)
  albums = response.json().get("items")

  # spotify can have multiple albums with the same name so we only take unique names to prevent execessive data
  unique_album_names = set()
  album_ids = []
  for al in albums:
    # because our limit is set to 50 in order to make sure we capture all of an artist's albums, 
        # extra albums are added to make the result reach 50 albums
    # thus, we have to make sure our chosen artist actually contributed to an album before we add it 
    artists_of_this_album = []
    for ar in al.get("artists"):
      artists_of_this_album.append(ar.get("name"))
    if (new_artist_name in artists_of_this_album):  
      if (al.get("name") not in unique_album_names):
        album_ids.append(al.get("id"))
      unique_album_names.add(al.get("name"))

  # for every album, we get every track in it while still watching out for repeats
  unique_track_names = set()
  all_tracks = []
  while album_ids:
    # we have to process the albums in batches of 20 (api limit for getting multiple albums)
    if len(album_ids) > 20:
      ids = ",".join(album_ids[:20])
      querystring = {"ids":ids}
      response = requests.get("https://api.spotify.com/v1/albums",headers=headers,params=querystring)
      albums = response.json()
      for album in albums.get("albums"):
        id = album.get("id")
        querystring = {"limit":50}
        response = requests.get("https://api.spotify.com/v1/albums/" + id + "/tracks",headers=headers,params=querystring)
        tracks = response.json().get("items")
        for tr in tracks:
          if (tr.get("name") not in unique_track_names):
            all_tracks.append(tr)
          unique_track_names.add(tr.get("name"))
      album_ids = album_ids[20:]
    else:        
      ids = ",".join(album_ids)
      querystring = {"ids":ids}
      response = requests.get("https://api.spotify.com/v1/albums",headers=headers,params=querystring)
      albums = response.json()
      for album in albums.get("albums"):
        id = album.get("id")
        querystring = {"limit":50}
        response = requests.get("https://api.spotify.com/v1/albums/" + id + "/tracks",headers=headers,params=querystring)
        tracks = response.json().get("items")
        for tr in tracks:
          if (tr.get("name") not in unique_track_names):
            all_tracks.append(tr)
          unique_track_names.add(tr.get("name"))
      album_ids = []

  # getting the audio features of the target track
  response = requests.get("https://api.spotify.com/v1/audio-features/" + target_track.get("id"),headers=headers)
  target_audio_features = response.json()
  target_danceability = target_audio_features.get("danceability")
  target_energy = target_audio_features.get("energy")
  target_instrumentalness = target_audio_features.get("instrumentalness")
  target_speechiness = target_audio_features.get("speechiness")
  target_valence = target_audio_features.get("valence")

  # euclidean distance function allows for modifying number of audio features and adding weights to certain features
  import math

  def find_euclidean_distance(danceA, energyA, instrA, speechA, valenA, danceB, energyB, instrB, speechB, valenB):
    return math.sqrt(.6 * pow((danceA - danceB), 2) + 1 * pow((energyA - energyB), 2) + .5 * pow((instrA - instrB), 2) + .5 * pow((speechA - speechB), 2) + 1 * pow((valenA - valenB), 2))

  # selecting the three tracks with the least euclidean distance from the target track to be recommended
  # making a dict to map track ids to their euclidean distance with placeholder values
  recommended_track_ids = dict()
  for i in range(0, int(recommendation_count)): recommended_track_ids[i] = 13
  # getting all track ids to iterate through
  all_track_ids = []
  for tr in all_tracks:
    all_track_ids.append(tr.get("id"))
  while all_track_ids:
    # we have to process the tracks in batches of 100 (api limit for getting audio features)
    if len(all_track_ids) > 100:
      ids = ",".join(all_track_ids[:100])
      querystring = {"ids":ids}
      response = requests.get("https://api.spotify.com/v1/audio-features",headers=headers,params=querystring)
      response_audio_features = response.json().get("audio_features")
      for track in response_audio_features:
        danceability = track.get("danceability")
        energy = track.get("energy")
        instrumentalness = track.get("instrumentalness")
        speechiness = track.get("speechiness")
        valence = track.get("valence")
        euclidean_distance = find_euclidean_distance(target_danceability, target_energy, target_instrumentalness, target_speechiness, target_valence, danceability, energy, instrumentalness, speechiness, valence)
        # go through and replace the largest euclidean distance in the dict if the current one is smaller
        largest_euclidean_distance = 0
        corresponding_slot = 0
        for slot in recommended_track_ids:
          if recommended_track_ids[slot] > largest_euclidean_distance:
            largest_euclidean_distance = recommended_track_ids[slot]
            corresponding_slot = slot
        if euclidean_distance < largest_euclidean_distance:
          recommended_track_ids.pop(corresponding_slot)
          recommended_track_ids[track.get("id")] = euclidean_distance
      all_track_ids = all_track_ids[100:]
    else:        
      ids = ",".join(all_track_ids)
      querystring = {"ids":ids}
      response = requests.get("https://api.spotify.com/v1/audio-features",headers=headers,params=querystring)
      response_audio_features = response.json().get("audio_features")
      for track in response_audio_features:
        danceability = track.get("danceability")
        energy = track.get("energy")
        instrumentalness = track.get("instrumentalness")
        speechiness = track.get("speechiness")
        valence = track.get("valence")
        euclidean_distance = find_euclidean_distance(target_danceability, target_energy, target_instrumentalness, target_speechiness, target_valence, danceability, energy, instrumentalness, speechiness, valence)
        # go through and replace the largest euclidean distance in the dict if the current one is smaller
        largest_euclidean_distance = 0
        corresponding_slot = 0
        for slot in recommended_track_ids:
          if recommended_track_ids[slot] > largest_euclidean_distance:
            largest_euclidean_distance = recommended_track_ids[slot]
            corresponding_slot = slot
        if euclidean_distance < largest_euclidean_distance:
          recommended_track_ids.pop(corresponding_slot)
          recommended_track_ids[track.get("id")] = euclidean_distance
      all_track_ids = []
  
  # front end needs:
    # new artist's name and picture
      # obtained before when searching for new artist
    # target track's name, album, artist, album cover, and link to playback sample
  target_track_name = target_track.get("name")
  target_track_album = target_track.get("album").get("name")
  target_track_artists = ""
  for ar in target_track.get("artists"):
    target_track_artists += ar.get("name") + ", "
  target_track_artists = target_track_artists[:len(target_track_artists) - 2]
  target_track_album_cover_url = target_track.get("album").get("images")[0].get("url")
  target_track_audio_preview_url = target_track.get("preview_url")

    # name, album, artist, album cover, and link to playback sample for each recommended track
  recommended_track_names = []
  recommended_track_albums = []
  recommended_track_artists = []
  recommended_track_album_cover_urls = []
  recommended_track_audio_preview_urls = []
  ids = ",".join(recommended_track_ids)
  querystring = {"ids":ids}
  response = requests.get("https://api.spotify.com/v1/tracks",headers=headers,params=querystring)
  recommended_tracks = response.json().get("tracks")
  for tr in recommended_tracks:
    recommended_track_names.append(tr.get("name"))
    recommended_track_albums.append(tr.get("album").get("name"))
    rtas = ""
    for ar in tr.get("artists"):
      rtas += ar.get("name") + ", "
    recommended_track_artists.append(rtas[:len(rtas) - 2])
    recommended_track_album_cover_urls.append(tr.get("album").get("images")[0].get("url"))
    recommended_track_audio_preview_urls.append(tr.get("preview_url"))

  # json format for front end
  data_for_front_end = {
    "new_artist_name": new_artist_name,
    "new_artist_image_url": new_artist_image_url,
    "target_track_name": target_track_name,
    "target_track_album": target_track_album,
    "target_track_artists": target_track_artists,
    "target_track_album_cover_url": target_track_album_cover_url,
    "target_track_audio_preview_url": target_track_audio_preview_url,
    "recommended_track_names": recommended_track_names,
    "recommended_track_albums": recommended_track_albums,
    "recommended_track_artists": recommended_track_artists,
    "recommended_track_album_cover_urls": recommended_track_album_cover_urls,
    "recommended_track_audio_preview_urls": recommended_track_audio_preview_urls,
  }

  return data_for_front_end