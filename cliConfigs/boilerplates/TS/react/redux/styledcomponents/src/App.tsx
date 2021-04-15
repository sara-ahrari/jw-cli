import React, {useState, ReactElement} from 'react';
import Counter from './features/counter/Counter';

import {
  AppContainer,
  Header,
  Logo,
  Title,
  LinkContainer,
  Link,
  ExampleButton
} from './styles/App.styles';
import logoSrc from './assets/logo.svg';
import Content from './components/Content/Content';

const App = (): ReactElement => {

  const [showExample, setShowExample] = useState(false);

  const toggleExample = (): void => {
    setShowExample(!showExample);
  };

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

        {showExample ? <Counter /> : <Content />}

        <ExampleButton
          className="toggle-example-button"
          type="button"
          onClick={() => toggleExample()}
        >
          {showExample ? 'Hide Redux Example' : 'Show Redux Example'}
        </ExampleButton>
        
        <LinkContainer>
          <Link href="https://reactjs.org/">Learn React</Link>
          <Link href="https://redux.js.org/">Learn Redux</Link>
          <Link href="https://redux-toolkit.js.org/">Learn Redux Toolkit</Link>
          <Link href="https://react-redux.js.org/">Learn React Redux</Link>
          <Link href="https://www.npmjs.com/package/jw-project-template-cli">
            Learn this CLI
          </Link>
        </LinkContainer>
      </Header>
    </AppContainer>
  );
};

export default App;
