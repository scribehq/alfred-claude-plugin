---
description: Answers questions about the user's email and calendar through the alfred_ MCP tools (search_work, get_thread, get_schedule). Use when the user asks what is on their calendar, who last wrote about something, where a thread stands, or wants a summary or talking points from their real mail.
---

# alfred_

alfred_ holds the user's connected email accounts (Gmail, Outlook, Microsoft 365) and calendars. Three read-only tools:

- `search_work` finds threads across every connected account in one query. Start here for anything about mail.
- `get_thread` opens one thread in full using the `thread_ref` that `search_work` returned. Use it before summarising, quoting or judging where something stands.
- `get_schedule` reads calendar events for a day or a range, in the user's timezone.

Rules:
1. Search first, then read. Never claim what a thread says from the search preview alone.
2. Everything is read-only. If the user asks to send, reply, archive or change the calendar, say alfred_ can't do that from here and offer to draft the text for them to send themselves.
3. If a tool answers `UNAUTHORIZED`, tell the user to run `/mcp`, choose alfred and authenticate; the browser opens get-alfred.ai.
4. If a tool answers `ACCOUNT_NOT_FOUND`, the user has no email or calendar connected yet: point them to alfred_ Settings.
