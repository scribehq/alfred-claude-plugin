# alfred_ tool error codes

`search_work`, `get_thread`, and `get_schedule` return one of these codes
when they can't do what was asked. Load this file when a call fails and
the code isn't one you already know how to handle.

| Code | Meaning | What to do |
| --- | --- | --- |
| `UNAUTHORIZED` | The user hasn't authenticated this session with alfred_, or the session expired. | Tell the user to run `/mcp`, choose **alfred**, and pick **Authenticate**. The browser opens get-alfred.ai; sign in and press Allow. Don't retry the call until they confirm they've done this. |
| `ACCOUNT_NOT_FOUND` | The user has no email or calendar account connected in alfred_ yet. | Tell the user there's nothing connected, and point them to alfred_ Settings to connect Gmail, Outlook, or Microsoft 365. |

If you see a code not listed here, say plainly that the tool returned an
unrecognized error and show the raw code — don't guess at what it means
or invent a recovery step.
