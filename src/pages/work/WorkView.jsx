import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../../client";
import { useProjectStore } from "../../store/useProjectStore";

const WorkView = () => {
  const { workId } = useParams();
  const [project, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const setProject = useProjectStore((state) => state.setProject);

  useEffect(() => {
    if (!workId) return;

    client
      .fetch(
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
        { slug: workId }
      )
      .then((data) => {
        setProjectData(data);
        setProject(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [workId, setProject]);

  if (loading || !project) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-s"></section>
    );
  }

  return (
    <section className="relative pt-30 p-4 min-h-screen bg-s">
      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-2">
        {project.images?.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt || project.title}
            className="w-full h-auto object-cover"
          />
        ))}
      </div>
    </section>
  );
};

export default WorkView;
