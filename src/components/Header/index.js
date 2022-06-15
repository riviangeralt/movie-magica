import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  FireIcon,
  FilmIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="nav container">
        <Link to={"/"} className="logo">
          ASMD
        </Link>
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search"
            id="search-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim().length > 0) {
                navigate(`/search?q=${e.target.value}`);
              }
            }}
          />
        </div>
      </div>
      <div className="navbar">
        <Link to={"/"} className="nav-link">
          <HomeIcon />
          <span className="nav-link-title">Home</span>
        </Link>
        <Link to={"/"} className="nav-link">
          <FireIcon />
          <span className="nav-link-title">Trending</span>
        </Link>
        <Link to={"/"} className="nav-link">
          <FilmIcon />
          <span className="nav-link-title">Movies</span>
        </Link>
        <Link to={"/"} className="nav-link">
          <VideoCameraIcon />
          <span className="nav-link-title">TV Shows</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
