import { useParams } from "react-router-dom";
import useSWR from "swr";
import client from "../../../client";
import { useProjectStore } from "../../store/useProjectStore";
import { motion } from "framer-motion";
import ProjectNav from "../../components/navs/ProjectNav";
import Footer from "../../components/Footer";

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
    <>
      <ProjectNav />
      <section className="relative pt-30 p-4 min-h-screen bg-s">
        <div className="flex flex-col gap-4">
          {project.images?.map((img, index) => {
            // posição dentro do ciclo de 3: 0(full), 1(col), 2(col)
            const pos = index % 3;

            // FULL WIDTH
            if (pos === 0) {
              return (
                <motion.img
                  key={index}
                  src={img.url}
                  alt={img.alt || project.title}
                  className="w-full h-auto object-cover"
                  {...opacityAnim}
                />
              );
            }

            // DUAS COLUNAS (pos 1 e 2)
            if (pos === 1) {
              // quando for pos 1, renderizamos um bloco com pos1 e pos2 juntos
              return (
                <div key={"group-" + index} className="grid grid-cols-2 gap-4">
                  {/* imagem atual */}
                  <motion.img
                    src={img.url}
                    alt={img.alt || project.title}
                    className="w-full h-[75vh] object-cover max-md:h-[50vh]"
                    {...opacityAnim}
                  />

                  {/* próxima imagem (se existir) */}
                  {project.images[index + 1] && (
                    <motion.img
                      src={project.images[index + 1].url}
                      alt={project.images[index + 1].alt || project.title}
                      className="w-full h-[75vh] object-cover max-md:h-[50vh]"
                      {...opacityAnim}
                    />
                  )}
                </div>
              );
            }

            // pos === 2 → já foi renderizado junto com o pos1
            return null;
          })}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WorkView;
