import React, { ReactElement } from 'react';
import contentFromCLI from './contentFromCLI.json';
import styles from './Content.module.css';

const Content = (): ReactElement => {
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
      {contentFromCLI.formatting && <p>* Prettier for formatting.</p>}
      {contentFromCLI.preCommits && (
        <p>* {contentFromCLI.preCommits} for pre-commit hooks.</p>
      )}
      {contentFromCLI.styledComponents && <p>* Styled-components for styling.</p>}
      {contentFromCLI.documentation && (
        <p>* React DOC Generator for documentation.</p>
      )}
    </div>
  );
};

export default Content;
