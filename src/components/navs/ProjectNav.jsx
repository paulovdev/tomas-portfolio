import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProjectStore } from "../../store/useProjectStore";
import ProjectDescription from "../ProjectDescription";
import { AnimatePresence } from "framer-motion";
import Clock from "./Clock";
const ProjectNav = () => {
  const { pathname } = useLocation();

  const { project, setProject } = useProjectStore();
  const [projectModal, setProjectModal] = useState(false);

  const isWorkDetail = /^\/works\/[^/]+$/.test(pathname);

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
    grid grid-cols-4 items-center mix-blend-exclusion max-md:flex max-md:justify-between max-md:items-center
    z-200
     
  `}
      >
        <div className="flex justify-start max-md:hidden">
          <Link
            to="/"
            className={`text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-medium tracking-[-0.03em] truncate
        
      `}
          >
            T—ML
          </Link>
        </div>

        <div className="flex justify-start gap-1 max-md:hidden">
          <Link
            to="/works"
            className={`text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-medium tracking-[-0.03em]
       
      `}
          >
            Work,
          </Link>

          <Link
            to="/about"
            className={`text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-medium tracking-[-0.03em]
       
      `}
          >
            About,
          </Link>

          <Link
            to="/contact"
            className={`text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-medium tracking-[-0.03em]
     
      `}
          >
            Contact
          </Link>
        </div>

        <div className="max-md:flex justify-center gap-1 hidden">
          <Link
            to="/"
            className={`text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-medium tracking-[-0.03em] 
        
      `}
          >
            T—ML,
          </Link>
          <Link
            to="/works"
            className={`text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-medium tracking-[-0.03em]`}
          >
            Work,
          </Link>

          <Link
            to="/about"
            className={`text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-medium tracking-[-0.03em]`}
          >
            About,
          </Link>

          <Link
            to="/contact"
            className={`text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-medium tracking-[-0.03em]`}
          >
            Contact
          </Link>
        </div>

        <div className="flex justify-center ">
          {isWorkDetail && project ? (
            <div className="w-full flex items-center gap-1">
              <span className="text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-semibold tracking-[-0.03em]">
                {project.title}
              </span>
              <span className="text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-semibold  tracking-[-0.15em]">
                —
              </span>

              <button
                onClick={() => setProjectModal(true)}
                className="text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-semibold tracking-[-0.03em] cursor-pointer"
              >
                Information
              </button>
            </div>
          ) : null}
        </div>

        <div className="w-full flex justify-end max-md:hidden">
          <span className="text-[clamp(1em,3vw,1em) max-sm:clamp(.75em,3vw,1em) ] text-s font-semibold tracking-[-0.03em] uppercase flex items-center gap-1">
            <Clock /> WET
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

export default ProjectNav;
