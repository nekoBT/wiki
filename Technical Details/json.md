---
label: "JSON API"
icon: book
order: 1900
---
# JSON API
This is the main API for nekoBT, and is used for most requests.

The base URL for the JSON API is `https://nekobt.to/api/v1`

---

## Authorization

Most endpoints require authorization using an API key.<br>
To authorize your requests, use the `ssid` cookie with your API key as the value.

If authorization isn't present or is invalid, you will receive a `401 Unauthorized` JSON response.
```json
{
    "error": true,
    "message": "Unauthorized."
}
```

---

## Schema Validation

When sending data to the API, nekoBT validates the data against a schema.<br>
If the data is invalid, you will receive a `400 Bad Request` JSON response with details about the validation errors.
+++ Missing Required Property
```json
{
  "error": true,
  "message": "Data provided was invalid: must have required property 'query'.",
  "validate_errors": [
    {
      "instancePath": "",
      "schemaPath": "#/required",
      "keyword": "required",
      "params": {
        "missingProperty": "query"
      },
      "message": "must have required property 'query'"
    }
  ]
}
```
+++ Range Violation (over maximum)
```json
{
  "error": true,
  "message": "Data provided was invalid: 'limit' must be <= 100.",
  "validate_errors": [
    {
      "instancePath": "/limit",
      "schemaPath": "#/properties/limit/maximum",
      "keyword": "maximum",
      "params": {
        "comparison": "<=",
        "limit": 100
      },
      "message": "must be <= 100"
    }
  ]
}
```
+++ Range Violation (below minimum)
```json
{
  "error": true,
  "message": "Data provided was invalid: 'offset' must be >= 0.",
  "validate_errors": [
    {
      "instancePath": "/offset",
      "schemaPath": "#/properties/offset/minimum",
      "keyword": "minimum",
      "params": {
        "comparison": ">=",
        "limit": 0
      },
      "message": "must be >= 0"
    }
  ]
}
```
+++ Invalid Type
```json
{
  "error": true,
  "message": "Data provided was invalid: 'offset' must be integer.",
  "validate_errors": [
    {
      "instancePath": "/offset",
      "schemaPath": "#/properties/offset/type",
      "keyword": "type",
      "params": {
        "type": "integer"
      },
      "message": "must be integer"
    }
  ]
}
```
+++


---



## Rate Limiting

nekoBT enforces rate limits to prevent abuse of the API. These limits are not publicly shared.

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

---

## Endpoints

### Get Announcements
[!badge variant="info" text="GET"] `/announcements` [!badge variant="success" text="Auth Optional"]

Returns the latest announcements displayed on the home page from nekoBT.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": [
    {
      "start_time": "1763856000000",
      "end_time": "1767225600000",
      "message": "Welcome! This site is in open-beta, so expect issues and changes.",
      "link": "",
      "new_tab": false,
      "color": "grey", // info, success, warning, error, primary, grey
      "dismissible": true
    }
  ]
}
```
+++ Unsuccessful Response (500)
```json
{
  "error": true,
  "message": "Internal Error"
}
```
+++
==-



### Get Group
[!badge variant="info" text="GET"] `/groups/<group_id>` [!badge variant="success" text="Auth Optional"]

Returns information about a specific group, including its name, description, members, and other metadata.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "id": "1234567890",
    "name": "example",
    "display_name": "Example",
    "tag": "example",
    "display_tag": "Example",
    "pfp_hash": null,
    "tagline": "Example fansub group",
    "description": "This is an example fansub group.",
    "anonymous": 0,
    "members": [
      {
        "id": "1234567890",
        "username": "exampleuser",
        "invite": false,
        "invite_key": null, // Only present if user is group leader/admin
        "invite_has_recipient": null, // Only present if user is group leader/admin
        "display_name": "ExampleUser",
        "pfp_hash": "abcdef1234567890abcdef1234567890abcdef12",
        "leader": true,
        "admin": false,
        "regular": true,
        "torrent_count": 0
      }
    ],
    "relations": {
      "parents": [],
      "children": [
        {
          "id": "1234567890",
          "name": "example2",
          "display_name": "Example2",
          "tag": "example2",
          "display_tag": "Example2",
          "pfp_hash": null,
          "tagline": "",
          "anonymous": 0,
          "active": true, // Whether the link has been approved by both groups
          "initiator": false // Whether the child group was the one to initiate the link
        }
      ]
    },
    "media": [
      {
        "episodes": [ // List of episode IDs the group/child groups have worked on for this media
            "1234"
        ],
        "torrents": [ // List of torrent IDs the group/child groups have uploaded for this media
          "1234567890"
        ],
        "groups": [ // List of group IDs (including child groups) that have worked on this media
          "1234567890"
        ],
        "media": {
          "id": "m1",
          "title": "Example Movie",
          "banner_url": "https://image.tmdb.org/t/p/original/....jpg",
          "episodes": [ // Use this list to get episode details for the episodes worked on by this group
            {
              "id": 1234,
              "season": 1,
              "episode": 1,
              "absolute": 1,
              "tvdbId": 1234567,
              "title": "Example Episode Title"
            },
          ]
        }
      }
    ],
    "can_edit": false,
    "can_leave": false,
    "can_delete": null, // Only present if user is group leader
    "stats": {
      "uploads": 50,
      "hidden_uploads": 5, // Only present if user is group leader
      "tags": 28,
      "seeders": "261",
      "leechers": "2",
      "downloads": "4518"
    }
  }
}
```
+++ Unsuccessful Response (404)
```json
{
  "error": true,
  "message": "Group not found."
}
```
+++
==-




### Search Groups
[!badge variant="info" text="GET"] `/groups/search` [!badge variant="success" text="Auth Optional"]

Searches for groups based on their name.

==- Examples
+++ Query Parameters
Name | Type | Description
---- | ---- | -----------
query? | string | Search term for group name or tag
limit? | integer | Number of results to return (default: 50, range: 1-100)
offset? | integer | Number of results to skip for pagination (default: 0)
sort? | string | Sort results by field. *`created`*, `uploads`, `members`, `downloads`, `name`.
order? | string | Order of results. `asc` or *`desc`*.
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "results": [
      {
        "id": "1234567890",
        "anonymous": 0,
        "description": "",
        "display_name": "Example Group",
        "name": "example-group",
        "tag": "example-group",
        "display_tag": "Example Group",
        "pfp_hash": "abcdefghijklmnopqrstuvwxyz123456",
        "tagline": "An example group tagline.",
        "member_count": "5",
        "torrent_count": "2",
        "download_count": "53"
      }
    ],
    "more": true // Whether there are more results to fetch with pagination
  }
}
```
+++ Unsuccessful Response (500)
```json
{
  "error": true,
  "message": "Internal Error"
}
```
+++
==-




### Create Group Link
[!badge variant="success" text="POST"] `/groups/<group_id_1>/links/<group_id_2>` [!badge variant="warning" text="Auth Required"]

Creates a link between two groups. If the authorized user is the leader of both groups, the link is automatically approved. Otherwise, the link will be pending approval from the other group's leader.

`group_id_1` should be the group ID that the user is leader of, and `group_id_2` should be the other group ID.

==- Examples
+++ Query Parameters
Name | Type | Description
---- | ---- | -----------
parent | string | Group ID of the group that will be the parent in the link.
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "Link is waiting for other group to approve."
}
```
+++
==-




