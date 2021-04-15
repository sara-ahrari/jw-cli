import './App.css';
import logoSrc from './assets/logo.svg';
import Content from './components/Content/Content';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img className="main-logo" src={logoSrc} alt="main logo" />
        <div className="title-container">
          <h4>
            Hurray, you have just created a React app with Jayway project
            template CLI!
          </h4>
        </div>
        <Content />
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
