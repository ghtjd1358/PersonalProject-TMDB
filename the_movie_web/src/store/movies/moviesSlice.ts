import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';

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
  selectedFilter: 'popularity' | 'release_date' | 'vote_average';
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
}

const initialState: MoviesState = {
  selectedFilter: 'popularity',
  movies: [],
  status: 'idle',
  page: 0,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (filter: 'popularity' | 'release_date' | 'vote_average', { getState }) => {
    const state = getState() as { movies: MoviesState };
    const page = state.movies.page + 1;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${filter}.desc&page=${page}&language=ko-KR`;
    const response = await axios.get(url);
    return { results: response.data.results, page };
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.selectedFilter = action.payload;
      state.page = 0;
      state.movies = [];
    },
  },
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

export const { setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
