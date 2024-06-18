// ../components/style/list.ts

import styled from 'styled-components';

export const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MovieCard = styled.div`
  margin: 10px;
  width: 200px;
`;

export const MovieTitle = styled.h3`
  font-size: 1.2em;
`;

export const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

export const MovieReleaseDate = styled.p`
  font-size: 0.8em;
  color: #555;
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1em;
`;

export const FilterButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const FavoriteButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #cc5038;
  }
`;
