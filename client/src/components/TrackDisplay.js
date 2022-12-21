const TrackDisplay = ({ trackName, trackAlbumCoverUrl, trackAlbum, trackArtists }) => {
  return (
    <div>
      <h1>{trackName}</h1>
      <img src={trackAlbumCoverUrl} alt="" />
      <h2>{trackAlbum}</h2>
      <h2>{trackArtists}</h2>
    </div>
  )
}

export default TrackDisplay