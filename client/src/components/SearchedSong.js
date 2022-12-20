import TrackDisplay from "./TrackDisplay"

const SearchedSong = ({ trackName, trackAlbumCoverUrl, trackAlbum, trackArtists }) => {
  return (
    <div style={{marginLeft: 135}}>
      <h1>Hopefully they'll fit the vibe of:</h1>
      <TrackDisplay 
        trackName={trackName} 
        trackAlbumCoverUrl={trackAlbumCoverUrl} 
        trackAlbum={trackAlbum} 
        trackArtists={trackArtists} 
      />
    </div>
  )
}

export default SearchedSong