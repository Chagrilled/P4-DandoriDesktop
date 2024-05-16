# 🌸 Dandori Desktop

[<img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white"/>](https://ko-fi.com/noodl32)
[<img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white"/>](https://paypal.me/chagrilled)

💸 DDT is a big codebase, and has taken a lot of time. The funding badges are above if you want to support the development of it 🥰

A Pikmin 4 editing tool to assist with modding. Still fairly beta. <b>Please backup any files before you let DDT touch them)</b>.

Special thanks goes to Dodiou for making [DandoriDB](https://github.com/Dodiou/DandoriDB) which gave me the basis for the map projection, and thus motivation to make this.

- [🌸 Dandori Desktop](#-dandori-desktop)
   * [🛠️ Setup/Workflow](#%EF%B8%8F-setupworkflow)
      + [⛏️ Extracting Maps](#%EF%B8%8F-extracting-maps)
   * [✏️ Editing](#%EF%B8%8F-editing)
      + [🗺️ Maps](#%EF%B8%8F-maps)
      + [📦️ Objects](#%EF%B8%8F-objects)
   * [🐛 Bug Reporting/Feature Requests](#-bug-reportingfeature-requests)
   * [👷‍♂️ Developer Notes](#%EF%B8%8F-developer-notes)
      + [🤖 AI](#-ai)
   * [🏗️ To Do List:](#%EF%B8%8F-to-do-list)
   * [🐛 Bugs/known issues:](#-bugsknown-issues)

Currently supports:

- Editing/creating entities on the game maps
- Manipulating drop tables
- Writing back to game files
- Primitive editing of some enemy parameters
- A little bit of devops to make modding faster
- Some tools to help with manual modding

## 🛠️ Setup/Workflow

DDT reads and writes to local game files that must be decoded to their JSON forms from **extracted `.uasset`** files. It is assumed you have these files already.

Use the `Settings` menu to set 4 things:

- `Carrot4 Folder` - Folder containing your folder structure of decoded game JSONs - this folder should contain `Maps/` and `Placeables/`. Use the [⛏️ Extracting Maps](#%EF%B8%8F-extracting-maps) process to generate this.
- `Encoder Folder` - Folder containing [P4UassetEditor](https://gamebanana.com/tools/15077). Assumes the files/folders are not renamed. The contents of this folder should be the extracted uasset editor - **so must contain `_EDIT`, `P4UassetEditor/`, `encode.bat`**, etc.
- `castoc Folder` - Folder containing `castoc`. Assumes the files/folders are not renamed. There are several versions of this tool distributed, and we as a community haven't yet organised these tools into repos. I've zipped mine [in the repo](./castoc.zip) for use.
- `Output Paks Folder` - Folder (probably) in your emulator you want your built mod's outputs to go to

My folder structure looks like:

```
Desktop/
├── P4UassetEditor/ // <-- This is my 'Encoder Folder'
│   ├── _EDIT/
│   │   └── Carrot4/ // <-- this is my 'Carrot4 Folder'
│   │       ├── Maps/
│   │       │   ├── Main/
│   │       │   |   └── ...
|   |       |   └── Madori/
│   │       └── Placeables
│   ├── _OUTPUT
│   └── encode.bat
└── castoc/ // <-- This is my 'castoc Folder'
    ├── _EDIT/
    │   └── Carrot4/
    │       └── Content/
    │           └── Carrot4/
    │               └── Maps
    ├── _OUTPUT
    └── PACKFILES.bat
```

Within my map folders, I _only_ have `ActorPlacementInfo/AP_...Teki.json` and `AP_...Objects.json`.

📺 Or watch this setup video

[![Or watch this setup video](https://img.youtube.com/vi/5CnL2AHNBKI/0.jpg)](https://www.youtube.com/watch?v=5CnL2AHNBKI "Or watch this setup video")

### ⛏️ Extracting Maps

Because you only really want to package files you need into your mod, I've made it easy to fish them out of a raw export of the `Maps` folder.

- From FModel, right click `Maps` and `Export Raw Data (.uasset)`
- Use P4UassetEditor to decode the `Maps` folder which will now contain JSON.
- From DDT, go to `Tools` > `Extract Teki/Object Files from Maps`
- Select your _decoded_ `Maps/` folder (which should contain `Main` and `Madori`)
- You should end up with a folder in there called `DandoriDesktop-Carrot4`. This folder contains just the teki/object files it needs.
- Drag that folder to your P4UassetEditor's `_EDIT` folder and rename it `Carrot4`.
- Set your `Carrot4 Folder` in DDT to this Carrot4 folder. 

## ✏️ Editing

### 🗺️ Maps

Entities that populate the map are read from each area's `AP_...Teki/Objects.json`'s `ActorGeneratorList`. All changes will be written back to these files. 

Once you want to commit your map changes back, click `Tools > Save Entities to JSON`, to write back to the files.

Once you want to output these to your emulator, use `Tools > Deploy to Emulator` to run the toolchain for you. This consists of encoding the JSONs, copying the output to `castoc`, packing, and copying _that_ output to your destination folder.

🖱️ Right click to use the creation menu to add new entities

⌨️ You can also use ctrl+Z to undo any _map entity_ you delete

⌨️ ctrl+V will duplicate any entity currently selected

❗`castoc`'s error reporting doesn't seem so good (or it's how I invoke it), and it doesn't actually report a failure. If you **don't get the full load of toast messages, ending in** `Paks copied to "D:/your/output/folder"` then you may want to run the tools manually to see what's going on.

❗For the most part, the app is not fully user-safe and will not try to protect your inputs. Therefore, ensure you are keeping your input data in the correct types - arrays remain strict arrays, lists of strings (like `ignoreList` are correctly formatted - `["Kochappy", "Mush"]`) etc.

### 📦️ Blueprints

The blueprint editor is currently very primitive, reading only from `{carrot4}/Placeables/`, and basically just displays JSON on screen like a worse IDE. However it only displays the things people usually want to edit, so can be a little faster to use in that regard.

The design philosophy is a little weird for this one. There are far far too many parameters for me to build a UI around each one and make it look really good, and many are often deeply nested in JSON, and due to the coverage of our understanding of parameters, this nesting is often helpful to discern something's purpose. So I left it all in.

## 🐛 Bug Reporting/Feature Requests

Bugs will be bountiful. Please check the [🐛bug list](#-bugsknown-issues)/existing issues before posting.

If you find one, plese use the devtools (while they still exist in the prod build) to copy/screencap any error traces from the JavaScript console, and (ideally) create an [issue](https://github.com/Chagrilled/P4-DandoriDesktop/issues) on the repo so I can keep them tracked. Be sure to include as much as you can to help me reproduce (potentially including your game file in question if relevant).

Feel free to also message me on Discord (`noodl_`)/in the Hocotate Hacker server to say you've posted one or to discuss it.

To request a feature, also submit a GitHub issue.

## 👷‍♂️ Developer Notes

DDT is an Electron app (built from electron-forge) made with React + Tailwind (not sure if I regret that choice or not). It is definitely not the cleanest codebase. Lots has been written in varying methodologies either to work now, or to be scalable to later additions.

It also contains quite a lot of idiosyncracies from DandoriDB, as I based it off that, so some logic from there had to be mangled to work locally, and I opted not to stick with some of its conventions.

Much of the data used in name maps/defaults has been scraped from the game files. [scrape.js](https://github.com/Chagrilled/P4-DandoriDesktop/blob/master/scrape.js) contains the code used to produce `entity.json` which is a list of every possible value that keys in the ActorGeneratorList (AGL)s can have for each creature.

If you want to run from source, you'll need npm and Node (I've been using Node 20), and a simple `npm i` and `npm start` should get you going.

Unit tests can be ran for regression testing with `npm run test` (though they're just dummy atm)

### 🤖 AI

AI. Much of the difficulty of this and in-game bugs stem from the AI parameter. [I'd recommend reading up on it on TKB](https://pikmintkb.com/wiki/ActorSerializeParameter_and_AI).

AI is a byte array within each actor's `ActorSerializeParameter.AI.Static`, and defines the per-instance behaviour of an actor - its drops, ranges, conditions, etc. They vary per type of entity it is defining AI for. It's my belief this is overlayed on top of an entity's defaults, and so can override them. Due to this, AI is a varying length struct, and difficult to work out at times. I've tried not to overcomplicate the code that reads/writes to it, and leave it fairly primitive.

AI editing works as such - the bytes I expose, I'm confident I understand and can modify. Those that are not deemed worth editing/exposing, or are not understood are either given sensible, frequently occurring, default values, or are taken from _the first AI parameter in the game, that that enemy appears for_ (main areas first, then caves).
 
The bytes I construct are then spliced together with the base template for that enemy, and written to the AGL. <b>It is therefore possible that the base template includes some odd overrides, like territory for example, that may be pervasive</b>.

<hr/>

## 🏗️ To Do List:

<details>
<summary>To Do List</summary> 

- ✅ Legend
- ✅ Read other objects/placeables
- 🚧 Support all object AI. This is a huge task.
- 🚧 Teki editor
- ✅ Save to AGL  
- ✅ Integrate with deployment tools 
- ✅ Click to create entities 
    - ✅ construct actors from dataset 
- ✅ Drag entities 
- ✅ Edit existing tekis
    - ✅ change mob
    - ✅ make the rest editable like scale. sliders? 
- ✅ bin icon to delete 
- ✅ Undo deletes 
- ❌ Optimise IPC operations with caches in main process?
- ✅Toast messages 
- ✅ActorSpawners 
- ✅ Hook up the drop inputs 
- ❌ Refactor to use context to help global state stuff?
- ❌ Error handling when stuff like bad JSON is attempted to be parsed
- ✅❗ Debounce all inputs 
- ❌ kurage fall AI - cave024_f03 - how is FallStart defined in the AI bytes?
- ❌ Get default flags for each mob type? are they even flags
- ✅ Do water boxes
- ✅ Option to flip internal and English names in dropdowns/infopanels
- ✅ Support misc items as drops
- ❌ Vertical coordinates - idk what to do about this since we're on a 2D plane
- 🚧 Refactor all the main.js functions so the file isn't so dumb
- ✅ GDM drops
- ✅ Egg tekis and their drops 
- ❌ Rename all creature/creatureId references to entityId
- ❌ Work out what the bytes are after the inventory so we don't set every default to some weird override
- ❌ Draw radius around ActorSpawners/GDMs when highlighted
- ❗ Jellyfloats seem broken when spawned by ActorSpawners? They just don't attack anything - I think they may have more important ties to their Territory and EatArea params that are often provided by the blueprints overriding the AI variable. There are no examples of kurage ActorSpawners. Might have to find another enemy being given territory parameters via spawners and understand the final bytes. It doesn't seem limited to just them. GrubChucker also showed very little natural aggression. Maybe aggression is tied to territory, and if they're out of it, they don't care, and the territory is out near the actorspawner? Idk I lowered the AS to be nearer to the 'ground', and they still seem unbothered. Must investigate later. KingChappy is very happy to chase me around and try eat me. I've tried using bSetTerritory as an offset and absolute position, and Foolix just wants to slink off somewhere slightly northwest of the spawn platform way off in the abyss. Using 0/0/310 as the vector made him go in a totally different direction, so it definitely does SOMETHING
- ❌ Fix the CSS of the map buttons being killed by tailwind
- Front page styling
- ❌ Work out why BigFireTank doesn't get a model
- ❌ Night teki files
- 🚧 Unit tests (lol)
- ✅ GitHub issue template
- ✅ Flint beetle drops
- ❌ How skutterchucks start with bombs - probably a CustomParameter
- ✅ Make `params` actually the fields they are now I know what it is
- ✅ RebirthLater/RebirthInterval
- ✅ Extract JSONs button
- ✅ Send a message if people's uasset isn't the decoded `Content` array
- ✅ Fix icons for night enemies in caves
- ❌ Dandori battle maps - where/what even are they?
- ✅ Support castaway drops (untested in game, but AI looks correct)
- ❌ Better error reporting for the deploy process
- ✅ Alphabetise the creature dropdown by the type of name we're displaying first (swapping internal names still makes them ordered by internal) 
- ✅ Refactor/cleanup the icons so there aren't duplicates
- 🚧 Rotate icons that require it, like bridges/gates so they look better - works for most, some icons are being funny
- ❌ How does hazard AI work? Surely you can override the HibaBase blueprint - Some HibaIce do this in their HibaAIParameters, but the changes aren't reflected in the AI.
- ❌ Refactor the map to see if I can separate state from the map data, which might fix the component-refreshing problem. A bit similarly to filters. Perhaps the map doesn't have to use the main data set and can maintain its own without having the main map set as a prop? 
- ✅ Portals
- ✅ Need a way to arbitrarily add parameters to objects, so swapping to things like gates, where `Life` is needed, but not anywhere else, is possible for newly created objects.
- ❌ Marigumo net
- ❌ CIDList for hydrojelly
- ❌ How do handleboard weights work
- 🚧 Base camp AI - some of the genvar bytes are editable, but I haven't been able to create a new, locked base.
- 🚧 Missing icons - excavation, ojama blocks, bookends, bank - for now some are mapped to a default icon
- ❌ Refactor `regenerateAGLEntity` and `constructActor` as they're getting very similar now
- ❌ Implement some tracking during byte reading/writing to let the UI indicate at least _a little bit_ what went wrong, like what property we were trying to read when throwing.

</details>

## 🐛 Bugs/Known Issues:

<details>
<summary>Bugs List</summary>

- 🐛 Map unzooming on re-render - can't reaaaaally fix this. Map is tied to the map elements, so React will re-render the component when it updates, which is how the map updates. I could look into retaining the zoom and position, but idk
- ✅ Map select re-render bug
- ✅ Can't type into amount freely (debounce should fix)
- 🐛 Castoc's error reporting is bad - is it because it's bundled into the robocopy one with errorCode > 7, or is it because castoc doesn't really error properly.
- ✅ Letting input fields fire when being empty often just deletes the entire field
- 🐛 Inputting malformed data will often error - usually when using bad array types like `ignoreCID`
- ❓ Scientific notation numbers are transformed to standard form. Conversion is correct, so unsure if problematic. GJumpPoint_LivingRoom in Area010 is an example
- ❌ The entire UI - yes I know, styling is not my idea of fun.
- ✅ Fix inventories where bSetTerritory is true - this causes 4 more bytes to exist, which would mess up the inventory byte (cave007_F00 minimochi egg drop)
- ✅ Flint beetle drops are different to normal enemies (Giant's Hearth flint beetle near lemon) - No they weren't, they were just pellets that I hadn't supported yet
- ✅ DebouncedInput doesn't get to reinitialise state when swapping to a new entity, and thus doesn't refresh when a new InfoPanel is rendered
- ✅ Exception is thrown early if no teki file is present - Cave004_F00 is an example of this where no teki file naturally exists
- ✅ DebouncedInput didn't update if dragging entities around the map, because the transform was only looking for changes observed by the input
- 🐛 Some objects just crash the game upon being added to an AGL (at least the prologue). Probably not a bug per se, but just how the entities work.
- 🐛 Icons that are filtered off the map still have their draggable center on hover
- 🐛 Changing entity IDs for things like pots will probably mess up the inventoryEnd indices for AI arrays?
- ✅ Changing entity types of existing actors caused it to apply the AI constructor to the bytes of a different entity type, which can make them radically different. i.e a NoraSpawner function applied to the bytes of a Gate (changed to a NoraSpawner). All asset swaps will use the defaults.
- 🐛 In some very unknown circumstances the debuguniqueID isn't getting string-protected and the end is getting truncated to 2000, which causes encoding to fail. Not sure why or how.
- ✅ Copying entities with ctrl+V causes their nested objects (AIProperties etc) to be cloned as references not values since spread is a shallow clone, so modifying one changes all clones.

</details>

### Missing Graphics:

I'm missing icons for the following entities, and wouldn't mind if anyone wants to make some:

- Cushions
- Bookends
- Bank
- Probably more

### Supported Objects:

These objects have (most) of their pertinent bytes parsed and displayed for manipulating. Objects not in this list will have their properties retained, and new ones taken from the default data. YMMV.

 - ✅ Pots - Inventory length is the first byte followed by the slots, as normal
 - ✅ Tateana (those holes) - basically just pot inventories
 - ✅ NoraSpawners - diagram on TKB.
 - ✅ CrushJelly - They're just pots. There's a `searchCIDList` array which seems to be items that can be "in" the jelly (as in pre-spawned items, not drops on destroy), which isn't supported yet.
 - ✅ Portals - TriggerPortal is fully supported, so you can link portals to wherever you like. Results may vary. Some parameters are completely unknown in purpose/formula, like `PanzakuPriority` and `DisablePikminFlags`. I have no idea how to calculate the latter.
 - ✅ Gates - Health is adjustable and they can be given drops. I don't know what `RareDropParameter` is, but I've exposed it for editing.
 - 🚧 Paper bags - you can adjust their weight requirement. I've not looked at their AI to see if they have an inventory to mutate.
 - 🚧 Bases - The genvar's fields are editable, but I've not tested new areas. The base text names isn't in the actor, so there's more to the base system I think.
 - ✅ TriggerDoor (these don't seem to work with enemy counts?)
 - ✅ Switches
 - ✅ Tunnels
 - ❌ Circulators
 - ❌ Bridges/buildables
 - ✅ Mush
 - ✅ Stickyfloors
 - ❌ PanModoki/breadbug burrows
 - ❌ Hazards - I have no leads on how these bytes work 🥲
 - ❌ Cardboard boxes
 - ❌ Hangboards - WorkNum is at [155] too
 - 🚧 Conveyors - switches reverse direction - I have no idea what conveyor navs do then 🤷‍♂️ but they have a lot of extra AI bytes
 - ❌ Fences - fences with switch IDs start on byte 155 as well, but there's lots of extra stuff, and the switch name isn't defaulted
 - ✅ Valves (can these link up to triggerdoors and conveyors? No they can't). Not sure if ValveVariable is meant to be able to turn multiple times or not.
 - ✅ Sprinklers - these are volatile and easy to break. 
   - To have a valve that is permanently on - enable `bSprinklerOnly` and set `valveID` to `None`. 
   - To connect a valve, match the `valveID` to the valve object's ID. The only valve config I've found works is to use the `Build` workType. This setup will have a sprinkler turn on once for `OpenTime` number of seconds upon valve activation, then turn off - this is how Cave013 douses fire. 
   - To have a sprinkler always on, make a `NavMeshTriggerLinkForSplash` object on top of the sprinkler, and make the `NavMeshTriggerID`s for both match. The sprinkler and valve cannot have the same `demoBindName`. I've not played much with these, but I believe they _may_ be to do with saving the state of the sprinkler after the cutscene has played. In my working example, I used `GSprinkler05` and `GValveOnce06` for my `demoBindName`s, and `demoId` of `0`.
  - ✅ Geysers

