import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/instance";

const initialState = {
  movies: [],
  isLoading: true,
  error: null,
  individualMovie: {},
  collection: {},
  trendingMovies: [],
  cast: [],
};

export const getMovies = createAsyncThunk("getMovies", async () => {
  const response = await instance.get(
    "/discover/movie?api_key=4622bea788550ade8391ab66ed1e6dcc&include_video=true"
  );
  return response.data;
});

export const getIndividualMovie = createAsyncThunk(
  "getIndividualMovie",
  async (id) => {
    const response = await instance.get(
      `/movie/${id}?api_key=4622bea788550ade8391ab66ed1e6dcc`
    );
    return response.data;
  }
);

export const getMovieCollection = createAsyncThunk(
  "getMovieCollection",
  async (collectionId) => {
    const response = await instance.get(
      `/collection/${collectionId}?api_key=4622bea788550ade8391ab66ed1e6dcc`
    );
    return response.data;
  }
);

export const getTrendingMovies = createAsyncThunk(
  "getTrendingMovies",
  async (page) => {
    const response = await instance.get(
      `/trending/movie/week?api_key=4622bea788550ade8391ab66ed1e6dcc&page=${
        page ? page : 2
      }`
    );
    return response.data;
  }
);

export const getCast = createAsyncThunk("getCast", async (id) => {
  const response = await instance.get(
    `/movie/${id}/credits?api_key=4622bea788550ade8391ab66ed1e6dcc`
  );
  return response.data;
});

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.individualMovie = {};
    },
    clearSelectedCollection: (state) => {
      state.collection = {};
    },
  },
  extraReducers: {
    [getMovies.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      return {
        ...state,
        movies: action.payload.results.map((item) => {
          return {
            ...item,
            isMovie: true,
          };
        }),
        isLoading: false,
      };
    },
    [getMovies.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getIndividualMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getIndividualMovie.fulfilled]: (state, action) => {
      return { ...state, individualMovie: action.payload, isLoading: false };
    },
    [getIndividualMovie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getMovieCollection.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMovieCollection.fulfilled]: (state, action) => {
      return { ...state, collection: action.payload, isLoading: false };
    },
    [getMovieCollection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getTrendingMovies.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTrendingMovies.fulfilled]: (state, action) => {
      return {
        ...state,
        trendingMovies: action.payload.results.map((item) => {
          return {
            ...item,
            isMovie: true,
          };
        }),
        isLoading: false,
      };
    },
    [getTrendingMovies.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getCast.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCast.fulfilled]: (state, action) => {
      return { ...state, cast: action.payload.cast, isLoading: false };
    },
    [getCast.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const { clearSelectedMovie, clearSelectedCollection } =
  movieSlice.actions;
export default movieSlice.reducer;
