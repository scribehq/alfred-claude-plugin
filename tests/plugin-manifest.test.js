const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const manifest = require(path.join("..", ".claude-plugin", "plugin.json"));

test("plugin.json has a human-readable displayName", () => {
  assert.equal(typeof manifest.displayName, "string");
  assert.ok(manifest.displayName.length > 0);
});

test("plugin.json keywords cover the connected providers", () => {
  assert.ok(Array.isArray(manifest.keywords));
  for (const term of ["email", "calendar", "gmail", "outlook", "mcp"]) {
    assert.ok(manifest.keywords.includes(term), `keywords missing "${term}"`);
  }
});

test("plugin.json license matches the repo LICENSE (MIT)", () => {
  assert.equal(manifest.license, "MIT");
  const licenseText = fs.readFileSync(path.join(__dirname, "..", "LICENSE"), "utf8");
  assert.match(licenseText, /^MIT License/, "LICENSE file is not actually an MIT license");
});
