// Place in a decoded Carrot4/Maps and run
// Combs all maps for their teki/object files and collects every variation
// each parameter in the AGL can have. Arrays are stringified for comparison.
// Also prints every asset name defined in an AGL - this list isn't comprehensive as 
// some assets are not spawned by the AGLs

// Also collects the Sublevels/ teki and object files for the exposed parameter config, for mining purposes
const { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } = require('fs');

const data = {};
const names = [];
const arrays = [
    'AI',
    'ActionMarker',
    'ActorParameter',
    'Affordance',
    'CakAudioTable',
    'CakEmitterConfig',
    'CakMultiplePosition',
    'CakSimpleState',
    'CakTrigger',
    'CharacterEdit',
    'CheckComp',
    'DemoTrigger',
    'Hash',
    'HiddenBoxTrigger',
    'Life',
    'NarrowSpaceBoxTrigger',
    'NavMeshTrigger',
    'Pikmin',
    'PopPlace',
    'PortalTrigger',
    'Strategy',
    'SubAI',
    'WarpTrigger',
    'WaterTrigger'
];

// Same as in main.js - stops JS truncating numbers > MAX_SAFE_INTEGER
const protectNumbers = string => {
    string = string.replace(/ ([0-9]{16,})/g, ' "$1"');
    return string;
};

