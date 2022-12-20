import TrackDisplay from "./TrackDisplay"

const RecommendedTracks = ({ trackNames, trackAlbums, trackArtists, trackAlbumCoverUrls }) => {

  const names = []
  trackNames?.map((name, i) => names[i] = name)
  const albums = []
  trackAlbums?.map((album, i) => albums[i] = album)
  const artistLists = []
  trackArtists?.map((artists, i) => artistLists[i] = artists)
  const urls = []
  trackAlbumCoverUrls?.map((url, i) => urls[i] = url)
  
  return (
    <div style={{marginLeft: 10}}>
      <h1>And here they are:</h1>
      <TrackDisplay 
        trackName={names[0]} 
        trackAlbumCoverUrl={urls[0]} 
        trackAlbum={albums[0]}
        trackArtists={artistLists[0]}
      />
      <TrackDisplay 
        trackName={names[1]} 
        trackAlbumCoverUrl={urls[1]} 
        trackAlbum={albums[1]}
        trackArtists={artistLists[1]}
      />
      <TrackDisplay 
        trackName={names[2]} 
        trackAlbumCoverUrl={urls[2]} 
        trackAlbum={albums[2]}
        trackArtists={artistLists[2]}
      />
    </div>
  )
}

export default RecommendedTracks