import TrackDisplay from "./TrackDisplay"

const RecommendedTracks = ({ trackNames, trackAlbums, trackArtists, trackAlbumCoverUrls, trackAudioUrls, audioPlaybackIds }) => {

  const names = []
  trackNames?.map((name, i) => names[i] = name)
  const albums = []
  trackAlbums?.map((album, i) => albums[i] = album)
  const artistLists = []
  trackArtists?.map((artists, i) => artistLists[i] = artists)
  const albumUrls = []
  trackAlbumCoverUrls?.map((url, i) => albumUrls[i] = url)
  const audioUrls = []
  trackAudioUrls?.map((url, i) => audioUrls[i] = url)
  const audioIds = []
  audioPlaybackIds?.map((url, i) => audioIds[i] = url)
  
  return (
    <div style={{marginLeft: 10}}>
      <h1>And here they are:</h1>
      <TrackDisplay 
        trackName={names[0]} 
        trackAlbumCoverUrl={albumUrls[0]} 
        trackAlbum={albums[0]}
        trackArtists={artistLists[0]}
        trackAudioUrl={audioUrls[0]}
        audioPlaybackId={audioIds[0]}
      />
      {names.length > 1 &&
      <TrackDisplay 
        trackName={names[1]} 
        trackAlbumCoverUrl={albumUrls[1]} 
        trackAlbum={albums[1]}
        trackArtists={artistLists[1]}
        trackAudioUrl={audioUrls[1]}
        audioPlaybackId={audioIds[1]}
      />
      }
      {names.length > 2 &&
      <TrackDisplay 
        trackName={names[2]} 
        trackAlbumCoverUrl={albumUrls[2]} 
        trackAlbum={albums[2]}
        trackArtists={artistLists[2]}
        trackAudioUrl={audioUrls[2]}
        audioPlaybackId={audioIds[2]}
      />
      }
      {names.length > 3 &&
      <TrackDisplay 
        trackName={names[3]} 
        trackAlbumCoverUrl={albumUrls[3]} 
        trackAlbum={albums[3]}
        trackArtists={artistLists[3]}
        trackAudioUrl={audioUrls[3]}
        audioPlaybackId={audioIds[3]}
      />
      }
      {names.length > 4 &&
      <TrackDisplay 
        trackName={names[4]} 
        trackAlbumCoverUrl={albumUrls[4]} 
        trackAlbum={albums[4]}
        trackArtists={artistLists[4]}
        trackAudioUrl={audioUrls[4]}
        audioPlaybackId={audioIds[4]}
      />
      }
    </div>
  )
}

export default RecommendedTracks