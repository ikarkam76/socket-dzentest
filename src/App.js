import { Routes, Route } from "react-router-dom";
import { SocketContext, socket } from "./socket";
import { Comments } from "./components/comments/Comments";
import { CommentsBar } from "./components/AppBar";
import { CommentsTable } from './components/comments/CommentsTable'
import { ImagesView } from "./components/images/ImagesView";


function App() {
  return (
    <SocketContext.Provider value={socket}>
      <CommentsBar />
      <Routes>
        <Route path="/" element={<Comments />} />
        <Route path="/comments" element={<CommentsTable />} />
        <Route path="/images" element={<ImagesView />} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
