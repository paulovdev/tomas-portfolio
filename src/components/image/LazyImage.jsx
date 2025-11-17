import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import client from "../../../client";
import { urlFor, blurUrl } from "../../lib/sanityImage";
import Nav from "../../components/navs/Nav";
import Footer from "../../components/Footer";
import { useWorksStore } from "../../store/useWorksStore";

// Componente de imagem otimizada
const LazyImage = ({ asset, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const lowRes = blurUrl(asset, 50, 10); // placeholder borrado
  const highRes = urlFor(asset).width(1600).quality(70).auto("format").url();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={lowRes}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-lg scale-110 transition-opacity duration-500"
        style={{ opacity: loaded ? 0 : 1 }}
      />
      <img
        src={highRes}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

// Componente de vídeo otimizado
const VideoPreview = ({ url, className }) => (
  <video
    src={url}
    className={className}
    muted
    loop
    autoPlay
    playsInline
    preload="metadata" // carrega só miniatura inicial
  />
);

const Works = () => {
  const navigate = useNavigate();
  const { works, setWorks, isExpired } = useWorksStore();
  const [loading, setLoading] = useState(true);

  // Scroll para topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Buscar dados do Sanity
  useEffect(() => {
    const fetchData = async () => {
      if (!works || isExpired()) {
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
      }
      setLoading(false); // só mostra grid depois que dados estão prontos
    };
    fetchData();
  }, [works, isExpired, setWorks]);

  const handleOpen = useCallback(
    (slug) => navigate(`/works/${slug}`),
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
          <p className="text-center text-p font-semibold">Loading works...</p>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
            {works.map((work) => {
              const first = work.media?.[0];
              const asset = first?.asset;
              if (!asset) return null;

              const isVideo = asset.mimeType.startsWith("video/");
              const isImage = asset.mimeType.startsWith("image/");

              return (
                <div
                  key={work._id}
                  className="relative mb-10 group cursor-pointer overflow-hidden"
                  onClick={() => handleOpen(work.slug)}
                >
                  {isVideo ? (
                    <VideoPreview
                      url={asset.url}
                      className="w-full h-[500px] object-cover group-hover:brightness-75 transition-all max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
                    />
                  ) : isImage ? (
                    <LazyImage
                      asset={asset}
                      alt={first.alt || work.title}
                      className="w-full h-[500px] max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
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
