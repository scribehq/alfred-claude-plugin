// Reachability smoke test for the alfred_ MCP endpoint declared in .mcp.json.
//
// This does not authenticate — it only proves the endpoint is up and
// answering, not that a signed-in call would succeed. CI's structural
// checks (tests/mcp-config.test.js, `claude plugin validate --strict`)
// catch a drifted URL; this catches a URL that's correct but dead.
//
// Pass: any HTTP response with status < 500 (a 401/406/etc. from an
// unauthenticated MCP call still proves the server is alive).
// Fail: a network-level error (DNS, TLS, connection refused, timeout)
// or a 5xx response.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mcpConfig = JSON.parse(readFileSync(path.join(__dirname, "..", ".mcp.json"), "utf8"));
const url = mcpConfig.alfred?.url;

if (!url) {
  console.error("smoke test: .mcp.json has no alfred.url to check");
  process.exit(1);
}

const TIMEOUT_MS = 10_000;
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

try {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-06-18",
        capabilities: {},
        clientInfo: { name: "alfred-claude-plugin-smoke-test", version: "0" },
      },
    }),
    signal: controller.signal,
  });

  if (res.status >= 500) {
    console.error(`smoke test: ${url} responded ${res.status} — server-side failure`);
    process.exit(1);
  }

  console.log(`smoke test: ${url} responded ${res.status} — endpoint is alive`);
} catch (err) {
  console.error(`smoke test: could not reach ${url} — ${err.message}`);
  process.exit(1);
} finally {
  clearTimeout(timer);
}
