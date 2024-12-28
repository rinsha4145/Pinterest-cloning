import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Components/Redux/Store'; // Import store and persistor
import { ClickHandlerProvider } from './Components/Context/ClickHandlerContext';

// import { SnackbarProvider, useSnackbar } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
     <ClickHandlerProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {/* <SnackbarProvider maxSnack={3}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </SnackbarProvider> */}
      </PersistGate>
    </Provider>
    </ClickHandlerProvider>
  </React.StrictMode>
);
