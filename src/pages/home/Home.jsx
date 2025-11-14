import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import client from "../../../client";

const clipAnim = {
  initial: { clipPath: "inset(0% 100% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 100%)",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
};

/* -------------------------------------------------------------------------- */
/*                                SWR FETCHER                                 */
/* -------------------------------------------------------------------------- */
const fetcher = async (query) => {
  const controller = new AbortController();
  const { signal } = controller;

  const data = await client.fetch(query, {}, { signal });

  return data;
};

const Home = () => {
  const [index, setIndex] = useState(0);
  const [removeContent, setRemoveContent] = useState(false);
  const intervalRef = useRef(null);

  /* -------------------------------------------------------------------------- */
  /*                                SWR REQUEST                                 */
  /* -------------------------------------------------------------------------- */
  const { data, error, isLoading } = useSWR(
    `*[_type == "home"][0]{
      images[]{
        alt,
        "url": asset->url
      }
    }`,
    fetcher,
    {
      dedupingInterval: 8000, // evita requisições duplicadas
      revalidateOnFocus: true,
    }
  );

  const images = data?.images || [];

  /* -------------------------------------------------------------------------- */
  /*                             SLIDESHOW OTIMIZADO                            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!images.length) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [images]);

  /* -------------------------------------------------------------------------- */
  /*                         REMOVER TEXTO DE INTRO                             */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const timeout = setTimeout(() => setRemoveContent(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               LOADING & ERROR                               */
  /* -------------------------------------------------------------------------- */
  if (isLoading || !images.length) {
    return <section className="h-dvh bg-s" />;
  }

  if (error) {
    console.error("Erro ao buscar imagens da home:", error);
    return <section className="h-dvh bg-s" />;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="relative h-dvh bg-p overflow-hidden">
      {/* IMAGEM BASE */}
      <img
        src={images[0].url}
        alt={images[0].alt || ""}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* TRANSIÇÃO ENTRE IMAGENS */}
      <AnimatePresence mode="sync">
        {index > 0 && (
          <motion.div
            key={index}
            variants={clipAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[index].url}
              alt={images[index].alt || ""}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TEXTO DO MIDDLE */}
      <div className="relative z-10 flex items-center justify-center h-screen mix-blend-exclusion">
        <AnimatePresence mode="wait">
          {!removeContent && (
            <motion.h1
              className="text-[10em] font-light text-s tracking-[0.05em] select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              BOTH
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Home;
