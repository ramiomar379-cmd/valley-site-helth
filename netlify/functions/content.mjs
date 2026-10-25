import { getStore } from "@netlify/blobs";

const MAX_BODY = 5_500_000;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export default async (req) => {
  const store = getStore("moh-site");
  const url = new URL(req.url);

  const expected = (process.env.ADMIN_CODE || "").trim().toUpperCase();
  const sent = (req.headers.get("x-admin-code") || "").trim().toUpperCase();
  const isAdmin = Boolean(expected) && sent === expected;

  if (req.method === "GET") {
    if (url.searchParams.get("check") === "1") {
      return isAdmin ? json({ ok: true }) : json({ ok: false }, 401);
    }
    const data = await store.get("content", { type: "json" });
    if (!data) return json({ error: "no saved content" }, 404);
    return json(data);
  }

  if (req.method === "POST") {
    if (!isAdmin) return json({ error: "unauthorized" }, 401);
    const text = await req.text();
    if (text.length > MAX_BODY) return json({ error: "too large" }, 413);
    let data;
    try { data = JSON.parse(text); } catch { return json({ error: "invalid json" }, 400); }
    if (!data || !data.site || !data.hero) return json({ error: "invalid content" }, 400);
    await store.setJSON("content", data);
    return json({ ok: true });
  }

  return json({ error: "method not allowed" }, 405);
};
