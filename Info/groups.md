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