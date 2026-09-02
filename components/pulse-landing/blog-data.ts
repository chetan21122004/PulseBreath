export type BlogCategory = "Cardiac" | "Pulmonary" | "Tele-Rehab" | "General";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "img"; src: string; alt: string; caption?: string; layout?: "wide" };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  overview: string;
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  readMinutes: number;
  author: string;
  blocks: BlogBlock[];
};

export type BlogReference = {
  title: string;
  publisher: string;
  url: string;
};

export const BLOG_OVERVIEW =
  "Evidence-led articles on cardiac and pulmonary rehabilitation - written by Dr. Deepali Shah to help patients and families understand supervised exercise, breathlessness, and recovery at home.";

export const BLOG_POSTS = [
  {
    slug: "medicines-alone-arent-the-whole-story",
    title: "Why Medicines Alone Aren't the Whole Story",
    excerpt:
      "Medicines help you breathe easier. Pulmonary rehabilitation helps you live easier. Why inhalers alone cannot reverse deconditioning in COPD.",
    overview:
      "Why everyday tasks still feel hard even when inhalers are taken correctly — and how pulmonary rehabilitation restores the function medicines cannot fully rebuild.",
    publishedAt: "2026-09-02",
    category: "Pulmonary",
    readMinutes: 5,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "\"Managing COPD isn't just about improving how you breathe. It's about improving what your breathing allows you to do.\"",
      },
      {
        type: "p",
        text: "For many people living with COPD, the daily routine is familiar. Wake up. Take your inhalers. Feel a little better. Then climb a flight of stairs and become breathless again.",
      },
      {
        type: "p",
        text: "Naturally, a question follows. \"If I'm taking all my medicines correctly, why do I still struggle to do everyday activities?\" The answer lies in understanding what COPD changes inside the body.",
      },
      {
        type: "h2",
        text: "What medicines do — and what they cannot",
      },
      {
        type: "p",
        text: "Medicines play a vital role in COPD management. They help open the airways, reduce inflammation, relieve symptoms and lower the risk of exacerbations. For millions of people, they are an essential part of staying well.",
      },
      {
        type: "p",
        text: "But breathing comfortably is only one part of living well.",
      },
      {
        type: "p",
        text: "Over time, COPD often changes how people move. Breathlessness makes activity uncomfortable, so many people begin avoiding it without even realising. Gradually, muscles lose strength, endurance declines, and everyday tasks begin demanding more effort than they once did.",
      },
      {
        type: "p",
        text: "This is why climbing stairs feels harder. Why shopping becomes tiring. Why even walking across a room can leave someone exhausted.",
      },
      {
        type: "p",
        text: "These changes are not always caused by worsening lung function alone. They are also the result of physical deconditioning — a change that medicines alone cannot fully reverse.",
      },
      {
        type: "h2",
        text: "Pulmonary rehabilitation as a partner, not a replacement",
      },
      {
        type: "p",
        text: "This is where pulmonary rehabilitation becomes an essential partner in recovery. Rather than replacing medicines, it complements them.",
      },
      {
        type: "p",
        text: "While medicines help improve airflow, pulmonary rehabilitation helps your body use that improved airflow more effectively. Through carefully prescribed exercise, education and structured progression, it trains the heart, muscles and circulation to work together more efficiently.",
      },
      {
        type: "p",
        text: "In simple terms: medicines help you breathe easier. Pulmonary rehabilitation helps you live easier.",
      },
      {
        type: "h2",
        text: "What the guidelines recommend",
      },
      {
        type: "p",
        text: "That is why international organisations such as the Global Initiative for Chronic Obstructive Lung Disease (GOLD) and the American Thoracic Society/European Respiratory Society (ATS/ERS) recommend pulmonary rehabilitation alongside optimal medical therapy. These recommendations are based on decades of evidence showing that medicines and rehabilitation address different — but equally important — aspects of COPD management.",
      },
      {
        type: "ul",
        items: [
          "One helps manage the disease.",
          "The other helps restore function.",
          "Together, they offer the best opportunity to move with greater confidence, participate more fully in everyday life and regain independence.",
        ],
      },
      {
        type: "h2",
        text: "A thought to take home",
      },
      {
        type: "p",
        text: "Every inhaler opens a door. Pulmonary rehabilitation teaches your body how to walk through it.",
      },
    ],
  },
  {
    slug: "why-asthma-isnt-just-about-your-inhaler",
    title: "Why Asthma Isn't Just About Your Inhaler",
    excerpt:
      "Medication is the foundation of asthma control — but it isn't the whole story. Why inhalers don't retrain your breathing, rebuild fitness, or restore confidence with movement.",
    overview:
      "What inhalers cannot fix — deconditioning, shallow breathing, exercise fear, and panic around chest tightness — and how structured asthma rehabilitation works alongside medication.",
    publishedAt: "2026-09-02",
    category: "Pulmonary",
    readMinutes: 5,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "If you live with asthma, you already know the drill: carry your inhaler, avoid your triggers, and hope the wheezing stays away. Medication is the foundation of asthma control — but for many patients, it isn't the whole story.",
      },
      {
        type: "h2",
        text: "The Gap Medicines Don't Close",
      },
      {
        type: "p",
        text: "Inhalers reduce airway inflammation and open your airways. What they don't do is retrain how you breathe, rebuild the fitness you may have lost from years of avoiding exertion, or teach your body to handle triggers like exercise, cold air, or stress without spiraling into a flare-up.",
      },
      {
        type: "p",
        text: "This is where many people get stuck. Their asthma is \"medically controlled\" on paper, but they still:",
      },
      {
        type: "ul",
        items: [
          "Get breathless climbing a single flight of stairs",
          "Avoid exercise altogether, out of fear it will trigger an attack",
          "Breathe shallow, upper-chest breaths most of the day without realizing it",
          "Feel anxious the moment their chest feels tight",
        ],
      },
      {
        type: "p",
        text: "None of these are things an inhaler alone can fix.",
      },
      {
        type: "h2",
        text: "What Pulmonary Rehab Adds",
      },
      {
        type: "p",
        text: "A structured asthma rehabilitation program works alongside your medication, not instead of it. It typically focuses on:",
      },
      {
        type: "ul",
        items: [
          "Breathing retraining — many people with asthma unconsciously develop fast, shallow, upper-chest breathing patterns, sometimes even between flare-ups. Techniques like diaphragmatic breathing and pursed-lip breathing help restore an efficient breathing pattern, which can reduce the sensation of breathlessness.",
          "Graded exercise — exercise-induced bronchospasm is real, but the answer isn't to avoid movement forever. It's to reintroduce it in a controlled, supervised way, at an intensity your airways can handle, so you rebuild tolerance safely instead of by trial and error.",
          "Trigger and symptom awareness — learning to recognize early warning signs of a flare, and what to do in the moment, so a tight chest doesn't automatically mean panic or a hospital visit.",
          "Confidence — this one is underrated. A lot of asthma-related avoidance isn't physical anymore — it's learned fear. Supervised, monitored sessions let you test your limits safely and relearn that movement is safe.",
        ],
      },
      {
        type: "h2",
        text: "Is It Safe to Exercise With Asthma?",
      },
      {
        type: "p",
        text: "Yes — for the vast majority of people with stable, well-managed asthma, structured exercise is not only safe but beneficial. The key word is structured. Exercise done with monitoring (watching for symptoms, pacing intensity, having a clear stop-and-recover plan) looks very different from pushing through breathlessness on your own.",
      },
      {
        type: "p",
        text: "If your asthma is poorly controlled, has recent frequent flare-ups, or you're unsure about your triggers, that's exactly why a supervised assessment — rather than a generic workout — matters.",
      },
      {
        type: "h2",
        text: "The Takeaway",
      },
      {
        type: "p",
        text: "Your inhaler manages the inflammation. Rehabilitation rebuilds the capacity, breathing pattern, and confidence that asthma often takes away over time. Used together, they address both sides of the problem — the medical and the functional.",
      },
      {
        type: "p",
        text: "If you've been managing asthma for years but still feel limited by it, that's usually a sign it's time to look beyond medication alone.",
      },
    ],
  },
  {
    slug: "pulmonary-rehabilitation-for-ild",
    title:
      "Pulmonary Rehabilitation for Interstitial Lung Disease (ILD): Improving Breathlessness, Endurance and Quality of Life",
    excerpt:
      "Medicines can slow some types of ILD, but they often cannot restore fitness or ease day-to-day breathlessness. Pulmonary rehabilitation is one of the most effective non-drug treatments for walking further and living more confidently.",
    overview:
      "Why ILD makes everyday tasks exhausting, what pulmonary rehab includes, how it improves walking, breathlessness, strength and confidence, and why supervised programmes — including online options — are considered safe and effective.",
    publishedAt: "2026-09-02",
    category: "Pulmonary",
    readMinutes: 8,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "Living with Interstitial Lung Disease (ILD) can be physically and emotionally challenging. Many people with ILD continue to feel short of breath, tired, and less able to stay active, even with treatment. Simple daily tasks like climbing stairs, walking to the market, taking a shower, or doing household chores may start to feel difficult.",
      },
      {
        type: "p",
        text: "While medicines are important and can help slow the progression of certain types of ILD, they often cannot completely improve these day-to-day symptoms or restore physical fitness. This is why many people continue to struggle with their breathing and activity levels despite taking their prescribed medications.",
      },
      {
        type: "p",
        text: "This is where pulmonary rehabilitation (PR) has emerged as one of the most effective non-pharmacological treatments for people living with ILD. International respiratory guidelines consistently recommend pulmonary rehabilitation to improve exercise capacity, reduce symptoms and enhance quality of life.",
      },
      {
        type: "h2",
        text: "What is Interstitial Lung Disease (ILD)?",
      },
      {
        type: "p",
        text: "Interstitial Lung Disease (ILD) is not a single disease — it is a group of lung conditions that cause inflammation and, in many cases, scarring (fibrosis) of the lungs.",
      },
      {
        type: "p",
        text: "As the lungs become scarred, they lose their flexibility and become stiffer. This makes it harder for them to expand with each breath, so everyday activities that once felt effortless — like walking, climbing stairs, getting dressed, or even having a conversation — can gradually become exhausting.",
      },
      {
        type: "p",
        text: "There are many different types of ILD, including:",
      },
      {
        type: "ul",
        items: [
          "Idiopathic Pulmonary Fibrosis (IPF)",
          "Hypersensitivity Pneumonitis",
          "Connective Tissue Disease-associated ILD",
          "Sarcoidosis",
          "Occupational Lung Diseases",
          "Drug-induced ILD",
        ],
      },
      {
        type: "p",
        text: "Although the causes and progression vary, many people with ILD experience similar challenges, such as:",
      },
      {
        type: "ul",
        items: [
          "Feeling breathless during everyday activities",
          "A persistent dry cough",
          "Constant tiredness or low energy",
          "Reduced ability to exercise or stay active",
          "Difficulty climbing stairs or walking longer distances",
        ],
      },
      {
        type: "p",
        text: "Living with ILD can feel overwhelming, but there are ways to help you breathe better, move more comfortably, and regain confidence in your daily life.",
      },
      {
        type: "h2",
        text: "What is Pulmonary Rehabilitation?",
      },
      {
        type: "p",
        text: "Pulmonary rehabilitation is a structured programme that combines exercise training, breathing techniques, education, and self-management strategies to help people with chronic lung diseases live better.",
      },
      {
        type: "p",
        text: "While medicines are important and may help slow the progression of certain types of ILD, they often cannot fully relieve breathlessness or restore physical strength and endurance. Pulmonary rehabilitation helps bridge this gap by improving fitness, reducing breathlessness, making everyday activities easier, and helping you feel more confident and in control of your condition.",
      },
      {
        type: "p",
        text: "According to the American Thoracic Society (ATS) and the European Respiratory Society (ERS), pulmonary rehabilitation combines:",
      },
      {
        type: "ul",
        items: [
          "Individually prescribed exercise training",
          "Breathing retraining techniques",
          "Education about lung disease",
          "Energy conservation strategies",
          "Psychological support",
          "Self-management education",
        ],
      },
      {
        type: "p",
        text: "The goal is not simply to strengthen the lungs, but to improve the body's ability to function despite reduced lung capacity.",
      },
      {
        type: "h2",
        text: "How Does Pulmonary Rehabilitation Help People with ILD?",
      },
      {
        type: "p",
        text: "Pulmonary rehabilitation cannot remove the scarring in your lungs, but it can help you breathe more comfortably, stay active for longer, and make everyday tasks easier. Many people notice they become less breathless during daily activities and feel more confident moving around.",
      },
      {
        type: "img",
        src: "/assets/blog/ild-pulmonary-rehabilitation.png",
        alt: "Infographic showing how interstitial lung disease scars the lungs, the breathlessness cycle of avoiding activity and weaker muscles, and how pulmonary rehabilitation breaks that cycle.",
        caption:
          "ILD makes the lungs stiffer and everyday activity more tiring. Pulmonary rehabilitation cannot reverse scarring, but it can break the breathlessness cycle and help you live better.",
        layout: "wide",
      },
      {
        type: "h2",
        text: "1. Helps you walk further and stay active",
      },
      {
        type: "p",
        text: "Many people with ILD stop being active because they become breathless. Over time, this weakens the muscles, making even small activities feel harder.",
      },
      {
        type: "p",
        text: "Pulmonary rehabilitation uses safe, supervised exercises to gradually improve your fitness. This can make everyday activities like walking, shopping, climbing stairs, or doing household chores feel easier.",
      },
      {
        type: "h2",
        text: "2. Helps reduce breathlessness",
      },
      {
        type: "p",
        text: "Feeling breathless can be frightening, but avoiding activity often makes it worse.",
      },
      {
        type: "p",
        text: "Pulmonary rehabilitation teaches breathing techniques and exercises that help your body use oxygen more efficiently. As your muscles become stronger, many daily activities require less effort, helping you feel less breathless.",
      },
      {
        type: "h2",
        text: "3. Builds strength and reduces fatigue",
      },
      {
        type: "p",
        text: "ILD doesn't only affect the lungs. Because many people become less active, the muscles throughout the body can become weaker.",
      },
      {
        type: "p",
        text: "Strength and endurance exercises help improve muscle fitness, making everyday activities less tiring and helping you stay independent for longer.",
      },
      {
        type: "h2",
        text: "4. Improves confidence and quality of life",
      },
      {
        type: "p",
        text: "Living with ILD can affect your confidence, mood, and social life.",
      },
      {
        type: "p",
        text: "As breathing becomes easier and physical fitness improves, many people feel more confident leaving the house, spending time with family, and doing the activities they enjoy.",
      },
      {
        type: "h2",
        text: "What Happens During Pulmonary Rehabilitation?",
      },
      {
        type: "p",
        text: "Pulmonary rehabilitation is not just an exercise programme. It is a personalised treatment plan designed specifically for your symptoms, fitness level, and oxygen needs.",
      },
      {
        type: "p",
        text: "Your programme may include:",
      },
      {
        type: "ul",
        items: [
          "Walking or cycling exercises",
          "Strength training for your arms and legs",
          "Breathing exercises",
          "Stretching and flexibility exercises",
          "Balance and mobility training",
          "Oxygen level monitoring during exercise",
          "Energy conservation techniques to make daily activities easier",
          "A personalised home exercise programme",
        ],
      },
      {
        type: "p",
        text: "Most programmes run for 6 to 12 weeks, with exercises becoming gradually progressive through the course and according to each individual's improvement.",
      },
      {
        type: "h2",
        text: "Is Pulmonary Rehabilitation Safe for ILD?",
      },
      {
        type: "p",
        text: "Yes. Pulmonary rehabilitation is considered safe when it is supervised by healthcare professionals trained in lung rehabilitation.",
      },
      {
        type: "p",
        text: "Some people with ILD experience a drop in oxygen levels during exercise. For this reason, your oxygen saturation (SpO₂), heart rate, and symptoms should be monitored throughout your programme. Your exercises should always be tailored to your individual needs.",
      },
      {
        type: "h2",
        text: "Can Pulmonary Rehabilitation Be Done at Home or Online?",
      },
      {
        type: "p",
        text: "Yes. Many people with ILD can safely complete pulmonary rehabilitation from home through a structured online programme.",
      },
      {
        type: "p",
        text: "Online pulmonary rehabilitation can be especially helpful if you:",
      },
      {
        type: "ul",
        items: [
          "Live far from a rehabilitation centre",
          "Find travelling tiring because of breathlessness",
          "Have mobility difficulties",
          "Need ongoing supervised exercise after completing a hospital-based programme",
        ],
      },
      {
        type: "p",
        text: "A good online programme should always include an assessment, a personalised exercise plan, regular monitoring, and progression based on your improvement.",
      },
      {
        type: "h2",
        text: "Does Pulmonary Rehabilitation Really Work?",
      },
      {
        type: "p",
        text: "Yes. Research from around the world has consistently shown that pulmonary rehabilitation helps many people living with ILD.",
      },
      {
        type: "p",
        text: "Studies have found that pulmonary rehabilitation can:",
      },
      {
        type: "ul",
        items: [
          "Help you walk further",
          "Reduce breathlessness",
          "Improve strength and fitness",
          "Make everyday activities easier",
          "Improve quality of life",
          "Increase confidence in managing your condition",
        ],
      },
      {
        type: "p",
        text: "While pulmonary rehabilitation cannot cure ILD or reverse lung scarring, it can help many people stay active, remain independent, and enjoy a better quality of life.",
      },
      {
        type: "p",
        text: "If you or a loved one has been diagnosed with Interstitial Lung Disease, early referral to a specialist pulmonary rehabilitation programme can make a meaningful difference to day-to-day life.",
      },
    ],
  },
  {
    slug: "how-smartwatch-measures-pulse-rate",
    title: "How Does Your Smartwatch Measure Your Pulse Rate?",
    excerpt:
      "You look at your smartwatch and see 72 bpm. Behind that number is light, blood flow and clever signal processing - and knowing how it works helps you trust the reading wisely.",
    overview:
      "How PPG sensors turn light into a pulse rate, why readings are imperfect during movement, how PPG differs from ECG, and how to interpret other wearable metrics.",
    publishedAt: "2026-08-21",
    category: "General",
    readMinutes: 6,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "You look at your smartwatch and see 72 bpm. But have you ever wondered how a small device sitting on your wrist actually knows your pulse rate? The answer involves light, blood flow and some fairly clever signal processing.",
      },
      {
        type: "h2",
        text: "It starts with light",
      },
      {
        type: "p",
        text: "Most smartwatches use a technology called Photoplethysmography (PPG) to measure your pulse. The sensors on the back of the watch shine light into your skin. As your heart pumps blood, the amount of blood in the tiny blood vessels under your skin changes slightly with every pulse. These changes affect how much light is absorbed and reflected back to the watch. The sensor detects these tiny changes and creates a signal that follows the pattern of your pulse.",
      },
      {
        type: "h2",
        text: "From a signal to a number",
      },
      {
        type: "p",
        text: "Your watch doesn't simply \"count\" your pulse. It first receives a continuously changing signal from your wrist. The device then uses algorithms to identify the repeated peaks in that signal and measures the time between them. From this information, it calculates your pulse rate in beats per minute (bpm).",
      },
      {
        type: "p",
        text: "So the number you see on your screen is actually the final result of several steps: Light → PPG signal → Signal processing → Pulse detection → Pulse rate.",
      },
      {
        type: "h2",
        text: "Why isn't the reading always perfect?",
      },
      {
        type: "p",
        text: "Your body isn't a laboratory - and your wrist certainly isn't perfectly still. When you're exercising, your arm is moving while blood flow is changing at the same time. This can introduce additional signals into the measurement, known as motion artefacts. Other factors can also affect the quality of the signal, including:",
      },
      {
        type: "ul",
        items: [
          "How tightly the watch fits",
          "Movement of the wrist",
          "Skin contact with the sensor",
          "Cold hands or reduced peripheral blood flow",
          "Sweat and moisture",
          "Position of the watch",
        ],
      },
      {
        type: "p",
        text: "Modern devices use algorithms to identify and reduce some of this noise, but no sensor can produce a perfect signal under every condition.",
      },
      {
        type: "h2",
        text: "PPG and ECG are not the same thing",
      },
      {
        type: "p",
        text: "This is an important distinction. PPG uses light to detect changes associated with blood volume in the peripheral circulation and can be used to estimate your pulse rate. ECG (electrocardiography) records the electrical activity of the heart using electrodes.",
      },
      {
        type: "p",
        text: "So although both can tell us something about cardiac activity, they are measuring different physiological signals. Some smartwatches can perform an ECG when the appropriate sensors and features are available - but the ECG function should not be confused with the optical PPG sensor used for routine pulse-rate tracking.",
      },
      {
        type: "h2",
        text: "And what about all the other numbers?",
      },
      {
        type: "p",
        text: "Your smartwatch may show you much more than pulse rate - such as SpO₂, HRV, sleep metrics, calories, VO₂ max and activity levels. But here's something worth remembering: not every number on your smartwatch is a direct measurement.",
      },
      {
        type: "p",
        text: "Some values come directly from a sensor, while others are calculated or estimated using algorithms, sometimes combining several signals and your personal information. The accuracy can therefore vary depending on the measurement, the device and the conditions in which it is being recorded.",
      },
      {
        type: "h2",
        text: "So, should you trust your smartwatch?",
      },
      {
        type: "p",
        text: "Smartwatches can be very useful tools for tracking patterns and trends. A change that repeatedly appears over days or weeks may be much more informative than one isolated reading. But a smartwatch reading should always be understood in context. If your watch shows an unusual number, consider:",
      },
      {
        type: "ul",
        items: [
          "What was being measured?",
          "How was it measured?",
          "Were you moving?",
          "Was the sensor making good contact?",
          "Is this a measurement or an estimate?",
          "And most importantly - how do you actually feel?",
        ],
      },
      {
        type: "h2",
        text: "The bigger picture",
      },
      {
        type: "p",
        text: "Wearable technology is becoming an increasingly useful part of health and fitness monitoring. But understanding the technology makes it even more useful. Don't just look at the number on your wrist. Understand the signal behind it.",
      },
    ],
  },
  {
    slug: "diaphragmatic-breathing-how-it-works",
    title: "Diaphragmatic Breathing: How It Works, Potential Benefits and When It May Help",
    excerpt:
      "\"Breathe from your belly\" is common advice - but diaphragmatic breathing is not a universal exercise. When it may help, what the evidence shows, and when it may not.",
    overview:
      "How the diaphragm contributes to breathing, what research says about breathlessness and quality of life, and why technique should match the person - not a one-size-fits-all prescription.",
    publishedAt: "2026-08-21",
    category: "Pulmonary",
    readMinutes: 5,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "\"Breathe from your belly.\" It is one of the most common instructions given to people who feel breathless, anxious or uncomfortable with their breathing. But diaphragmatic breathing is more than simply making the abdomen move during inhalation - and it is not a universal exercise that everyone with a respiratory condition needs.",
      },
      {
        type: "h2",
        text: "What is diaphragmatic breathing?",
      },
      {
        type: "p",
        text: "The diaphragm is a dome-shaped muscle separating the chest from the abdomen. When it contracts, it moves downward, increasing chest volume so air can flow into the lungs. During quiet breathing, it does much of the work of inspiration. Diaphragmatic breathing trains awareness of this contribution and more coordinated movement of the lower ribs and abdomen.",
      },
      {
        type: "p",
        text: "A useful distinction: a deep breath describes the size of a breath. Diaphragmatic breathing describes how the respiratory system is being used to produce that breath. The goal is not \"take the biggest breath possible\" - it is to find a pattern that is appropriate and efficient for you.",
      },
      {
        type: "h2",
        text: "Why the diaphragm matters",
      },
      {
        type: "p",
        text: "Breathing is muscular work. In COPD, air trapping and hyperinflation can flatten the diaphragm and place it at a mechanical disadvantage, increasing the work of breathing. That is why respiratory muscle mechanics matter when considering breathing retraining - and why forcing a large abdominal breathing pattern does not help everyone.",
      },
      {
        type: "h2",
        text: "What it may help - and what the evidence shows",
      },
      {
        type: "p",
        text: "The goal is not to \"strengthen the lungs.\" Diaphragmatic breathing aims to influence breathing pattern and mechanics. Depending on the individual, it may help improve coordination, awareness and control of breathing, and potentially reduce the sensation of breathlessness.",
      },
      {
        type: "p",
        text: "Evidence suggests breathing techniques - including diaphragmatic and pursed-lip breathing - can help some people with COPD and asthma, particularly for quality of life and symptom management. The European Respiratory Society has issued a conditional recommendation for breathing techniques in serious respiratory illness, while noting that certainty of evidence remains limited. A statistically measurable change is not automatically a meaningful change for every patient.",
      },
      {
        type: "p",
        text: "So the evidence does not support \"everyone should practise diaphragmatic breathing.\" It supports a careful conclusion: breathing techniques can be useful for selected patients when the technique matches their symptoms and breathing pattern.",
      },
      {
        type: "h2",
        text: "Does everyone with COPD benefit?",
      },
      {
        type: "p",
        text: "No. Hyperinflation may flatten and shorten the diaphragm. Some people also have abnormal chest–abdomen coordination. In those situations, forcing abdominal breathing may not make breathing more efficient. The better clinical question is not \"Does diaphragmatic breathing work?\" but \"Does this strategy improve this person's breathing?\"",
      },
      {
        type: "h2",
        text: "What it cannot do",
      },
      {
        type: "ul",
        items: [
          "Cure asthma or reverse COPD",
          "Replace inhaled medication",
          "Permanently increase lung capacity simply through practice",
          "Guarantee higher oxygen saturation or eliminate all breathlessness",
        ],
      },
      {
        type: "p",
        text: "Breathing techniques are one possible component of pulmonary rehabilitation - used alongside exercise training, not instead of it. At PulseBreath, they are assessment-guided interventions, not universal prescriptions. The right technique is the one that works best for the person in front of you.",
      },
    ],
  },
  {
    slug: "pulmonary-rehabilitation-for-asthma",
    title:
      "Pulmonary Rehabilitation for Asthma: Can It Improve Exercise Capacity and Quality of Life?",
    excerpt:
      "Asthma medication manages the airways. Pulmonary rehab can help with fitness, confidence, and daily activity - without replacing your medical plan.",
    overview:
      "Why exercise can feel hard with asthma, what Cochrane and GINA evidence show about rehab, and how individualised programmes build capacity safely.",
    publishedAt: "2026-08-21",
    category: "Pulmonary",
    readMinutes: 5,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "Asthma is often thought of mainly as wheezing, coughing and breathing difficulty. But for some people it also makes exercise uncomfortable, so activity is avoided. Over time, reduced activity leads to deconditioning - and everyday tasks feel more demanding.",
      },
      {
        type: "p",
        text: "Pulmonary rehabilitation does not replace asthma medication. It can complement medical management by addressing exercise capacity, fitness, breathing-related symptoms and confidence with physical activity.",
      },
      {
        type: "h2",
        text: "What is pulmonary rehabilitation?",
      },
      {
        type: "p",
        text: "It is a structured, assessment-based programme that combines individualised exercise training, education and behavioural support. For asthma, that may include aerobic and strengthening work, education about exercise and triggers, breathing strategies when appropriate, pacing, and guidance on returning to activity safely - tailored to symptoms, asthma control, capacity and goals.",
      },
      {
        type: "h2",
        text: "Why can exercise be difficult with asthma?",
      },
      {
        type: "p",
        text: "Exercise can trigger coughing, wheezing, chest tightness or unusual breathlessness. That does not mean people with asthma should avoid exercise. GINA encourages regular physical activity for cardiovascular health and quality of life. Simply saying \"exercise more\" is often not enough - the useful question is how this person can exercise safely, comfortably and consistently.",
      },
      {
        type: "h2",
        text: "What does the research say?",
      },
      {
        type: "p",
        text: "A 2022 Cochrane review of supervised pulmonary rehabilitation in adults with asthma found a clinically meaningful improvement in functional exercise capacity - about 80 metres farther on a six-minute walk test - and improved health-related quality of life. Effects on asthma control were smaller and less certain, with insufficient evidence on attacks or hospitalisations.",
      },
      {
        type: "p",
        text: "An earlier Cochrane review of physical training found improved cardiorespiratory fitness (including VO₂max) without significant changes in FEV₁ or FVC. In simple terms: better fitness does not necessarily mean better spirometry. Rehab outcomes should not be judged by lung function alone.",
      },
      {
        type: "h2",
        text: "What might a programme focus on?",
      },
      {
        type: "ul",
        items: [
          "Aerobic exercise - to improve how the body delivers and uses oxygen",
          "Strength training - so everyday tasks take less relative effort",
          "Breathing retraining - only when dysfunctional breathing contributes to symptoms",
          "Education - to separate expected exercise responses from warning signs, and reduce fear of activity",
          "Progressive loading - enough challenge to adapt, without exceeding current capacity",
        ],
      },
      {
        type: "p",
        text: "Some people experience exercise-induced bronchoconstriction (EIB). That does not mean exercise should be avoided. Medication before exercise should follow the person's asthma plan with their clinician; a physiotherapist works within that plan, not outside it.",
      },
      {
        type: "h2",
        text: "Who might benefit?",
      },
      {
        type: "ul",
        items: [
          "Reduced exercise tolerance or avoidance of activity",
          "Deconditioning or breathlessness in daily tasks",
          "Difficulty returning to exercise or low confidence with activity",
          "Functional limits despite appropriate medical care",
        ],
      },
      {
        type: "h2",
        text: "The bottom line",
      },
      {
        type: "p",
        text: "Asthma should not automatically mean avoiding exercise. Structured rehab can improve exercise capacity and quality of life, while its effect on asthma control itself is smaller and less certain. It works best as a complement to good medical management - not a replacement. The question is not simply \"Can I exercise with asthma?\" but \"How can I exercise safely and progressively with the asthma I have?\"",
      },
    ],
  },
  {
    slug: "why-do-i-cough-more-in-the-morning",
    title: "Why Do I Cough More in the Morning?",
    excerpt:
      "Morning cough is often your lungs clearing overnight mucus - not a random habit. Here is what happens during sleep, on waking, and how pulmonary rehab helps.",
    overview:
      "Why mucus pools overnight, why sitting up triggers a productive cough, when to seek medical advice, and how airway clearance and rehab support clearer breathing.",
    publishedAt: "2026-08-06",
    updatedAt: "2026-08-26",
    category: "Pulmonary",
    readMinutes: 6,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "If you wake up coughing more than at other times of day, you are not alone. For many people with COPD, bronchiectasis, asthma, or other chronic lung conditions, the morning cough is the lungs' natural way of clearing mucus that collected overnight. Understanding that process helps you respond with the right techniques - and know when a change in cough needs medical attention.",
      },
      {
        type: "h2",
        text: "During sleep: mucus has time to collect",
      },
      {
        type: "p",
        text: "Coughing frequency usually falls during sleep. Lying down for several hours, with less movement, reduces mucociliary clearance - the natural system that moves mucus out of the airways. Mucus gradually pools in smaller airways. By morning, there is more material ready to be cleared than there was when you went to bed.",
      },
      {
        type: "h2",
        text: "When you wake: gravity and movement mobilise mucus",
      },
      {
        type: "p",
        text: "Sitting up and starting to move lets gravity and activity help shift mucus from smaller airways toward larger ones. That movement often triggers the morning cough. The cough itself has a purpose: it is one of the body's main tools for clearing the airways so air can flow more freely.",
      },
      {
        type: "ul",
        items: [
          "Mucus that stayed in the lungs overnight begins to mobilise",
          "Larger airways are more sensitive to irritation - so cough is more noticeable",
          "A productive morning cough can be a sign clearance is working, not that something is \"wrong\" in isolation",
        ],
      },
      {
        type: "h2",
        text: "Why clearing mucus matters",
      },
      {
        type: "p",
        text: "When mucus is not cleared effectively, breathing can feel harder, the risk of chest infections can rise, and daily activities may become more limited. Airway clearance techniques taught in pulmonary rehabilitation - used alongside your prescribed medicines - help move mucus out more efficiently, so you rely less on exhausting, unproductive coughing alone.",
      },
      {
        type: "h2",
        text: "How pulmonary rehabilitation can help",
      },
      {
        type: "p",
        text: "Specialist-led pulmonary rehab combines airway clearance techniques, breathing retraining, and exercise training. Guidelines from GOLD, ATS, and ERS support rehabilitation as a core part of care for chronic respiratory disease - not as an optional extra.",
      },
      {
        type: "ul",
        items: [
          "Clear mucus more effectively with techniques matched to your condition",
          "Reduce breathlessness during daily activities",
          "Improve exercise capacity and endurance",
          "Stay more active and independent over time",
        ],
      },
      {
        type: "h2",
        text: "Seek medical advice if you notice",
      },
      {
        type: "ul",
        items: [
          "More mucus than usual",
          "Yellow, green, foul-smelling, or blood-stained mucus",
          "Increasing breathlessness",
          "Fever or chest pain",
        ],
      },
      {
        type: "p",
        text: "These changes can signal an infection or exacerbation and should be assessed promptly by your doctor. PulseBreath supports long-term breathing confidence through evidence-based rehab - but acute warning signs always need medical care first.",
      },
    ],
  },
  {
    slug: "why-do-i-get-breathless-while-taking-a-shower",
    title: "Why Do I Get Breathless While Taking a Shower?",
    excerpt:
      "Shower breathlessness is common in COPD, asthma, and ILD - and it has real physiological causes. Five reasons it happens, and how rehab makes daily tasks easier.",
    overview:
      "Warm humid air, arms overhead, bending, breath-holding, and energy demand - why showers challenge the lungs, and how pacing and pulmonary rehab help.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-26",
    category: "Pulmonary",
    readMinutes: 5,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "Breathlessness while showering is common for people with lung conditions such as COPD, asthma, interstitial lung disease (ILD), and other chronic respiratory diseases. It is not \"in your head.\" Warm steam, raised arms, bending, and the simple energy cost of washing all place real demands on breathing. Understanding those reasons is the first step toward smarter strategies that make the task less exhausting.",
      },
      {
        type: "h2",
        text: "Why showering can be challenging",
      },
      {
        type: "p",
        text: "A shower looks simple from the outside. Inside the body, several factors often stack at once:",
      },
      {
        type: "ul",
        items: [
          "Warm, humid air - warmth and humidity can narrow the airways and increase the work of breathing, especially in COPD and asthma",
          "Arms overhead - washing hair and reaching up recruit shoulder and chest muscles that also assist breathing, so the lungs share that workload",
          "Bending and reaching - repeated forward bending or stretching for soap, shampoo, or the tap raises oxygen demand",
          "Unintentional breath-holding - many people briefly hold their breath while lathering or rinsing, which can trap air and worsen breathlessness",
          "Energy expenditure - showering uses more energy than people expect, particularly when lung capacity is already limited",
        ],
      },
      {
        type: "p",
        text: "It is not weakness. It is physiology. Once you see the pattern, you can change how you approach the task - pacing, seating, cooler water, and breathing techniques taught in rehab - rather than pushing through until you are drained.",
      },
      {
        type: "h2",
        text: "How pulmonary rehabilitation helps",
      },
      {
        type: "p",
        text: "Pulmonary rehabilitation does not only train you on a treadmill. It teaches you to manage the activities that matter most in daily life. At PulseBreath, that includes personalised assessment, breathing techniques to reduce breathlessness, individualised exercise and functional training, energy conservation and activity pacing, and education for long-term self-management.",
      },
      {
        type: "ul",
        items: [
          "Doing the right activity the right way - including bathroom and self-care tasks",
          "Building breathing capacity and endurance safely",
          "Improving independence and quality of life at home",
        ],
      },
      {
        type: "h2",
        text: "What the evidence supports",
      },
      {
        type: "p",
        text: "International guidance consistently supports pulmonary rehab and self-management for people with chronic lung disease. GOLD reports, ATS clinical practice guidelines, and Cochrane reviews show that rehabilitation reduces symptoms, improves exercise tolerance, and enhances quality of life when combined with appropriate medical care.",
      },
      {
        type: "p",
        text: "Breathing easier during daily tasks is possible - with the right approach. If showers leave you breathless, a free assessment can help identify which factors affect you most and which strategies fit your condition. PulseBreath is here to help you breathe better and live better.",
      },
    ],
  },
  {
    slug: "cardiac-rehab-after-surgery",
    title: "Why Cardiac Rehabilitation Matters After Heart Surgery",
    excerpt:
      "Hospital discharge is not the finish line. Supervised cardiac rehab rebuilds stamina safely after bypass, angioplasty, or valve surgery.",
    overview:
      "What happens after discharge, why generic gym workouts fall short, and how specialist supervision protects your recovery.",
    publishedAt: "2025-11-12",
    updatedAt: "2026-08-26",
    category: "Cardiac",
    readMinutes: 5,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "Many patients leave hospital feeling fragile - unsure whether walking, climbing stairs, or returning to daily routines is safe. That uncertainty is valid. After cardiac surgery or a major cardiac event, your heart and body need a structured, monitored return to activity - not silence, and not guesswork.",
      },
      {
        type: "h2",
        text: "Discharge instructions are only the beginning",
      },
      {
        type: "p",
        text: "Discharge sheets often list restrictions but rarely provide day-by-day progression. Cardiac rehabilitation bridges that gap with graded exercise, breathing strategies, and real-time monitoring of heart rate, blood pressure, and symptoms.",
      },
      {
        type: "ul",
        items: [
          "Paced aerobic work within your surgeon's and cardiologist's guidelines",
          "Resistance training introduced only when clinically appropriate",
          "Early recognition of warning signs - chest discomfort, unusual breathlessness, dizziness",
          "Education for family members who support daily activity",
        ],
      },
      {
        type: "h2",
        text: "Why a specialist physiotherapist leads the session",
      },
      {
        type: "p",
        text: "Cardiopulmonary physiotherapists are trained to prescribe exercise for heart failure, post-surgical recovery, and arrhythmia risk - not just musculoskeletal injury. At PulseBreath, every session is live and supervised, so intensity adjusts the moment you report a symptom.",
      },
      {
        type: "p",
        text: "If you are recovering after bypass, angioplasty, valve replacement, or a recent cardiac diagnosis, a free assessment can clarify whether structured rehab is right for you - with no obligation to enrol.",
      },
    ],
  },
  {
    slug: "exercising-safely-with-copd",
    title: "Exercising Safely When You Have COPD or Breathlessness",
    excerpt:
      "Breathlessness does not mean you should stop moving. With the right pacing and supervision, exercise becomes one of the safest tools for lung recovery.",
    overview:
      "How paced pulmonary rehab reduces flare-ups, rebuilds walking tolerance, and keeps exertion within safe limits.",
    publishedAt: "2025-10-28",
    updatedAt: "2026-08-26",
    category: "Pulmonary",
    readMinutes: 6,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "People with COPD, asthma, bronchiectasis, or interstitial lung disease are often told to \"take it easy.\" Rest has its place - but prolonged inactivity weakens breathing muscles, reduces stamina, and can worsen breathlessness over time.",
      },
      {
        type: "h2",
        text: "The fear of making things worse",
      },
      {
        type: "p",
        text: "This is the most common concern in clinic: Will exercise trigger a flare-up? The answer depends on how exercise is prescribed. Unsupervised high-intensity work can provoke symptoms. Evidence-based pulmonary rehabilitation uses pursed-lip breathing, airway clearance when needed, and exertion scaled to your breathlessness scale.",
      },
      {
        type: "ul",
        items: [
          "SpO₂ and symptom checks before and during sessions",
          "Stop rules if wheeze, chest tightness, or desaturation occurs",
          "Airway clearance before exertion when productive cough is present",
          "Gradual progression tracked week to week - never rushed",
        ],
      },
      {
        type: "h2",
        text: "What improvement actually looks like",
      },
      {
        type: "p",
        text: "Progress is measured in daily function: walking to the market, climbing one more flight of stairs, needing less rescue inhaler use, or recovering faster after mild exertion. Pulmonary rehab targets those outcomes - not gym aesthetics.",
      },
      {
        type: "p",
        text: "PulseBreath offers condition-specific pathways for obstructive and restrictive lung disease, supervised live online across India.",
      },
    ],
  },
  {
    slug: "first-tele-rehab-session",
    title: "What to Expect in Your First Tele-Rehabilitation Session",
    excerpt:
      "No travel, no crowded waiting rooms - but the same specialist supervision. Here is how a live online rehab session with Dr. Deepali works.",
    overview:
      "Equipment, space, vitals, and how live video sessions differ from pre-recorded exercise videos.",
    publishedAt: "2025-09-15",
    updatedAt: "2026-08-26",
    category: "Tele-Rehab",
    readMinutes: 4,
    author: "Dr. Deepali Shah (PT)",
    blocks: [
      {
        type: "p",
        text: "Tele-rehabilitation at PulseBreath is not a library of recorded workouts. Every session is live, interactive, and led by Dr. Deepali - with real-time feedback on technique, pacing, and how you feel.",
      },
      {
        type: "h2",
        text: "Before you join",
      },
      {
        type: "ul",
        items: [
          "A quiet space roughly 2 × 2 metres - living room or bedroom is fine",
          "Stable internet and a phone, tablet, or laptop propped at chest height",
          "Comfortable clothing, water nearby, and prescribed medications accessible",
          "Optional: pulse oximeter or home BP monitor if you already use one",
        ],
      },
      {
        type: "h2",
        text: "During the session",
      },
      {
        type: "p",
        text: "Your first visit includes a clinical history review, baseline symptom check, and gentle movement to assess capacity. Dr. Deepali explains each exercise, watches your breathing pattern, and adjusts intensity immediately. Group sessions are small (typically 5–8 people) grouped by condition; one-to-one sessions are available when closer attention is needed.",
      },
      {
        type: "h2",
        text: "After the call",
      },
      {
        type: "p",
        text: "You receive clear guidance on what to do between sessions - not overwhelming homework, but practical habits that build capacity. A free assessment call comes first, with no obligation to join a program.",
      },
    ],
  },
] as const satisfies readonly BlogPost[];

