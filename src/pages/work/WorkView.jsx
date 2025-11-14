import { useParams } from "react-router-dom";
import useSWR from "swr";
import client from "../../../client";
import { useProjectStore } from "../../store/useProjectStore";
import { motion } from "framer-motion";

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
      images[] {
        alt,
        "url": asset->url
      }
    }`,
    { slug }
  );

const WorkView = () => {
  const { workId } = useParams();
  const setProject = useProjectStore((state) => state.setProject);

  const { data: project, isLoading } = useSWR(
    workId ? ["work", workId] : null,
    () => fetcher(workId),
    {
      onSuccess: (data) => setProject(data), // mantém sincronizado com sua store
      revalidateOnFocus: false, // opcional: evita re-fetch quando volta para a aba
    }
  );

  if (isLoading || !project) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-s" />
    );
  }

  return (
    <section className="relative pt-30 p-4 min-h-screen bg-s">
      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-2">
        {project.images?.map((img, i) => (
          <motion.img
            key={i}
            src={img.url}
            alt={img.alt || project.title}
            className="w-full h-auto object-cover"
            {...opacityAnim}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkView;