### Delete Group Link
[!badge variant="danger" text="DELETE"] `/groups/<group_id>/links/<group_id_2>` [!badge variant="warning" text="Auth Required"]

Deletes a link between two groups.

`group_id_1` should be the group ID that the user is leader of, and `group_id_2` should be the other group ID.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (403)
```json
{
  "error": true,
  "message": "Unauthorized."
}
```
+++
==-




### Add Group Member(s)
[!badge variant="success" text="POST"] `/groups/<group_id>/members` [!badge variant="warning" text="Auth Required"]

Creates invites for one or more users to join a group.

==- Examples
+++ JSON Parameters

Data should be formatted as a JSON Array of Objects with the following fields:

Name | Type | Description
---- | ---- | -----------
id | string or null | ID of the user to invite. If null, no specific user will be invited.
display_name | string or null | Display name of the user to invite. If a user ID is provided, this field is not used, and the display name is what the user's display name is.
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false,
  "data": [
    {
      "id": "1234567890",
      "invite_key": "abcdef1234567890abcdef1234567890",
    }
  ]
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "Display name (\"Example\") already taken."
}
```
+++
==-




### Update Group Member
[!badge variant="warning" text="PATCH"] `/groups/<group_id>/members/<user_or_invite_id>` [!badge variant="warning" text="Auth Required"]

Updates a member in a group.

==- Examples
+++ JSON Parameters
Name | Type | Description
---- | ---- | -----------
admin? | boolean | Whether the member is an admin.
regular? | boolean | Whether the member is a regular member.
display_name? | string | Can only be used on invites. New display name for the member/invite in the group.
###### At least one is required, *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (403)
```json
{
  "error": true,
  "message": "Forbidden."
}
```
+++
==-



### Remove Group Member
[!badge variant="danger" text="DELETE"] `/groups/<group_id>/members/<user_or_invite_id>` [!badge variant="warning" text="Auth Required"]

Removes a member from a group.

This endpoint has a `destructive` query parameter.<br>
To delete an invited member, `destructive=true` must be used.<br>
The differences are as follows:

Action | destructive=`false` | destructive=`true`
------ | ------------------- | -------------------
User is no longer associated with the group. | ✅ | ✅
The member becomes an invite with a "Deleted Member" name. | ✅ | ❌
Torrent contributions are transferred to a new invite. | ✅ | ❌
The member is permanently removed from all torrents. | ❌ | ✅
Uploads by the user for the group are transferred to the leader. | ✅ | ✅

==- Examples
+++ Query Parameters
Name | Type | Description
---- | ---- | -----------
destructive? | boolean | Defaults to *`false`*. Read above for more info.
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "Cannot soft delete an invite. Use ?destructive=true to delete an invite."
}
```
+++
==-



### Get Invite
[!badge variant="info" text="GET"] `/invites/<invite_id>` [!badge variant="success" text="Auth Optional"]

Returns information about an invited user, including the group it belongs to.

Use `?key=` to reveal who the recipient is.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "id": "1234567890",
    "display_name": "Example Invite",
    "author": {
      "id": "1234567890",
      "username": "example",
      "pfp_hash": "abcdef1234567890abcdef1234567890abcdef12",
      "display_name": "Example"
    },
    "used": false,
    "recipient": { // Only present if ?key= is used, and the key is valid, otherwise null
      "id": "1234567890",
      "display_name": "ExampleUser",
      "pfp_hash": null,
      "username": "exampleuser"
    },
    "group": {
      "id": "1234567890",
      "display_name": "Example",
      "name": "example",
      "tag": "example-subs",
      "display_tag": "Example-subs",
      "pfp_hash": "abcdef1234567890abcdef1234567890abcdef12",
      "anonymous": 0,
      "description": "blah blah blah",
      "tagline": "An example group tagline."
    },
    "torrent_count": "18"
  }
}
```
+++ Unsuccessful Response (404)
```json
{
  "error": true,
  "message": "Invite not found."
}
```
+++
==-



### Assign Invite
[!badge variant="warning" text="PATCH"] `/invites/<invite_id>` [!badge variant="warning" text="Auth Required"]

Assign an orphaned invite to a user. This is only used for group leaders/admins to assign invites that don't have a recipient. The user will receive a notification about the invite.

Orphaned invites are created when a member is invited without specifying a user ID (commonly on torrent upload page), or when a member is removed from the group without being deleted.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (403)
```json
{
  "error": true,
  "message": "Only group leaders and admins can edit invites."
}
```
+++
+++ Unsuccessful Response (404)
```json
{
  "error": true,
  "message": "Invite not found."
}
```
+++
==-



### Accept Invite
[!badge variant="success" text="POST"] `/invites/<invite_id>/accept/<invite_key>` [!badge variant="warning" text="Auth Required"]

Accepts an invite to a group using the provided invite ID and key.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "You are already in this group."
}
```
+++
==-



### Get Languages
[!badge variant="info" text="GET"] `/langs` [!badge variant="success" text="Auth Optional"]

Returns the list of supported languages for audio, subtitles, and fansubs.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "langs": {
      "ja": {
        "code": "ja",
        "name": "Japanese",
        "flag": "https://flagcdn.com/40x30/jp.png"
      },
      "en": {
        "code": "en",
        "name": "English",
        "flag": "https://flagcdn.com/40x30/gb.png"
      },
      "enm": {
        "code": "enm",
        "name": "English (Weeb)",
        "flag": "/assets/img/flags/enm.png"
      }
      // ...
    },
    "convert": {
      "jp": "ja",
      "eng": "en",
      "en-jp": "enm",
      "spa-419": "es-419",
      "es": "es-es",
      "pt": "pt-pt",
      "fr": "fr-fr",
      "tg": "fil",
      "nb": "no",
      "nn": "no"
    }
  }
}
```
+++ Unsuccessful Response (500)
```json
{
  "error": true,
  "message": "Internal Error"
}
```
+++
==-


### Get Media
[!badge variant="info" text="GET"] `/media/<media_id>` [!badge variant="success" text="Auth Optional"]

Returns information about a specific media item, including its title, description, and other metadata.

Use `?force=true` to get the media, even if there are no torrents for it.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "title": "Dusk Beyond the End of the World",
    "year": 2025,
    "genres": [
      "Animation",
      "Anime",
      "Romance",
      "Science Fiction"
    ],
    "overview": "When tensions around...",
    "status": "continuing",
    "banner_url": "https://artworks.thetvdb.com/banners/v4/series/465214/posters/685e663785276.jpg",
    "runtime": 24,
    "tvdbId": 465214,
    "tmdbId": 294867,
    "imdbId": "tt37532634",
    "alternate_titles": [
      "Towa no Yuugure",
      "Towa no Yugure"
    ],
    "notes": null,
    "episodes": [
      {
        "id": 48690,
        "title": "Think Morning, Count Two",
        "season": 0,
        "episode": 1,
        "overview": "Akira and Towasa's friendship...",
        "runtime": 24,
        "airDateUtc": "2025-09-25T15:30:00Z",
        "tvdbId": 11307751
      }
    ],
    "groups": [
      {
        "id": "1234567890",
        "name": "example",
        "display_name": "Example",
        "tag": "example",
        "display_tag": "Example",
        "tagline": "Example fansub group",
        "pfp_hash": null,
        "episodes": { // Episodes worked on by this group
          "48690": {
            "level": 1, // Highest sub level for this episode by this group
            "video_type": 9,
            "mtl": false
          }
        },
        "max_level": 1, // Highest sub level for this media by this group
        "langs": {
          "fsub": [
            "en"
          ],
          "sub": []
        }
      }
    ]
  }
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "No torrents found for this media."
}
```
+++
==-



