import { useState } from "react"
import "../index.css"

const UserInput = ({ passData }) => {

  const [artist, setArtist] = useState("")
  const [trackCount, setTrackCount] = useState("")
  const [track, setTrack] = useState("")
  const [trackArtist, setTrackArtist] = useState("")

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
        passData(data)
        console.log(data)
      }
    )
    
    setArtist("")
    setTrackCount("")
    setTrack("")
    setTrackArtist("")
  }

  return (
    <form onSubmit={onSubmit} className="searchbar" style={{marginLeft: -10}}> 
      <input style={{width: 250}}
        type="text"
        placeholder="Artist that you want tracks from"
        value={artist}
        name="artist"
        onChange={(e) => setArtist(e.target.value)} 
      />
      <input style={{width: 270}}
        type="text"
        placeholder="How many tracks do you want? 1-5"
        value={trackCount}
        name="trackCount"
        onChange={(e) => setTrackCount(e.target.value)} 
      />
      <input style={{width: 300}}
        type="text"
        placeholder="Track with the vibes you're looking for"
        value={track}
        name="track"
        onChange={(e) => setTrack(e.target.value)} 
      />
      <input style={{width: 220}}
        type="text"
        placeholder="Artist that made your track"
        value={trackArtist}
        name="trackArtist"
        onChange={(e) => setTrackArtist(e.target.value)} 
      />
      <input style={{width: 145}}
        type="submit"
        value="Find some vibes!"
      />
    </form>
  )
}

export default UserInput