import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import client from "../../../client";
import HomeNav from "../../components/navs/HomeNav";
import { urlFor } from "../../lib/sanityImage";

const clipAnim = {
  initial: { clipPath: "inset(0% 100% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 100%)",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

const Home = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const fetchHome = async () => {
      const data = await client.fetch(
        `*[_type == "home"][0]{ images[]{ alt, asset } }`
      );
      if (data?.images?.length) {
        setImages(data.images);

        data.images.forEach((img) => {
          const preload = new Image();
          preload.src = urlFor(img.asset).width(2000).quality(80).url();
        });
      }
    };
    fetchHome();
  }, []);

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  if (!images.length) return null;

  const currentImage = images[index];

  return (
    <>
      <HomeNav />

      <div className="relative h-dvh w-full overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage.asset._ref}
            src={urlFor(currentImage.asset).width(2000).quality(80).url()}
            alt={currentImage.alt || ""}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
          />
        </AnimatePresence>

        {!loadingDone && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center bg-[#F0EEE6] z-200"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
          >
            <motion.h1
              className="text-[clamp(5em,3vw,8em)] font-medium text-p tracking-[0.05em] select-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              T—ML
            </motion.h1>

            <motion.div
              className="absolute bottom-0 left-0 h-2 bg-black"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Home;