export type BlogPostSlug = (typeof BLOG_POSTS)[number]["slug"];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): BlogPostSlug[] {
  return BLOG_POSTS.map((post) => post.slug);
}

const PULMONARY_REFERENCES: readonly BlogReference[] = [
  {
    title: "Pulmonary Rehabilitation for Adults with Chronic Respiratory Disease: Official Clinical Practice Guideline",
    publisher: "American Thoracic Society",
    url: "https://www.thoracic.org/statements/guideline-implementation-tools/matrix-guidelines-and-derivatives-pulmonary-rehab-in-adults-08-23-23.php",
  },
  {
    title: "Global Strategy for Prevention, Diagnosis and Management of COPD — 2026 Report",
    publisher: "Global Initiative for Chronic Obstructive Lung Disease (GOLD)",
    url: "https://goldcopd.org/wp-content/uploads/2026/01/GOLD-REPORT-2026-v1.3-8Dec2025_WMV2.pdf",
  },
];

const CARDIAC_REFERENCES: readonly BlogReference[] = [
  {
    title: "Core Components of Cardiac Rehabilitation Programs: 2024 Update",
    publisher: "American Heart Association and AACVPR",
    url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001289",
  },
  {
    title: "Home-Based Cardiac Rehabilitation: A Scientific Statement",
    publisher: "AACVPR, American Heart Association and American College of Cardiology",
    url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000663",
  },
];

