const TrackDisplay = ({ trackName, trackAlbumCoverUrl, trackAlbum, trackArtists, trackAudioUrl, audioPlaybackId }) => {

  const handleMouseEnter = () => {
    const audio = document.getElementsByClassName(audioPlaybackId)[0]
    audio.volume *= 0.1
    audio.play()
  }

  const handleMouseLeave = () => {
    const audio = document.getElementsByClassName(audioPlaybackId)[0]
    audio.pause()
    audio.volume *= 10
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
        />
      </div>
      <div>
        <h1>{trackName}</h1>
        <h2>{trackAlbum}</h2>
        <h2>{trackArtists}</h2>
      </div>
    </div>
  )
}

export default TrackDisplay