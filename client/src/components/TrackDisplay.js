const TrackDisplay = ({ trackName, trackAlbumCoverUrl, trackAlbum, trackArtists, trackAudioUrl, audioPlaybackId }) => {
  const playAudio = () => {
    const audio = document.getElementsByClassName(audioPlaybackId)[0]
    audio.play()
  }

  return (
    <div>
      <h1>{trackName}</h1>
      <img src={trackAlbumCoverUrl} alt="" />
      <br/>
      <button onClick={playAudio}>30-second preview of the vibes</button>
      <audio className={audioPlaybackId}>
        <source src={trackAudioUrl} />
      </audio>
      <h2>{trackAlbum}</h2>
      <h2>{trackArtists}</h2>
    </div>
  )
}

export default TrackDisplay