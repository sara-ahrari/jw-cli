import {
  AppContainer,
  Header,
  Logo,
  Title,
  LinkContainer,
  Link,
} from './styles/App.styles';
import logoSrc from './assets/logo.svg';
import Content from './components/Content/Content';

const App = () => {
  return (
    <AppContainer>
      <Header>
        <Logo src={logoSrc} alt="main logo" />
        <Title>
          <p>
            Hurray, you have just created a React app with Jayway project
            template CLI!
          </p>
        </Title>
        <Content />
        <LinkContainer>
          <Link
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
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
