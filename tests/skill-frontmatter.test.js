const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const skillPath = path.join(__dirname, "..", "skills", "alfred", "SKILL.md");
const raw = fs.readFileSync(skillPath, "utf8");
const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);

function parseFrontmatter(block) {
  const out = {};
  for (const line of block.split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return out;
}

test("SKILL.md has a parseable frontmatter block", () => {
  assert.ok(frontmatterMatch, "no --- frontmatter block found");
});

const fm = parseFrontmatter(frontmatterMatch[1]);

test("SKILL.md frontmatter declares a portable license", () => {
  assert.equal(fm.license, "MIT");
});

test("SKILL.md frontmatter allowed-tools lists exactly the 3 alfred_ MCP tools", () => {
  const declared = fm["allowed-tools"].split(",").map((s) => s.trim());
  assert.deepEqual(
    declared.sort(),
    ["mcp__alfred__get_schedule", "mcp__alfred__get_thread", "mcp__alfred__search_work"].sort(),
  );
});

test("every tool named in the skill body is covered by allowed-tools", () => {
  const declared = fm["allowed-tools"].split(",").map((s) => s.trim());
  for (const tool of ["search_work", "get_thread", "get_schedule"]) {
    assert.ok(raw.includes("`" + tool + "`"), `SKILL.md body no longer mentions ${tool}`);
    assert.ok(
      declared.some((d) => d.endsWith("__" + tool)),
      `allowed-tools missing an entry for ${tool}`,
    );
  }
});
