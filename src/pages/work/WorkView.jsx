import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../../../client";
import { useProjectStore } from "../../store/useProjectStore";
import { urlFor } from "../../lib/sanityImage";
import ProjectNav from "../../components/navs/ProjectNav";
import Footer from "../../components/Footer";
import Lenis from "lenis";

// COMPONENTE DE IMAGENS + VÍDEOS
const ProjectMedia = ({ media, title }) => {
  const getUrl = (asset) =>
    urlFor(asset).width(1600).quality(80).auto("format").url();

  return (
    <div className="flex flex-col gap-6">
      {media.map((item, index) => {
        const asset = item.asset;
        if (!asset) return null;

        const isVideo = asset.mimeType?.startsWith("video/");
        const isImage = asset.mimeType?.startsWith("image/");

        // 🔥 LAYOUT IGUAL AO ANTIGO:
        const pos = index % 3;

        // --------------------------
        // CASE 1: IMAGE FULL WIDTH
        // --------------------------
        if (pos === 0) {
          return (
            <div key={index}>
              {isVideo ? (
                <video
                  src={asset.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-[75vh] object-cover"
                />
              ) : (
                <img
                  src={getUrl(asset)}
                  alt={item.alt || title}
                  loading="lazy"
                  className="w-full h-[75vh] object-cover"
                />
              )}
            </div>
          );
        }

        // --------------------------
        // CASE 2: GRID 2 COLUNAS
        // --------------------------
        if (pos === 1) {
          const next = media[index + 1];
          return (
            <div key={"group-" + index} className="grid grid-cols-2 gap-4">
              {/* MAIN */}
              {isVideo ? (
                <video
                  src={asset.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-[75vh] object-cover"
                />
              ) : (
                <img
                  src={getUrl(asset)}
                  alt={item.alt || title}
                  loading="lazy"
                  className="w-full h-[75vh] object-cover"
                />
              )}

              {/* SECOND */}
              {next?.asset &&
                (next.asset.mimeType.startsWith("video/") ? (
                  <video
                    key={next._id}
                    src={next.asset.url}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-[75vh] object-cover"
                  />
                ) : (
                  <img
                    src={getUrl(next.asset)}
                    alt={next.alt || title}
                    loading="lazy"
                    className="w-full h-[75vh] object-cover"
                  />
                ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

const WorkView = () => {
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 0.75 });
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  const { workId } = useParams();
  const navigate = useNavigate();
  const setProject = useProjectStore((s) => s.setProject);

  const [projectData, setProjectData] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const project = await client.fetch(
        `*[_type == "works" && slug.current == $slug][0]{
          title,
          "slug": slug.current,
          description,
          year,
          website,
          media[]{
            alt,
            asset->{
              _id,
              url,
              mimeType
            }
          }
        }`,
        { slug: workId }
      );

      const related = await client.fetch(
        `*[_type == "works" && slug.current != $slug] | order(year desc)[0...3]{
          title,
          "slug": slug.current,
          media[]{
            alt,
            asset->{
              _id,
              url,
              mimeType
            }
          }
        }`,
        { slug: workId }
      );

      setProject(project);
      setProjectData(project);
      setRelatedProjects(related);
    };

    fetchData();
  }, [workId]);

  const handleOpenProject = (slug) => navigate(`/works/${slug}`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [workId]);

  return (
    <>
      <ProjectNav />

      {!projectData ? (
        <section className="relative h-screen flex items-center justify-center bg-s">
          <p className="text-s/50">Loading...</p>
        </section>
      ) : (
        <>
          <section className="relative pt-30 p-4 min-h-screen bg-s">
            {projectData.media?.length > 0 ? (
              <ProjectMedia
                media={projectData.media}
                title={projectData.title}
              />
            ) : (
              <p className="text-center text-s/50">No media available</p>
            )}
          </section>

          {/* RELATED */}
          {relatedProjects.length > 0 && (
            <section className="pt-10 pb-20 px-4 w-full grid grid-cols-2 gap-4 max-md:flex max-md:flex-col">
              <h2 className="text-p font-semibold">Related Works</h2>

              <div className="grid grid-cols-3 gap-4 w-full">
                {relatedProjects.map((proj) => {
                  const asset = proj.media?.[0]?.asset;
                  if (!asset) return null;

                  const isVideo = asset.mimeType.startsWith("video/");
                  const isImage = asset.mimeType.startsWith("image/");

                  const thumb = isImage ? urlFor(asset).width(800).url() : null;

                  return (
                    <div
                      key={proj.slug}
                      className="relative cursor-pointer overflow-hidden group"
                      onClick={() => handleOpenProject(proj.slug)}
                    >
                      {isVideo ? (
                        <video
                          src={asset.url}
                          className="w-full h-[350px] object-cover brightness-75 group-hover:brightness-100 transition-all"
                          muted
                          loop
                          autoPlay
                          playsInline
                        />
                      ) : (
                        <img
                          src={thumb}
                          alt={proj.media?.[0]?.alt || proj.title}
                          className="w-full h-[350px] object-cover brightness-75 group-hover:brightness-100 transition-all"
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
