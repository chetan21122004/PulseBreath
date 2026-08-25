# PulseBreath programmatic SEO research and implementation plan

Date: 26 August 2026  
Market: India  
Primary service model: specialist-led cardiac, pulmonary and metabolic rehabilitation, including supervised online delivery

## Executive decision

PulseBreath can support thousands of technically routable pages, but it must not automatically publish a Cartesian product of condition × intent × state × city × language. The safe unit is an explicit, clinically reviewed page record that answers a distinct patient decision.

The implementation now separates:

1. **Research dimensions** — reusable conditions, intents, stages, markets and languages.
2. **Keyword opportunities** — hypotheses with directional demand and nullable performance fields.
3. **Editorial page records** — complete, page-specific copy and safety content.
4. **Approved manifest** — the only records that production routes and the sitemap may expose.

This allows a 1,000–5,000-record catalogue without allowing automation to publish low-value or medically unreviewed pages.

## What the research found

### Current search footprint

A public Google `site:` sample showed that Google is already discovering the homepage, cardiac and pulmonary category pages, the COPD program, metabolic programs and blog articles. It also exposed a legacy indexed URL at `/services/cardiac/post-ptca-angioplasty`. A permanent redirect now consolidates that URL into the current cardiac events and procedures page.

A `site:` query is not a performance report. It cannot provide reliable click, impression, CTR, ranking or total-indexed counts. Those metrics must come from the verified Search Console property.

### India SERP pattern

The observed Google India result set for `online pulmonary rehabilitation India` mixed:

- large hospital education pages;
- a specialist online pulmonary rehabilitation provider;
- local rehabilitation centres;
- physiotherapy networks;
- clinical research.

Related searches included online pulmonary rehabilitation programs, rehabilitation centres in India, pulmonary rehabilitation exercises and near-me terms. This supports national service, condition-intent and exercise-education clusters. It does **not** justify generating a page for every city.

The full observation is stored in [`research-snapshots.json`](../data/programmatic-seo/research-snapshots.json). Keyword hypotheses are stored in [`keyword-clusters.json`](../data/programmatic-seo/keyword-clusters.json).

### Live performance baseline

The public mobile PageSpeed Insights run on 26 August 2026 reported:

| Metric | Live homepage result |
|---|---:|
| Field data | No Data |
| Lighthouse performance | 60 |
| Lighthouse SEO | 100 |
| FCP | 1.7 s |
| LCP | 21.7 s |
| TBT | 230 ms |
| CLS | 0 |
| Total payload | 16,634 KiB |
| Estimated image savings | 4,416 KiB |

