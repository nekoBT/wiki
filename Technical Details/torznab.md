---
label: "Torznab & RSS"
icon: megaphone
order: 1800
---

# Torznab & RSS
!!!info
To access the Torznab API, you should instead specify your API key as the `apikey` query parameter.
!!!
!!!warning
The Torznab API is only meant to be used by automation software, such as Sonarr or Radarr. If you want more rich data, use the JSON API instead.
!!!
The base URL for the Torznab API is `https://nekobt.to/api/torznab`


## Rate Limiting

Search requests are rate limited per user, or per IP address when no `apikey` is supplied. Capabilities (`t=caps`) is not rate limited. As with the JSON API, the exact limits are not publicly shared.

If you exceed the limit you will receive a `429 Too Many Requests` plain-text response. Use the `Retry-After` header to determine how long to wait before retrying.

```http
HTTP/2 429
retry-after: 37
content-type: text/plain

rate limit exceeded, slow down your polling interval
```

!!!warning
The limit is set well above what normal automation needs. A typical RSS sync uses only a handful of requests per hour. If you are hitting it, your polling interval is too low. Sonarr, Radarr and Prowlarr all honour `Retry-After` and will back off on their own.
!!!


### Get Torznab Capabilities
[!badge variant="info" text="GET"] `/api?t=caps`

Returns the capabilities of the Torznab API, such as supported search types and metadata formats.


### Search Torrents (RSS Feed)
[!badge variant="info" text="GET"] `/api?t=search`

Searches for torrents. The following query parameters are supported:

Name | Type | Description
---- | ---- | -----------
t | string | Can be `search`, `tv-search` or `movie-search`.
q? | string | The search query. If this is an empty string or null, it will return the latest torrents added.
tvdbid? | integer | The TVDB ID of the series to search for.
tmdbid? | string | Comma-separated TMDB IDs to filter for.
media_id? | string | Comma-separated media IDs to filter for. Each one can also be an external ID. Unlike a plain TVDB/TMDB lookup, an AniList/MAL/AniDB ID narrows to a single cour rather than the whole series.
batch? | boolean | Set to `true` to only return batch torrents or `false` to exclude them.
levels? | string | Comma-separated list of [sub levels](/info/sub-levels) to filter for.
video_codec? | string | Comma-separated list of video codecs to filter for.
video_type? | string | Comma-separated list of video types to filter for.
audio_lang? | string | Comma-separated list of audio languages to filter for.
fansub_lang? | string | Comma-separated list of fansub languages to filter for.
sub_lang? | string | Comma-separated list of subtitle languages to filter for.
hardsub? | boolean | Set to `true` to only return torrents with hardcoded subtitles or `false` to exclude them.
otl? | boolean | Set to `true` to only return torrents with OTL subtitles or `false` to exclude them.
mtl? | boolean | Set to `true` to only return torrents with machine translated subtitles or `false` to exclude them.
upgraded? | boolean | Set to `true` to only return upgraded torrents, *`false`* to exclude them, or `null` to include all torrents.
group_id? | string | Comma-separated group IDs to filter for.
group_primary? | boolean | Set to *`true`* to return torrents where the group is the uploader or `false` to exclude them.
group_secondary? | boolean | Set to `true` to return torrents where the group is not the uploader or *`false`* to exclude them.
group_childs? | boolean | Set to `true` to include torrents from child groups or *`false`* to exclude them.
group_parents? | boolean | Set to `true` to include torrents from parent groups or *`false`* to exclude them.
uploader_id? | string | Comma-separated uploader IDs to filter for.
uploader_uploads? | boolean | Set to *`true`* to return torrents where the uploader is the uploader or `false` to exclude them.
uploader_contributions? | boolean | Set to `true` to return torrents where the uploader is not the uploader or *`false`* to exclude them.

###### *italics* = default, ? = optional

<br>

!!!info
The Torznab API only provides magnet links, not torrent files, to ensure torrent clients use the auto title, and not the torrent title (important for tag matching).
!!!