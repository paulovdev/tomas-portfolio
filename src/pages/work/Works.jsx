import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lenis from "lenis";
import client from "../../../client";
import Footer from "../../components/Footer";

const Works = () => {
  const lenisRef = useRef(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 0.75 });
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "works"]{
          _id,
          title,
          slug,
          images[0]{
            alt,
            "url": asset->url
          }
        }`
      )
      .then((data) => {
        setWorks(data || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <section className="relative h-[150dvh] bg-s p-5 cursor-default z-10 max-md:p-2 max-lg:p-3">
        <p className="text-white/50">Loading...</p>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-30 p-4 min-h-screen bg-s grid grid-cols-4 gap-4 z-10 max-lg:grid-cols-2">
        {works.map((work) => (
          <div
            key={work._id}
            onClick={() => navigate(`/works/${work.slug.current}`)}
            className="relative group overflow-hidden cursor-pointer"
          >
            <img
              src={work.images?.url}
              alt={work.images?.alt || work.title}
              className="w-full h-[600px] object-cover brightness-75 group-hover:brightness-100 transition-all duration-500 max-lg:h-[350px] max-md:h-[250px] max-ds::h-[450px]"
            />
            <div className="relative mt-2">
              <h2 className="text-p text-[1em] font-semibold tracking-[-0.03em]">
                {work.title}
              </h2>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
};

export default Works;
