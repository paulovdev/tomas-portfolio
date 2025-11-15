import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../client";
import { urlFor } from "../../lib/sanityImage";
import Nav from "../../components/navs/Nav";
import Footer from "../../components/Footer";
import Lenis from "lenis";

const Works = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 0.75 });
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);
  useEffect(() => {
    const fetchWorks = async () => {
      const data = await client.fetch(
        `*[_type == "works"]{
          _id,
          title,
          slug,
          "image": images[0]{ alt, asset }
        }`
      );
      setWorks(data);
      setLoading(false);
    };
    fetchWorks();
  }, []);

  const handleOpen = useCallback(
    (slug) => {
      navigate(`/works/${slug.current || slug}`);
    },
    [navigate]
  );

  return (
    <>
      <Nav />

      <section className="relative pt-30 pb-30 px-4 min-h-dvh bg-s">
        {loading ? (
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[500px] bg-[#F0EEE6] animate-pulse mb-10 max-md:mb-1"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
            {works.map((work) => {
              const imageUrl = work.image?.asset
                ? urlFor(work.image.asset)
                    .width(1600)
                    .quality(70)
                    .auto("format")
                    .url()
                : "";

              return (
                <div
                  key={work._id}
                  className="relative mb-10 group overflow-hidden cursor-pointer max-md:mb-1"
                  onClick={() => handleOpen(work.slug)}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={work.image?.alt || work.title}
                      className="w-full h-[500px] object-cover brightness-75 group-hover:brightness-100 transition-all duration-500 relative"
                    />
                  )}
                  <div className="relative mt-2">
                    <h2 className="text-p text-[clamp(1em,5vw,1em)] max-sm:text-clamp(.85em,3vw,1em)] font-semibold tracking-[-0.03em]">
                      {work.title}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Works;
