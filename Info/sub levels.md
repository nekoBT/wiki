---
label: "Sub Levels"
icon: goal
order: 2000
---
# Sub Levels

Sub levels is how nekoBT attempts to categorize the **quality** of a release's subtitles.
The higher the sub level, the more extensive the work put into the subtitles.

The keywords "SHOULD" and "MUST" below are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

The sub levels are as follows:
- **Level 0 (L0)**: Official subtitles
    - These are official subtitles taken from a source.
        - Examples: Netflix, Crunchyroll, Blu-ray, etc.
    - Edits to the main style are considered as "minor changes", and would still be L0.
- **Level 1 (L1)**: Slight modifications
    - Any modified subtitles that goes further than just changing the style.
- **Level 2 (L2)**: Small-scale fansubs
    - SHOULD have at least two of the following: ED, TS, and SS; or
    - MUST be an original translation (OTL).
- **Level 3 (L3)**: Full-scale fansubs
    - SHOULD have all of the following: ED, TS, SS, fixed timing issues.
    - MUST have QC.
- **Level 4-9 (L4-L9)**: Batch releases
    - These levels are reserved for batch releases, and can only be awarded by staff.
        - To get L4+ on a release, report the torrent under the "Request Level Increase for Batch" category.
    - Must meet L3 requirements.
    - Contains batch fixes, such as typos, missing typesetting, etc.
    - A release can obtain a higher level than other batch releases by being higher quality.
        - Quality is slightly subjective, but it *usually* does not depend on the encode quality, as this is categorized by Video Type.
    - For movies, L4 is only used to mark upgrades in quality compared to other L3 releases.

!!!info Edge case:
If an episode can't have a certain job done, then you can count it as being done.<br>
Example 1: If an episode has no songs, then you can count Song Styling as being done.<br>
Example 2: If an episode has no signs, then you can count TS as being done.<br>
However, just because an episode has no songs or signs, doesn't automatically make it L2.<br>
If you have done other jobs (TLC, QC, etc), then you can make it L2.
!!!

Here's a flow chart to help you categorize your release's sub level:

```mermaid
---
config:
    themeVariables:
        fontSize: '24px'
        backgroundColor: 'transparent'
---
graph LR
    A{Are the subtitles untouched or only had a main style change from their official source?} -->|Yes| B[Level 0]
    A -->|No| C{Have you done at least 2 of the following:<br>ED, TS, Song Styling?}
    C -->|Yes| E{Did you do ED, TS, Song Styling,<br>fix timing issues, and done a QC pass?}
    C -->|No| D[Level 1]
    E -->|Yes| G{Is this a batch release? Is this a movie and it's better than the other L3s?}
    E -->|No| F[Level 2]
    G -->|Yes| I[Level 3 +<br>Request Upgrade to L4+]
    G -->|No to both| H[Level 3]
```


### Appendix
- **ED**: Editing — making changes to the script to make it read well.
- **TS**: Typesetting — turning foreign signs (text on screen) into your language.
- **QC**: Quality Control — checking everyone's work for errors, typos, etc.
- **TLC**: Translation Check — checking the translation for accuracy.
- **SS**: Song Styling — adding styled lyrics for the songs
        (possibly with or without karaoke effects)
- **OTL**: Original Translation — translation made from scratch for the project
        (rather than editing an existing one)