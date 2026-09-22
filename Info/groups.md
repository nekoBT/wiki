---
label: "Groups"
icon: people
order: 2100
---
# Groups

nekoBT has a group system that allows you to create release groups for easier management of releases.
- Reserves your group tag for your releases.
- Credit users for their contributions.
- Credit other groups when you use their work.
- Filter releases by group.

!!!info
If you want to have a release group in your torrent titles, you must have a group registered on nekoBT.
!!!

!!!danger
You are not allowed to impersonate other groups, even if they aren't registered on nekoBT.<br>
Doing so could result in your group name being revoked.<br>
You can import an existing groups' releases using Open Groups, read more below.
!!!

### Creating a Group
You can create a group [here](https://nekobt.to/groups/new).
!!!warning
Be careful when choosing your tag, as it cannot be changed later.
!!!

### Open Groups
An open group is a group for a release group that isn't on nekoBT yet. Anyone who has passed the [upload test](https://nekobt.to/upload/test) can upload that group's releases to it. When the real group turns up, staff hand it over to them.

!!!warning
Only upload the group's **own** releases to an open group. Your own re-encodes or muxes go under your own tag, with the open group added as a secondary group. See [Rule 16](/rules).
!!!

**Creating one:** tick **Open group** when you [create a group](https://nekobt.to/groups/new). Open groups are always public, and only staff can rename them or turn the setting off, so be sure before you tick it.

**Uploading:** open the group's page and click **Upload**. You'll be asked to confirm that the torrent only contains that group's releases. Batches are fine, as long as everything in them is theirs.

**Importing from Nyaa:** if staff have set up a Nyaa account or search for the group, its page shows an **Import from Nyaa** button that anyone who has uploaded at least one approved torrent can use. Open a ticket to get it linked.

**Claiming a group:** if an open group is named after your group, click **Claim group** on its page and give some proof that it's yours (website, Discord, Nyaa profile, socials). Once a moderator approves it, you become the leader, its torrents move to you, and the people who uploaded them stay credited as contributors.

If someone creates an open group in bad faith or uploads things a group never released, report it.

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
- Crediting a nekoBT user who isn't in the group on an upload also invites them. See [Staff credits](/Info/uploading#staff-credits).

### Primary vs Secondary Groups
Torrents can have a primary group and secondary groups.
- **Primary Group**: The main group that is credited for the release. This is the group that is shown in the torrent title, usually referred to as the `Release Group`.
- **Secondary Groups**: Other groups that's work is used in the release. These groups are shown in the contributors section.
    - You can add secondary groups when uploading a torrent, or edit the torrent later to add them.
    - You may also choose to add parent groups as secondary groups, if you are doing a joint release, however this is not strictly necessary.

By using secondary groups, it allows groups to see who has used their work, and makes finding muxes of other's work easier.<br>
For example, if `Apple` makes fansubs but they don't have dual audio, users looking for dual audio can search for torrents that contain `Apple` as a secondary group to find muxes that include their fansubs.

### Permissions
Groups have 4 levels of membership:
- **Contributor**: Contributed to the group, but not necessarily a permanent member. Invites are given this role.
- **Member**: Given to users who are part of the group. No additional permissions. Has a cool badge.
- **Admin**: Can create torrents, edit and delete group torrents, invite users, and change display names of invites.
- **Leader**: Can do everything.

Only the leader can manage permissions.

In an open group, the leader and admins can edit and delete every torrent in the group, including ones other people uploaded.

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