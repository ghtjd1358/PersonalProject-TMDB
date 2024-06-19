// ../components/style/list.ts

import styled from 'styled-components';

export const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MovieCard = styled.div`
  margin: 10px;
  padding: 15px;
  width: 260px;
  height: 390px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
`;

export const MovieTitle = styled.h3`
  font-size: 1.2em;
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 5px;
`;

export const MovieReleaseDate = styled.p`
  font-size: 0.8em;
  color: #555;
`;

export const LoadMoreButton = styled.button`
  width: 90%;
  color: #fff;
  background-color: #3c6bca;
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;

  &:hover{
    background-color: #052362
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;
`

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
