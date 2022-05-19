import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIndividualMovie,
  clearSelectedMovie,
  getMovieCollection,
  clearSelectedCollection,
} from "../app/slices/movie";
import {
  clearSelectedTvShow,
  clearShowSeason,
  getIndividualTvShow,
  getShowSeason,
} from "../app/slices/tvshows";
import { Link, useParams } from "react-router-dom";
import { Typography, Row, Col, Spin, Select, Button } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import { movieGenres, tvGenres } from "../utils/commom";
import Movie from "../components/Movie";

const SingleMovie = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { individualMovie, collection } = useSelector((state) => state.movie);
  const {
    individualTvShow,
    season,
    isLoading: isLoadingTv,
  } = useSelector((state) => state.tvShows);
  const [clicked, setClicked] = useState(localStorage.getItem("clicked"));
  const [seasonNo, setSeasonNo] = useState(0);
  const [episodeNo, setEpisodeNo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (props.isMovie) {
      dispatch(getIndividualMovie(id));
      setIsLoading(false);
    } else if (props.isTv) {
      dispatch(getIndividualTvShow(id));
      setIsLoading(false);
      // dispatch(getShowSeason({ tvId: id, seasonNo: seasonNo }));
    } else if (props.isCollection) {
      dispatch(getMovieCollection(id));
      setIsLoading(false);
    }

    return () => {
      dispatch(clearSelectedMovie());
      dispatch(clearSelectedTvShow());
      dispatch(clearShowSeason());
      dispatch(clearSelectedCollection());
      localStorage.clear();
      setClicked(false);
    };
  }, [dispatch, id, props.isMovie, props.isTv, props.isCollection]);
  if (!isLoading) {
    document.title =
      individualMovie?.title || individualTvShow?.name || collection?.name;
  }
  return (
    <>
      {!isLoading ? (
        !clicked ? (
          <div
            className="movie-page"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(52.5, 52.5, 73.5, 1) 150px, rgba(52.5, 52.5, 73.5, 0.84) 100%), url(https://image.tmdb.org/t/p/original${
                props.isMovie
                  ? individualMovie.backdrop_path
                  : props.isCollection
                  ? collection.backdrop_path
                  : individualTvShow.backdrop_path
              }`,
            }}
          >
            <div className="movie-page__content">
              <img
                src={`https://image.tmdb.org/t/p/w342${
                  props.isMovie
                    ? individualMovie.poster_path
                    : props.isCollection
                    ? collection.poster_path
                    : season?.poster_path || individualTvShow.poster_path
                }`}
                alt={
                  props.isMovie
                    ? individualMovie.title
                    : props.isCollection
                    ? collection.name
                    : individualTvShow.name
                }
                style={{
                  height: "556.69px",
                }}
              />
              <div className="movie-detail">
                <Typography.Title
                  level={2}
                  style={{ color: "#fff", margin: 0 }}
                >
                  {props.isMovie
                    ? individualMovie.title
                    : props.isCollection
                    ? collection.name
                    : individualTvShow.name}
                  <Typography.Text style={{ color: "#fff", fontWeight: 100 }}>
                    {" "}
                    (
                    {props.isMovie
                      ? individualMovie.release_date?.split("-")[0]
                      : props.isCollection
                      ? Object.keys(collection)?.length > 0 &&
                        collection?.parts[0]?.release_date?.split("-")[0] +
                          "-" +
                          collection?.parts[
                            collection?.parts?.length - 1
                          ]?.release_date?.split("-")[0]
                      : season?.air_date?.split("-")[0] ||
                        individualTvShow?.first_air_date?.split("-")[0]}
                    )
                  </Typography.Text>
                </Typography.Title>
                {!props.isCollection && (
                  <>
                    <Typography.Text style={{ color: "#707070" }}>
                      {props.isMovie
                        ? individualMovie.release_date?.replaceAll("-", "/")
                        : season?.air_date?.replaceAll("-", "/") ||
                          individualTvShow.first_air_date?.replaceAll("-", "/")}
                    </Typography.Text>{" "}
                    &bull;{" "}
                    <Typography.Text style={{ color: "#fff" }}>
                      {props.isMovie
                        ? individualMovie.runtime
                        : individualTvShow?.episode_run_time &&
                          individualTvShow?.episode_run_time[0]}{" "}
                      min
                    </Typography.Text>{" "}
                    &bull;{" "}
                    <Typography.Text style={{ color: "#fff" }}>
                      {props.isMovie
                        ? individualMovie.genres?.map((genre, i) => {
                            if (i !== individualMovie.genres.length - 1) {
                              return (
                                <Link
                                  to={`/movies/genre/${genre.id}`}
                                  style={{ color: "#fff" }}
                                  key={genre.id}
                                >
                                  {movieGenres[genre.id]} |{" "}
                                </Link>
                              );
                            } else {
                              return (
                                <Link
                                  to={`/movies/genre/${genre.id}`}
                                  style={{ color: "#fff" }}
                                  key={genre.id}
                                >
                                  {movieGenres[genre.id]}
                                </Link>
                              );
                            }
                          })
                        : individualTvShow.genres?.map((genre, i) => {
                            if (i !== individualTvShow.genres.length - 1) {
                              return (
                                <Link
                                  to={`/tvshows/genre/${genre.id}`}
                                  style={{ color: "#fff" }}
                                  key={genre.id}
                                >
                                  {tvGenres[genre.id]} |{" "}
                                </Link>
                              );
                            } else {
                              return (
                                <Link
                                  to={`/tvshows/genre/${genre.id}`}
                                  style={{ color: "#fff" }}
                                  key={genre.id}
                                >
                                  {tvGenres[genre.id]}
                                </Link>
                              );
                            }
                          })}
                    </Typography.Text>
                  </>
                )}
                <Typography.Paragraph
                  style={{
                    color: "#fff",
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                  }}
                >
                  {props.isMovie
                    ? individualMovie.tagline
                    : individualTvShow.tagline}
                </Typography.Paragraph>
                {/* Overview */}
                <Typography.Title level={3} style={{ color: "#fff" }}>
                  Overview
                </Typography.Title>
                <Typography.Paragraph style={{ color: "#fff" }}>
                  {props.isMovie
                    ? individualMovie.overview
                    : props.isCollection
                    ? collection.overview
                    : season?.overview || individualTvShow.overview}
                </Typography.Paragraph>
                <Row gutter={[16, 16]}>
                  {props.isMovie && (
                    <Col span={8}>
                      <Typography.Title level={3} style={{ color: "#fff" }}>
                        <PlayCircleFilled
                          onClick={() => {
                            setClicked(true);
                          }}
                        />{" "}
                        <br />
                        Watch Now
                      </Typography.Title>
                    </Col>
                  )}
                  <Col span={8} xs={24} md={8}>
                    {props.isTv && (
                      <Select
                        // defaultValue={seasonNo}
                        value={seasonNo}
                        style={{ width: "100%" }}
                        onChange={(value, i) => {
                          setSeasonNo(i.value);
                          dispatch(
                            getShowSeason({ tvId: id, seasonNo: value })
                          );
                        }}
                      >
                        {!isLoadingTv &&
                          individualTvShow?.seasons?.map((season, i) => {
                            return (
                              <Select.Option
                                key={individualTvShow?.seasons[i].id}
                                value={
                                  individualTvShow?.seasons[i].season_number
                                }
                              >
                                {individualTvShow?.seasons[i].name}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}
                    className="buttons-group"
                  >
                    {!props.isMovie &&
                      season?.episodes?.map((episode, i) => {
                        return (
                          <Button
                            key={i}
                            onClick={() => {
                              setClicked(true);
                              setEpisodeNo(episode.episode_number);
                            }}
                          >
                            {episode?.episode_number}
                          </Button>
                        );
                      })}
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                  >
                    {props.isCollection &&
                      collection?.parts?.map((part, i) => {
                        return (
                          <Movie
                            key={i}
                            id={part.id}
                            isMovie={true}
                            isCollection={false}
                            isTv={false}
                            image={part.poster_path}
                            name={part.title}
                            date={part.release_date}
                            color={true}
                          />
                        );
                      })}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            title={individualMovie.title}
            width="100%"
            style={{
              minHeight: "calc(100vh - 64px)",
              marginTop: "64px",
            }}
            src={
              props.isMovie
                ? `https://www.2embed.ru/embed/tmdb/movie?id=${individualMovie.id}&autoplay=1`
                : `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${seasonNo}&e=${episodeNo}&autoplay=1`
            }
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      ) : (
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
      )}
    </>
  );
};

export default SingleMovie;
