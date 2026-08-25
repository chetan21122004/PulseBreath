import { performance } from "node:perf_hooks";
import { buildManifest, findNearDuplicates, loadCatalogue } from "./lib/catalog.mjs";

const requested = Number(process.argv[2] ?? 5000);
const count = Number.isFinite(requested) && requested > 0 ? Math.min(requested, 5000) : 5000;
const catalogue = await loadCatalogue();
const seed = catalogue.pages[0];
if (!seed) throw new Error("At least one page fixture is required for the synthetic benchmark.");

const syntheticPages = Array.from({ length: count }, (_, index) => ({
  ...seed,
  id: `synthetic-scale-fixture-${String(index + 1).padStart(5, "0")}`,
  path: `/rehabilitation/synthetic/fixture-${String(index + 1).padStart(5, "0")}`,
  metadata: { ...seed.metadata, title: `Synthetic fixture ${index + 1}` },
  content: { ...seed.content, h1: `Synthetic infrastructure fixture ${index + 1}` },
  indexing: { requested: false, reason: "Synthetic in-memory benchmark; never publish." },
  publication: { ...seed.publication, status: "draft", preRender: false },
}));

const syntheticCatalogue = { ...catalogue, pages: syntheticPages };
const manifestStart = performance.now();
const manifest = buildManifest(syntheticCatalogue);
const manifestMilliseconds = performance.now() - manifestStart;
const manifestBytes = Buffer.byteLength(JSON.stringify({ pages: manifest }));

const mapStart = performance.now();
const lookup = new Map(manifest.map((page) => [page.path, page]));
const mapMilliseconds = performance.now() - mapStart;
const lookupStart = performance.now();
for (let index = 0; index < 100000; index += 1) {
  lookup.get(manifest[index % manifest.length].path);
}
const lookupMilliseconds = performance.now() - lookupStart;

const duplicateStart = performance.now();
const duplicates = findNearDuplicates(
  syntheticPages,
  catalogue.config.publication.maximumPairSimilarity,
);
const duplicateMilliseconds = performance.now() - duplicateStart;

console.log("Synthetic programmatic SEO infrastructure benchmark (content is never written or published)");
console.log(`Records: ${count}`);
console.log(`Manifest size: ${(manifestBytes / 1024 / 1024).toFixed(2)} MiB uncompressed`);
console.log(`Manifest compilation: ${manifestMilliseconds.toFixed(1)} ms`);
console.log(`Path-map construction: ${mapMilliseconds.toFixed(1)} ms`);
console.log(`100,000 path lookups: ${lookupMilliseconds.toFixed(1)} ms`);
console.log(`Bounded near-duplicate scan: ${duplicateMilliseconds.toFixed(1)} ms`);
console.log(`Near-duplicates caught: ${duplicates.length}`);
