const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const skillPath = path.join(__dirname, "..", "skills", "alfred", "SKILL.md");
const errorsPath = path.join(__dirname, "..", "skills", "alfred", "references", "errors.md");

test("skills/alfred/references/errors.md exists", () => {
  assert.ok(fs.existsSync(errorsPath), "references/errors.md is missing");
});

test("SKILL.md points at references/errors.md instead of inlining error handling", () => {
  const skill = fs.readFileSync(skillPath, "utf8");
  assert.match(skill, /references\/errors\.md/);
  // The two known codes should live in the reference doc, not be re-taught in the skill body.
  assert.doesNotMatch(skill, /UNAUTHORIZED/);
  assert.doesNotMatch(skill, /ACCOUNT_NOT_FOUND/);
});

test("references/errors.md documents both known error codes with a recovery step", () => {
  const errors = fs.readFileSync(errorsPath, "utf8");
  for (const code of ["UNAUTHORIZED", "ACCOUNT_NOT_FOUND"]) {
    assert.match(errors, new RegExp("`" + code + "`"), `errors.md missing ${code}`);
  }
  assert.match(errors, /\/mcp/, "errors.md should still tell the model how to recover from UNAUTHORIZED");
});
