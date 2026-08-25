import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildManifest, dataRoot, loadCatalogue, manifestPath } from "./lib/catalog.mjs";

const catalogue = await loadCatalogue();
const manifest = buildManifest(catalogue);
const latestContentDate = catalogue.pages.reduce(
  (latest, page) => (page.publication.updatedAt > latest ? page.publication.updatedAt : latest),
  "1970-01-01",
);

if (manifest.length > catalogue.config.rendering.maximumApprovedPages) {
  throw new Error(
    `Catalogue has ${manifest.length} pages, above configured maximum ${catalogue.config.rendering.maximumApprovedPages}.`,
  );
}

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(
  manifestPath,
  `${JSON.stringify({ contentVersion: catalogue.config.version, generatedAt: latestContentDate, pages: manifest }, null, 2)}\n`,
  "utf8",
);

const indexable = manifest.filter((page) => page.indexable).length;
console.log(`Programmatic SEO manifest: ${manifest.length} records, ${indexable} indexable.`);
console.log(path.relative(dataRoot, manifestPath));
