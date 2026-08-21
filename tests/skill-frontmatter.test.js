const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// These tests exist because this repo shipped a materially FALSE capability
// claim to a public catalog listing: the README said "It cannot send, reply,
// archive, delete, or change your calendar" and SKILL.md told the model
// "Everything is read-only", while the server exposed 27 tools including
// send_email, forward_email and bulk_organize_emails. SKILL.md additionally
// pinned `allowed-tools` to 3 tools, which BLOCKED the other 24 whenever the
// skill was active. Guard all of it.

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const SKILL = read("skills/alfred/SKILL.md");
const README = read("README.md");
const MANIFEST = require(path.join(root, ".claude-plugin", "plugin.json"));

const DOC_SURFACES = [
  ["README.md", README],
  ["skills/alfred/SKILL.md", SKILL],
  [".claude-plugin/plugin.json", JSON.stringify(MANIFEST)],
];

test("no doc surface claims the connector is read-only", () => {
  for (const [name, body] of DOC_SURFACES) {
    assert.doesNotMatch(body, /read-only/i, `${name} still claims read-only`);
  }
});

test("no doc surface denies a capability the server actually has", () => {
  // The exact shape of the original false claim, plus near-misses.
  for (const [name, body] of DOC_SURFACES) {
    assert.doesNotMatch(body, /cannot send/i, `${name} denies sending`);
    assert.doesNotMatch(body, /can'?t send/i, `${name} denies sending`);
  }
});

test("SKILL.md does not restrict the tool surface it can reach", () => {
  const fm = SKILL.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(fm, "SKILL.md has no frontmatter block");
  // An allowed-tools list here silently disables every tool it omits. If one is
  // ever reintroduced it must be deliberate and complete, not a stale subset.
  assert.doesNotMatch(
    fm[1],
    /^allowed-tools:/m,
    "SKILL.md pins allowed-tools — this blocks every tool not listed",
  );
});

test("README documents both the read AND the write surface", () => {
  // The five reads added 2026-08-20 are included deliberately: this repo's
  // whole failure mode is documenting LESS than the server exposes, so a new
  // tool shipping without a README row is the same defect as the original
  // read-only claim, just smaller.
  for (const tool of [
    "search_work", "get_thread", "get_schedule", "read_attachment", "list_inbox",
    "get_email_body", "list_folders", "search_events", "search_todos", "list_contacts",
  ]) {
    assert.match(README, new RegExp("`" + tool + "`"), `README missing read tool ${tool}`);
  }
  for (const tool of ["create_draft", "send_email", "create_event", "organize_email", "create_todo"]) {
    assert.match(README, new RegExp("`" + tool + "`"), `README missing write tool ${tool}`);
  }
});

test("README states the confirmation gate and the no-delete guarantee", () => {
  assert.match(README, /confirm/i, "README does not mention confirmation");
  assert.match(README, /delet/i, "README does not address deletion");
});

test("plugin.json license matches the repo LICENSE (MIT)", () => {
  assert.equal(MANIFEST.license, "MIT");
  assert.match(read("LICENSE"), /^MIT License/);
});

test("plugin.json has a displayName and provider keywords", () => {
  assert.equal(typeof MANIFEST.displayName, "string");
  assert.ok(MANIFEST.displayName.length > 0);
  for (const term of ["email", "calendar", "gmail", "outlook", "mcp"]) {
    assert.ok(MANIFEST.keywords.includes(term), `keywords missing "${term}"`);
  }
});
