import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchMovies, setFilter } from '../store/movies/moviesSlice';
import {
  MovieContainer,
  MovieCard,
  MovieTitle,
  MovieImage,
  MovieReleaseDate,
  LoadMoreButton,
  FilterButton,
  FilterContainer
} from '../components/style/list';

interface MovieListProps {
  searchQuery: string;
}

const MovieList: React.FC<MovieListProps> = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const status = useSelector((state: RootState) => state.movies.status);
  const error = useSelector((state: RootState) => state.movies.error);
  const selectedFilter = useSelector((state: RootState) => state.movies.selectedFilter);
  const searchResults = useSelector((state: RootState) => state.search.movies);

  // 영화 목록 나열
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies(movies));
    }
  }, [status, dispatch, movies]);

  // Load More 
  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (status === 'succeeded') {
      dispatch(fetchMovies(selectedFilter));
    }
  };

  // 영화 필터 
  const handleFilterChange = (filter: 'popularity' | 'release_date' | 'vote_average') => {
    dispatch(setFilter(filter));
    dispatch(fetchMovies(filter));
  };

  const moviesToDisplay = searchResults.length > 0 ? searchResults : movies;

  return (
    <div>
      <FilterContainer>
        <label></label>
        <FilterButton  onClick={() => handleFilterChange('popularity')} disabled={selectedFilter === 'popularity'}>인기순</FilterButton>
        <FilterButton  onClick={() => handleFilterChange('release_date')} disabled={selectedFilter === 'release_date'}>최신순</FilterButton>
        <FilterButton  onClick={() => handleFilterChange('vote_average')} disabled={selectedFilter === 'vote_average'}>평점순</FilterButton>
      </FilterContainer>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <MovieContainer>
          {moviesToDisplay.map(movie => (
            <MovieCard key={movie.id}>
              <MovieImage
                src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieReleaseDate>{movie.release_date}</MovieReleaseDate>
              <p>평점 : {movie.vote_average}</p>
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
};

export default MovieList;
