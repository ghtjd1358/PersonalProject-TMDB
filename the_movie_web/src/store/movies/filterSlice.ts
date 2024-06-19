// moviesSlice.ts
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

export const filterMovies = createAsyncThunk(
  'movies/filterMovies',
  async (_, { getState }) => {
    const state = getState() as { movies: MoviesState };
    const page = state.movies.page + 1;
    const filterType = state.movies.selectedFilter;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${filterType}.desc&page=${page}`;
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
      state.page = 0; // 필터가 변경되면 페이지를 초기화
      state.movies = []; // 필터가 변경되면 영화 목록을 초기화
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = [...state.movies, ...action.payload.results];
        state.page = action.payload.page;
      })
      .addCase(filterMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const { setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
