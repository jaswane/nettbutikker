import { ImageResponse } from "next/og";
import { BRAND_ACCENT_HEX } from "@/lib/site";

/**
 * Brand mark / favicon: a minimalist lowercase "n" with an accent dot –
 * echoes the "·no" in the wordmark and reads as a small direction marker.
 * Light tile so it stays legible on both light and dark browser tab bars.
 * The dot uses the active design direction's muted accent (never bright blue).
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const accent = BRAND_ACCENT_HEX;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#faf7f0",
          borderRadius: 7,
          color: "#111827",
        }}
      >
        <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1, marginLeft: -2 }}>
          n
        </div>
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 6,
            height: 6,
            borderRadius: 6,
            background: accent,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