### Search Media
[!badge variant="info" text="GET"] `/media/search` [!badge variant="success" text="Auth Optional"]

Searches for media items based on search query.

==- Examples
+++ Query Parameters
Name | Type | Description
---- | ---- | -----------
query | string | Search term for media title
limit? | integer | Number of results to return (default: 50, range: 1-100)
offset? | integer | Number of results to skip for pagination (default: 0)
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "more": true,
    "results": [
      {
        "id": "s1234",
        "title": "Aria",
        "year": 2005,
        "genres": [
          "Animation",
          "Anime",
          "Comedy",
          "Drama",
          "Fantasy",
          "Science Fiction"
        ],
        "overview": "On the planet Aqua lies the watery...",
        "status": "ended",
        "banner_url": "https://artworks.thetvdb.com/banners/posters/79839-3.jpg",
        "runtime": 25,
        "tvdbId": 79839,
        "tmdbId": 53787,
        "imdbId": "tt0977907",
        "alternate_titles": [
          "Aria the Natural",
          "Aria the Origination"
        ],
        "similarity": 0.25
      }
    ]
  }
}
```
+++ Unsuccessful Response (500)
```json
{
  "error": true,
  "message": "Internal Error"
}
```
+++
==-



### Get Site Statistics
[!badge variant="info" text="GET"] `/stats` [!badge variant="success" text="Auth Optional"]

Returns various statistics about the site, such as the number of users, torrents, and groups.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "created_at": "1764203045818",
    "top_media_1w": [ // Top media by seeders in the past week, max 10
      {
        "id": "s1539",
        "title": "Dusk Beyond the End of the World",
        "banner_url": "https://artworks.thetvdb.com/banners/v4/series/465214/posters/685e663785276.jpg",
        "seeders": 155
      }
    ],
    "users": {
      "total": 405,
      "new_1w": 254,
      "active_1m": 331
    },
    "groups": {
      "total": 177,
      "new_1w": 77,
      "active_1m": 47
    },
    "torrents": {
      "total": 578,
      "new_1d": 48,
      "total_downloads": 36500
    },
    "peers": {
      "seeders": 2683,
      "leechers": 31
    }
  },
  "message": "Cache hit, returning stats."
}
```
+++ Unsuccessful Response (500)
```json
{
  "error": true,
  "message": "Timed out whilst fetching stats."
}
```
+++
==-


### Get Torrent
[!badge variant="info" text="GET"] `/torrents/<torrent_id>` [!badge variant="success" text="Auth Optional"]

Returns information about a specific torrent, including its title, description, and other metadata.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "id": "1234567890",
    "uploaded_at": "1765432000000", // Unix timestamp in milliseconds
    "title": "Torrent Title",
    "auto_title": "Torrent Title {Tags:L1;V9;C1;A-ja;F-en;}",
    "description": "...", // Markdown formatted description, can be null
    "mediainfo": "...", // Can be null
    "category": 1,
    "deleted": null,
    "hidden": false,
    "otl": false,
    "hardsub": false,
    "level": 1,
    "mtl": false,
    "filesize": "242587117",
    "media_id": "s1234",
    "media_episode_ids": [
      "48665"
    ],
    "audio_lang": "ja", // All languages are comma separated lists
    "sub_lang": "",
    "fsub_lang": "en",
    "video_codec": 1,
    "video_type": 9,
    "files": [
      {
        "path": "[SubsPlus+] Hero Without a Class - Who Even Needs Skills - S01E10 (ADN WEB-DL 1080p AVC AAC) [FAC10B8C].mkv",
        "name": "[SubsPlus+] Hero Without a Class - Who Even Needs Skills - S01E10 (ADN WEB-DL 1080p AVC AAC) [FAC10B8C].mkv",
        "length": 592387117,
        "offset": 0
      }
    ],
    "magnet": "magnet:?xt=urn:btih:bd2fb09...",
    "private_magnet": "magnet:?xt=urn:btih:bd2fb09...",
    "infohash": "bd2fb09...",
    "anonymous": false,
    "uploader": { // Can be null on anonymous uploads
      "id": "1234567890",
      "username": "example",
      "display_name": "Example",
      "pfp_hash": null
    },
    "groups": [
      {
        "id": "1234567890",
        "name": "example group",
        "display_name": "Example Group",
        "pfp_hash": null,
        "tagline": "An example group tagline.",
        "members": [
          {
            "id": "1234567890",
            "invite": false,
            "username": "exampleuser",
            "display_name": "ExampleUser",
            "pfp_hash": null,
            "role": "Typesetting",
            "weight": 1 // Order of members, smallest first
          }
        ],
        "uploading_group": true,
        "role": null
      }
    ],
    "imported": null, // If imported from Nyaa, the original Nyaa ID, otherwise null
    "seeders": "52",
    "leechers": "1",
    "completed": "185",
    "activity": "5557", // Estimated peer speeds in bytes/second
    "torrent_health": "100", // Estimated health of the torrent (P75 of peers progress)
    "upgraded": null, // Torrent ID of the new torrent, or null
    "animetosho": [ // Can be null, array, or 'skipped', 'processing', 'not_found', 'error', 'no_media'
      {
        "file_id": 1234,
        "filename": "....mkv",
        "filesize": 937007977,
        "subs": [
          {
            "id": 5678,
            "codec": "SRT",
            "lang": "jpn",
            "name": "SDH",
            "default": false,
            "enabled": true,
            "forced": false,
            "trackid": 4,
            "tracknum": 5
          }
        ],
        "mediainfo": "General\nUniqu...",
        "screenshot_id": "00000000", // You can use this ID and timings to reconstruct the screenshot URLs
        "screenshot_timings": [
          13980,
          366330,
          718680,
          1069030,
          1421380
        ]
      }
    ],
    "animetosho_fetch_time": "1767984097784", // Unix timestamp in milliseconds of when the AnimeTosho data was fetched, or null
    "screenshots": [ // Array of screenshot URLs, can be empty. If AnimeTosho data is present, it is highly likely screenshots has data. Max 5 screenshots.
      "https://storage.animetosho.org/sframes/00000000_13980.png",
      "https://storage.animetosho.org/sframes/00000000_366330.png",
      "https://storage.animetosho.org/sframes/00000000_718680.png",
      "https://storage.animetosho.org/sframes/00000000_1069030.png",
      "https://storage.animetosho.org/sframes/00000000_1421380.png"
    ],
    "can_edit": false,
    "waiting_approve": false,
    "disable_comments": false,
    "lock_comments": false,
    "disable_edits": false,
    "nyaa_upload_time": null // If imported from Nyaa, the original upload time as a Unix timestamp in milliseconds, otherwise null
  }
}
```
+++ Unsuccessful Response (403)
```json
{
  "error": true,
  "message": "Torrent is waiting for approval."
}
```
+++
==-



### Edit Torrent
[!badge variant="warning" text="PATCH"] `/torrents/<torrent_id>` [!badge variant="warning" text="Auth Required"]

Edit a specific torrent.

==- Examples
+++ JSON Data Parameters
Name | Type | Description
---- | ---- | -----------
title? | string | New title for the torrent (max 512 characters)
upgraded? | number or null | Torrent ID of the new torrent that replaces this one, or null to remove upgrade
description? | string | Markdown formatted description (max 8192 characters)
mediainfo? | string | Mediainfo data (max 65536 characters)
video_type? | number or null | Video type category
video_codec? | number or null | Video codec category
audio_lang? | string | Comma-separated list of audio languages
sub_lang? | string | Comma-separated list of subtitle languages
fsub_lang? | string | Comma-separated list of fansub languages
anonymous? | boolean | Whether the upload should be anonymous
hidden? | boolean | Whether the torrent should be hidden
hardsub? | boolean | Whether the torrent contains hardsubbed video
otl? | boolean | Whether the torrent's subtitles contains an original translation
mtl? | boolean | Whether the torrent's subtitles contains machine translation
primary_group? | object or null | Primary group information, members, etc
secondary_groups? | array | Array of secondary groups
media_episodes? | array | Array of episode IDs (numbers) this torrent contains
deleted? | boolean | Whether the torrent is deleted
deletion_reason? | string | Reason for deletion (max 256 characters)
###### At least one is required, *italics* = default, ? = optional
+++ Example Request Data
```json
{
  "title": "Torrent Title",
  "upgraded": null,
  "description": "...",
  "mediainfo": "...",
  "video_type": 9,
  "video_codec": 1,
  "audio_lang": "ja",
  "sub_lang": "",
  "fsub_lang": "en",
  "anonymous": false,
  "hidden": false,
  "primary_group": {
    "id": "1234567890",
    "members": [
      {
        "id": "1234567890", // Can be null for new members
        "display_name": "ExampleUser", // Only used for new members
        "role": "Typesetting",
        "pfp_hash": null
      }
    ]
  },
  "secondary_groups": [],
  "media_episodes": [
    48665
  ],
  "mtl": false,
  "otl": false,
  "hardsub": false
}
```
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "Can't edit torrent due to parsing failures.",
  "fails": [
    "You have set sub level to \"no subs\", but you have added fansub languages."
  ],
  "warns": []
}
```
+++
==-



