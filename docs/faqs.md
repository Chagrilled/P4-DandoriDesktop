# ❓ FAQs

- [🐍 I can't install Cityhash](#-i-cant-install-cityhash)
- [🤔 I'm not seeing my mod's changes](#-im-not-seeing-my-mods-changes)
- [💥 I'm getting crashes](#-im-getting-crashes)
- [Can I skip the tutorial](#can-i-skip-the-tutorial)
- [I got an encoding error](#i-got-an-encoding-error)
- [Can I re-randomise mid-game?](#can-i-re-randomise-mid-game)

## 🐍 I can't install CityHash

First, ensure some basic things:

- You can run `python` from a Powershell
  - If you can't, make sure the location you installed Python to is on your `PATH` environment variable. It's an option during install, or edit the system environment variables in Windows.
  - In Powershell, run `$env:PATH` to see if your folder containing Python is on the `PATH`.
- You have the C++ redists installed - I have these two versions ([x64](https://aka.ms/vs/17/release/vc_redist.x64.exe) / [x86](https://aka.ms/vs/17/release/vc_redist.x86.exe))
- People have reported issues with Python 3.12+, possibly due to `pip` changes. Try downgrading to 3.11 or below.
- If you're getting an error like `SyntaxError: invalid syntax` you're running inside of a Python shell - quit of it with `exit()` and run your `pip install cityhash` in a *regular shell*. **You do not need to ever be inside Python**.

## 🤔 I'm not seeing my mod's changes

- If you've loaded into the save file before, you'll need to delete the generator save data. The game will only read from the map generators _once_. The resulting spawn lists are then saved to the slot, and they are not read from again. Thus, to regenerate spawns from your new mod's generators, you need to make the game read from them.
  - In your emulator, right click the game to quickly get to the save data folder
  - Open your save slot
  - Delete the map save(s) inside `gen` that you want to refresh. This will also revert any environmental changes like built bridges, destroyed objects, etc.
  - Do this every time you want to make a change after loading in in-game.
- If your mod isn't loading, make sure the pak paths are correct.
  - A correct mod path should look something like: `0100B7C00933A000\Randomiser\romfs\Carrot4\Content\Paks` - this is _case sensitive_
  - `Paks` is the folder to set in DDT's `Emulator Paks Output Folder`, which should contain your `Mod_P` files.

## 💥 I'm getting crashes

- Given the completely illogical nature of the randomiser, I can never guarantee the game won't ever crash. If it crashes upon loading an area:
  - Disable/remove other mods first before you dive into debugging randomiser
  - Here's how I debug loading crashes:
  - Assuming it's the first time you're entering an area, a gen save won't be created unless it loads and saves successfully, so we can keep deploying without clearing the saves.
  - Remove one of the JSONs for the crashing map (teki, objects_day, or permanent objects)
  - Deploy, load in, see if it crashes. If it doesn't, repeat and remove another.
  - Once the crash stops, you know the cause of the crash is in the file you just removed. From there, it's about deleting entities and redeploying until you find the one that crashes.
  - `bEnableFreezeBothDrop` may be a crash causer due to how it works. Some enemies seem to crash if the wrong value is used. The two files [freezeDrops](https://github.com/Chagrilled/P4-DandoriDesktop/blob/master/src/api/freezeDrops.json) and [freezeDrops-full](https://github.com/Chagrilled/P4-DandoriDesktop/blob/master/src/api/freezeDrops-full.json) can help determine if the entity ever has occurrences of true/false values for the parameter.
  - Another possibility is the entity it drops, but that usually crashes upon killing the dropper. To fix this you can remove the drop, but you'll need to delete the `gen` save to apply it in-game.
  - If you identity a crashing entity and can't fix it, feel free to message on HH Discord with your findings and I'll try look into it.

## Can I skip the tutorial

- Yes, grab [my starter save file](https://cdn.discordapp.com/attachments/1123566265106173972/1272331138165379073/C-Area500Start.zip?ex=66e6c076&is=66e56ef6&hm=8f2f72a8e548df6ae77b1bce9a0a35615378ccab8154d9a18f779edd44ea559f&)
  - Right click your emulator to get to the saves location
  - Replace the `C` folder with mine (removing the suffix after `C`)
  - Start game.

## I got an encoding error

- `Help` -> `Open Log Folder` -> open `deploy-log.txt` for the full error outputs

## Can I re-randomise mid-game?

Sort of - if you encounter a crashing map and don't want to debug, and haven't loaded into it yet, you can just re-randomise and deploy a new mod for a new seed. It'll only apply to future unloaded maps, and the parts of the game you've already loaded into.

This does mean the linking of caves may get messed up, depending on your settings.