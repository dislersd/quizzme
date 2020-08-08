import styled, { createGlobalStyle } from "styled-components";
import bgImage from "./img/beachBG.jpg";

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: url(${bgImage});
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    box-sizing: border-box; 
    font-family: Catamaran, Arial, Helvetica, sans-serif;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: Fascinate Inline, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-coloer: transparent;
    font-weight: 400;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 50px;
    text-align: center;
    margin: 20px 0 5px 0;
  }

  .start, .next {
    cursor: pointer;
    background: #f7e407;
    border: none;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    position: relative;
    bottom: 0;

    :hover {
      background: lightgoldenrodyellow;
    }
  }

  .start {
    max-width: 200px;
  }
`;