[Open the recorded PageSpeed report](https://pagespeed.web.dev/analysis/https-www-pulsebreathphysiotherapy-in/vim5ewrdyf?form_factor=mobile).

Lighthouse's SEO score checks technical basics, not content quality, authority, usefulness or ranking strength. The large payload and LCP are the immediate performance risk. The new programmatic renderer contains no hero image, carousel, video or page-specific client component. It renders the main article on the server.

### Existing architecture risk

The existing 13 program pages are built from a UI-coupled TypeScript catalogue that includes icons and imports the full catalogue into client components. The program page is also a large client component. Copying that pattern to 1,000–5,000 pages would:

- pre-render every record on every deployment;
- push the catalogue into client bundles;
- produce unbounded navigation and related-page lists;
- increase build output roughly linearly;
- make editorial review and indexation control difficult.

The audit estimated the current generated artifact footprint at roughly 243 MiB for 1,000 similarly built pages and 1.19 GiB for 5,000 before richer content. That projection is a warning about the old renderer, not the new server-first catalogue.

## Keyword plan

Exact volume is intentionally not shown yet. No authenticated Google Ads Keyword Planner or PulseBreath Search Console data was available during research. Google states that Keyword Planner volume is rounded, location-dependent historical data, while Search Console measures the site's actual impressions, clicks, CTR and average position. Inventing those values would make the planning file less trustworthy.

Initial priority clusters:

| Tier | Cluster | Intent | Directional demand | Why it comes first |
|---:|---|---|---|---|
| 1 | Pulmonary rehabilitation for COPD | Commercial investigation | High | Core service-condition match |
| 1 | COPD rehabilitation at home | Commercial investigation | Medium | Strong fit for supervised online delivery |
| 1 | Online pulmonary rehabilitation India | Transactional | Medium | National access proposition |
| 1 | Pulmonary rehabilitation exercises | Informational | High | Visible related-query demand and hub potential |
| 1 | Bronchiectasis airway clearance | Informational | Medium | Specialist, clinically specific long tail |
| 1 | ILD pulmonary rehabilitation | Commercial investigation | Low | Lower volume but strong specialist authority and SERP gap |
| 1 | Cardiac rehabilitation after angioplasty | Commercial investigation | High | High-intent recovery query |
| 1 | Cardiac rehabilitation after CABG | Commercial investigation | High | High-intent recovery query |
| 1 | Cardiac rehabilitation after heart attack | Commercial investigation | High | Guideline-aligned core pathway |
| 1 | Online cardiac rehabilitation India | Transactional | Medium | Strong national service fit |
| 1 | Heart failure exercise rehabilitation | Commercial investigation | Medium | Specialist fit with important suitability gates |
| 1 | Tele-rehabilitation effectiveness and suitability | Informational | Low | Resolves a major trust objection |
| 2 | Cardiac rehabilitation cost in India | Transactional | Low | Publish only with approved, transparent pricing information |
| 2 | Online supervised diabetes exercise | Transactional | Medium | Useful after cardiac/pulmonary authority is established |
| 3 | Shortness of breath while walking | Informational | High | Broad differential diagnosis; must not become a thin lead funnel |
| 4 | `[service] in [city]` | Transactional | Unknown | Blocked unless there is verified local value |

Run `npm run seo:report` to reproduce the weighted opportunity table from JSON.

## How to obtain real keyword performance

### Google Search Console

Export the last 16 months with:

- Search type: Web;
- Country: India;
- dimensions: Query and Page;
- metrics: Clicks, Impressions, CTR and Position;
- a comparison between the latest 28/90 days and the preceding period.

Search Console's own guidance recommends focusing on impression and click trends rather than treating average position as an exact rank. It also omits anonymised queries and may truncate lower-volume rows. At larger scale, daily Search Console bulk export to BigQuery is more complete than manual CSV exports.

### Google Ads Keyword Planner

Export India historical metrics for the researched keyword list:

- average monthly searches;
- advertiser competition and index;
- top-of-page bid ranges;
- monthly history where available.

Ads competition is not organic SEO difficulty. It is a commercial-demand signal.

### Import command

```text
npm run seo:import-metrics -- \
  --keyword-planner path/to/keyword-planner.csv \
  --search-console path/to/search-console-queries.csv
```

The generated metrics file is ignored by Git so private analytics do not leak into public editorial JSON.

## Page families and realistic scale

### Phase-one families

1. National service pages: online pulmonary, cardiac and metabolic rehabilitation in India.
2. Condition × program pages: COPD, bronchiectasis, ILD, asthma, heart failure and stable cardiac disease.
3. Procedure × recovery pages: angioplasty, CABG, heart attack, valve surgery and lobectomy.
4. Condition × patient-intent pages: at home, eligibility, safety, monitoring, duration and after discharge.
5. Specific question pages: exercise after angioplasty, oxygen and exercise in ILD, airway clearance in bronchiectasis.
6. Tele-rehabilitation trust pages: how it works, suitability, equipment, monitoring and limitations.

### Legitimate route to 1,000+ pages

A defensible catalogue could eventually contain:

- 20–30 clinically supported conditions/procedures;
- 6–10 applicable intents per condition, based on explicit mappings rather than every possible combination;
- 50–150 symptom/task questions with distinct evaluation and red-flag content;
- 100–300 recovery-stage and caregiver guides;
- complete Hindi versions after human translation and separate clinical review;
- additional languages only when PulseBreath can genuinely serve and review them.

This can reach four figures through useful condition, stage, task and language coverage. Geography is not required to reach scale.

### Geographic policy

Location generation is disabled in [`config.json`](../data/programmatic-seo/config.json). A state or city record needs at least:

- verified service availability or a real physical/partner presence;
- supported language information;
- a distinct referral or access pathway;
- useful regional information that cannot be created by replacing the place name.

Virtual coverage does not justify `LocalBusiness` markup for every city. The national online-service page should answer generic India coverage queries.

Google explicitly identifies substantially similar city/region pages that funnel visitors to one service as doorway abuse. See [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies) and [LocalBusiness structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## JSON and rendering architecture

```text
dimensions + keyword research
            │
            ▼
explicit page records by service-line shard
            │
            ▼
compile + schema/quality/duplicate checks
            │
            ▼
compact approved manifest
       ┌────┴────┐
       ▼         ▼
dynamic route   sitemap
       │
       ▼
server-rendered article + bounded related links
```

Key implementation choices:

- Content is split into `pulmonary.json`, `cardiac.json`, `metabolic.json` and `tele-rehabilitation.json`.
- Production routing starts with the compact manifest and dynamically loads only the relevant service-line shard.
- Unknown paths return a real 404.
- Unapproved records also return 404 in production; they are visible only as marked previews during local development.
- The top approved cohort can be pre-rendered, capped at 200. Other approved records render on first request and are cached with 24-hour ISR.
- The sitemap imports only the compact manifest and includes only canonical, approved and indexable pages.
- A leaf page shows a maximum bounded set of related links; global navigation never imports all 5,000 records.
- Visible FAQs remain useful to patients, but the implementation does not rely on FAQ rich results. Google retired those results in 2026.

Next.js supports pre-rendering a subset of dynamic parameters while rendering the rest on demand. See [Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params).

## Publication gate

A page cannot become indexable unless all checks pass:

1. Path, ID, title and primary keyword are unique.
2. Search intent and patient decision are explicit.
3. At least four substantive sections are complete.
4. The page has condition-specific assessment, safety and escalation content.
5. At least two valid authoritative references exist.
6. At least three page-specific FAQs and internal links exist.
7. At least three recorded unique-value signals explain why the page deserves to exist.
8. Forbidden cure, guarantee, medication-change and no-risk claims are absent.
9. Near-duplicate similarity stays below the internal 64% five-word-shingle threshold.
10. The assigned clinician records approval and a real review date.
11. `publication.status` is `approved`.
12. `indexing.requested` is `true`.

Google has no preferred word count. The 700-word internal floor is a completeness warning, not a ranking formula. Editors should remove repetition rather than pad copy.

The hard gate is based on Google's people-first/YMYL guidance: clear sources, expert authorship or review, factual accuracy and useful original value. See [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

## Scale performance

`npm run seo:benchmark -- 5000` completed an in-memory synthetic infrastructure test with:

| Check | 5,000-record result |
|---|---:|
| Compact manifest | 3.07 MiB uncompressed |
| Manifest compilation | 16.7 s |
| Path-map construction | 4.1 ms |
| 100,000 path lookups | 24.1 ms |
| Bounded near-duplicate scan | 14.8 s |
| Deliberate duplicate fixtures caught | 4,999 / 4,999 |

This is not a 5,000-page Next.js rendering benchmark and does not claim ranking readiness. It proves that the manifest lookup and quality plumbing remain practical at the requested catalogue size. A real 100-page approved cohort must be built and measured before raising the pre-render cap.

Performance budgets are defined in [`performance-budgets.json`](../data/programmatic-seo/performance-budgets.json):

- field p75 LCP ≤ 2.5 s;
- field p75 INP ≤ 200 ms;
- field p75 CLS ≤ 0.1;
- programmatic template Lighthouse mobile target ≥ 90;
- total lab transfer ≤ 500 KiB;
- page-specific JS gzip ≤ 20 KiB;
- no more than eight related links on a leaf.

Field Core Web Vitals, separated by mobile and desktop, are the decision signal. Lighthouse is a regression test. See [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).

## Rollout order

### Cohort 0 — implemented now

- JSON schema and dimensions;
- sharded server-only content catalogue;
- two full pilot records: COPD at home and rehabilitation after angioplasty;
- both pilots deliberately blocked from production pending clinical approval;
- manifest compiler, quality validator, near-duplicate detector and claim checks;
- keyword opportunity report and CSV performance importer;
- rehabilitation hub, dynamic renderer, sitemap gate and legacy redirect;
- 5,000-record infrastructure benchmark.

### Cohort 1 — 15 to 30 pages

Prioritise:

- COPD program, home and post-discharge;
- online pulmonary rehabilitation India;
- bronchiectasis airway clearance;
- ILD rehabilitation;
- angioplasty, CABG and heart-attack recovery;
- online cardiac rehabilitation India;
- heart-failure rehabilitation;
- tele-rehabilitation setup, monitoring and suitability.

Publish in groups of 5–10 after clinical approval. Do not wait for all 30.

### Cohort 2 — 50 to 150 pages

Expand only clusters that show impressions, qualified engagement or leads. Add high-value questions and caregiver pages. Consolidate competing pages before creating close variations.

### Cohort 3 — 150 to 500 pages

Add recovery-stage depth, tasks of daily living and carefully mapped symptom questions. Begin professionally translated Hindi only after the English process is stable.

### Cohort 4 — 500 to 1,500+ pages

Proceed only when indexation, clinical review throughput, field performance and conversion reporting are stable. More URLs are not a success metric.

## Measurement and stop rules

Track every cohort by stable page ID, service line, condition, intent, locale, template version and reviewer.

Core metrics:

- approved URLs vs submitted vs indexed;
- percentage receiving impressions after 28, 56 and 90 days;
- non-branded impressions and clicks per 100 indexed pages;
- CTR adjusted for average-position band;
- qualified assessment clicks and completed enquiries;
- pages with multiple URLs ranking for the same query;
- Google-selected canonical mismatches;
- `Crawled – currently not indexed` and `Discovered – currently not indexed` by cohort;
- field Core Web Vitals by template.

Stop expanding a cluster when:

- most approved pages remain unindexed after internal linking and a reasonable observation window;
- Google repeatedly selects another canonical;
- multiple pages cannibalise the same query and intent;
- a cohort earns impressions but shows consistently poor engagement or no business relevance;
- clinical review cannot keep pace with updates;
- the template misses performance budgets.

Merge, improve or retire weak records before generating more.

## Operational commands

```text
npm run seo:prepare       # compile manifest and run quality gates
npm run seo:report        # ranked keyword-opportunity table
npm run seo:benchmark -- 5000
npm run typecheck
npm run lint
npm run build
```

The build automatically recompiles and validates the programme before Next.js starts.

## Primary implementation references

- [Google spam policies: scaled content and doorway abuse](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google generative AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google crawl-budget guidance](https://developers.google.com/crawling/docs/crawl-budget)
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google multilingual and hreflang guidance](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google Search Console performance data](https://support.google.com/webmasters/answer/17011364)
- [Google Ads Keyword Planner forecasts and historical metrics](https://support.google.com/google-ads/answer/3022575)
- [Next.js dynamic static generation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
