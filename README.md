# alfred_ for Claude

Connects your email, calendar and to-dos to Claude through
[alfred_](https://get-alfred.ai). Search and read across every mailbox you have
connected, draft replies, tidy your inbox, manage your schedule and your task
list — all as you, in one place.

Works with **Gmail, Outlook and Microsoft 365**, across multiple accounts at
once.

## Install

**Claude / Claude Desktop** — add alfred_ from the connector directory, then
sign in when prompted.

**Claude Code**

```
/plugin install alfred@claude-community
```

Then run `/mcp`, choose **alfred** and pick **Authenticate**. Your browser opens
get-alfred.ai; sign in and press Allow. Nothing to paste.

Or without the plugin:
`claude mcp add --transport http alfred https://get-alfred.ai/api/mcp`

> **You need a mailbox connected to alfred_ first.** Signing in here creates
> your alfred_ account, but it does not connect your email. If tools come back
> saying no account was found, open alfred_ Settings and connect Gmail or
> Outlook, then try again.

## What it can do

alfred_ is an assistant that *acts on* your mail, not just a reader. It can
write, organize and schedule. Everything runs as you.

### Reads

| Tool | Does |
| --- | --- |
| `search_work` | Finds email threads across every connected account in one query |
| `list_inbox` | Lists a mailbox folder — filter by sender, date, unread, attachments |
| `get_thread` | Reads one thread in full, with participants and attachments |
| `read_attachment` | Reads an attachment's contents (text, PDF, images, xlsx, docx) |
| `get_schedule` | Reads your calendar for a day or a range |
| `list_calendars` | Lists every calendar across your connected accounts |
| `find_free_time` | Finds open slots of a given length |
| `check_free` | Checks whether one specific window is free |
| `list_todos` | Lists your tasks and reminders |
| `lookup_contact` | Looks up someone you correspond with |
| `list_email_rules` | Lists your automation rules |
| `list_pending_drafts` / `get_pending_draft` | Reads drafts alfred_ prepared for you |

### Writes

| Tool | Does |
| --- | --- |
| `create_draft` / `update_draft` | Saves an email to your Drafts folder, unsent |
| `send_email` / `reply_to_email` / `forward_email` | Sends mail as you — **previews first, needs your confirmation** |
| `create_event` / `update_event` | Creates or changes calendar events, including RSVPs |
| `create_todo` / `update_todo` | Creates and updates tasks and reminders |
| `organize_email` / `bulk_organize_emails` | Archives, moves, labels, marks read/unread, stars |
| `create_email_rule` / `update_email_rule` | Creates and updates automation rules |
| `dismiss_pending_draft` | Dismisses a draft alfred_ suggested |

## Safety

- **Nothing goes out without you.** Sending mail, inviting people to an event,
  and other high-impact actions return a preview first and do nothing until you
  confirm. Prefer a draft? Ask for one — `create_draft` never sends.
- **Nothing can be permanently deleted.** There is no delete on this surface.
  Emails can be archived or moved; they cannot be destroyed. Rules are disabled,
  not erased.
- **Runs as you, on your accounts only.** alfred_ sees your connected mailboxes
  and calendars — nobody else's.
- **Revoke any time** in alfred_ under Settings → Privacy & Security.

## Permissions

At sign-in you approve a set of scopes. Reads (`work:read`, `email:read`,
`calendar:read`, `tasks:read`, `contacts:read`) let alfred_ find and read your
mail, calendar and tasks. Writes (`email:draft`, `email:organize`,
`calendar:write`, `tasks:write`, `rules:write`, `email:send`) let it draft,
tidy, schedule and — with your confirmation — send.

Guide: https://get-alfred.ai/mcp/claude ·
Security: https://get-alfred.ai/security ·
Privacy: https://get-alfred.ai/privacy
