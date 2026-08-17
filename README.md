# alfred_ for Claude Code

Gives Claude read-only access to your email and calendar through [alfred_](https://get-alfred.ai): search threads across every connected account, read one in full, and see your schedule.

## Install

```
/plugin install alfred@claude-community
```

Then run `/mcp`, choose **alfred** and pick **Authenticate**. Your browser opens get-alfred.ai; sign in and press Allow. Nothing to paste.

Or without the plugin: `claude mcp add --transport http alfred https://get-alfred.ai/api/mcp`

## What it can do

| Tool | Does |
| --- | --- |
| `search_work` | Finds email threads across Gmail, Outlook and Microsoft 365 accounts in one query |
| `get_thread` | Reads one thread in full |
| `get_schedule` | Reads your calendar for a day or a range |

It cannot send, reply, archive, delete, or change your calendar. Every call runs as you; revoke access any time in alfred_ under Settings → Privacy & Security.

Guide: https://get-alfred.ai/mcp/claude · Security: https://get-alfred.ai/security · Privacy: https://get-alfred.ai/privacy
