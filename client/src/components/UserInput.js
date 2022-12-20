import { useState, useEffect } from 'react'

const Artistinput = () => {
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
    
    setArtist("")
    setTrackCount("")
    setTrack("")
    setTrackArtist("")
  }

  return (
    <div>
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
    </div>
  )
}

export default Artistinput