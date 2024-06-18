import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #3c6bca;
  padding: 20px;
  text-align: center;
  color: white;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1em;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterText>&copy; 2024 Movie App. All rights reserved.</FooterText>
    </FooterContainer>
  );
}
