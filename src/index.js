import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: "#dsad87"
    }
  },
  typography: {
    fontFamily: "Averta"
  }
});

const loadingScreen = (
  <div
    style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <h3>Loading...</h3>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={loadingScreen}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