### Get Torrent's AnimeTosho Data
[!badge variant="info" text="GET"] `/torrents/<torrent_id>/animetosho` [!badge variant="success" text="Auth Optional"]

Returns the AnimeTosho data for a specific torrent. **You should handle for long request times on this endpoint.** If data is not yet available, the request may take up to 60 seconds to complete while the site fetches all data from AnimeTosho.

AnimeTosho data is not fetched automatically for torrents. A client must request it using this endpoint before the site will fetch it from AnimeTosho. The site's frontend will automatically call this endpoint when viewing a torrent that does not have final AnimeTosho data yet.

If another user is already fetching the data for this torrent, your request will be halted until the other user's fetch is complete, to prevent multiple simultaneous fetches for the same torrent.

Even if the request is cancelled by the client, the site will continue fetching the data in the background.

| Status | Description | Retry Later? | 
|--------|-------------|--------------|
| `skipped` | The torrent was skipped by AnimeTosho. | ❌ |
| `processing` | The torrent is still being processed on AnimeTosho. | 🟠 (Retry if last attempt was more than 3 minutes ago) |
| `not_found` | The torrent was not found on AnimeTosho. | 🟠 (No retry if last attempt was 1hr after upload) |
| `no_media` | The torrent was found, but no media file was found on AnimeTosho. | ❌ |
| `error` | AnimeTosho returned an unexpected status. | ❌ |

==- Examples
+++ Successful Response (200, 201)
`200` if data was already present, `201` if the data was just fetched.
```json
{
  "error": false,
  "data": [
    {
      "file_id": 1234,
      "filename": "....mkv",
      "filesize": 937007977,
      "subs": [
        {
          "id": 5678,
          "codec": "SRT",
          "lang": "jpn",
          "name": "SDH",
          "default": false,
          "enabled": true,
          "forced": false,
          "trackid": 4,
          "tracknum": 5
        }
      ],
      "mediainfo": "General\nUniqu...",
      "screenshot_id": "00000000", // You can use this ID and timings to reconstruct the screenshot URLs
      "screenshot_timings": [
        13980,
        366330,
        718680,
        1069030,
        1421380
      ]
    }
  ],
  "retry": false
}
```
+++ Semi-Successful Response (202)
The server sent a request to AnimeTosho, received a `processing` status, and is still waiting for the data to be ready.
```json
{
  "error": false,
  "message": "Torrent is still being processed on AnimeTosho.",
  "retry": true
}
```
+++ Unsuccessful Response (400, 403, 404, 500)
```json
{
  "error": true,
  "message": "Torrent was skipped on AnimeTosho.",
  "retry": false
}
```
+++
==-



### Get Torrent Comments
[!badge variant="info" text="GET"] `/torrents/<torrent_id>/comments` [!badge variant="success" text="Auth Optional"]

Returns comments for a specific torrent.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": [
    {
      "id": "1234567890",
      "deleted": false,
      "user_id": "1234567890",
      "text": "this is a comment",
      "replying_to": null,
      "display_name": "Example",
      "pfp_hash": "abcdef1234567890abcdef1234567890abcdef12",
      "positive": "0",
      "negative": "0",
      "pinned": false,
      "user_rating": null, // The authenticated user's rating for this comment, true (liked), false (disliked), or null (no rating)
      "last_edit": null,
      "children": [
        {
          "id": "4567890123",
          "deleted": false,
          "user_id": "1234567890",
          "text": "@Example and this is a reply",
          "replying_to": "1234567890",
          "display_name": "Example2",
          "pfp_hash": null,
          "positive": "0",
          "negative": "0",
          "pinned": false,
          "user_rating": null,
          "last_edit": 1764031668355 // Unix timestamp in milliseconds, or null
        },
        {
          "id": "6789012345",
          "deleted": true, // Deleted comments replace user_id, text, and display_name
          "user_id": "0",
          "text": "[deleted]",
          "replying_to": "1234567890",
          "display_name": "[deleted]",
          "pfp_hash": null,
          "positive": "0",
          "negative": "0",
          "pinned": false,
          "user_rating": null,
          "last_edit": null
        }
      ]
    }
  ]
}
```
+++ Unsuccessful Response (404)
```json
{
  "error": true,
  "message": "Torrent not found."
}
```
+++
==-


### Get Torrent File
[!badge variant="info" text="GET"] `/torrents/<torrent_id>/download` [!badge variant="success" text="Auth Optional"]

Returns the torrent file for a specific torrent.

When authenticated, the returned torrent file will be a private torrent with the user's passkey included in the announce URL.<br>
You can specify `?public=true` to get the torrent file without your torrent key.

This endpoint returns the raw torrent file data with a `application/x-bittorrent` content type.



### Bulk Download Torrents
[!badge variant="success" text="GET"] `/torrents/bulk/download` [!badge variant="success" text="Auth Optional"]

[!badge variant="warning" text="PATCH"] `/torrents/bulk/download` [!badge variant="success" text="Auth Optional"]

Download a group of .torrent files as a ZIP archive. Maximum 500 torrents per request.

You can either use a `GET` request with query parameters, or a `PATCH` request with a JSON body.<br>
The `PATCH` method is recommended for larger requests, as the `GET` method may hit URL length limits.

When authenticated, the returned torrent files will be private torrents with the user's passkey included in the announce URL.<br>
You can specify `public=true` to get the torrent files without your torrent key.

==- Examples
+++ Query Parameters (GET)
Name | Type | Description
---- | ---- | -----------
ids | string | Comma-separated list of torrent IDs to download
public? | boolean | Whether to download torrents without your passkey (default: *`false`*)
###### *italics* = default, ? = optional
+++ JSON Data Parameters (PATCH)
Name | Type | Description
---- | ---- | -----------
ids | array | Array of torrent IDs to download
public? | boolean | Whether to download torrents without your passkey (default: *`false`*)
###### *italics* = default, ? = optional
+++ Example Request Data
```json
{
  "ids": [
    "1234567890",
    "0987654321"
  ],
  "public": false
}
```
+++ Successful Response (200)
Will return a ZIP file containing the requested .torrent files.
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "No accessible torrents found."
}
```
+++
==-



