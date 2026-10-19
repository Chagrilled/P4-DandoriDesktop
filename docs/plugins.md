# Plugins

Now that custom actors have been discovered for P4, it's needed to be able to extend DDT's map and asset list with those if you want to edit them interactively.

## Mod Consumers

A mod author will/should provide a `ddt.json` in the mod's folder. Go to your `%appdata%/p4-dandoridesktop/plugins` (it will create this) and drop the entire mod folder in.

DDT should now pick up the actor next load.

Example:

```
p4-dandoridesktop
  -> plugins
     -> crushblat
        -> ddt.json
        -> tekp4crushblat.png
```

## Mod Producers

Include a `ddt.json` and icon in your mod bundle that has the following contract:

```json
{
    "assetPath": "/Game/Carrot4/Placeables/Teki/GTekP4crushblat.GTekP4crushblat_C", // Full asset path
    "internalName": "TekP4crushblat", // The asset name. This must match the above
    "englishName": "Crushblat",
    "infoType": "creature", // "Category" of actor. Must match one of the lowercase types from here: https://github.com/Chagrilled/P4-DandoriDesktop/blob/master/src/api/types.js#L752-L771
    "defaultEntityData": "BigFrog", // This is existing actor whose ActorSerializeParameter will be copied from
    "isBoss": false, // Randomiser setting affecting the boss pool
    "randomiserNightList": false, // Should this actor have a chance to spawn at night
    "randomiserShouldBeRolledInto": true, // Should anything be allowed to randomise into this actor
    "randomiserIgnorePlaced": true, // Tells randomiser to ignore this actor if it already exists in the map
    "randomiserShouldNeverDrop": true, // Bans this actor from being randomised into a drop by something
    "mapIconScale": 0.2 // The icon scale on the map only
}
```

The icon used will be the `internalName` lower cased, so ensure that is included in your mod bundle as well.