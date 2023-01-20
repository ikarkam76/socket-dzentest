import React from 'react';
import ReactDOM from 'react-dom/client';
import { SocketContext, socket } from "./socket";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketContext.Provider value={socket}>
    <App />
  </SocketContext.Provider>
);

