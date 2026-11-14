import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getProfilePhoto } from "@/lib/assets";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module scope; null (monogram fallback) if no photo has been added.
const photoUrl = getProfilePhoto();
const photoSrc = photoUrl
  ? `data:image/${photoUrl.endsWith(".png") ? "png" : "jpeg"};base64,${await readFile(
      join(process.cwd(), "public", photoUrl),
      "base64",
    )}`
  : null;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 96px",
          background: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 168,
            height: 168,
            borderRadius: 40,
            // The portrait is a transparent cut-out, so give it a tinted tile to sit on.
            background: photoSrc ? "#DBEAFE" : "#2563EB",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 84,
            fontWeight: 800,
            overflow: "hidden",
          }}
        >
          {photoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>
            <img
              src={photoSrc}
              alt=""
              width={168}
              height={168}
              style={{ width: 168, height: 168, objectFit: "cover", objectPosition: "50% 0%" }}
            />
          ) : (
            site.monogram
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 56 }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#172554" }}>{site.name}</div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#2563EB", marginTop: 8 }}>{site.role}</div>
          <div style={{ fontSize: 28, color: "#64748B", marginTop: 20, maxWidth: 760 }}>
            Building modern web experiences with clean code and creative thinking.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
