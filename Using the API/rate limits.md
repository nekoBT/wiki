---
label: "Rate Limits"
icon: circle-slash
order: 1900
---
# Rate Limits

nekoBT enforces rate limits to prevent abuse of the API. These limits are not publicly shared.

There are two types of rate limits: API Rate Limits and Cloudflare Rate Limits.

### API Rate Limits
API Rate Limits are enforced by nekoBT to prevent abuse of the API.<br>
If you exceed these limits, you will receive a `429 Too Many Requests` JSON response.<br>
Use the `retry_after` JSON field to determine how long to wait before making another request.
```json
{
    "error": true,
    "message": "Rate limit exceeded, try again in 12 seconds.",
    "retry_after": 11.82
}
```

### Cloudflare Rate Limits
Cloudflare Rate Limits are enforced at the edge by Cloudflare to prevent abuse of the site.<br>
If you exceed these limits, you will receive a `429 Too Many Requests` HTML response.<br>
Use the `Retry-After` header to determine how long to wait before making another request.
```http
HTTP/2 429
retry-after: 4
date: ***
content-type: text/html; charset=UTF-8
x-frame-options: SAMEORIGIN
referrer-policy: same-origin
```