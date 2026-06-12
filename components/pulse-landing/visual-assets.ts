const blob1 = "/assets/bg_blobs/1.jpg";
const blob2 = "/assets/bg_blobs/2.jpg";
const blob3 = "/assets/bg_blobs/3.jpg";
const onlineDoctor = "/assets/illustrations/Online Doctor-amico (1).svg";
const cardiologistBro = "/assets/illustrations/Cardiologist-bro.svg";
const cardiologistRafiki = "/assets/illustrations/Cardiologist-rafiki (1).svg";
const elderlyAmico = "/assets/illustrations/Active elderly people-amico.svg";
const elderlyRafiki = "/assets/illustrations/Active elderly people-rafiki.svg";

export const BLOBS = { 1: blob1, 2: blob2, 3: blob3 } as const;

export const ILLUSTRATIONS = {
  onlineDoctor,
  cardiologistBro,
  cardiologistRafiki,
  elderlyAmico,
  elderlyRafiki,
} as const;
