import { useState, useEffect } from "react";
import { urlFor } from "../lib/sanityImage";

export const useSanityImage = (image) => {
  const [loaded, setLoaded] = useState(false);

  if (!image) return { src: "", blur: "", loaded: false };

  const src = urlFor(image).width(2200).quality(80).auto("format").url();
  const blur = urlFor(image)
    .width(40)
    .quality(30)
    .blur(50)
    .auto("format")
    .url();

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);

    return () => {
      img.onload = null;
    };
  }, [src]);

  return { src, blur, loaded };
};
