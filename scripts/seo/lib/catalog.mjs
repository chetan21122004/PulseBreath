import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
export const dataRoot = path.join(repoRoot, "data", "programmatic-seo");
export const pagesRoot = path.join(dataRoot, "pages");
export const manifestPath = path.join(dataRoot, "manifest.generated.json");

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

export async function loadCatalogue() {
  const [config, referencesFile, keywordFile, entities, pageSchema] = await Promise.all([
    readJson(path.join(dataRoot, "config.json")),
    readJson(path.join(dataRoot, "references.json")),
    readJson(path.join(dataRoot, "keyword-clusters.json")),
    readJson(path.join(dataRoot, "entities.json")),
    readJson(path.join(dataRoot, "programmatic-page.schema.json")),
  ]);

  const shardFiles = (await readdir(pagesRoot))
    .filter((file) => file.endsWith(".json"))
    .sort();
  const shards = await Promise.all(
    shardFiles.map(async (file) => ({
      file,
      data: await readJson(path.join(pagesRoot, file)),
    })),
  );

  return {
    config,
    references: referencesFile.references ?? [],
    keywordClusters: keywordFile.clusters ?? [],
    entities,
    pageSchema,
    shards,
    pages: shards.flatMap(({ file, data }) =>
      (data.pages ?? []).map((page) => ({ ...page, __shard: file })),
    ),
  };
}

function schemaReference(rootSchema, reference) {
  if (!reference.startsWith("#/")) throw new Error(`Only local schema references are supported: ${reference}`);
  return reference
    .slice(2)
    .split("/")
    .reduce((value, segment) => value?.[segment.replace(/~1/g, "/").replace(/~0/g, "~")], rootSchema);
}

function matchesType(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === type;
}

export function validateJsonSchema(value, schema, rootSchema = schema, pointer = "$") {
  if (schema.$ref) {
    const resolved = schemaReference(rootSchema, schema.$ref);
    return resolved
      ? validateJsonSchema(value, resolved, rootSchema, pointer)
      : [`${pointer}: unresolved schema reference ${schema.$ref}`];
  }

  const errors = [];
  const expectedTypes = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : [];
  if (expectedTypes.length && !expectedTypes.some((type) => matchesType(value, type))) {
    return [`${pointer}: expected ${expectedTypes.join(" or ")}`];
  }
  if (schema.enum && !schema.enum.some((item) => Object.is(item, value))) {
    errors.push(`${pointer}: value is not in the allowed enum`);
  }

  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${pointer}: minimum string length is ${schema.minLength}`);
    }
    if (schema.pattern && !new RegExp(schema.pattern, "u").test(value)) {
      errors.push(`${pointer}: value does not match ${schema.pattern}`);
    }
    if (schema.format === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      errors.push(`${pointer}: expected ISO date YYYY-MM-DD`);
    }
  }

  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${pointer}: minimum array length is ${schema.minItems}`);
    }
    if (schema.uniqueItems) {
      const serialized = value.map((item) => JSON.stringify(item));
      if (new Set(serialized).size !== serialized.length) errors.push(`${pointer}: array items must be unique`);
    }
    if (schema.items) {
      value.forEach((item, index) => {
        errors.push(...validateJsonSchema(item, schema.items, rootSchema, `${pointer}[${index}]`));
      });
    }
  }

  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const required of schema.required ?? []) {
      if (!(required in value)) errors.push(`${pointer}.${required}: required property is missing`);
    }
    if (schema.additionalProperties === false && schema.properties) {
      for (const key of Object.keys(value)) {
        if (!(key in schema.properties)) errors.push(`${pointer}.${key}: unexpected property`);
      }
    }
    for (const [key, childSchema] of Object.entries(schema.properties ?? {})) {
      if (key in value) {
        errors.push(...validateJsonSchema(value[key], childSchema, rootSchema, `${pointer}.${key}`));
      }
    }
  }

  return errors;
}

export function pageText(page) {
  const parts = [
    page.content?.h1,
    page.content?.summary,
    ...(page.content?.keyTakeaways ?? []),
    ...(page.content?.sections ?? []).flatMap((section) => [
      section.heading,
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []),
    ]),
    page.content?.safetyTitle,
    ...(page.content?.safetyPoints ?? []),
    ...(page.content?.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
    page.content?.cta?.heading,
    page.content?.cta?.body,
  ];
  return parts.filter(Boolean).join(" ");
}

