import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchMovies } from '../store/movies/moviesSlice';
import {
  MovieContainer,
  MovieCard,
  MovieTitle,
  MovieImage,
  MovieReleaseDate,
  LoadMoreButton,
} from '../components/style/list';

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const searchResults = useSelector((state: RootState) => state.search.movies); 
  const status = useSelector((state: RootState) => state.movies.status);
  const searchStatus = useSelector((state: RootState) => state.search.status); 
  const error = useSelector((state: RootState) => state.movies.error);

  // 초기 영화 목록을 불러오는 로직
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (status === 'succeeded') {
      dispatch(fetchMovies());
    }
  };

  const moviesToDisplay = searchResults.length > 0 ? searchResults : movies;

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {(status === 'succeeded' || searchStatus === 'succeeded') && (
        <MovieContainer>
          {moviesToDisplay.map(movie => (
            <MovieCard key={movie.id}>
              <MovieImage
                src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieReleaseDate>{movie.release_date}</MovieReleaseDate>
            </MovieCard>
          ))}
        </MovieContainer>
      )}
      <LoadMoreButton 
        type='button'  
        onClick={handleLoadMore} 
        disabled={status === 'loading'}>
        Load More
      </LoadMoreButton>
    </div>
  );
}

export default MovieList;
