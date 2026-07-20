// Generates brand-colored SVG logo marks + app-window "screenshot" covers
// for the seed products into /public. Run: node scripts/generate-assets.mjs
// These are original, generated assets (no third-party brand artwork), so the
// gallery looks premium while product links point to the real sites.

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const logosDir = join(publicDir, "logos");
const coversDir = join(publicDir, "covers");

mkdirSync(logosDir, { recursive: true });
mkdirSync(coversDir, { recursive: true });

/** @type {{slug:string,name:string,mono:string,c1:string,c2:string}[]} */
const PRODUCTS = [
  { slug: "linear", name: "Linear", mono: "L", c1: "#5E6AD2", c2: "#8B5CF6" },
  { slug: "raycast", name: "Raycast", mono: "R", c1: "#FF6363", c2: "#FF3D77" },
  { slug: "calcom", name: "Cal.com", mono: "C", c1: "#1F2937", c2: "#4B5563" },
  { slug: "supabase", name: "Supabase", mono: "S", c1: "#3ECF8E", c2: "#10B981" },
  { slug: "resend", name: "Resend", mono: "R", c1: "#0F172A", c2: "#334155" },
  { slug: "excalidraw", name: "Excalidraw", mono: "E", c1: "#6965DB", c2: "#A78BFA" },
  { slug: "plausible", name: "Plausible", mono: "P", c1: "#6366F1", c2: "#4F46E5" },
  { slug: "tally", name: "Tally", mono: "T", c1: "#111827", c2: "#374151" },
  { slug: "framer", name: "Framer", mono: "F", c1: "#0F172A", c2: "#0055FF" },
  { slug: "warp", name: "Warp", mono: "W", c1: "#00DDB3", c2: "#0EA5E9" },
];

function logoSvg({ mono, c1, c2 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="256" height="256" rx="60" fill="url(#g)"/>
  <rect width="256" height="256" rx="60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="2"/>
  <text x="128" y="132" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="132"
    font-weight="800" fill="#fff" text-anchor="middle" dominant-baseline="central"
    filter="url(#s)">${mono}</text>
</svg>
`;
}

function coverSvg({ name, c1, c2 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <linearGradient id="side" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${c2}" stop-opacity="0.08"/>
    </linearGradient>
    <filter id="win" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="24" stdDeviation="40" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- backdrop -->
  <rect width="1200" height="750" fill="url(#bg)"/>
  <rect width="1200" height="750" fill="#0B1120" opacity="0.55"/>

  <!-- app window -->
  <g filter="url(#win)">
    <rect x="120" y="90" width="960" height="570" rx="20" fill="#0F172A"/>
    <rect x="120" y="90" width="960" height="570" rx="20" fill="none" stroke="#fff" stroke-opacity="0.08"/>
    <!-- title bar -->
    <rect x="120" y="90" width="960" height="52" rx="20" fill="#111c33"/>
    <rect x="120" y="122" width="960" height="20" fill="#111c33"/>
    <circle cx="152" cy="116" r="7" fill="#ff5f57"/>
    <circle cx="176" cy="116" r="7" fill="#febc2e"/>
    <circle cx="200" cy="116" r="7" fill="#28c840"/>
    <rect x="470" y="104" width="260" height="24" rx="12" fill="#1e293b"/>

    <!-- sidebar -->
    <rect x="120" y="142" width="230" height="518" fill="url(#side)"/>
    <rect x="150" y="180" width="120" height="14" rx="7" fill="#fff" fill-opacity="0.85"/>
    <rect x="150" y="220" width="170" height="12" rx="6" fill="#fff" fill-opacity="0.25"/>
    <rect x="150" y="248" width="150" height="12" rx="6" fill="#fff" fill-opacity="0.25"/>
    <rect x="150" y="276" width="170" height="12" rx="6" fill="${c1}" fill-opacity="0.9"/>
    <rect x="150" y="304" width="140" height="12" rx="6" fill="#fff" fill-opacity="0.25"/>
    <rect x="150" y="332" width="160" height="12" rx="6" fill="#fff" fill-opacity="0.25"/>

    <!-- main content -->
    <text x="390" y="205" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="40"
      font-weight="800" fill="#fff">${name}</text>
    <rect x="390" y="235" width="360" height="14" rx="7" fill="#fff" fill-opacity="0.35"/>

    <rect x="390" y="290" width="300" height="150" rx="14" fill="${c1}" fill-opacity="0.18" stroke="${c1}" stroke-opacity="0.4"/>
    <rect x="710" y="290" width="300" height="150" rx="14" fill="${c2}" fill-opacity="0.18" stroke="${c2}" stroke-opacity="0.4"/>
    <rect x="420" y="320" width="90" height="12" rx="6" fill="#fff" fill-opacity="0.55"/>
    <text x="420" y="392" font-family="Inter, system-ui, sans-serif" font-size="46" font-weight="800" fill="#fff">42.8k</text>
    <rect x="740" y="320" width="90" height="12" rx="6" fill="#fff" fill-opacity="0.55"/>
    <text x="740" y="392" font-family="Inter, system-ui, sans-serif" font-size="46" font-weight="800" fill="#fff">+128%</text>

    <rect x="390" y="470" width="620" height="150" rx="14" fill="#fff" fill-opacity="0.05" stroke="#fff" stroke-opacity="0.08"/>
    <polyline points="410,590 480,560 550,575 620,520 690,540 760,495 830,510 900,470 980,485"
      fill="none" stroke="${c2}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;
}

let count = 0;
for (const p of PRODUCTS) {
  writeFileSync(join(logosDir, `${p.slug}.svg`), logoSvg(p));
  writeFileSync(join(coversDir, `${p.slug}.svg`), coverSvg(p));
  count += 2;
}

console.log(`Generated ${count} assets for ${PRODUCTS.length} products.`);
console.log(`  logos  -> public/logos/*.svg`);
console.log(`  covers -> public/covers/*.svg`);
