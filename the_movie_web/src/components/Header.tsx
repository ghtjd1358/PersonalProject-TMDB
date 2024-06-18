import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3c6bca;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin: 0;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-left: 20px;
    font-size: 1.2em;
  }

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
    font-weight: bold;

    &:hover {
      color: #052362;
    }
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Title>Movie App</Title>
      <Nav>
        <ul>
          <li><a href="#movies">영화</a></li>
          <li><a href="#about">TV프로그램</a></li>
          <li><a href="#contact">인물</a></li>
          <li><a href="#contact">즐겨찾기</a></li>
        </ul>
      </Nav>
    </HeaderContainer>
  );
}
