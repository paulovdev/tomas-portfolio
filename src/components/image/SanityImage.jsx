import imageUrlBuilder from "@sanity/image-url";
import client from "../../../client";

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export function blurUrl(source, width = 50, quality = 10) {
  return builder
    .image(source)
    .width(width)
    .quality(quality)
    .auto("format")
    .blur(50)
    .url();
}