export function wordCount(value) {
  return String(value)
    .trim()
    .split(/\s+/u)
    .filter(Boolean).length;
}

export function normalizeKeyword(value) {
  return String(value)
    .toLocaleLowerCase("en-IN")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function contentChecks(page, catalogue) {
  const { config, references, keywordClusters } = catalogue;
  const rules = config.publication;
  const issues = [];
  const referenceIds = new Set(references.map((reference) => reference.id));
  const clusterIds = new Set(keywordClusters.map((cluster) => cluster.id));
  const text = pageText(page);
  const words = wordCount(text);
  let score = 0;

  if (!page.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.id)) {
    issues.push("id must be a lowercase kebab-case value");
  }
  if (!page.path?.startsWith(`${config.routePrefix}/`) || /[A-Z?#]/.test(page.path ?? "")) {
    issues.push(`path must be a lowercase canonical below ${config.routePrefix}`);
  }
  if (page.__shard && page.__shard !== `${page.serviceLine}.json`) {
    issues.push(`serviceLine ${page.serviceLine} does not match shard ${page.__shard}`);
  }

  const titleLength = page.metadata?.title?.length ?? 0;
  const descriptionLength = page.metadata?.description?.length ?? 0;
  if (titleLength > 0 && titleLength <= rules.maximumTitleLength) score += 10;
  else issues.push(`metadata title must be 1-${rules.maximumTitleLength} characters`);
  if (
    descriptionLength >= rules.minimumMetaDescriptionLength &&
    descriptionLength <= rules.maximumMetaDescriptionLength
  ) {
    score += 10;
  } else {
    issues.push(
      `meta description must be ${rules.minimumMetaDescriptionLength}-${rules.maximumMetaDescriptionLength} characters`,
    );
  }

  if (words >= rules.minimumWordCount) score += 15;
  else issues.push(`content has ${words} words; minimum is ${rules.minimumWordCount}`);

  if ((page.content?.sections?.length ?? 0) >= rules.minimumSections) score += 10;
  else issues.push(`minimum ${rules.minimumSections} substantive sections required`);

  const missingReferences = (page.evidence?.referenceIds ?? []).filter(
    (id) => !referenceIds.has(id),
  );
  if (
    (page.evidence?.referenceIds?.length ?? 0) >= rules.minimumReferences &&
    missingReferences.length === 0
  ) {
    score += 15;
  } else {
    issues.push(
      missingReferences.length
        ? `unknown reference IDs: ${missingReferences.join(", ")}`
        : `minimum ${rules.minimumReferences} references required`,
    );
  }

  if ((page.content?.faqs?.length ?? 0) >= rules.minimumFaqs) score += 10;
  else issues.push(`minimum ${rules.minimumFaqs} page-specific FAQs required`);

  if ((page.links?.length ?? 0) >= rules.minimumInternalLinks) score += 10;
  else issues.push(`minimum ${rules.minimumInternalLinks} internal links required`);

  if ((page.quality?.uniqueValueSignals?.length ?? 0) >= rules.minimumUniqueValueSignals) {
    score += 10;
  } else {
    issues.push(`minimum ${rules.minimumUniqueValueSignals} unique-value signals required`);
  }

  if ((page.content?.safetyPoints?.length ?? 0) >= 3) score += 5;
  else issues.push("minimum 3 condition-specific safety points required");

  if (page.keyword?.clusterId && clusterIds.has(page.keyword.clusterId)) score += 5;
  else issues.push(`keyword cluster ${page.keyword?.clusterId ?? "(missing)"} is not researched`);

  const forbidden = rules.forbiddenClaims.filter((claim) =>
    normalizeKeyword(text).includes(normalizeKeyword(claim)),
  );
  if (forbidden.length) issues.push(`forbidden medical/marketing claims: ${forbidden.join(", ")}`);

  const market = page.taxonomy?.market;
  if (market?.kind !== "national") {
    if (!config.geography.locationPagesEnabled) {
      issues.push("regional page generation is disabled in config");
    }
    if (!market?.verifiedLocalPresence) {
      issues.push("regional page lacks verified local presence");
    }
    if ((market?.localProof?.length ?? 0) < config.geography.minimumLocalProofItems) {
      issues.push(
        `regional page needs at least ${config.geography.minimumLocalProofItems} local-proof items`,
      );
    }
  }

  return { issues: [...new Set(issues)], score, words };
}

export function evaluatePage(page, catalogue) {
  const evaluation = contentChecks(page, catalogue);
  const workflowIssues = [];
  const medicalReview = page.evidence?.medicalReview;

  if (page.indexing?.requested && page.publication?.status !== "approved") {
    workflowIssues.push("indexing requested before publication status is approved");
  }
  if (page.publication?.status === "approved" && medicalReview?.status !== "approved") {
    workflowIssues.push("publication approved before medical review is approved");
  }
  if (medicalReview?.status === "approved" && !medicalReview.reviewedAt) {
    workflowIssues.push("approved medical review has no reviewedAt date");
  }

  const indexable =
    page.indexing?.requested === true &&
    page.publication?.status === "approved" &&
    medicalReview?.status === "approved" &&
    Boolean(medicalReview?.reviewedAt) &&
    evaluation.score >= catalogue.config.publication.minimumQualityScore &&
    evaluation.issues.length === 0 &&
    workflowIssues.length === 0;

  return { ...evaluation, workflowIssues, indexable };
}

function tokens(value) {
  return normalizeKeyword(value).split(" ").filter((token) => token.length > 2);
}

function shingles(value, size = 5) {
  const source = tokens(value);
  const result = new Set();
  for (let index = 0; index <= source.length - size; index += 1) {
    result.add(source.slice(index, index + size).join(" "));
  }
  return result;
}

function hash32(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function similaritySignature(items, size = 32) {
  return [...new Set([...items].map(hash32))]
    .sort((left, right) => left - right)
    .slice(0, size);
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  const smaller = a.size < b.size ? a : b;
  const larger = smaller === a ? b : a;
  for (const item of smaller) if (larger.has(item)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

export function contentSimilarity(left, right) {
  const a = shingles(pageText(left));
  const b = shingles(pageText(right));
  return jaccard(a, b);
}

/**
 * Bottom-k locality-sensitive buckets avoid an O(n²) full comparison at 5k pages.
 * Each page is compared with a bounded set of earlier representatives and stops
 * after its first confirmed near-duplicate.
 */
export function findNearDuplicates(pages, threshold, maxRepresentativesPerBucket = 32) {
  const buckets = new Map();
  const representatives = [];
  const duplicates = [];

  for (const page of pages) {
    const pageShingles = shingles(pageText(page));
    const signature = similaritySignature(pageShingles);
    const candidateIndexes = new Set();
    for (const hash of signature) {
      for (const index of buckets.get(hash) ?? []) candidateIndexes.add(index);
    }

    let duplicate = null;
    for (const index of candidateIndexes) {
      const candidate = representatives[index];
      const similarity = jaccard(pageShingles, candidate.shingles);
      if (similarity > threshold) {
        duplicate = { left: candidate.page, right: page, similarity };
        duplicates.push(duplicate);
        break;
      }
    }

    if (duplicate) continue;

    const representativeIndex = representatives.length;
    representatives.push({ page, shingles: pageShingles });
    for (const hash of signature) {
      const entries = buckets.get(hash) ?? [];
      if (entries.length < maxRepresentativesPerBucket) entries.push(representativeIndex);
      buckets.set(hash, entries);
    }
  }

  return duplicates;
}

export function buildManifest(catalogue) {
  return catalogue.pages
    .map((page) => {
      const evaluation = evaluatePage(page, catalogue);
      return {
        id: page.id,
        path: page.path,
        slug: page.path
          .slice(catalogue.config.routePrefix.length + 1)
          .split("/")
          .filter(Boolean),
        serviceLine: page.serviceLine,
        locale: page.locale,
        title: page.metadata.title,
        description: page.metadata.description,
        h1: page.content.h1,
        conditionName: page.taxonomy.conditionName,
        status: page.publication.status,
        medicalReviewStatus: page.evidence.medicalReview.status,
        indexingRequested: page.indexing.requested,
        preRender: page.publication.preRender,
        lastModified: page.publication.updatedAt,
        qualityScore: evaluation.score,
        qualityIssues: [...evaluation.issues, ...evaluation.workflowIssues],
        indexable: evaluation.indexable,
      };
    })
    .sort((left, right) => left.path.localeCompare(right.path));
}
