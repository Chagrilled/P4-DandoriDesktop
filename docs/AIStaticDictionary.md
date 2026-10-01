# Pikmin 4 AI.Static byte dictionary

Byte-level map of `ActorSerializeParameter.AI.Static` for every placed actor class in the shipped game, derived from each AI component's vtable slot-156 serializer in the Switch executable (Ghidra) and validated against **all 7640 AI.Static samples in the decoded maps (625 actor classes, 100% parse exactly, no leftover bytes)**.

- Machine-readable twin: `AIStaticDictionary.json`. Source spec: `layouts.spec`; reference parser: `staticspec.py` (`try_parse(defs, "UXxxAIComponent", bytes, GeneratorVersion)`).
- Field purposes come from the first dictionary (`ai-parameters/AIParameterDictionary.md`).

## Contents

1. [Wire encoding](#wire-encoding)
2. [Generator versions](#generator-versions)
3. [Reading the tables](#reading-the-tables)
4. [Full byte map: enemy base (TekiAIParameter)](#full-teki)
5. [Full byte map: object base (ObjectAIParameter)](#full-object)
6. [Shared sections](#shared-sections)
7. [Component layouts](#component-layouts)
8. [Actor → layout index](#actor-index)
9. [Notes for Dandori Desktop](#dandori-notes)

<a id="wire-encoding"></a>
## Wire encoding

Everything is little-endian and packed (no padding or alignment).

| Type | Bytes | Encoding |
|---|---|---|
| bool32 | 4 | int32 0 or 1 (a C++ `bool`/bitfield written through a 4-byte temp) |
| u8 / u8 enum | 1 | raw byte; enums use their numeric value |
| u16 | 2 | uint16 |
| i32 / f32 | 4 | int32 / IEEE float |
| u64 | 8 | uint64 |
| vec3 / rotator | 12 | 3×f32 (X,Y,Z) / (Pitch,Yaw,Roll) |
| quat | 16 | 4×f32 (X,Y,Z,W) |
| FName / FString / class path | 4+len | int32 length **including** the NUL terminator, then the chars and the NUL. An empty string is just `00 00 00 00`. A negative length means UTF-16 (`-len` × 2 bytes). FNames are written as text such as `None` or `switch00` |
| SoftObjectPath | 8+len | asset path FString + sub-path FString |
| TArray | 4 + n×elem | int32 element count, then the elements back to back |

<a id="generator-versions"></a>
## Generator versions

Every serializer receives the actor's `GeneratorVersion` (a date code `0xYYYYMMDDr`) and skips or adds fields based on it. Shipped data contains only three values:

| GeneratorVersion | Samples | Serializes like |
|---|---|---|
| `202303386` (8626647386) | 6948 | 15a |
| `20230317a` (8626647418) | 538 | 418/626 |
| `20230324a` (8626647626) | 154 | 17a/24a |

The only gate that splits the shipped versions is `ver ≥ 8626647418`. It adds the 4-byte **`bEnableFreezeBothDrop`** bool right after every `DropParameter` embedded in a Teki, Object, Kogane or GroupDropManager parameter. That is why the same actor is 4 bytes longer in 418/626 data, so every later offset shifts by +4. The serializers also contain many older development-era date checks. Because every shipped map uses one of the three versions above, those checks are resolved here: fields that are always written are listed unconditionally, and fields for formats that no shipped map uses are omitted.

<a id="reading-the-tables"></a>
## Reading the tables

- **386 / 418/626**: byte offset of the field from the start of the AI.Static array for each version group. Where a variable-length item (FName, array, optional block) comes first, offsets are written `$n+k`: `$n` is the position right after the item whose Size column says `→ $n`.
- **Loops**: `count → loop` rows are an explicit count (`i32`, or `u8` for escape points). Indented rows after `for each element` repeat that many times, and their offsets are relative to the element start (`elem+k`). **`loop ×N` (count NOT serialized)** means the number of repetitions comes from the actor itself (existing child components, nav links, spline presence), not from the bytes. To re-serialize, write exactly as many as the actor blueprint has. To parse, see the rule noted on that row.
- **if / optional** rows: bytes that exist only when a version gate, an earlier flag, or a runtime component condition holds.
- **section** rows reference a shared block defined in [Shared sections](#shared-sections). Field names are reflection paths inside the component (`AIParameter.` prefix = the component's `…AIParameter` struct).

<a id="full-teki"></a>
## Full byte map: enemy base (TekiAIParameter)

every enemy (UTekiAIComponent::vfunc_156 @0x017C9190).

Every nested block is expanded inline. With every array empty and every FName `None` (9 bytes), the base is **159 bytes in 386 and 163 bytes in 418/626** (shortest shipped `UTekiAIComponent` samples). Species-specific fields follow the last row (see each component layout).

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 12 | vec3 (3×f32) | TekiAIParameter.Territory.Center |  | Centre (world position for territories; offset for search areas). |
| 12 | 12 | 4 | f32 | TekiAIParameter.Territory.HalfHeight |  | Half-height of the cylinder. |
| 16 | 16 | 4 | f32 | TekiAIParameter.Territory.Radius |  | Radius of the cylinder. |
| 20 | 20 | 4 | i32 count → **loop** | **TekiAIParameter.DropParameter.DropItemParameter** |  | Array of drop slots; each slot is independently rolled (see DropItemParameter). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 8 | u64 | &nbsp;&nbsp;&nbsp;&nbsp;UniqueId |  | 64-bit unique id of the slot (serialized first; Dandori reads it as "id"+"flags" 32-bit halves; -1 when unused). |
| elem+8 | elem+8 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;MinNum |  | Minimum number of this item to drop. |
| elem+12 | elem+12 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;MaxNum |  | Maximum number of this item to drop. |
| elem+16 | elem+16 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;DropRatio |  | Probability (0..1) that this slot drops. |
| elem+20 | elem+20 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;bRegistGenerator |  | Register the spawned drop with the level generator so it is persisted/saved like a placed object (and tracked for Salvage conditions). |
| elem+24 | elem+24 | 4 | i32 count → **loop** | &nbsp;&nbsp;&nbsp;&nbsp;**DropConditions** |  | Extra conditions that must all pass for the slot to drop, see DropConditionParameter (checked in 0x01DB7BA0). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 1 | u8 EDropCondition | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropCond |  | EDropCondition: 1 NoRescueSurvivor / 2 RescueSurvivor (castaway DropCondName not/already rescued), 3 NoSalvageOtakara / 4 SalvageOtakara (treasure DropCondName not/already collected), 5 NoSalvageDropItem / 6 SalvageDropItem (DropCondInt not/already in this generator's collected-drop list), 7 PlayedDemo (cutscene DropCondDemo already seen). |
| elem+1 | elem+1 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropCondInt |  | Integer operand (drop-item index) for the SalvageDropItem conditions. |
| elem+5 | elem+5 | 4+len → $1 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropCondName |  | Name operand (castaway or treasure name) for the Survivor/Otakara conditions. |
| $1 | $1 | 1 | u8 EDemoFlagType | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropCondDemo |  | EDemoFlagType cutscene that must have been played for PlayedDemo. |
|  |  | → $2 | end | &nbsp;&nbsp;&nbsp;&nbsp;end of DropConditions |  |  |
| $2 | $2 | 4+len → $3 | class path (FString) | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.DropActor |  | Blueprint class to spawn (e.g. GOtaXXX_C treasure, pellets, nectar). |
| $3 | $3 | 4+len → $4 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.CustomParameter |  | Free-form FName passed to the spawned actor (e.g. SVSleep000 = castaway NPC key, UseSpawnerTerritory for Dweevils). |
| $4 | $4 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.CustomFloatParameter |  | Free-form float passed to the spawned actor. |
| $4+4 | $4+4 | 2 | u16 | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.GameRulePermissionFlag |  | EDropGameRulePermissionFlag bitmask of game modes in which it may spawn: 1 Area day, 2 Area night, 4 Cave, 8 Hero (Olimar's Shipwreck Tale), 256 Mission/Dandori challenge (cave bingo/collection/extra), 4096 VS (Dandori Battle). 0 = always; negative = never (0x01DB8E70). |
| $4+6 | $4+6 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.bSetTerritory |  | Give the spawned actor its own territory (uses Territory below). |
| $4+10 | $4+10 |  | **if** | &nbsp;&nbsp;&nbsp;&nbsp;**only if SpawnMiniInfo.bSetTerritory ≠ 0** |  | block present only when the flag just read is set |
| $4+10 | $4+10 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.Territory.Center | only if SpawnMiniInfo.bSetTerritory ≠ 0 | Centre (world position for territories; offset for search areas). |
| $4+22 | $4+22 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.Territory.HalfHeight | only if SpawnMiniInfo.bSetTerritory ≠ 0 | Half-height of the cylinder. |
| $4+26 | $4+26 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.Territory.Radius | only if SpawnMiniInfo.bSetTerritory ≠ 0 | Radius of the cylinder. |
|  |  | → $5 | end | &nbsp;&nbsp;&nbsp;&nbsp;end of conditional block |  | $5 = offset after the block (whether or not it was written) |
|  |  | → $6 | end | end of TekiAIParameter.DropParameter.DropItemParameter |  |  |
| $6 | $6 | 4 | i32 | TekiAIParameter.DropParameter.DropActorParameter.Index |  | Index used for the drop (serialized as -1 by default – Dandori's "255s"). |
| $6+4 | $6+4 | 4+len → $7 | FName (FString) | TekiAIParameter.DropParameter.DropActorParameter.BoneName |  | Bone the drops spawn from. |
| $7 | $7 | 12 | vec3 (3×f32) | TekiAIParameter.DropParameter.DropActorParameter.LocalOffset |  | Offset from that bone. |
| $7+12 | $7+12 | 12 | vec3 (3×f32) | TekiAIParameter.DropParameter.DropActorParameter.Vel |  | Initial launch velocity of dropped items. |
| $7+24 | $7+24 | 12 | vec3 (3×f32) | TekiAIParameter.DropParameter.DropActorParameter.RandVel |  | Random velocity added per item. |
| $7+36 | $7+36 | 2 | u16 | TekiAIParameter.DropParameter.DropActorParameter.DropOption |  | uint16 option flags for dropping. |
| $7+38 | $7+38 | 4 | i32 | TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum |  | Fixed number of nectar ("hot extract") drops, overriding random counts. |
| $7+42 | $7+42 | 4 | bool32 | TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation |  | Use OverrideInitLocation as the spawn position. |
| $7+46 | $7+46 | 12 | vec3 (3×f32) | TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation |  | Explicit spawn position for drops. |
| $7+58 | $7+58 | 4 | i32 count → **loop** | **TekiAIParameter.DropParameter.DebugUniqueIdList** |  | List of uint64 unique IDs (serialized after the slots; Dandori's "inventory flag loop"). Debug/bookkeeping of slot UniqueIds. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 8 | u64 | &nbsp;&nbsp;&nbsp;&nbsp;DebugUniqueId |  | one entry per drop slot UniqueId (bookkeeping) |
|  |  | → $8 | end | end of TekiAIParameter.DropParameter.DebugUniqueIdList |  |  |
|  |  |  | **if** | **only in 8626647418 / 8626647626** |  | present only for these shipped GeneratorVersions |
| — | $8 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;TekiAIParameter.DropParameter.bEnableFreezeBothDrop | only in 8626647418 / 8626647626 | Frozen kills produce both the normal drop and the frozen drop (version-gated per-instance bool). |
| $8 | $8+4 | 4 | bool32 | TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory |  | When set, the treasure-carry search area is re-centred on / computed from the territory rather than the enemy's own position (read at 0x017F27C0; per-instance). |
| $8+4 | $8+8 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaOtakaraCarry.Center |  | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |
| $8+16 | $8+20 | 4 | f32 | TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight |  | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |
| $8+20 | $8+24 | 4 | f32 | TekiAIParameter.SearchAreaOtakaraCarry.Radius |  | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |
| $8+24 | $8+28 | 4 | f32 | TekiAIParameter.SearchAreaOtakaraCarry.Angle |  | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |
| $8+28 | $8+32 | 4 | f32 | TekiAIParameter.SearchAreaOtakaraCarry.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $8+32 | $8+36 | 4 | f32 | TekiAIParameter.InvasionParameter.StartTimeRatio |  | Fraction of the night timer at which this enemy starts its invasion (attacking the Lumiknoll). Per-instance. |
| $8+36 | $8+40 | 4 | bool32 | TekiAIParameter.bNotifyCarryNearProWrestlingPikmin |  | Notify nearby carrying Pikmin when this enemy is grappled (0x00E82A80). Per-instance. |
| $8+40 | $8+44 | 4 | bool32 | TekiAIParameter.bEnableCullSearchEnemy |  | Allows the enemy's target search to be culled/skipped when off-screen (0x01E0B760). Per-instance. |
| $8+44 | $8+48 | 4 | bool32 | TekiAIParameter.bUseActorLastRenderTime |  | Use the actor's last-rendered time to decide culling; if the check fails it falls back to bEnableCullSearchEnemy (0x01E0B760). Per-instance. |
| $8+48 | $8+52 | 4 | bool32 | SniffPointParameter.bEnableOptionalPoint |  | Use the optional points below instead of the actor origin. |
| $8+52 | $8+56 | 4 | i32 count → **loop** | **SniffPointParameter.OptionalPointOffsets** |  | Local offsets of optional sniff/target points (Dandori "optionalPointOffsets"). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;OptionalPointOffset |  | local offset of an Oatchi sniff / radar target point |
|  |  | → $9 | end | end of SniffPointParameter.OptionalPointOffsets |  |  |
| $9 | $9 | 4 | i32 count → **loop** | **SniffPointParameter.OptionalPointPriorityInfo** |  | Priority per optional point (int array). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;OptionalPointPriority |  | priority of the matching optional point |
|  |  | → $10 | end | end of SniffPointParameter.OptionalPointPriorityInfo |  |  |

**Worked example** (decoded from real bytes):

Sample: `GArikui_C` in `Madori\Cave\Cave010\Cave010_F03\ActorPlacementInfo\AP_Cave010_F03_P_Teki.json`, GeneratorVersion `8626647418`, 290 bytes.

| Offset | Bytes (hex) | Field | Value |
|---|---|---|---|
| 0 | `00 00 00 00 00 00 00 00 00 00 00 00` | TekiAIParameter.Territory.Center | (0.0, 0.0, 0.0) |
| 12 | `00 00 48 42` | TekiAIParameter.Territory.HalfHeight | 50.0 |
| 16 | `00 00 20 42` | TekiAIParameter.Territory.Radius | 40.0 |
| 20 | `01 00 00 00` | TekiAIParameter.DropParameter.DropItemParameter (count) | 1 |
| 24 | `3d 00 00 00 01 03 0a 40` | UniqueId | 4614504071024345149 |
| 32 | `01 00 00 00` | MinNum | 1 |
| 36 | `01 00 00 00` | MaxNum | 1 |
| 40 | `00 00 80 3f` | DropRatio | 1.0 |
| 44 | `00 00 00 00` | bRegistGenerator | False |
| 48 | `00 00 00 00` | DropConditions (count) | 0 |
| 52 | `44 00 00 00 2f 47 61 6d 65 2f 43 61 72 72 6f 74 34 2f 50 …` | SpawnMiniInfo.DropActor | /Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C |
| 124 | `05 00 00 00 4e 6f 6e 65 00` | SpawnMiniInfo.CustomParameter | None |
| 133 | `00 00 00 00` | SpawnMiniInfo.CustomFloatParameter | 0.0 |
| 137 | `0d 01` | SpawnMiniInfo.GameRulePermissionFlag | 269 |
| 139 | `00 00 00 00` | SpawnMiniInfo.bSetTerritory | False |
| 143 | `ff ff ff ff` | TekiAIParameter.DropParameter.DropActorParameter.Index | -1 |
| 147 | `05 00 00 00 4e 6f 6e 65 00` | TekiAIParameter.DropParameter.DropActorParameter.BoneName | None |
| 156 | `00 00 00 00 00 00 00 00 00 00 00 00` | TekiAIParameter.DropParameter.DropActorParameter.LocalOffset | (0.0, 0.0, 0.0) |
| 168 | `00 00 00 00 00 00 2a 43 00 80 bb 43` | TekiAIParameter.DropParameter.DropActorParameter.Vel | (0.0, 170.0, 375.0) |
| 180 | `00 00 00 00 00 00 70 41 00 00 f0 41` | TekiAIParameter.DropParameter.DropActorParameter.RandVel | (0.0, 15.0, 30.0) |
| 192 | `40 00` | TekiAIParameter.DropParameter.DropActorParameter.DropOption | 64 |
| 194 | `00 00 00 00` | TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum | 0 |
| 198 | `00 00 00 00` | TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation | False |
| 202 | `00 00 00 00 00 00 00 00 00 00 00 00` | TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation | (0.0, 0.0, 0.0) |
| 214 | `01 00 00 00` | TekiAIParameter.DropParameter.DebugUniqueIdList (count) | 1 |
| 218 | `3d 00 00 00 01 03 0a 40` | DebugUniqueId | 4614504071024345149 |
| 226 | `00 00 00 00` | TekiAIParameter.DropParameter.bEnableFreezeBothDrop | False |
| 230 | `01 00 00 00` | TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory | True |
| 234 | `00 00 00 00 00 00 00 00 00 00 00 00` | TekiAIParameter.SearchAreaOtakaraCarry.Center | (0.0, 0.0, 0.0) |
| 246 | `00 00 48 42` | TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight | 50.0 |
| 250 | `00 00 fa 43` | TekiAIParameter.SearchAreaOtakaraCarry.Radius | 500.0 |
| 254 | `00 00 34 43` | TekiAIParameter.SearchAreaOtakaraCarry.Angle | 180.0 |
| 258 | `00 00 f0 41` | TekiAIParameter.SearchAreaOtakaraCarry.SphereRadius | 30.0 |
| 262 | `00 00 00 00` | TekiAIParameter.InvasionParameter.StartTimeRatio | 0.0 |
| 266 | `00 00 00 00` | TekiAIParameter.bNotifyCarryNearProWrestlingPikmin | False |
| 270 | `01 00 00 00` | TekiAIParameter.bEnableCullSearchEnemy | True |
| 274 | `00 00 00 00` | TekiAIParameter.bUseActorLastRenderTime | False |
| 278 | `00 00 00 00` | SniffPointParameter.bEnableOptionalPoint | False |
| 282 | `00 00 00 00` | SniffPointParameter.OptionalPointOffsets (count) | 0 |
| 286 | `00 00 00 00` | SniffPointParameter.OptionalPointPriorityInfo (count) | 0 |

<a id="full-object"></a>
## Full byte map: object base (ObjectAIParameter)

every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880).

Every nested block is expanded inline. With every array empty and every FName `None` (9 bytes), the base is **155 bytes in 386 and 159 bytes in 418/626** (shortest shipped `UObjectAIComponent` samples). Species-specific fields follow the last row (see each component layout).

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | i32 count → **loop** | **ObjectAIParameter.DropParameter.DropItemParameter** |  | Array of drop slots; each slot is independently rolled (see DropItemParameter). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 8 | u64 | &nbsp;&nbsp;&nbsp;&nbsp;UniqueId |  | 64-bit unique id of the slot (serialized first; Dandori reads it as "id"+"flags" 32-bit halves; -1 when unused). |
| elem+8 | elem+8 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;MinNum |  | Minimum number of this item to drop. |
| elem+12 | elem+12 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;MaxNum |  | Maximum number of this item to drop. |
| elem+16 | elem+16 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;DropRatio |  | Probability (0..1) that this slot drops. |
| elem+20 | elem+20 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;bRegistGenerator |  | Register the spawned drop with the level generator so it is persisted/saved like a placed object (and tracked for Salvage conditions). |
| elem+24 | elem+24 | 4 | i32 count → **loop** | &nbsp;&nbsp;&nbsp;&nbsp;**DropConditions** |  | Extra conditions that must all pass for the slot to drop, see DropConditionParameter (checked in 0x01DB7BA0). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 1 | u8 EDropCondition | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropCond |  | EDropCondition: 1 NoRescueSurvivor / 2 RescueSurvivor (castaway DropCondName not/already rescued), 3 NoSalvageOtakara / 4 SalvageOtakara (treasure DropCondName not/already collected), 5 NoSalvageDropItem / 6 SalvageDropItem (DropCondInt not/already in this generator's collected-drop list), 7 PlayedDemo (cutscene DropCondDemo already seen). |
| elem+1 | elem+1 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropCondInt |  | Integer operand (drop-item index) for the SalvageDropItem conditions. |
| elem+5 | elem+5 | 4+len → $1 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropCondName |  | Name operand (castaway or treasure name) for the Survivor/Otakara conditions. |
| $1 | $1 | 1 | u8 EDemoFlagType | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DropCondDemo |  | EDemoFlagType cutscene that must have been played for PlayedDemo. |
|  |  | → $2 | end | &nbsp;&nbsp;&nbsp;&nbsp;end of DropConditions |  |  |
| $2 | $2 | 4+len → $3 | class path (FString) | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.DropActor |  | Blueprint class to spawn (e.g. GOtaXXX_C treasure, pellets, nectar). |
| $3 | $3 | 4+len → $4 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.CustomParameter |  | Free-form FName passed to the spawned actor (e.g. SVSleep000 = castaway NPC key, UseSpawnerTerritory for Dweevils). |
| $4 | $4 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.CustomFloatParameter |  | Free-form float passed to the spawned actor. |
| $4+4 | $4+4 | 2 | u16 | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.GameRulePermissionFlag |  | EDropGameRulePermissionFlag bitmask of game modes in which it may spawn: 1 Area day, 2 Area night, 4 Cave, 8 Hero (Olimar's Shipwreck Tale), 256 Mission/Dandori challenge (cave bingo/collection/extra), 4096 VS (Dandori Battle). 0 = always; negative = never (0x01DB8E70). |
| $4+6 | $4+6 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.bSetTerritory |  | Give the spawned actor its own territory (uses Territory below). |
| $4+10 | $4+10 |  | **if** | &nbsp;&nbsp;&nbsp;&nbsp;**only if SpawnMiniInfo.bSetTerritory ≠ 0** |  | block present only when the flag just read is set |
| $4+10 | $4+10 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.Territory.Center | only if SpawnMiniInfo.bSetTerritory ≠ 0 | Centre (world position for territories; offset for search areas). |
| $4+22 | $4+22 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.Territory.HalfHeight | only if SpawnMiniInfo.bSetTerritory ≠ 0 | Half-height of the cylinder. |
| $4+26 | $4+26 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SpawnMiniInfo.Territory.Radius | only if SpawnMiniInfo.bSetTerritory ≠ 0 | Radius of the cylinder. |
|  |  | → $5 | end | &nbsp;&nbsp;&nbsp;&nbsp;end of conditional block |  | $5 = offset after the block (whether or not it was written) |
|  |  | → $6 | end | end of ObjectAIParameter.DropParameter.DropItemParameter |  |  |
| $6 | $6 | 4 | i32 | ObjectAIParameter.DropParameter.DropActorParameter.Index |  | Index used for the drop (serialized as -1 by default – Dandori's "255s"). |
| $6+4 | $6+4 | 4+len → $7 | FName (FString) | ObjectAIParameter.DropParameter.DropActorParameter.BoneName |  | Bone the drops spawn from. |
| $7 | $7 | 12 | vec3 (3×f32) | ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset |  | Offset from that bone. |
| $7+12 | $7+12 | 12 | vec3 (3×f32) | ObjectAIParameter.DropParameter.DropActorParameter.Vel |  | Initial launch velocity of dropped items. |
| $7+24 | $7+24 | 12 | vec3 (3×f32) | ObjectAIParameter.DropParameter.DropActorParameter.RandVel |  | Random velocity added per item. |
| $7+36 | $7+36 | 2 | u16 | ObjectAIParameter.DropParameter.DropActorParameter.DropOption |  | uint16 option flags for dropping. |
| $7+38 | $7+38 | 4 | i32 | ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum |  | Fixed number of nectar ("hot extract") drops, overriding random counts. |
| $7+42 | $7+42 | 4 | bool32 | ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation |  | Use OverrideInitLocation as the spawn position. |
| $7+46 | $7+46 | 12 | vec3 (3×f32) | ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation |  | Explicit spawn position for drops. |
| $7+58 | $7+58 | 4 | i32 count → **loop** | **ObjectAIParameter.DropParameter.DebugUniqueIdList** |  | List of uint64 unique IDs (serialized after the slots; Dandori's "inventory flag loop"). Debug/bookkeeping of slot UniqueIds. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 8 | u64 | &nbsp;&nbsp;&nbsp;&nbsp;DebugUniqueId |  | one entry per drop slot UniqueId (bookkeeping) |
|  |  | → $8 | end | end of ObjectAIParameter.DropParameter.DebugUniqueIdList |  |  |
|  |  |  | **if** | **only in 8626647418 / 8626647626** |  | present only for these shipped GeneratorVersions |
| — | $8 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;ObjectAIParameter.DropParameter.bEnableFreezeBothDrop | only in 8626647418 / 8626647626 | Frozen kills produce both the normal drop and the frozen drop (version-gated per-instance bool). |
| $8 | $8+4 | 4 | bool32 | ObjectAIParameter.bIgnoreLaterTask |  | Exclude this object from the "later task"/to-do list tracking. Per-instance. |
| $8+4 | $8+8 | 4 | bool32 | ObjectAIParameter.bIgnoreCompleteUI |  | Don't show the completion UI popup when finished. Per-instance. |
| $8+8 | $8+12 | 12 | vec3 (3×f32) | ObjectAIParameter.CompleteUIOffset |  | World offset for the completion UI popup. Per-instance. |
| $8+20 | $8+24 | 4 | bool32 | ObjectAIParameter.bEnableOptimizeWaterBoxContext |  | Enables the water-box context optimisation (skip water checks when not near water). Per-instance. |
| $8+24 | $8+28 | 4 | bool32 | ObjectAIParameter.bDisableSoftEdge |  | Disable the soft edge that stops Pikmin walking off this object. Per-instance. |
| $8+28 | $8+32 | 4 | bool32 | ObjectAIParameter.bDisableSoftEdgeOnlyFrom |  | Disable soft edge only when leaving the object. Per-instance. |
| $8+32 | $8+36 | 4 | bool32 | ObjectAIParameter.bDisableSoftEdgeOnlyTo |  | Disable soft edge only when stepping onto the object. Per-instance. |
| $8+36 | $8+40 | 4+len → $9 | FName (FString) | ObjectAIParameter.LinkNarrowSpaceBoxID |  | ID of the NarrowSpace trigger this object is linked to (tight passages / camera). Per-instance. |
| $9 | $9 | 4+len → $10 | FName (FString) | ObjectAIParameter.LinkWarpTriggerID |  | ID of the WarpTrigger linked to this object. Per-instance. |
| $10 | $10 | 4+len → $11 | FName (FString) | ObjectAIParameter.NavMeshTriggerID |  | ID of the NavMeshTrigger this object toggles when its state changes (e.g. opens a path). Per-instance. |
| $11 | $11 | 1 | u8 | ObjectAIParameter.EscapePointSerializeNum |  | EscapePointSerializeNum - declared number of escape points (FUN_01565C60) |
| $11+1 | $11+1 | 0 | **loop ×N** | **EscapePoints** (count NOT serialized) |  | one vector per escape-point-tagged SceneComponent that exists on the actor, up to EscapePointSerializeNum; the count is NOT written |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;EscapePointLocation |  | relative location of the escape-point scene component |
|  |  | → $12 | end | end of EscapePoints |  |  |
| $12 | $12 | 4 | bool32 | SniffPointParameter.bEnableOptionalPoint |  | Use the optional points below instead of the actor origin. |
| $12+4 | $12+4 | 4 | i32 count → **loop** | **SniffPointParameter.OptionalPointOffsets** |  | Local offsets of optional sniff/target points (Dandori "optionalPointOffsets"). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;OptionalPointOffset |  | local offset of an Oatchi sniff / radar target point |
|  |  | → $13 | end | end of SniffPointParameter.OptionalPointOffsets |  |  |
| $13 | $13 | 4 | i32 count → **loop** | **SniffPointParameter.OptionalPointPriorityInfo** |  | Priority per optional point (int array). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;OptionalPointPriority |  | priority of the matching optional point |
|  |  | → $14 | end | end of SniffPointParameter.OptionalPointPriorityInfo |  |  |

**Worked example** (decoded from real bytes):

Sample: `GFireFloor350uu_C` in `Madori\Cave\Cave002\Cave002_F01\ActorPlacementInfo\AP_Cave002_F01_P_Objects.json`, GeneratorVersion `8626647386`, 251 bytes.

| Offset | Bytes (hex) | Field | Value |
|---|---|---|---|
| 0 | `00 00 00 00` | ObjectAIParameter.DropParameter.DropItemParameter (count) | 0 |
| 4 | `ff ff ff ff` | ObjectAIParameter.DropParameter.DropActorParameter.Index | -1 |
| 8 | `05 00 00 00 4e 6f 6e 65 00` | ObjectAIParameter.DropParameter.DropActorParameter.BoneName | None |
| 17 | `00 00 00 00 00 00 00 00 00 00 00 00` | ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset | (0.0, 0.0, 0.0) |
| 29 | `00 00 00 00 00 00 96 42 00 80 bb 43` | ObjectAIParameter.DropParameter.DropActorParameter.Vel | (0.0, 75.0, 375.0) |
| 41 | `00 00 00 00 00 00 70 41 00 00 f0 41` | ObjectAIParameter.DropParameter.DropActorParameter.RandVel | (0.0, 15.0, 30.0) |
| 53 | `00 00` | ObjectAIParameter.DropParameter.DropActorParameter.DropOption | 0 |
| 55 | `00 00 00 00` | ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum | 0 |
| 59 | `00 00 00 00` | ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation | False |
| 63 | `00 00 00 00 00 00 00 00 00 00 00 00` | ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation | (0.0, 0.0, 0.0) |
| 75 | `00 00 00 00` | ObjectAIParameter.DropParameter.DebugUniqueIdList (count) | 0 |
| 79 | `00 00 00 00` | ObjectAIParameter.bIgnoreLaterTask | False |
| 83 | `00 00 00 00` | ObjectAIParameter.bIgnoreCompleteUI | False |
| 87 | `00 00 00 00 00 00 00 00 00 00 00 00` | ObjectAIParameter.CompleteUIOffset | (0.0, 0.0, 0.0) |
| 99 | `01 00 00 00` | ObjectAIParameter.bEnableOptimizeWaterBoxContext | True |
| 103 | `00 00 00 00` | ObjectAIParameter.bDisableSoftEdge | False |
| 107 | `00 00 00 00` | ObjectAIParameter.bDisableSoftEdgeOnlyFrom | False |
| 111 | `00 00 00 00` | ObjectAIParameter.bDisableSoftEdgeOnlyTo | False |
| 115 | `05 00 00 00 4e 6f 6e 65 00` | ObjectAIParameter.LinkNarrowSpaceBoxID | None |
| 124 | `05 00 00 00 4e 6f 6e 65 00` | ObjectAIParameter.LinkWarpTriggerID | None |
| 133 | `05 00 00 00 4e 6f 6e 65 00` | ObjectAIParameter.NavMeshTriggerID | None |
| 142 | `08` | ObjectAIParameter.EscapePointSerializeNum | 8 |
| 143 | `(none)` | EscapePoints (count) | 8 |
| 143 | `00 00 f0 c3 00 e0 16 c4 e6 ff 47 c2` | EscapePointLocation | (-480.0, -603.5, -49.9999) |
| 155 | `00 00 f0 c3 00 a0 0b c4 e6 ff 47 c2` | EscapePointLocation | (-480.0, -558.5, -49.9999) |
| 167 | `00 80 18 c4 00 20 59 c4 e6 ff 47 c2` | EscapePointLocation | (-610.0, -868.5, -49.9999) |
| 179 | `00 00 66 c4 00 a0 38 c4 e6 ff 47 c2` | EscapePointLocation | (-920.0, -738.5, -49.9999) |
| 191 | `00 00 f0 c3 00 a0 38 c4 e6 ff 47 c2` | EscapePointLocation | (-480.0, -738.5, -49.9999) |
| 203 | `00 80 45 c4 00 20 59 c4 e6 ff 47 c2` | EscapePointLocation | (-790.0, -868.5, -49.9999) |
| 215 | `00 00 66 c4 00 a0 0b c4 e6 ff 47 c2` | EscapePointLocation | (-920.0, -558.5, -49.9999) |
| 227 | `00 80 45 c4 00 40 d6 c3 e6 ff 47 c2` | EscapePointLocation | (-790.0, -428.5, -49.9999) |
| 239 | `00 00 00 00` | SniffPointParameter.bEnableOptionalPoint | False |
| 243 | `00 00 00 00` | SniffPointParameter.OptionalPointOffsets (count) | 0 |
| 247 | `00 00 00 00` | SniffPointParameter.OptionalPointPriorityInfo (count) | 0 |

<a id="shared-sections"></a>
## Shared sections

<a id="sec-cylinder"></a>
### Cylinder

CylinderSearchArea (FUN_00F43A50) - 20 bytes. Size: 20 bytes.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 12 | vec3 (3×f32) | Center |  | Centre (world position for territories; offset for search areas). |
| 12 | 12 | 4 | f32 | HalfHeight |  | Half-height of the cylinder. |
| 16 | 16 | 4 | f32 | Radius |  | Radius of the cylinder. |

<a id="sec-cakessphere"></a>
### CakeSSphere

CakeSSphereSearchArea (FUN_00F2ABF0) - 28 bytes. Size: 28 bytes.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 12 | vec3 (3×f32) | Center |  |  |
| 12 | 12 | 4 | f32 | HalfHeight |  |  |
| 16 | 16 | 4 | f32 | Radius |  |  |
| 20 | 20 | 4 | f32 | Angle |  |  |
| 24 | 24 | 4 | f32 | SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |

<a id="sec-dropcondition"></a>
### DropCondition

DropConditionParameter element (FUN_011835B0). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 1 | u8 EDropCondition | DropCond |  | EDropCondition: 1 NoRescueSurvivor / 2 RescueSurvivor (castaway DropCondName not/already rescued), 3 NoSalvageOtakara / 4 SalvageOtakara (treasure DropCondName not/already collected), 5 NoSalvageDropItem / 6 SalvageDropItem (DropCondInt not/already in this generator's collected-drop list), 7 PlayedDemo (cutscene DropCondDemo already seen). |
| 1 | 1 | 4 | i32 | DropCondInt |  | Integer operand (drop-item index) for the SalvageDropItem conditions. |
| 5 | 5 | 4+len → $1 | FName (FString) | DropCondName |  | Name operand (castaway or treasure name) for the Survivor/Otakara conditions. |
| $1 | $1 | 1 | u8 EDemoFlagType | DropCondDemo |  | EDemoFlagType cutscene that must have been played for PlayedDemo. |

<a id="sec-spawnminiinfo"></a>
### SpawnMiniInfo

DropSpawnMiniInfo (FUN_01183700). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4+len → $1 | class path (FString) | DropActor |  | Blueprint class to spawn (e.g. GOtaXXX_C treasure, pellets, nectar). |
| $1 | $1 | 4+len → $2 | FName (FString) | CustomParameter |  | Free-form FName passed to the spawned actor (e.g. SVSleep000 = castaway NPC key, UseSpawnerTerritory for Dweevils). |
| $2 | $2 | 4 | f32 | CustomFloatParameter |  | Free-form float passed to the spawned actor. |
| $2+4 | $2+4 | 2 | u16 | GameRulePermissionFlag |  | EDropGameRulePermissionFlag bitmask of game modes in which it may spawn: 1 Area day, 2 Area night, 4 Cave, 8 Hero (Olimar's Shipwreck Tale), 256 Mission/Dandori challenge (cave bingo/collection/extra), 4096 VS (Dandori Battle). 0 = always; negative = never (0x01DB8E70). |
| $2+6 | $2+6 | 4 | bool32 | bSetTerritory |  | Give the spawned actor its own territory (uses Territory below). |
| $2+10 | $2+10 |  | **if** | **only if bSetTerritory ≠ 0** |  | block present only when the flag just read is set |
| $2+10 | $2+10 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Territory.Center | only if bSetTerritory ≠ 0 | Centre (world position for territories; offset for search areas). |
| $2+22 | $2+22 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;Territory.HalfHeight | only if bSetTerritory ≠ 0 | Half-height of the cylinder. |
| $2+26 | $2+26 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;Territory.Radius | only if bSetTerritory ≠ 0 | Radius of the cylinder. |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |

<a id="sec-dropitem"></a>
### DropItem

DropItemParameter element (FUN_01182F50). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 8 | u64 | UniqueId |  | 64-bit unique id of the slot (serialized first; Dandori reads it as "id"+"flags" 32-bit halves; -1 when unused). |
| 8 | 8 | 4 | i32 | MinNum |  | Minimum number of this item to drop. |
| 12 | 12 | 4 | i32 | MaxNum |  | Maximum number of this item to drop. |
| 16 | 16 | 4 | f32 | DropRatio |  | Probability (0..1) that this slot drops. |
| 20 | 20 | 4 | bool32 | bRegistGenerator |  | Register the spawned drop with the level generator so it is persisted/saved like a placed object (and tracked for Salvage conditions). |
| 24 | 24 | 4 | i32 count → **loop** | **DropConditions** |  | Extra conditions that must all pass for the slot to drop, see DropConditionParameter (checked in 0x01DB7BA0). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | variable → $1 | section | &nbsp;&nbsp;&nbsp;&nbsp;[DropCondition](#sec-dropcondition) |  | DropConditionParameter element (FUN_011835B0) |
|  |  | → $2 | end | end of DropConditions |  |  |
| $2 | $2 | variable → $3 | section | [SpawnMiniInfo](#sec-spawnminiinfo) |  | DropSpawnMiniInfo (FUN_01183700) |

<a id="sec-dropactor"></a>
### DropActor

DropActorParameter (FUN_01183360); bDropNotifyTime (+0x0) is NOT serialized. Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | i32 | Index |  | Index used for the drop (serialized as -1 by default – Dandori's "255s"). |
| 4 | 4 | 4+len → $1 | FName (FString) | BoneName |  | Bone the drops spawn from. |
| $1 | $1 | 12 | vec3 (3×f32) | LocalOffset |  | Offset from that bone. |
| $1+12 | $1+12 | 12 | vec3 (3×f32) | Vel |  | Initial launch velocity of dropped items. |
| $1+24 | $1+24 | 12 | vec3 (3×f32) | RandVel |  | Random velocity added per item. |
| $1+36 | $1+36 | 2 | u16 | DropOption |  | uint16 option flags for dropping. |
| $1+38 | $1+38 | 4 | i32 | FixedHotExtractDropNum |  | Fixed number of nectar ("hot extract") drops, overriding random counts. |
| $1+42 | $1+42 | 4 | bool32 | bOverrideInitLocation |  | Use OverrideInitLocation as the spawn position. |
| $1+46 | $1+46 | 12 | vec3 (3×f32) | OverrideInitLocation |  | Explicit spawn position for drops. |

<a id="sec-drop"></a>
### Drop

DropParameter (FUN_01182880 + FUN_01182C60); the version-gated bEnableFreezeBothDrop (+0x6d) follows in the owner. Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | i32 count → **loop** | **DropItemParameter** |  | Array of drop slots; each slot is independently rolled (see DropItemParameter). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | variable → $1 | section | &nbsp;&nbsp;&nbsp;&nbsp;[DropItem](#sec-dropitem) |  | DropItemParameter element (FUN_01182F50) |
|  |  | → $2 | end | end of DropItemParameter |  |  |
| $2 | $2 | variable → $3 | section | [DropActor](#sec-dropactor) |  | DropActorParameter (FUN_01183360); bDropNotifyTime (+0x0) is NOT serialized |
| $3 | $3 | 4 | i32 count → **loop** | **DebugUniqueIdList** |  | List of uint64 unique IDs (serialized after the slots; Dandori's "inventory flag loop"). Debug/bookkeeping of slot UniqueIds. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 8 | u64 | &nbsp;&nbsp;&nbsp;&nbsp;DebugUniqueId |  | one entry per drop slot UniqueId (bookkeeping) |
|  |  | → $4 | end | end of DebugUniqueIdList |  |  |

<a id="sec-sniff"></a>
### Sniff

SniffPointParameter (CarrotAIComponent+0x688, FUN_00E45140) - last block of almost every layout. Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | bool32 | bEnableOptionalPoint |  | Use the optional points below instead of the actor origin. |
| 4 | 4 | 4 | i32 count → **loop** | **OptionalPointOffsets** |  | Local offsets of optional sniff/target points (Dandori "optionalPointOffsets"). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;OptionalPointOffset |  | local offset of an Oatchi sniff / radar target point |
|  |  | → $1 | end | end of OptionalPointOffsets |  |  |
| $1 | $1 | 4 | i32 count → **loop** | **OptionalPointPriorityInfo** |  | Priority per optional point (int array). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;OptionalPointPriority |  | priority of the matching optional point |
|  |  | → $2 | end | end of OptionalPointPriorityInfo |  |  |

<a id="sec-tekiparam"></a>
### TekiParam

TekiAIParameter per-instance subset (FUN_017C91D0, param = component+0x710). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 12 | vec3 (3×f32) | Territory.Center |  | Centre (world position for territories; offset for search areas). |
| 12 | 12 | 4 | f32 | Territory.HalfHeight |  | Half-height of the cylinder. |
| 16 | 16 | 4 | f32 | Territory.Radius |  | Radius of the cylinder. |
| 20 | 20 | variable → $1 | section | [Drop](#sec-drop) |  | DropParameter (FUN_01182880 + FUN_01182C60); the version-gated bEnableFreezeBothDrop (+0x6d) follows in the owner |
|  |  |  | **if** | **only in 8626647418 / 8626647626** |  | present only for these shipped GeneratorVersions |
| — | $1 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;DropParameter.bEnableFreezeBothDrop | only in 8626647418 / 8626647626 | Frozen kills produce both the normal drop and the frozen drop (version-gated per-instance bool). |
| $1 | $1+4 | 4 | bool32 | bCalcSearchAreaOtakaraCarryWithTerritory |  | When set, the treasure-carry search area is re-centred on / computed from the territory rather than the enemy's own position (read at 0x017F27C0; per-instance). |
| $1+4 | $1+8 | 12 | vec3 (3×f32) | SearchAreaOtakaraCarry.Center |  | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |
| $1+16 | $1+20 | 4 | f32 | SearchAreaOtakaraCarry.HalfHeight |  | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |
| $1+20 | $1+24 | 4 | f32 | SearchAreaOtakaraCarry.Radius |  | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |
| $1+24 | $1+28 | 4 | f32 | SearchAreaOtakaraCarry.Angle |  | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |
| $1+28 | $1+32 | 4 | f32 | SearchAreaOtakaraCarry.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+32 | $1+36 | 4 | f32 | InvasionParameter.StartTimeRatio |  | Fraction of the night timer at which this enemy starts its invasion (attacking the Lumiknoll). Per-instance. |
| $1+36 | $1+40 | 4 | bool32 | bNotifyCarryNearProWrestlingPikmin |  | Notify nearby carrying Pikmin when this enemy is grappled (0x00E82A80). Per-instance. |
| $1+40 | $1+44 | 4 | bool32 | bEnableCullSearchEnemy |  | Allows the enemy's target search to be culled/skipped when off-screen (0x01E0B760). Per-instance. |
| $1+44 | $1+48 | 4 | bool32 | bUseActorLastRenderTime |  | Use the actor's last-rendered time to decide culling; if the check fails it falls back to bEnableCullSearchEnemy (0x01E0B760). Per-instance. |

<a id="sec-tekibase"></a>
### TekiBase

every enemy (UTekiAIComponent::vfunc_156 @0x017C9190). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiParam](#sec-tekiparam) |  | TekiAIParameter per-instance subset (FUN_017C91D0, param = component+0x710) |
| $1 | $1 | variable → $2 | section | [Sniff](#sec-sniff) |  | SniffPointParameter (CarrotAIComponent+0x688, FUN_00E45140) - last block of almost every layout |

<a id="sec-objectparam"></a>
### ObjectParam

ObjectAIParameter per-instance subset (FUN_01565860, param = component+0x710). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [Drop](#sec-drop) |  | DropParameter (FUN_01182880 + FUN_01182C60); the version-gated bEnableFreezeBothDrop (+0x6d) follows in the owner |
|  |  |  | **if** | **only in 8626647418 / 8626647626** |  | present only for these shipped GeneratorVersions |
| — | $1 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;DropParameter.bEnableFreezeBothDrop | only in 8626647418 / 8626647626 | Frozen kills produce both the normal drop and the frozen drop (version-gated per-instance bool). |
| $1 | $1+4 | 4 | bool32 | bIgnoreLaterTask |  | Exclude this object from the "later task"/to-do list tracking. Per-instance. |
| $1+4 | $1+8 | 4 | bool32 | bIgnoreCompleteUI |  | Don't show the completion UI popup when finished. Per-instance. |
| $1+8 | $1+12 | 12 | vec3 (3×f32) | CompleteUIOffset |  | World offset for the completion UI popup. Per-instance. |
| $1+20 | $1+24 | 4 | bool32 | bEnableOptimizeWaterBoxContext |  | Enables the water-box context optimisation (skip water checks when not near water). Per-instance. |
| $1+24 | $1+28 | 4 | bool32 | bDisableSoftEdge |  | Disable the soft edge that stops Pikmin walking off this object. Per-instance. |
| $1+28 | $1+32 | 4 | bool32 | bDisableSoftEdgeOnlyFrom |  | Disable soft edge only when leaving the object. Per-instance. |
| $1+32 | $1+36 | 4 | bool32 | bDisableSoftEdgeOnlyTo |  | Disable soft edge only when stepping onto the object. Per-instance. |
| $1+36 | $1+40 | 4+len → $2 | FName (FString) | LinkNarrowSpaceBoxID |  | ID of the NarrowSpace trigger this object is linked to (tight passages / camera). Per-instance. |
| $2 | $2 | 4+len → $3 | FName (FString) | LinkWarpTriggerID |  | ID of the WarpTrigger linked to this object. Per-instance. |
| $3 | $3 | 4+len → $4 | FName (FString) | NavMeshTriggerID |  | ID of the NavMeshTrigger this object toggles when its state changes (e.g. opens a path). Per-instance. |

<a id="sec-objectbase"></a>
### ObjectBase

every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectParam](#sec-objectparam) |  | ObjectAIParameter per-instance subset (FUN_01565860, param = component+0x710) |
| $1 | $1 | 1 | u8 | ObjectAIParameter.EscapePointSerializeNum |  | EscapePointSerializeNum - declared number of escape points (FUN_01565C60) |
| $1+1 | $1+1 | 0 | **loop ×N** | **EscapePoints** (count NOT serialized) |  | one vector per escape-point-tagged SceneComponent that exists on the actor, up to EscapePointSerializeNum; the count is NOT written |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;EscapePointLocation |  | relative location of the escape-point scene component |
|  |  | → $2 | end | end of EscapePoints |  |  |
| $2 | $2 | variable → $3 | section | [Sniff](#sec-sniff) |  | SniffPointParameter (CarrotAIComponent+0x688, FUN_00E45140) - last block of almost every layout |

<a id="sec-navlinkpoints"></a>
### NavLinkPoints

NavLinkComponent point pairs (FUN_0183AD30 / FUN_018088B0); only when the actor has a NavLinkComponent. Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | i32 count → **loop** | **NavLinks** |  |  |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;LeftPoint |  | nav link left end (relative) |
| elem+12 | elem+12 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;RightPoint |  | nav link right end (relative) |
|  |  | → $1 | end | end of NavLinks |  |  |

<a id="sec-navlinkproxy"></a>
### NavLinkProxy

UNavLinkCustomComponent-style proxy (FUN_014543D0). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 12 | vec3 (3×f32) | RelativeLocation |  | proxy component relative location (+0x1D0) |
| 12 | 12 | 4 | i32 count → **loop** | **Links** |  | FNavigationLink array at +0x4A0 (0x48-byte elements) |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Left |  | FNavigationLink.Left |
| elem+12 | elem+12 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Right |  | FNavigationLink.Right |
| elem+24 | elem+24 | 1 | u8 | &nbsp;&nbsp;&nbsp;&nbsp;Direction |  | ENavLinkDirection (0 both ways, 1 left->right, 2 right->left) |
| elem+25 | elem+25 | 1 | u8 | &nbsp;&nbsp;&nbsp;&nbsp;bUseSnapHeight |  | bit 0 of the link flag byte (+0x1D) |
|  |  | → $1 | end | end of Links |  |  |

<a id="sec-navlinkfull"></a>
### NavLinkFull

full FNavigationLink array of the actor's NavLinkComponent (FenceFall FUN_01464C50 / Geyser FUN_01467030). Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | i32 count → **loop** | **NavLinks** |  | FNavigationLink elements (0x48 bytes in memory, 47 bytes on the wire) |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Left |  | FNavigationLink.Left (+0x30) - start point relative to the actor |
| elem+12 | elem+12 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Right |  | FNavigationLink.Right (+0x3C) - end point |
| elem+24 | elem+24 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;LeftProjectHeight |  | +0x0: project the start point onto geometry below if > 0 |
| elem+28 | elem+28 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;MaxFallDownLength |  | +0x4: project the end point / max drop length |
| elem+32 | elem+32 | 1 | u8 | &nbsp;&nbsp;&nbsp;&nbsp;Direction |  | +0x1C ENavLinkDirection (0 BothWays, 1 LeftToRight, 2 RightToLeft) |
| elem+33 | elem+33 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;SnapRadius |  | +0xC |
| elem+37 | elem+37 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;SnapHeight |  | +0x10 |
| elem+41 | elem+41 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;SupportedAgentsBits |  | +0x18 agent mask (0xFFFFFFFF = all agents) |
| elem+45 | elem+45 | 1 | u8 | &nbsp;&nbsp;&nbsp;&nbsp;bUseSnapHeight |  | bit 0 of +0x1D |
| elem+46 | elem+46 | 1 | u8 | &nbsp;&nbsp;&nbsp;&nbsp;bSnapToCheapestArea |  | bit 1 of +0x1D |
|  |  | → $1 | end | end of NavLinks |  |  |

<a id="sec-splinepoints"></a>
### SplinePoints

USplineComponent points (FUN_00DA2A10 / FUN_00DA2F20) - only when the owner actor has a USplineComponent. Size: variable.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 |  | **if** | **optional: Spline** |  | written only if the owner actor has a USplineComponent (FindComponentByClass) |
| 0 | 0 | 4 | i32 count → **loop** | &nbsp;&nbsp;&nbsp;&nbsp;**SplinePoints** | optional: Spline |  |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;InputKey | optional: Spline | FSplinePoint.InputKey (point index as float) |
| elem+4 | elem+4 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Position | optional: Spline | FSplinePoint.Position (local) |
| elem+16 | elem+16 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ArriveTangent | optional: Spline | FSplinePoint.ArriveTangent |
| elem+28 | elem+28 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LeaveTangent | optional: Spline | FSplinePoint.LeaveTangent |
| elem+40 | elem+40 | 12 | rotator (3×f32 P,Y,R) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rotation | optional: Spline | FSplinePoint.Rotation (pitch, yaw, roll) |
| elem+52 | elem+52 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scale | optional: Spline | FSplinePoint.Scale |
| elem+64 | elem+64 | 1 | u8 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type | optional: Spline | ESplinePointType: 0 Linear, 1 Curve, 2 Constant, 3 CurveClamped, 4 CurveCustomTangent |
|  |  | → $1 | end | &nbsp;&nbsp;&nbsp;&nbsp;end of SplinePoints |  |  |
|  |  | → $2 | end | end of conditional block |  | $2 = offset after the block (whether or not it was written) |

<a id="sec-futakuchiadultattack"></a>
### FutakuchiAdultAttack

FutakuchiAdultAttackBaseParameter (FUN_0109D550) - 6 floats. Size: 24 bytes.

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | f32 | AttackLoopWaitSecMin |  | Min wait between attack loops. |
| 4 | 4 | 4 | f32 | AttackLoopWaitSecMax |  | Max wait between attack loops. |
| 8 | 8 | 4 | f32 | AttackSignSecMin |  | Min warning time. |
| 12 | 12 | 4 | f32 | AttackSignSecMax |  | Max warning time. |
| 16 | 16 | 4 | f32 | AttackInterval |  | Interval between attacks. |
| 20 | 20 | 4 | f32 | AttackIntervalSuccess |  | Interval after a successful attack. |

<a id="component-layouts"></a>
## Component layouts

One table per serializer class. **Actors** lists the placed actor classes that use it. Offsets are from the start of AI.Static.

<a id="sec-uactorspawnercomponent"></a>
### UActorSpawnerComponent

**Actors:** `GActorSpawner_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | bool32 | ActorSpawnAIParameter.OverlapCond.Avatar |  | Spawner fires when a captain is inside OverlapArea. |
| 4 | 4 | 4 | bool32 | ActorSpawnAIParameter.OverlapCond.Pikmin |  | Fires when Pikmin are inside. |
| 8 | 8 | 4 | bool32 | ActorSpawnAIParameter.OverlapCond.AvatarAndPikmin |  | Requires both. |
| 12 | 12 | 4 | bool32 | ActorSpawnAIParameter.OverlapCond.Carry |  | Fires when a carried object is inside. |
| 16 | 16 | 4 | bool32 | ActorSpawnAIParameter.OverlapCond.bGenseiControl |  | Fires under "Gensei control" (native-creature control mode). |
| 20 | 20 | 4 | bool32 | ActorSpawnAIParameter.OverlapCond.bNotOverlap |  | Invert: spawn while nothing overlaps. |
| 24 | 24 | 12 | vec3 (3×f32) | ActorSpawnAIParameter.OverlapArea.Center |  | Trigger volume that activates the spawner. |
| 36 | 36 | 4 | f32 | ActorSpawnAIParameter.OverlapArea.HalfHeight |  | Trigger volume that activates the spawner. |
| 40 | 40 | 4 | f32 | ActorSpawnAIParameter.OverlapArea.Radius |  | Trigger volume that activates the spawner. |
| 44 | 44 | 4 | f32 | ActorSpawnAIParameter.OverlapArea.Angle |  | Trigger volume that activates the spawner. |
| 48 | 48 | 4 | f32 | ActorSpawnAIParameter.OverlapArea.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| 52 | 52 | 4+len → $1 | FName (FString) | ActorSpawnAIParameter.MotionName |  | Animation the spawned actor starts in (e.g. "FallStart" = drops from the sky; Dandori's fallStart flag). |
| $1 | $1 | 4 | bool32 | LocalFlag |  | 4-byte value read into a temporary (always 1 in shipped data) |
| $1+4 | $1+4 | 12 | vec3 (3×f32) | ActorSpawnAIParameter.SpawnLocation |  | Local offset where actors appear. |
| $1+16 | $1+16 | 4 | bool32 | ActorSpawnAIParameter.bSpawnAngRand |  | Randomise the spawn yaw. |
| $1+20 | $1+20 | 4 | f32 | ActorSpawnAIParameter.SpawnAng |  | Spawn yaw (or random range when bSpawnAngRand). |
| $1+24 | $1+24 | 4 | f32 | ActorSpawnAIParameter.SpawnVel.X |  | Initial XY/Z launch velocity of spawned actors. |
| $1+28 | $1+28 | 4 | f32 | ActorSpawnAIParameter.SpawnVel.Y |  | Initial XY/Z launch velocity of spawned actors. |
| $1+32 | $1+32 | 4 | bool32 | ActorSpawnAIParameter.bInfiniteSpawn |  | Keep spawning forever (respawn when killed) instead of a limited count. |
| $1+36 | $1+36 | 4 | f32 | ActorSpawnAIParameter.SpawnInterval |  | Seconds between spawns (compared against the spawn timer in 0x00ED4410). |
| $1+40 | $1+40 | 4 | i32 | ActorSpawnAIParameter.MaxAreaNum |  | Maximum spawned actors alive at once. |
| $1+44 | $1+44 | 4 | i32 | ActorSpawnAIParameter.MaxSpawnNum |  | Total spawn limit (Dandori "spawnLimit"). |
| $1+48 | $1+48 | 4 | bool32 | ActorSpawnAIParameter.bRandomRotation |  | Randomise the spawned actor's rotation. |
| $1+52 | $1+52 | 4 | bool32 | ActorSpawnAIParameter.bNoDropItem |  | Spawned actors drop nothing when killed. |
| $1+56 | $1+56 | variable → $2 | section | [SpawnMiniInfo](#sec-spawnminiinfo) |  | DropSpawnMiniInfo (FUN_01183700) |
| $2 | $2 | 4 | f32 | ActorSpawnAIParameter.InvasionStartTimeRatio |  | Night-mode: fraction of the night timer after which spawning starts (compared in 0x025F7B50). |

<a id="sec-uairwallaicomponent"></a>
### UAirWallAIComponent

**Actors:** `GAirWallBox_C`, `GAirWallFlick_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | SearchCID |  | CID to look for (e.g. STRING, PULLNEKKO, CRACKPOT); wall stays while it exists nearby. |
| $2 | $2 | 4 | f32 | SearchRadius |  | Radius for SearchCID. |
| $2+4 | $2+4 | 4 | i32 count → **loop** | **SearchTagList** |  | Tags to search for. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4+len → $3 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;SearchTag |  | tag of an actor the wall waits for |
|  |  | → $4 | end | end of SearchTagList |  |  |
| $4 | $4 | 4 | bool32 | bCheckAtAnd |  | Require all tags instead of any. |

<a id="sec-uamebozuaicomponent"></a>
### UAmeBozuAIComponent

**Actors:** `GAmeBozu_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | AmeBozuAIParameter.bAppearSearch |  | Search for targets while appearing. Per-instance. |
| $1+4 | $1+4 | 4+len → $2 | FName (FString) | AmeBozuAIParameter.SearchTagName |  | Tag of the route/root points it uses (e.g. AmeBozuRootPoint000). Per-instance. |
| $2 | $2 | 4 | f32 | AmeBozuAIParameter.HideTimeMin |  | Minimum time hidden before reappearing. Per-instance. |
| $2+4 | $2+4 | 4 | f32 | AmeBozuAIParameter.HideTimeMax |  | Maximum hidden time. Per-instance. |
| $2+8 | $2+8 | 4 | bool32 | AmeBozuAIParameter.bAppearFixedLocation |  | Always reappear at the fixed search-tag point rather than near the player. Per-instance. |
| $2+12 | $2+12 | 4 | f32 | AmeBozuAIParameter.AppearSearchRadius |  | Radius searched for targets when appearing (Dandori's "searchDistance?"). Per-instance. |
| $2+16 | $2+16 | 1 | u8 EAmeBozuWalkType | AmeBozuAIParameter.WalkType |  | EAmeBozuWalkType walking pattern (Dandori's "random 1" byte). Per-instance. |
| $2+17 | $2+17 | 4+len → $3 | FName (FString) | AmeBozuAIParameter.CanAttackLevelFaceMessageName |  | Captain face message shown in those levels (e.g. Teki_Announce_AmeBozu_Cave016_00). Per-instance. |

<a id="sec-uamemboaicomponent"></a>
### UAmemboAIComponent

**Actors:** `GAmembo_C`, `GDorombo_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | AmemboAIParameter.BulletParam.Altitude |  | Arc apex height. |
| $1+4 | $1+4 | 4 | f32 | AmemboAIParameter.BulletParam.CustomGravityRate |  | Gravity scale for the bullet. |
| $1+8 | $1+8 | 4 | f32 | AmemboAIParameter.SearchEnemyRadius |  | Target search radius. Per-instance. |
| $1+12 | $1+12 | 4 | f32 | AmemboAIParameter.EscapeRadius |  | Threat radius that triggers escaping. Per-instance. |
| $1+16 | $1+16 | 4 | f32 | AmemboAIParameter.DrinkableRadius |  | Radius in which it can drink (water surface). Per-instance. |

<a id="sec-uareabasecampcomponent"></a>
### UAreaBaseCampComponent

**Actors:** `GOnyonCamp01_C`, `GOnyonCamp02_C`, `GOnyonCamp03_C`, `GOnyonCamp04_C`, `GOnyonCampDummy_C`, `GOnyonCampSimple_C`, `GOnyonCampZukan_C`, `GOnyonCamp_C`, `GPodCamp01_C`, `GPodCamp02_C`, `GPodCamp03_C`, `GPodCamp04_C`, `GPodCampCave00_C`, `GPodCampCave01_C`, `GPodCampCave02_C`, `GPodCampCave03_C`, `GPodCampDummy_C`, `GPodCampSimple_C`, `GPodCampZukan_C`, `GPodCamp_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | i32 | BaseCampId |  | Base camp ID (portals' ToBaseCampId points here). |
| $1+4 | $1+4 | 4 | bool32 | bDeactivateByExit |  | Base deactivates when you leave through it. |
| $1+8 | $1+8 | 4 | f32 | AreaBaseCampParameter.SafeAreaBound.Radius |  | Radius. |
| $1+12 | $1+12 | 12 | vec3 (3×f32) | AreaBaseCampParameter.SafeAreaOffset |  | Offset of the safe area. |
| $1+24 | $1+24 | 12 | vec3 (3×f32) | AreaBaseCampParameter.SearchBound.HalfX |  | Half size X. |
| $1+36 | $1+36 | 4 | f32 | AreaBaseCampParameter.ForceFloweringRadius |  | Pikmin inside this radius are forced to flower (Dandori's "Unknown" float). |
| $1+40 | $1+40 | 4 | f32 | AreaBaseCampParameter.StateChangeDelayTime |  | Delay before the base changes state. |
| $1+44 | $1+44 | 4 | f32 | AreaBaseCampParameter.GuruguruDist |  | Radius of the "guruguru" (circling) idle of Pikmin around the base. |
| $1+48 | $1+48 | 4 | i32 count → **loop** | **AreaBaseCampParameter.CIDList** |  | CIDs linked to this base (Dandori's CIDList). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4+len → $2 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;CID |  | CID linked to the base |
|  |  | → $3 | end | end of AreaBaseCampParameter.CIDList |  |  |

<a id="sec-ubabyaicomponent"></a>
### UBabyAIComponent

**Actors:** `GBaby_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | BabyAIParameter.bPatrolType |  | Uses patrol behaviour. |
| $1+4 | $1+4 | 4+len → $2 | FName (FString) | BabyAIParameter.SearchTagName |  | Tag of patrol/hide points. Per-instance. |

<a id="sec-ubankaicomponent"></a>
### UBankAIComponent

**Actors:** `GBank_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 1 | u8 | BankAIParameter.SerialNum |  | Serial number of this bank (links to its bank cards). Per-instance. |

<a id="sec-ubigchappyaicomponent"></a>
### UBigChappyAIComponent

**Actors:** `GBigChappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | BigChappyAIParameter.bHideEnter |  | Starts hidden inside its box. Per-instance. |
| $1+4 | $1+4 | 12 | vec3 (3×f32) | BigChappyAIParameter.HideOffset |  | Offset to the hiding spot. Per-instance. |

<a id="sec-ubigkingchappyaicomponent"></a>
### UBigKingChappyAIComponent

**Actors:** `GBigKingChappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UKingChappyBaseAIComponent](#sec-ukingchappybaseaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 4 | bool32 | BigKingChappyAIParameter.BigJumpParameter.bSinkFloor |  | Landing sinks/deforms soft floors (press floor). Per-instance. |
| $1+4 | $1+4 | 4 | bool32 | BigKingChappyAIParameter.BigJumpParameter.bWithFallRock |  | Landing makes rocks fall from the ceiling. Per-instance. |
| $1+8 | $1+8 | 4 | bool32 | BigKingChappyAIParameter.BigJumpParameter.FallRockParameter.bSinkFloor |  | Rock impacts sink the floor. Per-instance. |

<a id="sec-ubigujinkoaicomponent"></a>
### UBigUjinkoAIComponent

**Actors:** `GBigUjinko_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UUjinkoAAIComponent](#sec-uujinkoaaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 4 | bool32 | BigUjinkoAIParameter.bPatrolType |  | Patrols between tagged points instead of wandering. Per-instance. |
| $1+4 | $1+4 | 4+len → $2 | FName (FString) | BigUjinkoAIParameter.SearchTagName |  | Tag of the patrol points. Per-instance. |
| $2 | $2 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaCaution.Center |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $2+12 | $2+12 | 4 | f32 | TekiAIParameter.SearchAreaCaution.HalfHeight |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $2+16 | $2+16 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Radius |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $2+20 | $2+20 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Angle |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $2+24 | $2+24 | 4 | f32 | TekiAIParameter.SearchAreaCaution.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |

<a id="sec-ubikkurigikuaicomponent"></a>
### UBikkuriGikuAIComponent

**Actors:** `GBikkuriGiku_C`, `GBikkuriKinoko_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | BikkuriGikuAIParameter.MimicrySearchRange |  | Range in which it notices targets while disguised. Per-instance. |
| $1+4 | $1+4 | 12 | vec3 (3×f32) | BikkuriGikuAIParameter.MimicrySearchOffset |  | Offset of the mimicry search. Per-instance. |
| $1+16 | $1+16 | 4 | bool32 | BikkuriGikuAIParameter.bFixedArtillery |  | Stationary "artillery" variant that never moves. Per-instance. |

<a id="sec-ubossinu2aicomponent"></a>
### UBossInu2AIComponent

Ancient Sirehound - only the enemy base.

**Actors:** `GBossInu2_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |

<a id="sec-ubranchaicomponent"></a>
### UBranchAIComponent

**Actors:** `GBranch_Long_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | BranchAIParameter.JumpHeight |  | Jump height for the link. |
| $1+4 | $1+4 | 12 | vec3 (3×f32) | BranchAIParameter.NavLinkRightOffset |  | Offset of the landing nav-link point (Dandori "navLinkRight"). |

<a id="sec-ubridgeflexibleaicomponent"></a>
### UBridgeFlexibleAIComponent

**Actors:** `GBridgeFlexibleCave_C`, `GBridgeFlexible_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 4 | i32 | NeedColumnNum |  | Number of columns/segments in the bridge. |
| $1+4 | $1+4 | 12 | vec3 (3×f32) | ?+0x1188 |  |  |
| $1+16 | $1+16 | 1 | u8 | BaseWallColType |  | Collision type of the base wall. |
| $1+17 | $1+17 | 4 | bool32 | bEnableAdjustNavLinkPos |  | Adjust nav-link positions to the built length. |
| $1+21 | $1+21 |  | **if** | **optional: NavLink** |  | only if the actor has a NavLinkComponent |
| $1+21 | $1+21 | variable → $2 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkPoints](#sec-navlinkpoints) | optional: NavLink | NavLinkComponent point pairs (FUN_0183AD30 / FUN_018088B0); only when the actor has a NavLinkComponent |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |

<a id="sec-ubuildobjectaicomponent"></a>
### UBuildObjectAIComponent

**Actors:** `GBridgeStation_C`, `GHikariStation_C`, `GKinkaiStation_C`, `GSlopeBoth50uu_C`, `GSlopeBothSidecut50uu_C`, `GSlopeBothSidecut80uu_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | EntranceOffset |  | Offset of the builder entrance. |
| $1+4 | $1+4 | 4 | i32 | PiecePerPanel |  | Pieces needed per panel/segment. |

<a id="sec-ubuildwallflexibleaicomponent"></a>
### UBuildWallFlexibleAIComponent

**Actors:** `GWallFlexibleCave_C`, `GWallFlexible_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 4 | i32 | NeedColumnNum |  | Number of columns. |
| $1+4 | $1+4 | 4 | bool32 | bDisableNavLink |  | Don't create a nav link across the wall. |

<a id="sec-uburningaicomponent"></a>
### UBurningAIComponent

**Actors:** `GBurning_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | BurningAIParameter.ColdBoxEventRadius |  | Radius in which cold boxes (ice) extinguish it. |
| $1+4 | $1+4 | 4+len → $2 | FName (FString) | BurningAIParameter.SearchActorCID |  | CID linked to this fire (e.g. MADORIPOKO, OTADARUMA – the object it is burning/blocking). |

<a id="sec-uburrowaicomponent"></a>
### UBurrowAIComponent

**Actors:** `GBurrow_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4+len → $1 | FName (FString) | BurrowAIParameter.Tag |  | Burrow tag linking it to its enemy (e.g. Shako1). |
| $1 | $1 | 4 | bool32 | BurrowAIParameter.bEnableSoftEdge |  | Soft edge enabled around the burrow. |

<a id="sec-uchappyaicomponent"></a>
### UChappyAIComponent

**Actors:** `GChappy_C`, `GNightChappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | ChappyAIParameter.bEnableEatLimit |  | Limit the Pikmin it can eat. |
| $1+4 | $1+4 | 4 | i32 | ChappyAIParameter.EatLimitNum |  | Pikmin it can eat before stopping (per-instance). |
| $1+8 | $1+8 | 4 | bool32 | ChappyAIParameter.bDieOnlyDuringFreezing |  | Only dies while frozen. |

<a id="sec-ucirculatoraicomponent"></a>
### UCirculatorAIComponent

**Actors:** `GCirculatorLeanForHeroArea010_C`, `GCirculatorLeanForWorkingOnlyDay_C`, `GCirculatorLeanPurple_C`, `GCirculatorLean_C`, `GCirculatorPurple_C`, `GCirculatorRed_C`, `GCirculator_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | CirculatorAIParameter.SwitchID |  | Switch that turns it on. |
| $2 | $2 | 4 | bool32 | CirculatorAIParameter.bWindLong |  | Long wind (higher/longer lift) variant. |
| $2+4 | $2+4 |  | **if** | **optional: NavLink** |  | only if the actor has a NavLinkComponent with >=1 link: vector at link[0]+0x3C |
| $2+4 | $2+4 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;NavLinkRightOffset | optional: NavLink | right end of the first nav link |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |

<a id="sec-uconveyorbaseaicomponent"></a>
### UConveyorBaseAIComponent

**Actors:** `GConveyor265uu_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | ConveyorBaseAIParameter.SwitchID |  | Controlling switch. |
| $2 | $2 | 4 | f32 | ConveyorBaseAIParameter.DriveSpeed |  | Belt speed. |

<a id="sec-uconveyornavaicomponent"></a>
### UConveyorNavAIComponent

conveyor with nav links (FUN_01453840).

**Actors:** `GConveyorNav_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | ConveyorNavAIParameter.SwitchID |  | Controlling switch. |
| $2 | $2 | 0 | **loop ×N** | **NavLinkPairs** (count NOT serialized) |  | one pair per link of the actor's NavLinkComponent; the count is NOT written (taken from the component) |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;LeftPoint |  | link left end, relative to the actor |
| elem+12 | elem+12 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;RightPoint |  | link right end, relative to the actor |
|  |  | → $3 | end | end of NavLinkPairs |  |  |
| $3 | $3 |  | **if** | **optional: NavLinkProxies** |  | present when both nav-link-proxy components (+0xA08/+0xA10) exist - always in shipped data |
| $3 | $3 | variable → $4 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkProxy](#sec-navlinkproxy) | optional: NavLinkProxies | UNavLinkCustomComponent-style proxy (FUN_014543D0) |
| $4 | $4 | variable → $5 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkProxy](#sec-navlinkproxy) | optional: NavLinkProxies | UNavLinkCustomComponent-style proxy (FUN_014543D0) |
|  |  | → $6 | end | end of conditional block |  | $6 = offset after the block (whether or not it was written) |
| $6 | $6 | 16 | quat (4×f32) | BoxRotation |  | transform of the conveyor's box component (+0xA50) - rotation |
| $6+16 | $6+16 | 12 | vec3 (3×f32) | BoxLocation |  | relative location |
| $6+28 | $6+28 | 12 | vec3 (3×f32) | BoxScale |  | relative scale |
| $6+40 | $6+40 | 12 | vec3 (3×f32) | BoxExtent |  | box extent |

<a id="sec-ucrackpotaicomponent"></a>
### UCrackPotAIComponent

**Actors:** `GCrackPlanterDouble_C`, `GCrackPlanter_C`, `GCrackPotLAnother_C`, `GCrackPotL_C`, `GCrackPotSAnother_C`, `GCrackPotS_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | CrackPotAIParameter.bSendBreakEvent |  | Send an event to nearby actors when broken. |
| $1+4 | $1+4 | 4 | bool32 | CrackPotAIParameter.bHiddenBRMesh |  | Hide the broken-remains mesh. |

<a id="sec-ucrushjellyaicomponent"></a>
### UCrushJellyAIComponent

**Actors:** `GCrushJelly_L_C`, `GCrushJelly_M_C`, `GCrushJelly_S_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | CrushJellyAIParameter.bFreezeStart |  | Starts frozen (needs Ice Pikmin). |
| $1+4 | $1+4 | 4 | i32 count → **loop** | **SearchCIDList** |  |  |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4+len → $2 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;SearchCID |  | CID of an actor held inside the jelly |
|  |  | → $3 | end | end of SearchCIDList |  |  |

<a id="sec-ucushionaicomponent"></a>
### UCushionAIComponent

**Actors:** `GCushionA_C`, `GCushionB_C`, `GCushionC_C`, `GCushionD_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 12 | vec3 (3×f32) | CushionAIParameter.ShakeBoundExtent |  | Shake detection box extent. |
| $1+12 | $1+12 | 12 | vec3 (3×f32) | CushionAIParameter.BoundOffset |  | Box offset. |

<a id="sec-udamagumobaseaicomponent"></a>
### UDamagumoBaseAIComponent

**Actors:** `GDiscoDamagumo_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4+len → $2 | FName (FString) | DamagumoBaseAIParameter.SearchTagName |  | Tag of the spline route it walks (per-instance). |
| $2 | $2 | 4 | bool32 | DamagumoBaseAIParameter.bStraddle |  | Straddles (walks over) obstacles/terrain; per-instance (Dandori mislabels this byte as bSplineWalkStart). |

<a id="sec-udamagumocannonaicomponent"></a>
### UDamagumoCannonAIComponent

**Actors:** `GDamagumoCannon_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UDamagumoBaseAIComponent](#sec-udamagumobaseaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 4 | bool32 | DamagumoCannonAIParameter.bAlreadyAppear |  | Starts already revealed (skip appear). Per-instance. |
| $1+4 | $1+4 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaGoToHome.Center |  | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |
| $1+16 | $1+16 | 4 | f32 | TekiAIParameter.SearchAreaGoToHome.HalfHeight |  | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |
| $1+20 | $1+20 | 4 | f32 | TekiAIParameter.SearchAreaGoToHome.Radius |  | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |
| $1+24 | $1+24 | 4 | f32 | TekiAIParameter.SearchAreaGoToHome.Angle |  | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |
| $1+28 | $1+28 | 4 | f32 | TekiAIParameter.SearchAreaGoToHome.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+32 | $1+32 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaCaution.Center |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $1+44 | $1+44 | 4 | f32 | TekiAIParameter.SearchAreaCaution.HalfHeight |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $1+48 | $1+48 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Radius |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $1+52 | $1+52 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Angle |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $1+56 | $1+56 | 4 | f32 | TekiAIParameter.SearchAreaCaution.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+60 | $1+60 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaRest.Center |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+72 | $1+72 | 4 | f32 | TekiAIParameter.SearchAreaRest.HalfHeight |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+76 | $1+76 | 4 | f32 | TekiAIParameter.SearchAreaRest.Radius |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+80 | $1+80 | 4 | f32 | TekiAIParameter.SearchAreaRest.Angle |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+84 | $1+84 | 4 | f32 | TekiAIParameter.SearchAreaRest.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |

<a id="sec-udecospawneraicomponent"></a>
### UDecoSpawnerAIComponent

**Actors:** *none placed in shipped maps*

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | i32 | DecoSpawnerAIParam.SpawnNum |  | Number spawned. |
| 4 | 4 | 1 | u8 EPikminColor | DecoSpawnerAIParam.PikminColor |  | Pikmin colour. |
| 5 | 5 | 1 | u8 EPikminDecoType | DecoSpawnerAIParam.PikminDecoType |  | Decor type. |
| 6 | 6 | 1 | u8 EPikminDecoSize | DecoSpawnerAIParam.PikminDecoSize |  | Decor size. |
| 7 | 7 | 4+len → $1 | FName (FString) | DecoSpawnerAIParam.DecoIdlingPresetId |  | Idle animation preset. |
| $1 | $1 | 4 | bool32 | DecoSpawnerAIParam.bEnableNearMessage |  | Show a message when the player is near. |
| $1+4 | $1+4 | 4 | f32 | DecoSpawnerAIParam.NearWithinDistance |  | Distance for that message. |
| $1+8 | $1+8 | 4 | bool32 | DecoSpawnerAIParam.bIgnoreBottomRayHit |  | Ignore the ground ray when placing. |

<a id="sec-udemejakoaicomponent"></a>
### UDemejakoAIComponent

**Actors:** `GDemejako_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | DemejakoAIParameter.BurrowSearchAreaLength |  | Distance searched for burrow holes. Per-instance. |
| $1+4 | $1+4 | 4 | bool32 | DemejakoAIParameter.bBurrowKill |  | Kills Pikmin when burrowing. |
| $1+8 | $1+8 | 4+len → $2 | FName (FString) | DemejakoAIParameter.BurrowSearchTagName |  | Tag of burrow holes it uses. Per-instance. |
| $2 | $2 | 4 | bool32 | DemejakoAIParameter.bEnableSoftEdge |  | Soft edge around it. |

<a id="sec-udemejakoburrowaicomponent"></a>
### UDemejakoBurrowAIComponent

**Actors:** `GBurrowDemejakoClose_C`, `GBurrowDemejako_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UBurrowAIComponent](#sec-uburrowaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 4 | i32 count → **loop** | **DemejakoBurrowParameter.AreaBound** |  | Angular sectors (RAngBound2 list) around the burrow in which the Demejako can emerge/attack. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;AngDeg |  | RAngBound2.AngDeg |
| elem+4 | elem+4 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;RotDeg |  | RAngBound2.RotDeg |
|  |  | → $2 | end | end of DemejakoBurrowParameter.AreaBound |  |  |

<a id="sec-udodoroaicomponent"></a>
### UDodoroAIComponent

**Actors:** *none placed in shipped maps*

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | DodoroAIParameter.bSpawnFromEgg |  | Spawned from a DodoroEgg. |
| $1+4 | $1+4 | 4+len → $2 | FName (FString) | DodoroAIParameter.SplineRoutePathTag |  | Tag of the main spline route. |
| $2 | $2 | 4+len → $3 | FName (FString) | DodoroAIParameter.SubSplineRoutePathTag |  | Tag of the secondary route. |
| $3 | $3 | 4 | i32 | DodoroAIParameter.RefObstacleGenID |  | Generator ID of an obstacle it references. |

<a id="sec-udodoroeggaicomponent"></a>
### UDodoroEggAIComponent

**Actors:** `GDodoroEgg_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4+len → $2 | FName (FString) | DodoroEggAIParameter.SplineRoutePathTag |  | Route tag passed to the hatchling. |
| $2 | $2 | 4 | f32 | DodoroEggAIParameter.SpawnTimer |  | Seconds before it hatches. |
| $2+4 | $2+4 | 4 | bool32 | DodoroEggAIParameter.bUseParentDropInfo |  | Hatchling uses the egg's drop table. |
| $2+8 | $2+8 | 4 | bool32 | DodoroEggAIParameter.bOnceDodoroAppearDemo |  | Play the appearance cutscene only once. |
| $2+12 | $2+12 | 4 | f32 | DodoroEggAIParameter.SpawnTimerAfterDemo |  | Hatch time after the cutscene has played. |
| $2+16 | $2+16 | 4+len → $3 | FName (FString) | DodoroEggAIParameter.SubSplineRoutePathTag |  | Secondary route tag. |
| $3 | $3 | 4 | i32 | DodoroEggAIParameter.RefObstacleGenID |  | Obstacle generator ID. |

<a id="sec-udownflooraicomponent"></a>
### UDownFloorAIComponent

**Actors:** `GDownWallSidecut_C`, `GDownWall_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | bDisableAirWall |  | Disable the associated air wall. |

<a id="sec-udweevilbaseaicomponent"></a>
### UDweevilBaseAIComponent

**Actors:** `GElecOtakara_C`, `GFireOtakara_C`, `GGasOtakara_C`, `GIceOtakara_C`, `GWaterOtakara_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | DweevilAIParameter.OtakaraParam.bInitShoulder |  | Starts carrying treasure on its back. |
| $1+4 | $1+4 | 4 | bool32 | DweevilAIParameter.OtakaraParam.bEnableWallClimb |  | Can climb walls. |
| $1+8 | $1+8 | 4 | bool32 | DweevilAIParameter.OtakaraParam.bUpdateTerritoryWhenShoulder |  | Move territory when it picks up treasure. |
| $1+12 | $1+12 | 12 | vec3 (3×f32) | DweevilAIParameter.OtakaraParam.OtakaraSearchArea.Center |  | Centre (world position for territories; offset for search areas). |
| $1+24 | $1+24 | 4 | f32 | DweevilAIParameter.OtakaraParam.OtakaraSearchArea.HalfHeight |  | Half-height of the cylinder. |
| $1+28 | $1+28 | 4 | f32 | DweevilAIParameter.OtakaraParam.OtakaraSearchArea.Radius |  | Radius of the cylinder. |
| $1+32 | $1+32 | 4 | bool32 | DweevilAIParameter.OtakaraParam.bUseNewTerritoryWhenShoulder |  | Use NewTerritoryPos after picking up. |
| $1+36 | $1+36 | 12 | vec3 (3×f32) | DweevilAIParameter.OtakaraParam.NewTerritoryPos |  | Territory centre after picking up. |
| $1+48 | $1+48 | 4 | bool32 | DweevilAIParameter.EscapeParam.bEnableWallCheck |  | Check walls while escaping. |

<a id="sec-ueggaicomponent"></a>
### UEggAIComponent

**Actors:** `GBigEgg_C`, `GEgg_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | EggAIParameter.bDropCaveComplete |  | Drops even after the cave is complete (per-instance). |

<a id="sec-uexcavationaicomponent"></a>
### UExcavationAIComponent

**Actors:** `GExcavationL_C`, `GExcavationM_C`, `GExcavationOnyonTutorial_C`, `GExcavationOnyon_C`, `GExcavationS_C`, `GExcavationUnderS_C`, `GExcavationUnder_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | ExcavationParam.BuryEndItemRate |  | Dig progress at which items are released. |
| $1+4 | $1+4 | 4 | f32 | ExcavationParam.WorkedHeight |  | Height of the mound. |

<a id="sec-ufencefallaicomponent"></a>
### UFenceFallAIComponent

**Actors:** `GFenceFallNoSideColNoSE_C`, `GFenceFall_C`, `GFenceNoSideCol_C`, `GFence_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | FenceFallAIParameter.SwitchID |  | Switch ID. |
| $2 | $2 | 4 | bool32 | FenceFallAIParameter.bEnableLockOtakara |  | Locks a treasure until it falls. |
| $2+4 | $2+4 | 12 | vec3 (3×f32) | FallComponentLocation |  | relative location of the fence's fall component (written in both save/load paths) |
| $2+16 | $2+16 |  | **if** | **optional: NavLinks** |  | only if the actor has a NavLinkComponent (+0xA00) (FUN_01464890) |
| $2+16 | $2+16 | variable → $3 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkFull](#sec-navlinkfull) | optional: NavLinks | full FNavigationLink array of the actor's NavLinkComponent (FenceFall FUN_01464C50 / Geyser FUN_01467030) |
|  |  | → $4 | end | end of conditional block |  | $4 = offset after the block (whether or not it was written) |

<a id="sec-ufirechappyaicomponent"></a>
### UFireChappyAIComponent

**Actors:** `GFireChappy_C`, `GNightFireChappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaRest.Center |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+12 | $1+12 | 4 | f32 | TekiAIParameter.SearchAreaRest.HalfHeight |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+16 | $1+16 | 4 | f32 | TekiAIParameter.SearchAreaRest.Radius |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+20 | $1+20 | 4 | f32 | TekiAIParameter.SearchAreaRest.Angle |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+24 | $1+24 | 4 | f32 | TekiAIParameter.SearchAreaRest.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |

<a id="sec-ufollowkochappybaseaicomponent"></a>
### UFollowKochappyBaseAIComponent

**Actors:** `GKumaKochappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4+len → $2 | FName (FString) | FollowKochappyBaseAIParameter.LeaderParam.SearchTagName |  | Route tag. |
| $2 | $2 | 4 | i32 | FollowKochappyBaseAIParameter.LeaderParam.MaxChildNum |  | Max followers (serialized in the Leader sub-struct). |
| $2+4 | $2+4 | 4 | bool32 | bLeader |  | This individual is the group leader others follow (per-instance). |

<a id="sec-ufrogaicomponent"></a>
### UFrogAIComponent

**Actors:** `GBigFrog_C`, `GFrog_C`, `GIceFrog_C`, `GMaroFrog_C`, `GNightFrog_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaRest.Center |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+12 | $1+12 | 4 | f32 | TekiAIParameter.SearchAreaRest.HalfHeight |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+16 | $1+16 | 4 | f32 | TekiAIParameter.SearchAreaRest.Radius |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+20 | $1+20 | 4 | f32 | TekiAIParameter.SearchAreaRest.Angle |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+24 | $1+24 | 4 | f32 | TekiAIParameter.SearchAreaRest.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+28 | $1+28 | 12 | vec3 (3×f32) | TekiAIParameter.EatArea.Center |  | Cone/cylinder in front of the mouth that defines where Pikmin can be eaten (bite hit area). Per-instance for Frog/Hari. |
| $1+40 | $1+40 | 4 | f32 | TekiAIParameter.EatArea.HalfHeight |  | Cone/cylinder in front of the mouth that defines where Pikmin can be eaten (bite hit area). Per-instance for Frog/Hari. |
| $1+44 | $1+44 | 4 | f32 | TekiAIParameter.EatArea.Radius |  | Cone/cylinder in front of the mouth that defines where Pikmin can be eaten (bite hit area). Per-instance for Frog/Hari. |
| $1+48 | $1+48 | 4 | f32 | TekiAIParameter.EatArea.Angle |  | Opening angle (degrees) of the slice in front of the actor. |
| $1+52 | $1+52 | 4 | bool32 | FrogAIParameter.bNoSearchOuterTerritory |  | Ignore targets outside territory. |

<a id="sec-ufutakuchiaicomponent"></a>
### UFutakuchiAIComponent

**Actors:** `GFutakuchi_C`, `GYukiFutakuchi_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 1 | u8 ERockMode | FutakuchiAIParameter.RockMode |  | ERockMode – how its rocks behave (e.g. Spline = roll along a spline route). |
| $1+1 | $1+1 | 4+len → $2 | FName (FString) | FutakuchiAIParameter.SearchTagName |  | Tag of the spline/rock route (e.g. FutakuchiRock01). |
| $2 | $2 | 12 | vec3 (3×f32) | FutakuchiAIParameter.SplineSearchArea.Center |  | Search area for spline rock mode. |
| $2+12 | $2+12 | 4 | f32 | FutakuchiAIParameter.SplineSearchArea.HalfHeight |  | Search area for spline rock mode. |
| $2+16 | $2+16 | 4 | f32 | FutakuchiAIParameter.SplineSearchArea.Radius |  | Search area for spline rock mode. |
| $2+20 | $2+20 | 4 | f32 | FutakuchiAIParameter.SplineSearchArea.Angle |  | Search area for spline rock mode. |
| $2+24 | $2+24 | 4 | f32 | FutakuchiAIParameter.SplineSearchArea.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $2+28 | $2+28 | 12 | vec3 (3×f32) | FutakuchiAIParameter.SearchAreaAttack.Center |  | Attack area. |
| $2+40 | $2+40 | 4 | f32 | FutakuchiAIParameter.SearchAreaAttack.HalfHeight |  | Attack area. |
| $2+44 | $2+44 | 4 | f32 | FutakuchiAIParameter.SearchAreaAttack.Radius |  | Attack area. |
| $2+48 | $2+48 | 4 | f32 | FutakuchiAIParameter.SearchAreaAttack.Angle |  | Opening angle (degrees) of the slice in front of the actor. |
| $2+52 | $2+52 | 4 | bool32 | FutakuchiAIParameter.bFixCautionAreaCenter |  | Keep the caution area centred on the spawn point. |
| $2+56 | $2+56 | 4 | bool32 | FutakuchiAIParameter.bDissapearVisibleOff |  | Become invisible while disappeared. |
| $2+60 | $2+60 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaCaution.Center |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $2+72 | $2+72 | 4 | f32 | TekiAIParameter.SearchAreaCaution.HalfHeight |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $2+76 | $2+76 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Radius |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $2+80 | $2+80 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Angle |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $2+84 | $2+84 | 4 | f32 | TekiAIParameter.SearchAreaCaution.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |

<a id="sec-ufutakuchiadultaicomponent"></a>
### UFutakuchiAdultAIComponent

**Actors:** `GFutakuchiAdult_C`, `GYukiFutakuchiAdult_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 12 | vec3 (3×f32) | FutakuchiAdultAIParameter.AttackArea.Center |  | Attack area. |
| $1+12 | $1+12 | 4 | f32 | FutakuchiAdultAIParameter.AttackArea.HalfHeight |  | Attack area. |
| $1+16 | $1+16 | 4 | f32 | FutakuchiAdultAIParameter.AttackArea.Radius |  | Attack area. |
| $1+20 | $1+20 | 4 | f32 | FutakuchiAdultAIParameter.AttackArea.Angle |  | Attack area. |
| $1+24 | $1+24 | 4 | f32 | FutakuchiAdultAIParameter.AttackArea.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+28 | $1+28 | 4 | bool32 | FutakuchiAdultAIParameter.bSplineType |  | Uses spline mode. |
| $1+32 | $1+32 | 4 | f32 | FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackLoopWaitSecMin |  | Min wait between attack loops. |
| $1+36 | $1+36 | 4 | f32 | FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackLoopWaitSecMax |  | Max wait between attack loops. |
| $1+40 | $1+40 | 4 | f32 | FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackSignSecMin |  | Min warning time. |
| $1+44 | $1+44 | 4 | f32 | FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackSignSecMax |  | Max warning time. |
| $1+48 | $1+48 | 4 | f32 | FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackInterval |  | Interval between attacks. |
| $1+52 | $1+52 | 4 | f32 | FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackIntervalSuccess |  | Interval after a successful attack. |
| $1+56 | $1+56 | 4+len → $2 | FName (FString) | FutakuchiAdultAIParameter.SplineParam.SearchTagName |  | Spline tag. |
| $2 | $2 | 4 | f32 | FutakuchiAdultAIParameter.AttackParam.AttackLoopWaitSecMin |  | Min wait between attack loops. |
| $2+4 | $2+4 | 4 | f32 | FutakuchiAdultAIParameter.AttackParam.AttackLoopWaitSecMax |  | Max wait between attack loops. |
| $2+8 | $2+8 | 4 | f32 | FutakuchiAdultAIParameter.AttackParam.AttackSignSecMin |  | Min warning time. |
| $2+12 | $2+12 | 4 | f32 | FutakuchiAdultAIParameter.AttackParam.AttackSignSecMax |  | Max warning time. |
| $2+16 | $2+16 | 4 | f32 | FutakuchiAdultAIParameter.AttackParam.AttackInterval |  | Interval between attacks. |
| $2+20 | $2+20 | 4 | f32 | FutakuchiAdultAIParameter.AttackParam.AttackIntervalSuccess |  | Interval after a successful attack. |
| $2+24 | $2+24 | 4 | bool32 | FutakuchiAdultAIParameter.bCreateIcicle |  | Inhale attack knocks icicles down. |
| $2+28 | $2+28 | 4 | f32 | FutakuchiAdultAIParameter.EscapeSecMin |  | Min escape time. |
| $2+32 | $2+32 | 4 | f32 | FutakuchiAdultAIParameter.EscapeSecMax |  | Max escape time. |
| $2+36 | $2+36 |  | **if** | **optional: VacuumHalfHeightFlag** |  | written only when the caller passes flag param_4 (FUN_01098F40) |
| $2+36 | $2+36 | 4 | f32 | &nbsp;&nbsp;&nbsp;&nbsp;FutakuchiAdultAIParameter.VacuumHalfHeight | optional: VacuumHalfHeightFlag | Inhale half height. |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |
| $3 | $3 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaCaution.Center |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $3+12 | $3+12 | 4 | f32 | TekiAIParameter.SearchAreaCaution.HalfHeight |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $3+16 | $3+16 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Radius |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $3+20 | $3+20 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Angle |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $3+24 | $3+24 | 4 | f32 | TekiAIParameter.SearchAreaCaution.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $3+28 | $3+28 | 4 | f32 | TekiAIParameter.AIWanderParameter.RatioWaitToWander |  | Probability of switching from waiting to wandering at each check. |

<a id="sec-ugaskoganeaicomponent"></a>
### UGasKoganeAIComponent

**Actors:** `GGasKogane_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UKoganeBaseAIComponent](#sec-ukoganebaseaicomponent) |  | the parent class serializer runs first |

<a id="sec-ugateaicomponent"></a>
### UGateAIComponent

gates; RareDropParameter follows the object base.

**Actors:** `GGateRock175uu_C`, `GGateRock200uu_C`, `GGateRock275uu_C`, `GGateRock300uu_C`, `GGateRock325uu_C`, `GVarGateBomb_C`, `GVarGateDenkiNoPillar_C`, `GVarGateDenki_C`, `GVarGateIceNoPillar_C`, `GVarGateIce_C`, `GVarGateSoftHalf_C`, `GVarGateSoftNoPillar_C`, `GVarGateSoft_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | i32 count → **loop** | **RareDropParameter** |  | Extra rare drop slots (Dandori "rareDrops"). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | variable → $2 | section | &nbsp;&nbsp;&nbsp;&nbsp;[DropItem](#sec-dropitem) |  | DropItemParameter element (FUN_01182F50) |
|  |  | → $3 | end | end of RareDropParameter |  |  |

<a id="sec-ugeyseraicomponent"></a>
### UGeyserAIComponent

**Actors:** `GGeyser_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | GeyserAIParameter.bSetCrystal |  | Blocked by a crystal until broken. |
| $1+4 | $1+4 | 4 | f32 | GeyserAIParameter.StopQueenDistXY |  | Radius within which it stops a Queen (Empress) nearby. |
| $1+8 | $1+8 |  | **if** | **optional: NavLinks** |  | only if the actor has a NavLinkComponent (+0xA40) (FUN_01466D10) |
| $1+8 | $1+8 | variable → $2 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkFull](#sec-navlinkfull) | optional: NavLinks | full FNavigationLink array of the actor's NavLinkComponent (FenceFall FUN_01464C50 / Geyser FUN_01467030) |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |

<a id="sec-ugroupdropmanagercomponent"></a>
### UGroupDropManagerComponent

**Actors:** `GGroupDropManager_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | f32 | GroupDropManagerAIParameter.GroupingRadius |  | Radius in which enemies are grouped. |
| 4 | 4 | 4 | i32 count → **loop** | **GroupDropManagerAIParameter.IgnoreCIDList** |  | CIDs excluded from the group. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4+len → $1 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;IgnoreCID |  | CID excluded from the group |
|  |  | → $2 | end | end of GroupDropManagerAIParameter.IgnoreCIDList |  |  |
| $2 | $2 | variable → $3 | section | [Drop](#sec-drop) |  | DropParameter (FUN_01182880 + FUN_01182C60); the version-gated bEnableFreezeBothDrop (+0x6d) follows in the owner |
|  |  |  | **if** | **only in 8626647418 / 8626647626** |  | present only for these shipped GeneratorVersions |
| — | $3 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;GroupDropManagerAIParameter.DropParameter.bEnableFreezeBothDrop | only in 8626647418 / 8626647626 | Frozen kills produce both the normal drop and the frozen drop (version-gated per-instance bool). |
| $3 | $3+4 | 1 | u8 EDropTiming | GroupDropManagerAIParameter.DropTiming |  | EDropTiming – when the reward drops. |
| $3+1 | $3+5 | variable → $4 | section | [Sniff](#sec-sniff) |  | SniffPointParameter (CarrotAIComponent+0x688, FUN_00E45140) - last block of almost every layout |

<a id="sec-uhagedamagumoaicomponent"></a>
### UHageDamagumoAIComponent

**Actors:** `GHageDamagumo_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UDamagumoBaseAIComponent](#sec-udamagumobaseaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaRest.Center |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+12 | $1+12 | 4 | f32 | TekiAIParameter.SearchAreaRest.HalfHeight |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+16 | $1+16 | 4 | f32 | TekiAIParameter.SearchAreaRest.Radius |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+20 | $1+20 | 4 | f32 | TekiAIParameter.SearchAreaRest.Angle |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+24 | $1+24 | 4 | f32 | TekiAIParameter.SearchAreaRest.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+28 | $1+28 | 4 | bool32 | HageDamagumoAIParameter.bSplineWalkStart |  | Starts walking its spline route immediately. |
| $1+32 | $1+32 | 4 | bool32 | HageDamagumoAIParameter.bUseUniqueLife |  | Override max HP with UniqueLife. |
| $1+36 | $1+36 | 4 | f32 | HageDamagumoAIParameter.UniqueLife |  | Custom max HP. |
| $1+40 | $1+40 | 4 | bool32 | HageDamagumoAIParameter.bAlreadyAppear |  | Starts revealed. |
| $1+44 | $1+44 | 4 | f32 | DamagumoBaseAIParameter.FightCameraParameter.CameraChangeDistanceXY |  | Distance to the boss at which the fight camera engages (per-instance for Long Legs). |

<a id="sec-uhanachirashiaicomponent"></a>
### UHanachirashiAIComponent

**Actors:** `GHanachirashi_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | HanachirashiAIParameter.bWayCheckToTarget |  | Check the path to the target is clear (per-instance). |
| $1+4 | $1+4 | 4 | f32 | HanachirashiAIParameter.WayCheckStartHeightOffset |  | Height offset of that check (per-instance). |

<a id="sec-uhandleboardaicomponent"></a>
### UHandleBoardAIComponent

**Actors:** `GHandleBoardYellow_C`, `GHandleBoard_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | i32 | HandleBoardAIParameter.WorkNum |  | Pikmin needed. |
| $1+4 | $1+4 |  | **if** | **optional: NavLink** |  |  |
| $1+4 | $1+4 | variable → $2 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkPoints](#sec-navlinkpoints) | optional: NavLink | NavLinkComponent point pairs (FUN_0183AD30 / FUN_018088B0); only when the actor has a NavLinkComponent |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |

<a id="sec-uhappydooraicomponent"></a>
### UHappyDoorAIComponent

**Actors:** `GHappyDoor_C`, `GTunnel_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | HappyDoorAIParameter.HappyDoorID |  | Pairs two dog doors together. |

<a id="sec-uhariaicomponent"></a>
### UHariAIComponent

**Actors:** `GHari_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | HariAIParameter.CautionParam.bEnableNotice |  | Turn to notice targets. |
| $1+4 | $1+4 | 4 | f32 | HariAIParameter.RegenerateNeedleFlickRadius |  | Flick radius when needles regrow. |
| $1+8 | $1+8 | 4 | bool32 | HariAIParameter.bNoRegenerateNeedle |  | Needles never regrow. |
| $1+12 | $1+12 | 4 | bool32 | HariAIParameter.bFixedArtillery |  | Stationary turret variant. |
| $1+16 | $1+16 | 4 | f32 | HariAIParameter.EscapeLength |  | Escape distance. |
| $1+20 | $1+20 | 12 | vec3 (3×f32) | HariAIParameter.EscapeArea.Center |  | Threat area that triggers escape. |
| $1+32 | $1+32 | 4 | f32 | HariAIParameter.EscapeArea.HalfHeight |  | Threat area that triggers escape. |
| $1+36 | $1+36 | 4 | f32 | HariAIParameter.EscapeArea.Radius |  | Threat area that triggers escape. |
| $1+40 | $1+40 | 4 | f32 | HariAIParameter.EscapeArea.Angle |  | Opening angle (degrees) of the slice in front of the actor. |
| $1+44 | $1+44 | 12 | vec3 (3×f32) | HariAIParameter.EscapeAreaNoNeedle.Center |  | Threat area while needle-less. |
| $1+56 | $1+56 | 4 | f32 | HariAIParameter.EscapeAreaNoNeedle.HalfHeight |  | Threat area while needle-less. |
| $1+60 | $1+60 | 4 | f32 | HariAIParameter.EscapeAreaNoNeedle.Radius |  | Threat area while needle-less. |
| $1+64 | $1+64 | 4 | f32 | HariAIParameter.EscapeAreaNoNeedle.Angle |  | Opening angle (degrees) of the slice in front of the actor. |
| $1+68 | $1+68 | 4 | f32 | HariAIParameter.BulletParameter.PredictionCoef |  | Target lead coefficient (per-instance). |
| $1+72 | $1+72 | 4 | f32 | HariAIParameter.FixedArtilleryVitality |  | HP of the turret variant. |
| $1+76 | $1+76 | 4 | f32 | HariAIParameter.FixedArtilleryWaitTime |  | Turret wait time. |
| $1+80 | $1+80 | 4 | f32 | HariAIParameter.FixedArtilleryShotWaitTime |  | Turret shot interval. |
| $1+84 | $1+84 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaRest.Center |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+96 | $1+96 | 4 | f32 | TekiAIParameter.SearchAreaRest.HalfHeight |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+100 | $1+100 | 4 | f32 | TekiAIParameter.SearchAreaRest.Radius |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+104 | $1+104 | 4 | f32 | TekiAIParameter.SearchAreaRest.Angle |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+108 | $1+108 | 4 | f32 | TekiAIParameter.SearchAreaRest.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+112 | $1+112 | 12 | vec3 (3×f32) | TekiAIParameter.EatArea.Center |  | Cone/cylinder in front of the mouth that defines where Pikmin can be eaten (bite hit area). Per-instance for Frog/Hari. |
| $1+124 | $1+124 | 4 | f32 | TekiAIParameter.EatArea.HalfHeight |  | Cone/cylinder in front of the mouth that defines where Pikmin can be eaten (bite hit area). Per-instance for Frog/Hari. |
| $1+128 | $1+128 | 4 | f32 | TekiAIParameter.EatArea.Radius |  | Cone/cylinder in front of the mouth that defines where Pikmin can be eaten (bite hit area). Per-instance for Frog/Hari. |
| $1+132 | $1+132 | 4 | f32 | TekiAIParameter.EatArea.Angle |  | Opening angle (degrees) of the slice in front of the actor. |

<a id="sec-uhariuoaicomponent"></a>
### UHariuoAIComponent

**Actors:** `GHariuo_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | HariuoAIParameter.bDisableSwimMode |  | Never swims (land only); per-instance. |

<a id="sec-uhibabaseaicomponent"></a>
### UHibaBaseAIComponent

**Actors:** `GHibaBubble_C`, `GHibaDenki_C`, `GHibaIce_C`, `GHibaPoison_C`, `GHibaWater_C`, `GHiba_C`, `GKonro_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | HibaAIParameter.WaitAddTime |  | Extra wait added. |

<a id="sec-uhikarikinokoaicomponent"></a>
### UHikariKinokoAIComponent

**Actors:** `GHikarikinoko_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |

<a id="sec-uicicleaicomponent"></a>
### UIcicleAIComponent

**Actors:** `GIcicleClose_C`, `GIcicleUp_C`, `GIcicle_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | IcicleAIParameter.FallHeight |  | Fall height. |
| $1+4 | $1+4 | 4 | bool32 | IcicleAIParameter.bFallSearchInTerritory |  | Falls when a target enters its territory. |
| $1+8 | $1+8 | 4 | bool32 | IcicleAIParameter.bWaitStart |  | Hangs until triggered. |

<a id="sec-uiwakkoaicomponent"></a>
### UIwakkoAIComponent

**Actors:** `GIwakko_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | IwakkoAIParameter.bBareStart |  | Starts without its shell. |

<a id="sec-ukanitamaaicomponent"></a>
### UKanitamaAIComponent

**Actors:** `GKanitama_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | KanitamaAIParameter.bAmbush |  | Starts buried in ambush. |

<a id="sec-ukingchappybaseaicomponent"></a>
### UKingChappyBaseAIComponent

**Actors:** `GKingChappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | KingChappyBaseAIParameter.WarCryParameter.ChooseRatio |  | serialized by FUN_01181A80 (param+0xc of the preceding sub-struct) |
| $1+4 | $1+4 | 4 | f32 | KingChappyBaseAIParameter.AttackParameter.TangueColiisionScopeRatio |  | Fraction of the tongue that collides. |
| $1+8 | $1+8 | 4 | bool32 | KingChappyBaseAIParameter.AttackParameter.bTangueCollisionOnlyWall |  | Tongue only collides with walls. |
| $1+12 | $1+12 | 4 | bool32 | KingChappyBaseAIParameter.WarCryParameter.bTriggerByAppear |  | Cries when it appears. |
| $1+16 | $1+16 | 4 | bool32 | KingChappyBaseAIParameter.PressParameter.bSinkFloor |  | Sinks the floor. |
| $1+20 | $1+20 | 4 | bool32 | KingChappyBaseAIParameter.AppearParameter.bSinkFloor |  | Emerging sinks the floor (per-instance). |

<a id="sec-ukochappyaicomponent"></a>
### UKochappyAIComponent

**Actors:** `GIceKochappy_C`, `GKinoKochappy_C`, `GKochappy_C`, `GTenKochappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | KochappyAIParameter.bCloseSetting |  | Confines the Dwarf Bulborb: on init (KochappyAIComponent vfunc_138) it clears bSearchOuterTerritory on SearchAreaGoToHome, SearchAreaCaution, SearchAreaRest and SearchAreaOtakaraCarry, so it only reacts to targets inside its territory. Per-instance. |

<a id="sec-ukoganebaseaicomponent"></a>
### UKoganeBaseAIComponent

**Actors:** `GKogane_C`, `GOoKogane_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | i32 | KoganeBaseAIParameter.DropParameter.CanDieDropIndex |  | Index in ParameterList after which the beetle can die. |
| $1+4 | $1+4 | 4 | i32 count → **loop** | **KoganeBaseAIParameter.DropParameter.ParameterList** |  | Drop tables used in sequence for each hit. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | variable → $2 | section | &nbsp;&nbsp;&nbsp;&nbsp;[Drop](#sec-drop) |  | DropParameter (FUN_01182880 + FUN_01182C60); the version-gated bEnableFreezeBothDrop (+0x6d) follows in the owner |
|  |  |  | **if** | &nbsp;&nbsp;&nbsp;&nbsp;**only in 8626647418 / 8626647626** |  | present only for these shipped GeneratorVersions |
| — | $2 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bEnableFreezeBothDrop | only in 8626647418 / 8626647626 | Frozen kills produce both the normal drop and the frozen drop (version-gated per-instance bool). |
|  |  | → $3 | end | end of KoganeBaseAIParameter.DropParameter.ParameterList |  |  |
| $3 | $3 | 4 | bool32 | KoganeBaseAIParameter.bAppearRotatorFixed |  | Always appears facing the same direction. |
| $3+4 | $3+4 | 4 | f32 | KoganeBaseAIParameter.TurnAngleMin |  | Min turn. |
| $3+8 | $3+8 | 4 | f32 | KoganeBaseAIParameter.TurnAngleMax |  | Max turn. |
| $3+12 | $3+12 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaCaution.Center |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $3+24 | $3+24 | 4 | f32 | TekiAIParameter.SearchAreaCaution.HalfHeight |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $3+28 | $3+28 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Radius |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $3+32 | $3+32 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Angle |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $3+36 | $3+36 | 4 | f32 | TekiAIParameter.SearchAreaCaution.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |

<a id="sec-ukoganiaicomponent"></a>
### UKoganiAIComponent

**Actors:** `GKogani_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | KoganiAIParameter.bEnableHidden |  | Starts hidden. |

<a id="sec-ukomushaicomponent"></a>
### UKomushAIComponent

**Actors:** `GKomushL_C`, `GKomushS_C`, `GKomush_C`, `GMushL_C`, `GMushS_C`, `GMush_C`, `GPoisonKomushL_C`, `GPoisonKomushS_C`, `GPoisonMushS_C`, `GPoisonMush_C`, `GStickyMushB_C`, `GStickyMushC_C`, `GStickyMushPoison_C`, `GStickyMush_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | KomushAIParameter.bSetRandomRotate |  | Random initial rotation. |

<a id="sec-ukumachappyaicomponent"></a>
### UKumaChappyAIComponent

**Actors:** `GKumaChappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4+len → $2 | FName (FString) | KumaChappyAIParameter.SearchTagName |  | Spline route tag (e.g. SplineKumaChappy_A). |
| $2 | $2 | 4 | f32 | KumaChappyAIParameter.GiveupDistance |  | Distance at which it stops chasing and returns to its route. |

<a id="sec-ukurageaicomponent"></a>
### UKurageAIComponent

**Actors:** `GKurage_C`, `GOoKurage_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | KurageAIParameter.EatOnBirthRange |  | Radius it inhales on spawning (per-instance). |
| $1+4 | $1+4 | 4 | bool32 | KurageAIParameter.bFallStart |  | Spawns by falling from above (per-instance). |
| $1+8 | $1+8 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaRest.Center |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+20 | $1+20 | 4 | f32 | TekiAIParameter.SearchAreaRest.HalfHeight |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+24 | $1+24 | 4 | f32 | TekiAIParameter.SearchAreaRest.Radius |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+28 | $1+28 | 4 | f32 | TekiAIParameter.SearchAreaRest.Angle |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+32 | $1+32 | 4 | f32 | TekiAIParameter.SearchAreaRest.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+36 | $1+36 |  | **if** | **optional: CarcassWaterContext** |  | written only if the owner actor has the component at GActor+0x1790 (FUN_0117CA70) |
| $1+36 | $1+36 | 4 | bool32 | &nbsp;&nbsp;&nbsp;&nbsp;OwnerSubComponentFlag | optional: CarcassWaterContext | bool at +0x238 of the actor's sub-component at GActor+0x1790 |
|  |  | → $2 | end | end of conditional block |  | $2 = offset after the block (whether or not it was written) |

<a id="sec-ukurioneaicomponent"></a>
### UKurioneAIComponent

**Actors:** `GKurione_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | KurioneAIParameter.bGoFaceDir |  | Moves in its facing direction. |
| $1+4 | $1+4 | 4 | bool32 | KurioneAIParameter.bFixedHeight |  | Stays at a fixed height. |
| $1+8 | $1+8 | 4 | bool32 | KurioneAIParameter.bDropHotExtractOnly |  | Drops only nectar. |

<a id="sec-ulookcameraaicomponent"></a>
### ULookCameraAIComponent

**Actors:** *none placed in shipped maps*

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 1 | u8 ELookCameraTriggerType | LookCameraTriggerType |  |  |
| 1 | 1 |  | **if** | **optional: CameraLocation** |  |  |
| 1 | 1 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Location | optional: CameraLocation |  |
|  |  | → $1 | end | end of conditional block |  | $1 = offset after the block (whether or not it was written) |

<a id="sec-umaraicomponent"></a>
### UMarAIComponent

**Actors:** `GIceMar_C`, `GMar_C`, `GNightMar_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | TekiAIParameter.AIWanderParameter.MinDistRate |  | Minimum wander distance as a fraction of territory radius. |
| $1+4 | $1+4 | 4 | f32 | TekiAIParameter.AIWanderParameter.MaxDistRate |  | Maximum wander distance as a fraction of territory radius. |
| $1+8 | $1+8 | 4 | bool32 | MarAIParameter.bAppearFallStart |  | Appears by dropping from above. |
| $1+12 | $1+12 | 4 | bool32 | MarAIParameter.bWayCheckToTarget |  | Check path to target. |
| $1+16 | $1+16 | 4 | f32 | MarAIParameter.WayCheckStartHeightOffset |  | Path check height. |
| $1+20 | $1+20 | 4 | bool32 | MarAIParameter.bClose |  | Close-range variant. |
| $1+24 | $1+24 | 12 | vec3 (3×f32) | MarAIParameter.AppearFallSearchArea.Center |  | Centre (world position for territories; offset for search areas). |
| $1+36 | $1+36 | 4 | f32 | MarAIParameter.AppearFallSearchArea.HalfHeight |  | Half-height of the cylinder. |
| $1+40 | $1+40 | 4 | f32 | MarAIParameter.AppearFallSearchArea.Radius |  | Radius of the cylinder. |
| $1+44 | $1+44 | 4 | i32 | OwnerCarryValue |  | int copied from GActor->(+0x2E8)->(+0x4A4) (FUN_011B0370) |

<a id="sec-uminimochiaicomponent"></a>
### UMiniMochiAIComponent

Mini Mochi does NOT chain to the enemy base - only its territory cylinder is saved.

**Actors:** `GMiniMochi_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 12 | vec3 (3×f32) | TekiAIParameter.Territory.Center |  | Centre (world position for territories; offset for search areas). |
| 12 | 12 | 4 | f32 | TekiAIParameter.Territory.HalfHeight |  | Half-height of the cylinder. |
| 16 | 16 | 4 | f32 | TekiAIParameter.Territory.Radius |  | Radius of the cylinder. |

<a id="sec-umiulinaicomponent"></a>
### UMiulinAIComponent

**Actors:** `GMiulin_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | MiulinAIParameter.SitWaitParam.bEnable |  | Sits and waits. |

<a id="sec-umizunukiaicomponent"></a>
### UMizunukiAIComponent

**Actors:** `GMizunukiAnother_C`, `GMizunukiIndoorAnother_C`, `GMizunukiIndoor_C`, `GMizunuki_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | WaterBoxID |  | ID of the water box drained by this plug. |

<a id="sec-umoveassistaicomponent"></a>
### UMoveAssistAIComponent

**Actors:** *none placed in shipped maps*

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 1 | u8 EMoveAssistType | MoveAssistType |  |  |
| 1 | 1 | 4 | f32 | AssistAngle |  |  |
| 5 | 5 | 4 | f32 | StickOverrideTime |  |  |
| 9 | 9 | 4 | bool32 | bAssistReverse |  |  |
| 13 | 13 |  | **if** | **optional: ArrowRotation** |  |  |
| 13 | 13 | 12 | rotator (3×f32 P,Y,R) | &nbsp;&nbsp;&nbsp;&nbsp;ArrowRotation | optional: ArrowRotation |  |
|  |  | → $1 | end | end of conditional block |  | $1 = offset after the block (whether or not it was written) |

<a id="sec-umoveflooraicomponent"></a>
### UMoveFloorAIComponent

**Actors:** `GMoveFloorHappy_C`, `GMoveFloorHover_C`, `GMoveFloorRound_C`, `GMoveFloor_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | MoveFloorAIParameter.WaitTime |  | Wait at each end. |
| $1+4 | $1+4 | 4 | f32 | MoveFloorAIParameter.MoveSpeed |  | Speed. |
| $1+8 | $1+8 | 4 | bool32 | MoveFloorAIParameter.bEnableWarpActor |  | Carries a warp point. |
| $1+12 | $1+12 | 12 | vec3 (3×f32) | MoveFloorAIParameter.WarpOffset |  | Warp point offset. |
| $1+24 | $1+24 | variable → $2 | section | [SplinePoints](#sec-splinepoints) |  | USplineComponent points (FUN_00DA2A10 / FUN_00DA2F20) - only when the owner actor has a USplineComponent |
| $2 | $2 | 12 | rotator (3×f32 P,Y,R) | FloorRotation |  | rotator re-applied to the moving floor component on load (FUN_052FA880) |
| $2+12 | $2+12 |  | **if** | **optional: NavLink** |  |  |
| $2+12 | $2+12 | variable → $3 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkPoints](#sec-navlinkpoints) | optional: NavLink | NavLinkComponent point pairs (FUN_0183AD30 / FUN_018088B0); only when the actor has a NavLinkComponent |
|  |  | → $4 | end | end of conditional block |  | $4 = offset after the block (whether or not it was written) |

<a id="sec-unightkochappyaicomponent"></a>
### UNightKochappyAIComponent

**Actors:** `GNightKochappy_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UFollowKochappyBaseAIComponent](#sec-ufollowkochappybaseaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaCaution.Center |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $1+12 | $1+12 | 4 | f32 | TekiAIParameter.SearchAreaCaution.HalfHeight |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $1+16 | $1+16 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Radius |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $1+20 | $1+20 | 4 | f32 | TekiAIParameter.SearchAreaCaution.Angle |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |
| $1+24 | $1+24 | 4 | f32 | TekiAIParameter.SearchAreaCaution.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |

<a id="sec-unoraspawneraicomponent"></a>
### UNoraSpawnerAIComponent

**Actors:** `GNoraSpawnerHeadLock_C`, `GNoraSpawnerPikminLock_C`, `GNoraSpawnerPongashiLock_C`, `GNoraSpawnerPrologue_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | i32 | NoraSpawnerAIParam.SpawnNum |  | Number spawned. |
| 4 | 4 | 4 | f32 | NoraSpawnerAIParam.SpawnRadius |  | Spawn radius. |
| 8 | 8 | 4 | f32 | NoraSpawnerAIParam.NoSpawnRadius |  | Captains inside this radius block spawning. |
| 12 | 12 | 1 | u8 EPikminColor | NoraSpawnerAIParam.PikminColor |  | Pikmin colour spawned. |
| 13 | 13 | 4 | bool32 | NoraSpawnerAIParam.bMabikiEnable |  | Enable "mabiki" (thinning): the spawn is skipped/replaced when you already own enough Pikmin of the spawner's colour (decision in FUN_014FFF30; Dandori's "No idea bool"). |
| 17 | 17 | 1 | u8 EPikminLeaves | NoraSpawnerAIParam.SpawnHeadLeaves |  | Leaf/bud/flower state of sprouts (Dandori's "dunno int" byte). |
| 18 | 18 | 4 | i32 | NoraSpawnerAIParam.MabikiNumFromFollow |  | Threshold count of Pikmin of the spawner's colour at which it thins out (-1 disables). In 2-player co-op the threshold is floor(value*0.6) (FUN_014FFF30). |
| 22 | 22 | 4 | i32 | NoraSpawnerAIParam.MabikiNumFromAll |  | Second thinning threshold over all owned Pikmin (-1 = off), checked in FUN_014FFF30 (Dandori's "unknownInt"). |
| 26 | 26 | 4 | bool32 | NoraSpawnerAIParam.bMabikiPongashi |  | When thinned out, a Candypop Bud is placed (at MabikiPongashiOffset) instead of the Pikmin (read in FUN_014FFF30). |
| 30 | 30 | 4 | i32 | NoraSpawnerAIParam.PongashiChangeColorFollowNum |  | Follower count at which the Candypop colour changes. |
| 34 | 34 | 1 | u8 EPikminColor | NoraSpawnerAIParam.PongashiChangeColorFromFollow |  | Colour whose follower count is checked. |
| 35 | 35 | 4 | bool32 | NoraSpawnerAIParam.bReservedBirth |  | Reserve the birth until the player approaches. |
| 39 | 39 | 4 | bool32 | NoraSpawnerAIParam.bDisableForcePongashi |  | Never force a Candypop replacement. |
| 43 | 43 | 4 | bool32 | NoraSpawnerAIParam.bProWrestling |  | Spawned Pikmin start grappling ("pro-wrestling") a nearby enemy found within ProWrestlingTekiSearchRange (vfunc_139 / FUN_01506030). |
| 47 | 47 | 1 | u8 EPikminColor | NoraSpawnerAIParam.PongashiColor |  | Candypop colour. |
| 48 | 48 | 4+len → $1 | FName (FString) | NoraSpawnerAIParam.NoraIdlingPresetId |  | Idle pose preset (NoraHide, NoraSleep, NoraLookdown...). |
| $1 | $1 | 4 | bool32 | NoraSpawnerAIParam.bEnablePointLight |  | Spawned Pikmin emit a point light (Dandori read this byte as bDisableForcePongashi). |
| $1+4 | $1+4 | 1 | u8 EPikminIdlePlayType | NoraSpawnerAIParam.GroupIdlingType |  | EPikminIdlePlayType group idle (Guidance, Gather...). |
| $1+5 | $1+5 | 4 | bool32 | NoraSpawnerAIParam.bExcludesFue |  | Copied onto each spawned Pikmin (+0x686) so they ignore the whistle until touched (FUN_01506030). |
| $1+9 | $1+9 | 12 | vec3 (3×f32) | NoraSpawnerAIParam.MabikiPongashiOffset |  | Offset of that Candypop Bud. |
| $1+21 | $1+21 | 4 | f32 | NoraSpawnerAIParam.AIWaitTime |  | Wait time before the spawned Pikmin's AI starts (Dandori's "-1 float"). |
| $1+25 | $1+25 | 4 | i32 count → **loop** | **RandomActorSpawnList** |  | Extra random actors spawned (Dandori's inventory slots here). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | variable → $2 | section | &nbsp;&nbsp;&nbsp;&nbsp;[SpawnMiniInfo](#sec-spawnminiinfo) |  | DropSpawnMiniInfo (FUN_01183700) |
|  |  | → $3 | end | end of RandomActorSpawnList |  |  |
| $3 | $3 | variable → $4 | section | [Sniff](#sec-sniff) |  | SniffPointParameter (CarrotAIComponent+0x688, FUN_00E45140) - last block of almost every layout |

<a id="sec-unpcaicomponent"></a>
### UNpcAIComponent

castaways / NPCs (FUN_0151B060).

**Actors:** `GNpcEditGuide_C`, `GNpcEditLeafPoko_C`, `GNpcEditLeaf_C`, `GNpcEdit_C`, `GNpcLouieDDB_C`, `GNpcLouieLast_C`, `GNpcLouie_C`, `GNpcLucky_C`, `GNpcOlimarLeafDDB_C`, `GNpcOlimarLeaf_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4+len → $1 | FName (FString) | NpcInfoKey |  |  |
| $1 | $1 | 1 | u8 ENpcRoleType | AIParameter.NpcRoleType |  | ENpcRoleType role. |
| $1+1 | $1+1 | 4 | i32 count → **loop** | **AIParameter.NpcAIInfos** |  | AI types by story progress. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 1 | u8 ENpcAIType | &nbsp;&nbsp;&nbsp;&nbsp;AIType |  | ENpcAIType. |
| elem+1 | elem+1 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;ProgressMin |  | Min story progress. |
| elem+5 | elem+5 | 4 | i32 | &nbsp;&nbsp;&nbsp;&nbsp;ProgressMax |  | Max story progress. |
|  |  | → $2 | end | end of AIParameter.NpcAIInfos |  |  |
| $2 | $2 | 4 | f32 | AIParameter.NearNpcReactionParameter.NpcSearchRange |  | Search range. |
| $2+4 | $2+4 | 4 | i32 count → **loop** | **AIParameter.NearNpcReactionParameter.ToNpcReactionAITypes** |  | AI types to react with. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 1 | u8 enum | &nbsp;&nbsp;&nbsp;&nbsp;AIType |  | ENpcAIType reacted to when near another NPC |
|  |  | → $3 | end | end of AIParameter.NearNpcReactionParameter.ToNpcReactionAITypes |  |  |
| $3 | $3 | 4 | i32 count → **loop** | **AIParameter.WanderParameter.TargetPoints** |  | Wander points. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;TargetPoint |  | wander target point (relative) |
|  |  | → $4 | end | end of AIParameter.WanderParameter.TargetPoints |  |  |
| $4 | $4 | 4 | f32 | AIParameter.WanderParameter.Radius |  | Radius. |
| $4+4 | $4+4 | 12 | vec3 (3×f32) | AIParameter.DirectLookLocation |  | Fixed look-at location. |
| $4+16 | $4+16 | 4 | bool32 | AIParameter.bDefaultPlacementSubLevel |  | Placed in the default sub-level. |
| $4+20 | $4+20 | 4+len → $5 | FName (FString) | AIParameter.DefaultPlacementTagName |  | Placement tag. |
| $5 | $5 | 4 | i32 count → **loop** | **AIParameter.NpcPlaceCheckQuestStatusList** |  | Quest-dependent placements. |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4+len → $6 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;CheckQuestName |  | Quest. |
| $6 | $6 | 1 | u8 ENpcCheckQuestStatusType | &nbsp;&nbsp;&nbsp;&nbsp;CheckQuestStatusType |  | Status. |
| $6+1 | $6+1 | 4+len → $7 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;PlacementTagName |  | Tag. |
|  |  | → $8 | end | end of AIParameter.NpcPlaceCheckQuestStatusList |  |  |
| $8 | $8 | 4 | bool32 | AIParameter.bLeafState |  | Leafling (leaf-covered) state. |
| $8+4 | $8+4 | 12 | vec3 (3×f32) | AIParameter.PlayerWarpPointOffset |  | Warp point offset. |
| $8+16 | $8+16 | 4+len → $9 | FString | TalkParameter.ContentsName |  |  |
| $9 | $9 | 4+len → $10 | FString | TalkParameter.WindowMsgId |  |  |
| $10 | $10 | 4 | f32 | TalkParameter.CheckDist |  |  |
| $10+4 | $10+4 | 4 | i32 | TalkParameter.TalkNum |  |  |
| $10+8 | $10+8 | 4 | i32 | TalkParameter.ScenarioStep |  |  |
| $10+12 | $10+12 | 4 | i32 | TalkParameter.SameAppearanceTalkDay |  |  |

<a id="sec-unumasuitoriaicomponent"></a>
### UNumaSuitoriAIComponent

**Actors:** `GNumaSuitori_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaRest.Center |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+12 | $1+12 | 4 | f32 | TekiAIParameter.SearchAreaRest.HalfHeight |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+16 | $1+16 | 4 | f32 | TekiAIParameter.SearchAreaRest.Radius |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+20 | $1+20 | 4 | f32 | TekiAIParameter.SearchAreaRest.Angle |  | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |
| $1+24 | $1+24 | 4 | f32 | TekiAIParameter.SearchAreaRest.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |
| $1+28 | $1+28 | 4 | bool32 | NumaSuitoriAIParameter.bFixLocation |  | Stays at a fixed spot. |

<a id="sec-uobjectaicomponent"></a>
### UObjectAIComponent

gimmick/object base.

**Actors:** `GBikkuriGikuPlant_C`, `GBikkuriKinokoPlant_C`, `GBookendPlane_C`, `GBookendSlope_C`, `GCharcoal_C`, `GColdBox_C`, `GFireFloor175uu_C`, `GFireFloor350uu_C`, `GFireFloor525uu_C`, `GFuurosouA_C`, `GFuurosouB_C`, `GHIddenBox_Amamo_C`, `GHIddenBox_Heuchera01_C`, `GHIddenBox_Heuchera02_C`, `GHiddenBoxRoomDark_C`, `GHiddenBoxRoom_C`, `GMultiBlockArea006_BossStone_C`, `GMultiBlockArea500_01A_C`, `GMultiBlockArea500_01B_C`, `GMultiBlockArea500_02A_C`, `GMultiBlockArea500_02B_C`, `GMultiBlockArea500_03A_C`, `GMultiBlockArea500_03B_C`, `GNavMeshTriggerClear_C`, `GNavMeshTriggerLinkForSplash_C`, `GNavMeshTrigger_C`, `GOnyonDummy_C`, `GOnyonVS_C`, `GOnyon_C`, `GOoinu_C`, `GPiecePick_C`, `GSpaceBus_C`, `GTanebiStationRelay_C`, `GTanebiStation_C`, `GWasurenagusaMini_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |

<a id="sec-uojamablockphotoaicomponent"></a>
### UOjamaBlockPhotoAIComponent

**Actors:** *none placed in shipped maps*

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | f32 | OjamaBlockPhotoAIParam.CameraInThreshold |  | Camera-in threshold. |
| 4 | 4 | 4 | i32 | OjamaBlockPhotoAIParam.CheckDistance |  | Check distance. |
| 8 | 8 | 4 | bool32 | OjamaBlockPhotoAIParam.IsCameraWallCollision |  | Use camera wall collision. |
| 12 | 12 | 4 | bool32 | OjamaBlockPhotoAIParam.IsCheckDistance |  | Check distance. |
| 16 | 16 | 4 | bool32 | OjamaBlockPhotoAIParam.IsCheckCameraHeight |  | Check camera height. |

<a id="sec-uooashibakinokoaicomponent"></a>
### UOoAshibaKinokoAIComponent

giant climbable mushroom.

**Actors:** `GOoAshibaKinokoNarrow_C`, `GOoAshibaKinoko_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | OoAshibaKinokoAIParameter.GrowHeight |  | Grow height. |
| $1+4 | $1+4 | 0 | **loop ×N** | **StepLocations** (count NOT serialized) |  | one relative location per step component (count = entries in the component's own array at +0xA20, or the number of found step components); the count is NOT written |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Location |  | relative location of the step |
|  |  | → $2 | end | end of StepLocations |  |  |
| $2 | $2 | 16 | quat (4×f32) | MeshRotation |  | transform of the mushroom's StaticMeshComponent - rotation |
| $2+16 | $2+16 | 12 | vec3 (3×f32) | MeshLocation |  | relative location |
| $2+28 | $2+28 | 12 | vec3 (3×f32) | MeshScale |  | relative scale |

<a id="sec-uotabankcardaicomponent"></a>
### UOtaBankCardAIComponent

**Actors:** `GOtaBankCardA_C`, `GOtaBankCardB_C`, `GOtaBankCardBlank2_C`, `GOtaBankCardBlank_C`, `GOtaBankCardC_C`, `GOtaBankCardD_C`, `GOtaBankCardE_C`, `GOtaBankCardF_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UOtakaraAIComponent](#sec-uotakaraaicomponent) |  | the parent class serializer runs first |

<a id="sec-uotakaraaicomponent"></a>
### UOtakaraAIComponent

**Actors:** `GOnyonBootUpRed_C`, `GOnyonCarryBlue_C`, `GOnyonCarryBoost_C`, `GOnyonCarryIce_C`, `GOnyonCarryPink_C`, `GOnyonCarryPurple_C`, `GOnyonCarryStone_C`, `GOnyonCarryWhite_C`, `GOnyonCarryYellow_C`, `GOta3DMegane_C`, `GOtaAmmolite_C`, `GOtaApricot_C`, `GOtaAvocado_C`, `GOtaBanana_C`, `GOtaBilliardBall1_C`, `GOtaBilliardBall2_C`, `GOtaBilliardBall3_C`, `GOtaBilliardBall4_C`, `GOtaBilliardBall5_C`, `GOtaBilliardBall6_C`, `GOtaBilliardBall7_C`, `GOtaBilliardBall8_C`, `GOtaBilliardBall9_C`, `GOtaBilliardBallCue_C`, `GOtaBiwa_C`, `GOtaBoardEraser_C`, `GOtaBoat_C`, `GOtaBottle_C`, `GOtaBrushB_C`, `GOtaButtonMetal_C`, `GOtaButtonPlastic_C`, `GOtaButtonWood_C`, `GOtaCandle_C`, `GOtaCandyStick_C`, `GOtaCardDentaku_C`, `GOtaCasinoChip100_C`, `GOtaCasinoChip1_C`, `GOtaCasinoChip25_C`, `GOtaCasinoChip50_C`, `GOtaCastanets_C`, `GOtaCherry_C`, `GOtaCompass_C`, `GOtaCounter_C`, `GOtaCroissant_C`, `GOtaDarts_C`, `GOtaDaruma_C`, `GOtaDekopon_C`, `GOtaDentaku_C`, `GOtaDice12_C`, `GOtaDice20_C`, `GOtaDice4Sided_C`, `GOtaDoguHead_C`, `GOtaDragonFruit_C`, `GOtaDuckL_C`, `GOtaDuckM_C`, `GOtaDuckS_C`, `GOtaEclair_C`, `GOtaEffectsUnit_C`, `GOtaEggplant_C`, `GOtaEngageRing_C`, `GOtaFeeddish_C`, `GOtaFieldGlass_C`, `GOtaFingerBoard_C`, `GOtaFishCruet_C`, `GOtaFruitsPickBLU_C`, `GOtaFruitsPickGRN_C`, `GOtaFruitsPickORN_C`, `GOtaFruitsPickPNK_C`, `GOtaFruitsPickYEL_C`, `GOtaGBARomBLK_C`, `GOtaGBARomYEL_C`, `GOtaGBASP_C`, `GOtaGBMicroFC_C`, `GOtaGCConWb_C`, `GOtaGaragara_C`, `GOtaGoddess_C`, `GOtaGoldBar_C`, `GOtaGoldfish_C`, `GOtaGolfBall_C`, `GOtaGrape_C`, `GOtaGrapefruit_C`, `GOtaGripper_C`, `GOtaHairPin_C`, `GOtaHanafudaA_C`, `GOtaHanafudaB_C`, `GOtaHanafudaD_C`, `GOtaHandSpinner_C`, `GOtaHandbell_C`, `GOtaHardBall_C`, `GOtaHarmonica_C`, `GOtaHeroPartsAA_C`, `GOtaHeroPartsAB_C`, `GOtaHeroPartsAD_C`, `GOtaHeroPartsA_C`, `GOtaHeroPartsC_C`, `GOtaHeroPartsF_C`, `GOtaHeroPartsH_C`, `GOtaHeroPartsI_C`, `GOtaHeroPartsJ_C`, `GOtaHeroPartsK_C`, `GOtaHeroPartsL_C`, `GOtaHeroPartsM_C`, `GOtaHeroPartsN_C`, `GOtaHeroPartsO_C`, `GOtaHeroPartsP_C`, `GOtaHeroPartsQ_C`, `GOtaHeroPartsR_C`, `GOtaHeroPartsU_C`, `GOtaHeroPartsV_C`, `GOtaHeroPartsW_C`, `GOtaHeroPartsX_C`, `GOtaHeroPartsY_C`, `GOtaHimeFork_C`, `GOtaHornBell_C`, `GOtaIchigo_C`, `GOtaIchijiku_C`, `GOtaIsobeyaki_C`, `GOtaJamIchigo_C`, `GOtaJoyConL_C`, `GOtaKaki_C`, `GOtaKendamaA_C`, `GOtaKendamaB_C`, `GOtaKiwiGLD_C`, `GOtaKiwi_C`, `GOtaKushiyaki_C`, `GOtaLemon_C`, `GOtaLightUpRingBLU_C`, `GOtaLightUpRingRED_C`, `GOtaLightUpRingYEL_C`, `GOtaLime_C`, `GOtaLoupe_C`, `GOtaMacaronB_C`, `GOtaMacaronC_C`, `GOtaManekiNeko_C`, `GOtaMango_C`, `GOtaMangosteen_C`, `GOtaMask_C`, `GOtaMatDollLA_C`, `GOtaMatDollMA_C`, `GOtaMatDollMB_C`, `GOtaMatDollSA_C`, `GOtaMatDollSB_C`, `GOtaMelon_C`, `GOtaMikan_C`, `GOtaMoai_C`, `GOtaMuscat_C`, `GOtaMusicBoxA_C`, `GOtaMusicBoxB_C`, `GOtaMusicBoxC_C`, `GOtaNESClassicMini_C`, `GOtaNashi_C`, `GOtaOcarinaBRN_C`, `GOtaOshaburiBLU_C`, `GOtaPadlock_C`, `GOtaPaintsAQU_C`, `GOtaPaintsBLK_C`, `GOtaPaintsBLU_C`, `GOtaPaintsGRN_C`, `GOtaPaintsPNK_C`, `GOtaPaintsPPL_C`, `GOtaPaintsWHT_C`, `GOtaPaintsYEL_C`, `GOtaPapaya_C`, `GOtaPaperCraneBLU_C`, `GOtaPaperCraneGLD_C`, `GOtaPaperCraneRED_C`, `GOtaPaperballoon_C`, `GOtaPeach_C`, `GOtaPeanut_C`, `GOtaPhotoframe_C`, `GOtaPinBadgeA_C`, `GOtaPinBadgeC_C`, `GOtaPinBadgeD_C`, `GOtaPinBadgeE_C`, `GOtaPlum_C`, `GOtaPocketWatch_C`, `GOtaPotato_C`, `GOtaPretzel_C`, `GOtaPudding_C`, `GOtaPumpkin_C`, `GOtaPuzzleA_C`, `GOtaPuzzleB_C`, `GOtaPuzzleC_C`, `GOtaPuzzleD_C`, `GOtaPuzzleE_C`, `GOtaPuzzleF_C`, `GOtaPuzzleH_C`, `GOtaPuzzleI_C`, `GOtaPuzzleJ_C`, `GOtaPuzzleK_C`, `GOtaPuzzleL_C`, `GOtaRailwayLineA_C`, `GOtaRailwayLineB_C`, `GOtaRailwayLineC_C`, `GOtaRailwayLineD_C`, `GOtaRailwayLineE_C`, `GOtaRappa_C`, `GOtaRaspberry_C`, `GOtaRingPop_C`, `GOtaRingo_C`, `GOtaRoboBody_C`, `GOtaRoboHandL_C`, `GOtaRoboHead_C`, `GOtaRoboLegL_C`, `GOtaRoboLegR_C`, `GOtaRodan_C`, `GOtaShinjitsu_C`, `GOtaSmallBell_C`, `GOtaSpongeA_C`, `GOtaSpongeB_C`, `GOtaSpongeC_C`, `GOtaSqueezer_C`, `GOtaStarFruit_C`, `GOtaSushiEbi_C`, `GOtaSushiMaguro_C`, `GOtaSushiTamago_C`, `GOtaSweetPotato_C`, `GOtaTakenoko_C`, `GOtaTakoWiener_C`, `GOtaTennisBall_C`, `GOtaThermometer_C`, `GOtaTomatoM_C`, `GOtaTomatoS_C`, `GOtaToothModel_C`, `GOtaTrainA_C`, `GOtaTrainB_C`, `GOtaTrainC_C`, `GOtaTrilobite_C`, `GOtaVenus_C`, `GOtaWaffle_C`, `GOtaWaterMelon_C`, `GOtaWhistle_C`, `GOtaYoshiCookieA_C`, `GOtaYoshiCookieB_C`, `GOtaYoshiCookieC_C`, `GOtaYoshiCookieD_C`, `GOtaYoshiCookieE_C`, `GOtaZucchini_C`, `GSurvivorA_C`, `GSurvivorKoppai_C`, `GSurvivorLeaf_C`, `GSurvivorOlimarLeaf_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | bool32 | AIParameter.bUseArrowFace |  | Arrow faces the carry direction. |
| 4 | 4 | 4 | bool32 | AIParameter.bChangeCrushImpactMoveDir |  | Impact moves it in CrushImpactMoveRot direction. |
| 8 | 8 | 4 | bool32 | AIParameter.bReceiveCrushImpactEventFromOtakara |  | Moves when hit by falling treasure. |
| 12 | 12 | 4 | bool32 | AIParameter.bSendCrushImpactEventToOtakara |  | Sends an impact to treasure it lands on. |
| 16 | 16 | 12 | rotator (3×f32 P,Y,R) | AIParameter.CrushImpactMoveRot |  | Direction of impact movement. |
| 28 | 28 | 4 | bool32 | AIParameter.bUseCrushDDB |  | Dandori Battle: crush point enabled. |
| 32 | 32 |  | **if** | **only if AIParameter.bUseCrushDDB ≠ 0** |  | block present only when the flag just read is set |
| 32 | 32 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;AIParameter.CrushDDBPoint | only if AIParameter.bUseCrushDDB ≠ 0 | Dandori Battle crush point. |
|  |  | → $1 | end | end of conditional block |  | $1 = offset after the block (whether or not it was written) |
| $1 | $1 | 1 | u8 EDDBPikminHeightType | AIParameter.DDBPikminHeightType |  | Dandori Battle Pikmin height type. |
| $1+1 | $1+1 | 4 | bool32 | bDDBSurvivorLeaf |  | Dandori Battle castaway variant (leaf). |
| $1+5 | $1+5 | variable → $2 | section | [Sniff](#sec-sniff) |  | SniffPointParameter (CarrotAIComponent+0x688, FUN_00E45140) - last block of almost every layout |

<a id="sec-upanmodokibaseaicomponent"></a>
### UPanModokiBaseAIComponent

**Actors:** `GOoPanModoki_C`, `GPanModoki_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4+len → $2 | FName (FString) | PanModokiBaseAIParameter.RouteTag |  | Route it walks. |
| $2 | $2 | 4+len → $3 | FName (FString) | PanModokiBaseAIParameter.HideAreaTag |  | Hiding area (its nest). |

<a id="sec-upatrolleraicomponent"></a>
### UPatrollerAIComponent

**Actors:** `GPatroller_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4+len → $2 | FName (FString) | PatrollerAIParameter.SearchTagName |  | Route tag (e.g. PatrollerRootPoint02). |
| $2 | $2 | 4 | f32 | PatrollerAIParameter.GiveupDistance |  | Give-up distance. |

<a id="sec-upelplantaicomponent"></a>
### UPelplantAIComponent

**Actors:** `GPelplant10DDB_C`, `GPelplant10ReviveForHero_C`, `GPelplant10_C`, `GPelplant1DDB_C`, `GPelplant1ReviveForHero_C`, `GPelplant1Revive_C`, `GPelplant1_C`, `GPelplant5DDB_C`, `GPelplant5ReviveForHero_C`, `GPelplant5Revive_C`, `GPelplant5_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 1 | u8 EPelplantType | AIParameter.PelplantType |  | EPelplantType (1/5/10/20 pellet). |
| 1 | 1 | 1 | u8 EPikminColor | AIParameter.PelletColor |  | Pellet colour. |
| 2 | 2 | 4 | f32 | AIParameter.ForceFloweringTimeRatio |  | Time ratio at which it force-flowers. |
| 6 | 6 | 4 | i32 | AIParameter.PetalDirectDamage |  | Damage per hit on petals. |
| 10 | 10 | 4 | i32 | AIParameter.PetalDurability |  | Petal HP. |
| 14 | 14 | 4 | i32 | AIParameter.PetalFallRate |  | Petal fall rate. |
| 18 | 18 | 4 | f32 | AIParameter.TimeToGrowBud |  | Time to grow a bud. |
| 22 | 22 | 4 | f32 | AIParameter.TimeToGrowFlower |  | Time to flower. |

<a id="sec-upodaicomponent"></a>
### UPodAIComponent

pod (base) - only this bool.

**Actors:** `GDolphinArea500After_C`, `GDolphinArea500Before_C`, `GDolphin_C`, `GPod_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | bool32 | PodAIParameter.bHeyWakka |  | Plays the greeting/"hey" behaviour on arrival. |

<a id="sec-uportalbaseaicomponent"></a>
### UPortalBaseAIComponent

**Actors:** `GDownPortal_C`, `GDungeonExit_C`, `GMadoriArena_C`, `GMadoriPoko_C`, `GMadoriRuinsForExit_C`, `GMadoriRuins_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | PortalBaseAIParameter.bPlayUncompletedEffect |  | Show the "not completed" sparkle. |

<a id="sec-upressflooraicomponent"></a>
### UPressFloorAIComponent

**Actors:** `GPressFloor_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | PressFloorParam.Height |  | Height. |
| $1+4 | $1+4 | 4 | f32 | PressFloorParam.MaxHeightSpeed |  | Height speed. |
| $1+8 | $1+8 | 4 | f32 | PressFloorParam.Radius |  | Radius. |
| $1+12 | $1+12 | 4 | f32 | PressFloorParam.MaxRadiusSpeed |  | Radius speed. |
| $1+16 | $1+16 | 4+len → $2 | FName (FString) | PressFloorParam.WaterBoxID |  | Water box it interacts with. |
| $2 | $2 | 12 | vec3 (3×f32) | PressFloorParam.CreateNavBoxRange |  | Nav box extent. |
| $2+12 | $2+12 | 12 | vec3 (3×f32) | PressFloorParam.CreateNavBoxOffset |  | Nav box offset. |

<a id="sec-upullnekkoaicomponent"></a>
### UPullNekkoAIComponent

**Actors:** `GPullNekkoTutorial_C`, `GPullNekko_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | PullNekkoAIParameter.bSoilInvisible |  | Hide the soil mound. |
| $1+4 | $1+4 |  | **if** | **optional: NavLink** |  |  |
| $1+4 | $1+4 | variable → $2 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkPoints](#sec-navlinkpoints) | optional: NavLink | NavLinkComponent point pairs (FUN_0183AD30 / FUN_018088B0); only when the actor has a NavLinkComponent |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |

<a id="sec-upushgimmickaicomponent"></a>
### UPushGimmickAIComponent

**Actors:** `GXBoxCan_C`, `GXBox_C`, `GYBoxAnother_C`, `GYBoxCubeCan_C`, `GYBoxCube_C`, `GYBoxSmallAnother_C`, `GYBoxSmall_C`, `GYBox_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 12 | vec3 (3×f32) | PushGimmickAIParameter.WarpPos |  | Position after pushing (saved). |
| $1+12 | $1+12 | variable → $2 | section | [SplinePoints](#sec-splinepoints) |  | USplineComponent points (FUN_00DA2A10 / FUN_00DA2F20) - only when the owner actor has a USplineComponent |
| $2 | $2 |  | **if** | **optional: NavLink** |  |  |
| $2 | $2 | variable → $3 | section | &nbsp;&nbsp;&nbsp;&nbsp;[NavLinkPoints](#sec-navlinkpoints) | optional: NavLink | NavLinkComponent point pairs (FUN_0183AD30 / FUN_018088B0); only when the actor has a NavLinkComponent |
|  |  | → $4 | end | end of conditional block |  | $4 = offset after the block (whether or not it was written) |

<a id="sec-uqueenaicomponent"></a>
### UQueenAIComponent

**Actors:** `GQueen_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 1 | u8 EQueenAIType | QueenAIParameter.QueenAIType |  | EQueenAIType behaviour set: e.g. Born (gives birth to larvae), FallBaby (babies drop from ceiling), SleepStart, BornAndRock. |
| $1+1 | $1+1 | 4 | f32 | QueenAIParameter.RockBallHeightMin |  | Min rock drop height. |
| $1+5 | $1+5 | 4 | f32 | QueenAIParameter.RockBallHeightMax |  | Max rock drop height. |
| $1+9 | $1+9 | 4 | f32 | QueenAIParameter.RockBallSpawnRadius |  | Rock spawn radius. |
| $1+13 | $1+13 | 4 | f32 | QueenAIParameter.RockBallSpawnOffsetY |  | Rock spawn offset. |
| $1+17 | $1+17 | 4 | f32 | QueenAIParameter.RockBallHeightMinInOppositeSide |  | Min height on the opposite side. |
| $1+21 | $1+21 | 4 | f32 | QueenAIParameter.RockBallHeightMaxInOppositeSide |  | Max height on the opposite side. |
| $1+25 | $1+25 | 4 | f32 | QueenAIParameter.RockBallSpawnRadiusInOppositeSide |  | Radius on the opposite side. |
| $1+29 | $1+29 | 4 | f32 | QueenAIParameter.FallBabyHeightMin |  | Min height babies fall from (Dandori's "bornSpeed"). |
| $1+33 | $1+33 | 4 | f32 | QueenAIParameter.FallBabyHeightMax |  | Max height babies fall from (Dandori's "childSearchRadius"). |
| $1+37 | $1+37 | 4 | f32 | QueenAIParameter.FallBabySpawnRadius |  | Radius babies fall in. |
| $1+41 | $1+41 | 4 | i32 | QueenAIParameter.FallBabySpawnNum |  | Babies that fall. |
| $1+45 | $1+45 | 4 | f32 | QueenAIParameter.FlickDistXY |  | Flick distance. |

<a id="sec-uropebranchaicomponent"></a>
### URopeBranchAIComponent

**Actors:** `GRopeBranchSmall_C`, `GRopeBranch_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |

<a id="sec-uropefishingaicomponent"></a>
### URopeFishingAIComponent

**Actors:** `GRopeFishing_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | RopeFishingAIParameter.JumpForceXY |  | Fling horizontal force. |
| $1+4 | $1+4 | 4 | f32 | RopeFishingAIParameter.JumpForceZ |  | Fling vertical force. |
| $1+8 | $1+8 | 4 | f32 | RopeFishingAIParameter.RopeAng |  | Rope angle. |
| $1+12 | $1+12 | 4 | i32 | RopeFishingAIParameter.ManualWorkNum |  | Pikmin needed. |

<a id="sec-urusheraicomponent"></a>
### URusherAIComponent

**Actors:** `GRusher_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | RusherAIParameter.Rush.DistMin |  | Min rush distance. |
| $1+4 | $1+4 | 4 | f32 | RusherAIParameter.Rush.DistMax |  | Max rush distance. |

<a id="sec-usaraiaicomponent"></a>
### USaraiAIComponent

**Actors:** `GSarai_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | TekiAIParameter.SearchAreaCaution.bSearchOuterTerritory |  | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |

<a id="sec-usearchbombaicomponent"></a>
### USearchBombAIComponent

**Actors:** *none placed in shipped maps*

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | 4 | f32 | SearchBombAIParameter.BaseParam.ExplosionRadius |  | Blast radius. |
| 4 | 4 | 4 | f32 | SearchBombAIParameter.BaseParam.ExplosionPower |  | Blast damage. |
| 8 | 8 | 4 | f32 | SearchBombAIParameter.BaseParam.NotifyPutRadius |  | Radius in which AI is warned a bomb was placed. |
| 12 | 12 | 4 | f32 | SearchBombAIParameter.BaseParam.NotifyExplodeRadius |  | Radius in which AI is warned of the explosion. |
| 16 | 16 | 4 | f32 | Unknown1 |  |  |
| 20 | 20 | 4 | f32 | Unknown2 |  |  |
| 24 | 24 | 4 | f32 | SearchBombAIParameter.SearchWaitTime |  | Wait before searching. |
| 28 | 28 | 4 | f32 | SearchBombAIParameter.SearchRadius |  | Target search radius. |

<a id="sec-ushakoaicomponent"></a>
### UShakoAIComponent

**Actors:** `GShako_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | ShakoAIParameter.BurrowSearchAreaLength |  | Distance to search for burrows. |
| $1+4 | $1+4 | 4 | bool32 | ShakoAIParameter.bBurrowKill |  | Kills when burrowing. |
| $1+8 | $1+8 | 4+len → $2 | FName (FString) | ShakoAIParameter.BurrowSearchTagName |  | Burrow tag (links to BurrowAIParameter.Tag). |
| $2 | $2 | 4 | bool32 | ShakoAIParameter.bEnableSoftEdge |  | Soft edge enabled. |

<a id="sec-ushijimiaicomponent"></a>
### UShijimiAIComponent

**Actors:** `GRedShijimi_C`, `GWhiteShijimi_C`, `GYellowShijimi_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | ShijimiAIParameter.MoveRadiusFlyAwayXY |  | Fly-away radius. |
| $1+4 | $1+4 | 4 | bool32 | ShijimiAIParameter.bStartMaxHeight |  | Starts at max height. |
| $1+8 | $1+8 | 4 | bool32 | ShijimiAIParameter.bStartPerch |  | Starts perched. |
| $1+12 | $1+12 | 4 | bool32 | ShijimiAIParameter.bBirthPerch |  | Spawns with its own perch. |

<a id="sec-usingleswitchaicomponent"></a>
### USingleSwitchAIComponent

**Actors:** `GSwitchOff_C`, `GSwitchOnOffGreen_C`, `GSwitchOnOffRed_C`, `GSwitchOnOff_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | SwitchBaseAIParameter.SwitchID |  | Switch ID (links doors/circulators/conveyors). |

<a id="sec-usprinkleraicomponent"></a>
### USprinklerAIComponent

**Actors:** `GSprinkler_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | ValveID |  |  |
| $2 | $2 |  | **if** | **optional: FlatEffectLocation** |  | only if the sprinkler has its flat-effect component |
| $2 | $2 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;SprinklerAIParameter+0x50 | optional: FlatEffectLocation |  |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |
| $3 | $3 | 4 | f32 | SprinklerAIParameter.WaterRange |  | Spray radius. |
| $3+4 | $3+4 | 4 | f32 | SprinklerAIParameter.OpenTime |  | Spray duration. |
| $3+8 | $3+8 | 4 | bool32 | SprinklerAIParameter.bUseFlatEffect |  | Use the flat spray effect (Dandori's skipped 4 bytes). |
| $3+12 | $3+12 | 4 | f32 | SprinklerAIParameter.FlatEffectOffsetZ |  | Flat effect height. |
| $3+16 | $3+16 | 4 | bool32 | SprinklerAIParameter.bSprinklerOnly |  | Only sprays (doesn't trigger other water effects). |

<a id="sec-ustickyflooraicomponent"></a>
### UStickyFloorAIComponent

**Actors:** `GStickyFloor175uu_C`, `GStickyFloor525uu_C`, `GStickyFloorFew_C`, `GStickyFloorPoisonFew_C`, `GStickyFloorPoison_C`, `GStickyFloor_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | StickyFloorAIParameter.bAutoSpawnMush |  | Automatically spawns mushrooms. |

<a id="sec-ustringaicomponent"></a>
### UStringAIComponent

**Actors:** `GString_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | StringAIParameter.FallHeight |  | Fall height. |

<a id="sec-usuitoriaicomponent"></a>
### USuitoriAIComponent

**Actors:** `GSuitori_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 1 | u8 ESuitoriType | SuitoriAIParameter.SuitoriType |  | ESuitoriType variant. |

<a id="sec-utamagomushiaicomponent"></a>
### UTamagoMushiAIComponent

**Actors:** `GTamagoMushi_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | TamagoMushiAIParameter.SearchObjectRadius |  | Radius to find the host object. |
| $1+4 | $1+4 | 1 | u8 ETamagoMushiSearchType | TamagoMushiAIParameter.SearchType |  | ETamagoMushiSearchType host type (CrackPot, Otakara, StickyFloor, Burning, HikariKinoko...). |
| $1+5 | $1+5 | 4 | bool32 | TamagoMushiAIParameter.bMultiTarget |  | Can use several hosts. |

<a id="sec-utamagumonetaicomponent"></a>
### UTamagumoNetAIComponent

**Actors:** `GMarigumoNet_C`, `GMarigumoNet_Low_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | TamagumoNetAIParameter.SearchNetStickActorRadius |  | Radius for actors stuck in the net. |

<a id="sec-utateanaaicomponent"></a>
### UTateanaAIComponent

**Actors:** `GTateanaBaby_C`, `GTateana_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | f32 | TateanaAIParameter.TimeDigWork |  | Dig work time. |

<a id="sec-utekiaicomponent"></a>
### UTekiAIComponent

enemy base.

**Actors:** `GArikui_C`, `GAwadako_C`, `GBabyCrow_C`, `GBigFireTank_C`, `GBigIceTank_C`, `GBilly_C`, `GBokeNameko_C`, `GChaser_C`, `GDokuNameko_C`, `GElecMushi_C`, `GElecSenbei_C`, `GFireTank_C`, `GHambo_C`, `GIceChappy_C`, `GIceSenbei_C`, `GIceTank_C`, `GIwakkoCrystal_C`, `GKaburi_C`, `GKajiokoshi_C`, `GKareHambo_C`, `GKemekuji_C`, `GKinoKajiokoshi_C`, `GMitsuMochi_C`, `GNamazu_C`, `GNightKaburi_C`, `GNightKareHambo_C`, `GNightTobiKaburi_C`, `GNiseBoss_C`, `GNiseZako_C`, `GNomi_C`, `GOtama_C`, `GSakadachi_C`, `GShippoZako_C`, `GShippo_C`, `GSnakeCrow_C`, `GTentenChappy_C`, `GThrowEater_C`, `GTobiKaburi_C`, `GWaterTank_C`, `GYakiSenbei_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |

<a id="sec-utobinkoaicomponent"></a>
### UTobinkoAIComponent

**Actors:** `GNightTobinko_C`, `GTobinko_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | TobinkoAIParameter.bNoBurrowType |  | Never burrows. |

<a id="sec-utobiuoaicomponent"></a>
### UTobiuoAIComponent

**Actors:** `GTobiuo_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | TobiuoAIParameter.JumpVel |  | Jump speed. |

<a id="sec-utrampolineaicomponent"></a>
### UTrampolineAIComponent

**Actors:** `GTrampolineOneway_C`, `GTrampolineWideAngle_C`, `GTrampoline_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | TrampolineAIParameter.bHiddenTsubo |  | Hide the pot/base mesh. |
| $1+4 | $1+4 | 0 | **loop ×N** | **BoundPoints** (count NOT serialized) |  | one vector per name-matched child SceneComponent (the trampoline's bounce points); the count is NOT written |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Location |  | relative location of the child component |
|  |  | → $2 | end | end of BoundPoints |  |  |

<a id="sec-utriggercoldaicomponent"></a>
### UTriggerColdAIComponent

**Actors:** `GTriggerColdOFF_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |

<a id="sec-utriggerdooraicomponent"></a>
### UTriggerDoorAIComponent

**Actors:** `GTriggerDoorSwitchBlue_C`, `GTriggerDoorSwitchOff_C`, `GTriggerDoorSwitchRed_C`, `GTriggerDoor_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | TriggerDoorAIParameter.SwitchID |  | Switch ID. |
| $2 | $2 | 4 | i32 ECmnRankUpEffectType | TriggerDoorAIParameter.CompleteUIType |  | Completion UI type. |
| $2+4 | $2+4 | 4 | f32 | TriggerDoorAIParameter.OpenWaitTime |  | Open wait. |
| $2+8 | $2+8 | 4 | bool32 | TriggerDoorAIParameter.bEnableAirWall |  | Air wall enabled. |
| $2+12 | $2+12 | 4 | bool32 | TriggerDoorAIParameter.bNoCollisionAirWall |  | Air wall without collision. |
| $2+16 | $2+16 |  | **if** | **optional: TriggerBox** |  | only when the door actor has its trigger BoxComponent (absent on the TriggerDoorSwitch variants) |
| $2+16 | $2+16 | 16 | quat (4×f32) | &nbsp;&nbsp;&nbsp;&nbsp;TriggerBoxRotation | optional: TriggerBox | trigger box component transform - rotation |
| $2+32 | $2+32 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;TriggerBoxLocation | optional: TriggerBox | relative location |
| $2+44 | $2+44 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;TriggerBoxScale | optional: TriggerBox | relative scale |
| $2+56 | $2+56 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;TriggerBoxExtent | optional: TriggerBox | box extent |
|  |  | → $3 | end | end of conditional block |  | $3 = offset after the block (whether or not it was written) |
| $3 | $3 | 4 | i32 count → **loop** | **TriggerDoorAIParameter.CIDList** |  | CIDs of objects linked to the door (Dandori's CIDList). |
|  |  |  | repeat | &nbsp;&nbsp;&nbsp;&nbsp;*for each element:* |  | offsets below are relative to the start of each element |
| elem | elem | 4+len → $4 | FName (FString) | &nbsp;&nbsp;&nbsp;&nbsp;CID |  | CID of an object linked to the door (Dandori CIDList) |
|  |  | → $5 | end | end of TriggerDoorAIParameter.CIDList |  |  |

<a id="sec-utsuyuaicomponent"></a>
### UTsuyuAIComponent

**Actors:** *none placed in shipped maps*

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |

<a id="sec-uujinkoaaicomponent"></a>
### UUjinkoAAIComponent

**Actors:** `GUjinkoA_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | UjinkoBaseAIParameter.bNoBurrowType |  | Never burrows. |

<a id="sec-uujinkobaicomponent"></a>
### UUjinkoBAIComponent

**Actors:** `GUjinkoB_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | bool32 | UjinkoBaseAIParameter.bNoBurrowType |  | Never burrows. |

<a id="sec-uvalveaicomponent"></a>
### UValveAIComponent

**Actors:** `GValveOnce_C`, `GValveVariable_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | parent layout | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) |  | the parent class serializer runs first |
| $1 | $1 | 4+len → $2 | FName (FString) | ValveAIParam.ValveID |  | Valve ID linking sprinklers. |
| $2 | $2 | 4 | i32 EValveWorkType | ValveAIParam.BuiltWorkType |  | Work type after being built. |
| $2+4 | $2+4 | 4 | i32 | ValveAIParam.DemoID |  | Cutscene ID played when opened. |

<a id="sec-uvalvegimmickbaseaicomponent"></a>
### UValveGimmickBaseAIComponent

**Actors:** *none placed in shipped maps*

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | ValveID |  | ID of the valve controlling this gimmick. |

<a id="sec-uwarpcarryaicomponent"></a>
### UWarpCarryAIComponent

**Actors:** `GWarpCarryFloorCave_C`, `GWarpCarryFloor_C`, `GWarpCarryWallCave_C`, `GWarpCarryWall_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | WarpCarryAIParameter.WarpCarryID |  | Pairs tunnel ends. |

<a id="sec-uwasurenagusaaicomponent"></a>
### UWasurenagusaAIComponent

**Actors:** `GWasurenagusa_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | i32 | WasurenagusaAIParameter.MaxBirthExtractNum |  | Max Glow Pikmin it can produce. |
| $1+4 | $1+4 | 4 | i32 | WasurenagusaAIParameter.WasurenagusaID |  | Lumiknoll ID. |
| $1+8 | $1+8 |  | **if** | **optional: BirthTransform** |  |  |
| $1+8 | $1+8 | 16 | quat (4×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Rotation | optional: BirthTransform |  |
| $1+24 | $1+24 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Translation | optional: BirthTransform |  |
| $1+36 | $1+36 | 12 | vec3 (3×f32) | &nbsp;&nbsp;&nbsp;&nbsp;Scale | optional: BirthTransform |  |
|  |  | → $2 | end | end of conditional block |  | $2 = offset after the block (whether or not it was written) |

<a id="sec-uwaterboxaicomponent"></a>
### UWaterBoxAIComponent

**Actors:** `GSwampBoxDark_C`, `GSwampBox_C`, `GWaterBoxCircle_C`, `GWaterBoxDeep_C`, `GWaterBoxFluctuationDeep_C`, `GWaterBoxFluctuation_C`, `GWaterBoxReduction_C`, `GWaterBoxVS_C`, `GWaterBox_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4+len → $2 | FName (FString) | WaterBoxAIParameter.WaterLevel.WaterBoxSwitchID |  | Switch that drains/raises the water. |
| $2 | $2 | 4 | f32 | WaterBoxAIParameter.WaterLevel.WaterLevelChangeDist |  | Height the water changes. |
| $2+4 | $2+4 | 4 | f32 | WaterBoxAIParameter.WaterLevel.WaterLevelChangeTime |  | Time to change level. |
| $2+8 | $2+8 | 4 | f32 | WaterBoxAIParameter.WaterLevel.WaterLevelChangeInterval |  | Interval between changes (Dandori's first "unknown constant"). |
| $2+12 | $2+12 | 4 | bool32 | WaterBoxAIParameter.WaterLevel.bInitWaterLevelDown |  | Starts lowered (Dandori's second "unknown constant"). |
| $2+16 | $2+16 | 4 | i32 | WaterBoxAIParameter.WaterLevel.GeneratorIndex |  | Generator index tied to the water level. |
| $2+20 | $2+20 | 4 | bool32 | WaterBoxAIParameter.WaterLevel.bUseSunMeter |  | Level follows the time of day. |
| $2+24 | $2+24 | 4 | f32 | WaterBoxAIParameter.WaterLevel.WaterLevelChangeStartTime |  | Time the change starts (Dandori's "idkFloat"). |
| $2+28 | $2+28 | 4 | bool32 | WaterBoxAIParameter.WaterLevel.bPlayDemo |  | Play the cutscene when it changes. |

<a id="sec-uwaterboxnavaicomponent"></a>
### UWaterBoxNavAIComponent

**Actors:** `GWaterBoxNav_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 4 | bool32 | bUseHappyOnly |  | Link only usable by Oatchi. |
| $1+4 | $1+4 | 12 | vec3 (3×f32) | RightOffset |  | right nav-link offset |

<a id="sec-uyamashinjuaicomponent"></a>
### UYamashinjuAIComponent

**Actors:** `GYamashinju_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 4 | f32 | YamashinjuAIParameter.DropPearlScale |  | Pearl scale. |
| $1+4 | $1+4 | variable → $2 | section | [SpawnMiniInfo](#sec-spawnminiinfo) |  | DropSpawnMiniInfo (FUN_01183700) |
| $2 | $2 | 4 | bool32 | YamashinjuAIParameter.bNoTargetDownShell |  | Shell doesn't close on a target. |

<a id="sec-uyukimushiaicomponent"></a>
### UYukimushiAIComponent

**Actors:** `GYukimushi_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [TekiBase](#sec-tekibase) |  | every enemy (UTekiAIComponent::vfunc_156 @0x017C9190) |
| $1 | $1 | 12 | vec3 (3×f32) | TekiAIParameter.SearchAreaGoToHome.Center |  | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |
| $1+12 | $1+12 | 4 | f32 | TekiAIParameter.SearchAreaGoToHome.HalfHeight |  | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |
| $1+16 | $1+16 | 4 | f32 | TekiAIParameter.SearchAreaGoToHome.Radius |  | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |
| $1+20 | $1+20 | 4 | f32 | TekiAIParameter.SearchAreaGoToHome.Angle |  | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |
| $1+24 | $1+24 | 4 | f32 | TekiAIParameter.SearchAreaGoToHome.SphereRadius |  | Radius of the always-detect sphere close to the actor (ignores Angle). |

<a id="sec-uziplineaicomponent"></a>
### UZiplineAIComponent

**Actors:** `GZiplineAnother_C`, `GZiplineSplineMesh_C`

| 386 | 418/626 | Size | Type | Field | Condition | Purpose |
|---|---|---|---|---|---|---|
| 0 | 0 | variable → $1 | section | [ObjectBase](#sec-objectbase) |  | every gimmick/object (UObjectAIComponent::vfunc_156 @0x01558880) |
| $1 | $1 | 12 | vec3 (3×f32) | ZiplineAIParameter.GoalOffset |  | End point offset. |
| $1+12 | $1+12 | 4 | f32 | ZiplineAIParameter.StartTargetSpeed |  | Target start speed. |
| $1+16 | $1+16 | 4 | f32 | ZiplineAIParameter.MaxMoveSpeed |  | Max speed. |
| $1+20 | $1+20 | 4 | f32 | ZiplineAIParameter.MinMoveSpeed |  | Min speed. |
| $1+24 | $1+24 | 4 | f32 | ZiplineAIParameter.Acceleration |  | Acceleration. |
| $1+28 | $1+28 | 4 | f32 | ZiplineAIParameter.Deceleration |  | Deceleration (Dandori's "70.0 always here?"). |
| $1+32 | $1+32 | variable → $2 | section | [SplinePoints](#sec-splinepoints) |  | USplineComponent points (FUN_00DA2A10 / FUN_00DA2F20) - only when the owner actor has a USplineComponent |

<a id="actor-index"></a>
## Actor → layout index

Source: `blueprint` = component class read from the decoded blueprint (SCS nodes / inherited component records); `name` = the layout name matches the actor name; `family` = naming family (e.g. `GOta*` treasures → Otakara); `base` = no species serializer, so only the plain Teki/Object base is written; `only match` = the only layout that parses its bytes; `ambiguous` = several layouts give an identical byte shape (field names may differ, offsets do not). Every assignment is also verified: the layout parses every sample of that actor exactly.

| Actor class | Layout | Source | Samples | Sizes (bytes) | Versions |
|---|---|---|---|---|---|
| `BP_AmbientSoundMulti_Area001_C` | (none) | no AI.Static bytes | 3 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_Area002_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_Area003_C` | (none) | no AI.Static bytes | 12 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_Area004_C` | (none) | no AI.Static bytes | 12 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_Area006_C` | (none) | no AI.Static bytes | 8 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_Area010_C` | (none) | no AI.Static bytes | 6 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_Area500_C` | (none) | no AI.Static bytes | 5 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_Cave_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_SwampBox_C` | (none) | no AI.Static bytes | 8 | 0 | 8626647386 |
| `BP_AmbientSoundMulti_WaterBox_Cave_C` | (none) | no AI.Static bytes | 59 | 0 | 8626647386 |
| `BP_AmbientSound_Area001_C` | (none) | no AI.Static bytes | 9 | 0 | 8626647386 |
| `BP_AmbientSound_Area002_C` | (none) | no AI.Static bytes | 13 | 0 | 8626647386 |
| `BP_AmbientSound_Area003_C` | (none) | no AI.Static bytes | 10 | 0 | 8626647386 |
| `BP_AmbientSound_Area004_C` | (none) | no AI.Static bytes | 13 | 0 | 8626647386 |
| `BP_AmbientSound_Area006_C` | (none) | no AI.Static bytes | 16 | 0 | 8626647386 |
| `BP_AmbientSound_Area010_C` | (none) | no AI.Static bytes | 13 | 0 | 8626647386 |
| `BP_AmbientSound_Area500_C` | (none) | no AI.Static bytes | 9 | 0 | 8626647386 |
| `CakMusicPlayerActor` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GActorSpawner_C` | [UActorSpawnerComponent](#sec-uactorspawnercomponent) | blueprint | 43 | 188, 190, 193, 196, 198, 200… | 8626647386, 8626647418 |
| `GAddLand01_Area001_M_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647626 |
| `GAddLand01_Area002_M_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GAddLand01_Area003_L01_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GAddLand02_Area001_M_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647626 |
| `GAddLand02_Area002_M_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GAddLand02_Area003_L_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GAddLand03_Area001_M_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647626 |
| `GAddLand04_Area001_M_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647626 |
| `GAffordanceArea_C` | (none) | no AI.Static bytes | 24 | 0 | 8626647386 |
| `GAirWallBox_C` | [UAirWallAIComponent](#sec-uairwallaicomponent) | blueprint | 104 | 176, 179, 180, 181, 182, 183… | 8626647386, 8626647418, 8626647626 |
| `GAirWallFlick_C` | [UAirWallAIComponent](#sec-uairwallaicomponent) | blueprint | 58 | 176, 180, 186, 188, 191, 194… | 8626647386, 8626647418, 8626647626 |
| `GAirWallJump_C` | (none) | no AI.Static bytes | 50 | 0 | 8626647626 |
| `GAirWallTerrain_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GAmeBozu_C` | [UAmeBozuAIComponent](#sec-uamebozuaicomponent) | blueprint | 8 | 230, 234, 241, 242, 486 | 8626647386, 8626647418 |
| `GAmembo_C` | [UAmemboAIComponent](#sec-uamemboaicomponent) | blueprint | 8 | 179 | 8626647386 |
| `GArikui_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 15 | 159, 286, 290, 296, 298, 452 | 8626647386, 8626647418 |
| `GAvatar_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GAwadako_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 8 | 159, 286 | 8626647386 |
| `GBabyCrow_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 25 | 159 | 8626647386 |
| `GBaby_C` | [UBabyAIComponent](#sec-ubabyaicomponent) | blueprint | 10 | 184, 188, 294 | 8626647386, 8626647418 |
| `GBank_C` | [UBankAIComponent](#sec-ubankaicomponent) | blueprint | 4 | 156 | 8626647386 |
| `GBigChappy_C` | [UBigChappyAIComponent](#sec-ubigchappyaicomponent) | blueprint | 6 | 308, 435, 466 | 8626647386, 8626647418 |
| `GBigEgg_C` | [UEggAIComponent](#sec-ueggaicomponent) | name | 30 | 227, 279, 290, 296, 386, 512… | 8626647386, 8626647418 |
| `GBigFireTank_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 2 | 265, 427 | 8626647386, 8626647418 |
| `GBigFrog_C` | [UFrogAIComponent](#sec-ufrogaicomponent) | blueprint | 5 | 215, 342, 354, 506 | 8626647386, 8626647418 |
| `GBigIceTank_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 2 | 440, 448 | 8626647386, 8626647418 |
| `GBigKingChappy_C` | [UBigKingChappyAIComponent](#sec-ubigkingchappyaicomponent) | blueprint | 5 | 328, 329, 334, 487, 610 | 8626647386, 8626647418 |
| `GBigUjinko_C` | [UBigUjinkoAIComponent](#sec-ubigujinkoaicomponent) | blueprint | 7 | 218, 222 | 8626647386, 8626647418 |
| `GBikkuriGikuPlant_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 12 | 155 | 8626647386 |
| `GBikkuriGiku_C` | [UBikkuriGikuAIComponent](#sec-ubikkurigikuaicomponent) | blueprint | 7 | 179, 306 | 8626647386 |
| `GBikkuriKinokoPlant_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 19 | 155 | 8626647386 |
| `GBikkuriKinoko_C` | [UBikkuriGikuAIComponent](#sec-ubikkurigikuaicomponent) | blueprint | 8 | 179, 306, 312, 462 | 8626647386, 8626647418 |
| `GBilly_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 9 | 159, 286 | 8626647386 |
| `GBokeNameko_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 1 | 287 | 8626647386 |
| `GBomb_C` | (none) | no AI.Static bytes | 6 | 0 | 8626647386 |
| `GBookendPlane_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 3 | 155 | 8626647386 |
| `GBookendSlope_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 3 | 155 | 8626647386 |
| `GBossInu2_C` | [UBossInu2AIComponent](#sec-ubossinu2aicomponent) | blueprint | 1 | 428 | 8626647386 |
| `GBranch_Long_C` | [UBranchAIComponent](#sec-ubranchaicomponent) | blueprint | 8 | 171, 175 | 8626647386, 8626647626 |
| `GBridgeFlexibleCave_C` | [UBridgeFlexibleAIComponent](#sec-ubridgeflexibleaicomponent) | name | 8 | 212, 221, 232 | 8626647386 |
| `GBridgeFlexible_C` | [UBridgeFlexibleAIComponent](#sec-ubridgeflexibleaicomponent) | name | 13 | 212, 216, 220, 224, 232 | 8626647386, 8626647626 |
| `GBridgeStation_C` | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) | family | 116 | 163, 167, 175, 179, 199 | 8626647386, 8626647418, 8626647626 |
| `GBurning_C` | [UBurningAIComponent](#sec-uburningaicomponent) | name | 268 | 192, 197, 198 | 8626647386 |
| `GBurrowDemejakoClose_C` | [UDemejakoBurrowAIComponent](#sec-udemejakoburrowaicomponent) | blueprint | 1 | 31 | 8626647386 |
| `GBurrowDemejako_C` | [UDemejakoBurrowAIComponent](#sec-udemejakoburrowaicomponent) | blueprint | 3 | 25, 32 | 8626647386, 8626647418 |
| `GBurrow_C` | [UBurrowAIComponent](#sec-uburrowaicomponent) | blueprint | 6 | 13, 15, 17 | 8626647386, 8626647418 |
| `GCapturePoint_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GCaptureThrowPoint_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GChappy_C` | [UChappyAIComponent](#sec-uchappyaicomponent) | blueprint | 11 | 171, 298, 301, 307 | 8626647386 |
| `GCharacterEditPortal_C` | (none) | no AI.Static bytes | 3 | 0 | 8626647386 |
| `GCharcoal_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 19 | 155, 159 | 8626647386, 8626647418 |
| `GChaser_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 1 | 159 | 8626647386 |
| `GCirculatorLeanForHeroArea010_C` | [UCirculatorAIComponent](#sec-ucirculatoraicomponent) | blueprint | 1 | 180 | 8626647386 |
| `GCirculatorLeanForWorkingOnlyDay_C` | [UCirculatorAIComponent](#sec-ucirculatoraicomponent) | blueprint | 1 | 180 | 8626647386 |
| `GCirculatorLeanPurple_C` | [UCirculatorAIComponent](#sec-ucirculatoraicomponent) | blueprint | 3 | 184, 194 | 8626647386 |
| `GCirculatorLean_C` | [UCirculatorAIComponent](#sec-ucirculatoraicomponent) | blueprint | 19 | 184, 189, 194 | 8626647386, 8626647418 |
| `GCirculatorPurple_C` | [UCirculatorAIComponent](#sec-ucirculatoraicomponent) | blueprint | 1 | 194 | 8626647386 |
| `GCirculatorRed_C` | [UCirculatorAIComponent](#sec-ucirculatoraicomponent) | blueprint | 3 | 194 | 8626647386 |
| `GCirculator_C` | [UCirculatorAIComponent](#sec-ucirculatoraicomponent) | blueprint | 4 | 184, 185 | 8626647386 |
| `GColdBox_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 12 | 155, 253, 274 | 8626647386 |
| `GConveyor265uu_C` | [UConveyorBaseAIComponent](#sec-uconveyorbaseaicomponent) | blueprint | 31 | 172, 176 | 8626647386, 8626647418 |
| `GConveyorNav_C` | [UConveyorNavAIComponent](#sec-uconveyornavaicomponent) | blueprint | 19 | 328 | 8626647386 |
| `GConveyorParts00_C` | (none) | no AI.Static bytes | 28 | 0 | 8626647386, 8626647418 |
| `GCrackPlanterDouble_C` | [UCrackPotAIComponent](#sec-ucrackpotaicomponent) | blueprint | 3 | 163, 270, 281 | 8626647386 |
| `GCrackPlanter_C` | [UCrackPotAIComponent](#sec-ucrackpotaicomponent) | blueprint | 7 | 163, 285, 286 | 8626647386 |
| `GCrackPotLAnother_C` | [UCrackPotAIComponent](#sec-ucrackpotaicomponent) | blueprint | 17 | 163, 167, 274, 283, 286 | 8626647386, 8626647626 |
| `GCrackPotL_C` | [UCrackPotAIComponent](#sec-ucrackpotaicomponent) | blueprint | 85 | 163, 167, 261, 270, 271, 272… | 8626647386, 8626647418, 8626647626 |
| `GCrackPotSAnother_C` | [UCrackPotAIComponent](#sec-ucrackpotaicomponent) | blueprint | 47 | 163, 167, 261, 274, 282 | 8626647386, 8626647418, 8626647626 |
| `GCrackPotS_C` | [UCrackPotAIComponent](#sec-ucrackpotaicomponent) | blueprint | 110 | 163, 167, 261, 274, 282, 284… | 8626647386, 8626647418, 8626647626 |
| `GCrushJelly_L_C` | [UCrushJellyAIComponent](#sec-ucrushjellyaicomponent) | blueprint | 9 | 163, 178, 179, 181, 185, 306 | 8626647386, 8626647418 |
| `GCrushJelly_M_C` | [UCrushJellyAIComponent](#sec-ucrushjellyaicomponent) | blueprint | 34 | 163, 167, 174, 175, 179, 180… | 8626647386, 8626647418 |
| `GCrushJelly_S_C` | [UCrushJellyAIComponent](#sec-ucrushjellyaicomponent) | blueprint | 14 | 163, 270, 274, 276, 281, 282… | 8626647386, 8626647418 |
| `GCushionA_C` | [UCushionAIComponent](#sec-ucushionaicomponent) | blueprint | 3 | 179 | 8626647386 |
| `GCushionB_C` | [UCushionAIComponent](#sec-ucushionaicomponent) | blueprint | 3 | 179 | 8626647386 |
| `GCushionC_C` | [UCushionAIComponent](#sec-ucushionaicomponent) | blueprint | 3 | 179 | 8626647386 |
| `GCushionD_C` | [UCushionAIComponent](#sec-ucushionaicomponent) | blueprint | 3 | 179 | 8626647386 |
| `GDamagumoCannon_C` | [UDamagumoCannonAIComponent](#sec-udamagumocannonaicomponent) | blueprint | 3 | 394, 566, 703 | 8626647386, 8626647418 |
| `GDemejako_C` | [UDemejakoAIComponent](#sec-udemejakoaicomponent) | blueprint | 5 | 302, 304, 308, 319, 472 | 8626647386, 8626647418 |
| `GDemoAreaBox_C` | (none) | no AI.Static bytes | 13 | 0 | 8626647386 |
| `GDemoAreaSphere_C` | (none) | no AI.Static bytes | 9 | 0 | 8626647386 |
| `GDemoBossInu_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GDemoWarpPoint_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GDiscoDamagumo_C` | [UDamagumoBaseAIComponent](#sec-udamagumobaseaicomponent) | blueprint | 1 | 477 | 8626647418 |
| `GDodoroEgg_C` | [UDodoroEggAIComponent](#sec-udodoroeggaicomponent) | name | 11 | 347, 361, 362, 509 | 8626647386, 8626647418 |
| `GDokuNameko_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 1 | 446 | 8626647418 |
| `GDolphinArea500After_C` | [UPodAIComponent](#sec-upodaicomponent) | blueprint | 2 | 4 | 8626647386 |
| `GDolphinArea500Before_C` | [UPodAIComponent](#sec-upodaicomponent) | blueprint | 1 | 4 | 8626647386 |
| `GDolphin_C` | [UPodAIComponent](#sec-upodaicomponent) | blueprint | 6 | 4 | 8626647386, 8626647626 |
| `GDorombo_C` | [UAmemboAIComponent](#sec-uamemboaicomponent) | blueprint | 9 | 179 | 8626647386 |
| `GDownPortal_C` | [UPortalBaseAIComponent](#sec-uportalbaseaicomponent) | blueprint | 77 | 159, 163, 171 | 8626647386, 8626647418 |
| `GDownWallSidecut_C` | [UDownFloorAIComponent](#sec-udownflooraicomponent) | family | 1 | 159 | 8626647386 |
| `GDownWall_C` | [UDownFloorAIComponent](#sec-udownflooraicomponent) | family | 9 | 159, 163 | 8626647386, 8626647418, 8626647626 |
| `GDungeonExit_C` | [UPortalBaseAIComponent](#sec-uportalbaseaicomponent) | blueprint | 31 | 159, 163, 195 | 8626647386, 8626647418 |
| `GEgg_C` | [UEggAIComponent](#sec-ueggaicomponent) | name | 155 | 269, 274, 279, 280, 290, 296… | 8626647386, 8626647418 |
| `GElecMushi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 4 | 159 | 8626647386 |
| `GElecOtakara_C` | [UDweevilBaseAIComponent](#sec-udweevilbaseaicomponent) | blueprint | 3 | 211 | 8626647386 |
| `GElecSenbei_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 1 | 286 | 8626647386 |
| `GExcavationL_C` | [UExcavationAIComponent](#sec-uexcavationaicomponent) | blueprint | 5 | 163, 167 | 8626647386, 8626647418 |
| `GExcavationM_C` | [UExcavationAIComponent](#sec-uexcavationaicomponent) | blueprint | 46 | 163, 167 | 8626647386, 8626647418 |
| `GExcavationOnyonTutorial_C` | [UExcavationAIComponent](#sec-uexcavationaicomponent) | blueprint | 1 | 163 | 8626647386 |
| `GExcavationOnyon_C` | [UExcavationAIComponent](#sec-uexcavationaicomponent) | blueprint | 15 | 163, 167 | 8626647386, 8626647418, 8626647626 |
| `GExcavationPanmodokiSoilM_C` | (none) | no AI.Static bytes | 4 | 0 | 8626647386 |
| `GExcavationPanmodokiSoilS_C` | (none) | no AI.Static bytes | 6 | 0 | 8626647386 |
| `GExcavationS_C` | [UExcavationAIComponent](#sec-uexcavationaicomponent) | blueprint | 30 | 163, 167 | 8626647386, 8626647626 |
| `GExcavationUnderS_C` | [UExcavationAIComponent](#sec-uexcavationaicomponent) | blueprint | 8 | 163, 167 | 8626647386, 8626647418 |
| `GExcavationUnder_C` | [UExcavationAIComponent](#sec-uexcavationaicomponent) | blueprint | 10 | 163, 167 | 8626647386, 8626647418 |
| `GExtraCavePortal_C` | (none) | no AI.Static bytes | 9 | 0 | 8626647386, 8626647418 |
| `GFenceFallNoSideColNoSE_C` | [UFenceFallAIComponent](#sec-ufencefallaicomponent) | blueprint | 3 | 259 | 8626647386 |
| `GFenceFall_C` | [UFenceFallAIComponent](#sec-ufencefallaicomponent) | blueprint | 41 | 259, 263 | 8626647386, 8626647418 |
| `GFenceNoSideCol_C` | [UFenceFallAIComponent](#sec-ufencefallaicomponent) | blueprint | 11 | 231, 235 | 8626647386 |
| `GFence_C` | [UFenceFallAIComponent](#sec-ufencefallaicomponent) | blueprint | 48 | 231, 235 | 8626647386, 8626647418, 8626647626 |
| `GFireChappy_C` | [UFireChappyAIComponent](#sec-ufirechappyaicomponent) | blueprint | 6 | 187, 314, 476, 484 | 8626647386, 8626647418 |
| `GFireFloor175uu_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 8 | 251, 255 | 8626647386, 8626647418 |
| `GFireFloor350uu_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 8 | 251 | 8626647386 |
| `GFireFloor525uu_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 4 | 251 | 8626647386 |
| `GFireOtakara_C` | [UDweevilBaseAIComponent](#sec-udweevilbaseaicomponent) | blueprint | 8 | 211, 215 | 8626647386, 8626647418 |
| `GFireTank_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 19 | 159, 286, 290, 298 | 8626647386, 8626647418 |
| `GFormationAlignBox_C` | (none) | no AI.Static bytes | 12 | 0 | 8626647386 |
| `GFrog_C` | [UFrogAIComponent](#sec-ufrogaicomponent) | blueprint | 8 | 342 | 8626647386 |
| `GFutakuchiAdult_C` | [UFutakuchiAdultAIComponent](#sec-ufutakuchiadultaicomponent) | blueprint | 4 | 310, 446, 596, 599 | 8626647386, 8626647418 |
| `GFutakuchi_C` | [UFutakuchiAIComponent](#sec-ufutakuchiaicomponent) | blueprint | 17 | 266, 267, 268, 270, 271 | 8626647386, 8626647418 |
| `GFuurosouA_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 9 | 155 | 8626647386 |
| `GFuurosouB_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 5 | 155 | 8626647386 |
| `GGasKogane_C` | [UGasKoganeAIComponent](#sec-ugaskoganeaicomponent) | blueprint | 3 | 1365 | 8626647386 |
| `GGasOtakara_C` | [UDweevilBaseAIComponent](#sec-udweevilbaseaicomponent) | blueprint | 5 | 211, 215 | 8626647386, 8626647418 |
| `GGateRock175uu_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 15 | 183, 187, 540, 897 | 8626647386, 8626647418 |
| `GGateRock200uu_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 1 | 897 | 8626647386 |
| `GGateRock275uu_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 5 | 897 | 8626647386 |
| `GGateRock300uu_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 4 | 897 | 8626647386 |
| `GGateRock325uu_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 1 | 897 | 8626647386 |
| `GGenericPoolActor_C` | (none) | no AI.Static bytes | 6 | 0 | 8626647386 |
| `GGenseiZukanPortal_C` | (none) | no AI.Static bytes | 3 | 0 | 8626647386 |
| `GGeyser_C` | [UGeyserAIComponent](#sec-ugeyseraicomponent) | blueprint | 43 | 214, 218 | 8626647386, 8626647626 |
| `GGroupDropManager_C` | [UGroupDropManagerComponent](#sec-ugroupdropmanagercomponent) | blueprint | 53 | 196, 198, 202, 203, 207, 209… | 8626647386, 8626647418 |
| `GHIddenBox_Amamo_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 17 | 155 | 8626647386 |
| `GHIddenBox_Heuchera01_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 18 | 155, 159 | 8626647386, 8626647626 |
| `GHIddenBox_Heuchera02_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 28 | 155 | 8626647386 |
| `GHageDamagumo_C` | [UHageDamagumoAIComponent](#sec-uhagedamagumoaicomponent) | blueprint | 8 | 365, 372, 471, 546 | 8626647386, 8626647418 |
| `GHambo_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 18 | 159 | 8626647386 |
| `GHanachirashi_C` | [UHanachirashiAIComponent](#sec-uhanachirashiaicomponent) | blueprint | 4 | 169, 296, 308 | 8626647386 |
| `GHandleBoardYellow_C` | [UHandleBoardAIComponent](#sec-uhandleboardaicomponent) | name | 8 | 187, 191, 195, 199, 201 | 8626647386, 8626647626 |
| `GHandleBoard_C` | [UHandleBoardAIComponent](#sec-uhandleboardaicomponent) | name | 10 | 187, 191, 207 | 8626647386, 8626647626 |
| `GHappyDoor_C` | [UHappyDoorAIComponent](#sec-uhappydooraicomponent) | blueprint | 16 | 173 | 8626647386 |
| `GHappyPointActorPullNekkoTutorial_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GHappy_C` | (none) | no AI.Static bytes | 4 | 0 | 8626647386 |
| `GHari_C` | [UHariAIComponent](#sec-uhariaicomponent) | blueprint | 9 | 295, 425, 427, 428, 434, 574… | 8626647386, 8626647418 |
| `GHariuo_C` | [UHariuoAIComponent](#sec-uhariuoaicomponent) | blueprint | 16 | 163, 290 | 8626647386 |
| `GHibaBubble_C` | [UHibaBaseAIComponent](#sec-uhibabaseaicomponent) | blueprint | 27 | 159 | 8626647386 |
| `GHibaDenki_C` | [UHibaBaseAIComponent](#sec-uhibabaseaicomponent) | blueprint | 8 | 159, 163 | 8626647386, 8626647418 |
| `GHibaIce_C` | [UHibaBaseAIComponent](#sec-uhibabaseaicomponent) | blueprint | 11 | 159, 163 | 8626647386, 8626647418 |
| `GHibaPoison_C` | [UHibaBaseAIComponent](#sec-uhibabaseaicomponent) | blueprint | 7 | 159 | 8626647386 |
| `GHibaWater_C` | [UHibaBaseAIComponent](#sec-uhibabaseaicomponent) | blueprint | 31 | 159 | 8626647386 |
| `GHiba_C` | [UHibaBaseAIComponent](#sec-uhibabaseaicomponent) | blueprint | 29 | 159, 163 | 8626647386, 8626647418 |
| `GHiddenBoxRoomDark_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 3 | 155 | 8626647386 |
| `GHiddenBoxRoom_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 13 | 155 | 8626647386 |
| `GHikariStation_C` | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) | family | 396 | 163 | 8626647386 |
| `GHikarikinoko_C` | [UHikariKinokoAIComponent](#sec-uhikarikinokoaicomponent) | name | 34 | 155 | 8626647386 |
| `GHoneyLevelPlacement_C` | (none) | no AI.Static bytes | 3 | 0 | 8626647386 |
| `GIceBomb_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GIceChappy_C` | [UTekiAIComponent](#sec-utekiaicomponent) | base | 12 | 159, 285, 286, 292 | 8626647386 |
| `GIceFrog_C` | [UFrogAIComponent](#sec-ufrogaicomponent) | blueprint | 2 | 342 | 8626647386 |
| `GIceKochappy_C` | [UKochappyAIComponent](#sec-ukochappyaicomponent) | blueprint | 16 | 163 | 8626647386 |
| `GIceMar_C` | [UMarAIComponent](#sec-umaraicomponent) | blueprint | 4 | 207, 326, 334, 506 | 8626647386 |
| `GIceOtakara_C` | [UDweevilBaseAIComponent](#sec-udweevilbaseaicomponent) | blueprint | 3 | 211 | 8626647386 |
| `GIceSenbei_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 2 | 159, 436 | 8626647386 |
| `GIceTank_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 10 | 159, 286 | 8626647386 |
| `GIcicleClose_C` | [UIcicleAIComponent](#sec-uicicleaicomponent) | name | 4 | 171 | 8626647386 |
| `GIcicleUp_C` | [UIcicleAIComponent](#sec-uicicleaicomponent) | name | 20 | 171 | 8626647386 |
| `GIcicle_C` | [UIcicleAIComponent](#sec-uicicleaicomponent) | name | 10 | 171 | 8626647386 |
| `GInvisibleWallForWarpCarry_C` | (none) | no AI.Static bytes | 16 | 0 | 8626647386 |
| `GIwakkoCrystal_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 25 | 159, 286 | 8626647386 |
| `GIwakko_C` | [UIwakkoAIComponent](#sec-uiwakkoaicomponent) | blueprint | 21 | 163, 167, 290 | 8626647386, 8626647418 |
| `GJumpPoint_Kitchen_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GJumpPoint_LivingRoom_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GKaburi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 8 | 159, 286 | 8626647386 |
| `GKajiokoshi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 41 | 159, 163 | 8626647386, 8626647418 |
| `GKanitama_C` | [UKanitamaAIComponent](#sec-ukanitamaaicomponent) | blueprint | 8 | 163, 285, 290, 294 | 8626647386, 8626647418 |
| `GKareHambo_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 10 | 159 | 8626647386 |
| `GKemekuji_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 13 | 286, 293, 296 | 8626647386, 8626647418 |
| `GKingChappy_C` | [UKingChappyBaseAIComponent](#sec-ukingchappybaseaicomponent) | blueprint | 14 | 183, 187, 316 | 8626647386, 8626647418 |
| `GKinkaiStation_C` | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) | family | 108 | 163, 167, 175 | 8626647386, 8626647418 |
| `GKinoKajiokoshi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 23 | 159, 163, 292 | 8626647386, 8626647418 |
| `GKinoKochappy_C` | [UKochappyAIComponent](#sec-ukochappyaicomponent) | blueprint | 52 | 163, 296, 300 | 8626647386, 8626647418 |
| `GKochappy_C` | [UKochappyAIComponent](#sec-ukochappyaicomponent) | blueprint | 44 | 163, 167 | 8626647386, 8626647418 |
| `GKogane_C` | [UKoganeBaseAIComponent](#sec-ukoganebaseaicomponent) | name | 12 | 1074, 1121, 1145, 1161, 1182 | 8626647386, 8626647418 |
| `GKogani_C` | [UKoganiAIComponent](#sec-ukoganiaicomponent) | blueprint | 27 | 163, 167 | 8626647386, 8626647418 |
| `GKomushL_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | name | 20 | 163 | 8626647386 |
| `GKomushS_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | name | 1 | 163 | 8626647386 |
| `GKomush_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | name | 33 | 163, 167, 290 | 8626647386, 8626647626 |
| `GKonro_C` | [UHibaBaseAIComponent](#sec-uhibabaseaicomponent) | blueprint | 2 | 159 | 8626647386 |
| `GKumaChappy_C` | [UKumaChappyAIComponent](#sec-ukumachappyaicomponent) | blueprint | 14 | 187, 446, 447, 451, 476 | 8626647386, 8626647418 |
| `GKumaKochappy_C` | [UFollowKochappyBaseAIComponent](#sec-ufollowkochappybaseaicomponent) | blueprint | 38 | 332, 336 | 8626647386, 8626647418 |
| `GKurage_C` | [UKurageAIComponent](#sec-ukurageaicomponent) | blueprint | 11 | 201, 340 | 8626647386 |
| `GKurione_C` | [UKurioneAIComponent](#sec-ukurioneaicomponent) | blueprint | 34 | 393, 397 | 8626647386, 8626647418 |
| `GLookTrigger_C` | (none) | no AI.Static bytes | 28 | 0 | 8626647386 |
| `GLucky_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GMadoriArena_C` | [UPortalBaseAIComponent](#sec-uportalbaseaicomponent) | family | 6 | 159, 163, 171 | 8626647386, 8626647626 |
| `GMadoriPoko_C` | [UPortalBaseAIComponent](#sec-uportalbaseaicomponent) | family | 14 | 159, 163, 171, 195 | 8626647386, 8626647626 |
| `GMadoriRuinsForExit_C` | [UPortalBaseAIComponent](#sec-uportalbaseaicomponent) | family | 6 | 159, 163, 171 | 8626647386, 8626647626 |
| `GMadoriRuins_C` | [UPortalBaseAIComponent](#sec-uportalbaseaicomponent) | family | 24 | 159, 163, 171, 183, 195 | 8626647386, 8626647626 |
| `GMar_C` | [UMarAIComponent](#sec-umaraicomponent) | blueprint | 8 | 207, 326, 337, 339, 346, 511 | 8626647386, 8626647418 |
| `GMarigumoNet_C` | [UTamagumoNetAIComponent](#sec-utamagumonetaicomponent) | blueprint | 6 | 163, 175, 187 | 8626647386 |
| `GMarigumoNet_Low_C` | [UTamagumoNetAIComponent](#sec-utamagumonetaicomponent) | blueprint | 7 | 163, 175 | 8626647386 |
| `GMaroFrog_C` | [UFrogAIComponent](#sec-ufrogaicomponent) | blueprint | 8 | 215, 342, 346 | 8626647386, 8626647418 |
| `GMiniMochi_C` | [UMiniMochiAIComponent](#sec-uminimochiaicomponent) | blueprint | 6 | 20 | 8626647386, 8626647418 |
| `GMitsuMochi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 2 | 159, 442 | 8626647386, 8626647418 |
| `GMiulin_C` | [UMiulinAIComponent](#sec-umiulinaicomponent) | blueprint | 3 | 163, 291, 458 | 8626647386, 8626647418 |
| `GMizunukiAnother_C` | [UMizunukiAIComponent](#sec-umizunukiaicomponent) | blueprint | 1 | 174 | 8626647386 |
| `GMizunukiIndoorAnother_C` | [UMizunukiAIComponent](#sec-umizunukiaicomponent) | blueprint | 1 | 168 | 8626647386 |
| `GMizunukiIndoor_C` | [UMizunukiAIComponent](#sec-umizunukiaicomponent) | blueprint | 2 | 168 | 8626647386 |
| `GMizunuki_C` | [UMizunukiAIComponent](#sec-umizunukiaicomponent) | blueprint | 1 | 174 | 8626647386 |
| `GMoveFloorHappy_C` | [UMoveFloorAIComponent](#sec-umoveflooraicomponent) | blueprint | 12 | 325, 329 | 8626647386, 8626647418 |
| `GMoveFloorHover_C` | [UMoveFloorAIComponent](#sec-umoveflooraicomponent) | blueprint | 6 | 353 | 8626647386 |
| `GMoveFloorRound_C` | [UMoveFloorAIComponent](#sec-umoveflooraicomponent) | blueprint | 2 | 520 | 8626647386 |
| `GMoveFloorSlowTrigger_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GMoveFloor_C` | [UMoveFloorAIComponent](#sec-umoveflooraicomponent) | blueprint | 10 | 325 | 8626647386 |
| `GMultiBlockArea006_BossStone_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 1 | 155 | 8626647386 |
| `GMultiBlockArea500_01A_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 3 | 155 | 8626647386 |
| `GMultiBlockArea500_01B_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 2 | 155 | 8626647386 |
| `GMultiBlockArea500_02A_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 3 | 155 | 8626647386 |
| `GMultiBlockArea500_02B_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 2 | 155 | 8626647386 |
| `GMultiBlockArea500_03A_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 3 | 155 | 8626647386 |
| `GMultiBlockArea500_03B_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 2 | 155 | 8626647386 |
| `GMultiBlockArea500_Cave_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GMushL_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 4 | 163, 269 | 8626647386 |
| `GMushS_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 3 | 163, 167 | 8626647386, 8626647626 |
| `GMush_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 9 | 163, 167, 273, 290 | 8626647386, 8626647626 |
| `GNamazu_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 75 | 159, 292, 296 | 8626647386, 8626647418 |
| `GNarrowSpaceBoxLinkObj_C` | (none) | no AI.Static bytes | 12 | 0 | 8626647386, 8626647626 |
| `GNarrowSpaceBoxSplineCamera_C` | (none) | no AI.Static bytes | 9 | 0 | 8626647386 |
| `GNarrowSpaceBox_C` | (none) | no AI.Static bytes | 114 | 0 | 8626647386, 8626647418, 8626647626 |
| `GNavMeshTriggerClear_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 184 | 203, 207 | 8626647386, 8626647626 |
| `GNavMeshTriggerLinkForSplash_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 8 | 155 | 8626647386 |
| `GNavMeshTrigger_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 113 | 155, 159 | 8626647386, 8626647626 |
| `GNavModifierVolumeForSwampBox_C` | (none) | no AI.Static bytes | 51 | 0 | 8626647386, 8626647418 |
| `GNeji_C` | (none) | no AI.Static bytes | 4 | 0 | 8626647386 |
| `GNightChappy_C` | [UChappyAIComponent](#sec-uchappyaicomponent) | blueprint | 11 | 304, 308, 458 | 8626647386, 8626647418 |
| `GNightFireChappy_C` | [UFireChappyAIComponent](#sec-ufirechappyaicomponent) | blueprint | 3 | 320 | 8626647386 |
| `GNightFrog_C` | [UFrogAIComponent](#sec-ufrogaicomponent) | blueprint | 2 | 342 | 8626647386 |
| `GNightKaburi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 19 | 159, 265, 292 | 8626647386 |
| `GNightKareHambo_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 43 | 159, 292 | 8626647386 |
| `GNightKochappy_C` | [UNightKochappyAIComponent](#sec-unightkochappyaicomponent) | blueprint | 51 | 226, 355 | 8626647386, 8626647418 |
| `GNightMar_C` | [UMarAIComponent](#sec-umaraicomponent) | blueprint | 6 | 330, 340 | 8626647386, 8626647418 |
| `GNightTobiKaburi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 12 | 159, 265, 292 | 8626647386 |
| `GNightTobinko_C` | [UTobinkoAIComponent](#sec-utobinkoaicomponent) | blueprint | 37 | 290, 296, 300 | 8626647386, 8626647418 |
| `GNiseBoss_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 3 | 265, 461, 468 | 8626647386, 8626647418 |
| `GNiseZako_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 14 | 286, 290, 298 | 8626647386, 8626647418 |
| `GNomi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 56 | 159, 292 | 8626647386 |
| `GNoraSpawnerHeadLock_C` | [UNoraSpawnerAIComponent](#sec-unoraspawneraicomponent) | blueprint | 97 | 107, 179, 191, 252, 264 | 8626647386, 8626647418 |
| `GNoraSpawnerPikminLock_C` | [UNoraSpawnerAIComponent](#sec-unoraspawneraicomponent) | blueprint | 70 | 107, 119, 179, 191, 252, 264 | 8626647386, 8626647418 |
| `GNoraSpawnerPongashiLock_C` | [UNoraSpawnerAIComponent](#sec-unoraspawneraicomponent) | blueprint | 93 | 107, 119, 179, 191, 203, 215… | 8626647386, 8626647418 |
| `GNoraSpawnerPrologue_C` | [UNoraSpawnerAIComponent](#sec-unoraspawneraicomponent) | blueprint | 102 | 247, 248, 249, 251, 252, 260… | 8626647386 |
| `GNpcEditGuide_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 2 | 224, 227 | 8626647386 |
| `GNpcEditLeafPoko_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 11 | 184 | 8626647386 |
| `GNpcEditLeaf_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 36 | 133, 134, 137, 145, 146, 158… | 8626647386 |
| `GNpcEdit_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 62 | 134, 135, 137, 139, 145, 146… | 8626647386 |
| `GNpcLouieDDB_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 2 | 134 | 8626647386 |
| `GNpcLouieLast_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 1 | 134 | 8626647386 |
| `GNpcLouie_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 8 | 134 | 8626647386 |
| `GNpcLucky_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 10 | 133 | 8626647386 |
| `GNpcOlimarLeafDDB_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 4 | 135 | 8626647386 |
| `GNpcOlimarLeaf_C` | [UNpcAIComponent](#sec-unpcaicomponent) | name | 5 | 135, 183, 192 | 8626647386 |
| `GNpcPlaceActor_C` | (none) | no AI.Static bytes | 40 | 0 | 8626647386 |
| `GNumaSuitori_C` | [UNumaSuitoriAIComponent](#sec-unumasuitoriaicomponent) | blueprint | 6 | 191, 338 | 8626647386 |
| `GOjamaBlockAir_C` | (none) | no AI.Static bytes | 234 | 0 | 8626647386, 8626647418, 8626647626 |
| `GOjamaBlockRoom02_C` | (none) | no AI.Static bytes | 12 | 0 | 8626647386 |
| `GOjamaBlockRoomDuo_C` | (none) | no AI.Static bytes | 4 | 0 | 8626647386 |
| `GOjamaBlockRoom_C` | (none) | no AI.Static bytes | 10 | 0 | 8626647386 |
| `GOjamaBlockWoodPartsB_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GOjamaBlockWoodParts_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GOjamaBlock_C` | (none) | no AI.Static bytes | 4 | 0 | 8626647626 |
| `GOnyonBootUpRed_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOnyonCamp01_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 11 | 207, 211, 222, 223, 230, 235… | 8626647386, 8626647626 |
| `GOnyonCamp02_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 3 | 207, 211, 226 | 8626647386, 8626647626 |
| `GOnyonCamp03_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 6 | 207, 221, 222, 225 | 8626647386 |
| `GOnyonCamp04_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 3 | 207 | 8626647386 |
| `GOnyonCampDummy_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 3 | 207 | 8626647386 |
| `GOnyonCampSimple_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 31 | 207, 216, 217 | 8626647386 |
| `GOnyonCampZukan_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 1 | 207 | 8626647386 |
| `GOnyonCamp_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 3 | 211, 219, 224 | 8626647386, 8626647626 |
| `GOnyonCarryBlue_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 61 | 8626647386, 8626647418 |
| `GOnyonCarryBoost_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 19 | 49, 61, 73 | 8626647386, 8626647626 |
| `GOnyonCarryIce_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOnyonCarryPink_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOnyonCarryPurple_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOnyonCarryStone_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOnyonCarryWhite_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOnyonCarryYellow_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49 | 8626647386, 8626647626 |
| `GOnyonDummy_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 2 | 363 | 8626647386 |
| `GOnyonVS_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 24 | 363 | 8626647386 |
| `GOnyon_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 14 | 363, 367 | 8626647386, 8626647626 |
| `GOoAshibaKinokoNarrow_C` | [UOoAshibaKinokoAIComponent](#sec-uooashibakinokoaicomponent) | blueprint | 2 | 223 | 8626647386 |
| `GOoAshibaKinoko_C` | [UOoAshibaKinokoAIComponent](#sec-uooashibakinokoaicomponent) | blueprint | 6 | 223 | 8626647386 |
| `GOoKogane_C` | [UKoganeBaseAIComponent](#sec-ukoganebaseaicomponent) | name | 4 | 768, 804, 938 | 8626647386 |
| `GOoKurage_C` | [UKurageAIComponent](#sec-ukurageaicomponent) | blueprint | 3 | 340 | 8626647386 |
| `GOoPanModoki_C` | [UPanModokiBaseAIComponent](#sec-upanmodokibaseaicomponent) | blueprint | 2 | 470, 499 | 8626647418 |
| `GOoinu_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 6 | 155, 159 | 8626647386, 8626647626 |
| `GOta3DMegane_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaAmmolite_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647418 |
| `GOtaApricot_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 61 | 8626647386, 8626647418 |
| `GOtaAvocado_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386 |
| `GOtaBanana_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386, 8626647418 |
| `GOtaBankCardA_C` | [UOtaBankCardAIComponent](#sec-uotabankcardaicomponent) | name | 1 | 61 | 8626647386 |
| `GOtaBankCardB_C` | [UOtaBankCardAIComponent](#sec-uotabankcardaicomponent) | name | 1 | 61 | 8626647386 |
| `GOtaBankCardBlank2_C` | [UOtaBankCardAIComponent](#sec-uotabankcardaicomponent) | name | 1 | 49 | 8626647386 |
| `GOtaBankCardBlank_C` | [UOtaBankCardAIComponent](#sec-uotabankcardaicomponent) | name | 1 | 49 | 8626647386 |
| `GOtaBankCardC_C` | [UOtaBankCardAIComponent](#sec-uotabankcardaicomponent) | name | 1 | 61 | 8626647386 |
| `GOtaBankCardD_C` | [UOtaBankCardAIComponent](#sec-uotabankcardaicomponent) | name | 1 | 61 | 8626647386 |
| `GOtaBankCardE_C` | [UOtaBankCardAIComponent](#sec-uotabankcardaicomponent) | name | 1 | 61 | 8626647386 |
| `GOtaBankCardF_C` | [UOtaBankCardAIComponent](#sec-uotabankcardaicomponent) | name | 1 | 49 | 8626647386 |
| `GOtaBilliardBall1_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaBilliardBall2_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaBilliardBall3_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386 |
| `GOtaBilliardBall4_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaBilliardBall5_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaBilliardBall6_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386 |
| `GOtaBilliardBall7_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaBilliardBall8_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaBilliardBall9_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386 |
| `GOtaBilliardBallCue_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaBiwa_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49 | 8626647386 |
| `GOtaBoardEraser_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaBoat_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 5 | 49 | 8626647386 |
| `GOtaBottle_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaBrushB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaButtonMetal_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaButtonPlastic_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaButtonWood_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaCandle_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaCandyStick_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386 |
| `GOtaCardDentaku_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaCasinoChip100_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49 | 8626647386 |
| `GOtaCasinoChip1_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 6 | 49 | 8626647386 |
| `GOtaCasinoChip25_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaCasinoChip50_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaCastanets_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49 | 8626647386 |
| `GOtaCherry_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 10 | 49 | 8626647386 |
| `GOtaCompass_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaCounter_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaCroissant_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaDarts_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386 |
| `GOtaDaruma_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaDekopon_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaDentaku_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaDice12_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386 |
| `GOtaDice20_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386 |
| `GOtaDice4Sided_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaDoguHead_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaDragonFruit_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 73 | 8626647386, 8626647418 |
| `GOtaDuckL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 8 | 49, 61 | 8626647386 |
| `GOtaDuckM_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 14 | 49, 61 | 8626647386 |
| `GOtaDuckS_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 5 | 49, 61 | 8626647386, 8626647418 |
| `GOtaEclair_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 73 | 8626647386 |
| `GOtaEffectsUnit_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaEggplant_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 5 | 49, 61 | 8626647386, 8626647418 |
| `GOtaEngageRing_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaFeeddish_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 85 | 8626647386 |
| `GOtaFieldGlass_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaFingerBoard_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaFishCruet_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 8 | 49, 61 | 8626647386, 8626647418 |
| `GOtaFruitsPickBLU_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 73, 85 | 8626647386, 8626647418 |
| `GOtaFruitsPickGRN_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49 | 8626647386 |
| `GOtaFruitsPickORN_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaFruitsPickPNK_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386 |
| `GOtaFruitsPickYEL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647418 |
| `GOtaGBARomBLK_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaGBARomYEL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaGBASP_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaGBMicroFC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaGCConWb_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaGaragara_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaGoddess_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647418 |
| `GOtaGoldBar_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaGoldfish_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386 |
| `GOtaGolfBall_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 61 | 8626647418 |
| `GOtaGrape_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 61 | 8626647386, 8626647418 |
| `GOtaGrapefruit_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386 |
| `GOtaGripper_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHairPin_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHanafudaA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaHanafudaB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaHanafudaD_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHandSpinner_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHandbell_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 61 | 8626647386 |
| `GOtaHardBall_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaHarmonica_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49 | 8626647386 |
| `GOtaHeroPartsAA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647626 |
| `GOtaHeroPartsAB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaHeroPartsAD_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 73 | 8626647386 |
| `GOtaHeroPartsA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647626 |
| `GOtaHeroPartsC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaHeroPartsF_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647626 |
| `GOtaHeroPartsH_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsI_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsJ_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaHeroPartsK_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647626 |
| `GOtaHeroPartsM_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsN_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsO_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647626 |
| `GOtaHeroPartsP_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsQ_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsR_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsU_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsV_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647626 |
| `GOtaHeroPartsW_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHeroPartsX_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaHeroPartsY_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaHimeFork_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaHornBell_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 61 | 8626647386 |
| `GOtaIchigo_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 5 | 49, 61 | 8626647386 |
| `GOtaIchijiku_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49 | 8626647386, 8626647418 |
| `GOtaIsobeyaki_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49 | 8626647386 |
| `GOtaJamIchigo_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaJoyConL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaKaki_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 19 | 49, 61 | 8626647386 |
| `GOtaKendamaA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaKendamaB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaKiwiGLD_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaKiwi_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 73 | 8626647386 |
| `GOtaKushiyaki_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaLemon_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386, 8626647418 |
| `GOtaLightUpRingBLU_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaLightUpRingRED_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386, 8626647418 |
| `GOtaLightUpRingYEL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaLime_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 6 | 49 | 8626647386, 8626647418 |
| `GOtaLoupe_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaMacaronB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaMacaronC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386 |
| `GOtaManekiNeko_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaMango_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386, 8626647418 |
| `GOtaMangosteen_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaMask_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaMatDollLA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 73 | 8626647386 |
| `GOtaMatDollMA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaMatDollMB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaMatDollSA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaMatDollSB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaMelon_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaMikan_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 7 | 49, 61 | 8626647386, 8626647418 |
| `GOtaMoai_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 73 | 8626647418 |
| `GOtaMuscat_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647418 |
| `GOtaMusicBoxA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaMusicBoxB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaMusicBoxC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaNESClassicMini_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaNashi_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 73 | 8626647386, 8626647418 |
| `GOtaOcarinaBRN_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 5 | 49, 61, 73 | 8626647386, 8626647418 |
| `GOtaOshaburiBLU_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPadlock_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647418 |
| `GOtaPaintsAQU_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPaintsBLK_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPaintsBLU_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPaintsGRN_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPaintsPNK_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPaintsPPL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPaintsWHT_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPaintsYEL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPapaya_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPaperCraneBLU_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaPaperCraneGLD_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPaperCraneRED_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 61 | 8626647386, 8626647418 |
| `GOtaPaperballoon_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPeach_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386, 8626647418 |
| `GOtaPeanut_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 73 | 8626647386 |
| `GOtaPhotoframe_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 73 | 8626647386 |
| `GOtaPinBadgeA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPinBadgeC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPinBadgeD_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPinBadgeE_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPlum_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 73 | 8626647418 |
| `GOtaPocketWatch_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPotato_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 7 | 49, 61 | 8626647386, 8626647418 |
| `GOtaPretzel_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386 |
| `GOtaPudding_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPumpkin_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386 |
| `GOtaPuzzleA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647418 |
| `GOtaPuzzleB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPuzzleC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPuzzleD_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPuzzleE_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPuzzleF_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPuzzleH_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPuzzleI_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPuzzleJ_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaPuzzleK_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaPuzzleL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaRailwayLineA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaRailwayLineB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaRailwayLineC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaRailwayLineD_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 97 | 8626647386 |
| `GOtaRailwayLineE_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaRappa_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaRaspberry_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386, 8626647418 |
| `GOtaRingPop_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49 | 8626647386 |
| `GOtaRingo_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 8 | 49 | 8626647386 |
| `GOtaRoboBody_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaRoboHandL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaRoboHead_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaRoboLegL_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaRoboLegR_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaRodan_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaShinjitsu_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaSmallBell_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 5 | 49, 61 | 8626647386 |
| `GOtaSpongeA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49 | 8626647386 |
| `GOtaSpongeB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386 |
| `GOtaSpongeC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49 | 8626647386, 8626647418 |
| `GOtaSqueezer_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaStarFruit_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49, 61 | 8626647386, 8626647418 |
| `GOtaSushiEbi_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GOtaSushiMaguro_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 73 | 8626647386 |
| `GOtaSushiTamago_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 61 | 8626647386 |
| `GOtaSweetPotato_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 8 | 49, 61 | 8626647386, 8626647418 |
| `GOtaTakenoko_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 8 | 49, 61 | 8626647386 |
| `GOtaTakoWiener_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 7 | 49, 61 | 8626647386 |
| `GOtaTennisBall_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaThermometer_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaTomatoM_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 9 | 49, 61 | 8626647386, 8626647418 |
| `GOtaTomatoS_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 4 | 49, 61 | 8626647386, 8626647418 |
| `GOtaToothModel_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaTrainA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaTrainB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaTrainC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaTrilobite_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaVenus_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaWaffle_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 3 | 49, 61 | 8626647386 |
| `GOtaWaterMelon_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647418 |
| `GOtaWhistle_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 5 | 49, 61 | 8626647386, 8626647418 |
| `GOtaYoshiCookieA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 61 | 8626647386 |
| `GOtaYoshiCookieB_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaYoshiCookieC_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaYoshiCookieD_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaYoshiCookieE_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GOtaZucchini_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 5 | 49 | 8626647386 |
| `GOtakaraZukanPortal_C` | (none) | no AI.Static bytes | 3 | 0 | 8626647386 |
| `GOtama_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 15 | 159 | 8626647386 |
| `GPanModokiHideArea_C` | (none) | no AI.Static bytes | 10 | 0 | 8626647386, 8626647418 |
| `GPanModoki_C` | [UPanModokiBaseAIComponent](#sec-upanmodokibaseaicomponent) | blueprint | 5 | 202 | 8626647386 |
| `GPatroller_C` | [UPatrollerAIComponent](#sec-upatrolleraicomponent) | blueprint | 4 | 188, 189 | 8626647386 |
| `GPellet1_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GPellet5_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GPelplant10DDB_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 8 | 26 | 8626647386 |
| `GPelplant10ReviveForHero_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 2 | 26 | 8626647386 |
| `GPelplant10_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 4 | 26 | 8626647386, 8626647418 |
| `GPelplant1DDB_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 100 | 26 | 8626647386 |
| `GPelplant1ReviveForHero_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 37 | 26 | 8626647386, 8626647626 |
| `GPelplant1Revive_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 50 | 26 | 8626647386, 8626647418 |
| `GPelplant1_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 98 | 26 | 8626647386, 8626647418, 8626647626 |
| `GPelplant5DDB_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 38 | 26 | 8626647386 |
| `GPelplant5ReviveForHero_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 8 | 26 | 8626647386, 8626647626 |
| `GPelplant5Revive_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 22 | 26 | 8626647386, 8626647418 |
| `GPelplant5_C` | [UPelplantAIComponent](#sec-upelplantaicomponent) | name | 10 | 26 | 8626647386, 8626647418, 8626647626 |
| `GPelplantTable_C` | (none) | no AI.Static bytes | 14 | 0 | 8626647386 |
| `GPerchTakeOff_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GPerch_C` | (none) | no AI.Static bytes | 7 | 0 | 8626647386 |
| `GPiecePick_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 8 | 167 | 8626647386 |
| `GPikminBlue_C` | (none) | no AI.Static bytes | 10 | 0 | 8626647386 |
| `GPikminRed_C` | (none) | no AI.Static bytes | 23 | 0 | 8626647386 |
| `GPikminWing_C` | (none) | no AI.Static bytes | 5 | 0 | 8626647386 |
| `GPikminYellow_C` | (none) | no AI.Static bytes | 14 | 0 | 8626647386 |
| `GPodCamp01_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 11 | 207, 211 | 8626647386, 8626647626 |
| `GPodCamp02_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 3 | 207, 211 | 8626647386, 8626647626 |
| `GPodCamp03_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 6 | 207 | 8626647386 |
| `GPodCamp04_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 3 | 207 | 8626647386 |
| `GPodCampCave00_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 27 | 207, 211, 218, 221 | 8626647386, 8626647418 |
| `GPodCampCave01_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 35 | 207, 221, 222 | 8626647386 |
| `GPodCampCave02_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 11 | 207, 222 | 8626647386 |
| `GPodCampCave03_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 17 | 207, 224 | 8626647386 |
| `GPodCampDummy_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 3 | 207 | 8626647386 |
| `GPodCampSimple_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 53 | 207, 211, 223, 227 | 8626647386, 8626647418 |
| `GPodCampZukan_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 1 | 207 | 8626647386 |
| `GPodCamp_C` | [UAreaBaseCampComponent](#sec-uareabasecampcomponent) | family | 4 | 207, 211 | 8626647386, 8626647626 |
| `GPod_C` | [UPodAIComponent](#sec-upodaicomponent) | name | 122 | 4 | 8626647386, 8626647418, 8626647626 |
| `GPoisonKomushL_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | name | 6 | 163 | 8626647386 |
| `GPoisonKomushS_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | name | 2 | 163 | 8626647386 |
| `GPoisonMushS_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 3 | 163 | 8626647386 |
| `GPoisonMush_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 1 | 163 | 8626647386 |
| `GPopPlaceActor_C` | (none) | no AI.Static bytes | 1002 | 0 | 8626647386 |
| `GPressFloor_C` | [UPressFloorAIComponent](#sec-upressflooraicomponent) | blueprint | 2 | 201, 207 | 8626647386 |
| `GPullNekkoTutorial_C` | [UPullNekkoAIComponent](#sec-upullnekkoaicomponent) | name | 1 | 187 | 8626647386 |
| `GPullNekko_C` | [UPullNekkoAIComponent](#sec-upullnekkoaicomponent) | name | 13 | 187, 191 | 8626647386, 8626647626 |
| `GQueen_C` | [UQueenAIComponent](#sec-uqueenaicomponent) | blueprint | 3 | 484, 493, 496 | 8626647418 |
| `GQuestAreaBox1_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GQuestAreaBox_C` | (none) | no AI.Static bytes | 82 | 0 | 8626647386, 8626647418 |
| `GQuestAreaSphere_C` | (none) | no AI.Static bytes | 29 | 0 | 8626647386 |
| `GRedShijimi_C` | [UShijimiAIComponent](#sec-ushijimiaicomponent) | blueprint | 9 | 291, 295 | 8626647386, 8626647418 |
| `GRestPoint_Kitchen_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GRestPoint_LivingRoom_C` | (none) | no AI.Static bytes | 5 | 0 | 8626647386 |
| `GRopeBranchSmall_C` | [URopeBranchAIComponent](#sec-uropebranchaicomponent) | name | 4 | 155, 159 | 8626647386, 8626647418 |
| `GRopeBranch_C` | [URopeBranchAIComponent](#sec-uropebranchaicomponent) | name | 22 | 155, 159 | 8626647386, 8626647418 |
| `GRopeFishing_C` | [URopeFishingAIComponent](#sec-uropefishingaicomponent) | name | 7 | 171, 175, 298 | 8626647386, 8626647418 |
| `GRusher_C` | [URusherAIComponent](#sec-urusheraicomponent) | blueprint | 22 | 167, 298, 300, 450 | 8626647386, 8626647418 |
| `GSakadachi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 2 | 299, 443 | 8626647386, 8626647418 |
| `GSarai_C` | [USaraiAIComponent](#sec-usaraiaicomponent) | blueprint | 13 | 163, 290, 302 | 8626647386 |
| `GShako_C` | [UShakoAIComponent](#sec-ushakoaicomponent) | blueprint | 7 | 180, 184, 186 | 8626647386, 8626647418 |
| `GShippoZako_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 16 | 159, 163 | 8626647386, 8626647418 |
| `GShippo_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 2 | 275, 430 | 8626647386, 8626647418 |
| `GSlopeBoth50uu_C` | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) | family | 3 | 163, 167 | 8626647386, 8626647626 |
| `GSlopeBothSidecut50uu_C` | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) | family | 8 | 163, 167 | 8626647386, 8626647418 |
| `GSlopeBothSidecut80uu_C` | [UBuildObjectAIComponent](#sec-ubuildobjectaicomponent) | family | 5 | 163 | 8626647386 |
| `GSnakeCrow_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 7 | 159, 163, 283, 291 | 8626647386, 8626647418 |
| `GSpaceBus_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | blueprint | 2 | 155 | 8626647386 |
| `GSplineAmeBozu_C` | (none) | no AI.Static bytes | 9 | 0 | 8626647386, 8626647418 |
| `GSplineBaby_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GSplineBigUjinko_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386 |
| `GSplineChaser_Kitchen_C` | (none) | no AI.Static bytes | 3 | 0 | 8626647386 |
| `GSplineChaser_LivingRoom_C` | (none) | no AI.Static bytes | 6 | 0 | 8626647386 |
| `GSplineDamagumoCanStep_C` | (none) | no AI.Static bytes | 7 | 0 | 8626647386, 8626647418 |
| `GSplineDodoro_C` | (none) | no AI.Static bytes | 13 | 0 | 8626647386 |
| `GSplineDokuNameko_C` | (none) | no AI.Static bytes | 2 | 0 | 8626647386, 8626647418 |
| `GSplineFutakuchiAdultRock_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GSplineFutakuchiRock_C` | (none) | no AI.Static bytes | 19 | 0 | 8626647386, 8626647418 |
| `GSplineHageDamagumo_C` | (none) | no AI.Static bytes | 8 | 0 | 8626647386, 8626647418 |
| `GSplineKumaChappy_C` | (none) | no AI.Static bytes | 6 | 0 | 8626647386, 8626647418 |
| `GSplineNightKochappy_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647418 |
| `GSplinePanModoki_C` | (none) | no AI.Static bytes | 14 | 0 | 8626647386, 8626647418 |
| `GSplinePatroller_C` | (none) | no AI.Static bytes | 5 | 0 | 8626647386 |
| `GSprinkler_C` | [USprinklerAIComponent](#sec-usprinkleraicomponent) | name | 9 | 198, 210 | 8626647386 |
| `GStickyFloor175uu_C` | [UStickyFloorAIComponent](#sec-ustickyflooraicomponent) | name | 50 | 159, 257, 290 | 8626647386 |
| `GStickyFloor525uu_C` | [UStickyFloorAIComponent](#sec-ustickyflooraicomponent) | name | 2 | 159, 278 | 8626647386 |
| `GStickyFloorFew_C` | [UStickyFloorAIComponent](#sec-ustickyflooraicomponent) | name | 24 | 159, 280 | 8626647386 |
| `GStickyFloorPartsMadori_C` | (none) | no AI.Static bytes | 3 | 0 | 8626647386 |
| `GStickyFloorPartsOtaB_C` | (none) | no AI.Static bytes | 8 | 0 | 8626647386 |
| `GStickyFloorPartsOtaS_C` | (none) | no AI.Static bytes | 15 | 0 | 8626647386 |
| `GStickyFloorPoisonFew_C` | [UStickyFloorAIComponent](#sec-ustickyflooraicomponent) | name | 5 | 159, 257 | 8626647386 |
| `GStickyFloorPoison_C` | [UStickyFloorAIComponent](#sec-ustickyflooraicomponent) | name | 9 | 159, 441 | 8626647386 |
| `GStickyFloor_C` | [UStickyFloorAIComponent](#sec-ustickyflooraicomponent) | name | 17 | 159, 171, 285, 290 | 8626647386 |
| `GStickyMushB_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 50 | 163 | 8626647386 |
| `GStickyMushC_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 13 | 163 | 8626647386 |
| `GStickyMushPoison_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 83 | 163 | 8626647386 |
| `GStickyMush_C` | [UKomushAIComponent](#sec-ukomushaicomponent) | family | 116 | 163 | 8626647386 |
| `GString_C` | [UStringAIComponent](#sec-ustringaicomponent) | name | 15 | 159, 163 | 8626647386, 8626647418, 8626647626 |
| `GSuitori_C` | [USuitoriAIComponent](#sec-usuitoriaicomponent) | blueprint | 14 | 160, 287, 291, 299 | 8626647386, 8626647418 |
| `GSurvivorA_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 12 | 49, 61, 81 | 8626647386 |
| `GSurvivorKoppai_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 2 | 49 | 8626647386 |
| `GSurvivorLeaf_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 19 | 49, 73, 97 | 8626647386, 8626647418 |
| `GSurvivorOlimarLeaf_C` | [UOtakaraAIComponent](#sec-uotakaraaicomponent) | family | 1 | 49 | 8626647386 |
| `GSwampBoxDark_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 1 | 196 | 8626647386 |
| `GSwampBox_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 14 | 196 | 8626647386 |
| `GSwitchOff_C` | [USingleSwitchAIComponent](#sec-usingleswitchaicomponent) | blueprint | 24 | 168, 170, 171, 172 | 8626647386, 8626647418 |
| `GSwitchOnOffGreen_C` | [USingleSwitchAIComponent](#sec-usingleswitchaicomponent) | blueprint | 2 | 178 | 8626647386 |
| `GSwitchOnOffRed_C` | [USingleSwitchAIComponent](#sec-usingleswitchaicomponent) | blueprint | 3 | 178 | 8626647386 |
| `GSwitchOnOff_C` | [USingleSwitchAIComponent](#sec-usingleswitchaicomponent) | blueprint | 12 | 168, 172, 178 | 8626647386, 8626647418 |
| `GTamagoMushi_C` | [UTamagoMushiAIComponent](#sec-utamagomushiaicomponent) | blueprint | 90 | 274, 284, 295, 390, 394 | 8626647386, 8626647418 |
| `GTanebiStationRelay_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 17 | 155 | 8626647386 |
| `GTanebiStation_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 31 | 155 | 8626647386 |
| `GTargetPoint_Kitchen_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GTargetPoint_LivingRoom_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GTateanaBaby_C` | [UTateanaAIComponent](#sec-utateanaaicomponent) | blueprint | 9 | 215 | 8626647386 |
| `GTateana_C` | [UTateanaAIComponent](#sec-utateanaaicomponent) | blueprint | 46 | 255, 257, 259, 261, 267, 277… | 8626647386, 8626647418, 8626647626 |
| `GTenKochappy_C` | [UKochappyAIComponent](#sec-ukochappyaicomponent) | blueprint | 21 | 163 | 8626647386 |
| `GTentenChappy_C` | [UTekiAIComponent](#sec-utekiaicomponent) | base | 9 | 159, 286, 292 | 8626647386 |
| `GThrowEater_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 8 | 161, 288, 293, 294, 312 | 8626647386 |
| `GTobiKaburi_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 13 | 159, 286, 298 | 8626647386 |
| `GTobinko_C` | [UTobinkoAIComponent](#sec-utobinkoaicomponent) | blueprint | 9 | 163 | 8626647386 |
| `GTobiuo_C` | [UTobiuoAIComponent](#sec-utobiuoaicomponent) | blueprint | 37 | 163 | 8626647386 |
| `GTrampolineOneway_C` | [UTrampolineAIComponent](#sec-utrampolineaicomponent) | blueprint | 21 | 183, 187 | 8626647386, 8626647418 |
| `GTrampolineWideAngle_C` | [UTrampolineAIComponent](#sec-utrampolineaicomponent) | blueprint | 13 | 183 | 8626647386 |
| `GTrampoline_C` | [UTrampolineAIComponent](#sec-utrampolineaicomponent) | blueprint | 20 | 183, 187 | 8626647386, 8626647418 |
| `GTriggerColdOFF_C` | [UTriggerColdAIComponent](#sec-utriggercoldaicomponent) | blueprint | 4 | 155 | 8626647386 |
| `GTriggerDoorSwitchBlue_C` | [UTriggerDoorAIComponent](#sec-utriggerdooraicomponent) | blueprint | 7 | 188 | 8626647386 |
| `GTriggerDoorSwitchOff_C` | [UTriggerDoorAIComponent](#sec-utriggerdooraicomponent) | blueprint | 6 | 188, 191, 192 | 8626647386, 8626647418 |
| `GTriggerDoorSwitchRed_C` | [UTriggerDoorAIComponent](#sec-utriggerdooraicomponent) | blueprint | 6 | 188 | 8626647386 |
| `GTriggerDoor_C` | [UTriggerDoorAIComponent](#sec-utriggerdooraicomponent) | blueprint | 39 | 248, 249, 250, 252, 253, 254… | 8626647386, 8626647418 |
| `GTsuyukusa_C` | (none) | no AI.Static bytes | 17 | 0 | 8626647386, 8626647418, 8626647626 |
| `GTunnel_C` | [UHappyDoorAIComponent](#sec-uhappydooraicomponent) | ambiguous (also fits: UMizunukiAIComponent, USingleSwitchAIComponent, UValveGimmickBaseAIComponent, UWarpCarryAIComponent) | 14 | 170, 171 | 8626647386 |
| `GUjinkoA_C` | [UUjinkoAAIComponent](#sec-uujinkoaaicomponent) | blueprint | 9 | 163 | 8626647386 |
| `GUjinkoB_C` | [UUjinkoBAIComponent](#sec-uujinkobaicomponent) | blueprint | 38 | 163 | 8626647386 |
| `GValveOnce_C` | [UValveAIComponent](#sec-uvalveaicomponent) | name | 5 | 182 | 8626647386 |
| `GValveVariable_C` | [UValveAIComponent](#sec-uvalveaicomponent) | name | 1 | 182 | 8626647386 |
| `GVarGateBomb_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 3 | 516, 873 | 8626647386 |
| `GVarGateDenkiNoPillar_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 17 | 159, 163, 516, 873, 877 | 8626647386, 8626647418, 8626647626 |
| `GVarGateDenki_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 3 | 159, 873, 877 | 8626647386, 8626647626 |
| `GVarGateIceNoPillar_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 12 | 159, 520, 873 | 8626647386, 8626647418 |
| `GVarGateIce_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 1 | 885 | 8626647386 |
| `GVarGateSoftHalf_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 1 | 873 | 8626647386 |
| `GVarGateSoftNoPillar_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 57 | 159, 516, 520, 873, 877, 885 | 8626647386, 8626647418, 8626647626 |
| `GVarGateSoft_C` | [UGateAIComponent](#sec-ugateaicomponent) | name | 9 | 159, 873, 877 | 8626647386, 8626647626 |
| `GVehicleBoxBungee_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |
| `GVehicleBoxDanger_C` | (none) | no AI.Static bytes | 29 | 0 | 8626647386 |
| `GVehicleBox_C` | (none) | no AI.Static bytes | 66 | 0 | 8626647386, 8626647626 |
| `GWallFlexibleCave_C` | [UBuildWallFlexibleAIComponent](#sec-ubuildwallflexibleaicomponent) | family | 8 | 171 | 8626647386 |
| `GWallFlexible_C` | [UBuildWallFlexibleAIComponent](#sec-ubuildwallflexibleaicomponent) | family | 5 | 171, 175 | 8626647386, 8626647626 |
| `GWarpCarryFloorCave_C` | [UWarpCarryAIComponent](#sec-uwarpcarryaicomponent) | blueprint | 10 | 173 | 8626647386 |
| `GWarpCarryFloor_C` | [UWarpCarryAIComponent](#sec-uwarpcarryaicomponent) | blueprint | 6 | 173, 174 | 8626647386 |
| `GWarpCarryWallCave_C` | [UWarpCarryAIComponent](#sec-uwarpcarryaicomponent) | blueprint | 6 | 173 | 8626647386 |
| `GWarpCarryWall_C` | [UWarpCarryAIComponent](#sec-uwarpcarryaicomponent) | blueprint | 2 | 173 | 8626647386 |
| `GWarpTriggerLinkObj_C` | (none) | no AI.Static bytes | 10 | 0 | 8626647386 |
| `GWarpTrigger_C` | (none) | no AI.Static bytes | 32 | 0 | 8626647386 |
| `GWasurenagusaMini_C` | [UObjectAIComponent](#sec-uobjectaicomponent) | base | 30 | 155 | 8626647386 |
| `GWasurenagusa_C` | [UWasurenagusaAIComponent](#sec-uwasurenagusaaicomponent) | name | 23 | 203 | 8626647386 |
| `GWaterBoxCircle_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 1 | 206 | 8626647386 |
| `GWaterBoxDeep_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 2 | 196 | 8626647386 |
| `GWaterBoxFluctuationDeep_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 2 | 196 | 8626647386 |
| `GWaterBoxFluctuation_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 8 | 196 | 8626647386 |
| `GWaterBoxNav_C` | [UWaterBoxNavAIComponent](#sec-uwaterboxnavaicomponent) | blueprint | 55 | 171, 175 | 8626647386, 8626647418, 8626647626 |
| `GWaterBoxReduction_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 1 | 193 | 8626647386 |
| `GWaterBoxVS_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 2 | 196 | 8626647386 |
| `GWaterBox_C` | [UWaterBoxAIComponent](#sec-uwaterboxaicomponent) | blueprint | 75 | 193, 196, 199, 200, 202, 206 | 8626647386, 8626647418, 8626647626 |
| `GWaterOtakara_C` | [UDweevilBaseAIComponent](#sec-udweevilbaseaicomponent) | blueprint | 3 | 211 | 8626647386 |
| `GWaterTank_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 6 | 159, 286 | 8626647386 |
| `GWhiteShijimi_C` | [UShijimiAIComponent](#sec-ushijimiaicomponent) | blueprint | 13 | 302, 318 | 8626647386, 8626647418 |
| `GXBoxCan_C` | [UPushGimmickAIComponent](#sec-upushgimmickaicomponent) | only match | 1 | 301 | 8626647386 |
| `GXBox_C` | [UPushGimmickAIComponent](#sec-upushgimmickaicomponent) | only match | 4 | 301 | 8626647386 |
| `GYBoxAnother_C` | [UPushGimmickAIComponent](#sec-upushgimmickaicomponent) | family | 3 | 195 | 8626647386 |
| `GYBoxCubeCan_C` | [UPushGimmickAIComponent](#sec-upushgimmickaicomponent) | family | 2 | 195 | 8626647386 |
| `GYBoxCube_C` | [UPushGimmickAIComponent](#sec-upushgimmickaicomponent) | family | 3 | 195 | 8626647386 |
| `GYBoxSmallAnother_C` | [UPushGimmickAIComponent](#sec-upushgimmickaicomponent) | family | 5 | 195, 199 | 8626647386, 8626647626 |
| `GYBoxSmall_C` | [UPushGimmickAIComponent](#sec-upushgimmickaicomponent) | family | 14 | 195, 199 | 8626647386, 8626647418, 8626647626 |
| `GYBox_C` | [UPushGimmickAIComponent](#sec-upushgimmickaicomponent) | family | 5 | 195, 199 | 8626647386, 8626647626 |
| `GYakiSenbei_C` | [UTekiAIComponent](#sec-utekiaicomponent) | blueprint | 4 | 159, 285, 286, 290 | 8626647386, 8626647418 |
| `GYamashinju_C` | [UYamashinjuAIComponent](#sec-uyamashinjuaicomponent) | blueprint | 5 | 261, 263, 265 | 8626647386, 8626647418 |
| `GYellowShijimi_C` | [UShijimiAIComponent](#sec-ushijimiaicomponent) | blueprint | 17 | 281, 285 | 8626647386, 8626647418 |
| `GYukiFutakuchiAdult_C` | [UFutakuchiAdultAIComponent](#sec-ufutakuchiadultaicomponent) | blueprint | 2 | 586, 594 | 8626647386 |
| `GYukiFutakuchi_C` | [UFutakuchiAIComponent](#sec-ufutakuchiaicomponent) | blueprint | 8 | 266, 267, 268 | 8626647386 |
| `GYukimushi_C` | [UYukimushiAIComponent](#sec-uyukimushiaicomponent) | blueprint | 1 | 449 | 8626647386 |
| `GZiplineAnother_C` | [UZiplineAIComponent](#sec-uziplineaicomponent) | blueprint | 1 | 906 | 8626647386 |
| `GZiplineSplineMesh_C` | [UZiplineAIComponent](#sec-uziplineaicomponent) | blueprint | 6 | 516, 646, 776, 1036, 1040 | 8626647386, 8626647418 |
| `GZukanPortalBase_C` | (none) | no AI.Static bytes | 1 | 0 | 8626647386 |

<a id="dandori-notes"></a>
## Notes for Dandori Desktop

- **Version offset**: when `GeneratorVersion ≥ 0x8626647418`, insert/expect the 4-byte `bEnableFreezeBothDrop` after each DropParameter. That is the whole short/long difference. Converting 386 data to 17a means inserting `00 00 00 00` at those points and bumping `GeneratorVersion`.
- **Strings shift everything**: `LinkNarrowSpaceBoxID`, `LinkWarpTriggerID`, `NavMeshTriggerID` (Object base) and every FName in the drop items are length-prefixed. Parse sequentially and never use fixed offsets past the first FName. For Teki actors, the first variable item is inside the DropParameter (`DropItemParameter` array and `CustomParameter` FName).
- **Drop items loop**: the `DropItemParameter` array count is at offset 0 for objects and at offset 20 for enemies (right after the Territory cylinder). Each element is one `DropItem` block with its own nested `DropConditionParameter` loop.
- **OptionalPointOffsets / OptionalPointPriorityInfo** (Sniff section) are the last bytes of nearly every actor. Each is an int32 count followed by vec3s or int32s.
- **Runtime-counted loops** (escape points, trampoline bounce points, OoAshibaKinoko steps, conveyor nav-link pairs) write no count. Take N from the actor blueprint, or for escape points use `EscapePointSerializeNum`, which equals N whenever all the tagged components exist. In the shipped maps, `EscapePointSerializeNum` does not always equal the number of vectors present: e.g. the fences have 2 declared and 0 written.
- **Component-presence blocks** (spline points, nav links, trigger-box / mesh transforms) depend on the actor having that component. They are the same for every instance of one blueprint, so treat them as per-actor-class constants.
- Actors with no AI.Static bytes (113 classes) have no AI component or one whose serializer writes nothing (e.g. bombs, ice blocks, lures, damage areas).
