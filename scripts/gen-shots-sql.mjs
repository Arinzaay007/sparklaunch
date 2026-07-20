import { writeFileSync } from "node:fs";

const map = {
  "prod-linear": "linear",
  "prod-raycast": "raycast",
  "prod-supabase": "supabase",
  "prod-cal": "calcom",
  "prod-resend": "resend",
  "prod-excalidraw": "excalidraw",
  "prod-plausible": "plausible",
  "prod-tally": "tally",
  "prod-framer": "framer",
  "prod-warp": "warp",
};

const lines = [
  "-- SparkLaunch — point product screenshots at the real captured images.",
  "-- Real screenshot first (carousel hero), branded cover second.",
  "",
];
for (const [id, slug] of Object.entries(map)) {
  lines.push(
    `update public.products set screenshots = array['/shots/${slug}.png','/covers/${slug}.svg'] where id = '${id}';`
  );
}
const sql = lines.join("\n") + "\n";
writeFileSync("supabase/update-screenshots.sql", sql);
process.stdout.write(sql);
