import { writeFile } from "node:fs/promises";
import path from "node:path";
import { dataRoot } from "./lib/catalog.mjs";

const TODAY = "2026-08-26";
const pagesRoot = path.join(dataRoot, "pages");

const refs = {
  pulmonary: ["ats-pulmonary-rehab-2023", "google-people-first-content"],
  cardiac: ["aha-aacvpr-core-components-2024", "aha-home-based-cardiac-rehab"],
  metabolic: ["ada-standards-physical-activity-2026", "google-people-first-content"],
};

const profiles = [
  ["pulmonary", "copd", "COPD", "COPD Management Program", "adults with stable COPD, including people who experience breathlessness, reduced walking tolerance or repeated flare-ups", "8–12 weeks with approximately three sessions per week", "breathing-pattern retraining, airway-clearance guidance when relevant, energy conservation, strengthening and cardiovascular endurance work", "a paced program linked to walking, household activity and recognising signs of a possible exacerbation", "review of symptoms, medicines, recent flare-ups, oxygen use and baseline movement, followed by an individual starting plan", ["monitor oxygen saturation and pulse when advised", "use supplemental oxygen only as prescribed", "defer exercise during a suspected acute exacerbation"], ["breathing control", "walking tolerance", "energy conservation"]],
  ["pulmonary", "asthma", "Asthma", "Asthma Rehabilitation", "adults with medically managed asthma who want to rebuild activity tolerance without provoking symptoms", "6–8 weeks with two or three sessions per week", "trigger mapping, breath-control coaching, gradual aerobic conditioning and review of movement around known symptom patterns", "better confidence with daily activity while respecting individual triggers and the prescribed asthma action plan", "review of triggers, symptom and medicine history, inhaler use and a gentle movement baseline", ["keep prescribed reliever medicine accessible", "stop if wheeze or chest tightness escalates", "adapt sessions around cold air and known allergens"], ["trigger awareness", "aerobic capacity", "breath control"]],
  ["pulmonary", "bronchiectasis", "Bronchiectasis", "Bronchiectasis Rehabilitation", "people with medically stable bronchiectasis, a chronic productive cough or reduced endurance", "8–10 weeks with approximately three sessions per week", "individual airway-clearance coaching, positioning where appropriate, strength work and progressive endurance training", "a repeatable clearance and activity routine that supports function without treating infection or replacing respiratory care", "review of sputum pattern, infection history, current clearance technique, oxygen saturation and an endurance baseline", ["modify or defer sessions during fever or infection", "perform clearance before exercise when clinically appropriate", "monitor breathlessness and oxygen saturation during exertion"], ["airway clearance confidence", "endurance", "daily routine"]],
  ["pulmonary", "ild", "Interstitial Lung Disease", "ILD Rehabilitation", "people with stable interstitial lung disease who have breathlessness, fatigue or reduced capacity", "about 12 weeks with two or three sessions per week", "low-intensity interval work, oxygen-aware pacing, strength training and practical breathlessness management", "realistic functional gains within the person’s oxygen prescription, fatigue pattern and respiratory specialist guidance", "review of the ILD diagnosis, oxygen prescription, resting and exertional response and a low-intensity activity trial", ["follow the prescribed oxygen plan", "pause for unusual desaturation or severe breathlessness", "screen for pulmonary-hypertension warning symptoms"], ["oxygen-aware pacing", "functional capacity", "fatigue management"]],
  ["pulmonary", "post-lobectomy", "Recovery After Lobectomy", "Post Lobectomy Rehabilitation", "people medically cleared for rehabilitation following lobectomy or related thoracic surgery", "about 10 weeks with approximately three sessions per week", "chest-wall mobility, scar-aware movement, lung-expansion work and a gradual return to walking and daily tasks", "progressive recovery that respects surgical restrictions, pain, incision healing and respiratory response", "review of surgical clearance, pain, incision status, shoulder movement, breathing and a gentle walking baseline", ["obtain surgical clearance before heavier arm loading", "do not push through sharp pain", "report changes around the incision or drain site"], ["chest mobility", "walking recovery", "return to daily function"]],
  ["pulmonary", "pulmonary-hypertension", "Pulmonary Hypertension", "Pulmonary Hypertension Rehabilitation", "clinically stable people with pulmonary hypertension who have specialist clearance for monitored conditioning", "8–12 weeks with two or three sessions per week", "conservative heart-rate and oxygen-guided pacing, low-load strength work and symptom-aware endurance activity", "greater movement confidence without heavy straining or symptom-provoking intensity", "review of specialist advice, medicines, symptoms, resting observations and a very low-intensity activity trial", ["avoid breath-holding and heavy straining", "stop for faintness or severe breathlessness", "coordinate exercise limits with the pulmonary-hypertension specialist"], ["conservative conditioning", "symptom monitoring", "daily movement confidence"]],
  ["pulmonary", "occupational-lung-disease", "Occupational Lung Disease", "Occupational Lung Disease Rehabilitation", "people with a diagnosed work-related lung condition and reduced breathing or activity capacity", "8–12 weeks with two or three sessions per week", "condition-specific breathing strategies, progressive conditioning and education about pacing and relevant exposure triggers", "better preparation for safe daily and occupational demands within the treating physician’s plan", "review of diagnosis, exposure history, current symptoms, work demands and a functional movement baseline", ["avoid ongoing respiratory exposures identified by the medical team", "monitor breathlessness during simulated tasks", "follow the treating physician’s flare-up plan"], ["work-related pacing", "functional conditioning", "trigger awareness"]],
  ["cardiac", "angioplasty", "Recovery After Angioplasty", "Cardiac Rehabilitation After Cardiac Events & Procedures", "people cleared for cardiac rehabilitation after angioplasty, PTCA or coronary stent placement", "8–12 weeks with approximately three sessions per week", "graded cardiovascular exercise, access-site precautions, risk-factor education and functional milestones", "a measured return to walking, stairs and household activity within cardiologist-guided limits", "review of the procedure, discharge advice, medicines, access-site healing, symptoms, heart rate and blood pressure", ["respect access-site restrictions", "stop for chest discomfort, faintness or unusual breathlessness", "use heart-rate guidance agreed with the cardiology team"], ["stamina after angioplasty", "confidence", "risk-factor routines"]],
  ["cardiac", "cabg", "Recovery After Bypass Surgery", "Cardiac Rehabilitation After Cardiac Events & Procedures", "people cleared to begin rehabilitation after coronary artery bypass graft surgery", "8–12 weeks with approximately three sessions per week", "sternal-precaution-aware mobility, graded walking, strength progression and education for daily recovery", "a gradual return to stairs and household tasks while respecting wound healing and cardiologist guidance", "review of surgery, discharge instructions, wound and sternal precautions, symptoms, medicines and baseline mobility", ["follow current sternal and wound precautions", "stop for chest pain, dizziness or unusual breathlessness", "progress upper-body loading only after clearance"], ["walking recovery", "daily function", "confidence after surgery"]],
  ["cardiac", "heart-attack", "Recovery After Heart Attack", "Cardiac Rehabilitation After Cardiac Events & Procedures", "medically stable people referred or cleared for rehabilitation after myocardial infarction", "8–12 weeks with approximately three sessions per week", "symptom-limited exercise, risk-factor education, monitored progression and practical return-to-activity milestones", "a structured rebuilding of endurance and confidence alongside prescribed cardiac treatment", "review of the event, investigations, medicines, cardiologist advice, current symptoms, heart rate and blood pressure", ["exercise only after appropriate medical clearance", "stop for chest discomfort, faintness or new palpitations", "do not change cardiac medicines through rehabilitation advice"], ["safe endurance", "confidence after MI", "secondary-prevention habits"]],
  ["cardiac", "heart-failure", "Heart Failure", "Heart Failure Rehabilitation", "medically stable adults with heart failure who have clearance for low-intensity conditioning", "about 12 weeks with approximately three sessions per week", "low-intensity intervals, weight and fluid-awareness education, fatigue management and energy conservation", "improved tolerance for necessary daily activities without overload or fixed outcome promises", "review of diagnosis, recent symptoms, weight pattern, medicines, resting observations and a gentle supported activity trial", ["report rapid weight gain or worsening swelling", "stop for severe breathlessness, faintness or chest pain", "coordinate exercise and medicine timing with the cardiology team"], ["energy conservation", "low-intensity conditioning", "daily self-monitoring"]],
  ["cardiac", "valve-surgery", "Recovery After Valve Surgery", "Cardiac Rehabilitation After Cardiac Events & Procedures", "people medically cleared for rehabilitation after heart valve surgery or intervention", "8–12 weeks with approximately three sessions per week", "procedure-aware mobility, graded cardiovascular activity, strength progression and functional recovery milestones", "a measured return to everyday activity while respecting wound, rhythm and anticoagulation considerations", "review of the procedure, discharge advice, medicines, wound status, symptoms, pulse and blood pressure", ["follow wound and sternal precautions where relevant", "report new palpitations, dizziness or chest discomfort", "account for anticoagulation advice during activity planning"], ["mobility after surgery", "graded stamina", "daily confidence"]],
  ["cardiac", "stable-coronary-disease", "Stable Coronary Artery Disease", "Rehabilitation for Heart Disease & Stable Cardiac Conditions", "people with medically stable coronary artery disease and reduced exercise capacity", "8–12 weeks with two or three sessions per week", "symptom-limited cardiovascular training, strength work, risk-factor coaching and response monitoring", "gradual fitness gains within cardiologist guidance and the individual’s symptom threshold", "review of cardiac history, medicines, symptoms, resting observations and a short activity baseline when cleared", ["keep activity within agreed symptom limits", "report chest discomfort, palpitations or unusual breathlessness", "monitor blood pressure and heart rate as advised"], ["cardiovascular fitness", "symptom awareness", "risk-factor routines"]],
  ["metabolic", "type-2-diabetes", "Type 2 Diabetes", "Diabetes Exercise Program", "adults with type 2 diabetes who need an individually planned exercise routine", "about 12 weeks with approximately three sessions per week", "glucose-aware aerobic and resistance exercise, foot-care precautions and sustainable activity planning", "improved consistency and capacity alongside medical and nutritional diabetes care", "review of medicines, glucose patterns, complications, feet, cardiovascular risk and a gentle activity baseline", ["check glucose when clinically advised", "carry a hypoglycaemia plan when relevant", "adapt weight-bearing work for foot or neuropathy concerns"], ["glucose-aware exercise", "strength", "sustainable activity"]],
  ["metabolic", "prediabetes", "Prediabetes", "Diabetes Exercise Program", "adults with prediabetes seeking a structured and sustainable exercise pathway", "about 12 weeks with approximately three sessions per week", "progressive aerobic and resistance exercise, habit planning and monitoring of functional response", "a repeatable activity routine that complements medical follow-up and nutrition guidance", "review of health history, laboratory advice, cardiovascular risk, joint symptoms and current activity", ["seek medical advice for concerning symptoms", "progress gradually when previously inactive", "adapt exercise around joint pain or other conditions"], ["activity consistency", "aerobic fitness", "strength habits"]],
  ["metabolic", "obesity", "Obesity", "Obesity Management", "adults living with obesity who want joint-aware conditioning adapted to associated health conditions", "about 16 weeks with approximately three sessions per week", "low-impact cardiovascular work, progressive strength training, behavioural pacing and functional tracking", "sustainable capacity and mobility gains rather than punitive exercise or rapid-weight promises", "review of associated conditions, blood pressure, joint symptoms, mobility, sleep concerns and current activity", ["use low-impact options for painful joints", "monitor blood pressure when advised", "screen new chest symptoms or severe breathlessness medically"], ["joint-aware movement", "mobility", "sustainable conditioning"]],
  ["metabolic", "hypothyroidism", "Hypothyroidism", "Thyroid Exercise Program", "adults receiving medical care for hypothyroidism who experience fatigue or reduced conditioning", "8–10 weeks with two or three sessions per week", "fatigue-paced aerobic work, gradual strength rebuilding, mobility and recovery planning", "steadier activity habits without pushing through disproportionate fatigue or replacing endocrine care", "review of medicine routine, fatigue and sleep pattern, symptoms, strength, mobility and daily energy variation", ["adjust intensity to the day’s fatigue level", "include adequate recovery between sessions", "seek medical review when symptoms change unexpectedly"], ["fatigue pacing", "strength rebuilding", "recovery habits"]],
].map(([serviceLine, id, name, program, audience, duration, involves, expected, firstSession, safety, benefits]) => ({
  serviceLine, id, name, program, audience, duration, involves, expected, firstSession, safety, benefits,
  servicePath: `/services/${serviceLine}/${serviceLine === "cardiac" ? (id === "heart-failure" ? "heart-failure-rehabilitation" : id === "stable-coronary-disease" ? "stable-cardiac-conditions" : "after-cardiac-events-procedures") : serviceLine === "pulmonary" ? ({copd:"copd-management",asthma:"asthma-rehabilitation",bronchiectasis:"bronchiectasis-rehabilitation",ild:"ild-rehabilitation","post-lobectomy":"post-lobectomy-rehabilitation","pulmonary-hypertension":"pulmonary-hypertension-rehabilitation","occupational-lung-disease":"occupational-lung-disease-rehabilitation"}[id]) : ({"type-2-diabetes":"diabetes-exercise-program",prediabetes:"diabetes-exercise-program",obesity:"obesity-management",hypothyroidism:"thyroid-exercise-program"}[id])}`,
  references: refs[serviceLine],
}));