const unprotectNumbers = string => {
    string = string.replace(/\s\"([0-9]{16,22})\"/g, ' $1');
    return string;
};

const reader = (filePath, func) => {
    const rawFile = readFileSync(filePath, { encoding: 'utf-8' });
    const json = JSON.parse(protectNumbers(rawFile));
    func(json);
};

if (process.argv[2]) {
    mkdirSync('extractions', { recursive: true });
    reader('./src/api/entityData.json', json => {
        writeFileSync(`extractions/${process.argv[2]}.json`, unprotectNumbers(JSON.stringify(json[process.argv[2]], null, 4)), { encoding: 'utf-8' });
    });
    return;
}

const pushIfNew = (obj, tekiName, key, value) => {
    obj[tekiName][key].indexOf(value) == -1 ? obj[tekiName][key].push(value) : {};
};

const parser = (jsonTeki) => {
    jsonTeki.Content[0].ActorGeneratorList.forEach(({
        AssetVersion,
        GeneratorVersion,
        OriginalPhysicsRadiusZ,
        GenerateFlags,
        SoftRefActorClass,
        ExploreRateType,
        OutlineFolderPath,
        GenerateInfo,
        ActorSerializeParameter,
        RebirthInfo
    }) => {
        const tekiName = SoftRefActorClass.AssetPathName.split('.')[1].slice(1, -2);
        if (!data[tekiName]) data[tekiName] = {
            ExploreRateType: [],
            OutlineFolderPath: [],
            DebugUniqueId: [],
            CheckComp: [],
            GenerateFlags: [],
            SaveFlag: [],
            GeneratorVersion: [],
            AssetVersion: [],
            OriginalPhysicsRadiusZ: [],
            ...arrays.reduce((acc, key) => ({
                ...acc,
                [key]: []
            }), {})
        };
        if (!names.includes(SoftRefActorClass.AssetPathName)) {
            names.push(SoftRefActorClass.AssetPathName);
        }
        pushIfNew(data, tekiName, "ExploreRateType", ExploreRateType);
        pushIfNew(data, tekiName, "OutlineFolderPath", OutlineFolderPath);
        pushIfNew(data, tekiName, "DebugUniqueId", GenerateInfo.DebugUniqueId);
        pushIfNew(data, tekiName, "SaveFlag", RebirthInfo.SaveFlag);
        pushIfNew(data, tekiName, "OriginalPhysicsRadiusZ", OriginalPhysicsRadiusZ);
        pushIfNew(data, tekiName, "GenerateFlags", GenerateFlags);
        pushIfNew(data, tekiName, "GeneratorVersion", GeneratorVersion);
        pushIfNew(data, tekiName, "AssetVersion", AssetVersion);

        arrays.forEach(key => {
            if (JSON.stringify(data[tekiName][key]).indexOf(JSON.stringify(ActorSerializeParameter[key])) == -1) {
                data[tekiName][key].push(ActorSerializeParameter[key]);
            }
        });
    });
};

const sublevelData = {};
const placeableData = {};

const sublevelParser = data => {
    data.forEach(obj => {
        if (!obj.Template || !['ActorSpawner_GEN_VARIABLE', 'AI_GEN_VARIABLE', 'GroupDropManager_GEN_VARIABLE', 'PortalTrigger_GEN_VARIABLE'].some(s => obj.Template.includes(s)) || !obj.Properties) return;
        Object.entries(obj.Properties).forEach(([key, val]) => {
            // console.log(key);
            if (!sublevelData[obj.Template]) sublevelData[obj.Template] = {};
            looper(sublevelData[obj.Template], val, key);
        });
    });
};

const blueprintParser = data => {
    data.Content.forEach(obj => {
        if (!obj.Name || !['ActorSpawner_GEN_VARIABLE', 'AI_GEN_VARIABLE', 'GroupDropManager_GEN_VARIABLE', 'PortalTrigger_GEN_VARIABLE'].some(s => obj.Name.includes(s)) || !obj.Properties) return;
        Object.entries(obj.Properties).forEach(([key, val]) => {
            if (!placeableData[obj.Name]) placeableData[obj.Name] = {};
            if (typeof val !== 'object') {
                if (!placeableData[obj.Name][key]) placeableData[obj.Name][key] = [];
                placeableData[obj.Name][key].push(val);
            } 
            else looper(placeableData, val, key);
        });
    });
};

const looper = (parent, obj, key, arrayVal) => {
    // console.log("looper: ", parent, obj, key, arrayVal)
    if (["CreationMethod", "bNetAddressable", "UCSSerializationIndex", "UCSModifiedProperties", "UniqueId", "DebugUniqueIdList"].some(s => key === s)) return;
    if (Array.isArray(obj)) {
        if (!parent[key]) parent[key] = {};
        obj.forEach(o => looper(parent[key], o, key, true));
    }
    else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        if (!parent[key]) parent[key] = {};
        Object.entries(obj).forEach(([k, val]) => {
            looper(parent[key], val, k);
        });
    }
    else if (!Array.isArray(obj)) {
        // Arrays can be arrays of objects or simple values, so if it gets to here
        // we know it's an array of values.
        if (arrayVal) {
            if (!parent.arrayValues) parent.arrayValues = [];
            parent.arrayValues.indexOf(obj) == -1 ? parent.arrayValues.push(obj) : {};
        }
        else {
            if (!parent[key]) parent[key] = [];
            if (typeof parent[key] === 'object' && !Array.isArray(parent[key])) {
                if (!parent[key].nonObjectValues) parent[key].nonObjectValues = [];
                parent[key].nonObjectValues.indexOf(obj) == -1 ? parent[key].nonObjectValues.push(obj) : {};
            }
            else parent[key].indexOf(obj) == -1 ? parent[key].push(obj) : {};
        }
    }
};

