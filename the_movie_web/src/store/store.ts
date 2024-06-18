import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../store/movies/moviesSlice';
import searchReducer from '../store/movies/searchSlice'
import filterReducdr from '../store/movies/filterSlice'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search : searchReducer,
    filters : filterReducdr
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
