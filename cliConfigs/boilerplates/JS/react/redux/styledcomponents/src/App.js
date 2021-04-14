import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Counter from './features/counter/Counter';
import {
  AppContainer,
  Logo,
  Header,
  Title,
  LinkContainer,
  Link,
} from './styles/App.styles';

const App = () => {
  return (
    <AppContainer>
      <Header>
        <Logo src={logo} alt="main logo" />

        <Title>
          <p>
            Hurray, you have just created a React + Redux Toolkit app with our
            project template CLI!
          </p>
        </Title>

        <Counter />

        <LinkContainer>
          <Link
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </Link>
          <Link
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Redux
          </Link>
          <Link
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Redux Toolkit
          </Link>
          <Link
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React Redux
          </Link>
          <Link
            href="https://www.npmjs.com/package/jw-project-template-cli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn this CLI
          </Link>
        </LinkContainer>
      </Header>
    </AppContainer>
  );
};

export default App;
