import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styledNormalize from "styled-normalize";

const GlobalCSS = createGlobalStyle`
	${reset}
	${styledNormalize}

  input{
		border: none;
		outline: none;
  }

	button{
		border: none;
  }

  html{
		font-size: 62.5%;
		scroll-behavior: smooth;
	}
`;

export { GlobalCSS };