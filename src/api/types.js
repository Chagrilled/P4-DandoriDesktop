export const DropConditions = {
    NO_SALVAGE_ITEM: 5,
    SALVAGE_ITEM: 6,
    PLAYED_DEMO: 7
};

export const DropConditions_Named = {
    4: "SalvageOtakara",
    5: "NoSalvageItem",
    6: "SalvageItem",
    7: "PlayedDemo",
    0: "None"
};

export const GameRulePermissionFlags = [
    0,
    2,
    7,
    15,
    269,
    271
];
export const ActorSpawnerCustomParameter = ["None", "ShoulderBomb", "Bomb", "SVSleep000", "LFSleep003"];

export const PikminColor = {
    Red: 'red',
    Yellow: 'yellow',
    Blue: 'blue',
    Purple: 'purple',
    White: 'white',
    Rock: 'rock',
    Wing: 'wing',
    Ice: 'ice',
    Glow: 'glow',
};

export const PikminSpawnState = {
    Sprouts: 'sprouts',
    Fighting: 'fighting',
    Idle: 'idle',
};

export const MarkerType = {
    // collectibles
    Treasure: 'treasure',
    CastawayNormal: 'castaway-normal',
    CastawayLeafling: 'castaway-leafling',
    Creature: 'creature',
    OnionFlarlic: 'onion-flarlic',
    OnionRed: 'onion-red',
    OnionYellow: 'onion-yellow',
    OnionBlue: 'onion-blue',
    OnionPurple: 'onion-purple',
    OnionWhite: 'onion-white',
    OnionRock: 'onion-rock',
    OnionWing: 'onion-wing',
    OnionIce: 'onion-ice',
    // pikmin
    PikminRed: 'pikmin-red',
    PikminYellow: 'pikmin-yellow',
    PikminBlue: 'pikmin-blue',
    PikminPurple: 'pikmin-purple',
    PikminWhite: 'pikmin-white',
    PikminRock: 'pikmin-rock',
    PikminWing: 'pikmin-wing',
    PikminIce: 'pikmin-ice',
    CandypopRed: 'candypop-red',
    CandypopYellow: 'candypop-yellow',
    CandypopBlue: 'candypop-blue',
    CandypopPurple: 'candypop-purple',
    CandypopWhite: 'candypop-white',
    CandypopRock: 'candypop-rock',
    CandypopWing: 'candypop-wing',
    CandypopIce: 'candypop-ice',
    // structures
    PileMaterials: 'pile-materials',
    StructureBridge: 'structure-bridge',
    StructureSlope: 'structure-slope',
    StructureValve: 'structure-valve',
    StructureWall: 'structure-wall',
    HazardSprinkler: 'hazardradial-sprinkler',
    // breakables
    BreakableHydrojelly: 'breakable-hydrojelly',
    BreakablePot: 'breakable-pot',
    BreakableKingcapnormal: 'breakable-kingcapnormal',
    BreakableSpotcapnormal: 'breakable-spotcapnormal',
    BreakableKingcappoison: 'breakable-kingcappoison',
    BreakableSpotcappoison: 'breakable-spotcappoison',
    MiscGroupdropmanager: 'misc-groupdropmanager',
    BreakableStraw: 'breakable-straw',
    BreakableIcebox: 'breakable-icebox',
    FirepitLit: 'firepit-lit',
    FirepitUnlit: 'firepit-unlit',
    BreakableCrystal: 'breakable-crystal',
    // items
    BreakableMound: 'breakable-mound',
    BreakableEgg: 'breakable-egg',
    MiscBomb: 'miscitem-bomb',
    MiscIcebomb: 'miscitem-icebomb',
    MiscSpicy: 'miscitem-spicy', // not an actual map marker, but is a drop marker
    MiscSpiderwort: 'misc-spiderwort',
    // hazards
    HazardSpoutFire: 'hazardspout-fire',
    HazardSpoutElectric: 'hazardspout-electric',
    HazardSpoutWater: 'hazardspout-water',
    HazardSpoutPoison: 'hazardspout-poison',
    HazardSpoutIce: 'hazardspout-ice',
    HazardSpoutBubble: 'hazardspout-bubble',
    HazardFloorfire: 'hazardradial-floorfire',
    HazardCharcoal: 'hazardmisc-charcoal',
    HazardFloormushroom: 'hazardradial-floormushroom',
    // shortcuts
    ShortcutClipboardhigh: 'shortcut-clipboardhigh',
    ShortcutClipboardlow: 'shortcut-clipboardlow',
    ShortcutPushbag: 'shortcut-pushbag',
    ShortcutPushboxcardboard: 'shortcut-pushboxcardboard',
    ShortcutPushboxmetal: 'shortcut-pushboxmetal',
    ShortcutRoot: 'shortcut-root',
    ShortcutStringup: 'shortcut-stringup',
    ShortcutStringdown: 'shortcut-stringdown',
    RidableGeyser: 'ridable-geyser',
    RidableZipline: 'ridable-zipline',
    TunnelAny: 'tunnel-any',
    TunnelCaptain: 'tunnel-captain',
    TunnelOatchi: 'tunnel-oatchi',
    PlatformBounce: 'platform-bounceshroom',
    PlatformCharge: 'platform-chargeshroom',
    RidableMovefloor: 'ridable-movefloor',
    // gates
    GateBomb: 'gate-bomb',
    GateCrystal: 'gate-crystal',
    GateDirt: 'gate-dirt',
    GateElectric: 'gate-electric',
    GateIce: 'gate-ice',
    Gatconstbered: 'gate-numbered',
    ShortcutSquashbag: 'shortcut-squashbag',
    // switchables
    SwitchConveyor: 'switchable-conveyor',
    SwitchFan: 'switchable-fan',
    SwitchFenceiron: 'switchable-fenceiron',
    SwitchFencenormal: 'switchable-fencenormal',
    SwitchSingle: 'switchable-singleswitch',
    SwitchDouble: 'switchable-doubleswitch',
    // locations
    BaseOnion: 'base-onion',
    BaseBeagle: 'base-beagle',
    CaveEntrance: 'cave-entrance',
    CaveExit: 'cave-exit',
    CaveChallenge: 'cave-challenge',
    CaveBattle: 'cave-battle',
    // water
    WaterWater: 'water-water',
    WaterSwamp: 'water-swamp',
    SwitchDrain: 'switchable-drain',
    // misc
    MiscPullrope: 'misc-pullrope',
    MiscStick: 'misc-stick',
    MiscIcicle: 'misc-icicle',
    MiscHoney: 'miscitem-honey',
    // night
    NightLumiknoll: 'night-lumiknoll',
    NightTricknoll: 'night-tricknoll',
    PileGlowpellets: 'pile-glowpellets',
    // custom
    MapPin: 'ddb-pin'
};

