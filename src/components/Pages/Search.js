import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../utils/instance";
import MovieBox from "../MovieBox";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const q = location.search.split("=")[1].split("&")[0];
  const p = location.search.split("=")[2];
  const [page, setPage] = useState(p ? Number(p) : 1);
  const [totalPages, setTotalPages] = useState(0);

  const getMoviesAndTV = async () => {
    const response = await instance.get(
      `/search/movie?api_key=4622bea788550ade8391ab66ed1e6dcc&query=${q}&page=${page}`
    );
    setTotalPages(response.data.total_pages);
    setResults(
      response.data.results.map((result) => ({
        ...result,
        isMovie: true,
      }))
    );
  };
  const onChange = (page) => {
    setPage(page);
    navigate(`/search?q=${q}&page=${page}`);
  };
  useEffect(() => {
    getMoviesAndTV();
  }, [location, page]);

  return (
    <div className="search-container container">
      <div className="search-heading">
        <h2>
          Search Results for "
          {location.search
            .split("=")[1]
            .replaceAll("%20", " ")
            .replaceAll("&page", "")}
          "
        </h2>
      </div>
      <div className="movies-content">
        {results.map((result) => (
          <MovieBox key={result.id} movie={result} isMovie={result?.isMovie} />
        ))}
      </div>
      <div className="next-prev-container">
        <button
          className="prev-button"
          onClick={() => {
            onChange(page - 1);
          }}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="next-button"
          onClick={() => {
            onChange(page + 1);
          }}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;
