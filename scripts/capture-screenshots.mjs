// Capture real screenshots of each product's site via microlink, save to /public/shots.
// Run: node scripts/capture-screenshots.mjs
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "shots");

const PRODUCTS = [
  { id: "linear", url: "https://linear.app" },
  { id: "raycast", url: "https://raycast.com" },
  { id: "supabase", url: "https://supabase.com" },
  { id: "calcom", url: "https://cal.com" },
  { id: "resend", url: "https://resend.com" },
  { id: "excalidraw", url: "https://excalidraw.com" },
  { id: "plausible", url: "https://plausible.io" },
  { id: "tally", url: "https://tally.so" },
  { id: "framer", url: "https://framer.com" },
  { id: "warp", url: "https://www.warp.dev" },
];

async function capture({ id, url }) {
  const api =
    "https://api.microlink.io/?url=" +
    encodeURIComponent(url) +
    "&screenshot=true&meta=false&viewport.width=1440&viewport.height=900&screenshot.type=png";
  const res = await fetch(api);
  const json = await res.json();
  const shotUrl = json?.data?.screenshot?.url;
  if (!shotUrl) throw new Error(`no screenshot url for ${id}: ${JSON.stringify(json).slice(0, 200)}`);
  const img = await fetch(shotUrl);
  if (!img.ok) throw new Error(`download failed for ${id}: ${img.status}`);
  const buf = Buffer.from(await img.arrayBuffer());
  await writeFile(join(OUT, `${id}.png`), buf);
  return buf.length;
}

await mkdir(OUT, { recursive: true });
for (const p of PRODUCTS) {
  try {
    const bytes = await capture(p);
    console.log(`ok   ${p.id}  ${(bytes / 1024).toFixed(0)} kB`);
  } catch (e) {
    console.log(`FAIL ${p.id}  ${e.message}`);
  }
}
console.log("done -> public/shots/*.png");
