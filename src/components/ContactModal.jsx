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
const ContactModal = ({ setShowNewsletter }) => {
  return (
    <motion.div
      className="fixed bottom-0 right-0 p-4 max-w-[500px] h-[250px] bg-[#F0EEE6] z-100"
      variants={modalAnim}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-p text-[1em] font-semibold tracking-[-0.03em]">
          Newsletter
        </p>
        <button
          onClick={() => setShowNewsletter(false)}
          className="text-p text-[1em] font-semibold tracking-[-0.03em]"
        >
          Close
        </button>
      </div>

      <form className="space-y-2">
        <input
          type="text"
          placeholder="Name"
          className="w-full border-b border-black/40 text-p text-[1em] font-semibold tracking-[-0.03em] bg-transparent outline-none pb-1"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border-b border-black/40 text-p text-[1em] font-semibold tracking-[-0.03em] bg-transparent outline-none pb-1"
        />
        <button
          type="submit"
          className="w-full text-p text-[1em] font-semibold tracking-[-0.03em] text-left pb-1 "
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  );
};

export default ContactModal;
