import { CaretRightOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { movieGenres, tvGenres } from "../utils/commom";

const MovieBox = ({ movie, isMovie }) => {
  return (
    <div className="movie-box">
      <img
        src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`}
        alt=""
        className="movie-box-img"
      />
      <div className="box-text">
        <h2 className="movie-title">{isMovie ? movie?.title : movie?.name}</h2>
        <span className="movie-type">
          {movie?.genre_ids?.map((genre, index) => {
            return isMovie
              ? movieGenres[genre] +
                  (index !== movie?.genre_ids.length - 1 ? ", " : "")
              : tvGenres[genre] +
                  (index !== movie?.genre_ids.length - 1 ? ", " : "");
          })}
        </span>
        <Link
          to={{
            pathname: isMovie ? `/movie/${movie?.id}` : `/tv/${movie?.id}`,
          }}
          state={{
            isMovie: isMovie,
          }}
          className="watch-btn"
        >
          <CaretRightOutlined />
          <span>Watch Now</span>
        </Link>
      </div>
    </div>
  );
};

export default MovieBox;
