import {
  Activity,
  ClipboardCheck,
  HeartPulse,
  LineChart,
  Monitor,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  UserRound,
  Users,
  Video,
  Wind,
} from "lucide-react";

export const SESSIONS_ROUTE = "/sessions" as const;

export const SESSIONS_INTRO = {
  pill: "Sessions",
  titleLead: "Two formats.",
  titleAccent: "One clinical standard.",
  description:
    "At PulseBreath Physiotherapy, rehabilitation is offered in two formats, allowing you to choose the approach that best suits your needs.",
  teleRehab: "Live, clinician-guided sessions from the comfort of your home.",
  motto: "Assessment first. Then the format that fits you.",
} as const;

export const SESSION_FORMATS = [
  {
    id: "one-on-one",
    icon: UserRound,
    label: "Format 1",
    title: "Personalised 1-on-1 Sessions",
    tagline: "Individual attention. Rehabilitation designed around you.",
    description:
      "Live, clinician-guided sessions from the comfort of your home, tailored to your assessment findings, goals, symptoms and exercise capacity.",
    detail:
      "Ideal for individuals who prefer personalised supervision or require closer clinical guidance throughout their rehabilitation.",
    points: [
      "Tailored to your assessment, goals and capacity",
      "Closer clinical guidance throughout rehab",
      "Live supervision from home",
    ],
  },
  {
    id: "small-group",
    icon: Users,
    label: "Format 2",
    title: "Small-Group Sessions",
    tagline: "Rehabilitate together. Progress with the right group.",
    description:
      "Sessions conducted in small batches of 5–7 participants, grouped based on their diagnosis, functional capacity and rehabilitation needs.",
    detail:
      "This allows you to exercise alongside people with similar clinical and functional profiles, while still receiving professional guidance and supervision.",
    points: [
      "Small groups of 5–7 participants",
      "Matched by diagnosis and functional capacity",
      "Professional guidance with peer support",
    ],
  },
] as const;

export const FREE_ASSESSMENT = {
  headline: "Every participant begins with an assessment",
  description:
    "Your assessment helps us determine which session format is most appropriate for you — because rehabilitation should be prescribed, not generalised.",
  cta: "Book Your Free Clinical Assessment",
  support:
    "Unsure which format is right for you? Your free clinical assessment will help determine whether personalised 1-on-1 or small-group sessions best suit your condition.",
} as const;

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

export type SessionFormat = (typeof SESSION_FORMATS)[number];
