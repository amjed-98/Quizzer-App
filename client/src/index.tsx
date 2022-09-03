import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { ConfirmProvider } from 'material-ui-confirm';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from './mui';
import { SnackBarProvider } from './Components';
import AuthProvider from './Contexts/Auth';
import theme from './theme';
import App from './App';
import ReactQueryProvider from './QueryClient';
import ModalProvider from './Contexts/Modal';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = createRoot(document.getElementById('root')!);
const app = (
  <StrictMode>
    <ConfirmProvider>
      <BrowserRouter>
        <SnackBarProvider>
          <ReactQueryProvider>
            <ModalProvider>
              <AuthProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <StyledEngineProvider injectFirst>
                    <App />
                  </StyledEngineProvider>
                </ThemeProvider>
              </AuthProvider>
            </ModalProvider>
          </ReactQueryProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </ConfirmProvider>
  </StrictMode>
);

root.render(app);
