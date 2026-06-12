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

/** Primary portrait for About page and step 1 on How It Works */
export const DR_DEEPALI_PORTRAIT = DR_DEEPALI_PHOTOS[0];

/** Featured session clip for About page and safety section */
export const DR_DEEPALI_FEATURED_VIDEO = DR_DEEPALI_VIDEOS[0];

/** Gallery photos (all except portrait) */
export const DR_DEEPALI_GALLERY_PHOTOS = DR_DEEPALI_PHOTOS.slice(1);
