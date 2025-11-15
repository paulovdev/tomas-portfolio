import { useRef, useEffect } from "react";
import Footer from "../../components/Footer";
import Lenis from "lenis";
import Nav from "../../components/navs/Nav";
const services = {
  Branding: [
    "Brand audit & consultancy",
    "Brand strategy",
    "Art direction",
    "Creative direction",
    "Brand identity",
    "Verbal identity",
    "Visual identity",
    "Naming",
    "Logo design",
  ],
  Digital: [
    "Digital audit & consultancy",
    "Social media design",
    "Web design",
    "App design",
    "Digital visual systems",
  ],
  Print: [
    "Packaging design",
    "Corporate stationery",
    "Poster design",
    "Editorial design",
    "Print production",
  ],
};

const About = () => {
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 0.75 });
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);
  return (
    <>
      <Nav />
      <section className="relative h-full px-4 py-24 bg-s text-p">
        <h2 className="max-w-[1000px] mb-25 text-[1.75em] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
          Visual creation grounded in strategy, focused on developing functional
          and contemporary identities built with intent. The approach brings
          together strategy, creative direction, and design to shape systems
          that endure over time and adapt to the digital and physical
          environments they inhabit.
        </h2>

        <div className="grid grid-cols-4 mb-25 pt-8 max-md:grid-cols-1">
          <p className="mb-6 text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-clamp(.85em,3vw,1rem)] font-semibold tracking-[-0.03em]">
            Services
          </p>
          {/* MOBILE */}
          <div className="max-md:flex max-md:flex-col hidden">
            {Object.entries(services).map(([category, items]) => (
              <div key={category}>
                <p className="mb-6 border-b border-black/10 text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-clamp(.85em,3vw,1rem)] font-semibold tracking-[-0.03em]">
                  {category}
                </p>
                <ul className="mb-6 grid grid-cols-3">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="mb-2 text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-clamp(.85em,3vw,1rem)] font-medium tracking-[-0.03em]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* DESKTOP */}
          {Object.entries(services).map(([category, items]) => (
            <div key={category} className="max-md:hidden block">
              <p className="mb-6 border-b border-black/10 text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-clamp(.85em,3vw,1rem)] font-semibold tracking-[-0.03em]">
                {category}
              </p>
              <ul className="mr-6 ">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-clamp(.85em,3vw,1rem)] font-medium tracking-[-0.03em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8 mb-32 border-t border-black/10 pt-8 max-md:grid-cols-1">
          <p className="text-p text-[clamp(1rem,5vw,1rem)] max-sm:text-clamp(.85em,3vw,1rem)] font-semibold tracking-[-0.03em]">
            About
          </p>
          <p className="col-span-3 text-[1.75em] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
            Hi, I’m Tomás, based in the Canary Islands, Spain. I’ve been a
            graphic designer since 2020, specializing in brand strategy, art
            direction, brand communication, and digital design creation. I work
            for brands, but I design for people: listening, collaborating, and
            creating unique projects. My design philosophy is about building
            brands from within, brands with intention, purpose and a clear
            voice, not just visual appeal.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
