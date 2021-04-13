import { ReactComponent as Logo } from './assets/logo.svg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo style={{ height: '30vmin' }} />
        <p>
          Hurray, you have just created a React app with Jayway project template
          CLI!
        </p>
        <div className="link-container">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about React
          </a>
          <a
            className="App-link"
            href="https://www.npmjs.com/package/jw-project-template-cli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more about this CLI
          </a>
        </div>
      </header>
    </div>
  );
};

export default App;
