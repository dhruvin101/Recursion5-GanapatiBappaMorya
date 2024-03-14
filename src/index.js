import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import TradingContextProvider, { TradingContext } from './context/Trading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TradingContextProvider>
      <App />
    </TradingContextProvider>
);

export const server = 'https://api.coingecko.com/api/v3'
