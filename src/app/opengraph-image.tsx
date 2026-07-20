import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Route segment config
export const runtime = "nodejs";
export const alt =
  "SparkLaunch — Launch your product. Reach thousands of makers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read brand assets from disk (works on the Node runtime at build/request time).
const heroData = readFileSync(
  join(process.cwd(), "public/hero/workspace.jpg")
);
const heroSrc = `data:image/jpeg;base64,${heroData.toString("base64")}`;

const playfair = readFileSync(
  join(process.cwd(), "src/app/_og-assets/PlayfairDisplay-Bold.ttf")
);

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          color: "white",
        }}
      >
        {/* Hero photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Dark editorial overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,12,10,0.55) 0%, rgba(15,12,10,0.45) 45%, rgba(15,12,10,0.8) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "64px 72px",
          }}
        >
          {/* Brand row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)",
                fontSize: 30,
              }}
            >
              🚀
            </div>
            SparkLaunch
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Playfair",
                fontSize: 76,
                lineHeight: 1.05,
                letterSpacing: -1,
                maxWidth: 900,
              }}
            >
              Launch your product. Reach thousands of makers.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "rgba(255,255,255,0.82)",
                maxWidth: 820,
              }}
            >
              The all-in-one platform where founders launch and early adopters
              discover what{"'"}s next.
            </div>
          </div>

          {/* Stats footer */}
          <div style={{ display: "flex", gap: 48, fontSize: 26 }}>
            {[
              ["30k+", "makers / mo"],
              ["320k+", "visitors"],
              ["550k+", "impressions"],
            ].map(([value, label]) => (
              <div key={label} style={{ display: "flex", gap: 10 }}>
                <span style={{ fontWeight: 700 }}>{value}</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Playfair",
          data: playfair,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
