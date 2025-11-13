import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Lenis from "lenis";
import client from "../../../client";
import Footer from "../../components/Footer";
import { motion, LayoutGroup } from "framer-motion";
import { HiOutlineSquaresPlus, HiOutlineSquares2X2 } from "react-icons/hi2";

const itemAnim = {
  initial: { opacity: 0, y: 10 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.04 },
  }),
};

const Works = () => {
  const lenisRef = useRef(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("grid4");
  const navigate = useNavigate();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.6,
      smoothTouch: true,
      touchMultiplier: 1.3,
    });

    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "works"]{
          _id,
          title,
          year,
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

  const gridClass = useMemo(() => {
    return view === "grid4"
      ? "grid-cols-4 max-md:grid-cols-2 max-ds:grid-cols-2"
      : "grid-cols-3 max-md:grid-cols-1 max-ds:grid-cols-3";
  }, [view]);

  if (loading) {
    return (
      <section className="relative h-dvh bg-s p-5">
        <p className="text-s/50">Loading...</p>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-30 pb-30 px-4 h-full bg-s">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-p flex items-center gap-2 font-semibold tracking-[-0.03em]">
            <span className="w-2 h-2 rounded-full bg-p" />
            Works ({works.length})
          </p>

          <div className="flex items-center gap-2 px-3 py-2">
            <button
              onClick={() => setView("grid3")}
              className={`p-2 transition ${
                view === "grid3" ? "bg-p text-s" : "text-s bg-p/40"
              }`}
            >
              <HiOutlineSquares2X2 size={18} />
            </button>

            <button
              onClick={() => setView("grid4")}
              className={`p-2 transition ${
                view === "grid4" ? "bg-p text-s" : "text-s bg-p/40"
              }`}
            >
              <HiOutlineSquaresPlus size={18} />
            </button>
          </div>
        </div>

        {/* GRID COM LAYOUTGROUP */}
        <LayoutGroup>
          <motion.div
            layout
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className={`grid ${gridClass} gap-4 z-10`}
          >
            {works.map((work, i) => (
              <motion.div
                key={work._id}
                layout="position" // ← mantém posição suave sem esticar
                onClick={() => navigate(`/works/${work.slug.current}`)}
                className="relative mb-10 group overflow-hidden cursor-pointer"
                variants={itemAnim}
                initial="initial"
                animate="animate"
                custom={i}
              >
                <img
                  loading="lazy"
                  src={work.images?.url}
                  alt={work.images?.alt || work.title}
                  className="w-full h-[500px] object-cover brightness-75 group-hover:brightness-100 transition-all duration-500 max-lg:h-[350px] max-md:h-[250px]"
                />

                <div className="relative mt-2">
                  <h2 className="text-p text-[1em] font-semibold tracking-[-0.03em]">
                    {work.title}
                  </h2>
                  <h2 className="text-p text-[1em] font-semibold tracking-[-0.03em]">
                    {work.year}
                  </h2>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
      </section>

      <Footer />
    </>
  );
};

export default Works;
