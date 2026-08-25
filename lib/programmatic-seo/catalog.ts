import "server-only";

import configRaw from "@/data/programmatic-seo/config.json";
import entitiesRaw from "@/data/programmatic-seo/entities.json";
import manifestRaw from "@/data/programmatic-seo/manifest.generated.json";
import referencesRaw from "@/data/programmatic-seo/references.json";
import type {
  ProgrammaticSeoPage,
  SeoPageManifest,
  SeoPerson,
  SeoReference,
  SeoServiceLine,
} from "./types";

type PageShard = { pages: ProgrammaticSeoPage[] };

const config = configRaw;
const manifests = manifestRaw.pages as SeoPageManifest[];
const references = referencesRaw.references as SeoReference[];
const people = entitiesRaw.people as SeoPerson[];

const shardLoaders: Record<SeoServiceLine, () => Promise<PageShard>> = {
  pulmonary: async () =>
    (await import("@/data/programmatic-seo/pages/pulmonary.json")).default as PageShard,
  cardiac: async () =>
    (await import("@/data/programmatic-seo/pages/cardiac.json")).default as PageShard,
  metabolic: async () =>
    (await import("@/data/programmatic-seo/pages/metabolic.json")).default as PageShard,
  "tele-rehabilitation": async () =>
    (await import("@/data/programmatic-seo/pages/tele-rehabilitation.json")).default as PageShard,
};

const manifestByPath = new Map(manifests.map((page) => [page.path, page]));
const referenceById = new Map(references.map((reference) => [reference.id, reference]));
const personById = new Map(people.map((person) => [person.id, person]));

function pathFromSlug(slug: readonly string[]) {
  if (!slug.length || slug.some((segment) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment))) {
    return null;
  }
  return `${config.routePrefix}/${slug.join("/")}`;
}

export function getAllSeoManifests() {
  return manifests;
}

export function getSeoManifestBySlug(slug: readonly string[]) {
  const path = pathFromSlug(slug);
  return path ? manifestByPath.get(path) : undefined;
}

export function isPublishableSeoManifest(page: SeoPageManifest) {
  return (
    page.status === "approved" &&
    page.medicalReviewStatus === "approved" &&
    page.qualityScore >= config.publication.minimumQualityScore &&
    page.qualityIssues.length === 0
  );
}

export function isIndexableSeoManifest(page: SeoPageManifest) {
  return page.indexable && isPublishableSeoManifest(page);
}

export function getIndexableSeoManifests() {
  return manifests.filter(isIndexableSeoManifest);
}

export function getPreRenderedSeoManifests() {
  return getIndexableSeoManifests()
    .filter((page) => page.preRender)
    .sort((left, right) => right.qualityScore - left.qualityScore)
    .slice(0, config.rendering.preRenderLimit);
}

export async function loadSeoPage(manifest: SeoPageManifest) {
  const shard = await shardLoaders[manifest.serviceLine]();
  return shard.pages.find((page) => page.id === manifest.id);
}

export function getSeoReferences(referenceIds: readonly string[]) {
  return referenceIds
    .map((id) => referenceById.get(id))
    .filter((reference): reference is SeoReference => Boolean(reference));
}

export function getSeoPerson(id: string) {
  return personById.get(id);
}

export function getRelatedSeoManifests(page: ProgrammaticSeoPage) {
  const relatedPaths = new Set(
    page.links
      .filter((link) => link.href.startsWith(`${config.routePrefix}/`))
      .map((link) => link.href),
  );
  return manifests.filter(
    (manifest) => relatedPaths.has(manifest.path) && isIndexableSeoManifest(manifest),
  );
}
