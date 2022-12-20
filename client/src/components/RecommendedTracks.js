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
      {names.length > 1 &&
      <TrackDisplay 
        trackName={names[1]} 
        trackAlbumCoverUrl={urls[1]} 
        trackAlbum={albums[1]}
        trackArtists={artistLists[1]}
      />
      }
      {names.length > 2 &&
      <TrackDisplay 
        trackName={names[2]} 
        trackAlbumCoverUrl={urls[2]} 
        trackAlbum={albums[2]}
        trackArtists={artistLists[2]}
      />
      }
      {names.length > 3 &&
      <TrackDisplay 
        trackName={names[3]} 
        trackAlbumCoverUrl={urls[3]} 
        trackAlbum={albums[3]}
        trackArtists={artistLists[3]}
      />
      }
      {names.length > 4 &&
      <TrackDisplay 
        trackName={names[4]} 
        trackAlbumCoverUrl={urls[4]} 
        trackAlbum={albums[4]}
        trackArtists={artistLists[4]}
      />
      }
    </div>
  )
}

export default RecommendedTracks