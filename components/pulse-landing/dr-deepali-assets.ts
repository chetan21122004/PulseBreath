const BASE = "/assets/dr_deepali";

export const DR_DEEPALI_PHOTOS = [
  `${BASE}/dr-deepali-01.jpeg`,
  `${BASE}/dr-deepali-02.jpeg`,
  `${BASE}/dr-deepali-03.jpeg`,
  `${BASE}/dr-deepali-04.jpeg`,
] as const;

export const DR_DEEPALI_VIDEOS = [
  `${BASE}/dr-deepali-session-01.mp4`,
  `${BASE}/dr-deepali-session-02.mp4`,
  `${BASE}/dr-deepali-session-03.mp4`,
  `${BASE}/dr-deepali-session-04.mp4`,
] as const;

/** Primary portrait — hero and default fallback */
export const DR_DEEPALI_HERO_PORTRAIT = DR_DEEPALI_PHOTOS[0];

/** About section — alternate portrait so hero and about feel distinct */
export const DR_DEEPALI_ABOUT_PORTRAIT = DR_DEEPALI_PHOTOS[1];

/** Poster for supervised session clips */
export const DR_DEEPALI_SESSION_POSTER = DR_DEEPALI_PHOTOS[2];

/** Soft background for journey safety band */
export const DR_DEEPALI_JOURNEY_BG = DR_DEEPALI_PHOTOS[3];

/** Backward-compatible aliases used on About / How It Works */
export const DR_DEEPALI_PORTRAIT = DR_DEEPALI_HERO_PORTRAIT;
export const DR_DEEPALI_FEATURED_VIDEO = DR_DEEPALI_VIDEOS[0];

/** Journey safety section — supervised session clip */
export const DR_DEEPALI_JOURNEY_VIDEO = DR_DEEPALI_VIDEOS[2];

/** Gallery photos (all except hero portrait) — About page */
export const DR_DEEPALI_GALLERY_PHOTOS = DR_DEEPALI_PHOTOS.slice(1);
