import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Lenis from "lenis";
import client from "../../../client";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import Nav from "../../components/navs/Nav";
import { urlFor } from "../../lib/sanityImage";

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
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const fetcher = async (query) => {
  const controller = new AbortController();
  const { signal } = controller;
  return await client.fetch(query, {}, { signal });
};

const Works = () => {
  const navigate = useNavigate();
  const lenisRef = useRef(null);

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

  const {
    data: works,
    error,
    isLoading,
  } = useSWR(
    `*[_type == "works"]{
    _id,
    title,
    slug,
    "image": coalesce(images[0]{ alt, asset }, {})
  }`,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 10000,
    }
  );

  const handleOpen = useCallback((slug) => {
    navigate(`/works/${slug.current || slug}`);
  }, []);

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
        <p className="text-red-400">Error on loading works.</p>
      </section>
    );
  }

  return (
    <>
      <Nav />

      <section className="relative pt-30 pb-30 px-4 h-full bg-s">
        <div className="grid grid-cols-4 gap-4 z-10 max-md:grid-cols-1 max-lg:grid-cols-3">
          {works?.map((work, i) => {
            if (!work.image?.asset) return null;

            const imageUrl = urlFor(work.image.asset)
              .width(1600)
              .quality(70)
              .auto("format")
              .url();

            return (
              <motion.div
                key={work._id}
                className="relative mb-10 group overflow-hidden cursor-pointer max-md:mb-1"
                onClick={() => handleOpen(work.slug)}
                {...opacityAnim}
                custom={i}
              >
                <img
                  loading="lazy"
                  src={imageUrl}
                  alt={work.image.alt || work.title}
                  className="w-full h-[500px] object-cover brightness-75 group-hover:brightness-100 transition-all duration-500 max-ds:h-[350px] max-lg:h-[250px] max-md:h-[250px]"
                />

                <div className="relative mt-2">
                  <h2 className="text-p text-[clamp(.75em,3vw,1em)] font-semibold tracking-[-0.03em]">
                    {work.title}
                  </h2>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Works;
