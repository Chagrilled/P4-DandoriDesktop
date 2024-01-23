// Place in a decoded Carrot4/Maps and run
// Combs all maps for their teki/object files and collects every variation
// each parameter in the AGL can have. Arrays are stringified for comparison.
// Doesn't include night time parameters
// Also prints every asset name defined in an AGL - this list isn't comprehensive as 
// some assets are not spawned by the AGLs
const { readdirSync, readFileSync, writeFileSync } = require('fs');

const data = {};
const names = [];
const arrays = [
    "Hash",
    "CheckComp",
    "Affordance",
    "CakAudioTable",
    "CakEmitterConfig",
    "Strategy",
    "Life",
    "AI",
    "ActorParameter",
    "SubAI",
    "PortalTrigger",
    "DemoTrigger",
    "Pikmin",
    "CharacterEdit",
    "PopPlace",
    "CakSimpleState",
    "CakAudioTable",
    "WaterTrigger",
    "NavMeshTrigger",
    "HiddenBoxTrigger",
    "NarrowSpaceBoxTrigger",
    "WarpTrigger",
    "ActionMarker"
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

const pushIfNew = (tekiName, key, value) => {
    data[tekiName][key].indexOf(value) == -1 ? data[tekiName][key].push(value) : {};
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
        pushIfNew(tekiName, "ExploreRateType", ExploreRateType);
        pushIfNew(tekiName, "OutlineFolderPath", OutlineFolderPath);
        pushIfNew(tekiName, "DebugUniqueId", GenerateInfo.DebugUniqueId);
        pushIfNew(tekiName, "SaveFlag", RebirthInfo.SaveFlag);
        pushIfNew(tekiName, "OriginalPhysicsRadiusZ", OriginalPhysicsRadiusZ);
        pushIfNew(tekiName, "GenerateFlags", GenerateFlags);
        pushIfNew(tekiName, "GeneratorVersion", GeneratorVersion);
        pushIfNew(tekiName, "AssetVersion", AssetVersion);

        arrays.forEach(key => {
            if (JSON.stringify(data[tekiName][key]).indexOf(JSON.stringify(ActorSerializeParameter[key])) == -1) {
                data[tekiName][key].push(ActorSerializeParameter[key]);
            }
        });
    });
};

readdirSync('Main/Area').forEach(areaDir => {
    if (areaDir == 'Area500') return;
    const day = areaDir.startsWith('Cave') || areaDir === 'Area011' ? '' : '_Day';
    const tekiFile = readFileSync(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Teki${day}.json`, { encoding: 'utf-8' });
    const jsonTeki = JSON.parse(protectNumbers(tekiFile));
    parser(jsonTeki);
    const objFile = readFileSync(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Objects${day}.json`, { encoding: 'utf-8' });
    const jsonObj = JSON.parse(protectNumbers(objFile));
    parser(jsonObj);

    const baseObjFile = readFileSync(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Objects.json`, { encoding: 'utf-8' });
    const jsonBaseObj = JSON.parse(protectNumbers(baseObjFile));
    parser(jsonBaseObj);

    try {
        const heroTekiFile = readFileSync(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Hero_Teki.json`, { encoding: 'utf-8' });
        const heroJsonTeki = JSON.parse(protectNumbers(heroTekiFile));
        parser(heroJsonTeki);
        const heroObjFile = readFileSync(`Main/Area/${areaDir}/ActorPlacementInfo/AP_${areaDir}_P_Hero_Objects.json`, { encoding: 'utf-8' });
        const heroJsonObj = JSON.parse(protectNumbers(heroObjFile));
        parser(heroJsonObj);
    } catch (e) { console.log(e); } // cba to filter out the non-hero stages
});

readdirSync('Madori/Cave').forEach(cave => {
    readdirSync(`Madori/Cave/${cave}`).forEach(subLevel => {
        if (['Cave004_F00', 'Cave013_F02'].includes(subLevel)) return; //idk these ones don't have teki files - didn't want to try/catch
        const tekiFile = readFileSync(`Madori/Cave/${cave}/${subLevel}/ActorPlacementInfo/AP_${subLevel}_P_Teki.json`, { encoding: 'utf-8' });
        const jsonTeki = JSON.parse(protectNumbers(tekiFile));
        parser(jsonTeki);
        const objFile = readFileSync(`Madori/Cave/${cave}/${subLevel}/ActorPlacementInfo/AP_${subLevel}_P_Objects.json`, { encoding: 'utf-8' });
        const jsonObj = JSON.parse(protectNumbers(objFile));
        parser(jsonObj);
    });
});

writeFileSync('output-pretty.json', unprotectNumbers(JSON.stringify(data, null, 4)));
writeFileSync('output-compressed.json', unprotectNumbers(JSON.stringify(data)));
writeFileSync('names.json', JSON.stringify(names, null, 4));


// Scraper to pull _some_ treasure names from the zukan file
// I still had to add a few myself like the hero parts that don't seem to appear in the zukan
// but are in my original list
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
