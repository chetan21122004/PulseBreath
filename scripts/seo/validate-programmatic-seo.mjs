import { buildManifest, findNearDuplicates, loadCatalogue, normalizeKeyword, validateJsonSchema } from "./lib/catalog.mjs";

const catalogue = await loadCatalogue();
const manifest = buildManifest(catalogue);
const errors = [];
const warnings = [];
const ids = new Map();
const paths = new Map();
const titles = new Map();
const primaryKeywords = new Map();
const pagePaths = new Set(catalogue.pages.map((page) => page.path));

for (const shard of catalogue.shards) {
  for (const issue of validateJsonSchema(shard.data, catalogue.pageSchema)) {
    errors.push(`${shard.file} ${issue}`);
  }
}

function duplicateCheck(map, key, page, label) {
  if (!key) return;
  const previous = map.get(key);
  if (previous) errors.push(`${label} duplicated by ${previous.id} and ${page.id}: ${key}`);
  else map.set(key, page);
}

for (const page of catalogue.pages) {
  duplicateCheck(ids, page.id, page, "ID");
  duplicateCheck(paths, page.path, page, "Path");
  duplicateCheck(titles, normalizeKeyword(page.metadata?.title), page, "Title");
  duplicateCheck(
    primaryKeywords,
    normalizeKeyword(page.keyword?.primary),
    page,
    "Primary keyword",
  );

  const record = manifest.find((item) => item.id === page.id);
  for (const issue of record?.qualityIssues ?? []) errors.push(`${page.id}: ${issue}`);

  for (const link of page.links ?? []) {
    if (!link.href?.startsWith("/")) errors.push(`${page.id}: non-internal link ${link.href}`);
    if (
      link.href?.startsWith(`${catalogue.config.routePrefix}/`) &&
      !pagePaths.has(link.href)
    ) {
      errors.push(`${page.id}: related programmatic path is not in the catalogue: ${link.href}`);
    }
  }

  if (!record?.indexable) {
    warnings.push(
      `${page.id}: excluded from production routes and sitemap (${page.publication.status}; review ${page.evidence.medicalReview.status}; indexing ${page.indexing.requested}).`,
    );
  }
}

for (const duplicate of findNearDuplicates(
  catalogue.pages,
  catalogue.config.publication.maximumPairSimilarity,
)) {
  errors.push(
    `${duplicate.left.id} and ${duplicate.right.id} have ${(duplicate.similarity * 100).toFixed(1)}% five-word-shingle similarity; maximum is ${(catalogue.config.publication.maximumPairSimilarity * 100).toFixed(0)}%.`,
  );
}

const approvedCount = manifest.filter((page) => page.indexable).length;
console.log(
  `Validated ${catalogue.pages.length} page records across ${catalogue.shards.length} shards; ${approvedCount} are indexable.`,
);
for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);

if (errors.length) {
  console.error(`Programmatic SEO validation failed with ${errors.length} error(s).`);
  process.exitCode = 1;
} else {
  console.log("Programmatic SEO validation passed.");
}
