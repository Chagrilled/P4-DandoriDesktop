import './setupTests'; // Ensure this import is at the top
import { expect, test, describe, vi, beforeEach } from 'vitest';
import { DandoriChallengeMaps, DefaultActorSpawnerDrop, InfoType, OnionNames, PikminTypes, onionWeights, RebirthTypes, DefaultDrop, DefaultPortalTrigger } from '../src/api/types';
import * as main from '../src/main';

let randomiseRegularDrops, randomiser;

const randOnions = Object.keys(OnionNames).filter(k => !["OnyonBootUpRed", "Onyon", "OnyonCarryBoost"].includes(k));

expect.extend({
    toBeAnyOf(received, expectedArray) {
        const pass = expectedArray.includes(received);
        if (pass) {
            return {
                message: () => `expected ${received} not to be any of ${expectedArray}`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to be any of ${expectedArray}`,
                pass: false,
            };
        }
    },
    toBeArrayOfLength(received, length) {
        const pass = Array.isArray(received) && received.length === length;
        if (pass) {
            return {
                message: () => `expected ${received} not to have length ${length}`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to have length ${length}`,
                pass: false,
            };
        }
    },
});

describe('Randomiser Tests', () => {
    beforeEach(async () => {
        main.saveMaps.mockClear();
        vi.resetAllMocks();
        vi.resetModules();
        ({ randomiseRegularDrops, randomiser } = await import('../src/genEditing/randomiser'));
    });

    test('Randomiser doesn\'t save maps when none are provided ', async () => {
        await randomiser({
            maps: []
        });

        expect(main.saveMaps).not.toHaveBeenCalled();
    });

    test('Hub gets randomised', async () => {
        main.readMapData.mockResolvedValue({
            [InfoType.Onion]: [
                {
                    creatureId: 'OnyonBootUpRed',
                    generateNum: 1
                }
            ],
            [InfoType.Pikmin]: [],
            [InfoType.Creature]: [{
                creatureId: 'Kochappy'
            }],
        });

        await randomiser({
            maps: ['Area500'],
            randStartingOnion: true,
            startingFlarlics: 1
        });

        expect(main.saveMaps).toHaveBeenCalledTimes(1);
        expect(main.saveMaps).toHaveBeenCalledWith('Area500', expect.objectContaining({
            [InfoType.Onion]: expect.arrayContaining([
                expect.objectContaining({
                    creatureId: expect.toBeAnyOf(randOnions),
                    generateNum: 1,
                }),
                expect.objectContaining({
                    creatureId: 'OnyonCarryBoost',
                    generateNum: 1,
                })
            ]),
            [InfoType.Pikmin]: expect.arrayContaining([
                expect.objectContaining({
                    creatureId: expect.toBeAnyOf(Object.values(PikminTypes)),
                    generateNum: expect.toBeAnyOf(Object.values(onionWeights))
                })
            ]),
            [InfoType.Creature]: expect.arrayContaining([
                expect.objectContaining({
                    creatureId: 'Kochappy'
                })
            ]),
        }));
    });

    test('Dandori and prologue maps are skipped', async () => {
        main.readMapData.mockResolvedValue({
        });

        await randomiser({
            maps: [...DandoriChallengeMaps, 'Area011']
        });

        expect(main.saveMaps).toHaveBeenCalledTimes(0);
    });

    describe('Creatures', () => {
        test('ActorSpawners and Tateanas are randomised', async () => {
            main.readMapData.mockResolvedValue({
                // ...initMarkers,
                [InfoType.Creature]: [{
                    creatureId: 'ActorSpawner',
                    transform: {
                        translation: {
                            X: 0.0,
                            Y: 0.0
                        }
                    },
                    drops: {
                        parsed: [
                            {
                                ...DefaultActorSpawnerDrop
                            }
                        ]
                    }
                }],
                [InfoType.Gimmick]: [
                    {
                        creatureId: 'Tateana',
                        transform: {
                            translation: {
                                X: 0.0,
                                Y: 0.0
                            }
                        },
                        drops: {
                            parsedSubAI: [
                                {
                                    ...DefaultActorSpawnerDrop
                                }
                            ]
                        }
                    }
                ],
                [InfoType.Object]: [],
                [InfoType.Hazard]: [],
                [InfoType.WorkObject]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValue(1);
            vi.spyOn(global.Math, 'random')
                .mockReturnValue(0.5)
                .mockReturnValueOnce(0.2)
                .mockReturnValueOnce(0.2)
                .mockReturnValueOnce(0.2)
                .mockReturnValueOnce(0.2);

            await randomiser({
                maps: ['Area001'],
                randCreatures: true,
                randObjects: true,
                asInfiniteChance: 30,
                asLimit: 3,
                asIntervalLimit: 3,
                retainSpawners: true,
                randIntFunction: 'even',
                rebirthInterval: 3
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Creature]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'ActorSpawner',
                        rebirthType: RebirthTypes.RebirthLater,
                        rebirthInterval: 3,
                        drops: {
                            parsed: [
                                {
                                    ...DefaultActorSpawnerDrop,
                                    assetName: '/Game/Carrot4/Placeables/Teki/GArikui.GArikui_C',
                                    infiniteSpawn: 1,
                                    spawnLimit: 2,
                                    spawnInterval: 2.5
                                }
                            ]
                        },
                        transform: {
                            translation: {
                                X: 0,
                                Y: 0,
                            }
                        }
                    })
                ]),
                [InfoType.Gimmick]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'Tateana',
                        rebirthType: RebirthTypes.RebirthLater,
                        rebirthInterval: 3,
                        drops: {
                            parsedSubAI: [
                                {
                                    ...DefaultActorSpawnerDrop,
                                    assetName: '/Game/Carrot4/Placeables/Teki/GArikui.GArikui_C',
                                    infiniteSpawn: 0,
                                    spawnLimit: 2,
                                    spawnInterval: 2.5
                                }
                            ],
                            parsed: []
                        },
                        transform: {
                            translation: {
                                X: 0,
                                Y: 0,
                            }
                        }
                    })
                ])
            }));
        });

        test('ActorSpawners have drops normalised when randomising to creatures', async () => {
            main.readMapData.mockResolvedValue({
                // ...initMarkers,
                [InfoType.Creature]: [{
                    creatureId: 'ActorSpawner',
                    generateNum: 1,
                    transform: {
                        translation: {
                            X: 0.0,
                            Y: 0.0
                        }
                    },
                    drops: {
                        parsed: [
                            {
                                ...DefaultActorSpawnerDrop,
                                assetName: "/Game/Carrot4/Placeables/Teki/GAwadako.GAwadako_C",
                            }
                        ]
                    }
                }],
                [InfoType.Object]: [],
                [InfoType.Hazard]: [],
                [InfoType.WorkObject]: [],
            });

            vi.spyOn(global.Math, 'floor')
                .mockReturnValue(1)
                .mockReturnValueOnce(1)
                .mockReturnValueOnce(0)
            vi.spyOn(global.Math, 'random')
                .mockReturnValue(0.5);

            await randomiser({
                maps: ['Area001'],
                randCreatures: true,
                allCreaturesDrop: true,
                retainSpawners: false,
                rebirthInterval: 3,
                dropLimitMax: 1,
                randMaxDrops: 3,
                randIntFunction: 'even'
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Creature]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'Amembo',
                        rebirthType: RebirthTypes.RebirthLater,
                        rebirthInterval: 3,
                        drops: {
                            parsed: [
                                {
                                    ...DefaultActorSpawnerDrop,
                                    ...DefaultDrop,
                                    assetName: '/Game/Carrot4/Placeables/Teki/GAwadako.GAwadako_C',
                                    minDrops: 1,
                                    maxDrops: 1
                                }
                            ]
                        },
                        transform: {
                            translation: {
                                X: 0,
                                Y: 0,
                            }
                        }
                    })
                ]),
            }));
        });

        test('Entities on the Weird List are skipped', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Creature]: [{
                    creatureId: 'BurrowDemejako',
                    infoType: InfoType.Creature,
                    drops: {
                        parsed: [
                            {
                                ...DefaultDrop
                            }
                        ]
                    }
                },
                {
                    creatureId: 'Perch',
                    infoType: InfoType.Creature,
                    drops: {
                        parsed: []
                    }
                }],
            });

            await randomiser({
                maps: ['Area001'],
                randCreatures: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Creature]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'BurrowDemejako',
                        infoType: InfoType.Creature,
                        drops: {
                            parsed: [
                                {
                                    ...DefaultDrop
                                }
                            ]
                        }
                    }),
                    expect.objectContaining({
                        creatureId: 'Perch',
                        infoType: InfoType.Creature,
                        drops: {
                            parsed: []
                        }
                    })
                ]),
            }));
        });

        test('Eggs have drops randomised', async () => {
            main.readMapData.mockResolvedValue({
                // ...initMarkers,
                [InfoType.Creature]: [{
                    creatureId: 'Egg',
                    infoType: InfoType.Creature,
                    drops: {
                        parsed: [
                            {
                                ...DefaultDrop
                            }
                        ]
                    }
                }],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(3)
                .mockReturnValueOnce(0);

            await randomiser({
                maps: ['Area001'],
                randCreatures: true,
                randEnemyDrops: true,
                randMaxDrops: 4,
                allCreaturesDrop: true,
                dropLimitMax: 1,
                randIntFunction: 'even',
                rebirthInterval: 3
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Creature]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'Egg',
                        rebirthType: RebirthTypes.RebirthLater,
                        rebirthInterval: 3,
                        drops: {
                            parsed: [
                                {
                                    ...DefaultDrop,
                                    assetName: '/Game/Carrot4/Placeables/Teki/GBaby.GBaby_C',
                                    maxDrops: 4
                                }
                            ]
                        }
                    })
                ])
            }));
        });

        test('Other creatures are randomised', async () => {
            main.readMapData.mockResolvedValue({
                // ...initMarkers,
                [InfoType.Creature]: [{
                    creatureId: 'HageDamagumo',
                    infoType: InfoType.Creature,
                    generateNum: 1,
                    drops: {
                        parsed: [
                            {
                                ...DefaultDrop
                            }
                        ]
                    }
                }],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(10)
                .mockReturnValueOnce(2)
                .mockReturnValueOnce(0);

            await randomiser({
                maps: ['Area001'],
                randCreatures: true,
                randEnemyDrops: true,
                randMaxDrops: 4,
                allCreaturesDrop: true,
                dropLimitMax: 1,
                randGenerateNums: false,
                randIntFunction: 'even',
                rebirthInterval: 3
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Creature]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'BigIceTank',
                        rebirthType: RebirthTypes.RebirthLater,
                        rebirthInterval: 3,
                        drops: {
                            parsed: [
                                {
                                    ...DefaultDrop,
                                    assetName: '/Game/Carrot4/Placeables/Teki/GAwadako.GAwadako_C',
                                    maxDrops: 4
                                }
                            ]
                        }
                    })
                ])
            }));
        });

        test('Creatures are unchanged when randCreatures is false', async () => {
            main.readMapData.mockResolvedValue({
                // ...initMarkers,
                [InfoType.Creature]: [{
                    creatureId: 'HageDamagumo',
                    infoType: InfoType.Creature,
                    generateNum: 1,
                    drops: {
                        parsed: [
                            {
                                ...DefaultDrop
                            }
                        ]
                    }
                }],
            });

            await randomiser({
                maps: ['Area001'],
                randCreatures: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Creature]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'HageDamagumo',
                        infoType: InfoType.Creature,
                        generateNum: 1,
                        drops: {
                            parsed: [
                                {
                                    ...DefaultDrop
                                }
                            ]
                        }
                    })
                ])
            }));
        });

        test('Things that randomise into ActorSpawners are given drops', async () => {
            main.readMapData.mockResolvedValue({
                // ...initMarkers,
                [InfoType.Creature]: [{
                    creatureId: 'HageDamagumo',
                    infoType: InfoType.Creature,
                    generateNum: 1,
                    drops: {
                        parsed: []
                    }
                }],
            });
            vi.spyOn(global.Math, 'floor').mockReturnValue(1)
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(12);
            vi.spyOn(global.Math, 'random').mockReturnValue(0.5);

            await randomiser({
                maps: ['Area001'],
                randCreatures: true,
                randEnemyDrops: true,
                asInfiniteChance: 30,
                asLimit: 3,
                asIntervalLimit: 3,
                randIntFunction: 'even',
                rebirthInterval: 3
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Creature]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'ActorSpawner',
                        rebirthType: RebirthTypes.RebirthLater,
                        rebirthInterval: 3,
                        generateNum: 1,
                        drops: {
                            parsed: [
                                {
                                    ...DefaultActorSpawnerDrop,
                                    assetName: '/Game/Carrot4/Placeables/Teki/GBilly.GBilly_C',
                                    infiniteSpawn: 0,
                                    spawnLimit: 2,
                                    spawnInterval: 2.5,
                                    customParameter: "None"
                                }
                            ]
                        }
                    })
                ])
            }));
        });
    });

    //#region Treasures
    describe('Treasures', () => {
        test('Treasures are randomised', async () => {
            main.readMapData.mockResolvedValue({
                // ...initMarkers,
                [InfoType.Treasure]: [{
                    creatureId: 'OtaApricot',
                    infoType: InfoType.Treasure,
                    generateNum: 1,
                    drops: {
                        parsed: []
                    }
                }],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(11);

            await randomiser({
                maps: ['Area001'],
                randTreasures: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Treasure]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'OtaBankCardF',
                        drops: {
                            parsed: []
                        }
                    })
                ])
            }));
        });

        test('Treasures are unchanged when randTreasures is false', async () => {
            main.readMapData.mockResolvedValue({
                // ...initMarkers,
                [InfoType.Treasure]: [{
                    creatureId: 'OtaApricot',
                    infoType: InfoType.Treasure,
                    generateNum: 1,
                    drops: {
                        parsed: []
                    }
                }],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(11);

            await randomiser({
                maps: ['Area001'],
                randTreasures: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Treasure]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'OtaApricot',
                        drops: {
                            parsed: []
                        }
                    })
                ])
            }));
        });
    });

    //#region Portals
    describe('Portals', () => {
        test('Overworld MadoriRuins are randomised', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Portal]: [{
                    creatureId: 'MadoriRuins',
                    transform: {
                        translation: {
                            X: 0.0,
                            Y: 0.0
                        }
                    },
                    PortalTrigger: {
                        ...DefaultPortalTrigger,
                        toLevelName: 'Cave003_F01',
                        disablePikminFlags: 0,
                    }
                }],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(11);

            await randomiser({
                maps: ['Area001'],
                randPortals: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Portal]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'MadoriRuins',
                        PortalTrigger: {
                            ...DefaultPortalTrigger,
                            toLevelName: 'Cave014_F00',
                            disablePikminFlags: 0,
                        }
                    })
                ]),
            }));
        });

        test('when randOverworldOnly is false, cave DownPortals are randomised', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Portal]: [{
                    creatureId: 'DownPortal',
                    transform: {
                        translation: {
                            X: 0.0,
                            Y: 0.0
                        }
                    },
                    PortalTrigger: {
                        ...DefaultPortalTrigger,
                        toLevelName: 'Cave003_F01',
                        disablePikminFlags: 0,
                    }
                }],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(14);

            await randomiser({
                maps: ['Cave003_F01'],
                randPortals: true,
                randOverworldOnly: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave003_F01', expect.objectContaining({
                [InfoType.Portal]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'DownPortal',
                        PortalTrigger: {
                            ...DefaultPortalTrigger,
                            toLevelName: 'Cave006_F00',
                            disablePikminFlags: 0,
                        }
                    })
                ]),
            }));
        });

        test('Final cave floors are randomised to an overworld portal', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Portal]: [{
                    creatureId: 'DungeonExit',
                    transform: {
                        translation: {
                            X: 0.0,
                            Y: 0.0
                        }
                    },
                    PortalTrigger: {
                        ...DefaultPortalTrigger,
                        toLevelName: 'Cave001_F00',
                        disablePikminFlags: 0,
                    }
                }],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(14);

            await randomiser({
                maps: ['Cave001_F00'],
                randPortals: true,
                randOverworldOnly: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Portal]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'DungeonExit',
                        PortalTrigger: {
                            ...DefaultPortalTrigger,
                            toLevelName: 'Area003',
                            disablePikminFlags: 0,
                            toPortalId: 50
                        }
                    })
                ]),
            }));
        });

        test('Regular portals are unchanged', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Portal]: [{
                    creatureId: 'MadoriRuinsPoko',
                    infoType: InfoType.Portal,
                    PortalTrigger: {
                        ...DefaultPortalTrigger,
                        toLevelName: 'Cave001_F00',
                        disablePikminFlags: 0,
                        toPortalId: 53
                    }
                }],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(14);

            await randomiser({
                maps: ['Cave001_F00'],
                randPortals: true,
                randOverworldOnly: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Portal]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'MadoriRuinsPoko',
                        PortalTrigger: {
                            ...DefaultPortalTrigger,
                            toLevelName: 'Cave001_F00',
                            disablePikminFlags: 0,
                            toPortalId: 53
                        }
                    })
                ]),
            }));
        });

        test('Portals are unchanged if randPortals is false', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Portal]: [{
                    creatureId: 'DungeonExit',
                    infoType: InfoType.Portal,
                    PortalTrigger: {
                        ...DefaultPortalTrigger,
                        toLevelName: 'Cave001_F00',
                        disablePikminFlags: 0,
                    }
                }],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(14);

            await randomiser({
                maps: ['Cave001_F00'],
                randPortals: false,
                randOverworldOnly: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Portal]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'DungeonExit',
                        PortalTrigger: {
                            ...DefaultPortalTrigger,
                            toLevelName: 'Cave001_F00',
                            disablePikminFlags: 0
                        }
                    })
                ]),
            }));
        });

        test('Portals are given random disable flags if randDisableFlags is true', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Portal]: [{
                    creatureId: 'MadoriRuins',
                    infoType: InfoType.Portal,
                    transform: {
                        translation: {
                            X: 0.0,
                            Y: 0.0
                        }
                    },
                    PortalTrigger: {
                        ...DefaultPortalTrigger,
                        toLevelName: 'Cave001_F00',
                        disablePikminFlags: 0,
                    }
                }],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'random').mockReturnValue(0.5)
                .mockReturnValueOnce(0.2)
                .mockReturnValueOnce(0.2)
                .mockReturnValueOnce(0.2);
            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(10);

            await randomiser({
                maps: ['Area001'],
                randPortals: true,
                randOverworldOnly: true,
                randDisabled: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Portal]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'MadoriRuins',
                        PortalTrigger: {
                            ...DefaultPortalTrigger,
                            toLevelName: 'Cave013_F00',
                            disablePikminFlags: {
                                "0": false,
                                "1": false,
                                "10": true,
                                "11": true,
                                "12": true,
                                "13": true,
                                "14": true,
                                "15": true,
                                "2": true,
                                "3": true,
                                "4": true,
                                "5": true,
                                "6": true,
                                "7": true,
                                "8": true,
                                "9": true,
                            }
                        }
                    })
                ]),
            }));
        });
    });

    //#region Objects
    describe('Objects', () => {
        test('Objects are randomised', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [{
                    creatureId: 'BikkuriGikuPlant',
                    infoType: InfoType.Object,
                }],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(5);

            await randomiser({
                maps: ['Area001'],
                randObjects: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Object]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'Hikarikinoko',
                        infoType: InfoType.Object
                    })
                ]),
            }));
        });

        test('Objects not in the rand list are unchanged', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [{
                    creatureId: 'Pelplant1',
                    infoType: InfoType.Object,
                }],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Object]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'Pelplant1',
                        infoType: InfoType.Object
                    })
                ]),
            }));
        });

        test('Objects are unchanged if randObjects is false', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [{
                    creatureId: 'BikkuriGikuPlant',
                    infoType: InfoType.Object,
                }],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Object]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'BikkuriGikuPlant',
                        infoType: InfoType.Object
                    })
                ]),
            }));
        });

        test('Gimmicks are randomised', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [
                    {
                        creatureId: 'CrackPotL',
                        infoType: InfoType.Object,
                    }
                ],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(6);

            await randomiser({
                maps: ['Area001'],
                randObjects: true,
                rebirthInterval: 3
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Hazard]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'Komush',
                        infoType: InfoType.Hazard
                    })
                ]),
            }));
        });

        test('Gimmicks are unchanged if randObjects is false', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [
                    {
                        creatureId: 'CrackPotL',
                        infoType: InfoType.Gimmick,
                    }
                ],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Gimmick]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'CrackPotL',
                        infoType: InfoType.Gimmick,
                    })
                ]),
            }));
        });

        test('Gimmicks not in the rand list are unchanged', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [
                    {
                        creatureId: 'Excavation',
                        infoType: InfoType.Gimmick,
                    }
                ],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Gimmick]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'Excavation',
                        infoType: InfoType.Gimmick,
                    })
                ]),
            }));
        });

        test('NoraSpawners in the gimmicks list are given randomised pikminTypes', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [
                    {
                        creatureId: 'NoraSpawnerHeadLock',
                        infoType: InfoType.Gimmick,
                        AIProperties: {
                            pikminType: PikminTypes[3]
                        }
                    }
                ],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(4);

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Gimmick]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'NoraSpawnerHeadLock',
                        infoType: InfoType.Gimmick,
                        AIProperties: {
                            pikminType: PikminTypes[4]
                        }
                    })
                ]),
            }));
        });

        test('WorkObjects are randomised', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [
                    {
                        creatureId: 'VarGateDenki',
                        infoType: InfoType.WorkObject,
                    }
                ],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(8);

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: true,
                excludeGates: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.WorkObject]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'VarGateIceNoPillar',
                        infoType: InfoType.WorkObject
                    })
                ]),
            }));
        });

        test('Gates left alone if excludeGates is true', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [
                    {
                        creatureId: 'VarGateDenki',
                        infoType: InfoType.WorkObject,
                    }
                ],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: true,
                excludeGates: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.WorkObject]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'VarGateDenki',
                        infoType: InfoType.WorkObject
                    })
                ]),
            }));
        });

        test('Gates are given drops if gatesDrop is true', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [
                    {
                        creatureId: 'VarGateDenki',
                        infoType: InfoType.WorkObject,
                    }
                ],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'random').mockReturnValue(0.5);
            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(0)
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(0);


            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: true,
                excludeGates: false,
                allObjectsDrop: true,
                gatesDrop: true,
                randMaxDrops: 2,
                dropLimitMax: 1,
                randIntFunction: 'even',
                objectDropChance: 100
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.WorkObject]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'GateRock175uu',
                        infoType: InfoType.WorkObject,
                        drops: {
                            parsed: [
                                {
                                    ...DefaultDrop,
                                    assetName: '/Game/Carrot4/Placeables/Items/GBomb.GBomb_C',
                                    maxDrops: 2,
                                }
                            ]
                        }
                    })
                ]),
            }));
        });

        test('WorkObjects are unchanged if randObjects is false', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [
                    {
                        creatureId: 'VarGateDenki',
                        infoType: InfoType.WorkObject,
                    }
                ],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: false,
                excludeGates: false,
                allObjectsDrop: true,
                randMaxDrops: 2,
                dropLimitMax: 1
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.WorkObject]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'VarGateDenki',
                        infoType: InfoType.WorkObject,
                    })
                ]),
            }));
        });

        test('WorkObjects not in the rand list are unchanged', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [
                    {
                        creatureId: 'BridgeFlexible',
                        infoType: InfoType.WorkObject,
                    }
                ],
                [InfoType.Hazard]: [],
                [InfoType.Object]: [],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.WorkObject]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'BridgeFlexible',
                        infoType: InfoType.WorkObject,
                    })
                ]),
            }));
        });

        test('Hazards are randomised', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [
                    {
                        creatureId: 'HibaDenki',
                        infoType: InfoType.Hazard,
                    }
                ],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(20);

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: true,
                hazardsLfL: false,
                forceCaves: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Gimmick]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'ExcavationS',
                        infoType: InfoType.Gimmick
                    })
                ]),
                [InfoType.Hazard]: expect.toBeArrayOfLength(0)
            }));
        });

        test('Hazards are unchanged if randObjects is false', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [
                    {
                        creatureId: 'HibaDenki',
                        infoType: InfoType.Hazard,
                    }
                ],
                [InfoType.Object]: [],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Hazard]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'HibaDenki',
                        infoType: InfoType.Hazard,
                    })
                ]),
            }));
        });

        test('Hazards are randomised to other hazards is hazardsLfL is true', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [
                    {
                        creatureId: 'HibaDenki',
                        infoType: InfoType.Hazard,
                    }
                ],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(2);

            await randomiser({
                maps: ['Area001'],
                randObjects: true,
                hazardsLfL: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Area001', expect.objectContaining({
                [InfoType.Hazard]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'FireFloor525uu',
                        infoType: InfoType.Hazard,
                    })
                ]),
            }));
        });

        test('Objects are not changed in caves', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Gimmick]: [],
                [InfoType.WorkObject]: [],
                [InfoType.Hazard]: [
                    {
                        creatureId: 'HibaDenki',
                        infoType: InfoType.Hazard,
                    }
                ],
                [InfoType.Object]: [],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(3);

            await randomiser({
                maps: ['Cave001_F00'],
                randObjects: true,
                hazardsLfL: true,
                forceCaves: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Hazard]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'HibaDenki',
                        infoType: InfoType.Hazard,
                    })
                ]),
            }));
        });
    });

    describe('Onions', () => {
        test('Onions are randomised', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Onion]: [
                    {
                        creatureId: 'OnyonCarryYellow',
                        transform: {
                            translation: {
                                X: 0.0,
                                Y: 0.0
                            }
                        },
                        infoType: InfoType.Onion,
                    }
                ],
            });

            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(2);

            await randomiser({
                maps: ['Cave001_F00'],
                randAllOnions: true
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Onion]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'OnyonCarryPink',
                        infoType: InfoType.Onion,
                    })
                ]),
            }));
        });

        test('Onions are unchanged if randAllOnions is false', async () => {
            main.readMapData.mockResolvedValue({
                [InfoType.Onion]: [
                    {
                        creatureId: 'OnyonCarryYellow',
                        infoType: InfoType.Onion,
                    }
                ],
            });

            await randomiser({
                maps: ['Cave001_F00'],
                randAllOnions: false
            });

            expect(main.saveMaps).toHaveBeenCalledTimes(1);
            expect(main.saveMaps).toHaveBeenCalledWith('Cave001_F00', expect.objectContaining({
                [InfoType.Onion]: expect.arrayContaining([
                    expect.objectContaining({
                        creatureId: 'OnyonCarryYellow',
                        infoType: InfoType.Onion,
                    })
                ]),
            }));
        });
    });

    describe('Randomising Drops', () => {
        test('Pikmin are only randomised into pikmin, if retainWildPikmin is false', () => {
            const creature = {
                creatureId: 'CrackPotL',
                infoType: InfoType.Gimmick,
                drops: {
                    parsed: [
                        {
                            assetName: '/Game/Carrot4/Placeables/Pikmin/GPikminRed.GPikminRed_C'
                        }
                    ]
                }
            };
            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(2);

            randomiseRegularDrops(creature, {
                retainWildPikmin: false,
                randObjectDrops: true
            });

            expect(creature).toMatchObject({
                creatureId: 'CrackPotL',
                infoType: InfoType.Gimmick,
                drops: {
                    parsed: [
                        {
                            assetName: '/Game/Carrot4/Placeables/Pikmin/GPikminYellow.GPikminYellow_C'
                        }
                    ]
                }
            });
        });

        test('Existing friendly drops may be turned into hostile drops', () => {
            const creature = {
                creatureId: 'CrackPotL',
                infoType: InfoType.Gimmick,
                drops: {
                    parsed: [
                        {
                            assetName: '/Game/Carrot4/Placeables/Pikmin/GHoney.GHoney_C'
                        }
                    ]
                }
            };

            vi.spyOn(global.Math, 'random').mockReturnValueOnce(0.2);
            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(3);

            randomiseRegularDrops(creature, {
                randObjectDrops: true
            }, 'Area001');

            expect(creature).toMatchObject({
                creatureId: 'CrackPotL',
                infoType: InfoType.Gimmick,
                drops: {
                    parsed: [
                        {
                            assetName: '/Game/Carrot4/Placeables/Teki/GBaby.GBaby_C'
                        }
                    ]
                }
            });
        });

        test('Existing friendly drops may remain friendly drops', () => {
            const creature = {
                creatureId: 'CrackPotL',
                infoType: InfoType.Gimmick,
                drops: {
                    parsed: [
                        {
                            assetName: '/Game/Carrot4/Placeables/Pikmin/GHoney.GHoney_C'
                        }
                    ]
                }
            };

            vi.spyOn(global.Math, 'random').mockReturnValueOnce(0.2);
            vi.spyOn(global.Math, 'floor').mockReturnValueOnce(1);

            randomiseRegularDrops(creature, {
                randObjectDrops: true
            }, 'Area001');

            expect(creature).toMatchObject({
                creatureId: 'CrackPotL',
                infoType: InfoType.Gimmick,
                drops: {
                    parsed: [
                        {
                            assetName: '/Game/Carrot4/Placeables/Teki/GArikui.GArikui_C'
                        }
                    ]
                }
            });
        });
    });
});