import {
  Activity,
  Heart,
  HeartPulse,
  Stethoscope,
  Wind,
  Droplet,
} from "lucide-react";

export type ProgramCategoryTone = "rose" | "teal" | "burgundy";
export type ProgramCategoryLayout = "quad" | "five" | "trio";

export const programCategories = [
  {
    k: "01",
    cat: "Cardiac",
    tone: "rose" as const satisfies ProgramCategoryTone,
    layout: "quad" as const satisfies ProgramCategoryLayout,
    icon: HeartPulse,
    tag: "Heart Rehabilitation",
    desc: "Post-surgical and chronic cardiac recovery programs supervised by a cardiopulmonary specialist -restoring functional capacity, confidence and quality of life.",
    stat: { v: "120+", l: "Cardiac patients guided" },
    programs: [
      {
        i: HeartPulse,
        t: "Post CABG (Bypass) Rehabilitation",
        for: "Patients 2-12 weeks post bypass surgery",
        dur: "10-12 weeks · 3 sessions/week",
        benefits: [
          "Sternal-precaution-safe progressive loading",
          "Heart-rate-zone monitored aerobic conditioning",
          "Return-to-stairs, return-to-driving milestones",
        ],
      },
      {
        i: Activity,
        t: "Post PTCA / Angioplasty Rehab",
        for: "Patients post-stent, post-PCI",
        dur: "8-10 weeks · 3 sessions/week",
        benefits: [
          "Risk-factor reset (BP, lipids, HR variability)",
          "Symptom-limited graded exercise plan",
          "Lifestyle and stress-load coaching",
        ],
      },
      {
        i: Heart,
        t: "Heart Failure Management",
        for: "NYHA Class I-III, EF-reduced patients",
        dur: "12 weeks · 3 sessions/week",
        benefits: [
          "Fluid-status & weight tracking guidance",
          "Low-intensity interval conditioning",
          "Breathlessness and fatigue desensitisation",
        ],
      },
      {
        i: Stethoscope,
        t: "Post Valve Replacement",
        for: "Mechanical/tissue valve recovery",
        dur: "10-12 weeks · 3 sessions/week",
        benefits: [
          "Anticoagulation-aware exercise pacing",
          "Inspiratory muscle training (IMT)",
          "Endurance rebuild and posture restoration",
        ],
      },
    ],
  },
  {
    k: "02",
    cat: "Pulmonary",
    tone: "teal" as const satisfies ProgramCategoryTone,
    layout: "five" as const satisfies ProgramCategoryLayout,
    icon: Wind,
    tag: "Lung Rehabilitation",
    desc: "Condition-specific pulmonary rehab -separate, evidence-led pathways for obstructive, restrictive and post-surgical lung conditions.",
    stat: { v: "70+", l: "Pulmonary patients guided" },
    programs: [
      {
        i: Wind,
        t: "COPD Management Program",
        for: "GOLD A-D, frequent exacerbators",
        dur: "8-12 weeks · 3 sessions/week",
        benefits: [
          "Pursed-lip & diaphragmatic breathing retraining",
          "Exacerbation early-warning protocol",
          "Energy conservation for daily activities",
        ],
      },
      {
        i: Wind,
        t: "Asthma Rehabilitation",
        for: "Children and adults diagnosed with varied ranges and patterns of asthma",
        dur: "6-8 weeks · 2-3 sessions/week",
        benefits: [
          "Trigger-mapping and breath-control training",
          "Aerobic capacity rebuild without flares",
          "Inhaler-technique audit & correction",
        ],
      },
      {
        i: Wind,
        t: "Bronchiectasis Rehabilitation",
        for: "Chronic productive cough, recurrent infections",
        dur: "8-10 weeks · 3 sessions/week",
        benefits: [
          "Airway clearance technique (ACT) coaching",
          "Postural drainage routines",
          "Endurance + inspiratory muscle training",
        ],
      },
      {
        i: Wind,
        t: "ILD (Interstitial Lung Disease)",
        for: "IPF, sarcoid, post-COVID fibrosis",
        dur: "12 weeks · 2-3 sessions/week",
        benefits: [
          "SpO₂-paced low-intensity training",
          "Oxygen-titration guidance",
          "Dyspnoea management & psychological support",
        ],
      },
      {
        i: HeartPulse,
        t: "Pulmonary Hypertension Rehabilitation",
        for: "Patients with pulmonary hypertension needing monitored conditioning",
        dur: "8-12 weeks · 2-3 sessions/week",
        benefits: [
          "Heart-rate and SpO2 guided activity pacing",
          "Breathlessness-safe strength and endurance work",
          "Symptom monitoring for safer daily movement",
        ],
      },
      {
        i: Stethoscope,
        t: "Occupational Lung Disease Rehabilitation",
        for: "Work-related lung conditions and reduced breathing capacity",
        dur: "8-12 weeks · 2-3 sessions/week",
        benefits: [
          "Condition-specific breathing and airway strategies",
          "Functional capacity rebuilding for daily demands",
          "Education for pacing, triggers, and flare prevention",
        ],
      },
      {
        i: Stethoscope,
        t: "Post Lobectomy Rehabilitation",
        for: "Post-thoracic surgery recovery",
        dur: "10 weeks · 3 sessions/week",
        benefits: [
          "Chest-wall mobility & scar management",
          "Lung re-expansion techniques",
          "Graded return to functional capacity",
        ],
      },
    ],
  },
  {
    k: "03",
    cat: "Metabolic",
    tone: "burgundy" as const satisfies ProgramCategoryTone,
    layout: "trio" as const satisfies ProgramCategoryLayout,
    icon: Droplet,
    tag: "Lifestyle & Metabolic",
    desc: "Medically supervised exercise programs for metabolic and lifestyle conditions -measured by labs, not the mirror.",
    stat: { v: "50+", l: "Metabolic patients guided" },
    programs: [
      {
        i: Droplet,
        t: "Diabetes Exercise Program",
        for: "Type 2 diabetes, pre-diabetes",
        dur: "12 weeks · 3 sessions/week",
        benefits: [
          "Glucose-response-aware exercise dosing",
          "Resistance + aerobic blend for HbA1c reduction",
          "Foot-care and neuropathy precautions",
        ],
      },
      {
        i: Activity,
        t: "Obesity Management",
        for: "BMI 30+ with comorbidities",
        dur: "16 weeks · 3 sessions/week",
        benefits: [
          "Joint-safe progressive conditioning",
          "Behavioural pacing & habit anchors",
          "Body-composition (not just weight) tracking",
        ],
      },
      {
        i: Droplet,
        t: "Thyroid Exercise Program",
        for: "Hypothyroidism, post-treatment fatigue",
        dur: "8-10 weeks · 2-3 sessions/week",
        benefits: [
          "Fatigue-paced gentle conditioning",
          "Strength rebuild without overload",
          "Energy & sleep-quality coaching",
        ],
      },
    ],
  },
];
