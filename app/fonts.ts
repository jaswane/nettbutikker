import { Manrope } from "next/font/google";

/**
 * Single modern sans-serif identity (PRD identity round).
 * Manrope: contemporary, highly legible, with a touch of character (open
 * counters, distinctive 'a'/'g') – reads as a premium search tool, not
 * Helvetica-neutral or generic SaaS. Variable font, so all weights
 * (400/500/600/700/800) are available for headings and UI.
 */
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
