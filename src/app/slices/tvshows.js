import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/instance";

const initialState = {
  tvShows: [],
  isLoading: false,
  error: null,
  individualTvShow: {},
  season: {},
  episode: {},
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
      return { ...state, tvShows: action.payload.results, isLoading: false };
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
  },
});

export const { clearSelectedTvShow, clearShowSeason } = tvShowSlice.actions;
export default tvShowSlice.reducer;
