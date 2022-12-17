import { useState } from 'react'

const Artistinput = () => {
  const [artist, setArtist] = useState("")
  const [track, setTrack] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    if (!artist) {
      alert("Please choose an artist")
      return
    }
    if (!track) {
      alert("Please choose an track")
      return
    }

    setArtist("")
    setTrack("")
  }

  return (
    <div>
      <form onSubmit={onSubmit}> 
        <input style={{marginLeft: 10, width: 300}}
          type="text"
          placeholder="Artist that you want tracks from"
          value={artist}
          onChange={(e) => setArtist(e.target.value)} 
        />
        <input style={{marginLeft: 10, width: 300}}
          type="text"
          placeholder="Track with the vibes you're looking for"
          value={track}
          onChange={(e) => setTrack(e.target.value)} 
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