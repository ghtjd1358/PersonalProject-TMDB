import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredMovies } from '../store/movies/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchFilteredMovies());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default Filter;