const TELE_REHAB_REFERENCES: readonly BlogReference[] = [
  PULMONARY_REFERENCES[0],
  CARDIAC_REFERENCES[1],
];

const ILD_PR_REFERENCES: readonly BlogReference[] = [
  {
    title:
      "An Official American Thoracic Society/European Respiratory Society Statement: Key Concepts and Advances in Pulmonary Rehabilitation",
    publisher: "American Thoracic Society / European Respiratory Society",
    url: "https://www.atsjournals.org/doi/10.1164/rccm.201309-1634ST",
  },
  {
    title:
      "Pulmonary Rehabilitation for Adults with Chronic Respiratory Disease: An Official American Thoracic Society Clinical Practice Guideline",
    publisher: "American Thoracic Society",
    url: "https://www.atsjournals.org/doi/10.1164/rccm.202306-1066ST",
  },
  {
    title: "Pulmonary rehabilitation for interstitial lung disease",
    publisher: "Cochrane Database of Systematic Reviews",
    url: "https://www.cochrane.org/evidence/CD006322_pulmonary-rehabilitation-interstitial-lung-disease",
  },
  {
    title:
      "Diagnosis of Idiopathic Pulmonary Fibrosis: An Official ATS/ERS/JRS/ALAT Clinical Practice Guideline",
    publisher: "American Thoracic Society / European Respiratory Society",
    url: "https://www.atsjournals.org/doi/10.1164/rccm.201807-1255ST",
  },
];

