import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovies } from "../../app/slices/movie";
import { getTrendingTvShows } from "../../app/slices/tvshows";
import MovieBox from "../MovieBox";

const Movies = () => {
  const dispatch = useDispatch();
  const { trendingMovies } = useSelector((state) => state.movie);
  const { trendingTvShows } = useSelector((state) => state.tvShows);
  useEffect(() => {
    dispatch(getTrendingMovies());
    dispatch(getTrendingTvShows());
  }, [dispatch]);
  return (
    <section className="movies container" id="movies">
      <div className="heading">
        <h2 className="heading-title">Movies And Tv Shows</h2>
      </div>
      <div className="movies-content">
        {[...trendingMovies, ...trendingTvShows]?.map((movie, i) => (
          <MovieBox movie={movie} isMovie={movie?.isMovie} key={movie.id} />
        ))}
      </div>
    </section>
  );
};

export default Movies;