### Bulk Edit Torrents
[!badge variant="warning" text="PATCH"] `/torrents/bulk/edit` [!badge variant="warning" text="Auth Required"]

Edit a group of torrents. You must have permission to edit all specified torrents. Maximum 250 torrents per request.

This endpoint will return a `bad_torrents` field in the response if any of the specified torrents could not be edited.

==- Examples
+++ JSON Data Parameters
Name | Type | Description
---- | ---- | -----------
ids | array | Array of torrent IDs to edit (min 1, max 250)
title? | array | Array of find/replace objects to modify titles. Each object has `find` (string, max 256) and `replace` (string, max 256) properties (max 5 replacements)
upgraded? | number or null | Torrent ID of the new torrent that replaces these, or null to remove upgrade
description? | string | Markdown formatted description (max 8192 characters)
video_type? | number or null | Video type category
video_codec? | number or null | Video codec category
audio_lang? | string | Comma-separated list of audio languages (max 256 characters)
sub_lang? | string | Comma-separated list of subtitle languages (max 256 characters)
fsub_lang? | string | Comma-separated list of fansub languages (max 256 characters)
anonymous? | boolean | Whether the uploads should be anonymous
hidden? | boolean | Whether the torrents should be hidden
hardsub? | boolean | Whether the torrents contain hardsubbed video
mtl? | boolean | Whether the torrents contain machine translated subtitles
otl? | boolean | Whether the torrents' subtitles contain an original translation
primary_group? | object or null | Primary group information, members, etc (admin only)
secondary_groups? | array | Array of secondary group objects with `id` (string) and `role` (string or null, max 64)
deleted? | boolean | Whether the torrents are deleted
deletion_reason? | string | Reason for deletion (max 256 characters)
###### At least one is required, *italics* = default, ? = optional
+++ Example Request Data
```json
{
  "ids": [
    "1234567890",
    "0987654321"
  ],
  "title": [
    {
      "find": "x264",
      "replace": "x265"
    }
  ],
  "upgraded": null,
  "description": "...",
  "video_type": 9,
  "video_codec": 1,
  "audio_lang": "ja",
  "sub_lang": "",
  "fsub_lang": "en",
  "anonymous": false,
  "hidden": false,
  "primary_group": {
    "id": "1234567890",
    "members": [
      {
        "id": "1234567890", // Can be null for new members
        "display_name": "ExampleUser", // Only used for new members
        "role": "Typesetting",
        "pfp_hash": null
      }
    ]
  },
  "secondary_groups": [],
  "mtl": false,
  "otl": false,
  "hardsub": false
}
```
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "Can't edit torrent due to parsing failures.",
  "fails": [
    "You have set sub level to \"no subs\", but you have added fansub languages."
  ],
  "bad_torrents": [
    "0987654321"
  ],
  "warns": []
}
```
+++
==-




### Check Torrent(s) Permissions
[!badge variant="warning" text="PATCH"] `/torrents/bulk/edit/perms` [!badge variant="warning" text="Auth Required"]

Checks whether you have permission to edit the torrents provided. Maximum 250 torrents per request.

This endpoint will return a `bad_torrents` field in the response if any of the specified torrents can not be edited.

This request is done before attempting a bulk edit on the website. You don't have to call this endpoint before calling the bulk edit endpoint.
You will receive the same `bad_torrents` field in the bulk edit response.

==- Examples
+++ JSON Data Parameters
Name | Type | Description
---- | ---- | -----------
ids | array | Array of torrent IDs to edit (min 1, max 250)
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "You do not have permission to edit one or more torrents.",
  "bad_torrents": [
    "0987654321"
  ]
}
```
+++
==-



### Search Torrents
[!badge variant="info" text="GET"] `/torrents/search` [!badge variant="success" text="Auth Optional"]

Searches for torrents, using various criteria.

The search API attempts to extract meaning from the `query` parameter (called "hints"). Some examples are:
- Searching `HEVC`, it will automatically add the video codec filter for HEVC.
- Searching `your lie in april`, it will recommend the media "Your Lie in April", either in `recommended_media` if >=70% of results match, or in `similar_media` by title searching.
- Searching `s01` when a `media_id` is provided, it will add season 1 to the episode filter.  
- Searching `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` will assume it's an info hash, and search for the torrent directly, and return a torrent ID for in the `infohash_match` data field if a torrent is found.


