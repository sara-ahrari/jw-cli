import styled from 'styled-components';

export const AppContainer = styled.div`
  text-align: center;
`;

export const Logo = styled.img`
  height: 10vmin;
  margin-left: 5%;
  margin-top: 5%;
  align-self: flex-start;
`;

export const Header = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
`;

export const Title = styled.div`
  border-radius: 50px;
  width: 60%;
  background-color: black;
  margin-top: 2px;
  opacity: 70%;
  align-self: center;

  p {
    color: white;
    font-size: 100%;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: 30vmin;
  width: 40%;
  justify-content: space-between;
`;

export const Link = styled.a`
  background-color: #eca541;
  border-radius: 5px;
  color: white;
  margin: 0.2em;
  padding: 15px;
  text-decoration: none;

  :hover {
    color: inherit;
    background-color: #f9cdda;
  }
`;
