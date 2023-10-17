import React from 'react';
import ReactDOM from 'react-dom/client';
import { persister, store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from './axiosApi';
import { GOOGLE_CLIENT_ID } from './constants';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import './index.css';
import App from './App';

addInterceptors(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
);