==- Examples
+++ Query Parameters
Name | Type | Description
---- | ---- | -----------
query? | string | Search term for media title
limit? | integer | Number of results to return (default: *`50`*, range: `1`-`100`)
offset? | integer | Number of results to skip for pagination (default: 0)
sort_by? | string | Sort order: *`best`*, `latest`, `oldest`, `rss`, `seeders`, `seeders_asc`, `leechers`, `leechers_asc`, `downloads`, `downloads_asc`, `comments`, `comments_asc`, `filesize`, `filesize_asc`.
category? | number | Category filter: *`0`*. This currently isn't used, as there's only one category.
media_id? | string | Filter by specific media ID
episode_ids? | string | Comma-separated episode IDs to filter by
episode_match_any? | boolean | Match any episode ID instead of requiring a torrent to have all episodes: *`false`*
levels? | string | Comma-separated subtitle levels to filter by
video_codec? | string | Comma-separated video codec IDs to filter by
video_type? | string | Comma-separated video type IDs to filter by
audio_lang? | string | Comma-separated audio languages to filter by
fansub_lang? | string | Comma-separated fansub languages to filter by
sub_lang? | string | Comma-separated subtitle languages to filter by
hardsub? | boolean | Filter by hardsubbed torrents
otl? | boolean | Filter by original translation torrents
mtl? | boolean | Filter by machine translation torrents
group_id? | string | Filter by group ID
group_primary? | boolean | Include primary group uploads (default: true)
group_secondary? | boolean | Include secondary group uploads (default: false)
group_childs? | boolean | Include child group uploads (default: true)
group_parents? | boolean | Include parent group uploads (default: false)
uploader_id? | string | Filter by uploader ID
uploader_uploads? | boolean | Include uploader's uploads (default: true)
uploader_contributions? | boolean | Include uploader's contributions (default: false)
before? | string | Filter torrents uploaded before this date, unix milliseconds
after? | string | Filter torrents uploaded after this date, unix milliseconds
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "results": [
      {
        "id": "1234567890",
        "uploaded_at": "1765432000000", // Unix timestamp in milliseconds
        "title": "Torrent Title",
        "infohash": "abdef...",
        "magnet": "magnet:?xt=urn:btih:9a4e649...",
        "private_magnet": null, // Only present if authenticated
        "media_id": "s123",
        "description": "...", // Can be null
        "filesize": "7738622751", // In bytes
        "category": 1,
        "level": 4,
        "otl": true,
        "hardsub": false,
        "mtl": false,
        "comment_count": "0",
        "deleted": null,
        "hidden": false,
        "waiting_approve": false,
        "auto_title": "Torrent Title {Tags:OTL;L4;V13;C1;A-ja;F-en;}",
        "audio_lang": "ja", // Comma-separated list of languages
        "sub_lang": "",
        "fsub_lang": "en",
        "video_codec": 1,
        "video_type": 13,
        "anonymous": false,
        "upgraded": null,
        "uploader": {
          "id": "1234567890",
          "display_name": "Example",
          "username": "example",
          "pfp_hash": "abdef..."
        },
        "seeders": "0",
        "leechers": "0",
        "completed": "0",
        "groups": [
          {
            "id": "1234567890",
            "display_name": "Example Group",
            "name": "example group",
            "anonymous": 0,
            "tagline": "An example group tagline.",
            "pfp_hash": "abdef...",
            "uploading_group": true // Primary = true, Secondary = false
          }
        ],
        "imported": 123456, // If imported from Nyaa, the original Nyaa Torrent ID, otherwise null
        "user_is_seeding": null, // If the authenticated user is seeding this torrent, true/false/null
        "user_is_leeching": null, // If the authenticated user is leeching this torrent, true/false/null
        "user_download_count": null, // Number of times the authenticated user has downloaded this torrent, or null
        "has_mediainfo": false,
        "nyaa_upload_time": "1573878523000" // If imported from Nyaa, the original upload time as a Unix timestamp in milliseconds, otherwise null
      }
    ],
    "infohash_match": null, // If the query matched an infohash exactly, this field contains that torrent ID, otherwise null
    "recommended_media": null, // If the search used a query, and >=70% of the results contain the same media ID, this field contains that media object, otherwise null
    "media": null, // If the search used a media_id filter, this field contains that media object, otherwise null
    "similar_media": null, // If the query was similar to a media title, this field contains a list of media objects, otherwise null
    "debug": {
      "summary": [], // Summary of applied filters extracted from the query
      "debug": [
        "no hints found",
        "hiding hidden torrents",
        "sorting by best (level desc)",
        "found 50 torrents",
        "found 67 group relations",
        "found 35 groups",
        "found 22 users"
      ]
    },
    "more": true, // Whether there are more results to fetch with pagination
    "search": { // Returns search parameters actually used after getting hints 
      "limit": 50,
      "offset": 0,
      "sort_by": "best",
      "category": 0,
      "episode_match_any": false,
      "group_primary": true,
      "group_secondary": false,
      "group_childs": true,
      "group_parents": false,
      "uploader_uploads": true,
      "uploader_contributions": false
    }
  }
}
```
+++ Unsuccessful Response (500)
```json
{
  "error": true,
  "message": "Internal Error"
}
```
+++
==-



### Upload Torrent
[!badge variant="success" text="POST"] `/upload` [!badge variant="warning" text="Auth Required"]

Uploads a new torrent to the site.

It's recommended you first perform [upload checks](#perform-upload-checks) before uploading a torrent, to ensure the torrent is being parsed as expected.

==- Examples
+++ JSON Data Parameters
Name | Type | Description
---- | ---- | -----------
torrent | string | Base64 encoded torrent file
title | string | Title for the torrent (max 512 characters)
movie | boolean | Whether this torrent is for a movie (true) or series (false)
category | number | Category ID (currently only 1 is valid)
video_type | number or null | Video type category ID
video_codec | number or null | Video codec category ID
level | number | Subtitle level (-1 to 4, -1 = no subs)
mtl | boolean | Whether the torrent contains machine translated subtitles
anonymous | boolean | Whether the upload should be anonymous
hidden | boolean | Whether the torrent should be hidden
otl | boolean | Whether the torrent's subtitles contain an original translation
hardsub | boolean | Whether the torrent contains hardsubbed video
primary_group? | object | Primary group information (see below)
secondary_groups | array | Array of secondary group objects (max 50 items)
audio_langs | string | Comma-separated list of audio languages (max 256 characters)
sub_langs | string | Comma-separated list of subtitle languages (max 256 characters)
fansub_langs | string | Comma-separated list of fansub languages (max 256 characters)
description | string | Markdown formatted description (max 8192 characters)
mediainfo? | string | Mediainfo data (max 65536 characters)
ignore_warnings? | boolean | Whether to ignore validation warnings, and proceed with the upload

**Primary Group Object:**
- `id` (string): Group ID
- `members` (array, max 50): Array of member objects with:
  - `id` (string or null): User ID, Invite ID, or null for new invites
  - `role` (string): Role name
  - `display_name` (string, max 32): Display name (used for new invites)

**Secondary Group Object:**
- `id` (string): Group ID
- `role` (string or null, max 64): Role name or null
###### *italics* = default, ? = optional
+++ Example Request Data
```json
{
  "torrent": "ZDg6YW5ub3VuY2....",
  "title": "[ExampleGroup] Media Title - 01 [WEB 1080p x265][FLAC 2.0]",
  "movie": false,
  "category": "1",
  "video_codec": 2,
  "hidden": false,
  "video_type": "7",
  "level": "3",
  "mtl": false,
  "otl": false,
  "hardsub": false,
  "anonymous": false,
  "primary_group": {
    "id": "1234567890",
    "members": [
      {
        "id": "1234567890",
        "display_name": "", // Can be empty for existing members 
        "role": "Typesetting"
      }
    ]
  },
  "secondary_groups": [
    {
      "id": "0987654321",
      "role": "Encode"
    }
  ],
  "audio_langs": "jp",
  "sub_langs": "",
  "fansub_langs": "en",
  "description": "Example description...",
  "mediainfo": ""
}
```
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "id": "1234567890"
  }
}
```
+++ Unsuccessful Response (400) (Warning)
```json
{
  "error": true,
  "message": "Can't upload torrent due to parsing warnings.",
  "fails": [],
  "warns": [
    "You have not included our public tracker URL in your torrent. If you plan to upload this torrent to other sites, you should make sure you include it.",
    "You have not added any audio languages, please make sure to include them if you have any audio tracks."
  ]
}
```
+++ Unsuccessful Response (400) (Failure)
```json
{
  "error": true,
  "message": "Can't upload torrent due to parsing failures.",
  "fails": [
    "Torrents must have at least one backup tracker."
  ],
  "warns": [
    "You have not included our public tracker URL in your torrent. If you plan to upload this torrent to other sites, you should make sure you include it.",
    "You have not added any audio languages, please make sure to include them if you have any audio tracks."
  ]
}
```
+++
==-



