import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProjectStore } from "../store/useProjectStore";
import ProjectDescription from "./ProjectDescription";
import { AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "BOTH" },
  { href: "/works", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
      const formatted = now
        .toLocaleTimeString("en-AU", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Australia/Sydney",
        })
        .replace(" ", "");

      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isWorkDetail && project) setProject(null);
  }, [pathname, project]);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 p-4 py-2 w-full flex items-center justify-between 
          z-100 
          ${
            isHome
              ? "text-white mix-blend-normal"
              : "text-white mix-blend-difference"
          }
        `}
      >
        <div className="flex items-center gap-1 w-full">
          <div className="flex gap-1">
            {links.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                className={`
                  text-[1em] font-medium tracking-[-0.03em] max-md:text-[1.1em]
                  ${
                    isHome
                      ? "opacity-100"
                      : isWorkDetail
                      ? "opacity-100"
                      : pathname === link.href
                      ? "opacity-100"
                      : "opacity-50"
                  }
                `}
              >
                {link.label}
                {i !== links.length - 1 && ","}
              </Link>
            ))}
          </div>
        </div>

        <div className="mr-[60px] w-full flex justify-end">
          {isWorkDetail && project && (
            <div className="flex items-center gap-2">
              <span className="text-[1em] font-semibold tracking-[-0.03em] max-md:text-[1.1em]">
                {project.title}
              </span>
              <span className="text-[1em] font-semibold max-md:text-[1.1em]">
                —
              </span>
              <button
                onClick={() => setProjectModal(true)}
                className="text-[1em] font-semibold tracking-[-0.03em] max-md:text-[1.1em] cursor-pointer"
              >
                Information
              </button>
            </div>
          )}
        </div>

        <div
          className={`w-full flex justify-end ${
            isWorkDetail && "max-md:hidden"
          } `}
        >
          <span className="text-[1em] font-semibold tracking-[-0.03em] truncate max-md:text-[1.1em] uppercase ">
            {time}
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
