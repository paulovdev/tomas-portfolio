import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import client from "../../../client";
import { useProjectStore } from "../../store/useProjectStore";
import { motion } from "framer-motion";
import ProjectNav from "../../components/navs/ProjectNav";
import Footer from "../../components/Footer";
import { urlFor } from "../../lib/sanityImage";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const opacityAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
  },
};

const fetcher = (slug) =>
  client.fetch(
    `*[_type == "works" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      year,
      website,
      images[] { alt, asset }
    }`,
    { slug }
  );

const WorkView = () => {
  const { workId } = useParams();
  const setProject = useProjectStore((state) => state.setProject);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const lenisRef = useRef(null);
  const navigate = useNavigate();

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

  const { data: project, isLoading } = useSWR(
    workId ? ["work", workId] : null,
    () => fetcher(workId),
    {
      onSuccess: (data) => setProject(data),
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!workId) return;

    const fetchRelated = async () => {
      const data = await client.fetch(
        `*[_type == "works" && slug.current != $slug] | order(year desc)[0...3]{
          title,
          "slug": slug.current,
          images[] { alt, asset }
        }`,
        { slug: workId }
      );
      setRelatedProjects(data);
    };

    fetchRelated();
  }, [workId]);

  if (isLoading || !project) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-s z-10" />
    );
  }

  const handleOpenProject = (slug) => {
    navigate(`/works/${slug}`);
  };

  return (
    <>
      <ProjectNav />

      <section className="relative pt-30 p-4 min-h-screen bg-s">
        <div className="flex flex-col gap-4">
          {project.images?.map((img, index) => {
            if (!img?.asset) return null;
            const pos = index % 3;
            const getUrl = (asset) =>
              urlFor(asset).width(2000).quality(75).auto("format").url();

            if (pos === 0) {
              return (
                <motion.img
                  key={index}
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  src={getUrl(img.asset)}
                  alt={img.alt || project.title}
                  className="w-full h-auto object-cover"
                  {...opacityAnim}
                />
              );
            }

            if (pos === 1) {
              const nextImg = project.images[index + 1];
              return (
                <div key={"group-" + index} className="grid grid-cols-2 gap-4">
                  <motion.img
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    src={getUrl(img.asset)}
                    alt={img.alt || project.title}
                    className="w-full h-auto object-cover"
                    {...opacityAnim}
                  />
                  {nextImg?.asset && (
                    <motion.img
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      src={getUrl(nextImg.asset)}
                      alt={nextImg.alt || project.title}
                      className="w-full h-auto object-cover"
                      {...opacityAnim}
                    />
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="pt-10 pb-20 px-4 w-full grid grid-cols-2 gap-4 max-md:flex max-md:flex-col max-md:items-start ">
          <h2 className=" text-p text-[clamp(.75em,3vw,1em)] font-semibold tracking-[-0.03em]">
            Related Works
          </h2>
          <div className="w-full grid grid-cols-3 gap-4">
            {relatedProjects.map((proj, i) => {
              const imageUrl = proj.images?.[0]?.asset
                ? urlFor(proj.images[0].asset)
                    .width(1600)
                    .quality(70)
                    .auto("format")
                    .url()
                : "";

              return (
                <motion.div
                  key={proj.slug}
                  className="relative cursor-pointer overflow-hidden group"
                  onClick={() => handleOpenProject(proj.slug)}
                  {...opacityAnim}
                  custom={i}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={proj.images?.[0]?.alt || proj.title}
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      {...opacityAnim}
                      className="w-full h-[500px] object-cover brightness-75 group-hover:brightness-100 transition-all duration-500 max-ds:h-[350px] max-lg:h-[250px] max-md:h-[175px]"
                    />
                  )}
                  <h3 className="mt-2 text-p font-semibold">{proj.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default WorkView;
