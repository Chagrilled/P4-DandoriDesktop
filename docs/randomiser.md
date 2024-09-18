# 🎰 Randomiser

This page documents each of the randomiser's config options in detail:

I've only playtested up to Serene Shores currently, and have tried to tweak crashes in the seeds I've tested myself. Naturally, there are too many permutations and too much game for me to play myself to find (and then debug) all the breaking combos.

Randomised files can be opened and edited in DDT as usual - or pre-edited to add further creatures/objects in that will then get randomised.

❗ I'd recommend only randomising a full set of _clean_ files.

### 💥 Crashes

Currently known and unresolved crashes:

- For some reason, me climbing the wall and approaching the blue onion in Serene Shores crashes. Maybe it's the vehicle box, but not sure what they do yet. Haven't looked into this much. Didn't apply to other people that I've seen.
- Gunna reported Kanitama and Kogani being a bit unreliably crashy.

If you've found a **repeatable** crash (sometimes the game _does_ just crash, but won't again 🤷‍♂️), message me on Discord with your randomised JSONs and I'll try look into it if it's done with sensical configuration.

The whackier you go with the settings, the less stable you should expect the game to be.

### 🐗 Enemies
- [Randomise Enemies](#randomise-enemies)
- [Randomise Enemy Drops](#randomise-enemy-drops)
- [All Creatures Have Drops](#all-creatures-have-drops)
- [Randomise GenerateNums](#randomise-generatenums)
- [GenerateNum Limit](#generatenum-limit)
- [Randomise Boss GenerateNums](#randomise-boss-generatenums)
- [Boss GenerateNum Limit](#boss-generatenum-limit)
- [Retain Spawners](#retain-spawners)
- [Retain Non-Bosses](#retain-non-bosses)
- [Retain Bosses](#retain-bosses)
- [All Bosses](#all-bosses)
- [Retain Wild Pikmin](#retain-wild-pikmin)
- [Bosses Can Drop](#bosses-can-drop)
- [Boss Drop Pool Chance](#boss-drop-pool-chance)
- [No Overworld Snowfake](#no-overworld-snowfake)
- [ActorSpawner Infinite Chance](#actorspawner-infinite-chance)
- [ActorSpawner Limit](#actorspawner-limit)
- [ActorSpawner Interval Limit](#actorspawner-interval-limit)

### 🪙 Treasures
- [Randomise Treasures](#randomise-treasures)

### 🏺 Objects
- [Randomise Portals](#randomise-portals)
- [Randomise Overworld Portals Only](#randomise-overworld-portals-only)
- [Randomise Cave-Disabled Pikmin](#randomise-cave-disabled-pikmin)
- [Randomise Unnecessary Objects](#randomise-unnecessary-objects)
- [Retain Cave Exits](#retain-cave-exits)
- [Objects Like-For-Like](#objects-like-for-like)
- [Hazards Like-For-Like](#hazards-like-for-like)
- [Exclude Gates](#exclude-gates)
- [Gates Drop](#gates-drop)
- [Randomise Object Drops](#randomise-object-drops)
- [All Objects Have Drops](#all-objects-have-drops)
- [Keep Object GenerateNums](#keep-object-generatenums)
- [Randomise starting onion](#randomise-starting-onion)
- [Randomise other onions](#randomise-other-onions)
- [Starting Flarlics](#starting-flarlics)

### 🔧 General

- [Limit Per Drop](#limit-per-drop)
- [Drop Type Limit](#drop-type-limit)
- [Randomise Night](#randomise-night)
- [Rebirth Interval](#rebirth-interval)
- [Random Function](#random-function)

### Randomise Enemies

All creatures will get randomised. With this disabled, creatures will not be touched at all.

The following enemies are removed from the randomise pool due to crashing/nonsense:

- Moss
- GroupDropManagers
- Empress Bulblax
- Waterwraith
- Ancient Sirehound

### Randomise Enemy Drops

All enemies that have drops are randomised. 

Drops will randomise into things of the same class - treasures for treasures, creatures for creatures etc.

Honey, spicy spray, and raw material have a 25% chance of being overriden on eggs to a creature.

### All Creatures Have Drops

Gives every creature a creature drop if it doesn't have a drop already

Some creatures crash the game, so the following creatures are further removed from the drop pool:

- ActorSpawner
- Pyroclasmic Slooch
- Moldy Slooch
- Arachnodes

Pikmin types are all added into the randomised drop pool to reduce chances of getting progression-locked, so you should hopefully see all types a little more frequently, even if those numbers are very low.

### Limit Per Drop

Drops are defined with minimum and maximum values. This option sets the _upper bound_ of the maximum drop limit. The game itself then randomises how many of the entity can drop.

### Drop Type Limit

When [All Objects](#all-objects-have-drops)/[Creatures Have Drops](#all-creatures-have-drops) is enabled, this is the upper bound of what number of drops the inventory will be padded to.

If this value is 4, the randomiser may select 2 as the value - the entity being given drops will then have its inventory padded to 2 drops. If it already has a treasure or creature drop, it will only be given one more.

Affected by [Random Function](#random-function)

### Randomise Night

Randomises the night maps if set to true. The drop pool of creatures is [smaller](https://github.com/Chagrilled/P4-DandoriDesktop/blob/master/src/genEditing/randomiser.js#L335) and comprises enemies I found to work on night maps. 

It seems anything that shares a base class of something that _does_ work, will work - i.e Sovereign Bulblax works because Emperor does, and ice kochappies work because regular kochappies do too. A foolix however, will never target the lumiknolls.

There is a 15% chance for something to be rolled from the entire creature pool, because memes.

### Randomise GenerateNums

Actors in the game are defined with a field called `GenerateNum` which is almost always set to 1. This defines how many of the actor is spawned in the "group". The actor's drop settings apply to each entity spawned in the group in-game.

i.e a Dwarf Bulbear with a GenerateNum of 5, that is given a Smokey Progg drop, will spawn 5 dwarves that _each_ drop a Smokey Progg.

This option enables the following options. If disabled, the actor's existing `GenerateNum` is preserved.

### GenerateNum Limit

_Upper bound_ for a `GenerateNum` which is randomised on each creature.

A value of 7 will randomise to anything between 1 and 7 - the game will spawn that many of the actor it's currently randomising.

Affected by [Random Function](#random-function)

### Randomise Boss GenerateNums

Due to the chaotic impact that `GenerateNum` brings, especially when paired with inventory padding and drops, bosses are given their own settings for finer control.

### Boss GenerateNum Limit

_Upper bound_ for a `GenerateNum` which is randomised on each boss.

Affected by [Random Function](#random-function)

### Rebirth Interval

Everything is randomised to have a `RebirthLater` respawn value, because Nintendo decided extinction was a more enjoyable way to play the game. I disagree.

`RebirthLater` does what it says, and respawns actors X days after the group dies (kill all `GenerateNum` of them). Randomiser likely makes the game more combat heavy, so this controls how repetitive that may be.

### Random Function

Selects the function used to randomise integers for other options that do that:

- `even` - a basic even weight randomiser
- `lowWeighted` - a distribution that heavily favours the low end, with very infrequent high numbers. May let you experiment with high values of drop limits/GenerateNums without making the game unplayable

Example values:

| Occurrences of    |   even   | lowWeighted
| :---------------- | :------: | ----:
| 1                 |   108    | 409 
| 2                 |   100    | 294 
| 3                 |   74     | 105 
| 4                 |   97     | 77  
| 5                 |   107    | 36
| 6                 |   105    | 30
| 7                 |   101    | 17
| 8                 |   122    | 17
| 9                 |   96     | 10
| 10                |   90     | 5

### Retain Spawners

The randomiser won't change `ActorSpawner`s, or holes into other creatures, but will randomise their drop instead.

### Retain Non-Bosses

This prevents non-boss creatures randomising into bosses. Game will become a bit more chaotic with this disabled. Expect to see bosses on many floors, or even multiple at once.

### Retain Bosses

This ensures bosses stay bosses but are randomised into other ones. Prevents the final floor of a cave being a single joustmite or something.

### All Bosses

This makes the entire drop pool be just bosses. I've not playtested it, but I imagine this will likely lag the game quite a bit, if not just outright crash it if used with higher GenerateNums. Mileage will vary.

### Retain Wild Pikmin

Wild pikmin in the field will be kept as the original type. This will ensure you know where pikmin types come from as they're usually given where needed.

If disabled, they will all be randomised into a different pikmin type.

### Bosses Can Drop

This adds bosses into the drop pool. It can be very chaotic to have 2 whole-ass Gildemanders drop out of a Water Dumple in a small room.

Bosses dropping from creatures because increasingly ridiculous with inventory padding and drop limits greater than 1.

### Boss Drop Pool Chance

If using [Bosses Can Drop](#bosses-can-drop), this is the % chance the boss pool will be included when rerolling the entity. It is not the % chance a boss WILL drop, but the chance for it to be an _available option_ to drop.

### No Overworld Snowfake

Prevents the Snowfake Fluttertail from spawning in overworld areas. Their presence adds the ice effect to the map which makes pikmin keep pausing to be cold. It's really annoying so this lets you disable that.

### ActorSpawner Infinite Chance

`ActorSpawner`s spawn a thing, and have unique settings. One of those is having the ActorSpawner infinitely drop its creature/item.

This is a percentage chance that will be rolled for making an ActorSpawner infinite. 

### ActorSpawner Limit

_Upper bound_ of how many creatures an ActorSpawner can have alive at any one time. Affected by [Random Function](#random-function)

### ActorSpawner Interval Limit

ActorSpawners that are infinite-enabled have a delay between each spawn. This is the _upper bound_ of what that number will randomise to. 1 is the minimum.

## Treasures

### Randomise Treasures

Treasures will randomise into other treasures. Duplicate vanilla treasures are not preserved - each treasure randomised is removed from the pool until it is empty, at which point it will reset.

## Objects

### Randomise Portals

The destination of cave entrances are randomised into other caves. The final floor of the cave should return you back to the portal where you came from.

The 4 caves that take you to a different exit (like the hill in SST) retain their vanilla exits, but will have a different cave leading to them. So to reach the hill, you'll need to find the cave that has randomised to Aquiferous Summit, whose final floor will take you to the hill.

### Randomise Overworld Portals Only

Ensures caves subfloors lead to the rest of the cave. With this disabled, you could go from Mud Pit F1, to Cavern for a King F10, to Plunder Palace F5, to an entrance in Serene Shores.

Not playtested, very likely to be very difficult to progress.

### Randomise Cave-Disabled Pikmin

Caves can have pikmin types disabled on the selection screen. This randomises which ones are and aren't. Definitely possible for this to make the game incompletable, given caves are built around puzzles for certain types. Or at least a lot of bombs required.

### Retain Cave Exits

Caves will _attempt_ to take you back to the exit you entered into. With this disabled they will take you to where they were meant to, so area-warping is a likely occurrence.

### Randomise Unnecessary Objects

Objects like pots, plants, mush and hazards will be randomised to other entities. With this disabled, objects will not be touched at all.

### Force Cave Object Randomisation

Navmesh pathing for pikmin seems tightly coupled to the actual actor name, in that if the object that normally blocks a path has been changed, destroying it will not unblock the path (according to carrying pikmin).

To make the seeds more consistently playable, this is disabled by default, but I've let people override that if they so desire. Just be prepared to open DDT and edit your cave floors if you find them glitched. 

### Objects Like-For-Like

Object-class actors will randomise into objects - i.e pots won't become a fire hazard.

### Hazards Like-For-Like

Hazard-class actors will randomise into objects - i.e fire hazards won't become a pot

### Exclude Gates

Gates won't get randomised. This helps keep progression sensical, as otherwise the electric gate in SST can become a crystal one, and unless you can get rocks from a random cave, good luck. Probably has more value if paired with [Retain Wild Pikmin](#retain-wild-pikmin) off and [Randomise Other Onions](#randomise-other-onions) on.

Most gates can still be cleared with Oatchi immunities or bombs (I think).

## Gates Drop

Randomises the regular drops of gates if enabled. Mileage may vary as this has been found to be a crash-causer.

### Randomise Object Drops

Randomises the drops of objects - like creatures, treasures will stay as treasures, and creatures as creatures.

Affected by the drop limits/pool options under _Creatures_.

### All Objects Have Drops

Like [All Creatures Have Drops](#all-creatures-have-drops) but for trivial objects like pots.

### Keep Object GenerateNums

Keeps the `GenerateNum` for objects as they are in vanilla, just randomising their type. Prevents one fire hazard become 4 Kingcaps that all drop Bulbears.

### Randomise starting onion

The onion in the hub will be deleted and replaced with a randomised type. The requisite amount of pikmin to carry the onion are also provided. Make sure you actually pick it up, as the tutorial day ends upon collecting the three treasures.

### Randomise other onions

The other onions (not-flarlics) are randomised into other types. They are still in the same locations. Like treasures, onions that are placed are removed from the pool until empty, and then it will be reset. Given there are 2 blue and yellow onions, this _should_ at least mean that ALL onions are in the main game, prior to Sage Leaf.

### Starting Flarlics

Places X amount of Flarlic in hub area. Given how hectic and combat-driven randomiser will tend to be, this lets you adjust how much leeway you have from the get-go with your group size.