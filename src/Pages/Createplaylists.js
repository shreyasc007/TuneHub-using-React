import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

export default function CreatePlaylists() {
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/createplaylists"
        );
        console.log();
        setSongs(response.data);
      } catch (error) {
        alert("Error occurred while fetching songs");
        console.log("Error occurred while fetching songs");
      }
    };
    fetchSongs();
  }, []);

  const handleCheckboxChange = (songId) => {
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.includes(songId)
        ? prevSelectedSongs.filter((id) => id !== songId)
        : [...prevSelectedSongs, songId]
    );
  };

  const handlePlaylists = async (event) => {
    event.preventDefault();
    if (!playlistName || selectedSongs.length === 0) {
      alert("Please enter a playlist name and select at least one song.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/addplaylist", {
        name: playlistName,
        songIds: selectedSongs,
      });
      console.log(response.data);
      if (response.data === "adminhome") {
        alert("Playlist created successfully");
        window.location.href = "/adminhome";
      } else {
        alert("The playlist is not created");
        console.log("The playlist is not created");
      }
    } catch (error) {
      alert("Error while creating the playlist");
      console.log("Error while creating the playlist");
    }
  };

  return (
    <div>
      <h1>Add Playlist</h1>
      <form onSubmit={handlePlaylists}>
        <label>Playlist Name:</label>
        <input
          type="text"
          name="playlistName"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <br />
        <br />
        {songs.map((song) => (
          <div key={song.id}>
            <input
              type="checkbox"
              name="songs"
              value={song.name}
              onChange={() => handleCheckboxChange(song.id)}
              checked={selectedSongs.includes(song.id)}
            />
            <label>{song.name}</label>
          </div>
        ))}
        <br />
        <input type="submit" value="ADD PLAYLIST" />
      </form>
    </div>
  );
}
