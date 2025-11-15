import { useRef, useState, useEffect } from "react";
import ContactModal from "../../components/ContactModal";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Nav from "../../components/navs/Nav";
const Contact = () => {
  const [showNewsletter, setShowNewsletter] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 0.75 });
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  const contactInfo = [
    "Las Palmas de Gran Canaria, Spain",
    "Instagram, Linkedin, Behance",
    "hey@tomasml.com",
    "+(34) 625 551 094",
  ];

  return (
    <>
      <Nav />
      <section className="relative w-full h-screen flex flex-col items-start justify-between pt-24 bg-s text-p">
        <h2 className="px-4 mb-20 max-w-[1000px] flex-1 text-[1.75em] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
          If you’d like to discuss a project or learn more about our process,
          please don’t hesitate to get in touch.
        </h2>

        <div className="px-4 flex-2 w-full grid grid-cols-4 gap-8 border-t border-black/10 pt-8">
          <p className="text-p text-[clamp(.75em,3vw,1em)] font-semibold tracking-[-0.03em]">
            Contact
          </p>
          <div className="col-span-3 space-y-0.5">
            {contactInfo.map((line, i) => (
              <p
                key={i}
                className="text-p text-[clamp(.75em,3vw,1em)] font-semibold tracking-[-0.03em]"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="w-full flex-1 flex items-end">
          <p className="relative bottom-4 w-full px-4 text-p text-[clamp(.75em,3vw,1em)] font-semibold tracking-[-0.05em] max-md:absolute max-md:bottom-4">
            © T—ML 2025
          </p>
          <AnimatePresence>
            {showNewsletter && (
              <ContactModal setShowNewsletter={setShowNewsletter} />
            )}
          </AnimatePresence>{" "}
        </div>
      </section>
    </>
  );
};

export default Contact;
