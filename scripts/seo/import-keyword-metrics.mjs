import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { dataRoot, normalizeKeyword } from "./lib/catalog.mjs";

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const keywordPlannerPath = option("--keyword-planner");
const searchConsolePath = option("--search-console");
const outputPath =
  option("--out") ?? path.join(dataRoot, "generated", "keyword-metrics.json");

if (!keywordPlannerPath && !searchConsolePath) {
  console.log(
    "Usage: node scripts/seo/import-keyword-metrics.mjs [--keyword-planner planner.csv] [--search-console queries.csv] [--out metrics.json]",
  );
  process.exit(0);
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);
  if (!rows.length) return [];
  const headers = rows[0].map((header) => header.replace(/^\uFEFF/, "").trim());
  return rows.slice(1).map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index]?.trim() ?? ""])),
  );
}

function first(row, names) {
  for (const name of names) if (row[name] !== undefined) return row[name];
  return "";
}

function number(value) {
  const cleaned = String(value).replace(/[,%₹$£€\s]/g, "");
  if (!cleaned || cleaned === "--" || cleaned.startsWith("<")) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

const records = new Map();
function recordFor(keyword) {
  const key = normalizeKeyword(keyword);
  if (!records.has(key)) records.set(key, { keyword: keyword.trim() });
  return records.get(key);
}

if (keywordPlannerPath) {
  const rows = parseCsv(await readFile(path.resolve(keywordPlannerPath), "utf8"));
  for (const row of rows) {
    const keyword = first(row, ["Keyword", "Search term"]);
    if (!keyword) continue;
    recordFor(keyword).keywordPlanner = {
      averageMonthlySearches: number(first(row, ["Avg. monthly searches", "Average monthly searches"])),
      competition: first(row, ["Competition"] ) || null,
      competitionIndex: number(first(row, ["Competition (indexed value)", "Competition index"])),
      topOfPageBidLow: number(first(row, ["Top of page bid (low range)"])),
      topOfPageBidHigh: number(first(row, ["Top of page bid (high range)"])),
      geo: "IN",
    };
  }
}

if (searchConsolePath) {
  const rows = parseCsv(await readFile(path.resolve(searchConsolePath), "utf8"));
  for (const row of rows) {
    const keyword = first(row, ["Top queries", "Query", "Queries"]);
    if (!keyword) continue;
    recordFor(keyword).searchConsole = {
      clicks: number(first(row, ["Clicks"])),
      impressions: number(first(row, ["Impressions"])),
      ctr: number(first(row, ["CTR"])),
      position: number(first(row, ["Position", "Average position"])),
      countryFilter: "IND",
    };
  }
}

const output = {
  importedAt: new Date().toISOString(),
  sources: {
    keywordPlanner: keywordPlannerPath ? path.basename(keywordPlannerPath) : null,
    searchConsole: searchConsolePath ? path.basename(searchConsolePath) : null,
  },
  warning: "Generated research data. Do not use it as medical content and do not expose private analytics through page JSON.",
  records: [...records.values()].sort((left, right) => left.keyword.localeCompare(right.keyword)),
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Imported ${output.records.length} keyword records to ${outputPath}`);
