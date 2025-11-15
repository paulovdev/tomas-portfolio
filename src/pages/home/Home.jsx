import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import client from "../../../client";
import HomeNav from "../../components/navs/HomeNav";
import { useHomeStore } from "../../store/useHomeStore";
import { Helmet } from "react-helmet";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);

  const { media, setMedia } = useHomeStore();

  useEffect(() => {
    if (media) return;

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

      setMedia(data.media || []);
    };

    fetchHome();
  }, [media, setMedia]);

  useEffect(() => {
    if (!media || media.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [media]);

  if (!media || media.length === 0) return null;

  const current = media[index];
  const isVideo = current.asset.mimeType?.startsWith("video/");

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Portfolio — Tomás • Home</title>
        <meta
          name="description"
          content="Hi, I’m Tomás, a graphic designer based in the Canary Islands. I specialize in brand strategy, art direction, and digital design, creating functional and contemporary identities with intent."
        />
      </Helmet>
      <HomeNav />
      <div
        className="relative h-svh 
    max-md:h-[calc(var(--vh)*100)] w-full overflow-hidden"
      >
        <AnimatePresence mode="sync">
          {isVideo ? (
            <motion.video
              key={current.asset._id}
              src={current.asset.url}
              className="absolute inset-0 w-full h-screen object-cover"
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            />
          ) : (
            <motion.img
              key={current.asset._id}
              src={current.asset.url}
              alt={current.alt || ""}
              className="absolute inset-0 w-full h-screen object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            />
          )}
        </AnimatePresence>

        {!loadingDone && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center bg-[#F0EEE6] z-200"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ delay: 1, duration: 0.5, ease: "easeInOut" }}
            onAnimationComplete={() => setLoadingDone(true)}
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
