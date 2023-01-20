import { SocketContext, socket } from "./socket";
import "./App.css";
import { Comments } from "./components/Comments";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Comments />
    </SocketContext.Provider>
  );
}

export default App;
