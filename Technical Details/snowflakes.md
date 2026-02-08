---
label: "Snowflakes (IDs)"
icon: north-star
order: 3000
---
# Snowflakes

nekoBT uses a form of [snowflakes](https://en.wikipedia.org/wiki/Snowflake_ID) as unique identifiers for various entities, such as torrents, groups, users, etc. You may want to decode snowflakes for various reasons, such as to get the timestamp of when an entity was created, or to get the type of entity it is.

Our snowflakes consist of 3 sections, in the following order:
1. Timestamp (x bits)
2. Type (4 bits)
3. Increment (4 bits)

Types are represented as follows:
- `0` - Torrent
- `1` - User
- `2` - Comment
- `3` - Group
- `4` - Invite
- `5` - Report
- `6` - Notification
- `7` - Report Chat

The increment is a number that starts at a random value 0-15, and increases by 1 for each new snowflake made on the same thread, or loops back to zero if it reaches 16. This is used to decrease the chance of two snowflakes being the same if they were created at the same time.

To decode a snowflake:
1. Convert the snowflake from base 10 (denary) to base 2 (binary).
2. Split into sections. The last 8 bits represent the type and increment. The first (most significant) bits represent the timestamp.
3. Convert back to base 10 (denary).
4. Add the timestamp to the epoch `1735689600000` (January 1, 2025, 00:00:00 UTC) to get the actual timestamp of when the entity was created.
5. Map the type using the above mapping to get the type of entity.

<img src="/static/snowflake_conversion.png" alt="Snowflakes diagram">

---

## Code Examples

### JavaScript
```js
const EPOCH = BigInt("1735689600000"); // 2025-01-01T00:00:00.000Z

const SnowflakeTypeNames = {
    0: 'Torrent',
    1: 'User',
    2: 'Comment',
    3: 'Group',
    4: 'Invite',
    5: 'Report',
    6: 'Notification',
    7: 'ReportChat',
};

function extractSnowflake(snowflake) {
    let sf = BigInt(snowflake);
    const time = (sf >> 8n) + EPOCH;
    const type = (sf >> 4n) & BigInt(0b1111);
    const increment = sf & BigInt(0b1111);

    return {
        time: Number(time),
        type: Number(type),
        type_str: SnowflakeTypeNames[Number(type)],
        increment: Number(increment)
    };
}

```

### Typescript
```ts
const EPOCH = BigInt("1735689600000"); // 2025-01-01T00:00:00.000Z

enum SnowflakeTypes {
	Torrent = 0,
	User = 1,
	Comment = 2,
	Group = 3,
	Invite = 4,
	Report = 5,
	Notification = 6,
	ReportChat = 7,
}

const SnowflakeTypeNames: Record<SnowflakeTypes, string> = {
    [SnowflakeTypes.Torrent]: 'Torrent',
    [SnowflakeTypes.User]: 'User',
    [SnowflakeTypes.Comment]: 'Comment',
    [SnowflakeTypes.Group]: 'Group',
    [SnowflakeTypes.Invite]: 'Invite',
    [SnowflakeTypes.Report]: 'Report',
    [SnowflakeTypes.Notification]: 'Notification',
    [SnowflakeTypes.ReportChat]: 'ReportChat',
};

function extractSnowflake(snowflake: string) {
    let sf = BigInt(snowflake);
    const time = (sf >> 8n) + EPOCH;
    const type = (sf >> 4n) & BigInt(0b1111);
    const increment = sf & BigInt(0b1111);

    return {
        time: Number(time),
        type: Number(type) as SnowflakeTypes,
        type_str: SnowflakeTypeNames[Number(type) as SnowflakeTypes],
        increment: Number(increment)
    };
}
```

### Python
```py
EPOCH = 1735689600000  # 2025-01-01T00:00:00.000Z

SnowflakeTypeNames = {
    0: 'Torrent',
    1: 'User',
    2: 'Comment',
    3: 'Group',
    4: 'Invite',
    5: 'Report',
    6: 'Notification',
    7: 'ReportChat',
}

def extract_snowflake(snowflake):
    sf = int(snowflake)
    time = (sf >> 8) + EPOCH
    type_val = (sf >> 4) & 0b1111
    increment = sf & 0b1111

    return {
        'time': time,
        'type': type_val,
        'type_str': SnowflakeTypeNames[type_val],
        'increment': increment
    }
```
