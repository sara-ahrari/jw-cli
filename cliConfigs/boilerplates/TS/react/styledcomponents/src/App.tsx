import {
    AppContainer,
    Header,
    Logo,
    Title,
    LinkContainer,
    Link,
  } from './styles/App.styles';
  import logoSrc from './assets/logo.svg';
  
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
          <LinkContainer>
            <Link href="https://reactjs.org">Learn React</Link>
            <Link href="https://www.npmjs.com/package/jw-project-template-cli">
              Learn this CLI
            </Link>
          </LinkContainer>
        </Header>
      </AppContainer>
    );
  };
  
  export default App;
  