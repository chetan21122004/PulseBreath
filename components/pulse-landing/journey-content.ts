import type { LucideIcon } from "lucide-react";
import { HeartPulse, ShieldCheck, Video } from "lucide-react";

export type JourneyStep = {
  n: number;
  t: string;
  lead: string;
  detail: string;
  more: string[];
  patientDoes: string[];
  drDeepaliDoes: string[];
  tone: "teal" | "pink";
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    n: 1,
    t: "Free Assessment",
    lead: "Complimentary free assessment with Dr. Deepali.",
    detail:
      "She reviews your condition, what you can manage today, and your recovery goals - before you decide anything.",
    more: [
      "Completely free - no obligation to join",
      "Family members welcome on the call",
    ],
    patientDoes: [
      "Share your diagnosis, recent reports, and current symptoms honestly",
      "Describe your daily routine, mobility, and what you hope to achieve",
      "Ask every question you have — there is no wrong question",
    ],
    drDeepaliDoes: [
      "Reviews your clinical history and functional capacity",
      "Explains whether supervised rehabilitation is appropriate for you",
      "Outlines what a program could look like — without any pressure to enrol",
    ],
    tone: "teal",
  },
  {
    n: 2,
    t: "Personalised Plan",
    lead: "A program built for your condition and capacity.",
    detail:
      "Dr. Deepali designs exercises around your diagnosis, fitness level, and daily routine - not a generic template.",
    more: ["Adapted for home with minimal equipment", "Clear pace and progression from day one"],
    patientDoes: [
      "Confirm your schedule and any equipment you have at home",
      "Set realistic recovery goals together with Dr. Deepali",
      "Understand the session frequency and expected timeline",
    ],
    drDeepaliDoes: [
      "Creates a condition-specific exercise and breathing plan",
      "Sets heart-rate zones, intensity limits, and progression milestones",
      "Adapts the plan for your home space, comorbidities, and medications",
    ],
    tone: "pink",
  },
  {
    n: 3,
    t: "Guided Sessions",
    lead: "Live online sessions - group or one-to-one.",
    detail:
      "Dr. Deepali supervises throughout: safe pace, correct technique, and real-time guidance.",
    more: [
      "Heart rate, breathing, and how you feel are monitored",
      "Every session is live - not a pre-recorded workout",
    ],
    patientDoes: [
      "Join the video call from a safe, quiet space with room to move",
      "Report how you feel at the start and throughout the session",
      "Follow pacing cues and speak up if anything feels wrong",
    ],
    drDeepaliDoes: [
      "Leads every session live on screen — correcting form in real time",
      "Monitors heart rate, breathing, and symptom response throughout",
      "Adjusts intensity, rest periods, and exercises based on your response",
    ],
    tone: "teal",
  },
  {
    n: 4,
    t: "Progress Review",
    lead: "Regular check-ins as you improve.",
    detail: "Your plan is adjusted gradually as your capacity grows - sustainable, not rushed.",
    more: ["Changes based on how you respond each week", "Focused on long-term strength and confidence"],
    patientDoes: [
      "Track how you feel between sessions and share updates honestly",
      "Celebrate milestones — stairs, walks, daily tasks — as they return",
      "Stay consistent with session attendance for best outcomes",
    ],
    drDeepaliDoes: [
      "Reviews weekly progress and adjusts exercise load progressively",
      "Identifies plateaus early and modifies the plan before setbacks",
      "Builds toward long-term independence and confidence in daily activity",
    ],
    tone: "pink",
  },
];

export const JOURNEY_SAFETY_POINTS: { icon: LucideIcon; text: string }[] = [
  {
    icon: Video,
    text: "Every session is guided live by Dr. Deepali - not a pre-recorded workout",
  },
  {
    icon: HeartPulse,
    text: "Heart rate, breathing, and how you feel are monitored throughout",
  },
  {
    icon: ShieldCheck,
    text: "Built on clinical rehab guidelines with clear stop rules if you feel unwell",
  },
];

export const JOURNEY_SAFETY_EXTRA = [
  "Structured exercise under specialist supervision is one of the most evidence-backed interventions for cardiac and pulmonary recovery. The risk is not in moving — it is in moving without guidance.",
  "Dr. Deepali follows published cardiac and pulmonary rehabilitation guidelines, with defined stop rules for chest pain, severe breathlessness, dizziness, and unusual fatigue.",
  "If you are unsure whether exercise is safe for your specific condition, that is exactly what the free assessment is for — a honest, clinical conversation before any commitment.",
];

export const JOURNEY_TELE_REHAB = [
  { title: "Live video, never recorded", detail: "Real-time guidance from Dr. Deepali every session." },
  { title: "Vitals tracked together", detail: "Heart-rate and SpO₂ monitoring guidance through the session." },
  { title: "Available across India", detail: "From Noida to anywhere — wherever you have a screen and stable internet." },
  { title: "Small groups or 1:1", detail: "Intimate cohorts by condition, or individual sessions when closer attention is needed." },
];

export const CONTACT_FLOW = [
  {
    step: 1,
    title: "You reach out",
    detail: "Send a WhatsApp message, call, or email. Share your condition in a sentence — that is enough to start.",
  },
  {
    step: 2,
    title: "Dr. Deepali responds",
    detail: "She replies personally, usually within a few hours during clinic hours (Mon–Sat, 8 AM – 8 PM IST).",
  },
  {
    step: 3,
    title: "Free assessment scheduled",
    detail: "A video call at a time that works for you. Family members welcome. No cost, no obligation.",
  },
  {
    step: 4,
    title: "You decide together",
    detail: "If a program is right for you, Dr. Deepali explains options and pricing. If not, you leave with clarity — no pressure.",
  },
];
