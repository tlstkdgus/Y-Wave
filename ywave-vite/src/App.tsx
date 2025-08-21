import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './Styles/GlobalStyle';
import Mobile from './Styles/Mobile';
import AppRouter from './Router';

function App(): React.JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Mobile>
          <AppRouter />
        </Mobile>
      </Router>
    </>
  );
}

export default App;
