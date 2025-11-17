import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import client from "../../../client";
import HomeNav from "../../components/navs/HomeNav";
import { useHomeStore } from "../../store/useHomeStore";
import { Helmet } from "react-helmet";

const AnimatedLetters = ({ text }) => {
  return (
    <motion.span
      className="inline-block overflow-hidden whitespace-nowrap"
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={textSlideAnim}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={i}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const textSlideAnim = {
  initial: { y: "100%" },
  animate: (i = 0) => ({
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.15 + 0.015 * i,
    },
  }),
  exit: {
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

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

  const isLCP = index === 0;

  const imageProps = isLCP
    ? { loading: "eager", fetchpriority: "high" }
    : { loading: "lazy" };

  const videoProps = isLCP ? { preload: "auto", fetchpriority: "high" } : {};

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tomás — Home</title>
        <meta
          name="description"
          content="Hi, I’m Tomás, a graphic designer based in the Canary Islands. I specialize in brand strategy, art direction, and digital design, creating functional and contemporary identities with intent."
        />
      </Helmet>

      <HomeNav />

      <div
        className="relative h-svh bg-[#F0EEE6]
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
              {...videoProps}
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
              {...imageProps}
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
            transition={{ delay: 1.5, duration: 0.5, ease: "easeInOut" }}
            onAnimationComplete={() => setLoadingDone(true)}
          >
            <h1 className="text-[1em] font-medium text-p tracking-[-0.05em] max-md:tracking-[-0.05em] select-none flex flex-wrap">
              <AnimatedLetters text="Tomás — Branding & Visual Identity Designer" />
            </h1>

            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-black"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.15 }}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Home;
