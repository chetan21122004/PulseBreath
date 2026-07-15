import {
  Activity,
  ClipboardCheck,
  HeartPulse,
  LineChart,
  Monitor,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Video,
  Wind,
} from "lucide-react";

export const NEW_BATCH_ROUTE = "/new-batch" as const;

export const UPCOMING_BATCH = {
  status: "Enrolling Now",
  startDate: "27 July 2026",
  startDateShort: "27 July",
  startDay: "Sunday",
} as const;

export const PROMO_FLASH = {
  badge: "New Batch",
  message:
    "New group sessions starting 27 July — 8-week specialist pulmonary rehabilitation. Book your free clinical assessment.",
  shortMessage: "New group sessions starting 27 July",
} as const;

export const PULMONARY_PROGRAM = {
  title: "8-Week Specialist Pulmonary Rehabilitation Programme",
  tagline: "Expert care. Wherever you are.",
  subtitle: "Science-backed. Specialist-led. Outcome-driven.",
  teleRehab: "Live tele-rehabilitation from the comfort of your home.",
  batchDate: "New batch commencing 27 July",
  motto: "Small groups. Better supervision. Better outcomes.",
} as const;

export const FREE_ASSESSMENT = {
  headline: "Free Clinical Assessment",
  description:
    "Every participant undergoes a free clinical assessment before enrolment — because rehabilitation should be prescribed, not generalised.",
  cta: "Book Your Free Clinical Assessment",
  support:
    "Unsure if this programme is right for you? Your free clinical assessment will help determine whether group rehabilitation is suitable for your condition.",
} as const;

export const PROGRAM_OPTIONS = [
  {
    id: "standard",
    sessionsPerWeek: 3,
    durationWeeks: 8,
    totalSessions: 24,
    label: "Consistent rehabilitation",
    description:
      "Ideal for consistent rehabilitation while maintaining your daily routine.",
    startDate: UPCOMING_BATCH.startDate,
    startDateShort: UPCOMING_BATCH.startDateShort,
  },
  {
    id: "intensive",
    sessionsPerWeek: 6,
    durationWeeks: 8,
    totalSessions: 48,
    label: "Faster recovery",
    description:
      "Ideal for faster functional recovery and closer professional supervision.",
    startDate: UPCOMING_BATCH.startDate,
    startDateShort: UPCOMING_BATCH.startDateShort,
  },
] as const;

export const SESSION_FEATURES = [
  {
    icon: ClipboardCheck,
    title: "Clinically Prescribed",
    description: "Exercises planned based on assessment and clinical condition.",
  },
  {
    icon: Wind,
    title: "Symptom-Guided",
    description: "Intensity and progression guided by breathlessness and response.",
  },
  {
    icon: TrendingUp,
    title: "Progressed Safely",
    description: "Gradual progression according to capacity, ensuring safety and effectiveness.",
  },
  {
    icon: Activity,
    title: "Continuously Monitored",
    description: "SpO₂, heart rate, and symptoms monitored throughout the session.",
  },
  {
    icon: Users,
    title: "Specialist Supervised",
    description: "Live sessions led by Dr. Deepali Shah (PT) and her expert team.",
  },
  {
    icon: LineChart,
    title: "Outcome Focused",
    description: "Functional outcomes tracked with a structured progress report.",
  },
] as const;

export const TARGET_CONDITIONS = [
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Asthma",
  "Bronchiectasis",
  "Interstitial Lung Disease (ILD)",
  "Pulmonary Hypertension",
  "Recovery Following COVID-19",
  "Recovery Following Heart or Lung Surgery",
  "Individuals Requiring Cardiac Rehabilitation",
] as const;

export const PROGRAM_HIGHLIGHTS = [
  { icon: Video, label: "Live tele-rehabilitation" },
  { icon: Stethoscope, label: "Free clinical assessment" },
  { icon: ShieldCheck, label: "Specialist-led supervision" },
  { icon: Monitor, label: "Vitals monitored every session" },
  { icon: HeartPulse, label: "Outcome-driven care" },
] as const;

export type ProgramOption = (typeof PROGRAM_OPTIONS)[number];
