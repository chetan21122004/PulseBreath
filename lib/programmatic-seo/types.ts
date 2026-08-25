export type SeoServiceLine = "pulmonary" | "cardiac" | "metabolic" | "tele-rehabilitation";
export type SeoPublicationStatus =
  | "draft"
  | "ready-for-clinical-review"
  | "approved"
  | "retired";
export type SeoMedicalReviewStatus =
  | "pending"
  | "changes-requested"
  | "source-content-verified"
  | "approved";
export type SeoSearchIntent =
  | "informational"
  | "commercial-investigation"
  | "transactional"
  | "navigational";

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoContentSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoPageLink = {
  label: string;
  href: string;
  relationship: "parent" | "related" | "service" | "next-step";
};

export type ProgrammaticSeoPage = {
  id: string;
  path: string;
  serviceLine: SeoServiceLine;
  locale: string;
  pageType:
    | "condition-intent"
    | "recovery-stage"
    | "symptom-question"
    | "national-service"
    | "regional-service";
  publication: {
    status: SeoPublicationStatus;
    createdAt: string;
    updatedAt: string;
    preRender: boolean;
  };
  indexing: {
    requested: boolean;
    reason: string;
  };
  taxonomy: {
    conditionId: string;
    conditionName: string;
    intentId: string;
    intentName: string;
    recoveryStage?: string;
    audience: string[];
    market: {
      id: string;
      kind: "national" | "state" | "city";
      verifiedLocalPresence: boolean;
      localProof: Array<{ type: string; detail: string }>;
    };
  };
  keyword: {
    clusterId: string;
    primary: string;
    secondary: string[];
    intent: SeoSearchIntent;
  };
  metadata: {
    title: string;
    description: string;
  };
  content: {
    eyebrow: string;
    h1: string;
    summary: string;
    keyTakeaways: string[];
    sections: SeoContentSection[];
    safetyTitle: string;
    safetyPoints: string[];
    faqs: SeoFaq[];
    cta: {
      heading: string;
      body: string;
      label: string;
      href: string;
    };
  };
  evidence: {
    referenceIds: string[];
    authorId: string;
    assignedReviewerId: string;
    medicalReview: {
      status: SeoMedicalReviewStatus;
      reviewedAt: string | null;
      notes: string;
    };
  };
  links: SeoPageLink[];
  quality: {
    uniqueValueSignals: string[];
    sourceNotes: string;
  };
};

export type SeoReference = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedYear: number;
  topics: string[];
  sourceType: string;
};

export type SeoPerson = {
  id: string;
  name: string;
  honorificSuffix: string;
  role: string;
  profilePath: string;
  credentials: string[];
};

export type SeoPageManifest = {
  id: string;
  path: string;
  slug: string[];
  serviceLine: SeoServiceLine;
  locale: string;
  title: string;
  description: string;
  h1: string;
  conditionName: string;
  status: SeoPublicationStatus;
  medicalReviewStatus: SeoMedicalReviewStatus;
  indexingRequested: boolean;
  preRender: boolean;
  lastModified: string;
  qualityScore: number;
  qualityIssues: string[];
  indexable: boolean;
};
