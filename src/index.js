import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import TradingContextProvider, { TradingContext } from './context/Trading';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TradingContextProvider>
      <App />
      <Toaster position='top-center' gutter={8} toastOptions={{duration:800,style: {
      background: '#fff',
      color: '#363636',
    }, success:{duration:20000,theme: {
      primary: 'green',
      secondary: 'white',
    },} }}/>
    </TradingContextProvider>
);

export const server = 'https://api.coingecko.com/api/v3'
