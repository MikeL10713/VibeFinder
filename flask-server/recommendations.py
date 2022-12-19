import requests
from clientCredentials import client_id, client_secret 
import math

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

# these will be taken from user input
target_track_name = "message in a bottle"
target_track_artist = "taylor swift"
new_artist = "twice"
recommendation_count = 3

# searching for target track given name and artist by user
querystring = {"q": target_track_name + " artist:" + target_track_artist,"type":"track"}
response = requests.get("https://api.spotify.com/v1/search",headers=headers,params=querystring)
target_track = response.json().get("tracks").get("items")[0]

# searching for all of the albums by new artist
querystring = {"q":new_artist,"type":"artist"}
response = requests.get("https://api.spotify.com/v1/search",headers=headers,params=querystring)
artist_id = response.json().get("artists").get("items")[0].get("id")
new_artist_name = response.json().get("artists").get("items")[0].get("name")
querystring = {"limit":50}
response = requests.get("https://api.spotify.com/v1/artists/" + artist_id + "/albums",headers=headers,params=querystring)
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
target_valence = target_audio_features.get("valence")

# selecting the three tracks with the least euclidean distance from the target track to be recommended
# making a dict to map track ids to their euclidean distance with placeholder values
recommended_track_ids = dict()
for i in range(0, recommendation_count): recommended_track_ids[i] = 13
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
      valence = track.get("valence")
      euclidean_distance = math.sqrt(pow((target_danceability - danceability), 2) + pow((target_energy - energy), 2) + pow((target_valence - valence), 2))
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
      valence = track.get("valence")
      euclidean_distance = math.sqrt(pow((target_danceability - danceability), 2) + pow((target_energy - energy), 2) + pow((target_valence - valence), 2))
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

print(recommended_track_ids)