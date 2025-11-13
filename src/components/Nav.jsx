import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProjectStore } from "../store/useProjectStore";
import ProjectDescription from "./ProjectDescription";
import { AnimatePresence } from "framer-motion";

const links = [
  { href: "/works", label: "works" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [time, setTime] = useState("");
  const { project, setProject } = useProjectStore();
  const [projectModal, setProjectModal] = useState(false);
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-AU", {
        hour12: false,
        timeZone: "Australia/Sydney",
      });
      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const isWorkDetail = /^\/works\/[^/]+$/.test(pathname);

    if (!isWorkDetail && project) {
      setProject(null);
    }
  }, [pathname, project, setProject]);

  const isHome = pathname === "/";
  const isWork = /^\/works\/[^/]+$/.test(pathname);
  return (
    <>
      <nav
        className={`fixed top-0 left-0 p-4 py-2 w-full flex items-center justify-between z-100 
         ${isHome ? "mix-blend-normal" : "mix-blend-exclusion"} ${
          isWork ? "mix-blend-normal" : "mix-blend-exclusion"
        } 
       `}
      >
        <div className="w-full max-md:hidden">
          <Link
            to="/"
            className={`${isHome ? "text-s" : "text-s/50"} ${
              isWork && "text-p! font-semibold"
            } text-[1em] font-medium tracking-[-0.03em] cursor-pointer`}
          >
            BOTH
          </Link>
        </div>{" "}
        <div className="w-fit mr-2 max-md:block hidden">
          <Link
            to="/"
            className={`${isHome ? "text-s" : "text-s/50"} ${
              isWork && "text-s! font-semibold"
            } text-[1em] font-medium tracking-[-0.03em] cursor-pointer`}
          >
            BOTH,
          </Link>
        </div>
        <div
          className={`w-full ${
            isWork ? "" : "flex items-center justify-center gap-3"
          } `}
        >
          {links.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              className={`${
                isHome
                  ? "text-s"
                  : pathname === link.href
                  ? "text-s"
                  : "text-s/50"
              }  ${
                isWork && "text-s! font-semibold"
              } text-[1em] font-medium tracking-[-0.03em] cursor-pointer`}
            >
              {link.label}
              {i !== links.length - 1 && ", "}
            </Link>
          ))}
        </div>
        <div className={`w-full ${isWork && "max-md:w-fit"}`}>
          {/^\/works\/[^/]+$/.test(pathname) && project && (
            <div className="flex items-center gap-2">
              <span className="text-p text-[1em] font-semibold tracking-[-0.03em]">
                {project.title}
              </span>
              <span className="text-p text-[1em] font-semibold">—</span>
              <button
                onClick={() => setProjectModal(true)}
                className="text-p text-[1em] font-semibold tracking-[-0.03em] cursor-pointer"
              >
                information
              </button>
            </div>
          )}
        </div>
        <div
          className={`w-full flex items-center justify-end text-s text-[1em] font-semibold tracking-[-0.03em] ${
            isWork && "max-md:hidden"
          } `}
        >
          <span>{time} AEDT</span>
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
