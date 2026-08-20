const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("SECURITY.md exists at repo root with a disclosure path", () => {
  const securityPath = path.join(__dirname, "..", "SECURITY.md");
  assert.ok(fs.existsSync(securityPath), "SECURITY.md is missing");

  const raw = fs.readFileSync(securityPath, "utf8");
  assert.match(raw, /Report a vulnerability/i);
  assert.match(raw, /get-alfred\.ai\/security/);
  assert.doesNotMatch(
    raw,
    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
    "SECURITY.md should not fabricate an email address",
  );
});
