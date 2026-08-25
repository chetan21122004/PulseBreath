import { loadCatalogue } from "./lib/catalog.mjs";

const catalogue = await loadCatalogue();
const demandScores = { high: 5, medium: 3.5, low: 2, unknown: 1 };

function score(cluster) {
  const input = cluster.scoreInputs;
  return Math.round(
    ((demandScores[cluster.directionalDemand] ?? 1) * 20 +
      input.businessRelevance * 25 +
      input.clinicalAuthority * 20 +
      input.conversionIntent * 20 +
      input.serpOpportunity * 15) /
      5,
  );
}

const rows = catalogue.keywordClusters
  .map((cluster) => ({ ...cluster, opportunityScore: score(cluster) }))
  .sort(
    (left, right) =>
      left.priorityTier - right.priorityTier || right.opportunityScore - left.opportunityScore,
  );

console.log("Keyword opportunity report — India");
console.log("Exact volumes remain pending until Keyword Planner/Search Console data is imported.\n");
console.log("Tier | Score | Demand | Intent | Primary keyword | Suggested path");
console.log("--- | ---: | --- | --- | --- | ---");
for (const row of rows) {
  console.log(
    `${row.priorityTier} | ${row.opportunityScore} | ${row.directionalDemand} | ${row.intent} | ${row.primaryKeyword} | ${row.suggestedPath ?? "BLOCKED"}`,
  );
}

const missingMetrics = rows.filter(
  (row) => row.metrics.averageMonthlySearches == null || row.metrics.impressions == null,
).length;
console.log(`\n${missingMetrics}/${rows.length} clusters are awaiting first-party performance data.`);