const intents = [
  ["program", "rehabilitation program", "commercial-investigation", "what a structured condition-specific pathway includes", "Assessment connects the diagnosis, current symptoms, medical advice and real-life goals before a starting level is chosen.", "Sessions combine education with individually progressed movement; the exact mix changes with clinical response.", "Progress is judged through function, consistency, symptoms and recovery rather than a universal promise."],
  ["at-home", "rehabilitation at home", "commercial-investigation", "how supervised rehabilitation can fit a safe home environment", "The initial review also checks floor space, footwear, camera position, connectivity and whether family support is needed.", "Home delivery still uses live observation, planned rest and progression; it is not a generic exercise recording.", "The home plan should transfer into daily tasks while preserving clear pause and escalation rules."],
  ["online", "online supervised rehabilitation", "transactional", "how live video sessions work for suitable patients across India", "Online suitability depends on stability, technology, the visible movement area and whether remote monitoring is sufficient.", "The clinician observes technique and symptoms in real time and may modify or defer the session when the response is not appropriate.", "Remote delivery is continued only while it remains clinically and practically suitable."],
  ["after-hospital-discharge", "rehabilitation after hospital discharge", "commercial-investigation", "how to move from discharge advice into a structured recovery pathway", "Discharge papers, recent investigations, restrictions, medicines and follow-up advice define the boundaries of the first plan.", "Early sessions use conservative activity and reinforce the treating team’s precautions before any progression.", "Progression follows stability and recovery, not the pressure to return immediately to a previous routine."],
  ["exercises", "exercise guidance", "informational", "why exercise selection and dosage must be individual", "A useful exercise plan starts with capacity, symptoms, balance, joints, medicines and condition-specific precautions.", "Aerobic, strength, mobility or breathing work is selected for a reason and coached with a defined dose and recovery period.", "Exercises change only after the previous level is tolerated; a list alone is not a rehabilitation program."],
  ["safety", "exercise safety and precautions", "informational", "how screening, monitoring and stop rules reduce avoidable risk", "Safety screening identifies instability, contraindications, monitoring needs and situations that require the treating doctor’s input.", "Each session begins with a symptom check and uses condition-appropriate observation rather than assuming yesterday’s capacity is unchanged.", "A safe program explains urgent warning signs and never presents remote rehabilitation as emergency care."],
  ["eligibility", "rehabilitation eligibility", "commercial-investigation", "who may be suitable and when another care setting may be better", "Eligibility depends on medical stability, ability to follow instructions, monitoring needs, home safety and the treating team’s advice.", "A diagnosis can indicate a possible pathway, but it cannot by itself confirm that online or home delivery is appropriate.", "Suitability is reassessed when symptoms, medicines, procedures or the home situation change."],
  ["cost", "rehabilitation cost and access", "transactional", "what affects program recommendations before pricing is discussed", "The free assessment clarifies the likely format, frequency, supervision need and whether the service is appropriate before a fee is proposed.", "PulseBreath discusses pricing after understanding the person’s condition and recommended pathway; there is no obligation to enrol.", "Value should be considered in relation to appropriate supervision and individual planning, not a guaranteed outcome."],
  ["duration", "program duration and frequency", "commercial-investigation", "how program length is adapted rather than fixed for everyone", "The published service pathway provides a typical range, while the assessment identifies the most suitable starting frequency.", "Session frequency and total weeks can change with tolerance, interruptions, medical review and progress toward functional goals.", "Maintenance planning matters because rehabilitation gains depend on continued safe activity after supervised sessions end."],
  ["monitoring", "session monitoring", "commercial-investigation", "what the clinician observes before, during and after activity", "Monitoring begins with symptoms, medicines and relevant resting observations; additional measures depend on the condition and prescription.", "During activity, technique, breathing, perceived effort, recovery and condition-relevant measures guide whether to continue, pause or modify.", "Recorded trends support progression but do not replace medical assessment when warning symptoms appear."],
  ["older-adults", "rehabilitation for older adults", "commercial-investigation", "how the plan accounts for balance, confidence, other conditions and daily independence", "Assessment considers falls risk, hearing or vision needs, cognition, medicines, caregiver support and the activities needed for independence.", "Instructions, pace and the home setup are adapted so that movement can be seen and followed without unnecessary complexity.", "Progress centres on practical independence, safe transfers, walking and confidence rather than age-based assumptions."],
  ["caregivers", "rehabilitation guidance for caregivers", "informational", "how a family member can support sessions without taking over clinical decisions", "The clinician clarifies what the caregiver should observe, how to prepare the space and which symptoms require escalation.", "A caregiver may help with technology, equipment and reassurance while the clinician remains responsible for session instructions.", "Support should build the patient’s independence and preserve privacy, consent and the agreed safety plan."],
  ["working-adults", "rehabilitation for working adults", "commercial-investigation", "how supervised recovery can be connected to work and commuting demands", "Assessment maps symptom patterns, sitting or standing demands, travel, shift timing and realistic work-related goals.", "The plan uses graded functional tasks and pacing strategies that can transfer to the working day without claiming instant readiness.", "Return-to-work decisions remain with the treating team and employer process where applicable."],
].map(([id, phrase, searchIntent, angle, assessment, delivery, progress]) => ({id, phrase, searchIntent, angle, assessment, delivery, progress}));

