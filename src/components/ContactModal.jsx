import { motion } from "framer-motion";

const modalAnim = {
  initial: {
    width: "0%",
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
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
const ContactModal = ({ setShowNewsletter }) => {
  return (
    <motion.div
      className="relative -top-2 max-w-[450px] h-[260px] bg-p z-10 max-md:max-w-full"
      variants={modalAnim}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="p-4 h-full" {...opacityAnim}>
        <div className="flex items-center justify-end mb-3">
          <button
            onClick={() => setShowNewsletter(false)}
            className="text-s text-[1em] font-medium tracking-[-0.03em]"
          >
            Close
          </button>
        </div>

        <form className="flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="name"
            className="text-s/75 text-[1em]  font-medium tracking-[-0.03em]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="pl-2 p-1 w-full border border-s/25 text-s text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none"
          />
          <label
            htmlFor="email"
            className="text-s/75 text-[1em]  font-medium tracking-[-0.03em]"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="pl-2 p-1 w-full border border-s/25 text-s text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none"
          />
          <button
            type="submit"
            className="mt-4 w-full p-1 bg-s text-p text-[1em] font-medium tracking-[-0.03em] text-center hover:bg-s/90 
              transition-all duration-500"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