const ASTHMA_PR_REFERENCES: readonly BlogReference[] = [
  {
    title: "Global Strategy for Asthma Management and Prevention",
    publisher: "Global Initiative for Asthma (GINA)",
    url: "https://ginasthma.org/gina-reports/",
  },
  {
    title: "Pulmonary rehabilitation for adults with asthma",
    publisher: "Cochrane Database of Systematic Reviews",
    url: "https://www.cochrane.org/evidence/CD013485_pulmonary-rehabilitation-adults-asthma",
  },
  {
    title:
      "Pulmonary Rehabilitation for Adults with Chronic Respiratory Disease: An Official American Thoracic Society Clinical Practice Guideline",
    publisher: "American Thoracic Society",
    url: "https://www.atsjournals.org/doi/10.1164/rccm.202306-1066ST",
  },
];

export function getPostReferences(post: BlogPost): readonly BlogReference[] {
  if (post.slug === "pulmonary-rehabilitation-for-ild") return ILD_PR_REFERENCES;
  if (post.slug === "why-asthma-isnt-just-about-your-inhaler") return ASTHMA_PR_REFERENCES;
  if (post.category === "Cardiac") return CARDIAC_REFERENCES;
  if (post.category === "Tele-Rehab") return TELE_REHAB_REFERENCES;
  return PULMONARY_REFERENCES;
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const BLOG_CATEGORY_STYLES: Record<BlogCategory, string> = {
  Cardiac: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
  Pulmonary: "bg-[var(--brand-teal-soft)] text-[var(--brand-teal-deep)]",
  "Tele-Rehab": "bg-[var(--brand-gold)]/15 text-[var(--brand-dark)]",
  General: "bg-navy/[0.06] text-navy/80",
};
