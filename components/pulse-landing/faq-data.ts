export type FaqCategory = "general" | "safety" | "sessions" | "cost";

export type FaqItem = {
  id: string;
  q: string;
  a: string;
  category: FaqCategory;
  featured?: boolean;
};

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "general", label: "General" },
  { id: "safety", label: "Safety" },
  { id: "sessions", label: "Sessions" },
  { id: "cost", label: "Cost" },
];

export const FAQS: FaqItem[] = [
  {
    id: "cost",
    category: "cost",
    q: "How much does the program cost?",
    a: "Pricing is discussed during your free assessment. Dr. Deepali will recommend a program suited to your condition - there is no obligation to join after the call.",
    featured: true,
  },
  {
    id: "family",
    category: "sessions",
    q: "Can a family member join the call?",
    a: "Absolutely. Family members are welcome in the assessment call and in the sessions. Many of Dr. Deepali's patients are elderly, and their family members are actively involved in their recovery.",
    featured: true,
  },
  {
    id: "online-effective",
    category: "general",
    q: "Is online rehabilitation as effective as in-person?",
    a: "Yes. Multiple studies confirm supervised tele-rehabilitation produces outcomes comparable to in-person programs for cardiac and pulmonary patients. The key word is supervised - sessions with Dr. Deepali are real-time, not pre-recorded videos.",
  },
  {
    id: "outside-noida",
    category: "general",
    q: "Can I join if I am outside Noida?",
    a: "Absolutely. The tele-rehabilitation program is available to patients across India. All you need is a smartphone or computer and a stable internet connection.",
  },
  {
    id: "vs-discharge",
    category: "general",
    q: "How is this different from the exercises my doctor gave me?",
    a: "Discharge exercises provide a valuable starting point for recovery. Rehabilitation, however, is far more individualized. At PulseBreath, every program is tailored to your specific diagnosis, symptoms, functional capacity, heart rate response, oxygen levels, and personal goals. Your exercises are continuously monitored and progressed based on how your body responds, ensuring that you improve safely and effectively over time. Rather than following a fixed exercise sheet, you receive a structured rehabilitation plan that evolves with your recovery journey.",
  },
  {
    id: "equipment",
    category: "sessions",
    q: "What equipment do I need at home?",
    a: "For most programs, no equipment is needed. Some exercises may use a chair, a resistance band, or light weights - all of which Dr. Deepali will guide you on before the program begins.",
  },
  {
    id: "duration",
    category: "general",
    q: "How long is a typical program?",
    a: "Most rehabilitation programs are designed for 8-12 weeks, with sessions typically conducted 2-3 times per week. The exact duration depends on your diagnosis, current functional capacity, rehabilitation goals, and how you progress throughout the program. During your initial assessment, Dr. Deepali will evaluate your condition and recommend a personalized rehabilitation plan, including the expected duration and frequency of sessions.",
  },
  {
    id: "safety",
    category: "safety",
    q: "Is it safe to exercise with my condition?",
    a: "When supervised by a specialist, yes - and it is essential. Structured, supervised exercise significantly improves outcomes for cardiac and pulmonary patients. The risk comes from exercising incorrectly or without guidance - which is exactly what Dr. Deepali's programs prevent.",
  },
  {
    id: "symptoms-worsen",
    category: "safety",
    q: "What if I feel unwell during a session?",
    a: "Every session has clear stop rules. If you feel chest pain, severe breathlessness, dizziness, or unusual fatigue, Dr. Deepali will pause immediately and guide you through recovery breathing. Sessions are paced to your symptoms — you are never pushed beyond safe limits. If something feels wrong between sessions, you can message Dr. Deepali directly.",
  },
  {
    id: "emergency",
    category: "safety",
    q: "Is PulseBreath an emergency service?",
    a: "No. PulseBreath is a scheduled rehabilitation service, not an emergency or acute-care provider. If you experience severe chest pain, sudden breathlessness, fainting, or any emergency symptoms, contact your nearest hospital or call emergency services immediately. Always consult your cardiologist or pulmonologist before starting any rehabilitation program.",
  },
  {
    id: "session-length",
    category: "sessions",
    q: "How long is each session?",
    a: "Most live sessions run 45-60 minutes, including warm-up, supervised exercise, breathing work, and cool-down. Dr. Deepali adjusts the length based on your condition and tolerance — shorter sessions are common in early recovery.",
  },
  {
    id: "tele-rehab-setup",
    category: "sessions",
    q: "What do I need for tele-rehab sessions?",
    a: "A smartphone, tablet, or laptop with a camera and stable internet connection. A quiet space with room to move safely is ideal. Dr. Deepali will walk you through the video setup on your first call — no special apps beyond WhatsApp or a video link are required.",
  },
  {
    id: "reschedule",
    category: "sessions",
    q: "Can I reschedule a session?",
    a: "Yes. Life happens — especially during recovery. Message Dr. Deepali on WhatsApp to reschedule. Consistency matters for rehabilitation, but the program is designed to be flexible around your schedule.",
  },
  {
    id: "language",
    category: "general",
    q: "Are sessions available in Hindi and English?",
    a: "Yes. Dr. Deepali conducts sessions in both Hindi and English, and family members who prefer either language are welcome to join and ask questions.",
  },
  {
    id: "payment",
    category: "cost",
    q: "What payment options are available?",
    a: "Payment details are discussed during your free assessment once a program is recommended. Dr. Deepali will explain the structure clearly — there are no hidden fees and no pressure to commit on the first call.",
  },
  {
    id: "free-assessment",
    category: "cost",
    q: "What happens in the free assessment?",
    a: "Dr. Deepali will ask about your diagnosis, current symptoms, medications, and daily activity level. She will explain what supervised rehabilitation could look like for your condition, answer your questions, and recommend a program if appropriate. The call is completely free with no obligation to enrol.",
  },
];

/** Homepage shows the original 8 FAQs */
export const HOMEPAGE_FAQS = FAQS.filter((f) =>
  ["cost", "family", "online-effective", "outside-noida", "vs-discharge", "equipment", "duration", "safety"].includes(f.id),
);

export const FAQ_REASSURANCE = [
  "Free assessment - no obligation",
  "Family members welcome on every call",
  "Supervised sessions across India",
];

/** Top FAQs surfaced on program / teaser pages */
export const TOP_FAQS = FAQS.filter((f) => f.featured).map(({ q, a }) => ({ q, a }));

export function getFaqsByCategory(category: FaqCategory) {
  return FAQS.filter((f) => f.category === category);
}