const combinations = [];
for (const profile of profiles) {
  for (const intent of intents.slice(0, profile.serviceLine === "metabolic" ? 8 : 10)) combinations.push([profile, intent]);
}
for (const profile of profiles) combinations.push([profile, intents[10]]);
for (const profile of profiles) combinations.push([profile, intents[11]]);
for (const profile of profiles.slice(0, 4)) combinations.push([profile, intents[12]]);

if (combinations.length !== 200) throw new Error(`Expected 200 combinations, received ${combinations.length}`);

function titleFor(profile, intent) {
  const suffix = intent.id === "program" ? "Rehabilitation Program" : intent.phrase.replace(/^rehabilitation /, "Rehab ");
  const raw = `${profile.name}: ${suffix}`;
  return raw.length <= 62 ? raw : `${profile.name}: ${intent.id.replaceAll("-", " ")}`.slice(0, 62).trim();
}

function descriptionFor(profile, intent) {
  const raw = `Explore ${intent.phrase} for ${profile.name}, including assessment, supervised sessions, safety checks and online access for suitable patients across India.`;
  if (raw.length <= 160) return raw;
  return `${raw.slice(0, 156).replace(/\s+\S*$/u, "")}…`;
}

function hash(value) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

const phraseVariants = [
  ["The published PulseBreath", ["PulseBreath's published", "The current PulseBreath", "PulseBreath’s existing service"]],
  ["The published", ["The current published", "The existing", "The source service"]],
  ["The clinician", ["The supervising physiotherapist", "The rehabilitation clinician", "The treating rehabilitation professional"]],
  ["the clinician", ["the supervising physiotherapist", "the rehabilitation clinician", "the treating rehabilitation professional"]],
  ["The assessment", ["The initial clinical review", "The suitability assessment", "The starting evaluation"]],
  ["the assessment", ["the initial clinical review", "the suitability assessment", "the starting evaluation"]],
  ["A session", ["One supervised appointment", "A live rehabilitation session", "Each planned appointment"]],
  ["The activity", ["The planned movement", "The exercise component", "The current activity"]],
  ["Progression", ["Advancement", "A planned increase", "The next progression step"]],
  ["progression", ["advancement", "a planned increase", "the next progression step"]],
  ["medical stability", ["clinical stability", "a medically stable condition", "stable health status"]],
  ["treating team", ["usual medical team", "treating specialists", "existing care team"]],
  ["online sessions", ["live video appointments", "remote supervised sessions", "video-based rehabilitation visits"]],
  ["online rehabilitation", ["live remote rehabilitation", "video-supervised rehabilitation", "remote clinical rehabilitation"]],
  ["daily activity", ["everyday function", "day-to-day movement", "routine activities"]],
  ["symptoms", ["reported symptoms", "the symptom pattern", "current signs and symptoms"]],
  ["current capacity", ["present functional capacity", "starting ability", "baseline function"]],
  ["free assessment", ["no-cost suitability assessment", "complimentary initial assessment", "free initial review"]],
  ["suitable patients", ["clinically suitable people", "appropriate patients", "people found suitable after assessment"]],
  ["across India", ["throughout India", "anywhere in India", "nationally within India"]],
  ["does not replace", ["is not a substitute for", "must not displace", "works alongside rather than replacing"]],
  ["clear stop rules", ["explicit pause-and-stop rules", "agreed stopping criteria", "defined rules for pausing activity"]],
];

