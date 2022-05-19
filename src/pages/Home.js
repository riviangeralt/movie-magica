import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../app/slices/movie";
import Banner from "../components/Banner";
import Movie from "../components/Movie";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovies());
    document.title = "MovieDB";
  }, [dispatch]);

  return (
    <>
      <Banner />
      <div className="movie-container">
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
    </>
  );
};

export default Home;
