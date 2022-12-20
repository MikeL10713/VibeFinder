import React, { useState, useEffect } from 'react'
import UserInput from "./components/UserInput";
import SearchedArtist from "./components/SearchedArtist";
import SearchedSong from "./components/SearchedSong";
import RecommendedTracks from "./components/RecommendedTracks";

const App = () => {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      <h1 style={{marginLeft: 10}}>VibeFinder</h1>
      <UserInput />
      <br/>
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
      <br/>
      <RecommendedTracks 
        trackNames={data.recommended_track_names}
        trackAlbums={data.recommended_track_albums}
        trackArtists={data.recommended_track_artists}
        trackAlbumCoverUrls={data.recommended_track_album_cover_urls}
      />
    </div>
  )
}

export default App