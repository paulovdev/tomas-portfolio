import { useState } from "react";
import ContactModal from "../../components/ContactModal";
import { AnimatePresence } from "framer-motion";

import Nav from "../../components/navs/Nav";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [showNewsletter, setShowNewsletter] = useState(true);

  const contactInfo = [
    {
      label: "Location",
      value: "Las Palmas de Gran Canaria, Spain",
    },
    {
      label: "Socials",
      value: ["Instagram", "Linkedin", "Behance"],
      links: ["#", "https://www.linkedin.com/in/tomasmedinaleon/", "#"],
    },
    {
      label: "Email",
      value: "hey@tomasml.com",
      href: "mailto:hey@tomasml.com",
    },
    {
      label: "Phone",
      value: "+(34) 625 551 094",
      href: "tel:+34625551094",
    },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tomás — Contact</title>
        <meta
          name="description"
          content="App Description"
          data-react-helmet="true"
        />
        <meta
          name="description"
          content="Get in touch with Tomás, a graphic designer based in the Canary Islands. Collaborate, discuss projects, or inquire about brand strategy, art direction, and digital design services."
        />
      </Helmet>

      <Nav />

      <section
        className="relative w-full h-svh max-md:h-[calc(var(--vh)*100)]
        flex flex-col items-start justify-between pt-35 max-md:pt-24 bg-s text-p"
      >
        <div className="px-4 mb-20 flex-1">
          <h2 className="text-[1.75em] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
            If you’d like to discuss a project or learn more about our process,
          </h2>
          <h2 className="text-[1.75em] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
            please don’t hesitate to get in touch.
          </h2>
        </div>

        <div className="px-4 mb-15 flex-2 w-full grid grid-cols-4 gap-8 border-t border-black/10 pt-8">
          <p className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-bold tracking-[-0.03em]">
            Contact
          </p>
          <div className="col-span-3 space-y-0.5">
            {contactInfo.map((info, i) => {
              if (Array.isArray(info.value)) {
                return (
                  <p
                    key={i}
                    className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-semibold tracking-[-0.03em]"
                  >
                    {info.value.map((item, idx) => (
                      <a
                        key={idx}
                        href={info.links[idx] || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item}
                        {idx < info.value.length - 1 ? ", " : ""}
                      </a>
                    ))}
                  </p>
                );
              }

              if (info.href) {
                return (
                  <p
                    key={i}
                    className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-semibold tracking-[-0.03em]"
                  >
                    <a href={info.href} className="hover:underline">
                      {info.value}
                    </a>
                  </p>
                );
              }

              // Plain text (location)
              return (
                <p
                  key={i}
                  className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-semibold tracking-[-0.03em]"
                >
                  {info.value}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer + Modal */}
        <div className="w-full flex-1 flex items-end">
          <p className="relative bottom-4 w-full px-4 text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-bold tracking-[-0.05em] max-md:absolute max-md:bottom-4">
            ©T—ML 2025
          </p>
          <AnimatePresence>
            {showNewsletter && (
              <ContactModal setShowNewsletter={setShowNewsletter} />
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Contact;
