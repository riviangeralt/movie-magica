import { AutoComplete, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../utils/instance";

const Header = () => {
  const navigate = useNavigate();
  const links = [
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "TV Shows",
      path: "/tv",
    },
    {
      name: "Anime",
      path: "/anime",
    },
  ];

  const [options, setOptions] = useState([]);

  const onChange = async (data) => {
    if (data.length > 0) {
      const movies = await instance.get(
        `/search/movie?api_key=4622bea788550ade8391ab66ed1e6dcc&query=${data}`
      );
      const tvShow = await instance.get(
        `/search/tv?api_key=4622bea788550ade8391ab66ed1e6dcc&query=${data}`
      );
      const searchedMovies = movies.data.results?.map((movie) => {
        return {
          value: movie.title + ` (${movie.release_date?.split("-")[0]})`,
          id: movie.id,
          key: movie.id + movie.backdrop_path + "-" + movie.title,
          isMovie: true,
        };
      });
      const searchedTvShow = tvShow.data.results?.map((tvShow) => {
        return {
          value: tvShow.name + ` (${tvShow.first_air_date?.split("-")[0]})`,
          id: tvShow.id,
          key: tvShow.id + tvShow.backdrop_path + "-" + tvShow.name,
          isTvShow: true,
        };
      });
      setOptions([...searchedMovies, ...searchedTvShow]);
    }
  };
  const onSelect = async (value, i) => {
    if (i.isMovie) {
      navigate(`/movie/${i.id}`);
    } else if (i.isTvShow) {
      navigate(`/tv/${i.id}`);
    }
  };
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/movies">Movies</Link>,
        },
        {
          label: <Link to="/tv">TV Shows</Link>,
        },
        {
          label: <Link to="/anime">Anime</Link>,
        },
      ]}
    />
  );
  return (
    <>
      <div className="header">
        <div className="sub_media">
          <div className="nav_wrapper">
            <Link className="logo" to="/">
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="The Movie Database (TMDB)"
                width="154"
                height="20"
              />
            </Link>
            <ul className="navigation">
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
            <div className="search">
              <AutoComplete
                options={options}
                style={{
                  width: 200,
                }}
                onSearch={onChange}
                placeholder="Search for a movie"
                notFoundContent={"No results found"}
                onSelect={onSelect}
                allowClear
              />
            </div>
            <div className="burger">
              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <div className="line"></div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
