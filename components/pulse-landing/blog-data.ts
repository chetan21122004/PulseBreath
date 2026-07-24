export type BlogCategory = "Cardiac" | "Pulmonary" | "Tele-Rehab" | "General";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  overview: string;
  publishedAt: string;
  category: BlogCategory;
  readMinutes: number;
  author: string;
  blocks: BlogBlock[];
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
      "Why everyday tasks still feel hard on correct inhalers - and how pulmonary rehab restores the function medicines cannot fully rebuild.",
    publishedAt: "2026-07-24",
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
        text: "For many people living with COPD, the daily routine is familiar. Wake up. Take your inhalers. Feel a little better. Then climb a flight of stairs and become breathless again. Naturally, a question follows. \"If I'm taking all my medicines correctly, why do I still struggle to do everyday activities?\" The answer lies in understanding what COPD changes inside the body.",
      },
      {
        type: "h2",
        text: "What medicines do - and what they cannot",
      },
      {
        type: "p",
        text: "Medicines play a vital role in COPD management. They help open the airways, reduce inflammation, relieve symptoms and lower the risk of exacerbations. For millions of people, they are an essential part of staying well. But breathing comfortably is only one part of living well.",
      },
      {
        type: "p",
        text: "Over time, COPD often changes how people move. Breathlessness makes activity uncomfortable, so many people begin avoiding it without even realising. Gradually, muscles lose strength, endurance declines, and everyday tasks begin demanding more effort than they once did. This is why climbing stairs feels harder. Why shopping becomes tiring. Why even walking across a room can leave someone exhausted.",
      },
      {
        type: "p",
        text: "These changes are not always caused by worsening lung function alone. They are also the result of physical deconditioning - a change that medicines alone cannot fully reverse.",
      },
      {
        type: "h2",
        text: "Pulmonary rehabilitation as a partner, not a replacement",
      },
      {
        type: "p",
        text: "This is where pulmonary rehabilitation becomes an essential partner in recovery. Rather than replacing medicines, it complements them. While medicines help improve airflow, pulmonary rehabilitation helps your body use that improved airflow more effectively. Through carefully prescribed exercise, education and structured progression, it trains the heart, muscles and circulation to work together more efficiently.",
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
        text: "That is why international organisations such as the Global Initiative for Chronic Obstructive Lung Disease (GOLD) and the American Thoracic Society/European Respiratory Society (ATS/ERS) recommend pulmonary rehabilitation alongside optimal medical therapy. These recommendations are based on decades of evidence showing that medicines and rehabilitation address different - but equally important - aspects of COPD management.",
      },
      {
        type: "ul",
        items: [
          "Medicines help manage the disease",
          "Pulmonary rehabilitation helps restore function",
          "Together, they offer the best opportunity to move with greater confidence, participate more fully in everyday life and regain independence",
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
    slug: "cardiac-rehab-after-surgery",
    title: "Why Cardiac Rehabilitation Matters After Heart Surgery",
    excerpt:
      "Hospital discharge is not the finish line. Supervised cardiac rehab rebuilds stamina safely after bypass, angioplasty, or valve surgery.",
    overview:
      "What happens after discharge, why generic gym workouts fall short, and how specialist supervision protects your recovery.",
    publishedAt: "2025-11-12",
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
