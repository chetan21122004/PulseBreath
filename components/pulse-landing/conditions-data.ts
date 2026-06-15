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

export type Program = {
  i: typeof HeartPulse;
  slug: string;
  t: string;
  intro: string;
  for: string;
  dur: string;
  involves: string;
  expect: string;
  firstSession: string;
  safetyNotes: string[];
  benefits: string[];
};

export const programCategories = [
  {
    k: "01",
    cat: "Cardiac",
    tone: "rose" as const satisfies ProgramCategoryTone,
    layout: "quad" as const satisfies ProgramCategoryLayout,
    icon: HeartPulse,
    tag: "Heart Rehabilitation",
    desc: "Post-surgical and chronic cardiac recovery programs supervised by a cardiopulmonary specialist - restoring functional capacity, confidence and quality of life.",
    stat: { v: "120+", l: "Cardiac patients guided" },
    programs: [
      {
        i: HeartPulse,
        slug: "post-cabg-rehabilitation",
        t: "Post CABG (Bypass) Rehabilitation",
        intro:
          "Structured, sternal-precaution-safe recovery after bypass surgery - rebuilding endurance and daily function with live specialist supervision.",
        for: "Patients 2-12 weeks post bypass surgery",
        dur: "10-12 weeks · 3 sessions/week",
        involves:
          "Progressive aerobic conditioning with sternal-precaution protocols, inspiratory muscle training, and functional milestones for daily living.",
        expect:
          "Week-by-week loading within safe heart-rate zones, live supervision of every movement, and gradual return to stairs, driving, and household tasks.",
        firstSession:
          "Clinical review of your surgical clearance, sternal precautions, and current symptoms; baseline heart-rate and blood-pressure check; gentle mobility and breathing assessment; personalised week-one plan with clear stop rules.",
        safetyNotes: [
          "No pushing, pulling, or lifting >5 kg until sternal clearance",
          "Heart-rate zones set from your cardiologist's guidance",
          "Stop immediately for chest pain, dizziness, or unusual breathlessness",
          "Wound and sternal stability checked before each progression",
        ],
        benefits: [
          "Sternal-precaution-safe progressive loading",
          "Heart-rate-zone monitored aerobic conditioning",
          "Return-to-stairs, return-to-driving milestones",
        ],
      },
      {
        i: Activity,
        slug: "post-ptca-angioplasty",
        t: "Post PTCA / Angioplasty Rehab",
        intro:
          "Graded exercise and lifestyle coaching after stent placement - reducing re-event risk while restoring confidence in movement.",
        for: "Patients post-stent, post-PCI",
        dur: "8-10 weeks · 3 sessions/week",
        involves:
          "Symptom-limited graded exercise, cardiovascular risk-factor management, and lifestyle coaching to prevent re-events after stent placement.",
        expect:
          "Structured sessions building endurance safely, with heart-rate monitoring and progressive intensity as your cardiologist clears you.",
        firstSession:
          "Review of discharge instructions, medications, and groin/wrist access site healing; resting vitals; short walk test if cleared; education on symptom recognition and session pacing.",
        safetyNotes: [
          "Groin or wrist access site must be fully healed before higher exertion",
          "Exercise stays symptom-limited until cardiologist clearance",
          "Blood pressure monitored before and after activity",
          "Report any chest discomfort or palpitations immediately",
        ],
        benefits: [
          "Risk-factor reset (BP, lipids, HR variability)",
          "Symptom-limited graded exercise plan",
          "Lifestyle and stress-load coaching",
        ],
      },
      {
        i: Heart,
        slug: "heart-failure-management",
        t: "Heart Failure Management",
        intro:
          "Low-intensity, closely monitored conditioning for heart failure - building tolerance safely within NYHA guidelines.",
        for: "NYHA Class I-III, EF-reduced patients",
        dur: "12 weeks · 3 sessions/week",
        involves:
          "Low-intensity interval training, fluid and weight monitoring education, and breathlessness desensitisation within NYHA guidelines.",
        expect:
          "Gentle, closely monitored sessions that build tolerance without overload - with clear rules for when to rest and when to report symptoms.",
        firstSession:
          "Weight and symptom review, fluid-status education, resting vitals and SpO₂; gentle seated or supported standing activity; personalised exertion scale and daily self-monitoring checklist.",
        safetyNotes: [
          "Daily weight and fluid guidelines reinforced each session",
          "Low-intensity intervals only - no high-exertion spikes",
          "Stop rules for rapid weight gain or worsening breathlessness",
          "Coordination with your cardiologist for medication timing",
        ],
        benefits: [
          "Fluid-status & weight tracking guidance",
          "Low-intensity interval conditioning",
          "Breathlessness and fatigue desensitisation",
        ],
      },
      {
        i: Stethoscope,
        slug: "post-valve-replacement",
        t: "Post Valve Replacement",
        intro:
          "Anticoagulation-aware rehab after valve surgery - restoring endurance and breathing capacity at a pace matched to your recovery.",
        for: "Mechanical/tissue valve recovery",
        dur: "10-12 weeks · 3 sessions/week",
        involves:
          "Anticoagulation-aware exercise pacing, inspiratory muscle training, and endurance rebuild tailored to your valve type and surgical recovery stage.",
        expect:
          "Supervised progression from gentle mobility to sustained aerobic work, with attention to wound healing, posture, and energy conservation.",
        firstSession:
          "Surgical and anticoagulation history review; wound check; resting heart rate and rhythm observation; gentle mobility and inspiratory muscle assessment; valve-specific activity precautions explained.",
        safetyNotes: [
          "Anticoagulation timing respected - avoid trauma-risk activities",
          "Mechanical vs tissue valve protocols followed strictly",
          "INR or anticoagulant plan coordinated with your physician",
          "Stop for bleeding, unusual bruising, or new cardiac symptoms",
        ],
        benefits: [
          "Anticoagulation-aware exercise pacing",
          "Inspiratory muscle training (IMT)",
          "Endurance rebuild and posture restoration",
        ],
      },
    ] satisfies Program[],
  },
  {
    k: "02",
    cat: "Pulmonary",
    tone: "teal" as const satisfies ProgramCategoryTone,
    layout: "five" as const satisfies ProgramCategoryLayout,
    icon: Wind,
    tag: "Lung Rehabilitation",
    desc: "Condition-specific pulmonary rehab - separate, evidence-led pathways for obstructive, restrictive and post-surgical lung conditions.",
    stat: { v: "70+", l: "Pulmonary patients guided" },
    programs: [
      {
        i: Wind,
        slug: "copd-management",
        t: "COPD Management Program",
        intro:
          "Evidence-led COPD rehab - breathing retraining, airway clearance, and paced exercise to reduce flare-ups and rebuild walking tolerance.",
        for: "GOLD A-D, frequent exacerbators",
        dur: "8-12 weeks · 3 sessions/week",
        involves:
          "Pursed-lip and diaphragmatic breathing retraining, airway clearance, energy conservation, and exacerbation early-warning education.",
        expect:
          "Sessions paced to your breathlessness scale, with techniques you can use daily to reduce flare-ups and rebuild walking tolerance.",
        firstSession:
          "COPD history and inhaler technique review; resting SpO₂ and breathlessness scale; pursed-lip breathing practice; short paced walk or cycle at comfortable intensity; flare-up action plan discussed.",
        safetyNotes: [
          "SpO₂ monitored - supplemental oxygen used as prescribed",
          "Exacerbation warning signs reviewed every session",
          "Paced activity within your breathlessness comfort zone",
          "Inhaler technique corrected before exercise progression",
        ],
        benefits: [
          "Pursed-lip & diaphragmatic breathing retraining",
          "Exacerbation early-warning protocol",
          "Energy conservation for daily activities",
        ],
      },
      {
        i: Wind,
        slug: "asthma-rehabilitation",
        t: "Asthma Rehabilitation",
        intro:
          "Trigger-aware conditioning for asthma - rebuilding aerobic capacity without provoking flares, with breath-control you can use daily.",
        for: "Children and adults diagnosed with varied ranges and patterns of asthma",
        dur: "6-8 weeks · 2-3 sessions/week",
        involves:
          "Trigger mapping, breath-control training, aerobic capacity rebuild, and inhaler-technique review to reduce reliance on rescue medication.",
        expect:
          "Gradual conditioning without triggering flares, with breathing strategies you can apply during daily activity and mild symptoms.",
        firstSession:
          "Trigger and medication history; peak flow or symptom baseline if applicable; inhaler technique audit; gentle warm-up with breath-control coaching; personalised flare prevention plan.",
        safetyNotes: [
          "Rescue inhaler accessible throughout every session",
          "Exercise intensity adjusted to prevent bronchospasm",
          "Stop and treat if wheeze or tightness escalates",
          "Cold-air and allergen triggers factored into session design",
        ],
        benefits: [
          "Trigger-mapping and breath-control training",
          "Aerobic capacity rebuild without flares",
          "Inhaler-technique audit & correction",
        ],
      },
      {
        i: Wind,
        slug: "bronchiectasis-rehabilitation",
        t: "Bronchiectasis Rehabilitation",
        intro:
          "Airway clearance and endurance training for bronchiectasis - reducing infections and fatigue through supervised daily routines.",
        for: "Chronic productive cough, recurrent infections",
        dur: "8-10 weeks · 3 sessions/week",
        involves:
          "Airway clearance technique coaching, postural drainage routines, and endurance plus inspiratory muscle training.",
        expect:
          "Daily clearance routines supervised until confident, combined with progressive exercise to reduce infection frequency and fatigue.",
        firstSession:
          "Sputum pattern and infection history review; airway clearance technique demonstration; postural drainage positioning; gentle endurance baseline; home clearance schedule established.",
        safetyNotes: [
          "Clearance performed before exercise when productive",
          "Infection or fever - session modified or deferred",
          "Hydration and technique emphasised to avoid airway trauma",
          "SpO₂ monitored during exertion",
        ],
        benefits: [
          "Airway clearance technique (ACT) coaching",
          "Postural drainage routines",
          "Endurance + inspiratory muscle training",
        ],
      },
      {
        i: Wind,
        slug: "ild-rehabilitation",
        t: "ILD (Interstitial Lung Disease)",
        intro:
          "SpO₂-paced rehab for restrictive lung disease - building function within oxygen limits while managing breathlessness realistically.",
        for: "IPF, sarcoid, post-COVID fibrosis",
        dur: "12 weeks · 2-3 sessions/week",
        involves:
          "SpO₂-paced low-intensity training, oxygen-titration guidance, dyspnoea management, and psychological support for restrictive lung disease.",
        expect:
          "Carefully monitored sessions within your oxygen limits, building functional capacity while managing breathlessness and fatigue realistically.",
        firstSession:
          "ILD diagnosis and oxygen prescription review; resting and exertional SpO₂; low-intensity interval trial; dyspnoea coping strategies; realistic goal-setting for functional gains.",
        safetyNotes: [
          "Strict SpO₂ targets - oxygen titrated as prescribed",
          "Low intensity only; no high-exertion intervals",
          "Pulmonary hypertension symptoms screened each visit",
          "Fatigue and desaturation stop rules enforced",
        ],
        benefits: [
          "SpO₂-paced low-intensity training",
          "Oxygen-titration guidance",
          "Dyspnoea management & psychological support",
        ],
      },
      {
        i: Stethoscope,
        slug: "post-lobectomy-rehabilitation",
        t: "Post Lobectomy Rehabilitation",
        intro:
          "Post-thoracic surgery recovery - chest mobility, lung re-expansion, and graded return to daily capacity with scar-aware care.",
        for: "Post-thoracic surgery recovery",
        dur: "10 weeks · 3 sessions/week",
        involves:
          "Chest-wall mobility and scar management, lung re-expansion techniques, and graded return to functional capacity after thoracic surgery.",
        expect:
          "Progressive mobility and breathing work from early post-op stages, with scar care and shoulder range-of-motion integrated into rehab.",
        firstSession:
          "Surgical clearance and pain level review; scar and shoulder range-of-motion assessment; deep breathing and lung expansion techniques; gentle walking per surgeon guidelines.",
        safetyNotes: [
          "Surgeon clearance required before arm overhead or heavy loading",
          "Pain-guided progression - no pushing through sharp pain",
          "Incision and drain sites monitored visually each session",
          "Breathlessness and SpO₂ tracked during exertion",
        ],
        benefits: [
          "Chest-wall mobility & scar management",
          "Lung re-expansion techniques",
          "Graded return to functional capacity",
        ],
      },
      {
        i: HeartPulse,
        slug: "pulmonary-hypertension-rehabilitation",
        t: "Pulmonary Hypertension Rehabilitation",
        intro:
          "Conservative, monitored conditioning for pulmonary hypertension - building movement confidence without provoking symptoms.",
        for: "Patients with pulmonary hypertension needing monitored conditioning",
        dur: "8-12 weeks · 2-3 sessions/week",
        involves:
          "Heart-rate and SpO₂ guided activity pacing, breathlessness-safe strength work, and symptom monitoring for safer daily movement.",
        expect:
          "Conservative, closely supervised sessions with strict pacing rules - building confidence in movement without provoking symptoms.",
        firstSession:
          "PH medication and symptom baseline; resting vitals and SpO₂; very low-intensity activity trial with continuous monitoring; symptom diary and strict stop rules established.",
        safetyNotes: [
          "Heart rate and SpO₂ monitored throughout",
          "No Valsalva or heavy straining exercises",
          "Presyncope or severe breathlessness - immediate stop",
          "Coordination with PH specialist for activity clearance",
        ],
        benefits: [
          "Heart-rate and SpO2 guided activity pacing",
          "Breathlessness-safe strength and endurance work",
          "Symptom monitoring for safer daily movement",
        ],
      },
      {
        i: Stethoscope,
        slug: "occupational-lung-disease-rehabilitation",
        t: "Occupational Lung Disease Rehabilitation",
        intro:
          "Practical rehab for work-related lung conditions - breathing strategies and paced conditioning for daily and occupational demands.",
        for: "Work-related lung conditions and reduced breathing capacity",
        dur: "8-12 weeks · 2-3 sessions/week",
        involves:
          "Condition-specific breathing strategies, functional capacity rebuilding, and education for pacing, triggers, and flare prevention.",
        expect:
          "Practical sessions focused on returning to daily and work-related demands safely, with breathing techniques for exertion.",
        firstSession:
          "Occupational exposure and diagnosis review; functional capacity baseline; breathing strategies for exertion; trigger avoidance education; realistic return-to-activity goals.",
        safetyNotes: [
          "Ongoing exposure triggers identified and avoided",
          "SpO₂ and breathlessness monitored during tasks",
          "Pacing rules for work-simulation activities",
          "Flare-up plan aligned with your respiratory physician",
        ],
        benefits: [
          "Condition-specific breathing and airway strategies",
          "Functional capacity rebuilding for daily demands",
          "Education for pacing, triggers, and flare prevention",
        ],
      },
    ] satisfies Program[],
  },
  {
    k: "03",
    cat: "Metabolic",
    tone: "burgundy" as const satisfies ProgramCategoryTone,
    layout: "trio" as const satisfies ProgramCategoryLayout,
    icon: Droplet,
    tag: "Lifestyle & Metabolic",
    desc: "Medically supervised exercise programs for metabolic and lifestyle conditions - measured by labs, not the mirror.",
    stat: { v: "50+", l: "Metabolic patients guided" },
    programs: [
      {
        i: Droplet,
        slug: "diabetes-exercise-program",
        t: "Diabetes Exercise Program",
        intro:
          "Glucose-aware exercise dosing for diabetes - resistance and aerobic work timed to stabilise sugars, not spike them.",
        for: "Type 2 diabetes, pre-diabetes",
        dur: "12 weeks · 3 sessions/week",
        involves:
          "Glucose-response-aware exercise dosing, resistance and aerobic blend, and foot-care precautions for neuropathy.",
        expect:
          "Sessions timed and paced to minimise glucose spikes, with progressive loading tracked against your HbA1c and daily energy levels.",
        firstSession:
          "Medication and glucose pattern review; foot inspection for neuropathy; pre-session glucose if indicated; gentle mixed aerobic and resistance intro; hypo/hyperglycaemia action plan.",
        safetyNotes: [
          "Glucose checked when clinically indicated before exertion",
          "Footwear and foot inspection before weight-bearing work",
          "Hypoglycaemia kit and snacks available for insulin users",
          "Exercise modified for retinopathy or autonomic neuropathy",
        ],
        benefits: [
          "Glucose-response-aware exercise dosing",
          "Resistance + aerobic blend for HbA1c reduction",
          "Foot-care and neuropathy precautions",
        ],
      },
      {
        i: Activity,
        slug: "obesity-management",
        t: "Obesity Management",
        intro:
          "Joint-safe, sustainable conditioning for obesity with comorbidities - capacity and metabolic markers over crash dieting.",
        for: "BMI 30+ with comorbidities",
        dur: "16 weeks · 3 sessions/week",
        involves:
          "Joint-safe progressive conditioning, behavioural pacing, habit anchors, and body-composition tracking beyond weight alone.",
        expect:
          "Sustainable, non-punishing exercise progression with live supervision - focused on capacity, mobility, and metabolic markers.",
        firstSession:
          "Comorbidity and joint history review; baseline mobility and pain assessment; low-impact aerobic introduction; habit anchor goal; body-composition tracking explained.",
        safetyNotes: [
          "Low-impact options for knee, hip, and back pain",
          "Blood pressure monitored before and after sessions",
          "No punitive high-intensity loading in early weeks",
          "Sleep apnoea and cardiac symptoms screened",
        ],
        benefits: [
          "Joint-safe progressive conditioning",
          "Behavioural pacing & habit anchors",
          "Body-composition (not just weight) tracking",
        ],
      },
      {
        i: Droplet,
        slug: "thyroid-exercise-program",
        t: "Thyroid Exercise Program",
        intro:
          "Fatigue-paced rehab for hypothyroidism - rebuilding strength and energy without the crash of unsupervised overexertion.",
        for: "Hypothyroidism, post-treatment fatigue",
        dur: "8-10 weeks · 2-3 sessions/week",
        involves:
          "Fatigue-paced gentle conditioning, strength rebuild without overload, and energy and sleep-quality coaching.",
        expect:
          "Sessions adapted to your energy on each day - building strength gradually without the crash that unsupervised exercise can cause.",
        firstSession:
          "Thyroid medication and fatigue pattern review; energy and sleep baseline; gentle strength and mobility assessment; daily pacing rules; session intensity scaled to today's energy.",
        safetyNotes: [
          "Intensity adjusted daily based on fatigue level",
          "Avoid overtraining - recovery days built into plan",
          "Heart rate monitored for autonomic effects",
          "Coordination with endocrinologist if symptoms change",
        ],
        benefits: [
          "Fatigue-paced gentle conditioning",
          "Strength rebuild without overload",
          "Energy & sleep-quality coaching",
        ],
      },
    ] satisfies Program[],
  },
];
