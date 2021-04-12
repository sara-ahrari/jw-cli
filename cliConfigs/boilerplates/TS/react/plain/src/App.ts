import React from 'react';
import logo from './Jayway+byDevoteam.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://www.npmjs.com/package/jw-project-template-cli"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about the Jayway CLI 
        </a>
      </header>
    </div>
  );
}

export default App;
