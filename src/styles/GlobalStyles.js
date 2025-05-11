import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-dark-blue: #0B3C5D; /* Dark/Navy Blue for V,E,G,H */
    --primary-light-blue: #328CC1; /* Light/Azure Blue for A */
    --secondary-blue: #1D70B8; /* Secondary blue shade */
    --text-dark: #333333; /* Dark text color */
    --text-light: #FFFFFF; /* Light text color */
    --background-light: #FFFFFF; /* Light background */
    --background-gray: #F5F5F5; /* Light gray background */
    --border-light: #E0E0E0; /* Light border color */
    --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow */
    --transition-speed: 250ms; /* Default transition speed */
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-dark);
    background-color: var(--background-light);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--primary-dark-blue);
    text-decoration: none;
    transition: color var(--transition-speed) ease;
  }

  a:hover {
    color: var(--primary-light-blue);
  }

  button {
    cursor: pointer;
    font-family: inherit;
    transition: all var(--transition-speed) ease;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  section {
    padding: 5rem 0;
  }

  @media (max-width: 768px) {
    section {
      padding: 3rem 0;
    }
  }
`;

export default GlobalStyles;