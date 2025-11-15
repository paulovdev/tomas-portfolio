import { useRef, useEffect } from "react";
import Footer from "../../components/Footer";
import Lenis from "lenis";
import Nav from "../../components/navs/Nav";
const services = {
  Creative: [
    "Brand Identity",
    "Art Direction",
    "Brand Audit & Architecture",
    "Brand Guidelines",
    "Brand Stewardship",
    "Graphic Design",
    "Photography & Motion",
    "Stationery",
    "Packaging",
    "Publication Design",
  ],
  Digital: [
    "Digital & Social Media Strategy",
    "E-Commerce Websites",
    "Portfolio Websites",
    "Web Development Production",
  ],
  Environmental: [
    "Wayfinding",
    "Exhibition Design",
    "Hospitality & Retail Signage",
    "Venue or Event Collateral",
    "Workwear Design",
  ],
};

const press = [
  { year: "2023", subject: "Branding Insights", publication: "Design Week" },
  {
    year: "2022",
    subject: "Visual Identity Trends",
    publication: "It's Nice That",
  },
  { year: "2021", subject: "Studio Spotlight", publication: "Creative Review" },
];

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
        <h2 className="max-w-[1000px] mb-32 text-[1.5em] font-medium tracking-[-0.03em] leading-[1.3]">
          A Melbourne-based branding and communication studio, BOTH operates at
          the intersection of creative expression and purposeful design. Our
          approach hinges on a genuine interest in the individuals and companies
          with which we choose to partner, leading to a considered understanding
          of the needs and goals of each project.
        </h2>

        <div className="grid grid-cols-4 gap-8 mb-32 border-t border-black/10 pt-8 max-md:grid-cols-1">
          <p className="text-p text-[1em] font-semibold tracking-[-0.03em]">
            Services
          </p>
          <div className="max-md:grid max-md:grid-cols-3 max-md:gap-4 hidden">
            {Object.entries(services).map(([category, items]) => (
              <div key={category}>
                <p className="mb-2 text-p text-[1em] font-semibold tracking-[-0.03em]">
                  {category}
                </p>
                <ul className="space-y-0.5 text-[0.95em]">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="text-p text-[1em] font-medium tracking-[-0.03em]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {Object.entries(services).map(([category, items]) => (
            <div key={category} className="max-md:hidden block">
              <p className="mb-2 text-p text-[1em] font-semibold tracking-[-0.03em]">
                {category}
              </p>
              <ul className="space-y-0.5 text-[0.95em]">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="text-p text-[1em] font-medium tracking-[-0.03em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8 mb-32 border-t border-black/10 pt-8 max-md:grid-cols-1">
          <p className="text-p text-[1em] font-semibold tracking-[-0.03em]">
            Team
          </p>
          <p className="col-span-3 text-[1.5em] font-medium tracking-[-0.03em] leading-[1.3]">
            Established in 2010 by Sigiriya Brown and Dan Smith, BOTH emerged
            from a shared aspiration to engage more meaningfully with clients
            and collaborators throughout the design process. While the scale of
            our projects has grown over the years and our network of
            collaborators has expanded, this commitment to close involvement
            remains a key emphasis of our approach.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8 border-t border-black/10 pt-8 max-md:grid-cols-1">
          <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ">
            Selected Press
          </p>
          <div className="col-span-3">
            <div className="grid grid-cols-3 mb-2">
              <p className="text-p text-[1em] font-semibold tracking-[-0.03em]">
                Year
              </p>
              <p className="text-p text-[1em] font-semibold tracking-[-0.03em]">
                Subject
              </p>
              <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ">
                Publication
              </p>
            </div>
            <ul className="divide-y divide-p/10">
              {press.map((item, i) => (
                <li key={i} className="grid grid-cols-3 py-2 ">
                  <p className="text-p text-[1em] font-medium tracking-[-0.03em]">
                    {item.year}
                  </p>
                  <p className="text-p text-[1em] font-medium tracking-[-0.03em]">
                    {item.subject}
                  </p>
                  <p className="text-p text-[1em] font-medium tracking-[-0.03em]">
                    {item.publication}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
