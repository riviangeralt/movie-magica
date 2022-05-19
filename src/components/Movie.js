import { Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Movie = ({
  name,
  image,
  id,
  date,
  isMovie,
  isTv,
  isCollection,
  color,
}) => {
  return (
    <Link
      to={
        isMovie
          ? `/movie/${id}`
          : isTv
          ? `/tv/${id}`
          : isCollection
          ? `/collection/${id}`
          : `/movie/${id}`
      }
      style={{ minHeight: "fit-content", zIndex: 11 }}
    >
      <div className="movie">
        <img
          src={
            image
              ? `https://image.tmdb.org/t/p/w500${image}`
              : "https://via.placeholder.com/500x750"
          }
          alt={name}
        />
        <Typography.Text
          style={{
            fontWeight: "bold",
            display: "block",
            margin: "0 auto",
            width: "100%",
            marginTop: "10px",
            color: color ? "#FFF" : "#000",
          }}
        >
          {name.length > 20 ? name.substring(0, 17) + "..." : name}
        </Typography.Text>
        <Typography.Text
          type="secondary"
          style={{
            display: "block",
            width: "100%",
            color: color ? "#FFF" : "#000",
          }}
        >
          {date}
        </Typography.Text>
      </div>
    </Link>
  );
};

export default Movie;
