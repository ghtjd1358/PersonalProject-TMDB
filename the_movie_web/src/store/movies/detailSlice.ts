import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 영화 상세 정보 타입
interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

// 비동기 액션 생성자
export const fetchMovieDetail = createAsyncThunk(
  'detail/fetchMovieDetail',
  async (id) => {
    const API_KEY = '95cf4754aa20e43e9a9c24ba6ab4df52';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
      const response = await axios.get(url);
      return response.data;
    } 
);

interface DetailState {
  movieDetail: MovieDetail;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DetailState = {
  movieDetail: {
    id: 0,
    title: '',
    overview: '',
    poster_path: '',
    vote_average: 0,
    release_date: '',
  },
  status: 'idle',
  error: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    // 추가적인 리듀서 함수 작성 가능
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch movies';
      });
  },
});

export default detailSlice.reducer;
