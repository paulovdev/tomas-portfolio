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
          <Route index element={<Transition Page={Home} bg="#111111" />} />
          <Route
            path="/works"
            element={<Transition Page={Works} bg="#ffffff" />}
          />
          <Route
            path="/works/:workId"
            element={<Transition Page={WorkView} bg="#111111" />}
          />
          <Route
            path="/about"
            element={<Transition Page={About} bg="#111111" />}
          />{" "}
          <Route
            path="/contact"
            element={<Transition Page={Contact} bg="#ffffff" />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
