import React, { useState, useEffect } from "react";
import axios from "axios";
// import ReactAudioPlayer from "react-audio-player";
import "../Styles/Customerhome.css";
import "../Styles/Customersong.css";
axios.defaults.withCredentials = true;

export default function Customerhome() {
  const [isPremium, setIsPremium] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:8080/premiumuser");
      setIsPremium(response.data);
    };
    fetchUser();

    const fetchSongs = async () => {
      const response = await axios.get("http://localhost:8080/premiumsongs");
      setSongs(response.data);
    };
    fetchSongs();
  }, []);

  return (
    <div>
      <h2>Customer Home</h2>
      {!isPremium ? (
        <div className="non-premium">
          <form action="pay" className="form-button">
            <input
              type="submit"
              value="GET PREMIUM"
              className="premium-button"
            />
          </form>
          <br />
          <form action="logout" className="form-button">
            <input type="submit" value="logout" className="logout-button" />
          </form>
        </div>
      ) : (
        <div className="premium">
          <table border="3" cellSpacing="2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Artist</th>
                <th>Genre</th>
                <th>Play</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
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
      )}
    </div>
  );
}
