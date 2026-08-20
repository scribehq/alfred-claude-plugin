const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

// CONTRIBUTING.md: ".mcp.json must keep type: http and url:
// https://get-alfred.ai/api/mcp" — this repo is pinned by commit SHA on
// Anthropic's catalog and re-pins on every push to main, so a drift here
// silently changes where every installed client connects.
const mcpConfig = require(path.join("..", ".mcp.json"));

test(".mcp.json declares the alfred server", () => {
  assert.ok(mcpConfig.alfred, ".mcp.json has no top-level `alfred` entry");
});

test(".mcp.json alfred server is the pinned http endpoint", () => {
  assert.equal(mcpConfig.alfred.type, "http");
  assert.equal(mcpConfig.alfred.url, "https://get-alfred.ai/api/mcp");
});