export const InfoType = {
    Treasure: 'treasure',
    Castaway: 'castaway',
    Creature: 'creature',
    Onion: 'onion',
    Pikmin: 'pikmin',
    Candypop: 'candypop',
    Structure: 'structure',
    Pile: 'pile',
    Breakable: 'breakable',
    Firepit: 'firepit',
    Hazard: 'hazard',
    Shortcut: 'shortcut',
    Ridable: 'ridable',
    Platform: 'platform',
    Tunnel: 'tunnel',
    Gate: 'gate',
    Switchable: 'switchable',
    Base: 'base',
    Cave: 'cave',
    Water: 'water',
    Misc: 'misc',
    Night: 'night',
    Gimmick: 'gimmick'
};

export const CreatureNames = {
    AmeBozu: "Waterwraith",
    Amembo: "Skeeterskate",
    Arikui: "Whiptongue Bulborb",
    Awadako: "Waddlepus",
    Baby: "Bulborb Larva",
    BabyCrow: "Downy Snagret",
    BigChappy: "Jumbo Bulborb",
    BigFireTank: "Titan Blowhog",
    BigFrog: "Masterhop",
    BigEgg: "Big Egg",
    BigIceTank: "Titan Blizzarding Blowhog",
    BigKingChappy: "Sovereign Bulblax",
    BigUjinko: "Mama Sheargrub",
    BikkuriGiku: "Creeping Chrysanthemum",
    BikkuriKinoko: "Startle Spore",
    Billy: "Bearded Amprat",
    BokeNameko: "Puffstool",
    BossInu: "Ancient Sirehound",
    BossInu2: "Ancient Sirehound", // idk why this is
    Chappy: "Red Bulborb",
    Chaser: "Moss",
    DamagumoCannon: "Man-At-Legs",
    Demejako: "Bug-Eyed Crawmad",
    DiscoDamagumo: "Groovy Long Legs",
    Dodoro: "Smokey Progg",
    DodoroEgg: "Smokey Progg",
    DokuNameko: "Toxstool",
    Dorombo: "Muckerskate",
    Egg: "Egg",
    ElecMushi: "Anode Beetle",
    ElecOtakara: "Anode Dweevil",
    ElecSenbei: "Shockcake",
    FireChappy: "Fiery Bulblax",
    FireOtakara: "Fiery Dweevil",
    FireTank: "Fiery Blowhog",
    Frog: "Yellow Wollyhop",
    Futakuchi: "Armored Cannon Larva",
    FutakuchiAdult: "Horned Cannon Beetle",
    GasKogane: "Doodlebug",
    GasOtakara: "Venom Dweevil",
    HageDamagumo: "Baldy Long Legs",
    Hambo: "Skitter Leaf",
    Hanachirashi: "Withering Blowhog",
    Hari: "Porquillion",
    Hariuo: "Pricklepuff",
    IceChappy: "Frosty Bulborb",
    IceFrog: "Chillyhop",
    IceKochappy: "frosty Dward Bulborb",
    IceMar: "Icy Blowhog",
    IceOtakara: "Iceblown Dweevil",
    IceSenbei: "Freezecake",
    IceTank: "Snowy Blowhog",
    Iwakko: "Skutterchuck",
    Kaburi: "Joustmite",
    Kajiokoshi: "Pyroclasmic Slooch",
    Kanitama: "Peckish Aristocrab",
    KareHambo: "Desiccated Skitter Leaf",
    Kemekuji: "Toady Bloyster",
    KingChappy: "Emperor Bulblax",
    KinoKajiokoshi: "Moldy Slooch",
    KinoKochappy: "Moldy Dwarf Bulborb",
    Kochappy: "Dwarf Red Bulborb",
    Kogane: "Iridescent Flint Beetle",
    Kogani: "Aristocrab Offspring",
    KumaChappy: "Spotty Bulbear",
    KumaKochappy: "Dwarf Bulbear",
    Kurage: "Lesser Spotted Jellyfloat",
    Kurione: "Honeywisp",
    Mar: "Puffy Blowhog",
    Marigumo: "Arachnode",
    MaroFrog: "Wollyhop",
    MiniMochi: "Sunsquish",
    MitsuMochi: "Foolix",
    Miulin: "Mamuta",
    Namazu: "Water Dumple",
    NightBaby: "Bulborb Larva (Night)",
    NightChappy: "Red Bulborb (Night)",
    NightFireChappy: "Fiery Bulblax (Night)",
    NightFrog: "Yellow Wollyhog (Night)",
    NightKaburi: "Joustmite (Night)",
    NightKareHambo: "Dessicated Skitterleaf (Night)",
    NightMar: "Puffy Blowhog (Night)",
    NightTobiKaburi: "Flying Joustmite (Night)",
    NightTobinko: "Shearwig (Night)",
    NiseBoss: "Gildemander",
    NiseZako: "Gildemandwee",
    Nomi: "Shearflea",
    NumaSuitori: "Bogswallow",
    OoKogane: "Iridescent Glint Beetle",
    OoKurage: "Greater Spotted Jellyfloat",
    OoPanModoki: "Giant Breadbug",
    Otama: "Wolpole",
    PanModoki: "Breadbug",
    Patroller: "Bloomcap Bloyster",
    PikminYellow: "Yellow Pikmin",
    PikminRed: "Red Pikmin",
    PikminBlue: "Blue Pikmin",
    PikminRock: "Rock Pikmin",
    PikminWing: "Wing Pikmin",
    PikminPurple: "Purple Pikmin",
    PikminWhite: "White Pikmin",
    PikminGlow: "Glow Pikmin",
    PikminIce: "Ice Pikmin",
    Queen: "Empress Bulblax",
    RedShijimi: "Red Spectralids",
    Rusher: "Tusked Blowhog",
    Sakadachi: "Crusted Rumpup",
    Sarai: "Swooping Snitchbug",
    Shako: "Hermit Crawmad",
    Shippo: "Mammoth Snootwhacker",
    ShippoZako: "Miniature Snootwhacker",
    SnakeCrow: "Burrowing Snagret",
    Suitori: "Waddlequaff",
    TamagoMushi: "Mitite",
    TenKochappy: "Orange Dwarf Bulborb",
    TentenChappy: "Orange Bulborb",
    ThrowEater: "Grubchucker",
    TobiKaburi: "Flighty Joustmite",
    Tobinko: "Shearwig",
    Tobiuo: "Puckering Blinnow",
    UjinkoA: "Female Sheargrub",
    UjinkoB: "Male Sheargrub",
    WaterOtakara: "Hydro Dweevil",
    WaterTank: "Watery Blowhog",
    WhiteShijimi: "White Spectralids",
    YakiSenbei: "Scorchcake",
    Yamashinju: "Pearly Clamcamp",
    YellowShijimi: "Yellow Spectralids",
    YukiFutakuchi: "Arctic Cannon Larva",
    YukiFutakuchiAdult: "Arctic Cannon Beetle",
    Yukimushi: "Snowfake Fluttertail"
};

