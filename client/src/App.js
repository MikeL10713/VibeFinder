import React, { useState, useEffect } from 'react'
import UserInput from "./components/UserInput";
import SearchedArtist from "./components/SearchedArtist";
import SearchedSong from "./components/SearchedSong";
import RecommendedTracks from "./components/RecommendedTracks";

const App = () => {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/data").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data.members === "undefined") ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => (<p key={i}>{member}</p>))
      )}

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
  )
}

export default App