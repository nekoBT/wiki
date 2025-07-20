---
label: "Groups"
icon: people
order: 2100
---
# Groups

nekoBT has a group system that allows you to create release groups for easier management of releases.
- Reserves your group name for your releases.
- Credit users for their contributions.
- Credit other groups when you use their work.
- Filter releases by group.

!!!info
If you want to have a release group in your torrent titles, you must have a group registered on nekoBT.
!!!

!!!danger
You are not allowed to snipe or impersonate other active groups, even if they aren't registered on nekoBT.<br>
Doing so could result in your group name being revoked.
!!!

### Creating a Group
You can create a group [here](https://nekobt.to/groups/new).
!!!warning
Be careful when choosing your tag, as it cannot be changed later.
!!!

### Anonymity Level
You can choose the anonymity level of your group:
- **0 - Public**: All members can be seen.
- **1 - Hide Permissions**: Members can be seen, but their permissions are hidden.
    - Note: Other users can still see who uploads torrents, unless you upload anonymously.
- **2 - Hide Members**: Only the group leader and admins can see members.
    - Note: This does not affect contributors to torrents.

### Inviting Users
To invite users, go to your group page, click edit, then **Invite Members**.<br>
You can invite registered users and unregistered users to your group.
- When inviting a user, an invite is created for them.
- If the user is registered, they will receive a notification with the invite.
- If the user is unregistered, you'll need to send them the invite link through the group edit page.

### Primary vs Secondary Groups
Torrents can have a primary group and secondary groups.
- **Primary Group**: The main group that is credited for the release. This is the group that is shown in the torrent title, usually referred to as the `Release Group`.
- **Secondary Groups**: Other groups that's work is used in the release. These groups are shown in the contributors section.
    - You can add secondary groups when uploading a torrent, or edit the torrent later to add them.

By using secondary groups, it allows groups to see who has used their work, and makes finding muxes of other's work easier.<br>
For example, if `Apple` makes fansubs but they don't have dual audio, users looking for dual audio can search for torrents that contain `Apple` as a secondary group to find muxes that include their fansubs.

### Permissions
Groups have 3 permission levels:
- **Member**: Part of the group, no special permissions.
- **Admin**: Can create torrents, invite users, and change display names of invites.
- **Leader**: Can do everything.

Only the leader can manage permissions.

### Group Links
You can link groups together to show parent-child relationships between groups. This can be useful when 2 groups come together to work on a project.

#### Example
- `Apple` and `Banana` are 2 separate groups. They usually work independently.
- However, they decide to work together on a fansub project.
- The leader of `Apple` creates a new group called `Apple-Banana`.
- The leader of `Apple-Banana` then sends link requests to both `Apple` and `Banana`, where `Apple-Banana` is the child group.
    - The link request to `Apple` is auto-accepted (as the user is the leader of both groups).
    - The link request to `Banana` is sent to the leader of `Banana`, who can accept or reject it.
- Now, when you view the `Apple` or `Banana` group page, you can see that they are linked to `Apple-Banana`, and vice versa.
- Also, when you view `Apple` or `Banana` releases, `Apple-Banana` releases will also be shown.