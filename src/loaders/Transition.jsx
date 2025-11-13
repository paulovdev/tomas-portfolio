import { motion } from "framer-motion";

const horizontalAnimation = {
  initial: {
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 0.25,
    },
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 0.25,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const Transition = ({ Page, bg, ...props }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-dvh flex z-9999 pointer-events-none select-none overflow-hidden">
        <motion.div
          {...horizontalAnimation}
          className={`absolute size-full  backdrop-blur-[58px] bg-[${bg}]/90 z-20`}
        />
        <motion.div
          {...horizontalAnimation}
          className={`absolute size-full z-10`}
          style={{ backgroundColor: bg, filter: "grayscale(100%)" }}
        />
      </div>

      <Page {...props} />
    </>
  );
};

export default Transition;
