# 🌸 Dandori Desktop

A Pikmin 4 editing tool to assist with modding. Still very beta. <b>Please backup any files before you let DDT touch them)</b>.

Special thanks goes to Dodiou to making [DandoriDB](https://github.com/Dodiou/DandoriDB) which gave me the basis for the map projection, and thus motivation to make this.


- [🌸 Dandori Desktop](#-dandori-desktop)
   * [🛠️ Setup/Workflow](#%EF%B8%8F-setupworkflow)
   * [✏️ Editing](#%EF%B8%8F-editing)
      + [🗺️ Maps](#%EF%B8%8F-maps)
      + [📦️ Objects](#%EF%B8%8F-objects)
   * [🐛 Bug Reporting/Feature Requests](#-bug-reportingfeature-requests)
   * [👷‍♂️ Developer Notes](#%EF%B8%8F-developer-notes)
      + [🤖 AI](#-ai)
   * [🏗️ To Do List:](#%EF%B8%8F-to-do-list)
   * [🐛 Bugs/known issues:](#-bugsknown-issues)

Currently supports:

- Displaying enemy entities on the each map
- Editing/creating creatures/creature-related gimmicks
- Manipulating drop tables
- Writing back to game files
- Primitive editing of some enemy parameters
- A little bit of devops to make modding faster
- Some tools to help with manual modding

## 🛠️ Setup/Workflow

DDT reads and writes to local game files that must be decoded to their JSON forms from extracted `.uasset` files. It is assumed you have these files already.

Use the `Settings` menu to set 4 things:

- `Carrot4 Folder` - Folder containing your game file structure as JSON - this should contain `Maps/` and `Placeables/`
- `Encoder Folder` - Folder containing [P4UassetEditor](https://gamebanana.com/tools/15077). Assumes the files/folders are not renamed
- `castoc Folder` - Folder containing `castoc`. Assumes the files/folders are not renamed
- `Output Paks Folder` - Folder (probably) in your emulator you want your built mod's outputs to go to

My folder structure looks like:

```
Desktop/
├── P4UassetEditor/
│   ├── _EDIT/
│   │   └── Carrot4/
│   │       ├── Maps/
│   │       │   ├── Main/
│   │       │   |   └── ...
|   |       |   └── Madori/
│   │       └── Placeables
│   ├── _OUTPUT
│   └── encode.bat
└── castoc/
    ├── _EDIT/
    │   └── Carrot4/
    │       └── Content/
    │           └── Carrot4/
    │               └── Maps
    ├── _OUTPUT
    └── PACKFILES.bat
```

Within my map folders, I _only_ have `ActorPlacementInfo/AP_...Teki.json`.

## ✏️ Editing

### 🗺️ Maps

Entities that populate the map are read from each area's `AP_...Teki.json`'s `ActorGeneratorList`. All changes will be written back to these files. 

Once you want to commit your map changes back, click `Tools > Save Entities to JSON`, to write back to the files.

Once you want to output these to your emulator, use `Tools > Deploy to Emulator` to run the toolchain for you. This consists of encoding the JSONs, copying the output to `castoc`, packing, and copying _that_ output to your destination folder.

🖱️ Right click to use the creation menu to add new entities

❗`castoc`'s error reporting doesn't seem so good (or it's how I invoke it), and it doesn't actually report a failure. If you don't get the full load of toast messages, ending in `Paks copied to "D:/your/output/folder"` then you may want to run the tools manually to see what's going on.

❗For the most part, the app is not fully user-safe and will not try to protect your inputs. Therefore, ensure you are keeping your input data in the correct types - array remain strict arrays, lists of strings (like `ignoreList` are correctly formatted - `["Kochappy", "Mush"]`) etc.

### 📦️ Objects

The object editor is currently very primitive, and basically just displays JSON on screen like a worse IDE. However it only displays the things people usually want to edit, so can be a little faster to use in that regard.

The design philosophy is a little weird for this one. There are far far too many parameters for me to build a UI around each one and make it look really good, and many are often deeply nested in JSON, and due to the coverage of our understanding of parameters, this nesting is often helpful to discern something's purpose. So I left it all in.

## 🐛 Bug Reporting/Feature Requests

Bugs will be bountiful. Please check the [🐛bug list](#-bugsknown-issues)/existing issues before posting.

If you find one, plese use the devtools (while they still exist in the prod build) to copy/screencap any error traces from the JavaScript console, and (ideally) create an [issue](https://github.com/Chagrilled/P4-DandoriDesktop/issues) on the repo so I can keep them tracked. Be sure to include as much as you can to help me reproduce (potentially including your game file in question if relevant).

Feel free to also message me on Discord (`noodl_`)/in the Hocotate Hacker server to say you've posted one or to discuss it.

To request a feature, also submit a GitHub issue.

## 👷‍♂️ Developer Notes

DDT is an Electron app (built from electron-forge) made with React + Tailwind (not sure if I regret that choice or not). It is definitely not the cleanest codebase. Lots has been written in varying methodologies either to work now, or to be scalable to later additions.

It also contains quite a lot of idiosyncracies from DandoriDB, as I based it off that, so some logic from there had to be mangled to work locally, and I opted not to stick with some of its conventions.

Much of the data used in name maps/defaults has been scraped from the game files. [scrape.js](https://github.com/Chagrilled/P4-DandoriDesktop/blob/master/scrape.js) contains the code used to produce `tekiData.json` which is a list of every possible value that keys in the ActorGeneratorList (AGL)s can have for each creature.

### 🤖 AI

AI. Much of the difficulty of this and in-game bugs stem from the AI parameter. I'd recommend reading up on it on TKB (after I write the articles).

AI is a byte array within each actor's `ActorSerializeParameter.AI.Static`, and defines the per-instance behaviour of an actor - its drops, ranges, conditions, etc. They vary per type of entity it is defining AI for. It's my belief this is overlayed on top of an entity's defaults, and so can override them. Due to this, AI is a varying length struct, and difficult to work out at times. I've tried not to overcomplicate the code that reads/writes to it, and leave it fairly primitive.

AI editing works as such - the bytes I expose, I'm confident I understand and can modify. Those that are not deemed worth editing/exposing, or are not understood are either given sensible, frequently occurring, default values, or are taken from _the first AI parameter in the game, that that enemy appears for_ (main areas first, then caves).
 
The bytes I construct are then spliced together with the base template for that enemy, and written to the AGL. <b>It is therefore possible that the base template includes some odd overrides, like territory for example, that may be pervasive</b>.

<hr/>

## 🏗️ To Do List:

<details>
<summary>To Do List</summary> 

- ❌ Legend
- ❌ Read other objects/placeables
- 🚧 Teki editor
- ✅ Save to AGL  
- ✅ Integrate with deployment tools 
- ❌ Formatted view for???
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
- ❗ Jellyfloats seem broken when spawned by ActorSpawners? They just don't attack anything - I think they may have more important ties to their Territory and EatArea params that are often provided by the blueprints overriding the AI variable. There are no examples of kurage ActorSpawners. Might have to find another enemy being given territory parameters via spawners and understand the final bytes. It doesn't seem limited to just them. GrubChucker also showed very little natural aggression. Maybe aggression is tied to territory, and if they're out of it, they don't care, and the territory is out near the actorspawner? Idk I lowered the AS to be nearer to the 'ground', and they still seem unbothered. Must investigate later. KingChappy is very happy to chase me around and try eat me.
- ❌ Fix the CSS of the map buttons being killed by tailwind
- Front page styling
- ❌ Work out why BigFireTank doesn't get a model
- ❌ Night teki files
- ❌ Unit tests (lol)
- ❌ GitHub issue template

</details>

## 🐛 Bugs/Known Issues:

<details>
<summary>Bugs List</summary>

- 🐛 Map unzooming on re-render - can't reaaaaally fix this. Map is tied to the map elements, so React will re-render the component when it updates, which is how the map updates. I could look into retaining the zoom and position, but idk
- 🐛Map select re-render bug
- ✅ Can't type into amount freely (debounce should fix)
- 🐛Castoc's error reporting is bad - is it because it's bundled into the robocopy one with errorCode > 7, or is it because castoc doesn't really error properly.
- 🐛 Letting input fields fire when being empty often just deletes the entire field
- 🐛 Inputting malformed data will often error - usually when using bad array types
- ❌ Not a bug - `Internal Names First` only affects the creature list, as I doubt anyone knows/wants the treasure/misc items named internally. It was mainly to seek to them faster via the dropdowns. Let me know if this is weird or not.
- ❓ Scientific notation numbers are transformed to standard form. Conversion is correct, so unsure if problematic. GJumpPoint_LivingRoom in Area010 is an example
- ❌ The entire UI - yes I know, styling is not my idea of fun.

</details>