import ChatPage from "./components/ChatPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Router>
        <div className="h-screen relative bg-light-grey flex flex-col">
          <Nav />

          <Routes>
            <Route path="/" element={<ChatPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
