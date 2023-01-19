import io from "socket.io-client";
const BASE_URL = process.env.BASE_URL;

const socket = io(BASE_URL);

export default socket;