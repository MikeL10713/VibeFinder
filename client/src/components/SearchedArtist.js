const SearchedArtist = ({ artistName, artistImageUrl }) => {
  return (
    <div style={{marginLeft: 10}}>
      <h1>We've got tracks for you from:</h1>
      <h1>{artistName}</h1>
      <img src={artistImageUrl} />
    </div>
  )
}

export default SearchedArtist