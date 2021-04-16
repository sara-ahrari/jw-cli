import React, { ReactElement } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Content from './components/Content/Content';


const App = (): ReactElement => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="main-logo" alt="logo" />
        <div className="title-container">
          <h4>
            Hurray, you have just created a React app with Jayway project
            template CLI!
          </h4>
        </div>
        <Content />
        <div className="link-container">
          <a className="app-link" href="https://reactjs.org">
            Learn React
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
