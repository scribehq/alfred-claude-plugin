# Security policy

This repo ships a Claude Code plugin manifest that points at the alfred_
MCP server (`https://get-alfred.ai/api/mcp`). It is listed on Anthropic's
`claude-community` catalog, which pins installs to this repo's `main` by
commit SHA and re-pins on every push — see CONTRIBUTING.md. Anthropic
does not security-audit listed MCP servers; that responsibility sits with
this repo's owners.

## Reporting a vulnerability

Do not open a public GitHub issue for a suspected vulnerability.

- Preferred: use GitHub's private vulnerability reporting on this repo
  (Security tab → "Report a vulnerability"). It reaches the CODEOWNERS
  (`@connorfata`, `@PranavMishra17`) directly and keeps the report private
  until a fix ships.
- Alternative: report through https://get-alfred.ai/security.

## Scope

In scope: this repo's plugin manifest, `.mcp.json` pointer, and skill —
e.g. a change that could redirect the pinned endpoint, weaken the
`allowed-tools` scope, or smuggle instructions into the skill that a
user wouldn't expect.

Out of scope: the alfred_ MCP server implementation itself
(`get-alfred.ai/api/mcp`) and the OAuth provider — report those through
https://get-alfred.ai/security, not here.

## What to expect

Every change to `main` requires review from someone who isn't the
author (CODEOWNERS). A confirmed report gets a fix PR through the same
review, then a new tagged commit for the catalog to re-pin to.
