//setup redux store
import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movie";
import tvShowSlice from "./slices/tvshows";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    tvShows: tvShowSlice,
  },
});

export default store;
