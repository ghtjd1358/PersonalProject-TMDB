import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  favorite: boolean;
}

interface SearchState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  query: string;
}

const initialState: SearchState = {
  movies: [],
  status: 'idle',
  query: '',
  error: null,
};

export const searchMovies = createAsyncThunk('search/searchMovies', async (query: string) => {
  const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`);
  return { results: response.data.results, query };
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results;
        state.query = action.payload.query;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search movies';
      });
  },
});

export default searchSlice.reducer;
