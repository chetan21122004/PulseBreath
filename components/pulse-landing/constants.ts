const heroBgClip1 = "/assets/bg_vdo/1.mp4";
const heroBgClip2 = "/assets/bg_vdo/2.mp4";
const heroBgClip3 = "/assets/bg_vdo/3.mp4";
const heroBgClip4 = "/assets/bg_vdo/4.mp4";
const journeySafetyFallback = "/assets/imgs/pexels-kampus-8173440.jpg.jpeg";
const drDeepaliPortrait = "/assets/dr_deepali/dr-deepali-01.jpeg";
const drDeepaliFeaturedVideo = "/assets/dr_deepali/dr-deepali-session-01.mp4";

export const PHONE = "7772894136";
export const EMAIL = "deepalishah.pt@gmail.com";
export const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi Dr. Deepali, I'd like to book a free assessment. My condition is ___.",
)}`;

export const CLINIC_ADDRESS = "PulseBreath Physiotherapy, Noida, Uttar Pradesh, India";

export const PROGRAM_ROUTES = {
  cardiac: "/services/cardiac",
  pulmonary: "/services/pulmonary",
  metabolic: "/services/metabolic",
} as const;

export type ProgramSlug = keyof typeof PROGRAM_ROUTES;

/** Hero background: play every clip from `bg_vdo` in order, then loop -at fixed playback speed. */
export const HERO_BG_CLIPS = [heroBgClip1, heroBgClip2, heroBgClip3, heroBgClip4] as const;
export const HERO_BG_PLAYBACK_RATE = 1.25;

/** Safety callout in Journey - supervised exercise clip. */
export const JOURNEY_SAFETY_VIDEO = heroBgClip3;

/** Static image shown when the safety video cannot load (slow or offline connection). */
export const JOURNEY_SAFETY_FALLBACK_IMAGE = journeySafetyFallback;

/** Dr. Deepali portrait and featured session clip from `dr_deepali` assets. */
export const DR_DEEPALI_PORTRAIT = drDeepaliPortrait;
export const DR_DEEPALI_FEATURED_VIDEO = drDeepaliFeaturedVideo;
