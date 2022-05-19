/* eslint-disable */
import { Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Movie from "../components/Movie";
import instance from "../utils/instance";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMoviesAndTv = async () => {
    const q = location.search.split("=")[1];
    if (q.length > 0) {
      let movies = await instance.get(
        `/search/movie?api_key=4622bea788550ade8391ab66ed1e6dcc&query=${q}`
      );
      const tvShow = await instance.get(
        `/search/tv?api_key=4622bea788550ade8391ab66ed1e6dcc&query=${q}`
      );
      let collection = await instance.get(
        `/search/collection?api_key=4622bea788550ade8391ab66ed1e6dcc&query=${q}`
      );
      setMovies(movies.data.results);
      setTvShows(tvShow.data.results);
      setCollection(collection.data.results);
      setLoading(false);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    getMoviesAndTv();
  }, [location]);
  return (
    <>
      {" "}
      {loading ? (
        <div
          style={{
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#032541",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div className="main">
          <Typography.Title level={4}>
            Top {movies.length} Results for Movies
          </Typography.Title>
          <div className="movie-container" style={{ marginTop: "0 " }}>
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  image={movie.poster_path}
                  name={movie.title}
                  id={movie.id}
                  date={movie.release_date}
                  isMovie={true}
                />
              );
            })}
          </div>
          <Typography.Title level={4}>
            Top {tvShows.length} Results for TV Shows
          </Typography.Title>
          <div className="movie-container" style={{ marginTop: "0 " }}>
            {tvShows.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  image={movie.poster_path}
                  name={movie.name}
                  id={movie.id}
                  date={movie.first_air_date}
                  isTv={true}
                />
              );
            })}
          </div>
          <Typography.Title level={4}>
            Top {collection.length} Results for Collections
          </Typography.Title>
          <div className="movie-container" style={{ marginTop: "0 " }}>
            {collection.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  image={movie.poster_path}
                  name={movie.original_name}
                  id={movie.id}
                  isCollection={true}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
