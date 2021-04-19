import React from 'react';
import styles from './Content.module.css';
import contentFromCLI from './contentFromCLI.json';

/**
 * General component description.
 * You can even use the native Markdown here.
 * E.g.:
 * ```html
 * <MyComponent foo={541} />
 * ```
 */
const Content = () => {
  return (
    <div className={styles.container}>
      <h4>This is included in your project {contentFromCLI.projectName}:</h4>
      <p>* A React project template in {contentFromCLI.language}.</p>
      {contentFromCLI.redux && (
        <p>* {contentFromCLI.redux} for state handling.</p>
      )}
      {contentFromCLI.linting && (
        <p>* Eslint {contentFromCLI.linting} for linting.</p>
      )}
      {contentFromCLI.formatting && (
        <p>* Prettier for formatting.</p>
      )}
      {contentFromCLI.preCommits && (
        <p>* {contentFromCLI.preCommits} for pre-commit hooks.</p>
      )}
      {contentFromCLI.styledComponents && <p>Styled-components for styling.</p>}
      {contentFromCLI.documentation && (
        <p>* React DOC Generator for documentation.</p>
      )}
    </div>
  );
};

export default Content;
