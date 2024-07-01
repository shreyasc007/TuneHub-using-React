import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

export default function Viewplaylist() {
  const [playlists, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viewplaylists");
        console.log(response.data);
        setPlaylist(response.data);
      } catch (error) {
        alert("Error occurred while fetching songs from the playlist");
        console.log("Error occurred while fetching songs from the playlist");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Playlists</h2>
      <table border="2px">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Songs</th>
          </tr>
        </thead>
        <tbody>
          {playlists.map((playlist) => (
            <tr key={playlist.id}>
              <td>{playlist.id}</td>
              <td>{playlist.name}</td>
              <td>
                <ul>
                  {playlist.songs.map((song) => (
                    <li key={song.id}>
                      <span>{song.name}</span>
                      <audio controls>
                        <source src={song.link} type="audio/mpeg" />
                      </audio>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
