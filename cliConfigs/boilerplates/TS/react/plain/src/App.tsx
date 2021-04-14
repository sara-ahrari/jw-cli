import logo from './assets/logo.svg';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="main-logo" alt="logo" />
        <div className="p-container">
          <p>
            Hurray, you have just created a React app with Jayway project
            template CLI!
          </p>
        </div>
        <div className="link-container">
          <a className="app-link" href="https://reactjs.org">
            Learn more about React
          </a>
          <a
            className="app-link"
            href="https://www.npmjs.com/package/jw-project-template-cli"
          >
            Read more about this CLI
          </a>
        </div>
      </header>
    </div>
  );
};

export default App;
