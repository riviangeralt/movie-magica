import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/instance";

const initialState = {
  tvShows: [],
  isLoading: false,
  error: null,
  individualTvShow: {},
  season: {},
  episode: {},
  trendingTvShows: [],
};

export const getTvShows = createAsyncThunk("getTvShows", async () => {
  const response = await instance.get(
    "/discover/tv?api_key=4622bea788550ade8391ab66ed1e6dcc"
  );
  return response.data;
});

export const getIndividualTvShow = createAsyncThunk(
  "getIndividualTvShow",
  async (id) => {
    const response = await instance.get(
      `/tv/${id}?api_key=4622bea788550ade8391ab66ed1e6dcc`
    );
    return response.data;
  }
);

export const getShowSeason = createAsyncThunk("showSeason", async (data) => {
  const { tvId, seasonNo } = data;
  const response = await instance.get(
    `/tv/${tvId}/season/${seasonNo}?api_key=4622bea788550ade8391ab66ed1e6dcc`
  );
  return response.data;
});

export const getShowEpisode = createAsyncThunk("showEpisode", async (data) => {
  const { tvId, seasonNo, episodeNo } = data;
  const response = await instance.get(
    `/tv/${tvId}/season/${seasonNo}/episode/${episodeNo}?api_key=4622bea788550ade8391ab66ed1e6dcc`
  );
  return response.data;
});

export const getTrendingTvShows = createAsyncThunk(
  "getTrendingTvShows",
  async (page) => {
    const response = await instance.get(
      `/trending/tv/week?api_key=4622bea788550ade8391ab66ed1e6dcc&page=${
        page ? page : 2
      }`
    );
    return response.data;
  }
);

const tvShowSlice = createSlice({
  name: "tvShow",
  initialState,
  reducers: {
    clearSelectedTvShow: (state) => {
      state.individualTvShow = {};
    },
    clearShowSeason: (state) => {
      state.season = {};
    },
  },
  extraReducers: {
    [getTvShows.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTvShows.fulfilled]: (state, action) => {
      return {
        ...state,
        tvShows: action.payload.results?.map((item) => {
          return {
            ...item,
            isMovie: false,
          };
        }),
        isLoading: false,
      };
    },
    [getTvShows.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getIndividualTvShow.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getIndividualTvShow.fulfilled]: (state, action) => {
      return { ...state, individualTvShow: action.payload, isLoading: false };
    },
    [getIndividualTvShow.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getShowSeason.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getShowSeason.fulfilled]: (state, action) => {
      return { ...state, season: action.payload, isLoading: false };
    },
    [getShowSeason.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getShowEpisode.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getShowEpisode.fulfilled]: (state, action) => {
      return { ...state, episode: action.payload, isLoading: false };
    },
    [getShowEpisode.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getTrendingTvShows.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTrendingTvShows.fulfilled]: (state, action) => {
      return {
        ...state,
        trendingTvShows: action.payload.results?.map((tvShow) => {
          return {
            ...tvShow,
            isMovie: false,
          };
        }),
        isLoading: false,
      };
    },
    [getTrendingTvShows.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const { clearSelectedTvShow, clearShowSeason } = tvShowSlice.actions;
export default tvShowSlice.reducer;