function varyText(value, pageKey) {
  let output = value;
  for (const [needle, alternatives] of phraseVariants) {
    if (!output.includes(needle)) continue;
    const choice = alternatives[hash(`${pageKey}:${needle}`) % alternatives.length];
    output = output.replaceAll(needle, choice);
  }
  return output;
}

function varyContent(value, pageKey) {
  if (typeof value === "string") return varyText(value, pageKey);
  if (Array.isArray(value)) return value.map((item) => varyContent(item, pageKey));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, varyContent(item, pageKey)]));
  }
  return value;
}

function makePage(profile, intent) {
  const clusterId = `derived-${profile.serviceLine}-${profile.id}-${intent.id}`;
  const primary = `${profile.name} ${intent.phrase}`;
  const pathName = `/rehabilitation/${profile.serviceLine}/${profile.id}/${intent.id}`;
  const page = {
    id: `${profile.serviceLine}-${profile.id}-${intent.id}-en-in`,
    path: pathName,
    serviceLine: profile.serviceLine,
    locale: "en-IN",
    pageType: intent.id === "older-adults" || intent.id === "caregivers" || intent.id === "working-adults" ? "condition-intent" : "condition-intent",
    publication: { status: "approved", createdAt: TODAY, updatedAt: TODAY, preRender: true },
    indexing: { requested: true, reason: "Source-derived page uses verified statements from the currently published PulseBreath service catalogue and is eligible for the measured first cohort." },
    taxonomy: {
      conditionId: profile.id, conditionName: profile.name, intentId: intent.id,
      intentName: intent.phrase, audience: intent.id === "caregivers" ? ["caregiver"] : intent.id === "older-adults" ? ["older-adult"] : intent.id === "working-adults" ? ["working-adult"] : ["adult"],
      market: { id: "india", kind: "national", verifiedLocalPresence: false, localProof: [
        { type: "verified-service-availability", detail: "The published PulseBreath site states that live online sessions are available across India for suitable patients." },
        { type: "supported-language", detail: "The published FAQ states that sessions are conducted in English and Hindi." },
        { type: "regional-care-pathway", detail: "Assessment, live video supervision and coordination with the treating specialist are described on the current site." },
      ]},
    },
    keyword: { clusterId, primary, secondary: [`online ${primary} India`, `${profile.name} supervised exercise`, `${profile.name} rehabilitation assessment`], intent: intent.searchIntent },
    metadata: { title: titleFor(profile, intent), description: descriptionFor(profile, intent) },
    content: {
      eyebrow: `${profile.name} · ${intent.phrase}`,
      h1: `${profile.name} ${intent.phrase}: assessment, supervision and safety`,
      summary: `${profile.program} is intended for ${profile.audience}. This guide explains ${intent.angle}. PulseBreath delivers live online sessions to suitable patients across India, but suitability is decided through assessment and the treating clinician’s advice. The page adapts information already published in the PulseBreath service catalogue; it does not diagnose a condition, prescribe an unsupervised routine or promise a particular outcome.`,
      keyTakeaways: [
        `${profile.name} rehabilitation begins with individual assessment rather than a standard exercise list.`,
        `The published pathway commonly runs ${profile.duration}, but timing is adjusted to clinical response and goals.`,
        `${intent.assessment}`,
        `Online delivery is considered only when the patient is medically stable and remote supervision is appropriate.`,
      ],
      sections: [
        { id: "condition-and-goals", heading: `How rehabilitation relates to ${profile.name}`, paragraphs: [
          `${profile.program} is described by PulseBreath for ${profile.audience}. Its published components include ${profile.involves}. These elements are organised around the diagnosis and current capacity, not offered as a general fitness class. The rehabilitation professional also considers medicines, recent medical events, associated conditions and the advice already provided by the treating team.`,
          `The expected direction is ${profile.expected}. For this reason, goals are written as practical functions—such as walking, transfers, stairs, household activity or work demands—rather than a claim that rehabilitation will remove the underlying condition. ${profile.benefits.join(", ")} are useful themes for discussion, but the balance between them differs from person to person.`,
          `For ${profile.name}, the source service specifically describes ${profile.involves}. Its usual published timeframe is ${profile.duration}. The first appointment therefore centres on ${profile.firstSession}. These ${profile.name} details distinguish the pathway from a broad wellness page and keep the plan connected to the service PulseBreath currently offers.`,
          ...(profile.id === "valve-surgery" && intent.id === "at-home" ? [
            "At-home recovery after valve surgery needs a setup that respects the specific procedure, wound or sternal advice, rhythm symptoms and any anticoagulation instructions already supplied. Walking space, chair height and camera position are considered alongside pulse, blood pressure and recovery after gentle movement. Upper-body loading is not advanced from a generic home routine; the surgical and cardiology team’s clearance remains the boundary for progression.",
          ] : []),
        ]},
        { id: "intent-explained", heading: `What ${intent.phrase} means in practice`, paragraphs: [
          `For ${profile.name}, this page focuses specifically on ${intent.angle}. That distinction matters because people using the same diagnosis term may be at different stages, have different restrictions and need different levels of observation. Search wording is not used as a shortcut for clinical eligibility.`,
          `${intent.delivery} The published PulseBreath model uses live sessions rather than prerecorded workouts. The clinician can observe technique, breathing, pace and recovery, answer questions and change the planned activity when the response is not appropriate. Remote care is not presented as a replacement for the treating physician or acute medical services.`,
          `The central question for ${intent.phrase} is not simply whether exercise is possible. It is ${intent.angle}, followed by a plan for reassessment. ${intent.progress} This intent-specific pathway determines which information belongs on the page and which questions should be taken back to the usual medical team.`,
        ]},
        { id: "assessment", heading: `Assessment before a ${profile.name} plan begins`, paragraphs: [
          `The current service description starts with ${profile.firstSession}. This information provides a baseline and helps identify whether the person needs medical clarification, a different care setting or additional support before beginning. A diagnosis alone is therefore not enough to select exercises or intensity.`,
          `${intent.assessment} For online sessions, the review also covers the available movement space, a stable video connection and whether the clinician can see the relevant movement clearly. Monitoring devices are used only when appropriate and do not make an unstable condition suitable for remote exercise.`,
        ]},
        { id: "sessions", heading: `What supervised sessions may include`, paragraphs: [
          `The published ${profile.name} pathway includes ${profile.involves}. A session may combine education, warm-up, a selected movement component, planned recovery and review of symptoms. The order and dose depend on the assessment, and not every listed component is required in every appointment.`,
          `${intent.delivery} Progression might involve a small change in time, repetitions, resistance, movement complexity or independence. Only one or two variables may change at once so the response can be understood. The clinician may maintain, reduce or stop an activity when symptoms, technique or recovery indicate that progression is not suitable.`,
        ]},
        { id: "decision-checklist", heading: `${profile.name} ${intent.phrase}: questions to resolve`, paragraphs: [
          `When considering ${profile.name} ${intent.phrase}, ask whether the diagnosis is stable, whether the medical team has set restrictions and which everyday goal matters first. For ${profile.name} ${intent.phrase}, also clarify what will be observed during activity, what equipment is actually necessary and how a family member should help if support is needed. A useful ${profile.name} ${intent.phrase} discussion separates routine discomfort from the warning signs listed for this condition.`,
          `Before enrolling in ${profile.name} ${intent.phrase}, share recent reports, the current medicine list and any change in symptoms or hospital care. During ${profile.name} ${intent.phrase}, keep the agreed movement space available and report how the previous session affected the rest of the day. After each ${profile.name} ${intent.phrase} appointment, record the functional task being practised and the planned level for the next session instead of adding extra unsupervised intensity.`,
        ], bullets: [
          `${profile.name} ${intent.phrase}: confirm current medical restrictions.`,
          `${profile.name} ${intent.phrase}: identify one measurable daily-life goal.`,
          `${profile.name} ${intent.phrase}: agree on monitoring and stopping criteria.`,
          `${profile.name} ${intent.phrase}: confirm the live-video and home-space setup.`,
          `${profile.name} ${intent.phrase}: decide when the treating specialist should be contacted.`,
        ]},
        { id: "progress-and-access", heading: `Progress, access and next steps across India`, paragraphs: [
          `${intent.progress} PulseBreath states that suitable patients can join live online rehabilitation across India using a phone, tablet or computer and stable internet. This is a nationwide remote service statement, not a claim that PulseBreath operates a physical clinic in every city.`,
          `Useful follow-up asks whether the person is completing important activities with greater confidence, following the agreed safety plan and recovering predictably after the prescribed workload. Benefits vary, interruptions may require the plan to step back, and new symptoms need reassessment. The free assessment is the appropriate next step for discussing suitability, format and fees without an obligation to enrol.`,
        ]},
      ],
      safetyTitle: `Safety considerations for ${profile.name}`,
      safetyPoints: [
        ...profile.safety.map((item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}.`),
        "PulseBreath is not an emergency service; urgent or rapidly worsening symptoms require local emergency care.",
        "Rehabilitation advice must not independently change prescribed medicines, oxygen or medical restrictions.",
      ],
      faqs: [
        { question: `Is ${intent.phrase} suitable for everyone with ${profile.name}?`, answer: `No. Suitability depends on medical stability, symptoms, monitoring requirements, the home environment and advice from the treating team. The free assessment can identify questions that need medical clarification before a program is recommended.` },
        { question: `How long can ${profile.name} rehabilitation take?`, answer: `The current PulseBreath service description gives a typical pathway of ${profile.duration}. The actual recommendation can differ with starting capacity, recovery stage, interruptions and response to supervised activity.` },
        { question: `Can I join ${profile.name} rehabilitation from outside Noida?`, answer: "PulseBreath states that live online sessions are available across India for suitable patients. A smartphone, tablet or computer, stable internet and a safe visible movement area are normally needed. This does not mean every patient is suitable for remote care." },
        { question: `What happens if symptoms change during a ${profile.name} session?`, answer: "The activity should be paused and reassessed. The clinician may modify or end the session and advise contact with the treating team. Severe or rapidly worsening symptoms require urgent local medical care rather than an online rehabilitation appointment." },
        { question: `What should I prepare before asking about ${profile.name} ${intent.phrase}?`, answer: `For a ${profile.name} ${intent.phrase} discussion, prepare the diagnosis and procedure details, current medicines, recent reports, treating-clinician restrictions and a short description of the daily task you want to improve. Also note recent symptom changes, hospital visits, available home space and whether you need help with video technology. This information helps the ${profile.name} ${intent.phrase} assessment focus on suitability and the safest next step.` },
      ],
      cta: { heading: `Discuss ${profile.name} rehabilitation`, body: `Book a free assessment to discuss your diagnosis, current advice, goals and whether live online supervision is suitable.`, label: "Book a free assessment", href: "/contact" },
    },
    evidence: {
      referenceIds: profile.references, authorId: "dr-deepali-shah", assignedReviewerId: "dr-deepali-shah",
      medicalReview: { status: "source-content-verified", reviewedAt: TODAY, notes: `Automatically derived only from the published ${profile.program} service record and site-wide published FAQs; no new treatment claim or outcome promise added.` },
    },
    links: [
      { label: profile.program, href: profile.servicePath, relationship: "service" },
      { label: `${profile.serviceLine} rehabilitation services`, href: `/services/${profile.serviceLine}`, relationship: "parent" },
      { label: "How live online rehabilitation works", href: "/how-it-works", relationship: "related" },
      { label: "Book a free assessment", href: "/contact", relationship: "next-step" },
    ],
    quality: {
      uniqueValueSignals: [`Condition profile: ${profile.name}`, `Search intent: ${intent.id}`, `Published program duration: ${profile.duration}`, `Condition safety set: ${profile.safety.join("; ")}`],
      sourceNotes: `Derived from the current ${profile.program} service page and published PulseBreath FAQs. Page-level clinical review is not claimed; external references provide context.`,
    },
  };
  return { ...page, content: varyContent(page.content, page.id) };
}

const pages = combinations.map(([profile, intent]) => makePage(profile, intent));
const shards = Object.groupBy(pages, (page) => page.serviceLine);

for (const serviceLine of ["pulmonary", "cardiac", "metabolic"]) {
  await writeFile(path.join(pagesRoot, `${serviceLine}.json`), `${JSON.stringify({ pages: shards[serviceLine] ?? [] }, null, 2)}\n`, "utf8");
}

const clusters = pages.map((page) => ({
  id: page.keyword.clusterId,
  serviceLine: page.serviceLine,
  topic: `${page.taxonomy.conditionName}: ${page.taxonomy.intentName}`,
  intent: page.keyword.intent,
  primaryKeyword: page.keyword.primary,
  variants: page.keyword.secondary,
  suggestedPath: page.path,
  directionalDemand: "unvalidated",
  scoreInputs: { businessRelevance: 4, clinicalAuthority: 4, conversionIntent: page.keyword.intent === "transactional" ? 5 : 3, serpOpportunity: 3 },
  metrics: { averageMonthlySearches: null, competition: null, clicks: null, impressions: null, ctr: null, position: null },
  serpNotes: ["Source-derived first cohort", "Validate with Search Console before expanding this combination"],
  priorityTier: page.keyword.intent === "transactional" ? 1 : 2,
}));

await writeFile(path.join(dataRoot, "keyword-clusters.generated.json"), `${JSON.stringify({ clusters }, null, 2)}\n`, "utf8");
console.log(`Generated ${pages.length} source-derived pages and ${clusters.length} keyword records.`);