export const isTreasure = (marker) => {
    return marker.infoType === InfoType.Treasure;
};

export const isCreature = (marker) => {
    return marker.infoType === InfoType.Creature;
};

export const isGimmick = (marker) => {
    return marker.infoType === InfoType.Gimmick;
};

// Order of priorities of drop items.
// Static drops, the chance does not matter
const StaticDropPriorities = Object.fromEntries(
    Object.entries([
        MarkerType.Treasure,
        MarkerType.CastawayNormal,
        MarkerType.CastawayLeafling,
        MarkerType.PikminRed,
        MarkerType.PikminYellow,
        MarkerType.PikminBlue,
        MarkerType.PikminPurple,
        MarkerType.PikminWhite,
        MarkerType.PikminRock,
        MarkerType.PikminWing,
        MarkerType.PikminIce,
        MarkerType.Creature,
    ]).map(([k, v]) => [v, +k])
);
// TODO figure this out later
const WeightedDropPriorities = {
    // Get the weight by:       chance threshold / amount threshold
    //   i.e for materials:     5 pieces * 0.5 chance will yield 1.
    [MarkerType.MiscBomb]: 100 / 29 / 1,
    [MarkerType.MiscIcebomb]: 100 / 30 / 1,
    [MarkerType.MiscSpicy]: 100 / 31 / 1,
    [MarkerType.PileMaterials]: 100 / 50 / 5,
    [MarkerType.MiscHoney]: 100 / 75 / 1,
};

