import { motion } from "framer-motion";

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
  return (
    <>
      <motion.div
        className="fixed top-0 right-0 max-w-[50vw] h-screen bg-p z-100 max-lg:max-w-screen"
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
          className="h-full p-4 py-2"
        >
          <nav className="mb-20 flex items-center justify-between">
            <p
              className="text-s text-[1em] font-semibold tracking-[-0.03em] cursor-pointer"
              onClick={() => setProjectModal(false)}
            >
              Close
            </p>
          </nav>

          <p className="mb-4 text-s text-[1.5em] font-semibold tracking-[-0.03em] ">
            {project.title}
          </p>
          <p className="text-s/75 text-[1.25em] font-medium tracking-[-0.05em] leading-[1.35]">
            {project.description}
          </p>

          <div className="h-[400px] flex items-end justify-end">
            <div className="w-full flex items-start justify-between">
              <p className="text-s text-[1em] font-semibold tracking-[-0.03em] flex items-center gap-2">
                <span className="relative w-2 h-2 bg-s rounded-full" />{" "}
                Information
              </p>
              <ul>
                <li className="flex items-center gap-2">
                  <p className="text-s/75 text-[1em] font-semibold tracking-[-0.03em] ">
                    Year:
                  </p>
                  <p className="text-s text-[1em] font-semibold tracking-[-0.03em] ">
                    {project.year}
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <p className="text-s/75  text-[1em] font-semibold tracking-[-0.03em] ">
                    Website:
                  </p>
                  <p className="text-s text-[1em] font-semibold tracking-[-0.03em] ">
                    {project.website}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {projectModal && (
        <motion.div
          className="absolute top-0 left-0 w-screen h-screen bg-bg/50 z-90"
          variants={opacityAnim}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={() => setProjectModal(false)}
        />
      )}
    </>
  );
};

export default ProjectDescription;
