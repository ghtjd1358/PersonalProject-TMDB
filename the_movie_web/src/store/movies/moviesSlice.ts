// moviesSlice.ts
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

interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  page: 0,
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { getState }) => {
  const state = getState() as { movies: MoviesState };
  const page = state.movies.page + 1;
  const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`);
  return { results: response.data.results, page };
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = [...state.movies, ...action.payload.results];
        state.page = action.payload.page;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export default moviesSlice.reducer;