readdirSync('Main/Area').forEach(areaDir => {
    if (areaDir == 'Area500') {
        reader(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Objects.json`, parser);
        return;
    }
    const day = areaDir === 'Area011' ? '' : '_Day';
    reader(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Teki${day}.json`, parser);
    reader(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Objects${day}.json`, parser);
    reader(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Objects.json`, parser);

    reader(`Main/Area/${areaDir}/Sublevels/${areaDir}_Teki${day}.json`, sublevelParser);
    reader(`Main/Area/${areaDir}/Sublevels/${areaDir}_Objects${day}.json`, sublevelParser);
    reader(`Main/Area/${areaDir}/Sublevels/${areaDir}_Objects.json`, sublevelParser);
    if ((areaDir !== 'Area011')) {
        reader(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Teki_Night.json`, parser);
        reader(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Objects_Night.json`, parser);
        reader(`Main/Area/${areaDir}/Sublevels/${areaDir}_Teki_Night.json`, sublevelParser);
        reader(`Main/Area/${areaDir}/Sublevels/${areaDir}_Objects_Night.json`, sublevelParser);
    }
    if (!['Area006', 'Area011', 'Area004'].includes(areaDir)) {
        try {
            reader(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Hero_Teki.json`, parser);
            reader(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Hero_Objects.json`, parser);
            reader(`Main/Area/${areaDir}/Sublevels/${areaDir}_Hero_Teki.json`, sublevelParser);
            reader(`Main/Area/${areaDir}/Sublevels/${areaDir}_Hero_Objects.json`, sublevelParser);

        } catch (e) { console.log("Ignore this error:", e); } // cba to filter out the non-hero stages
    }
});

readdirSync('Madori/Cave').forEach(cave => {
    readdirSync(`Madori/Cave/${cave}`).forEach(subLevel => {
        if (['Cave004_F00', 'Cave013_F02'].includes(subLevel)) return; //idk these ones don't have teki files - didn't want to try/catch
        reader(`Madori/Cave/${cave}/${subLevel}/ActorPlacementInfo/AP_${subLevel}_P_Teki.json`, parser);
        reader(`Madori/Cave/${cave}/${subLevel}/ActorPlacementInfo/AP_${subLevel}_P_Objects.json`, parser);
        reader(`Madori/Cave/${cave}/${subLevel}/Sublevels/${subLevel}_Teki.json`, sublevelParser);
        reader(`Madori/Cave/${cave}/${subLevel}/Sublevels/${subLevel}_Objects.json`, sublevelParser);
    });
});

const read = path => {
    readdirSync(path).forEach(file => {
        if (statSync(join(path, file)).isDirectory()) return read(join(path, file));
        reader(join(path, file), blueprintParser);
    });
};

readdirSync('Placeables').forEach(path => read(join('Placeables', path)));

writeFileSync('output-pretty.json', unprotectNumbers(JSON.stringify(data, null, 4)));
writeFileSync('output-compressed.json', unprotectNumbers(JSON.stringify(data)));
writeFileSync('sublevels.json', unprotectNumbers(JSON.stringify(sublevelData, null, 4)));
writeFileSync('names.json', JSON.stringify(names, null, 4));
writeFileSync('blueprints.json', unprotectNumbers(JSON.stringify(placeableData, null, 4)));

console.log("Wrote files");


// Scraper to pull _some_ treasure names from the zukan file
// I still had to add a few myself like the hero parts that don't seem to appear in the zukan
// but are in my original list. Full list is in the DDT code types.js
// const { readdirSync, readFileSync, writeFileSync } = require('fs');
// const names = [];

// const contents = readFileSync('Placeables/Zukan/DT_ZukanBP.json', { encoding: 'utf-8' });
// const json = JSON.parse(contents);
// Object.values(json.Content[1].Rows).forEach(o => {
//     if (o.DayCookBlueprint.AssetPathName.includes('Objects/Otakara')) {
//         names.push(o.DayCookBlueprint.AssetPathName.match(/\.G(.+)_C/)[1]);
//     }
// });
// writeFileSync('caps-output.json', JSON.stringify(names));

// const TreasureNames = {
//     otahanafudac: "Talisman of Life (Moon)",
//     otaheropartsf: "Libra",
//     otaheropartsa: "Whimsical Radar",
//     otaheropartsl: "Repair-Type Bolt",
//     otaheropartsv: "Extraordinary Bolt",
//     otaheropartsaa: "Automatic Gear",
//     otaheropartso: "Nova Blaster",
//     otaheropartsb: "Ionium Jet",
//     otaboat: "Unfloatable Boat",
//     otabiwa: "Velvety Dreamdrop",
//     otacherry: "Cupid's Grenade",
//     otatakowiener: "Octoplus",
//     otamatdollma: "Daughter Doll Head",
//     otamatdollmb: "Mooching Vase",
//     otatennisball: "Sphere of Fuzzy Feelings",
//     otahairpin: "Floral Instigator",
//     otaharmonica: "Wind Detector",
//     otacastanets: "Harmonic Synthesizer",
//     otaapricot: "Searing Acidshock",
//     otamusicboxa: "Mechanical Harp (Memory Song)",
//     otaringpop: "Sticky Jewel",
//     otapapercraneblu: "Sweat-Soaked Blue Bird",
//     otamelon: "Wayward Moon",
//     otabrusha: "Brush of Wisdom",
//     otagaragara: "Shake-a-Smile",
//     otaheropartsc: "Ionium Jet",
//     otaheropartsab: "Automatic Gear",
//     otaheropartsn: "Repair-Type Bolt",
//     otaheropartsj: "Omega Stabilizer",
//     otaheropartsu: "Extraordinary Bolt",
//     otaheropartsr: "Extraordinary Bolt",
//     otaheropartst: "Extraordinary Bolt",
//     otaheropartsd: "Radiation Canopy",
//     otafruitspickyel: "Bright Sword",
//     otapeach: "Mock Bottom",
//     otamoai: "Giant's Fossil",
//     otaraspberry: "Juicy Gaggle",
//     otawatermelon: "Crimson Banquet",
//     otagolfball: "Orbital Communication Sphere",
//     otastarfruit: "Stellar Extrusion",
//     otamuscat: "Dawn Pustules",
//     otaplum: "Lesser Mock Bottom",
//     otawhistle: "Emperor Whistle",
//     otaammolite: "Newtolite Shell",
//     otafishcruet: "Mystery Squish Fish",
//     otaocarinabrn: "Ambiguous Hostel",
//     otalime: "Zest Bomb",
//     otaducks: "Stately Rubber Cutie",
//     otamango: "Heroine's Tear",
//     otaeggplant: "Foolish Fruit",
//     otagoddess: "Lamp of Inspiration",
//     otabanana: "Slapstick Crescent",
//     kinkaistation: "Gold Nugget",
//     otaspongec: "Fishy Bed",
//     otalemon: "Face Wrinkler",
//     otasushiebi: "Fish-Bed Snack",
//     otayamashinju: "Princess Pearl",
//     otapinbadgeb: "Ring-of-Return Shield",
//     otaheropartsi: "Bowsprit",
//     otaheropartsk: "Repair-Type Bolt",
//     otaheropartsw: "Automatic Gear",
//     otaheropartsx: "Automatic Gear",
//     otaheropartse: "Sagittarius",
//     otaheropartss: "Extraordinary Bolt",
//     otaheropartsz: "Automatic Gear",
//     otaheropartsac: "Secret Safe",
//     otaduckl: "Universal Rubber Cutie",
//     otakushiyaki: "The Four Grill Brothers",
//     otaspongeb: "Birdy Bed",
//     otatrilobite: "Slipper-Bug Fossil",
//     otazucchini: "Crew-Cut Gourd",
//     otafruitspickblu: "Ice Sword",
//     otatomatom: "Love Nugget",
//     otatakenoko: "Anxious Sprout",
//     otadaruma: "Persistence Machine",
//     otapeanut: "Snack Bean",
//     otapapaya: "Seed Hive",
//     otacasinochip50: "Disk of Amusing Wisdom",
//     otakaki: "Portable Sunset",
//     otafeeddish: "Bathing Pool",
//     otapinbadged: "Heroic Shield",
//     otaavocado: "Scaly Custard",
//     otagrape: "Dusk Pustules",
//     otanashi: "Crunchy Deluge",
//     otabuttonplastic: "Fastening Item",
//     otagoldbar: "Golden Vaulting Table",
//     otagoldfish: "Faux Fishy",
//     otaichijiku: "Delectable Bouquet",
//     otamanekineko: "Beckoning Mannequin",
//     otalafrance: "Tremendous Sniffer",
//     otapapercranegld: "Priceless Bird",
//     otabankcarda: "Courage Emblem",
//     otabankcardb: "Power Emblem",
//     otabankcardc: "Wisdom Emblem",
//     otarobohead: "Think-Tank Combobot",
//     otaspongea: "Doggy Bed",
//     otarobohandl: "Peacemaker Combobot",
//     otarobolegl: "Sure-Footed Combobot",
//     otadentaku: "Number Jumper",
//     otadarts: "Relentless Spear",
//     otaengagering: "Unbreakable Promise",
//     otamacaronb: "S.S. Peppermint",
//     otapinbadgee: "Shooting-Star Shield",
//     otaphotoframe: "Buddy Display",
//     otamusicboxc: "Mechanical Harp (Windmills)",
//     otagbaromblk: "Spinning Memories Plank",
//     otamacaronc: "S.S. Chocolate",
//     otabuttonmetal: "Trap Lid",
//     otapaperballoon: "Divine Balloon",
//     otaheropartsad: "Pilot's Seat",
//     otaheropartsm: "Repair-Type Bolt",
//     otaheropartsp: "Interstellar Radio",
//     otaheropartsy: "Automatic Gear",
//     otaheropartsh: "Geiger Counter",
//     otaheropartsq: "Extraordinary Bolt",
//     otaheropartsg: "Chronos Reactor",
//     otahornbell: "Path Creator",
//     otahimefork: "Noble Bident",
//     otagbasp: "Stone of Advancement",
//     otapaintsaqu: "Refreshing Goo",
//     otacompass: "Director of Destiny",
//     otaboarderaser: "Dusty Bed",
//     otapaintsyel: "Illumination Goo",
//     otaisobeyaki: "Deceptive Snack",
//     otasweetpotato: "Daughter of the Earth",
//     otayoshicookiea: "Cookie of Nibbled Circles",
//     otajamichigo: "Condensed Sunshine",
//     otayoshicookiec: "Vanishing Cookie",
//     otaeclair: "Sweet Torrent",
//     otawaffle: "Cushion Cake",
//     otayoshicookieb: "Cookie of Prosperity",
//     otahanafudaa: "Talisman of Life (Crane)",
//     otapapercranered: "Skin of the Phoenix",
//     otapuzzlea: "Memory Fragment (Top Left)",
//     otafingerboard: "Personal-Injury Plank",
//     otapuzzled: "Memory Fragment (Top Right)",
//     otatraina: "Unlimited Locomotive",
//     otaloupe: "Detective's Truth Seeker",
//     otasmallbell: "Spouse Alert",
//     otapuzzlec: "Memory Fragment (Top...Probably?)",
//     otalightupringyel: "Hoop of Fortune",
//     otarailwaylined: "Back-at-the-Beginning Track",
//     otabilliardball9: "Sphere of Support",
//     otagripper: "Tandem Trainer",
//     otatrainb: "Middle-Management Tank Car",
//     otacounter: "Internal-Clock Measurer",
//     otabilliardball2: "Sphere of Family",
//     otapaintsblu: "Decorative Goo",
//     otamikan: "Citrus Lump",
//     otahandbell: "Time Marker",
//     otahanafudab: "Talisman of Life (Cherry Blossom)",
//     otakiwi: "Disguised Delicacy",
//     otagrapefruit: "Astringent Clump",
//     otakiwigld: "Blonde Impostor",
//     otamask: "Expression Hider",
//     otapretzel: "Puzzle Snack",
//     otagbmicrofc: "Micromanagement Station",
//     otathermometer: "Heat Sensor",
//     otalightupringblu: "Hoop of Healing",
//     otagbaromyel: "Masterpiece Plank",
//     otacroissant: "Flaky Temptation",
//     otapuzzlel: "Memory Fragment (Bottom Right)",
//     otapaintsblk: "Ambiguous Goo",
//     otacasinochip1: "Disk of Joyous Wisdom",
//     otaduckm: "Planetary Rubber Cutie",
//     otacandystick: "Sweet Stumble-Not",
//     otadice6wht: "Chance Totem",
//     otadoguhead: "Ancient Statue Head",
//     otaoshaburiblu: "False Lollipop",
//     otabottle: "Maternal Sculpture",
//     otaichigo: "Sunseed Berry",
//     otasushimaguro: "Maestro of Flavor",
//     otamangosteen: "Dapper Blob",
//     otafruitspickgrn: "Spirit Sword",
//     otabrushb: "Brush of Foolishness",
//     otatoothmodel: "Monster Teeth",
//     otagamaguchi: "Greed-Inducement Device",
//     otapuzzlee: "Memory Fragment (Left Edge)",
//     otapaintswht: "True Goo",
//     otarodan: "Contemplation Station",
//     otabilliardballcue: "Sphere of Truth",
//     otarailwaylinee: "Thrill-Ride Track",
//     otaeffectsunit: "Soul Reverberator",
//     otacandle: "Olfactory Sculpture",
//     otarailwaylinec: "Turn-of-Events Track",
//     otabilliardball4: "Sphere of Beginnings",
//     otaspeaker: "Amplified Amplifier",
//     otapadlock: "Secured Satchel",
//     otalightupringred: "Hoop of Passion",
//     otatomatos: "Crush Nugget",
//     otapuzzlek: "Memory Fragment (Bottom...Probably?)",
//     otapotato: "Child of the Earth",
//     otadice4sided: "Difficult-Choice Totem",
//     otaringo: "Insect Condo",
//     otapaintsppl: "Noble Goo",
//     otadisc: "Glinty Circular Disc",
//     otamusicboxb: "Mechanical Harp (Lullabies)",
//     otapaintsred: "Uniquely You Goo",
//     otamacarona: "S.S. Berry",
//     otafruitspickorn: "Heroic Sword",
//     otacasinochip25: "Disk of Sorrowful Wisdom",
//     otapaintsgrn: "Neon Goo",
//     otabilliardball1: "Sphere of Desire",
//     otavenus: "Unfinished Statue",
//     otapumpkin: "Mysterious Carriage",
//     otadragonfruit: "Fire-Breathing Feast",
//     otashutterglasses: "Don't-See-It Specs",
//     otadekopon: "Pocked Airhead",
//     otacollar: "Gift of Friendship",
//     otabilliardball7: "Sphere of Good Fortune",
//     otarailwaylinea: "Life Station",
//     otabilliardball6: "Sphere of Calm",
//     otasushitamago: "Belted Delicacy",
//     otasfcmouse: "Creativity Conduit",
//     otapuzzlef: "Memory Fragment (Center Left)",
//     otarappa: "Mega Horn",
//     otasqueezer: "Merciless Extractor",
//     otamatdollsa: "Granddaughter Doll Head",
//     otanesclassicmini: "Life Controller",
//     otamatdollsb: "Gifting Vase",
//     otapuzzleb: "Memory Fragment (Top-ish)",
//     otaicepick: "Shattering Lance",
//     otacasinochip100: "Disk of Surprising Wisdom",
//     otadice12: "Long-Shot Totem",
//     otacarddentaku: "Solar-Powered Computing Machine",
//     otadice20: "Go-with-the-Flow Totem",
//     ota3dmegane: "Dimension Converter",
//     otarobobody: "Nexus Combobot",
//     otarobolegr: "Kick-Start Combobot",
//     otahanafudad: "Talisman of Life (Rain)",
//     otapuzzlei: "Memory Fragment (Bottom Left)",
//     otayoshicookied: "Love's Fortune Cookie",
//     otayoshicookiee: "Hearty Container",
//     otabuttonwood: "Perforated Raft",
//     otacasinochip10: "Disk of Angry Wisdom",
//     otabilliardball8: "Sphere of Trust",
//     otarailwaylineb: "Straight-and-Narrow Track",
//     otajoyconl: "Telekinesis Detector",
//     otabilliardball3: "Sphere of Heart",
//     otafruitspickpnk: "Heart Sword",
//     otapuzzleh: "Memory Fragment (Right Edge)",
//     otagcconwb: "Winged Freedom Sculpture",
//     otabankcardblank: "Deity's Portrait",
//     otahandspinner: "Space Spinner",
//     otatrainc: "Leisure Car",
//     otapaintspnk: "Captivation Goo",
//     otapinbadgea: "Blast Shield",
//     otabankcardd: "Love Emblem",
//     otabankcarde: "Money Emblem",
//     otabankcardf: "Work Emblem",
//     otabankcardblank2: "Devil's Portrait",
//     otapudding: "Jiggle-Jiggle",
//     otapuzzlej: "Memory Fragment (Bottom-ish)",
//     otashinjitsu: "Mouth of Lies",
//     otaham: "King of Meats",
//     otamatdollla: "Mama Doll Head",
//     otakendamab: "Aspiration-Ritual Pole",
//     otabilliardball5: "Sphere of Vitality"
// };

// const newNames = {};
// names.forEach(name => {
//     if (!TreasureNames[name.toLowerCase()]) console.log("NOT FOUND", name)
//     newNames[name] = TreasureNames[name.toLowerCase()];
// });

// writeFileSync('parsed-output.json', JSON.stringify(newNames));
