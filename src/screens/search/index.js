import React, { useState } from "react";
import APIKit from "../../spotify";
import "./search.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await APIKit.get(`search?q=${searchQuery}&type=track`);
      setSearchResults(response.data.tracks.items);
      console.log(response.data.tracks.items);
    } catch (error) {
      console.error(error);
    }
  };

  const playTrack = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container1">
      <div className="search-container1">
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results1">
        {searchResults.map((track) => (
          <div
            className="track-card1"
            key={track.id}
            onClick={() => playTrack(track.id)}
          >
            <img
              src={track.album.images[0].url}
              className="track-image1"   
              alt="Track-Art"
            />
            <div className="track-info1">
              <p className="track-title1">{track.name}</p>
              <p className="track-subtitle1">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
            <div className="track-fade">
              <IconContext.Provider value={{ size: "50px", color: "#c67ce3" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
