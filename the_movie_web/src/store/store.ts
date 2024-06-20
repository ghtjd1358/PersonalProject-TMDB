import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../store/movies/moviesSlice';
import searchReducer from '../store/movies/searchSlice'
import detailReducer from './movies/detailSlice';


const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search : searchReducer,
    detail : detailReducer
   
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