const getDropPriority = (drops) => {
    let maxIndex = 0;
    let maxWeight = WeightedDropPriorities[drops[0].type] || 0;

    // Note: start at zero to check it for a special type.
    for (let i = 0; i < drops.length; i++) {
        if (drops[i].type in StaticDropPriorities) {
            return {
                type: drops[i].type,
                weight: 1_000_000
            };
        }

        const dropWeight = WeightedDropPriorities[drops[i].type] || 0;
        if (dropWeight > maxWeight) {
            maxIndex = i;
            maxWeight = dropWeight;
        }
    }
    return {
        type: drops[maxIndex].type,
        weight: maxWeight
    };
};

const MarkerFilterWeights = {
    // don't overide gates (unless it's something important)
    [MarkerType.Creature]: 1000,
    // don't overide gates (unless it's something important)
    [MarkerType.GateBomb]: 1000,
    [MarkerType.GateCrystal]: 1000,
    [MarkerType.GateDirt]: 1000,
    [MarkerType.GateElectric]: 1000,
    [MarkerType.GateIce]: 1000,
    [MarkerType.Gatconstbered]: 1000,
    [MarkerType.ShortcutSquashbag]: 1000,
    // don't overide mounds, unless it has items or lots of mats
    [MarkerType.BreakableMound]: 2.5,
    // breakables
    [MarkerType.BreakableHydrojelly]: 1.5, // takes awhile to break
    [MarkerType.BreakablePot]: 1,
    [MarkerType.BreakableKingcapnormal]: 1.5, // takes awhile to break
    [MarkerType.BreakableKingcappoison]: 1.5, // takes awhile to break
    [MarkerType.BreakableSpotcapnormal]: 1,
    [MarkerType.BreakableSpotcappoison]: 1,
    // misc
    [MarkerType.BreakableEgg]: 2.5, // don't override unless items
};
export const getFilterType = (marker) => {
    return marker.type;
    // if (!marker.drops) {
    //   return marker.type;
    // }

    // // check the drops for the marker filter type
    // const dropPriority = getDropPriority(marker.drops);
    // const markerWeight = MarkerFilterWeights[marker.type] || 0;

    // return dropPriority.weight > markerWeight
    //   ? dropPriority.type
    //   : marker.type;
};

export const getDropType = (marker) => {
    return undefined;

    // if (!marker.drops) {
    //   return undefined;
    // }

    // // highest priority drop
    // return getDropPriority(marker.drops).type;
};

