import React from 'react';
import contentFromCLI from './contentFromCLI.json';
import { Container, Title, Item } from './Content.styles.js';


/**
 * General component description.
 * You can even use the native Markdown here.
 * E.g.:
 * ```html
 * <MyComponent foo={541} />
 * ```
 * @returns {ReactElement}
 */
const Content = () => {
  return (
    <Container>
      <Title>
        This is included in your project {contentFromCLI.projectName}:
      </Title>
      <Item>* A React project template in {contentFromCLI.language}.</Item>
      {contentFromCLI.redux && (
        <Item>* {contentFromCLI.redux} for state handling.</Item>
      )}
      {contentFromCLI.linting && (
        <Item>* Eslint {contentFromCLI.linting} for linting.</Item>
      )}
      {contentFromCLI.formatting && <Item>* Prettier for formatting.</Item>}
      {contentFromCLI.preCommits && (
        <Item>* {contentFromCLI.preCommits} for pre-commit hooks.</Item>
      )}
      {contentFromCLI.styledComponents && (
        <Item>* Styled-components for styling.</Item>
      )}
      {contentFromCLI.documentation && (
        <Item>* React DOC Generator for documentation.</Item>
      )}
    </Container>
  );
};

export default Content;
