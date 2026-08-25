# Programmatic SEO data

This directory is a controlled editorial catalogue, not a Cartesian page generator.

- `dimensions.json` defines reusable research dimensions.
- `keyword-clusters.json` stores keyword hypotheses and nullable performance metrics.
- `pages/*.json` stores complete page records, sharded by service line.
- `references.json` and `entities.json` hold reusable evidence and authorship records.
- `manifest.generated.json` is the compact server index used by routes and the sitemap.
- `programmatic-page.schema.json` documents the page contract.

A record is public only when all three signals agree:

1. `publication.status` is `approved`.
2. `evidence.medicalReview.status` is `approved` with a real `reviewedAt` date.
3. `indexing.requested` is `true` and the automated quality checks pass.

Drafts are not pre-rendered, served in production, or placed in the sitemap. City and state pages are disabled by default. Hindi pages remain disabled until the full page, navigation and clinical review are completed in Hindi.

Run:

```text
npm run seo:prepare
npm run seo:report
npm run seo:import-metrics -- --keyword-planner path/to/export.csv --search-console path/to/export.csv
```

Imported performance files are written below `generated/` and ignored by Git. Editorial page JSON must never contain private patient or analytics data.