export const Categories = [
    {
        label: 'Collectibles',
        markers: [
            MarkerType.Treasure,
            MarkerType.CastawayNormal,
            MarkerType.CastawayLeafling,
            MarkerType.Creature,
            MarkerType.OnionFlarlic,
            MarkerType.OnionRed,
            MarkerType.OnionYellow,
            MarkerType.OnionBlue,
            MarkerType.OnionPurple,
            MarkerType.OnionWhite,
            MarkerType.OnionRock,
            MarkerType.OnionWing,
            MarkerType.OnionIce,
        ]
    },
    {
        label: 'Pikmin',
        markers: [
            MarkerType.PikminRed,
            MarkerType.PikminYellow,
            MarkerType.PikminBlue,
            MarkerType.PikminPurple,
            MarkerType.PikminWhite,
            MarkerType.PikminRock,
            MarkerType.PikminWing,
            MarkerType.PikminIce,
            MarkerType.CandypopRed,
            MarkerType.CandypopYellow,
            MarkerType.CandypopBlue,
            MarkerType.CandypopPurple,
            MarkerType.CandypopWhite,
            MarkerType.CandypopRock,
            MarkerType.CandypopWing,
            MarkerType.CandypopIce
        ]
    },
    {
        label: 'Structures',
        markers: [
            MarkerType.PileMaterials,
            MarkerType.StructureBridge,
            MarkerType.StructureSlope,
            MarkerType.StructureValve,
            MarkerType.StructureWall,
            MarkerType.HazardSprinkler
        ]
    },
    {
        label: 'Breakables',
        markers: [
            MarkerType.MiscGroupdropmanager,
            MarkerType.BreakableHydrojelly,
            MarkerType.BreakablePot,
            MarkerType.BreakableKingcapnormal,
            MarkerType.BreakableKingcappoison,
            MarkerType.BreakableSpotcapnormal,
            MarkerType.BreakableSpotcappoison,
            MarkerType.BreakableStraw,
            MarkerType.BreakableIcebox,
            MarkerType.FirepitLit,
            MarkerType.FirepitUnlit,
            MarkerType.BreakableCrystal
        ]
    },
    {
        label: 'Items',
        markers: [
            MarkerType.BreakableMound,
            MarkerType.BreakableEgg,
            MarkerType.MiscBomb,
            MarkerType.MiscIcebomb,
            MarkerType.MiscSpicy,
            MarkerType.MiscSpiderwort
        ]
    },
    {
        label: 'Hazards',
        markers: [
            MarkerType.HazardSpoutFire,
            MarkerType.HazardSpoutElectric,
            MarkerType.HazardSpoutWater,
            MarkerType.HazardSpoutPoison,
            MarkerType.HazardSpoutIce,
            MarkerType.HazardSpoutBubble,
            MarkerType.HazardFloorfire,
            MarkerType.HazardCharcoal,
            MarkerType.HazardFloormushroom
        ]
    },
    {
        label: 'Shortcuts',
        markers: [
            MarkerType.ShortcutClipboardhigh,
            MarkerType.ShortcutClipboardlow,
            MarkerType.ShortcutPushbag,
            MarkerType.ShortcutPushboxcardboard,
            MarkerType.ShortcutPushboxmetal,
            MarkerType.ShortcutRoot,
            MarkerType.ShortcutStringup,
            MarkerType.ShortcutStringdown,
            MarkerType.RidableGeyser,
            MarkerType.RidableZipline,
            MarkerType.TunnelAny,
            MarkerType.TunnelCaptain,
            MarkerType.TunnelOatchi,
            MarkerType.PlatformBounce,
            MarkerType.PlatformCharge,
            MarkerType.RidableMovefloor,
        ]
    },
    {
        label: 'Gates',
        markers: [
            MarkerType.GateBomb,
            MarkerType.GateCrystal,
            MarkerType.GateDirt,
            MarkerType.GateElectric,
            MarkerType.GateIce,
            MarkerType.Gatconstbered,
            MarkerType.ShortcutSquashbag
        ]
    },
    {
        label: 'Switchables',
        markers: [
            MarkerType.SwitchConveyor,
            MarkerType.SwitchFan,
            MarkerType.SwitchFenceiron,
            MarkerType.SwitchFencenormal,
            MarkerType.SwitchSingle,
            MarkerType.SwitchDouble,
            MarkerType.SwitchDrain,
        ]
    },
    {
        label: 'Locations',
        markers: [
            MarkerType.BaseOnion,
            MarkerType.BaseBeagle,
            MarkerType.CaveEntrance,
            MarkerType.CaveExit,
            MarkerType.CaveChallenge,
            MarkerType.CaveBattle,
        ]
    },
    {
        label: 'Misc',
        markers: [
            MarkerType.MiscPullrope,
            MarkerType.MiscStick,
            MarkerType.MiscIcicle,
            MarkerType.MiscHoney,
        ]
    },
    {
        label: 'Night',
        markers: [
            MarkerType.NightLumiknoll,
            MarkerType.NightTricknoll,
            MarkerType.PileGlowpellets,
        ]
    },
];

export const RebirthTypes = {
    NoRebirth: "ERebirthType::NoRebirth",
    AlwaysRebirth: "ERebirthType::AlwaysRebirth",
    RebirthFullExplore: "ERebirthType::RebirthFullExplore",
    RebirthLater: "ERebirthType::RebirthLater"
};

export const exposedGenVars = ["AttackAffordance", "AI", "CarrotMove", "Life", "PointerAssist", "CarryAffordance"];

export const DefaultDrop = {
    id: 1,
    bRegistGenerator: 0,
    dropChance: 1,
    dropCondition: 0,
    flags: [1, 8, 16, 64],
    customFloatParam: 0.0,
    bSetTerritory: false,
    maxDrops: 1,
    minDrops: 1,
    assetName: '/Game/Carrot4/Placeables/Teki/GKochappy.GKochappy_C'
};

export const DefaultActorSpawnerDrop = {
    angle: 180,
    assetName: "/Game/Carrot4/Placeables/Teki/GKochappy.GKochappy_C",
    bGenseiControl: 0,
    carry: 1,
    halfHeight: 100,
    infiniteSpawn: 0,
    mysteryBool1: 1,
    mysteryBool2: 1,
    mysteryBool3: 1,
    mysteryBool5: 1,
    noDropItem: 0,
    overlapCenterX: 0,
    overlapCenterY: 0,
    overlapCenterZ: 0,
    radius: 350,
    randomRotation: 0,
    spareBytes: [5, 0, 0, 0, 78, 111, 110, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63],
    spawnInterval: 1,
    spawnLimit: 10,
    spawnLocationX: 0,
    spawnLocationY: 0,
    spawnLocationZ: 0,
    sphereRadius: 500,
    customParameter: 'None'
};

