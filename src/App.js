import { Routes, Route } from "react-router-dom";
import { SocketContext, socket } from "./socket";
import { Comments } from "./components/comments/Comments";
import { CommentsBar } from "./components/AppBar";
import { CommentsTable } from './components/comments/CommentsTable'


function App() {
  return (
    <SocketContext.Provider value={socket}>
      <CommentsBar />
      <Routes>
        <Route path="/" element={<Comments />} />
        <Route path="/comments" element={<CommentsTable />} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
