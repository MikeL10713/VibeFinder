from flask import Flask, request
import json
from recommendations import get_recommendations

app = Flask(__name__)

# initial page is passed no search results so nothing is displayed other than search bar
@app.route("/initial")
def get_data():
  return {
    "new_artist_name": "",
    "new_artist_image_url": "",
    "target_track_name": "",
    "target_track_album": "",
    "target_track_artists": "",
    "target_track_album_cover_url": "",
    "target_track_audio_preview_url": "",
    "recommended_track_names": [],
    "recommended_track_albums": [],
    "recommended_track_artists": [],
    "recommended_track_album_cover_urls": [],
    "recommended_track_audio_preview_urls": [],
  }

# when search is conducted, we call the method from recommendations.py with the user input as parameters
@app.route("/search", methods = ["POST", "GET"])
def search():
    user_input = json.loads(request.data)
    return get_recommendations(user_input.get("tr"), user_input.get("ta"), user_input.get("ar"), int(user_input.get("tc")))

if __name__ == "__main__":
  app.run(debug=True)