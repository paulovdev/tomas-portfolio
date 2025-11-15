import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import client from "../../../client";
import HomeNav from "../../components/navs/HomeNav";
import { urlFor } from "../../lib/sanityImage";

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

const fetcher = async (query) => {
  const controller = new AbortController();
  const { signal } = controller;
  return await client.fetch(query, {}, { signal });
};

const Home = () => {
  const [index, setIndex] = useState(0);
  const [removeContent, setRemoveContent] = useState(false);
  const intervalRef = useRef(null);
  const indexRef = useRef(0);

  const { data, error, isLoading } = useSWR(
    `*[_type == "home"][0]{ images[]{ alt, asset } }`,
    fetcher,
    {
      dedupingInterval: 8000,
      revalidateOnFocus: true,
    }
  );

  const images = data?.images || [];

  const preload = (i) => {
    const url = urlFor(images[i].asset).width(2000).quality(80).url();
    const img = new Image();
    img.src = url;
  };

  useEffect(() => {
    if (!images.length) return;

    intervalRef.current = setInterval(() => {
      const next = (indexRef.current + 1) % images.length;
      preload(next);

      indexRef.current = next;
      setIndex(next);
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [images]);

  useEffect(() => {
    const timeout = setTimeout(() => setRemoveContent(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading || !images.length) return <section className="h-dvh bg-s" />;
  if (error) return <section className="h-dvh bg-s" />;

  return (
    <>
      <HomeNav />
      <section className="relative h-dvh bg-p overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            variants={clipAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={urlFor(images[index].asset).width(2000).quality(80).url()}
              alt={images[index].alt || ""}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex items-center justify-center h-screen mix-blend-exclusion">
          <AnimatePresence mode="wait">
            {!removeContent && (
              <motion.h1
                className="text-[10em] font-light text-s tracking-[0.05em] select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                T—ML
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Home;
