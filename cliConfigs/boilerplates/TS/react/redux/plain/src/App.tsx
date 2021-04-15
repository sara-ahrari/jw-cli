import React, { ReactElement, useState } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Counter from './features/counter/Counter';
import Content from './components/Content/Content';

const App = (): ReactElement => {
  const [showExample, setShowExample] = useState(false);

  const toggleExample = (): void => {
    setShowExample(!showExample);
  };

  return (
    <div className="app">
      <header className="app-header">
        <img className="main-logo" src={logo} alt="main logo" />
        <div className="title-container">
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
