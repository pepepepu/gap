import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
    background-color: #121212;
    color: #ffffff;
    overflow: hidden;
  }

  button, input, textarea {
    font-family: inherit;
  }
`;
