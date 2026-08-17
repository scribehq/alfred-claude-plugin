# Contributing — change control for alfred-claude-plugin

Public, Tier 2 (client configuration) repository under the Secure Development
Policy. It contains no product code and no secrets: a Claude Code plugin
manifest, `.mcp.json` pointing at `https://get-alfred.ai/api/mcp`, one skill,
and a README. Anthropic's community catalog pins this repo by commit SHA and
re-pins on push, so whoever can change `main` can change where every installed
user's client connects. Treat it accordingly.

1. Every change is a PR into `main`; direct pushes are blocked.
2. Reviewer is `PranavMishra17`; if Pranav is the author, `connorfata`. Never
   the author.
3. CI (`Validate plugin`) must be green before merge.
4. `.mcp.json` must keep `type: http` and `url: https://get-alfred.ai/api/mcp`.
5. Bump `version` in `.claude-plugin/plugin.json` on every user-visible change.
6. No agent attribution in commits or PRs. No secrets, ever.
7. Do not add a `CLAUDE.md` at the repo root: `claude plugin validate --strict` rejects it (plugin roots do not load it as context). Rules live here.
