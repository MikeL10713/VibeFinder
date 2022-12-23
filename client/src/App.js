import React, { useState, useEffect } from 'react'
import RecommendedTracks from "./components/RecommendedTracks";
import UserInput from './components/UserInput';
import UserSearched from './components/UserSearched';

const App = () => {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/initial").then(
      response => response.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  const names = []
  data.recommended_track_names?.map((name, i) => names[i] = name)
  
  return (
    <div>
      <h1 style={{marginLeft: 10}}>VibeFinder</h1>
      <UserInput passData={setData}/>
      <br/>
      {names.length > 0 &&
      <UserSearched
        artistName={data.new_artist_name} 
        artistImageUrl={data.new_artist_image_url}
        trackCount={data.recommended_track_names.length}
        trackName={data.target_track_name}
        trackAlbum={data.target_track_album}
        trackArtists={data.target_track_artists}
        trackAlbumCoverUrl={data.target_track_album_cover_url}
        trackAudioUrl={data.target_track_audio_preview_url}
        audioPlaybackId={data.target_track_name}
      />
      }
      <br/>
      {names.length > 0 &&
      <RecommendedTracks 
        trackNames={data.recommended_track_names}
        trackAlbums={data.recommended_track_albums}
        trackArtists={data.recommended_track_artists}
        trackAlbumCoverUrls={data.recommended_track_album_cover_urls}
        trackAudioUrls={data.recommended_track_audio_preview_urls}
        audioPlaybackIds={data.recommended_track_names}
      />
      }
    </div>
  )
}

export default App