---
label: "Endpoints"
icon: versions
order: 1800
---
# Endpoints

## JSON API
This is the main API for nekoBT, and is used for most requests.

The base URL for the JSON API is `https://nekobt.to/api/v1`

### Get announcements
```
GET /announcements
```
Returns the latest announcements displayed on the home page from nekoBT.

### Get group
```
GET /groups/<group_id>
```
Returns information about a specific group, including its name, description, members, and other metadata.

### Search groups
```
GET /groups/search
```
Searches for groups based on their name.

### Create group link
```
POST /groups/<group_id>/links/<group_id_2>
```
Creates a link between two groups.

### Delete group link
```
DELETE /groups/<group_id>/links/<group_id_2>
```
Deletes a link between two groups.

### Add group member
```
POST /groups/<group_id>/members
```
Adds a member to a group.

### Update group member
```
PATCH /groups/<group_id>/members/<user_or_invite_id>
```
Updates a member in a group.

### Delete group member
```
DELETE /groups/<group_id>/members/<user_or_invite_id>
```
Deletes a member from a group.

### Get invite
```
GET /invites/<invite_id>
```
Returns information about an invited user, including the group it belongs to.

### Accept invite
```
POST /invites/<invite_id>/accept/<invite_key>
```
Accepts an invite to a group using the provided invite key.

### Get media
```
GET /media/<media_id>
```
Returns information about a specific media item, including its title, description, and other metadata.

### Search media
```
GET /media/search
```
Searches for media items based on search query.

### Get site statistics
```
GET /stats
```
Returns various statistics about the site, such as the number of users, torrents, and groups.

### Get torrent
```
GET /torrents/<torrent_id>
```
Returns information about a specific torrent, including its title, description, and other metadata.

### Edit torrent
```
PATCH /torrents/<torrent_id>
```
Edit a specific torrent.

### Get torrent comments
```
GET /torrents/<torrent_id>/comments
```
Returns comments for a specific torrent.

### Get torrent file
```
GET /torrents/<torrent_id>/download
```
Returns the torrent file for a specific torrent. You can specify `?public=true` to get the torrent file without your torrent key.

### Search torrents
```
GET /torrents/search
```
Searches for torrents, using various criteria.

### Upload torrent
```
POST /upload
```
Uploads a new torrent to the site.

### Perform upload checks
```
POST /upload/checks
```
Performs various checks on the uploaded torrent file, such as verifying its parsability.

### Perform mediainfo extraction
```
POST /upload/mediainfo
```
Extracts metadata for a torrent using mediainfo JSON output.

### Get user
```
GET /users/<user_id>
```
!!!info
For all endpoints starting with `/users/`, you can also use `@me` for `<user_id>` to refer to the currently authenticated user.
!!!
Returns information about a specific user, including their username, profile picture, and other metadata.


### Edit user
```
PATCH /users/<user_id>
```
Perform edits on your account. This includes Nyaa links, profile picture, revoking API keys, and your description.

### Get user groups
```
GET /users/<user_id>/groups
```
!!!warning
This endpoint is not fully implemented yet, and only works for the currently authenticated user.
!!!
Returns the groups that a user is a member of.

### Get user notifications
```
GET /users/<user_id>/notifications
```
Returns notifications for a specific user.

### Mark user notifications as read
```
PUT /users/<user_id>/notifications/read
```
Marks specified notifications as read.

### Get user peers (torrents the user is a peer of)
```
GET /users/<user_id>/peers
```
Returns a list of torrents that the user is a peer of, including their upload and download statistics.

### Search users
```
GET /users/search
```
Searches for users based on their username.
!!!warning
Due to security concerns, this endpoint only returns a user when the search query is an exact match of the username.
!!!


## Torznab API
!!!info
To access the Torznab API, you should instead specify your API key as the `apikey` query parameter.
!!!
!!!warning
The Torznab API is only meant to be used by automation software, such as Sonarr or Radarr. If you want more rich data, use the JSON API instead.
!!!
The base URL for the Torznab API is `https://nekobt.to/api/torznab`

### Get torznab capabilities
```
GET /api?t=caps
```
Returns the capabilities of the Torznab API, such as supported search types and metadata formats.

### Search torrents
```
GET /api?t=search
```
Searches for torrents.
- `t` can be `search`, `tv-search` or `movie-search`.
- `q` is the search query. If this is an empty string or null, it will act as an RSS search, returning the latest torrents and torrents that have been refreshed to the RSS feed (usually due to sub level change).
- `cat` is the category to search in (currently does nothing due to there only being 1 category).
- `tvdbid` is the TVDB ID of the series to search for.
!!!info
The Torznab API only provides magnet links, not torrent files, to ensure torrent clients use the auto title, and not the torrent title (important for tag matching).
!!!