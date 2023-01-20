import React from 'react';
import socketio from "socket.io-client";
const BASE_URL = process.env.BASE_URL

export const socket = socketio.connect(BASE_URL);
export const SocketContext = React.createContext();
