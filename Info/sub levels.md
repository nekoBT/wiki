---
label: "Sub Levels"
icon: goal
order: 2000
---
# Sub Levels

Sub levels is how nekoBT attempts to categorize the **quality** of a release's subtitles.<br>
The higher the sub level, the better the quality of the subtitles.<br>

The sub levels are as follows:
- **Level 3 (L3)**
    - Generally, the best quality fansubs.
    - Required: ED, TS, Song Styling, fixed timing issues, QC.
- **Level 2 (L2)**
    - Mid-tier fansubs.
    - Two of the following: ED, TS, Song Styling.
- **Level 1 (L1)**
    - Basic fansubs, minor changes from official sources.
- **Level 0 (L0)**: Official subtitles.
    - These are the official subtitles provided by the source.
        - Examples: Netflix, Crunchyroll, Blu-ray, etc.
- **Level 4-9 (L4-L9)**: Batch releases.
    - These levels are reserved for batch releases, and can only be awarded by staff.
        - To get L4+ on a release, report the torrent under the "Request Level Increase for Batch" category.
    - Must meet L3 requirements.
    - Contains batch fixes, such as typos, missing typesetting, etc.
    - A release can obtain a higher level than other batch releases by being higher quality.
        - Quality is slightly subjective, but it *usually* does not depend on the encode quality, as this is categorized by Video Type.

Here's a flow chart to help you categorize your release's sub level:

```mermaid
---
config:
    themeVariables:
        fontSize: '24px'
---
graph LR
    A{Are the subtitles untouched from their official source?} -->|Yes| B[Level 0]
    A -->|No| C{Have you done at least 2 of the following:<br>ED, TS, Song Styling?}
    C -->|Yes| E{Did you do ED, TS, Song Styling,<br>fix timing issues and a QC pass?}
    C -->|No| D[Level 1]
    E -->|Yes| G{Is this a batch release?}
    E -->|No| F[Level 2]
    G -->|Yes| I[Level 3 +<br>Request Upgrade to L4+]
    G -->|No| H[Level 3]
```


### Appendix
- **ED**: Editing, making changes to the script to make it read well.
- **TS**: Typesetting, turning foreign signs (text on screen) into your language.
- **QC**: Quality Check, checking everyone's work for errors, typos, etc.