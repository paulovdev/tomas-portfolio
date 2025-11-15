import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../client";
import { urlFor } from "../../lib/sanityImage";
import Nav from "../../components/navs/Nav";
import Footer from "../../components/Footer";

import { useWorksStore } from "../../store/useWorksStore";

const Works = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { works, setWorks } = useWorksStore();

  useEffect(() => {
    if (works) {
      setLoading(false);
      return;
    }

    const fetchWorks = async () => {
      const data = await client.fetch(`
        *[_type == "works"]{
          _id,
          title,
          "slug": slug.current,   // 🔥 AGORA É STRING
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

      setWorks(data); // SAVE NO ZUSTAND
      setLoading(false);
    };

    fetchWorks();
  }, []);

  const handleOpen = useCallback(
    (slug) => {
      navigate(`/works/${slug}`); // 🔥 slug agora é string sempre
    },
    [navigate]
  );

  return (
    <>
      <Nav />

      <section className="relative pt-30 pb-30 px-4 min-h-dvh bg-s">
        {loading ? (
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[500px] bg-[#F0EEE6] animate-pulse mb-10 max-md:mb-1 max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
            {works.map((work) => {
              const first = work.media?.[0];
              const asset = first?.asset;

              if (!asset) return null;

              const isVideo = asset.mimeType?.startsWith("video/");
              const isImage = asset.mimeType?.startsWith("image/");

              const imageUrl =
                isImage && asset
                  ? urlFor(asset).width(1600).quality(70).auto("format").url()
                  : null;

              return (
                <div
                  key={work._id}
                  className="relative mb-10 group overflow-hidden cursor-pointer"
                  onClick={() => handleOpen(work.slug)}
                >
                  {isVideo ? (
                    <video
                      src={asset.url}
                      className="w-full h-[500px] object-cover max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={first.alt || work.title}
                      className="w-full h-[500px] object-cover max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
                    />
                  ) : (
                    <div className="w-full h-[500px] bg-[#E5E3DC] max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]" />
                  )}

                  <h2 className="mt-2 text-p font-semibold">{work.title}</h2>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Works;
