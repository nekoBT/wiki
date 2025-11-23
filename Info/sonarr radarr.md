---
label: "Sonarr & Radarr"
icon: rocket
order: 1700
---

# Sonarr & Radarr

On this page, you'll learn how to setup Sonarr/Radarr with nekoBT.

For the sake of simplicity, we will use Sonarr as an example, but very similar steps apply to Radarr.


## 1. Have Sonarr setup and running
We won't be going through how to install Sonarr, as you shouldn't be here if you don't have it.

## 2. Add nekoBT as an indexer
1. Go to **Settings** > **Indexers**.
2. Press the **+** button to add a new indexer.
3. Select **Torznab** as the indexer type.
4. Fill in the following fields:
   - **Name**: nekoBT
   - **Enable RSS, Automatic Search, and Interactive Search**: Keep these checked.
   - **URL**: `https://nekobt.to/api/torznab`
   - **API Key**: Your API key, which can be found in your [account settings](https://nekobt.to/users/@me/edit).
   - **Categories**: `Movies` (2000)
   - **Anime Categories**: `TV/Anime` (5070)
   - **Anime Standard Format Search**: Leave it unchecked.
5. Press **Save**. If you did everything correctly, you should see nekoBT in the list of indexers.

!!!info Using Prowlarr
If you're using Prowlarr, you can add nekoBT as an indexer under `Generic Torznab`. Follow similar steps above.
!!!

## 3. (Optional) Add Custom Formats
This where things differ from other trackers. nekoBT adds tags to the title of the torrent ([Auto Title](/info/metadata#auto-titles)), which you can use to filter releases in Sonarr/Radarr.

Some general knowledge on how Custom Formats and Sonarr/Radarr's priority system work may be useful for this part.

Here are some examples of Custom Formats you can add (Settings > Custom Formats > + > Import):

### Sub Level
Replace `0` with whatever level you want.
```json
{
    "name": "L0",
    "includeCustomFormatWhenRenaming": false,
    "specifications": [
        {
            "name": "Regex Match",
            "implementation": "ReleaseTitleSpecification",
            "negate": false,
            "required": true,
            "fields": {
            "value": "{Tags:.*L0;.*}"
            }
        }
    ]
}
```

You can also use regex to specify a range of levels: `[2-4]` for levels 2 to 4.
```json
{
    "name": "L2-4",
    "includeCustomFormatWhenRenaming": false,
    "specifications": [
        {
            "name": "Regex Match",
            "implementation": "ReleaseTitleSpecification",
            "negate": false,
            "required": true,
            "fields": {
            "value": "{Tags:.*L[2-4];.*}"
            }
        }
    ]
}
```

### Video Type
Replace `9` with the corresponding ID found [here](/info/metadata#video-type).
```json
{
    "name": "WEB-DL",
    "includeCustomFormatWhenRenaming": false,
    "specifications": [
        {
            "name": "Regex Match",
            "implementation": "ReleaseTitleSpecification",
            "negate": false,
            "required": true,
            "fields": {
            "value": "{Tags:.*V9;.*}"
            }
        }
    ]
}
```

### Video Codec
Replace `2` with the corresponding ID found [here](/info/metadata#video-codec).
```json
{
    "name": "HEVC",
    "includeCustomFormatWhenRenaming": false,
    "specifications": [
        {
            "name": "Regex Match",
            "implementation": "ReleaseTitleSpecification",
            "negate": false,
            "required": true,
            "fields": {
            "value": "{Tags:.*C2;.*}"
            }
        }
    ]
}
```

### Languages
You can also filter by audio, fansub and subtitle languages, but this is a bit more complicated if you don't understand regex.
```json
{
    "name": "Audio - English",
    "includeCustomFormatWhenRenaming": false,
    "specifications": [
        {
            "name": "Regex Match",
            "implementation": "ReleaseTitleSpecification",
            "negate": false,
            "required": true,
            "fields": {
                "value": "{Tags:.*A-[^;]*\b(en)\b[^;]*\b.*}"
            }
        }
    ]
}
```

Here's an example to match for Dual Audio releases (English + Japanese):
```json
{
    "name": "Dual Audio (en,ja)",
    "includeCustomFormatWhenRenaming": false,
    "specifications": [
        {
            "name": "Regex Match",
            "implementation": "ReleaseTitleSpecification",
            "negate": false,
            "required": true,
            "fields": {
                "value": "{Tags:.*A-[^;]*\b(en)\b[^;]*\b.*}"
            }
        },
        {
            "name": "Regex Match",
            "implementation": "ReleaseTitleSpecification",
            "negate": false,
            "required": true,
            "fields": {
                "value": "{Tags:.*A-[^;]*\b(ja)\b[^;]*\b.*}"
            }
        }
    ]
}
```
To create your own:
- Replace `A` with the type of language you want to match:
    - `A` is for **A**udio languages.
    - `F` is for **F**ansub languages.
    - `S` is for **S**ubtitle languages.
- Replace `en` with the language code you want to match this Custom Format against.
    - See Supported language codes on the [Language API endpoint](https://nekobt.to/api/v1/langs).

```
        |         \/  
{Tags:.*A-[^;]*\b(en)\b[^;]*\b.*}
```


### MTL (Machine Translation)
You can also filter for MTL releases, which are releases that use machine translation for their fansubs.
```json
{
    "name": "MTL",
    "includeCustomFormatWhenRenaming": false,
    "specifications": [
        {
            "name": "Regex Match",
            "implementation": "ReleaseTitleSpecification",
            "negate": false,
            "required": true,
            "fields": {
                "value": "{Tags:.*MTL;.*}"
            }
        }
    ]
}
```

## 4. (Optional) Add scores for Custom Formats
After you've added your Custom Formats, you can assign scores to them. This will allow Sonarr/Radarr to prefer certain releases over others based on the scores.
1. Go to **Settings** > **Profiles**.
2. Create a new profile or edit an existing one.
3. We recommend grouping resolutions together, so all 1080p releases are treated equally. You can then assign scores by their Video Type tag.
4. Add scores for your Custom Formats. The higher the score, the more preferred the release will be.
5. You can also set a minimum score for the profile, so that only releases with a score equal to or above that will be considered.
6. Once you're done, press **Save**.
7. If this is a new profile, go to **Series** or **Movies** and assign the profile to the series or movies you want to use it with. If you're using Overseerr, you should also change the default profile to the one you just created.