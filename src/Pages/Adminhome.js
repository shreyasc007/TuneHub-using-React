import React from "react";

export default function Adminhome() {
  const handleAddSong = (event) => {
    event.preventDefault();
    window.location.href = "/newsong";
  };

  return (
    <div>
      <h2>Administrator home page</h2>
      <form onSubmit={handleAddSong}>
        <input type="submit" value="ADD SONG" />
      </form>

      <br />
      <br />
      <form action="viewsongs">
        <input type="submit" value="VIEW SONGS" />
      </form>

      <br />
      <br />
      <form action="createplaylists">
        <input type="submit" value="CREATE PLAYLIST" />
      </form>

      <br />
      <br />
      <form action="viewplaylists">
        <input type="submit" value="VIEW PLAYLISTS" />
      </form>
    </div>
  );
}
