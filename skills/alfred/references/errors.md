# alfred_ tool outcomes that are not a result

Load this when a call comes back as something other than the data you asked
for. Three kinds of thing arrive here, and treating them the same is the most
expensive mistake on this surface.

## 1. `setup_required` — NOT an error, and not a failure

A tool may return a **successful** result whose body is:

```json
{ "setup_required": true, "message": "...", "action_url": "https://..." }
```

This is the single most common first-run outcome. Nothing broke. The user has a
step left that only they can take, and `message` is written for them.

**Relay `message` to the user verbatim, including any link, and stop.** Do not
retry, do not try a different tool, and do not describe it as an error — a
retry cannot possibly help, because the missing thing is an action in a browser.
`action_url` is present when there is a link; the message always carries it in
prose as well, so relaying the message alone is enough.

Three situations produce it:

- no active alfred_ plan or trial,
- no mailbox or calendar connected yet,
- a permission this connection was never granted.

They deliberately share one shape, because the recovery is the same in all
three: the user opens the link. Do not try to distinguish them.

> Read this shape before the error tables below. These used to arrive as the
> error codes `NO_PLATFORM_ACCESS`, `NO_CONNECTED_ACCOUNT` and `SCOPE_MISSING`,
> and they no longer do. A model looking for those codes will not find them.

## 2. `requires_confirmation` — also not an error

A write may return `requires_confirmation: true` with a preview. Nothing has
happened yet. Show the preview and, once the user agrees, call again with the
identical arguments plus `confirmed: true`. Covered in SKILL.md rule 2.

Several codes are the same idea wearing an error shape. **Ask the user, then
re-call** — never report these as a failure:

| Code | What it wants |
| --- | --- |
| `SCALE_CONFIRMATION_REQUIRED` | The sweep is large or destructive. State the exact count and scope, get an explicit yes to that magnitude, re-call with `scale_acknowledged: true`. |
| `CONFLICT_REQUIRES_OVERRIDE` | The action overlaps a rule the user set to protect something. Surface the conflict, and only on an explicit yes re-call with the acknowledgement flag the message names. |
| `CONFLICT_DRIFT` | The user's rules changed between the preview and the confirm. Re-run the preview and walk them through it again. |
| `NEEDS_USER_INPUT` | A required detail is genuinely missing. Ask for it. |
| `AMBIGUOUS_OCCURRENCE`, `AMBIGUOUS_MATCH`, `AMBIGUOUS_SECTION` | More than one thing matched. List the candidates and let the user pick. |

## 3. Real errors

### It already happened — do NOT say it failed

| Code | Meaning | What to do |
| --- | --- | --- |
| `IDEMPOTENT_REPLAY` | This exact call already succeeded. The cached result is attached. | Treat it as success. Reporting a failure here tells the user their mail did not send when it did. |
| `SEND_IN_FLIGHT` | Another attempt owns the send slot and its outcome is unknown. | Do **not** retry and do **not** claim either outcome. Say it is in progress and offer to check in a few minutes. |

### The user must act

| Code | Meaning | What to do |
| --- | --- | --- |
| `UNAUTHORIZED` | Not signed in to alfred_, or the session expired or was revoked. | In Claude Code: run `/mcp`, choose **alfred**, pick **Authenticate**. In Claude or Claude Desktop: reconnect the alfred_ connector in Settings. Do not retry until they confirm. |
| `ACCOUNT_BROKEN`, `AUTH_EXPIRED`, `PERMISSION_LOST` | The mailbox or calendar is connected but its access has expired or been revoked. | Their account exists — do not tell them to connect a new one. Say that specific mailbox needs reconnecting, naming the address if the message gives one. Retrying cannot fix it. |
| `ACCOUNT_PAUSED` | The account is connected but paused. | Tell them it is paused and needs resuming in alfred_ Settings. |

### Not retryable — change the request

| Code | Meaning | What to do |
| --- | --- | --- |
| `ACCOUNT_NOT_FOUND` | A named `from_account` address matched none of their connected accounts. **This does not mean they have no mailbox** — that arrives as `setup_required`. | Call `list_accounts`, use an address from it, or drop `from_account` and let alfred_ choose. |
| `FORBIDDEN_TOOL`, `METHOD_NOT_ALLOWED` | Not available on this surface. | Do not retry, and do not reach for a near-miss tool hoping it slips through. |
| `VERB_NOT_ALLOWED` | The action itself is refused here. | alfred_ cannot permanently delete from this surface. Suggest archive or move. |
| `INVALID_INPUT`, `BAD_REQUEST`, `INPUT_NOT_ALLOWED` | Arguments failed validation, or carried a field this surface does not accept. The message names the field. | Fix the named field and retry once. Common causes: recipients as bare strings instead of `{ email }` objects, or a timestamp with no UTC offset. |
| `ATTACHMENT_SOURCE_NOT_ALLOWED` | The attachment came from a source this surface will not send from. | Say which sources are allowed rather than retrying. |
| `CAPABILITY_DENIED` | The connected account cannot do this at all (e.g. calendar write on a mail-only grant). | Not the same as a missing permission — do not send them to reconnect unless the message says so. |
| `NOT_FOUND`, `BLOCK_NOT_FOUND`, `SECTION_NOT_FOUND`, `FIND_NOT_FOUND` | The referenced thing does not exist, or the ref is stale. | Re-fetch the list you took the ref from. Never report this as "the user has no such email" — see the closing rule. |
| `CONFLICT` | Something changed underneath the request. | Re-read and try again with fresh state. |
| `PROVIDER_GAP` | Gmail, Outlook or the CalDAV server does not support this operation. | Say which provider cannot do it. Do not retry on the same account. |

### Transient — retrying may work

| Code | Meaning | What to do |
| --- | --- | --- |
| `RATE_LIMITED` | Per-connection ceiling hit. Carries `retry_after_s`. | Stop calling. Tell the user how long to wait. Do NOT loop — that is what tripped it. Mid-batch, say what completed and what remains. |
| `TIMEOUT` | The mail or calendar provider was too slow. | Retry once with a narrower request: shorter date range, smaller limit, one account. Then report rather than looping. |
| `PROVIDER_DOWN` | The provider is failing, not alfred_. | Name the provider, retry once, then stop. |
| `INTERNAL` | Something failed on alfred_'s side. | Retry once. If it fails again, say so plainly — never as the user's fault, and never as an empty result. |

## A code that is not in this list

Report the code verbatim and say what you were trying to do. Then:

- **Never retry a write** on an unknown code. It may have partly succeeded.
- A read is safe to retry **once**.
- Never guess what it means, and never invent a recovery step.

This is a change from the older rule, which said to stop on anything unlisted.
Stopping is right for a write and wrong for a read, and either way the user is
better served by the raw code than by silence.

## The rule that matters most

**Never turn a failure into a claim about the user's data.** A failed read is
not "you have no email about that". An empty result after an error is not proof
of absence. A `NOT_FOUND` on a stale ref is not a deleted message. If a call
failed, say the call failed.
