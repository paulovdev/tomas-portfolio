import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import client from "../../../client";
import { urlFor } from "../../lib/sanityImage";
import Nav from "../../components/navs/Nav";
import Footer from "../../components/Footer";

import { useWorksStore } from "../../store/useWorksStore";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Works = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { works, setWorks, isExpired } = useWorksStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const shouldRefetch = !works || isExpired();

    if (!shouldRefetch) {
      setLoading(false);
      return;
    }

    const fetchWorks = async () => {
      const data = await client.fetch(`
      *[_type == "works"]{
        _id,
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
      }
    `);

      setWorks(data);
      setLoading(false);
    };

    fetchWorks();
  }, []);
  
  const handleOpen = useCallback(
    (slug) => {
      navigate(`/works/${slug}`);
    },
    [navigate]
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tomás — Works</title>
        <meta
          name="description"
          content="Explore Tomás’ design projects and works. Visual creation grounded in strategy, developing functional and contemporary brand identities built with intent."
        />
      </Helmet>

      <Nav />

      <section className="relative pt-30 pb-30 px-4 min-h-dvh bg-s">
        {loading ? (
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[500px] bg-[#F0EEE6] animate-pulse mb-10 max-ds:mb-1 max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
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
                      className="w-full h-[500px] object-cover brightness-100 group-hover:brightness-75 transition-all max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : imageUrl ? (
                    <LazyLoadImage
                      src={imageUrl}
                      alt={first.alt || work.title}
                      effect="blur"
                      wrapperClassName="w-full h-[500px] max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
                      className="w-full h-full object-cover brightness-100 group-hover:brightness-75 transition-all"
                    />
                  ) : (
                    <div className="w-full h-[500px] bg-[#E5E3DC] max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]" />
                  )}

                  <h2 className="mt-2 text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-semibold">
                    {work.title}
                  </h2>
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
