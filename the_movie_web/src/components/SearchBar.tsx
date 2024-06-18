//SearchBar.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../store/movies/searchSlice';
import {
  SearchBarContainer,
  Input,
  Button
} from '../components/style/search';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchBarContainer>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for movies..."
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchBarContainer>
  );
};

export default SearchBar;
