import { useParams, useNavigate } from "react-router-dom";
import client from "../../../client";
import { useProjectStore } from "../../store/useProjectStore";
import { urlFor } from "../../lib/sanityImage";
import { useEffect, useState, memo, useRef } from "react";
import ProjectNav from "../../components/navs/ProjectNav";
import Footer from "../../components/Footer";
import Lenis from "lenis";

const ProjectImages = memo(({ images, title }) => {
  const getUrl = (asset) =>
    urlFor(asset).width(1200).quality(80).auto("format").url();

  return (
    <div className="flex flex-col gap-4">
      {images.map((img, index) => {
        if (!img?.asset) return null;
        const pos = index % 3;

        if (pos === 0) {
          return (
            <img
              key={index}
              src={getUrl(img.asset)}
              alt={img.alt || title}
              loading="lazy"
              className="w-full h-[75vh] object-cover max-md:h-[50vh]"
            />
          );
        }

        if (pos === 1) {
          const nextImg = images[index + 1];
          return (
            <div key={"group-" + index} className="grid grid-cols-2 gap-4">
              <img
                src={getUrl(img.asset)}
                alt={img.alt || title}
                loading="lazy"
                className="w-full h-[75vh] object-cover max-md:h-[50vh]"
              />
              {nextImg?.asset && (
                <img
                  src={getUrl(nextImg.asset)}
                  alt={nextImg.alt || title}
                  loading="lazy"
                  className="w-full h-[75vh] object-cover max-md:h-[50vh]"
                />
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
});

const WorkView = () => {
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 0.75 });
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);
  const { workId } = useParams();
  const setProject = useProjectStore((state) => state.setProject);
  const [projectData, setProjectData] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const project = await client.fetch(
        `*[_type == "works" && slug.current == $slug][0]{
          title,
          "slug": slug.current,
          description,
          year,
          website,
          images[] { alt, asset }
        }`,
        { slug: workId }
      );

      const related = await client.fetch(
        `*[_type == "works" && slug.current != $slug] | order(year desc)[0...3]{
          title,
          "slug": slug.current,
          images[] { alt, asset }
        }`,
        { slug: workId }
      );

      setProject(project);
      setProjectData(project);
      setRelatedProjects(related);
    };

    if (workId) fetchData();
  }, [workId, setProject]);

  const handleOpenProject = (slug) => {
    navigate(`/works/${slug}`);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [workId]);
  return (
    <>
      <ProjectNav />

      {!projectData ? (
        <section className="relative h-screen flex items-center justify-center bg-s z-10">
          <p className="text-s/50">Loading...</p>
        </section>
      ) : (
        <>
          <section className="relative pt-30 p-4 min-h-screen bg-s">
            <ProjectImages
              images={projectData.images}
              title={projectData.title}
            />
          </section>

          {relatedProjects.length > 0 && (
            <section className="pt-10 pb-20 px-4 w-full grid grid-cols-2 gap-4 max-md:flex max-md:flex-col max-md:items-start">
              <h2 className="text-p text-[clamp(1em,5vw,1em)] max-sm:text-clamp(.85em,3vw,1em)] font-semibold tracking-[-0.03em]">
                Related Works
              </h2>
              <div className="w-full grid grid-cols-3 gap-4">
                {relatedProjects.map((proj) => {
                  const imageUrl = proj.images?.[0]?.asset
                    ? urlFor(proj.images[0].asset)
                        .width(800)
                        .quality(50)
                        .auto("format")
                        .url()
                    : "";

                  return (
                    <div
                      key={proj.slug}
                      className="relative cursor-pointer overflow-hidden group"
                      onClick={() => handleOpenProject(proj.slug)}
                    >
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={proj.images?.[0]?.alt || proj.title}
                          loading="lazy"
                          className="w-full h-[500px] object-cover brightness-75 group-hover:brightness-100 transition-all duration-500 max-ds:h-[350px] max-lg:h-[250px] max-md:h-[175px]"
                        />
                      )}
                      <h3 className="mt-2 text-p font-semibold">
                        {proj.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default WorkView;
