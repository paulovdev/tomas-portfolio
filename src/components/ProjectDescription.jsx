import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const modalAnim = {
  initial: { width: "0%" },
  animate: {
    width: "100%",
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    width: "0%",
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
};

const opacityAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
};

const ProjectDescription = ({ project, projectModal, setProjectModal }) => {
  const scrollPosRef = useRef(0);

  useEffect(() => {
    if (projectModal) {
      // Salva a posição atual do scroll
      scrollPosRef.current = window.scrollY;

      // Bloqueia scroll no body
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";

      return () => {
        // Restaura scroll ao fechar
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosRef.current);
      };
    }
  }, [projectModal]);

  return (
    <>
      {projectModal && (
        <>
          {/* Modal */}
          <motion.div
            className="fixed top-0 right-0 max-w-[50vw] h-screen overflow-y-auto bg-[#F0EEE6] max-lg:max-w-screen z-2000"
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
              className="h-full p-4 pt-4"
            >
              <nav className="mb-20 flex items-center justify-between">
                <p
                  className="text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-[.85em] font-semibold tracking-[-0.03em] cursor-pointer"
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
                  <p className="text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-[.85em] font-semibold tracking-[-0.03em]">
                    Information
                  </p>
                  <ul>
                    <li className="flex items-center gap-2">
                      <p className="text-p/75 text-[clamp(1rem,5vw,1rem)] max-sm:text-[.85em] font-semibold tracking-[-0.03em]">
                        Year:
                      </p>
                      <p className="text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-[.85em] font-semibold tracking-[-0.03em]">
                        {project.year}
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <p className="text-p/75 text-[clamp(1rem,5vw,1rem)] max-sm:text-[.85em] font-semibold tracking-[-0.03em]">
                        Website:
                      </p>
                      <p className="text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-[.85em] font-semibold tracking-[-0.03em]">
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
            className="fixed top-0 left-0 w-screen h-screen bg-bg/15 backdrop-blur-lg z-1999"
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
