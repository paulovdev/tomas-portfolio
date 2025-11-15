import { createClient } from "@sanity/client";

const client = createClient({
  projectId: import.meta.env.VITE_PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_PUBLIC_SANITY_PROJECT_DATASET,
  token: import.meta.env.VITE_PUBLIC_SANITY_PROJECT_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export default client;
