import { motion } from "framer-motion";
import { useState } from "react";
import { render } from "@react-email/components";
import { Email } from "./Email";
import emailjs from "@emailjs/browser";

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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const emailHtml = await render(
        <Email
          name={form.name}
          message={form.message}
          url="https://example.com"
        />
      );

      await emailjs.send(
        "SEU_SERVICE_ID",
        "SEU_TEMPLATE_ID",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          html_content: emailHtml,
        },
        "SUA_PUBLIC_KEY"
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="w-full right-0 bottom-0 flex items-end justify-end"
      variants={modalAnim}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="relative p-4 max-w-[700px] w-full bg-[#F0EEE6] z-50 max-md:max-w-full"
        {...opacityAnim}
      >
        <div className="mb-12 w-full flex items-center justify-between">
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

        <form
          onSubmit={handleSubmit}
          className="relative h-[220px] flex flex-col items-start justify-between gap-2"
        >
          <div className="flex flex-col w-full h-full">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="mb-4 w-full border-b border-p/25 text-p text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
            />

            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className="mb-4 w-full border-b border-p/25 text-p text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
            />

            <textarea
              name="message"
              id="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="w-full h-[75px] border-b border-p/25 text-p text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
            />
          </div>
          <div className="relative flex items-end justify-end">
            <button
              type="submit"
              className="w-full text-p text-[1em] font-medium tracking-[-0.03em] bg-transparent outline-none text-start"
            >
              Send
            </button>
          </div>
        </form>

        {status === "sending" && <p>Sending...</p>}
        {status === "success" && <p>Message sent!</p>}
        {status === "error" && <p>Error sending message.</p>}
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
