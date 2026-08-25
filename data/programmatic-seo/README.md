# Programmatic SEO data

This directory is a controlled editorial catalogue, not a Cartesian page generator.

- `dimensions.json` defines reusable research dimensions.
- `keyword-clusters.json` stores researched seed hypotheses, while
  `keyword-clusters.generated.json` stores the source-derived cohort keywords.
- `pages/*.json` stores complete page records, sharded by service line.
- `references.json` and `entities.json` hold reusable evidence and authorship records.
- `manifest.generated.json` is the compact server index used by routes and the sitemap.
- `programmatic-page.schema.json` documents the page contract.

A record is public only when all three signals agree:

1. `publication.status` is `approved`.
2. `evidence.medicalReview.status` is either `approved` after page-level review
   or `source-content-verified` for claims constrained to published site content.
3. `indexing.requested` is `true` and the automated quality checks pass.

Drafts are not pre-rendered, served in production, or placed in the sitemap. City and state pages are disabled by default. Hindi pages remain disabled until the full page, navigation and clinical review are completed in Hindi.

Run:

```text
npm run seo:prepare
npm run seo:report
npm run seo:import-metrics -- --keyword-planner path/to/export.csv --search-console path/to/export.csv
```

Rebuild the checked-in 200-page source-derived cohort before preparing it:

```text
npm run seo:generate-derived
npm run seo:prepare
```

`source-content-verified` does not claim individual clinical review. Any new
protocol, dosage, medical claim or outcome statement must use the clinical
review workflow instead.

Imported performance files are written below `generated/` and ignored by Git. Editorial page JSON must never contain private patient or analytics data.
