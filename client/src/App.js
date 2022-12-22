import React, { useState, useEffect } from 'react'
import SearchedArtist from "./components/SearchedArtist";
import SearchedSong from "./components/SearchedSong";
import RecommendedTracks from "./components/RecommendedTracks";
import UserInput from './components/UserInput';

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
      <div style={{display: "flex"}}>
        <SearchedArtist 
          artistName={data.new_artist_name} 
          artistImageUrl={data.new_artist_image_url}
        />
        <SearchedSong 
          trackName={data.target_track_name}
          trackAlbum={data.target_track_album}
          trackArtists={data.target_track_artists}
          trackAlbumCoverUrl={data.target_track_album_cover_url}
        />
      </div>
      }
      <br/>
      {names.length > 0 &&
      <RecommendedTracks 
        trackNames={data.recommended_track_names}
        trackAlbums={data.recommended_track_albums}
        trackArtists={data.recommended_track_artists}
        trackAlbumCoverUrls={data.recommended_track_album_cover_urls}
      />
      }
    </div>
  )
}

export default App