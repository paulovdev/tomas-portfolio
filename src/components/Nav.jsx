import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProjectStore } from "../store/useProjectStore";
import ProjectDescription from "./ProjectDescription";
import { AnimatePresence } from "framer-motion";

const Nav = () => {
  const { pathname } = useLocation();
  const [time, setTime] = useState("");
  const { project, setProject } = useProjectStore();
  const [projectModal, setProjectModal] = useState(false);

  const isHome = pathname === "/";
  const isWorkDetail = /^\/works\/[^/]+$/.test(pathname);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const formatted = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Atlantic/Canary",
      });

      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isWorkDetail) {
      setProject(null);
    }
  }, [isWorkDetail]);

  return (
    <>
      <nav
        className={`
    fixed top-0 left-0 p-4 py-2 w-full
    grid grid-cols-4 items-center
    z-100
    ${
      isHome ? "text-white mix-blend-normal" : "text-white mix-blend-difference"
    }
  `}
      >
        {/* COLUNA 1 — BOTH */}
        <div className="flex justify-start">
          <Link
            to="/"
            className={`text-[1em] font-medium tracking-[-0.03em]
        ${pathname === "/" ? "opacity-100" : "opacity-50"}
      `}
          >
            BOTH
          </Link>
        </div>

        {/* COLUNA 2 — Work, Studio, Contact */}
        <div className="flex justify-center gap-2">
          <Link
            to="/works"
            className={`text-[1em] font-medium tracking-[-0.03em]
        ${pathname === "/works" ? "opacity-100" : "opacity-50"}
      `}
          >
            Work,
          </Link>

          <Link
            to="/about"
            className={`text-[1em] font-medium tracking-[-0.03em]
        ${pathname === "/about" ? "opacity-100" : "opacity-50"}
      `}
          >
            Studio,
          </Link>

          <Link
            to="/contact"
            className={`text-[1em] font-medium tracking-[-0.03em]
        ${pathname === "/contact" ? "opacity-100" : "opacity-50"}
      `}
          >
            Contact
          </Link>
        </div>

        {/* COLUNA 3 — Project Title + Information (aparece só no Work Detail) */}
        <div className="flex justify-center">
          {isWorkDetail && project ? (
            <div className="flex items-center gap-2">
              <span className="text-[1em] font-semibold tracking-[-0.03em]">
                {project.title}
              </span>
              <span className="text-[1em] font-semibold">—</span>

              <button
                onClick={() => setProjectModal(true)}
                className="text-[1em] font-semibold tracking-[-0.03em] cursor-pointer"
              >
                Information
              </button>
            </div>
          ) : null}
        </div>

        {/* COLUNA 4 — Time (sempre aparece, inclusive no Work Detail) */}
        <div className="flex justify-end">
          <span className="text-[1em] font-semibold tracking-[-0.03em] uppercase">
            {time} WET
          </span>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {projectModal && (
          <ProjectDescription
            project={project}
            projectModal={projectModal}
            setProjectModal={setProjectModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
