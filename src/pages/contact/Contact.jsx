import { useRef, useState, useEffect } from "react";
import ContactModal from "../../components/ContactModal";
import Footer from "../../components/Footer";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
const Contact = () => {
  const [showNewsletter, setShowNewsletter] = useState(true);
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 0.75 });
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);
  const contactInfo = [
    "235A Abbotsford Street",
    "North Melbourne VIC 3051",
    "hi@both.studio",
    "+61 432 089 212",
    "Instagram",
  ];

  return (
    <>
      <section className="relative min-h-screen px-6 py-24 bg-white text-black">
        <h2 className="mb-32 text-[1.75em] font-medium tracking-[-0.03em] leading-[1.3]">
          For new project enquiries or questions regarding our approach and
          process, please feel free to reach out. While we are not actively
          hiring at this time, we are always interested in connecting with
          talented individuals, so folio submissions and open applications are
          welcome.
        </h2>

        <div className="grid grid-cols-4 gap-8 border-t border-black/10 pt-8">
          <p className="text-p text-[1em] font-semibold tracking-[-0.03em]">
            Contact
          </p>
          <div className="col-span-3 space-y-0.5">
            {contactInfo.map((line, i) => (
              <p
                key={i}
                className="text-p text-[1em] font-medium tracking-[-0.03em]"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {showNewsletter && (
            <ContactModal setShowNewsletter={setShowNewsletter} />
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
