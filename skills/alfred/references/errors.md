# alfred_ tool error codes

Any alfred_ tool can return one of these instead of a result. Load this file
when a call fails and the code is not one you already know how to handle.

Never invent a recovery step for a code that is not listed here — say plainly
that the tool returned an unrecognised error, show the raw code, and stop.

## The user needs to do something

| Code | Meaning | What to do |
| --- | --- | --- |
| `UNAUTHORIZED` | Not signed in to alfred_, or the session expired / was revoked. | In Claude Code: run `/mcp`, choose **alfred**, pick **Authenticate**. In Claude or Claude Desktop: reconnect the alfred_ connector in settings. Do not retry until they confirm they have done it. |
| `ACCOUNT_NOT_FOUND` | No mailbox or calendar is connected to their alfred_ account yet. | Signing in to alfred_ does **not** connect their email. Tell them to open alfred_ Settings and connect Gmail, Outlook or Microsoft 365, then come back and retry. This is the single most common first-run failure — be warm about it, not technical. |
| `NO_CONNECTED_ACCOUNT` | Same underlying situation as `ACCOUNT_NOT_FOUND`. | Handle exactly like `ACCOUNT_NOT_FOUND`. |
| `SCOPE_MISSING` | Their grant does not include the permission this tool needs. | Name the capability in plain words ("sending mail was not part of what you approved"). They need to reconnect alfred_ and approve it. Do not retry. |

## Not retryable — change the request

| Code | Meaning | What to do |
| --- | --- | --- |
| `FORBIDDEN_TOOL` | That tool is not available on this surface. | Do not retry, and do not try a near-miss tool hoping it slips through. Tell the user this is not something alfred_ can do from Claude. |
| `VERB_NOT_ALLOWED` | The action itself is refused here (e.g. anything destructive). | alfred_ cannot permanently delete from this surface. Say so and suggest archive or move instead. |
| `INVALID_INPUT` | Arguments failed validation. The message names the fields. | Fix the named field and retry once. Common causes: recipients passed as bare strings instead of `{ email }` objects, or a timestamp without a UTC offset. |
| `BAD_REQUEST` | Malformed call. | Do not retry unchanged. |

## Transient — retrying may work

| Code | Meaning | What to do |
| --- | --- | --- |
| `RATE_LIMITED` | Per-connection ceiling hit. Carries `retry_after_s`. | Stop calling. Tell the user how long to wait. Do NOT loop or retry immediately — that is what tripped it. If mid-way through a batch, say what you completed and what remains. |
| `TIMEOUT` | The mail or calendar provider was too slow. | Retry once with a narrower request (shorter date range, smaller limit, one account). If it fails again, report it rather than looping. |
| `INTERNAL` | Something failed on alfred_'s side. | Retry once. If it fails again, say so plainly — do not present it as the user's fault or as an empty result. |

## The rule that matters most

**Never turn an error into a claim about the user's data.** A failed read is
not "you have no email about that" and an empty inbox is not proof of absence.
If a call failed, say the call failed.