export const TreasureNames = {
    Ota3DMegane: "Dimension Converter",
    OtaAmmolite: "Newtolite Shell",
    OtaApricot: "Searing Acidshock",
    OtaAvocado: "Scaly Custard",
    OtaBanana: "Slapstick Crescent",
    OtaBankCardA: "Courage Emblem",
    OtaBankCardB: "Power Emblem",
    OtaBankCardBlank: "Deity's Portrait",
    OtaBankCardBlank2: "Devil's Portrait",
    OtaBankCardC: "Wisdom Emblem",
    OtaBankCardD: "Love Emblem",
    OtaBankCardE: "Money Emblem",
    OtaBankCardF: "Work Emblem",
    OtaBilliardBall1: "Sphere of Desire",
    OtaBilliardBall2: "Sphere of Family",
    OtaBilliardBall3: "Sphere of Heart",
    OtaBilliardBall4: "Sphere of Beginnings",
    OtaBilliardBall5: "Sphere of Vitality",
    OtaBilliardBall6: "Sphere of Calm",
    OtaBilliardBall7: "Sphere of Good Fortune",
    OtaBilliardBall8: "Sphere of Trust",
    OtaBilliardBall9: "Sphere of Support",
    OtaBilliardBallCue: "Sphere of Truth",
    OtaBiwa: "Velvety Dreamdrop",
    OtaBoardEraser: "Dusty Bed",
    OtaBoat: "Unfloatable Boat",
    OtaBottle: "Maternal Sculpture",
    OtaBrushA: "Brush of Wisdom",
    OtaBrushB: "Brush of Foolishness",
    OtaButtonMetal: "Trap Lid",
    OtaButtonPlastic: "Fastening Item",
    OtaButtonWood: "Perforated Raft",
    OtaCandle: "Olfactory Sculpture",
    OtaCandyStick: "Sweet Stumble-Not",
    OtaCardDentaku: "Solar-Powered Computing Machine",
    OtaCasinoChip1: "Disk of Joyous Wisdom",
    OtaCasinoChip10: "Disk of Angry Wisdom",
    OtaCasinoChip100: "Disk of Surprising Wisdom",
    OtaCasinoChip25: "Disk of Sorrowful Wisdom",
    OtaCasinoChip50: "Disk of Amusing Wisdom",
    OtaCastanets: "Harmonic Synthesizer",
    OtaCherry: "Cupid's Grenade",
    OtaCollar: "Gift of Friendship",
    OtaCompass: "Director of Destiny",
    OtaCounter: "Internal-Clock Measurer",
    OtaCroissant: "Flaky Temptation",
    OtaDarts: "Relentless Spear",
    OtaDaruma: "Persistence Machine",
    OtaDekopon: "Pocked Airhead",
    OtaDentaku: "Number Jumper",
    OtaDice12: "Long-Shot Totem",
    OtaDice20: "Go-with-the-Flow Totem",
    OtaDice4Sided: "Difficult-Choice Totem",
    OtaDice6WHT: "Chance Totem",
    OtaDisc: "Glinty Circular Disc",
    OtaDoguHead: "Ancient Statue Head",
    OtaDragonFruit: "Fire-Breathing Feast",
    OtaDuckL: "Universal Rubber Cutie",
    OtaDuckM: "Planetary Rubber Cutie",
    OtaDuckS: "Stately Rubber Cutie",
    OtaEclair: "Sweet Torrent",
    OtaEffectsUnit: "Soul Reverberator",
    OtaEggplant: "Foolish Fruit",
    OtaEngageRing: "Unbreakable Promise",
    OtaFeeddish: "Bathing Pool",
    OtaFieldGlass: "Double Dragon-Eyed Scope",
    OtaFingerBoard: "Personal-Injury Plank",
    OtaFishCruet: "Mystery Squish Fish",
    OtaFruitsPickBLU: "Ice Sword",
    OtaFruitsPickGRN: "Spirit Sword",
    OtaFruitsPickORN: "Heroic Sword",
    OtaFruitsPickPNK: "Heart Sword",
    OtaFruitsPickYEL: "Bright Sword",
    OtaGamaguchi: "Greed-Inducement Device",
    OtaGaragara: "Shake-a-Smile",
    OtaGBARomBLK: "Spinning Memories Plank",
    OtaGBARomYEL: "Masterpiece Plank",
    OtaGBASP: "Stone of Advancement",
    OtaGBMicroFC: "Micromanagement Station",
    OtaGCConWb: "Winged Freedom Sculpture",
    OtaGoddess: "Lamp of Inspiration",
    OtaGoldBar: "Golden Vaulting Table",
    OtaGoldfish: "Faux Fishy",
    OtaGolfBall: "Orbital Communication Sphere",
    OtaGrape: "Dusk Pustules",
    OtaGrapefruit: "Astringent Clump",
    OtaGripper: "Tandem Trainer",
    OtaHairPin: "Floral Instigator",
    OtaHam: "King of Meats",
    OtaHanafudaA: "Talisman of Life (Crane)",
    OtaHanafudaB: "Talisman of Life (Cherry Blossom)",
    OtaHanafudaC: "Talisman of Life (Moon)",
    OtaHanafudaD: "Talisman of Life (Rain)",
    OtaHanafudaE: "Talisman of Life (Phoenix)",
    OtaHandbell: "Time Marker",
    OtaHandSpinner: "Space Spinner",
    OtaHardBall: "Orb of Destruction",
    OtaHarmonica: "Wind Detector",
    OtaHeroPartsA: "Whimsical Radar",
    OtaHeroPartsAA: "Automatic Gear",
    OtaHeroPartsAB: "Automatic Gear",
    OtaHeroPartsAC: "Secret Safe",
    OtaHeroPartsAD: "Pilot's Seat",
    OtaHeroPartsB: "Ionium Jet",
    OtaHeroPartsC: "Ionium Jet",
    OtaHeroPartsD: "Radiation Canopy",
    OtaHeroPartsE: "Sagittarius",
    OtaHeroPartsF: "Libra",
    OtaHeroPartsG: "Chronos Reactor",
    OtaHeroPartsH: "Geiger Counter",
    OtaHeroPartsI: "Bowsprit",
    OtaHeroPartsJ: "Omega Stabilizer",
    OtaHeroPartsK: "Repair-Type Bolt",
    OtaHeroPartsL: "Repair-Type Bolt",
    OtaHeroPartsM: "Repair-Type Bolt",
    OtaHeroPartsN: "Repair-Type Bolt",
    OtaHeroPartsO: "Nova Blaster",
    OtaHeroPartsP: "Interstellar Radio",
    OtaHeroPartsQ: "Extraordinary Bolt",
    OtaHeroPartsR: "Extraordinary Bolt",
    OtaHeroPartsS: "Extraordinary Bolt",
    OtaHeroPartsT: "Extraordinary Bolt",
    OtaHeroPartsU: "Extraordinary Bolt",
    OtaHeroPartsV: "Extraordinary Bolt",
    OtaHeroPartsW: "Automatic Gear",
    OtaHeroPartsX: "Automatic Gear",
    OtaHeroPartsY: "Automatic Gear",
    OtaHeroPartsZ: "Automatic Gear",
    OtaHimeFork: "Noble Bident",
    OtaHornBell: "Path Creator",
    OtaIcePick: "Shattering Lance",
    OtaIchigo: "Sunseed Berry",
    OtaIchijiku: "Delectable Bouquet",
    OtaIsobeyaki: "Deceptive Snack",
    OtaJamIchigo: "Condensed Sunshine",
    OtaJoyConL: "Telekinesis Detector",
    OtaJoyConR: "Connection Detector",
    OtaKaki: "Portable Sunset",
    OtaKendamaA: "Aspiration-Ritual Ball",
    OtaKendamaB: "Aspiration-Ritual Pole",
    OtaKiwi: "Disguised Delicacy",
    OtaKiwiGLD: "Blonde Impostor",
    OtaKushiyaki: "The Four Grill Brothers",
    OtaLaFrance: "Tremendous Sniffer",
    OtaLemon: "Face Wrinkler",
    OtaLightUpRingBLU: "Hoop of Healing",
    OtaLightUpRingRED: "Hoop of Passion",
    OtaLightUpRingYEL: "Hoop of Fortune",
    OtaLime: "Zest Bomb",
    OtaLoupe: "Detective's Truth Seeker",
    OtaMacaronA: "S.S. Berry",
    OtaMacaronB: "S.S. Peppermint",
    OtaMacaronC: "S.S. Chocolate",
    OtaManekiNeko: "Beckoning Mannequin",
    OtaMango: "Heroine's Tear",
    OtaMangosteen: "Dapper Blob",
    OtaMask: "Expression Hider",
    OtaMatDollLA: "Mama Doll Head",
    OtaMatDollLB: "Empty Vase",
    OtaMatDollMA: "Daughter Doll Head",
    OtaMatDollMB: "Mooching Vase",
    OtaMatDollSA: "Granddaughter Doll Head",
    OtaMatDollSB: "Gifting Vase",
    OtaMelon: "Wayward Moon",
    OtaMikan: "Citrus Lump",
    OtaMoai: "Giant's Fossil",
    OtaMuscat: "Dawn Pustules",
    OtaMusicBoxA: "Mechanical Harp (Memory Song)",
    OtaMusicBoxB: "Mechanical Harp (Lullabies)",
    OtaMusicBoxC: "Mechanical Harp (Windmills)",
    OtaNashi: "Crunchy Deluge",
    OtaNESClassicMini: "Life Controller",
    OtaOcarinaBRN: "Ambiguous Hostel",
    OtaOshaburiBLU: "False Lollipop",
    OtaPadlock: "Secured Satchel",
    OtaPaintsAQU: "Refreshing Goo",
    OtaPaintsBLK: "Ambiguous Goo",
    OtaPaintsBLU: "Decorative Goo",
    OtaPaintsGRN: "Neon Goo",
    OtaPaintsPNK: "Captivation Goo",
    OtaPaintsPPL: "Noble Goo",
    OtaPaintsRED: "Uniquely You Goo",
    OtaPaintsWHT: "True Goo",
    OtaPaintsYEL: "Illumination Goo",
    OtaPapaya: "Seed Hive",
    OtaPaperballoon: "Divine Balloon",
    OtaPaperCraneBLU: "Sweat-Soaked Blue Bird",
    OtaPaperCraneGLD: "Priceless Bird",
    OtaPaperCraneRED: "Skin of the Phoenix",
    OtaPeach: "Mock Bottom",
    OtaPeanut: "Snack Bean",
    OtaPhotoframe: "Buddy Display",
    OtaPinBadgeA: "Blast Shield",
    OtaPinBadgeB: "Ring-of-Return Shield",
    OtaPinBadgeC: "Satellite Shield",
    OtaPinBadgeD: "Heroic Shield",
    OtaPinBadgeE: "Shooting-Star Shield",
    OtaPlum: "Lesser Mock Bottom",
    OtaPocketWatch: "Temporal Mechanism",
    OtaPotato: "Child of the Earth",
    OtaPretzel: "Puzzle Snack",
    OtaPudding: "Jiggle-Jiggle",
    OtaPumpkin: "Mysterious Carriage",
    OtaPuzzleA: "Memory Fragment (Top Left)",
    OtaPuzzleB: "Memory Fragment (Top-ish)",
    OtaPuzzleC: "Memory Fragment (Top...Probably?)",
    OtaPuzzleD: "Memory Fragment (Top Right)",
    OtaPuzzleE: "Memory Fragment (Left Edge)",
    OtaPuzzleF: "Memory Fragment (Center Left)",
    OtaPuzzleG: "Memory Fragment (Center Right)",
    OtaPuzzleH: "Memory Fragment (Right Edge)",
    OtaPuzzleI: "Memory Fragment (Bottom Left)",
    OtaPuzzleJ: "Memory Fragment (Bottom-ish)",
    OtaPuzzleK: "Memory Fragment (Bottom...Probably?)",
    OtaPuzzleL: "Memory Fragment (Bottom Right)",
    OtaRailwayLineA: "Life Station",
    OtaRailwayLineB: "Straight-and-Narrow Track",
    OtaRailwayLineC: "Turn-of-Events Track",
    OtaRailwayLineD: "Back-at-the-Beginning Track",
    OtaRailwayLineE: "Thrill-Ride Track",
    OtaRappa: "Mega Horn",
    OtaRaspberry: "Juicy Gaggle",
    OtaRingo: "Insect Condo",
    OtaRingPop: "Sticky Jewel",
    OtaRoboBody: "Nexus Combobot",
    OtaRoboHandL: "Peacemaker Combobot",
    OtaRoboHandR: "Fist-Force Combobot",
    OtaRoboHead: "Think-Tank Combobot",
    OtaRoboLegL: "Sure-Footed Combobot",
    OtaRoboLegR: "Kick-Start Combobot",
    OtaRodan: "Contemplation Station",
    OtaSFCMouse: "Creativity Conduit",
    OtaShinjitsu: "Mouth of Lies",
    OtaShutterGlasses: "Don't-See-It Specs",
    OtaSmallBell: "Spouse Alert",
    OtaSpeaker: "Amplified Amplifier",
    OtaSpongeA: "Doggy Bed",
    OtaSpongeB: "Birdy Bed",
    OtaSpongeC: "Fishy Bed",
    OtaSqueezer: "Merciless Extractor",
    OtaStarFruit: "Stellar Extrusion",
    OtaSushiEbi: "Fish-Bed Snack",
    OtaSushiMaguro: "Maestro of Flavor",
    OtaSushiTamago: "Belted Delicacy",
    OtaSweetPotato: "Daughter of the Earth",
    OtaTakenoko: "Anxious Sprout",
    OtaTakoWiener: "Octoplus",
    OtaTennisBall: "Sphere of Fuzzy Feelings",
    OtaThermometer: "Heat Sensor",
    OtaTomatoM: "Love Nugget",
    OtaTomatoS: "Crush Nugget",
    OtaToothModel: "Monster Teeth",
    OtaTrainA: "Unlimited Locomotive",
    OtaTrainB: "Middle-Management Tank Car",
    OtaTrainC: "Leisure Car",
    OtaTrilobite: "Slipper-Bug Fossil",
    OtaVenus: "Unfinished Statue",
    OtaWaffle: "Cushion Cake",
    OtaWaterMelon: "Crimson Banquet",
    OtaWhistle: "Emperor Whistle",
    OtaYamashinju: "Princess Pearl",
    OtaYoshiCookieA: "Cookie of Nibbled Circles",
    OtaYoshiCookieB: "Cookie of Prosperity",
    OtaYoshiCookieC: "Vanishing Cookie",
    OtaYoshiCookieD: "Love's Fortune Cookie",
    OtaYoshiCookieE: "Hearty Container",
    OtaZucchini: "Crew-Cut Gourd"
};

export const MiscNames = {
    Bomb: 'Bomb Rock',
    IceBomb: 'Ice Blast',
    Honey: 'Nectar',
    HomingBomb: 'Trackonator',
    SearchBomb: 'Mine',
    YuudouEsa: 'PikPik Carrot',
    DogFood: 'Scrummy Bone',
    PhotonBall: 'Glow Seed?',
    ShugoFlag: 'Idler\'s Alert?',
    Stone: 'Stone?',
    HotExtract: "Ultra-Spicy Spray",
    PiecePick: "Raw Material",
    SurvivorA: "Castaway",
    SurvivorLeaf: "Leafling"
};

export const GimmickNames = {
    ActorSpawner: 'Actor Spawner',
    GroupDropManager: 'GroupDropManager'
};

export const EntityNames = {
    ...CreatureNames,
    ...TreasureNames,
    ...GimmickNames,
    ...MiscNames
};