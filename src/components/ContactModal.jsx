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
      className="absolute w-full right-0 bottom-0 flex items-end justify-end"
      variants={modalAnim}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="p-4 max-w-[450px] w-full h-[260px] bg-[#F0EEE6] z-50 max-md:max-w-full"
        {...opacityAnim}
      >
        <div className="w-full flex items-center justify-between mb-3">
          <p className="text-p text-[1em] font-medium tracking-[-0.03em]">
            Let's talk
          </p>
          <button
            onClick={() => setShowNewsletter(false)}
            className="text-p text-[1em] font-medium tracking-[-0.03em]"
          >
            Close
          </button>
        </div>

        <form className="flex flex-col items-start justify-start gap-2">
          <input
            type="text"
            id="name"
            placeholder="name"
            className="w-full border-b border-p text-p text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
          />

          <input
            type="email"
            id="email"
            placeholder="e-mail"
            className=" w-full border-b border-p text-p text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
          />

          <textarea
            name="message"
            id="message"
            placeholder="message"
            className="w-full border-b border-p text-p text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
          />
          <button
            type="submit"
            className="w-full  text-p text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none text-start"
          >
            Send
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
