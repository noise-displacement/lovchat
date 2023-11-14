import ChatPage from "./pages/ChatPage";
import Index from "./pages/Index";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLoaderData,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import Nav from "./components/Nav";
import Faq from "./pages/faq";
import About from "./pages/About";
import MyPage from "./pages/MyPage";
import { AnimatePresence, motion } from "framer-motion";
import SiteRoutes from "./components/SiteRoutes";

const pages = [
  {
    title: "Chat",
    path: "/chat",
    element: <ChatPage />,
  },
  {
    title: "Andre lurer på",
    path: "/faq",
    element: <Faq />,
  },
  {
    title: "Om",
    path: "/om",
    element: <About />,
  },
  {
    title: "Min side",
    path: "/minside",
    element: <MyPage />,
  },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="h-screen relative bg-light-grey flex flex-col font-sans">
          <Nav pages={pages} />
          <SiteRoutes pages={pages} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
