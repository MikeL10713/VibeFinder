import { useState, useEffect } from 'react'

const Artistinput = () => {
  const [artist, setArtist] = useState("")
  const [track, setTrack] = useState("")
  const [trackArtist, setTrackArtist] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    if (!artist) {
      alert("Please choose an artist")
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
    setTrack("")
    setTrackArtist("")
  }

  return (
    <div>
      <form onSubmit={onSubmit}> 
        <input style={{marginLeft: 10, width: 300}}
          type="text"
          placeholder="Artist that you want tracks from"
          value={artist}
          name="artist"
          onChange={(e) => setArtist(e.target.value)} 
        />
        <input style={{marginLeft: 10, width: 300}}
          type="text"
          placeholder="Track with the vibes you're looking for"
          value={track}
          name="track"
          onChange={(e) => setTrack(e.target.value)} 
        />
        <input style={{marginLeft: 10, width: 300}}
          type="text"
          placeholder="Artist that made your track"
          value={trackArtist}
          name="trackArtist"
          onChange={(e) => setTrackArtist(e.target.value)} 
        />
        <input style={{marginLeft: 10, width: 200}}
          type="submit"
          value="Find some vibes!"
        />
      </form>
    </div>
  )
}

export default Artistinput