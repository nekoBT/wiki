---
label: "Nyaa Linking & Importing"
icon: link
order: 1500
---
# Nyaa Linking & Importing

You can link you Nyaa account to your nekoBT account to prove ownership of your account, or to import old torrents from Nyaa.

### Linking Your Nyaa Account
You can link your Nyaa account to your nekoBT account [here](https://nekobt.to/nyaa/link).

Linking can be done in two ways:

Method | Description | Requires a Non-Anonymous Torrent
------ | ----------- | ----------------------
Torrent Verification | You will need to edit the description of a torrent you uploaded on Nyaa to include a unique verification code. Once done, nekoBT will check the torrent description to verify ownership. | ✅ (You can use an anonymous torrent and change it back after verification)
Cookie Verification | You will need to provide your Nyaa `session` cookie. nekoBT will use this to verify ownership of the account. | ❌



### Importing Torrents from Nyaa
You can import your old torrents from Nyaa to your nekoBT account [here](https://nekobt.to/nyaa/import).

!!!tip
Make sure to read all instructions before importing torrents from Nyaa.
!!!

!!!info
Before you can import, you must have uploaded at least one torrent to nekoBT, and had it approved.
This is to ensure that you understand how uploading works on nekoBT.
!!!

!!!tip Inactive Groups
If a group is inactive and/or not contactable, you may make a group with their tag and request a Staff Key to import their old torrents. See more on [Rule 11](https://wiki.nekobt.to/rules).
!!!

Importing can be done in three ways:

Method | Description | Can Import Anonymous & Hidden Torrents
------ | ----------- | ----------------------
Linked Account | Uses your linked Nyaa account to import all torrents from that account. | ❌
Cookie Verification | You will need to provide your Nyaa `session` cookie. nekoBT will use this to import all torrents from that account. | ✅
Staff Key | Allows you to import torrents based on an account or search query. Contact staff to obtain a staff key. | 🟠 (anon only)



### Cookie Privacy & Security

When you provide your Nyaa `session` cookie, it is **never stored** in nekoBT's database or cache.

Here is exactly what happens with your cookie:

- **Linking**: Your cookie is sent to nekoBT's servers, used in a single request to `nyaa.si` to confirm you are logged in as the account you claim to own, then immediately discarded. It is never written to the database, cache, or logs. It exists in server memory only for the duration of that one verification request. We only store your Nyaa username (not ID) in our database, which can be hidden from other users if you choose to hide your linked Nyaa account.
- **Importing**: Your cookie is verified and packaged into a signed, short-lived JWT that is returned directly to your browser and stored only there. Each time you request a page of torrents, your browser sends this JWT back to the server. The server unpacks the cookie from it, makes a request to `nyaa.si` to fetch that page, then discards the cookie again. It is never re-stored or logged between requests. After closing your browser, the JWT is removed from your browser's memory.

You can verify this yourself by inspecting the network requests made when linking or importing.

Your cookie is only ever used to verify your identity or fetch your torrent list from Nyaa. It is never stored on our servers, in our logs, or used for any other requests to Nyaa.

