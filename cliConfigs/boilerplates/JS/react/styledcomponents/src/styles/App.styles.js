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
  width: 70%;
  background-color: black;
  opacity: 70%;
  align-self: center;
  color: white;
  h4 {
    font-size: 100%;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  position: fixed; 
  bottom: 2vmin;
  width: 70%;
  justify-content: space-evenly;
`;

export const Link = styled.a`
  color: rgb(112, 76, 182);
`;
