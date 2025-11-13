import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const Home = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [removeContent, setRemoveContent] = useState(false);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "home"][0]{
          images[]{
            alt,
            "url": asset->url
          }
        }`
      )
      .then((data) => {
        setImages(data?.images || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    setTimeout(() => setRemoveContent(true), 2000);
  }, []);

  if (loading || images.length === 0) {
    return <section className="h-dvh bg-s"></section>;
  }

  return (
    <section className="relative h-dvh bg-p overflow-hidden">
      <img
        src={images[0].url}
        alt={images[0].alt || ""}
        className="absolute inset-0 w-full h-full object-cover"
      />

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
