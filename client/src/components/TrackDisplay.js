const TrackDisplay = ({ trackName, trackAlbumCoverUrl, trackAlbum, trackArtists, trackAudioUrl, audioPlaybackId }) => {

  const handleMouseEnter = () => {
    const audio = document.getElementsByClassName(audioPlaybackId)[0]
    audio.volume *= 0.25
    audio.play()
  }

  const handleMouseLeave = () => {
    const audio = document.getElementsByClassName(audioPlaybackId)[0]
    audio.pause()
    audio.volume *= 4
  }

  return (
    <div style={{display: "flex"}}>
      <div>
        <audio className={audioPlaybackId}>
          <source src={trackAudioUrl} />
        </audio>
        <img 
          src={trackAlbumCoverUrl} 
          alt="" 
          width={250}
          height={250}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{borderRadius: 13}}
        />
      </div>
      <div style={{marginLeft: 10}}>
        <br/>
        <h2 style={{fontSize: 30, textDecoration: "underline"}}>{trackName}</h2>
        <h3 style={{fontSize: 25}}>{trackAlbum}</h3>
        <h3 style={{fontSize: 25}}>{trackArtists}</h3>
      </div>
    </div>
  )
}

export default TrackDisplay