### Perform Upload Checks
[!badge variant="warning" text="PUT"] `/upload/checks` [!badge variant="warning" text="Auth Required"]

Performs various checks for a new torrent upload, such as verifying its parsability.


==- Examples
+++ JSON Data Parameters
Name | Type | Description
---- | ---- | -----------
title | string | Title for the torrent (max 512 characters)
movie | boolean | Whether this torrent is for a movie (true) or series (false)
files | array of objects | Array of file objects with `path` (string) that the torrent contains
video_type | number or null | Video type category ID
video_codec | number or null | Video codec category ID
level | number | Subtitle level (null or -1 to 4, -1 = no subs)
mtl | boolean | Whether the torrent contains machine translated subtitles
otl | boolean | Whether the torrent's subtitles contain an original translation
hardsub | boolean | Whether the torrent contains hardsubbed video
primary_group? | object | Primary group information (see below)
audio_langs | string | Comma-separated list of audio languages (max 256 characters)
sub_langs | string | Comma-separated list of subtitle languages (max 256 characters)
fansub_langs | string | Comma-separated list of fansub languages (max 256 characters)
announce_urls? | array of strings | Array of announce URLs in the torrent file
raw_announce_urls? | array of arrays of strings | Tiered announce URLs in the torrent file

**Primary Group Object:**
- `id` (string): Group ID
- `tag` (string): Group tag
- `members` (array, max 50): Array of member objects with:
  - `id` (string or null): User ID, Invite ID, or null for new invites
  - `role` (string): Role name
  - `display_name` (string, max 32): Display name (used for new invites)
###### *italics* = default, ? = optional
+++ Example Request Data
```json
{
  "title": "[ExampleGroup] Media Title - 01 [WEB 1080p x265][FLAC 2.0]",
  "movie": false,
  "video_type": null,
  "video_codec": null,
  "files": [
    {
      "path": "[ExampleGroup] Media Title - 01 [WEB 1080p x265][FLAC 2.0].mkv",
    }
  ],
  "level": "",
  "mtl": false,
  "otl": false,
  "hardsub": false,
  "audio_langs": "",
  "sub_langs": "",
  "fansub_langs": "",
  "announce_urls": [
    "udp://tracker.opentrackr.org:1337/announce",
  ],
  "raw_announce_urls": [
    [
      "udp://tracker.opentrackr.org:1337/announce",
    ]
  ]
}
```
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "warns": [
      "You have not included our public tracker URL in your torrent. If you plan to upload this torrent to other sites, you should make sure you include it.",
      "You have not added any audio languages, please make sure to include them if you have any audio tracks."
    ],
    "fails": [
      "You need to set your Primary Group to the \"Release Group\" found in your title."
    ],
    "parsedData": {
      "media": {
        "torrentTitle": "Media Title",
        "releaseTokens": " [WEB 1080p x265][FLAC 2.0]",
        "title": "Media Title",
        "genres": [
          "Action",
          "Animation",
          "Anime",
          "Comedy",
          "Fantasy",
          "Romance"
        ],
        "id": 1234
      },
      "episodes": [
        {
          "id": 1234567,
          "title": "Episode Title",
          "season": 1,
          "episode": 1,
          "absolute": 1
        }
      ],
      "quality": {
        "id": 3,
        "name": "WEBDL-1080p",
        "source": "web",
        "resolution": 1080,
        "version": 1
      },
      "releaseGroup": "ExampleGroup"
    },
    "auto_title": "[ExampleGroup] Media Title - 01 [WEB 1080p x265][FLAC 2.0]",
    "upgraded_torrents": []
  }
}
```
+++ Unsuccessful Response (500)
```json
{
  "error": true,
  "message": "Internal Error"
}
```
+++
==-




### Perform Mediainfo Extraction
[!badge variant="warning" text="PUT"] `/upload/mediainfo` [!badge variant="success" text="Auth Optional"]

Extracts metadata for a torrent using Mediainfo Text or JSON output.

When providing JSON output, you must provide the data as JSON, not a JSON string.

==- Examples
+++ JSON Data Parameters
Name | Type | Description
---- | ---- | -----------
mediainfo | string or object | Mediainfo data as plain text or JSON object
###### *italics* = default, ? = optional
+++ Example Request Data (Text)
```json
{
  "mediainfo": "General\nComplete name                            : example.mkv\nFormat                                   : Matroska\nFile size                                : 1.46 GiB\nDuration                                 : 24 min 0 s\nOverall bit rate                         : 8 738 kb/s\n..."
}
```
+++ Example Request Data (JSON)
You can either provide the whole JSON object from Mediainfo, or just the `media` object.
```json
{
  "mediainfo": {
    "track": [
      {
        "@type": "General",
        "Complete_name": "example.mkv",
        "Format": "Matroska",
        "File_size": "1.46 GiB",
        "Duration": "24 min 0 s",
        "Overall_bit_rate": "8 738 kb/s"
      }
      // ...
    ]
  }
}
```
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "video_codec": 2,
    "fansub_langs": "",
    "sub_langs": "en",
    "audio_langs": "jp"
  }
}
```
+++ Unsuccessful Response (400)
```json
{
  "error": true,
  "message": "Failed to extract mediainfo text languages and codec."
}
```
+++
==-




### Get User
[!badge variant="info" text="GET"] `/users/<user_id|@me>` [!badge variant="success" text="Auth Optional"]

!!!info
For all endpoints starting with `/users/`, you can also use `@me` for `<user_id>` to refer to the currently authenticated user.
!!!
Returns information about a specific user, including their username, profile picture, and other metadata.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "id": "1234567890",
    "username": "example",
    "display_name": "Example",
    "pfp_hash": "abdef1234567890abcdef1234567890abcdef12",
    "description": "Example user description.",
    "permissions": 0, // Only present if authenticated as this user
    "torrent_key": "...", // Only present if authenticated as this user
    "torrent_count": 2,
    "contribution_count": 1,
    "groups": [
      {
        "id": "1234567890",
        "name": "example group",
        "display_name": "Example Group",
        "tagline": "An example group tagline.",
        "anonymous": 0,
        "description": "Example group description.",
        "pfp_hash": "abdef1234567890abcdef1234567890abcdef12",
        "tag": "examplegroup",
        "display_tag": "ExampleGroup",
        "admin": false,
        "leader": false,
        "regular": false
      }
    ],
    "upload": "50043", // Total uploaded bytes
    "download": "1945", // Total downloaded bytes
    "seeding": "0", // Number of torrents currently seeding
    "leeching": "0", // Number of torrents currently leeching
    "disabled": false, // Whether the account is disabled
    "nyaa": [
      {
        "username": "ExampleNyaa",
        "public": true // Private links are only shown if authenticated as this user
      }
    ],
    "can_edit": false,
    "has_mfa": null, // Whether the user has multi-factor authentication enabled, only shown if authenticated as this user
    "can_download_recovery": null // Whether the user can still download their recovery key, only shown if authenticated as this user
  }
}
```
+++ Unsuccessful Response (404)
```json
{
  "error": true,
  "message": "Invalid user ID."
}
```
+++
==-



### Edit User
[!badge variant="warning" text="PATCH"] `/users/<user_id|@me>` [!badge variant="warning" text="Auth Required"]

Perform edits on your account. This includes Nyaa links, profile picture, revoking API keys, and your description.

==- Examples
+++ JSON Data Parameters
Name | Type | Description
---- | ---- | -----------
description? | string | Markdown formatted description (max 8192 characters)
pfp? | string | Either `reset` to remove, `keep` to keep current, or base64 encoded image data (max 4.5MB)
reset_torrent_key? | boolean | Whether to reset your torrent key
remove_nyaa_account? | string | Nyaa username to remove
nyaa_account_public? | string | Nyaa username to set public
nyaa_account_private? | string | Nyaa username to set private
revoke_api_keys? | boolean | Whether to revoke all API keys
###### At least one is required, *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false,
  "new_torrent_key": "abcdef..." // Only present if reset_torrent_key was true
}
```
+++ Unsuccessful Response (403)
```json
{
  "error": true,
  "message": "Forbidden."
}
```
+++
==-



