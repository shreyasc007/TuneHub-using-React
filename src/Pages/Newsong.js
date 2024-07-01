import axios from "axios";
import React, { useState } from "react";
axios.defaults.withCredentials = true;

export default function Newsong() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [link, setLink] = useState("");

  const handleAddNewSong = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/addsong", {
        name: name,
        artist: artist,
        genre: genre,
        link: link,
      });

      console.log(response.data);
      if (response.data === "adminhome") {
        alert("song added successfully");
        window.location.href = "/adminhome";
      } else {
        alert("entered song is already present");
        window.location.href = "/newsong";
      }
    } catch (error) {
      console.error("Error while adding the song:", error);
      alert("An error occured while adding the song");
    }
  };
  return (
    <div>
      <h1>Add Song</h1>
      <form onSubmit={handleAddNewSong}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <label>Artist:</label>
        <br />
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <br />
        <br />
        <label>Genre:</label>
        <br />
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <br />
        <br />
        <label>Link:</label>
        <br />
        <input
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="ADD SONG" />
      </form>
    </div>
  );
}
