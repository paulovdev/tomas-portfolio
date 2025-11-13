import { useEffect, useEffectEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import client from "../../../client";

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
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    setTimeout(() => {
      setRemoveContent(true);
    }, 2500);
  }, []);

  if (loading) {
    return (
      <section className="relative h-dvh bg-p flex items-center justify-center"></section>
    );
  }

  const current = images[index];

  return (
    <section className="relative h-dvh bg-p overflow-hidden">
      <div key={index} className="absolute inset-0 w-full h-full">
        <img
          src={current.url}
          alt={current.alt || ""}
          className="w-full h-full object-cover"
        />
      </div>

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