### Get User Groups
[!badge variant="info" text="GET"] `/users/<user_id|@me>/groups` [!badge variant="success" text="Auth Optional"]

Returns the groups that a user is a member of.

==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": [
    {
      "id": "1234567890",
      "name": "example",
      "display_name": "Example",
      "pfp_hash": "abdef...",
      "tagline": "An example group tagline.",
      "tag": "example",
      "display_tag": "Example",
      "description": "Example group description.",
      "anonymous": 0,
      "admin": false, // Whether the user is an admin of the group
      "leader": false,
      "regular": false,
      "members": [
        {
          "id": "1234567890",
          "invite": false,
          "username": "example",
          "display_name": "Example",
          "pfp_hash": "abdef...",
          "leader": false,
          "admin": false,
          "regular": false
        }
      ],
      "upload_count": 25
    }
  ]
}
```
+++ Unsuccessful Response (404)
```json
{
  "error": true,
  "message": "Invalid user ID."
}
```
+++
==-



### Get User Notifications
[!badge variant="info" text="GET"] `/users/<user_id|@me>/notifications` [!badge variant="warning" text="Auth Required"]

Returns notifications for a specific user.

There are several tags used in notifications:

Regex | Replacement | Usage
----- | ----------- | -----
`<u:(\d+):([^>]+)>` | `<a class="link-blue" href="/users/$1">$2</a>` | Link to User
`<g:(\d+):([^>]+)>` | `<a class="link-blue" href="/groups/$1">$2</a>` | Link to Grouo
`<i:(\d+):([^>]+)>` | `<a class="link-blue" href="/invites/$1/accept/$2">View Invite</a>` | Link to Accept Invite
`<vi:(\d+):([^>]+)>` | `<a class="link-blue" href="/invites/$1">$2</a>` | Link to View Invite
`<ge:(\d+):([^>]+)>` | `<a class="link-blue" href="/groups/$1/edit">$2</a>` | Link to Edit Group
`<t:(\d+):([^>]+)>` | `<a class="link-blue" href="/torrents/$1">$2</a>` | Link to Torrent
`<tc:(\d+):(\d+):([^>]+)>` | `<a class="link-blue" href="/torrents/$1#com-$2">$3</a>` | Link to Torrent Comment
`<r:(\d+):([^>]+)>` | `<a class="link-blue" href="/reports/$1">$2</a>` | Used to view/redirect to Report



==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": [
    {
      "id": "1234567890",
      "data": "Welcome to the site.",
      "seen": false
    }
  ]
}
```
+++ Unsuccessful Response (403)
```json
{
  "error": true,
  "message": "Forbidden."
}
```
+++
==-



### Mark User Notifications as Read
[!badge variant="warning" text="PUT"] `/users/<user_id|@me>/notifications/read` [!badge variant="warning" text="Auth Required"]

Marks specified notifications as read. Returns the updated list of notifications.

==- Examples
+++ JSON Data Parameters
Name | Type | Description
---- | ---- | -----------
ids | array or string | Either an array of notification IDs to mark as read, or the string `all` to mark all notifications as read.
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false,
  "data": [
    {
      "id": "1234567890",
      "data": "Welcome to the site.",
      "seen": false
    }
  ]
}
```
+++ Unsuccessful Response (403)
```json
{
  "error": true,
  "message": "Forbidden."
}
```
+++
==-


### Get User Peers
[!badge variant="info" text="GET"] `/users/<user_id|@me>/peers` [!badge variant="warning" text="Auth Required"]

Returns a list of torrents that the user is a peer of, including their upload and download statistics.


==- Examples
+++ Successful Response (200)
```json
{
  "error": false,
  "data": [
    {
      "torrent_id": "1234567890",
      "upload": "48492", // Total uploaded bytes
      "download": "0", // Total downloaded bytes
      "completed": "0", // Total downloads completed
      "down_time": "0", // Seconds spent downloading
      "up_time": "74859", // Seconds spent uploading
      "created_at": "1764178764012", // First connection for this torrent, Unix timestamp in milliseconds
      "updated_at": "1764253690054", // Last seen seeding/leeching, Unix timestamp in milliseconds
      "last_completed": "0", // Last completed download time, Unix timestamp in milliseconds
      "torrent_title": "[Example] Media Title - 01 [WEB 1080p x265][FLAC 2.0]",
      "torrent_infohash": "abcdef...",
      "torrent_filesize": "148129345", // In bytes
      "peers": [
        {
          "torrent_id": "1234567890",
          "peer_id": "-qb-69420-", // Peer ID from the torrent client
          "upload": "63093967893", // Total uploaded bytes in this session
          "download": "0", // Total downloaded bytes in this session
          "left": "0", // Bytes left to download
          "first_seen": "1764178764012", // Unix timestamp in milliseconds
          "last_seen": "1764253690054", // Unix timestamp in milliseconds
          "user_agent": "qBittorrent/69", // Peer user agent string
          "est_upload_speed": 3911, // Estimated upload speed in bytes/second
          "est_download_speed": 0,
          "ip": "x.x.x.x", // IP address of the peer
          "port": 58071 // Port of the peer
        }
      ]
    }
  ]
}
```
+++ Unsuccessful Response (403)
```json
{
  "error": true,
  "message": "Forbidden."
}
```
+++
==-



### Search Users
[!badge variant="info" text="GET"] `/users/search` [!badge variant="warning" text="Auth Required"]

Searches for users based on their username.

!!!warning
To keep users who don't want to be known private, this endpoint only returns a user when the search query is an exact match of the username.
!!!

==- Examples
+++ Query Parameters
Name | Type | Description
---- | ---- | -----------
query | string | Exact username to search for.
###### *italics* = default, ? = optional
+++ Successful Response (200)
```json
{
  "error": false,
  "data": {
    "more": false,
    "results": [
      {
        "id": "1234567890",
        "username": "example",
        "display_name": "Example",
        "pfp_hash": null
      }
    ]
  }
}
```
+++ Unsuccessful Response (401)
```json
{
  "error": true,
  "message": "Unauthorized."
}
```
+++
==-
