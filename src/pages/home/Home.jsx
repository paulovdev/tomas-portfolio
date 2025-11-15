import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import client from "../../../client";
import HomeNav from "../../components/navs/HomeNav";

const Home = () => {
  const [media, setMedia] = useState([]);
  const [index, setIndex] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);

  const fetchHome = async () => {
    const data = await client.fetch(`
      *[_type == "home"][0]{ 
        media[]{
          alt,
          asset->{
            _id,
            url,
            mimeType
          }
        } 
      }
    `);

    if (data?.media?.length) {
      setMedia(data.media);

      // preload somente para imagens
      data.media.forEach((item) => {
        if (item.asset.mimeType?.startsWith("image/")) {
          const preload = new Image();
          preload.src = item.asset.url;
        }
      });

      setTimeout(() => setLoadingDone(true), 1000);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  useEffect(() => {
    if (!media.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [media]);

  // CORRIGIDO
  if (!media.length) return null;

  const current = media[index];
  const isVideo = current.asset.mimeType?.startsWith("video/");

  return (
    <>
      <HomeNav />

      <div className="relative h-dvh w-full overflow-hidden">
        <AnimatePresence mode="sync">
          {isVideo ? (
            <motion.video
              key={current.asset._id}
              src={current.asset.url}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.7 } }}
              exit={{ opacity: 0, transition: { duration: 0.7 } }}
            />
          ) : (
            <motion.img
              key={current.asset._id}
              src={current.asset.url}
              alt={current.alt || ""}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.7 } }}
              exit={{ opacity: 0, transition: { duration: 0.7 } }}
            />
          )}
        </AnimatePresence>

        {!loadingDone && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center bg-[#F0EEE6] z-200"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ delay: 1, duration: 0.5, ease: "easeInOut" }}
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
