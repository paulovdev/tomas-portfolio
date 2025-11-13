import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import Transition from "./loaders/Transition";
import Works from "./pages/work/Works";
import WorkView from "./pages/work/WorkView";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

function App() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={`${location.pathname}-${location}`}>
          <Route index element={<Transition Page={Home} bg="#fefefe" />} />
          <Route
            path="/works"
            element={<Transition Page={Works} bg="#fefefe" />}
          />
          <Route
            path="/works/:workId"
            element={<Transition Page={WorkView} bg="#fefefe" />}
          />
          <Route
            path="/about"
            element={<Transition Page={About} bg="#fefefe" />}
          />{" "}
          <Route
            path="/contact"
            element={<Transition Page={Contact} bg="#fefefe" />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
