import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Lenis from "lenis";
import client from "../../../client";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { HiOutlineSquaresPlus, HiOutlineSquares2X2 } from "react-icons/hi2";

const opacityAnim = {
  initial: { opacity: 0 },
  animate: (i) => ({
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.06,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

// ------------------------------ FETCHER SEGURO -------------------------------
const fetcher = async (query) => {
  const controller = new AbortController();
  const { signal } = controller;

  const result = await client.fetch(query, {}, { signal });

  return result;
};

const Works = () => {
  const navigate = useNavigate();
  const lenisRef = useRef(null);
  const [view, setView] = useState("grid4");

  // --------------------------- Smooth Scroll --------------------------------
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

  // ------------------------------- SWR FETCH ---------------------------------
  const {
    data: works,
    error,
    isLoading,
  } = useSWR(
    `*[_type == "works"]{
      _id,
      title,
      year,
      slug,
      images[0]{ alt, "url": asset->url }
    }`,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 1000 * 10, // evita requisições repetidas
    }
  );

  // ------------------------------ Helpers -----------------------------------
  const handleOpen = useCallback((slug) => {
    navigate(`/works/${slug.current || slug}`);
  }, []);

  const gridClass = useMemo(
    () =>
      view === "grid4"
        ? "grid-cols-4 max-md:grid-cols-2 max-ds:grid-cols-2"
        : "grid-cols-3 max-md:grid-cols-1 max-ds:grid-cols-3",
    [view]
  );

  // ------------------------------- Loading ----------------------------------
  if (isLoading) {
    return (
      <section className="relative h-dvh bg-s p-5">
        <p className="text-s/50">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative h-dvh bg-s p-5">
        <p className="text-red-400">Erro ao carregar Works.</p>
      </section>
    );
  }

  // ------------------------------ Template ----------------------------------
  return (
    <>
      <section className="relative pt-30 pb-30 px-4 h-full bg-s">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-p flex items-center gap-2 font-semibold tracking-[-0.03em]">
            <span className="w-2 h-2 rounded-full bg-p" />
            Works ({works?.length})
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

        {/* Grid */}
        <div className={`grid ${gridClass} gap-4 z-10`}>
          {works?.map((work, i) => (
            <motion.div
              key={work._id}
              className="relative mb-10 group overflow-hidden cursor-pointer"
              onClick={() => handleOpen(work.slug)}
              {...opacityAnim}
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
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Works;
