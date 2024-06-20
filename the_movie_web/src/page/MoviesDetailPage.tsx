import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchMovieDetail } from '../store/movies/detailSlice';
import { RootState } from '../store/store'; // 루트 스토어 타입

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, status, error } = useSelector((state: RootState) => state.detail);

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      { status === 'loading' && <div>Loading...</div>}
      { status === 'failed' && <div>LError: {error}</div>}
      <h1>{movieDetail.title}</h1>
      <img
        src={`http://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
        alt={movieDetail?.title}
      />
      <p>{movieDetail.overview}</p>
      <p>평점: {movieDetail.vote_average}</p>
      <p>개봉일: {movieDetail.release_date}</p>
    </div>
  );
};

export default MovieDetailPage;
