import { motion } from "framer-motion";

const modalAnim = {
  initial: {
    width: "0%",
  },
  animate: {
    width: "100%",
    transtion: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    width: "0%",
    transtion: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
};

const ProjectDescription = ({ project, projectModal, setProjectModal }) => {
  return (
    <>
      <motion.div
        className="fixed top-0 right-0 p-4 py-2 max-w-[50vw] h-screen bg-[#F0EEE6] z-100"
        variants={modalAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transtion: {
              duration: 0.75,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.25,
            },
          }}
          exit={{
            opacity: 0,
            transtion: {
              duration: 0.75,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.25,
            },
          }}
          className="h-full"
        >
          <nav className="mb-20 flex items-center justify-between">
            <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ">
              {project.title}
            </p>
            <p
              className="text-p text-[1em] font-semibold tracking-[-0.03em] cursor-pointer"
              onClick={() => setProjectModal(false)}
            >
              Close
            </p>
          </nav>
          <p className="text-p text-[1.5em] font-semibold tracking-[-0.05em] leading-[1.3]">
            {project.description}
          </p>
          <div className="h-[60%] flex items-end justify-end">
            <div className="w-full flex items-start justify-between">
              <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ">
                Information
              </p>
              <ul>
                <li className="flex items-center gap-2">
                  <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ">
                    Year:
                  </p>
                  <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ">
                    {project.year}
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ">
                    Website:
                  </p>
                  <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ">
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
          className="fixed inset-0 w-screen h-screen backdrop-blur-2xl z-40"
          onClick={() => setProjectModal(false)}
        ></motion.div>
      )}
    </>
  );
};

export default ProjectDescription;
