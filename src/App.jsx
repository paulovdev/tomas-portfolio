import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Works from "./pages/work/Works";
import WorkView from "./pages/work/WorkView";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/404/404";

function App() {
  function fixVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  window.addEventListener("resize", fixVH);
  fixVH();

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/works" element={<Works />} />
      <Route path="/works/:workId" element={<WorkView />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
