import { CaretRightOutlined } from "@ant-design/icons";
import { StarIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  clearSelectedMovie,
  getCast,
  getIndividualMovie,
} from "../../app/slices/movie";
import {
  clearSelectedTvShow,
  getIndividualTvShow,
} from "../../app/slices/tvshows";

const Selected = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const {
    state: { isMovie },
  } = useLocation();
  const dispatch = useDispatch();
  const { individualMovie, cast } = useSelector((state) => state.movie);
  const { individualTvShow } = useSelector((state) => state.tvShows);
  useEffect(() => {
    isMovie
      ? dispatch(getIndividualMovie(id)) && dispatch(getCast(id))
      : dispatch(getIndividualTvShow(id));
    setIsLoading(false);
    return () => {
      dispatch(clearSelectedMovie());
      dispatch(clearSelectedTvShow());
    };
  }, [dispatch, id, isMovie]);
  return (
    <>
      <div className="play-container container">
        <img
          src={`https://image.tmdb.org/t/p/original/${
            isMovie
              ? individualMovie?.backdrop_path
              : individualTvShow?.backdrop_path
          }`}
          alt=""
          className="play-img"
        />
        <div className="play-text">
          <h2>{isMovie ? individualMovie?.title : individualTvShow?.name}</h2>
          <div
            className="rating"
            style={{
              color: "#ffc107",
            }}
          >
            {[
              ...Array(
                Math.ceil(
                  isMovie
                    ? (Object.keys(individualMovie)?.length > 0 &&
                        individualMovie?.vote_average / 10) * 5
                    : (Object.keys(individualTvShow)?.length > 0 &&
                        individualTvShow?.vote_average / 10) * 5
                )
              ),
            ].map((_, index) => (
              <StarIcon />
            ))}
          </div>
          <div className="tags">
            {isMovie
              ? individualMovie?.genres?.map((genre, index) => {
                  return <span>{genre.name}</span>;
                })
              : individualTvShow?.genres?.map((genre, index) => {
                  return <span>{genre.name}</span>;
                })}
          </div>
          <Link className="watch-btn" to={"/movie/1"}>
            <CaretRightOutlined />
            <span>Watch Now</span>
          </Link>
        </div>
        {/* <div className="video-container">
        <div className="video-box">
          <iframe
            title="video"
            src="https://www.2embed.ru/embed/tmdb/movie?id=338953&autoplay=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div> */}
      </div>
      <div className="about-movie container">
        <h2>{isMovie ? individualMovie?.title : individualTvShow?.name}</h2>
        <p>
          {isMovie ? individualMovie?.overview : individualTvShow?.overview}
        </p>
        <h2 className="cast-heading">{isMovie ? "Movie Cast" : "TV Cast"}</h2>
        <div className="cast">
          {cast?.length > 0 &&
            cast?.slice(0, 10).map((cast, index) => {
              return (
                <div className="cast-box">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    alt=""
                    className="cast-img"
                  />
                  <span className="cast-title">{cast.name}</span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Selected;
