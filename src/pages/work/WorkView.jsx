import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../../../client";
import { useProjectStore } from "../../store/useProjectStore";
import { urlFor } from "../../lib/sanityImage";
import ProjectNav from "../../components/navs/ProjectNav";
import Footer from "../../components/Footer";

const ProjectMedia = ({ media, title }) => {
  const getUrl = (asset) =>
    urlFor(asset).width(1600).quality(80).auto("format").url();

  return (
    <div className="flex flex-col gap-6">
      {media?.map((item, index) => {
        const asset = item.asset;
        if (!asset) return null;

        const isVideo = asset.mimeType?.startsWith("video/");
        const pos = index % 3;

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
                  className="w-full h-[75vh] object-cover max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
                />
              ) : (
                <img
                  src={getUrl(asset)}
                  alt={item.alt || title}
                  loading="lazy"
                  className="w-full h-[75vh] object-cover max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
                />
              )}
            </div>
          );
        }

        if (pos === 1) {
          const next = media[index + 1];
          return (
            <div key={"group-" + index} className="grid grid-cols-2 gap-4">
              {isVideo ? (
                <video
                  src={asset.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-[75vh] object-cover max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
                />
              ) : (
                <img
                  src={getUrl(asset)}
                  alt={item.alt || title}
                  loading="lazy"
                  className="w-full h-[75vh] object-cover max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
                />
              )}
              {next?.asset &&
                (next.asset.mimeType.startsWith("video/") ? (
                  <video
                    key={next._id}
                    src={next.asset.url}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-[75vh] object-cover max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
                  />
                ) : (
                  <img
                    src={getUrl(next.asset)}
                    alt={next.alt || title}
                    loading="lazy"
                    className="w-full h-[75vh] object-cover max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
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
  const { workId } = useParams();
  const navigate = useNavigate();

  const { projects, setProject } = useProjectStore();

  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      if (projects[workId]) {
        const cached = projects[workId];
        setRelatedProjects(cached.related || []);
        setLoading(false);
        return;
      }

      const project = await client.fetch(
        `*[_type == "works" && slug.current == $slug][0]{
          title,
          "slug": slug.current,
          description,
          year,
          website,
          media[] {
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
          media[] {
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

      setProject(workId, { ...project, related });
      setRelatedProjects(related);
      setLoading(false);
    };

    load();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [workId]);

  const project = projects[workId];
  const openProject = (slug) => navigate(`/works/${slug}`);

  return (
    <>
      <ProjectNav />

      {loading || !project ? (
        <section className="relative pt-30 p-4 min-h-dvh bg-s">
          <div className="mb-6 flex flex-col gap-6">
            <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />

            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />
              <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-6">
            <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />

            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />
              <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-6">
            <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />

            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />
              <div className="w-full h-[75vh] bg-[#E5E3DC] animate-pulse max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]" />
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="relative pt-30 p-4 min-h-dvh bg-s">
            {project.media?.length > 0 ? (
              <ProjectMedia media={project.media} title={project.title} />
            ) : (
              <p className="text-center text-p  text-[.9em] max-md:text-[1em]  font-semibold tracking-[-0.03em]">
                No media available
              </p>
            )}
          </section>

          {relatedProjects.length > 0 && (
            <section className="pt-10 pb-20 px-4 w-full grid grid-cols-2 gap-4 max-md:flex max-md:flex-col">
              <h2 className="text-p  text-[.9em] max-md:text-[1em]  font-semibold tracking-[-0.03em]">
                Related Works
              </h2>

              <div className="grid grid-cols-3 gap-4 w-full">
                {relatedProjects.map((proj) => {
                  const asset = proj.media?.[0]?.asset;
                  if (!asset) return null;

                  const isVideo = asset.mimeType.startsWith("video/");
                  const thumb = !isVideo
                    ? urlFor(asset).width(800).url()
                    : null;

                  return (
                    <div
                      key={proj.slug}
                      className="relative cursor-pointer overflow-hidden group"
                      onClick={() => openProject(proj.slug)}
                    >
                      {isVideo ? (
                        <video
                          src={asset.url}
                          className="w-full h-[350px] object-cover brightness-75 group-hover:brightness-100 transition-all max-ds:h-[550px] max-lg:h-[250px]  max-md:h-[175px]"
                          muted
                          loop
                          autoPlay
                          playsInline
                        />
                      ) : (
                        <img
                          src={thumb}
                          alt={proj.media?.[0]?.alt || proj.title}
                          className="w-full h-[350px] object-cover brightness-75 group-hover:brightness-100 transition-all max-ds:h-[550px] max-lg:h-[250px]  max-md:h-[175px]"
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
