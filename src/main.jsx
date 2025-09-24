import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>
)
