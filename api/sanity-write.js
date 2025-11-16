import { createClient } from "@sanity/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2024-01-01",
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
  });

  try {
    const { mutations } = req.body;

    if (!mutations || !Array.isArray(mutations)) {
      return res.status(400).json({ error: "Missing mutations array" });
    }

    const result = await client.mutate(mutations);

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("Sanity write error:", err);
    return res
      .status(500)
      .json({ error: "Sanity write failed", details: err.message });
  }
}
