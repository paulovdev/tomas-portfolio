import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const modalAnim = {
  initial: { width: "0%" },
  animate: {
    width: "100%",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    width: "0%",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const opacityAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const ProjectDescription = ({ project, projectModal, setProjectModal }) => {
  const scrollPosRef = useRef(0);

  useEffect(() => {
    if (projectModal) {
      scrollPosRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.inset = "0px";
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.width = "100%";

      return () => {
        const y = Math.abs(parseInt(document.body.style.top || "0"));
        document.body.style.position = "";
        document.body.style.inset = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo({ top: y });
      };
    }
  }, [projectModal]);

  return (
    <>
      {projectModal && (
        <>
          {/* Modal */}
          <motion.div
            className="
              fixed top-0 right-0 
              max-w-[50vw] max-lg:max-w-screen
              h-svh max-md:h-[calc(var(--vh)*100)]
              overflow-y-auto 
              bg-[#F0EEE6] 
              z-2000
            "
            variants={modalAnim}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              variants={opacityAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className="size-full p-4 pt-4"
            >
              <nav className="mb-20 flex items-center justify-between">
                <p
                  className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-bold tracking-[-0.03em] cursor-pointer"
                  onClick={() => setProjectModal(false)}
                >
                  Close
                </p>
              </nav>

              <div className="mb-20 flex flex-col items-start">
                <p className="mb-4 text-p text-[1.5em] font-semibold tracking-[-0.03em]">
                  {project.title}
                </p>
                <p className="text-p/75 text-[1.75em] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
                  {project.description}
                </p>
              </div>

              <div className="pb-10 flex items-end justify-end">
                <div className="w-full flex items-start justify-between">
                  <p className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-bold tracking-[-0.03em]">
                    Information
                  </p>
                  <ul>
                    <li className="flex items-center gap-2">
                      <p className="text-p/75 text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-bold tracking-[-0.03em]">
                        Year:
                      </p>
                      <p className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-normal tracking-[-0.03em]">
                        {project.year}
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <p className="text-p/75 text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-bold tracking-[-0.03em]">
                        Website:
                      </p>
                      <p className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-normal tracking-[-0.03em]">
                        {project.website}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Backdrop */}
          <motion.div
            className="
              fixed top-0 left-0 
              w-full
              h-svh max-md:h-[calc(var(--vh)*100)]
              bg-bg/15 backdrop-blur-lg 
              z-1999
            "
            variants={opacityAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setProjectModal(false)}
          />
        </>
      )}
    </>
  );
};

export default ProjectDescription;
