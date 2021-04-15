import React, { useState } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Counter from './features/counter/Counter';
import Content from './components/Content/Content';

const App = () => {
  const [showExample, setShowExample] = useState(false);

  const toggleExample = () => {
    setShowExample(!showExample);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img className="main-logo" src={logo} alt="main logo" />
        <div className="p-container">
          <p>
            Hurray, you have just created a React + Redux Toolkit app with our
            project template CLI!
          </p>
        </div>

        {showExample ? <Counter /> : <Content />}

        <button
          className="toggle-example-button"
          type="button"
          onClick={() => toggleExample()}
        >
          {showExample ? 'Hide Redux Example' : 'Show Redux Example'}
        </button>

        <div className="link-container">
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Redux
          </a>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Redux Toolkit
          </a>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React Redux
          </a>
          <a
            className="App-link"
            href="https://www.npmjs.com/package/jw-project-template-cli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn this CLI
          </a>
        </div>
      </header>
    </div>
  );
};

export default App;
