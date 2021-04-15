import { createGlobalStyle } from 'styled-components';
import img from '../assets/1178.gif';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Jayway-font';
        src: url("//db.onlinewebfonts.com/t/861c82904eac3945e456aa830c96b1dd.woff2") format("woff2");
    }

    html {
        background: url(${img}) no-repeat center center fixed;
        background-size: cover;
    }

    body {
        margin: 0;
        font-family: 'Jayway-font';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyle;
