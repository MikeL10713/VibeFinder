import UserInput from "./components/UserInput";
import SearchedArtist from "./components/SearchedArtist";
import SearchedSong from "./components/SearchedSong";
import RecommendedTracks from "./components/RecommendedTracks";

function App() {
  return (
    <div>
      <h1 style={{marginLeft: 10}}>VibeFinder</h1>
      <UserInput />
      <br/>
      <div style={{display: "flex"}}>
        <SearchedArtist />
        <SearchedSong />
      </div>
      <br/>
      <RecommendedTracks />
    </div>
  );
}

export default App;
