import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Counter from './features/counter/Counter';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img className="main-logo" src={logo} alt="main logo" />
        <div className="p-container">
          <p>
            Hurray, you have just created a React + Redux Toolkit app with our
            project template CLI!
          </p>
        </div>

        <Counter />

        <div className="link-container">
          <a className="app-link" href="https://reactjs.org/">
            Learn React
          </a>
          <a className="app-link" href="https://redux.js.org/">
            Learn Redux
          </a>
          <a className="app-link" href="https://redux-toolkit.js.org/">
            Learn Redux Toolkit
          </a>
          <a className="app-link" href="https://react-redux.js.org/">
            Learn React Redux
          </a>
          <a
            className="app-link"
            href="https://www.npmjs.com/package/jw-project-template-cli"
          >
            Learn this CLI
          </a>
        </div>
      </header>
    </div>
  );
};

export default App;
