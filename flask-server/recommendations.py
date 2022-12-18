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

# these will be taken from user input
target_track_name = "message in a bottle"
target_track_artist = "taylor swift"
new_artist = "michae jackson"

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
      # extra albums are added to make the result reach 50
  # thus, we have to make sure our chosen artist actually contributed to the album before we add it 
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
for id in album_ids:
  querystring = {"limit":50}
  response = requests.get("https://api.spotify.com/v1/albums/" + id + "/tracks",headers=headers,params=querystring)
  tracks = response.json().get("items")
  for tr in tracks:
    if (tr.get("name") not in unique_track_names):
      all_tracks.append(tr)
    unique_track_names.add(tr.get("name"))

for t in all_tracks: print(t.get("name"))
print(len(all_tracks))

  


