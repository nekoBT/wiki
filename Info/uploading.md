---
label: "Uploading"
icon: upload
order: 1900
---
# Uploading

Let's pretend this is your first time uploading a torrent to nekoBT. Here's a step-by-step guide on how to do it.

### 1. Create an account and read the rules
Before you can upload, you must create an account and read the [rules](/rules).


### 2. Pass the upload test
To upload, you must [pass the upload test](https://nekobt.to/upload/test). This is a short test to ensure you understand the rules of the site and how to upload correctly.
!!!warning
If you fail the test, you will have to wait a bit before you can retake it!
!!!

!!!tip
The wiki contains lots of info about the site and how things operate. Make sure to read the [rules](/rules) to make sure you understand what is allowed and what is not.
!!!

!!!tip You should understand how video files work
You should understand how video files work before uploading anything. [This guide by arch1t3cht](https://gist.github.com/arch1t3cht/b5b9552633567fa7658deee5aec60453) and [this guide from thewiki.moe](https://thewiki.moe/advanced/muxing/) are good places to start. Whilst arch1t3cht's guide is more about encoding, parts of it will help you understand how video files work, to ensure you don't make mistakes when making a release.
!!!


!!!tip You should understand how to name your release
[This guide by thewiki.moe](https://thewiki.moe/advanced/naming/) and the info on the upload page are good sources.
!!!

### 3. Create a torrent file
Next, you need to create a .torrent file for your release. We recommend `mktorrent` due to its simplicity and ease of use, but you can use any torrent creator you like, as long as it creates a valid torrent file.
!!!info
Torrents need to contain at least 2 trackers, with one of them being our public tracker URL:<br>
`https://tracker.nekobt.to/api/tracker/public/announce`<br>
The other tracker can be any public tracker. It's required to have 2 trackers, to act as a fallback in case one tracker goes down. We recommend at least 5 trackers for better availability.
!!!
!!!success Uploading to other public trackers
If you want to upload to another public tracker as well (Nyaa, etc), you should **add both trackers to the torrent file**, as this will allow users to download from both trackers, increasing the number of peers/seeders available for everyone. This is called cross-seeding.
!!!
!!!danger Do not include your private tracker link in the torrent file!
This contains your torrent key used to identify you. If you include it, everyone will start messing up your stats, and in the worst case, it may be seen as tracker cheating, which is a **bannable offense**.
!!!


### 4. Upload your torrent
Now you can upload your torrent file to the upload page. Make sure to fill in all the required fields.

!!!tip Check the Preview box
The site will try to help you by warning you about possible issues with your upload when you check the Preview box. Make sure to read and understand these warnings/errors before proceeding.
!!!

!!!tip Drag and Drop your Video File
You can drag and drop your video file onto the upload page to automatically fill in some fields, and to include a Mediainfo report.
!!!

!!!info Media Parsing
We will try to figure out what show/film you are uploading based on the torrent title. Internally, we use Sonarr/Radarr to do this, meaning if we can't parse it, neither will other users! Try to make sure that we can parse it correctly by following the naming conventions.
!!!

Not sure what to put in each field? You can find more information about each field here:
- [Primary Group](/info/groups)
- [Secondary Groups](/info/groups#primary-vs-secondary-groups)
- [Sub Level](/info/sub-levels)
- [Machine-Translated Subtitles](/info/metadata#mtl-machine-translation)
- [Original Translation](/info/metadata#otl-original-translation)
- [Hardsubs](/info/metadata#hardsubs)
- [Video Type](/info/metadata#video-type)
- [Video Codec](/info/metadata#video-codec)
- [Languages](/info/metadata#languages)


### 5. Seed your torrent
After uploading, you should start seeding your torrent immediately. This is important to ensure that users can download your release. If you don't seed, your torrent will not be available for others to download.


### 6. Wait for approval
Sometimes, your upload will have to be approved by a staff member before it is visible on the site. This is done to ensure that uploads follow the rules of the site.

Your upload may be held for approval if:
- It's your first time uploading.
- You haven't uploaded this sub level before.

Please be patient while staff reviews your upload.

!!!info
It's important to seed your torrent whilst it is waiting for approval, as staff may need to download it and check it.
!!!