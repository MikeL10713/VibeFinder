import React, { useState, useEffect } from 'react'
import SearchedArtist from "./components/SearchedArtist";
import SearchedSong from "./components/SearchedSong";
import RecommendedTracks from "./components/RecommendedTracks";

const App = () => {

  const [data, setData] = useState([{}])
  const [artist, setArtist] = useState("")
  const [trackCount, setTrackCount] = useState("")
  const [track, setTrack] = useState("")
  const [trackArtist, setTrackArtist] = useState("")

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

  const onSubmit = (e) => {
    e.preventDefault()

    if (!artist) {
      alert("Please choose an artist")
      return
    }
    if (!trackCount) {
      alert("Please specify how many tracks you want")
      return
    }
    if (!track) {
      alert("Please choose a track")
      return
    }
    if (!trackArtist) {
      alert("Please specify the track's artist")
      return
    }
    
    fetch("/search", {
      method: "POST",
      body: JSON.stringify({
        ar: artist,
        tc: trackCount,
        tr: track,
        ta: trackArtist
      })
    }).then(
      response => response.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
    
    setArtist("")
    setTrackCount("")
    setTrack("")
    setTrackArtist("")
  }

  return (
    <div>
      <h1 style={{marginLeft: 10}}>VibeFinder</h1>
      <form onSubmit={onSubmit}> 
        <input style={{marginLeft: 10, width: 200}}
          type="text"
          placeholder="Artist that you want tracks from"
          value={artist}
          name="artist"
          onChange={(e) => setArtist(e.target.value)} 
        />
        <input style={{marginLeft: 10, width: 230}}
          type="text"
          placeholder="How many tracks do you want? 1-5"
          value={trackCount}
          name="trackCount"
          onChange={(e) => setTrackCount(e.target.value)} 
        />
        <input style={{marginLeft: 10, width: 240}}
          type="text"
          placeholder="Track with the vibes you're looking for"
          value={track}
          name="track"
          onChange={(e) => setTrack(e.target.value)} 
        />
        <input style={{marginLeft: 10, width: 180}}
          type="text"
          placeholder="Artist that made your track"
          value={trackArtist}
          name="trackArtist"
          onChange={(e) => setTrackArtist(e.target.value)} 
        />
        <input style={{marginLeft: 10, width: 175}}
          type="submit"
          value="Find some vibes!"
        />
      </form>
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