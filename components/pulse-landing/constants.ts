import {
  DR_DEEPALI_FEATURED_VIDEO,
  DR_DEEPALI_JOURNEY_VIDEO,
  DR_DEEPALI_PORTRAIT,
  DR_DEEPALI_SESSION_POSTER,
} from "./dr-deepali-assets";

const heroBgClip1 = "/assets/bg_vdo/1.mp4";
const heroBgClip2 = "/assets/bg_vdo/2.mp4";
const heroBgClip3 = "/assets/bg_vdo/3.mp4";
const heroBgClip4 = "/assets/bg_vdo/4.mp4";

export const PHONE = "7772894136";
export const EMAIL = "deepalishah.pt@gmail.com";
export const LINKEDIN =
  "https://www.linkedin.com/in/dr-deepali-shah-pt-29396b200/";
export const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi Dr. Deepali, I'd like to book a free assessment. My condition is ___.",
)}`;

export const WHATSAPP_OFFERS = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi Dr. Deepali, I'd like to book my FREE clinical assessment for the 8-week Pulmonary Rehabilitation Programme.",
)}`;

export const CLINIC_ADDRESS = "PulseBreath Physiotherapy, Noida, Uttar Pradesh, India";

export const MEDICAL_DISCLAIMER =
  "PulseBreath Physiotherapy is not an emergency service. Always consult your cardiologist or pulmonologist before starting any rehabilitation program.";

/** Absolute site origin used for canonical URLs and structured data (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pulsebreathphysiotherapy.in"
).replace(/\/$/, "");

export const PROGRAM_ROUTES = {
  cardiac: "/services/cardiac",
  pulmonary: "/services/pulmonary",
  metabolic: "/services/metabolic",
} as const;

export type ProgramSlug = keyof typeof PROGRAM_ROUTES;

/** Hero background: play every clip from `bg_vdo` in order, then loop -at fixed playback speed. */
export const HERO_BG_CLIPS = [heroBgClip1, heroBgClip2, heroBgClip3, heroBgClip4] as const;
export const HERO_BG_PLAYBACK_RATE = 1.25;

/** Safety callout in Journey - supervised session clip from Dr. Deepali assets. */
export const JOURNEY_SAFETY_VIDEO = DR_DEEPALI_JOURNEY_VIDEO;

/** Static image shown when the safety video cannot load (slow or offline connection). */
export const JOURNEY_SAFETY_FALLBACK_IMAGE = DR_DEEPALI_SESSION_POSTER;

/** Dr. Deepali portrait and featured session clip - re-exported for convenience. */
export { DR_DEEPALI_PORTRAIT, DR_DEEPALI_FEATURED_VIDEO };
