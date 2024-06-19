import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchMovies } from '../store/movies/moviesSlice';
import { setFilter } from '../store/movies/filterSlice';
import {
  MovieContainer,
  MovieCard,
  MovieTitle,
  MovieImage,
  MovieReleaseDate,
  LoadMoreButton,
} from '../components/style/list';

interface MovieListProps {
  searchQuery: string;
}

const MovieList: React.FC<MovieListProps> = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const status = useSelector((state: RootState) => state.movies.status);
  const error = useSelector((state: RootState) => state.movies.error);
  const selectedFilter = useSelector((state: RootState) => state.movies.selectedFilter);
  const searchResults = useSelector((state: RootState) => state.search.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies(selectedFilter));
    }
  }, [status, dispatch, selectedFilter]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (status === 'succeeded') {
      dispatch(fetchMovies(selectedFilter));
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value as 'popularity' | 'release_date' | 'vote_average';
    dispatch(setFilter(filter));
    dispatch(fetchMovies(filter));
  };

  return (
    <div>
      <div>
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
          <option value="popularity">Popularity</option>
          <option value="release_date">Release Date</option>
          <option value="vote_average">Vote Average</option>
        </select>
      </div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <MovieContainer>
          {(searchQuery ? searchResults : movies).map((movie) => (
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
};

export default MovieList;
