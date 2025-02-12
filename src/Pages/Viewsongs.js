import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function ViewSongs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viewsongs");
        console.log(response.data);
        setSongs(response.data);
      } catch (error) {
        alert("Error occured while fetching songs");
        console.log("Error occured while fetching songs");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Song List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.id}</td>
              <td>{song.name}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>
                <audio controls>
                  <source src={song.link} />
                </audio>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
