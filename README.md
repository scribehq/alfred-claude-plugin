<div align="center">

<img src="https://get-alfred.ai/alfred-logo.svg" alt="alfred_" width="76" height="76" />

# alfred\_ for Claude

**Your inbox, calendar and to-dos — inside Claude.**

Search across every mailbox, draft the reply, tidy the inbox, book the time.
As you, in one place.

<a href="https://get-alfred.ai"><img alt="Website" src="https://img.shields.io/badge/get--alfred.ai-111?style=flat-square&logo=safari&logoColor=white" /></a>
<a href="https://get-alfred.ai/mcp/claude"><img alt="Setup guide" src="https://img.shields.io/badge/Setup_guide-2563eb?style=flat-square" /></a>
<a href="https://get-alfred.ai/security"><img alt="Security" src="https://img.shields.io/badge/Security-16a34a?style=flat-square" /></a>
<a href="LICENSE"><img alt="MIT" src="https://img.shields.io/badge/License-MIT-6b7280?style=flat-square" /></a>

<sub>
<img src="https://get-alfred.ai/gmail-favicon.png" width="14" height="14" align="absmiddle" />&nbsp;Gmail&nbsp;&nbsp;·&nbsp;&nbsp;
<img src="https://get-alfred.ai/outlook-favicon.png" width="14" height="14" align="absmiddle" />&nbsp;Outlook&nbsp;&nbsp;·&nbsp;&nbsp;
Microsoft 365&nbsp;&nbsp;·&nbsp;&nbsp;
<img src="https://get-alfred.ai/google-calendar-favicon.png" width="14" height="14" align="absmiddle" />&nbsp;Google Calendar
</sub>

</div>

---

## Why it's different

Most email integrations hand the model a search box. alfred\_ hands it your
actual working context — **multiple mailboxes and calendars at once**, across
providers, with the judgment layer that already runs alfred\_ behind it.

> *"What did the client say about pricing, and am I free to meet them Thursday?"*
> — one question, two providers, no tab-switching.

|  | |
|---|---|
| **Ask across everything** | Gmail, Outlook and Microsoft 365 answered in one query — not one account at a time |
| **Act, don't just read** | Draft replies, archive the noise, book the meeting, add the to-do |
| **Safe by construction** | Anything that leaves the building previews first and waits for your yes |
| **Nothing is destroyed** | Mail gets archived or moved. There is no delete on this surface |

---

## Install

<details open>
<summary><b>Claude &nbsp;/&nbsp; Claude Desktop</b></summary>

<br />

Add **alfred\_** from the connector directory, then sign in when prompted.

</details>

<details>
<summary><b>Claude Code</b></summary>

<br />

```bash
/plugin install alfred@claude-community
```

Then run `/mcp`, choose **alfred** and pick **Authenticate**. Your browser opens
get-alfred.ai — sign in, press Allow. Nothing to paste.

Without the plugin:

```bash
claude mcp add --transport http alfred https://get-alfred.ai/api/mcp
```

</details>

> [!IMPORTANT]
> **Connect a mailbox first.** Signing in creates your alfred\_ account — it
> does not connect your email. Until you do, tools return a short message
> saying so, with a one-tap link to fix it — Claude will hand you the link.
> Open it, connect Gmail or Outlook, then ask again.

---

## What it can do

<details open>
<summary><b>Read</b> — find it, open it, understand it</summary>

<br />

| Tool | Does |
| --- | --- |
| `search_work` | Finds threads across every connected account in one query |
| `list_inbox` | Lists a folder — filter by sender, date, unread, attachments |
| `get_thread` | Opens one thread in full, with participants and attachments |
| `get_email_body` | Opens one message, without pulling the whole thread |
| `read_attachment` | Reads an attachment's contents — text, PDF, images, xlsx, docx |
| `list_folders` | Your folders and labels, so a move names a real target |
| `get_schedule` | Reads your calendar for a day or a range |
| `search_events` | Finds an event by title, attendee, or location |
| `list_calendars` | Every calendar across every connected account |
| `find_free_time` | Finds open slots of a given length |
| `check_free` | Checks whether one specific window is free |
| `list_todos` · `search_todos` | Your tasks and reminders, listed or searched |
| `lookup_contact` · `list_contacts` | Someone you correspond with, or all of them |
| `list_email_rules` | Your automation rules |
| `list_pending_drafts` · `get_pending_draft` | Drafts alfred\_ prepared for you |
| `search_facts` | What you have told alfred\_ to remember |
| `cloud_files` | Searches, browses and reads your connected cloud storage |
| `list_accounts` | Which mailboxes and calendars are connected, and their health |

</details>

<details>
<summary><b>Write</b> — draft it, tidy it, schedule it</summary>

<br />

| Tool | Does |
| --- | --- |
| `create_draft` · `update_draft` | Saves an email to your Drafts folder, unsent |
| `send_email` · `reply_to_email` · `forward_email` | Sends as you — **previews first, waits for your confirmation** |
| `create_event` · `update_event` | Creates or changes events, including RSVPs |
| `create_todo` · `update_todo` | Tasks and reminders |
| `organize_email` · `bulk_organize_emails` | Archive, move, label, mark read/unread, star |
| `create_email_rule` · `update_email_rule` | Automation rules |
| `dismiss_pending_draft` | Dismisses a draft alfred\_ suggested |
| `remember_fact` · `update_fact` | Remembers something you tell it, for later |
| `get_account_setup_link` | Mints a one-tap link to connect, reconnect or widen access |

</details>

---

## Safety

|  |  |
| --- | --- |
| **Nothing goes out without you** | Sending mail, inviting people to an event and other high-impact actions return a preview and do nothing until you confirm. Want it parked instead? Ask for a draft — `create_draft` never sends. |
| **Nothing can be permanently deleted** | There is no delete here. Mail is archived or moved, never destroyed. Rules are disabled, not erased. |
| **Your accounts only** | alfred\_ sees the mailboxes and calendars you connected. Nobody else's. |
| **Revoke any time** | alfred\_ → Settings → Privacy & Security. |

<details>
<summary><b>Permissions, in plain words</b></summary>

<br />

At sign-in you approve a set of scopes.

**Reads** — `work:read`, `email:read`, `calendar:read`, `tasks:read`,
`contacts:read`, `memory:read`, `files:read`. Find and read your mail,
calendar, tasks, saved notes and cloud files.

**Writes** — `email:draft`, `email:organize`, `calendar:write`, `tasks:write`,
`rules:write`, `memory:write`, `email:send`. Draft, tidy, schedule, remember,
and — with your explicit confirmation — send.

You approve these together at sign-in. A connection granted fewer of them can
still see the tools it cannot use — asking for one returns a short message
naming the missing permission, with a link to widen it. Nothing runs without
the scope.

Full detail: [Security](https://get-alfred.ai/security) ·
[Privacy](https://get-alfred.ai/privacy)

</details>

---

<div align="center">
<sub>

Built by [alfred\_](https://get-alfred.ai) ·
[Setup guide](https://get-alfred.ai/mcp/claude) ·
[Security](https://get-alfred.ai/security) ·
[Privacy](https://get-alfred.ai/privacy)

</sub>
</div>
