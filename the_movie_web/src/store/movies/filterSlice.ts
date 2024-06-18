// 비동기 액션 정의
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilteredMovies = createAsyncThunk(
    'filter/fetchFilteredMovies',
    async () => {
    const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
      return response.data.results;
    }
  );
  
  interface FilterState {
    favoriteOnly: boolean;
    movies: [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: FilterState = {
    favoriteOnly: false,
    movies: [],
    status: 'idle',
    error: null,
  };
  
  const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      toggleFavoriteFilter(state) {
        state.favoriteOnly = !state.favoriteOnly;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFilteredMovies.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchFilteredMovies.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.movies = action.payload;
        })
        .addCase(fetchFilteredMovies.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch movies';
        });
    },
  });
  
  export const { toggleFavoriteFilter } = filterSlice.actions;
  export default filterSlice.reducer;
  