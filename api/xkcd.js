export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { num } = req.query;
  const base = "https://xkcd.com";
  const endpoint = num ? `${base}/${num}/info.0.json` : `${base}/info.0.json`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      res.status(response.status).json({ error: "Failed to fetch XKCD" });
      return;
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "XKCD proxy error" });
  }
}
