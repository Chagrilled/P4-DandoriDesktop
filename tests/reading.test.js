import './setupTests'; // Ensure this import is at the top
import { expect, test, describe } from 'vitest';
import {
    getReadAIStaticFunc,
    getReadAIDynamicFunc,
    getReadPortalFunc,
    getReadPopPlaceFunc,
    getReadActorParameterFunc,
    getReadNavMeshTriggerFunc,
    getReadWaterTriggerFunc,
    getReadSubAIStaticFunc,
    readLife
} from '../src/genEditing/reading';
import { byteArrToInt } from '../src/utils/bytes';
import { InfoType } from '../src/api/types';
import { tekiReadingFixtures, tekiEdgeCases, tekiSynthetic } from './fixtures/reading/teki.fixtures';
import { objectReadingFixtures, objectEdgeCases, objectSynthetic } from './fixtures/reading/objects.fixtures';
import {
    dynamicReadingFixtures,
    portalTriggerReadingFixtures,
    popPlaceReadingFixtures,
    actorParameterReadingFixtures,
    navMeshTriggerReadingFixtures,
    waterTriggerReadingFixtures,
    subAIReadingFixtures,
    lifeReadingFixtures,
    affordanceReadingFixtures
} from './fixtures/reading/asp.fixtures';
import { knownBugFixtures } from './fixtures/knownBugs.fixtures';

// Same call main.js makes for every actor in an AP_ file
const readStatic = f => getReadAIStaticFunc(f.creatureId, f.infoType)(f.bytes, f.generatorVersion, f.creatureId);

// Little-endian u64 at an offset, as the decimal string Dandori stores drop IDs as
const u64At = (bytes, offset) => new DataView(Uint8Array.from(bytes.slice(offset, offset + 8)).buffer).getBigUint64(0, true).toString();

const V15 = 8626647386;
const V17 = 8626647418;

describe('Reading Tests', () => {
    describe('AI.Static - Teki', () => {
        test.each(tekiReadingFixtures)('$name is read by $reader', fixture => {
            expect(readStatic(fixture)).toEqual(fixture.expected);
        });

        describe('TekiAIParameter sections', () => {
            test('8626647386 actors have no bEnableFreezeBothDrop after the DropParameter', () => {
                const fixture = tekiEdgeCases.teki_empty_15a;
                expect(fixture.generatorVersion).toBe(V15);

                const { AIProperties, inventoryEnd } = readStatic(fixture);

                expect(AIProperties).not.toHaveProperty('bEnableFreezeBothDrop');
                expect(AIProperties).toMatchObject({
                    bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                    searchAreaOtakaraCarry: { center: { X: 0, Y: 0, Z: 0 }, halfHeight: 50, radius: 500, angle: 180, sphereRadius: 30 },
                    bEnableOptionalPoint: 0,
                    optionalPointOffsets: [],
                    optionalPointPriorityInfo: []
                });
                // 159 bytes is the shortest possible 15a teki base; Amembo's own parameters follow
                expect(inventoryEnd).toBe(159);
            });

            test('8626647418 actors read bEnableFreezeBothDrop and everything after it shifts by 4', () => {
                const fixture = tekiEdgeCases.teki_empty_17a;
                expect(fixture.generatorVersion).toBe(V17);

                const { AIProperties, inventoryEnd } = readStatic(fixture);

                expect(AIProperties.bEnableFreezeBothDrop).toBe(0);
                expect(AIProperties.searchAreaOtakaraCarry.radius).toBe(400);
                expect(inventoryEnd).toBe(163);
            });

            test('Multiple drop slots are read with their u64 UniqueIds as decimal strings', () => {
                const fixture = tekiEdgeCases.teki_multi_drops;
                const { parsed } = readStatic(fixture);

                expect(parsed).toHaveLength(3);
                // The first slot's UniqueId starts straight after the territory (20 bytes) and the slot count
                expect(parsed[0].id).toBe(u64At(fixture.bytes, 24));
                expect(parsed.map(d => d.id)).toEqual(['4613658546582585389', '4613658546582585390', '4613658546582585391']);
                expect(parsed).toMatchObject([
                    { minDrops: 3, maxDrops: 3, dropChance: 0.75, gameRulePermissionFlag: 271, assetName: '/Game/Carrot4/Placeables/Items/GHoney.GHoney_C' },
                    { minDrops: 10, maxDrops: 10, dropChance: 0.2, gameRulePermissionFlag: 15, assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C' },
                    { minDrops: 3, maxDrops: 3, dropChance: 0.05, gameRulePermissionFlag: 15, assetName: '/Game/Carrot4/Placeables/Items/GHotExtract.GHotExtract_C' }
                ]);
            });

            test('A DropConditionParameter is read as u8 condition, i32 int, FName and u8 demo flag', () => {
                const { parsed } = readStatic(tekiEdgeCases.teki_dropcond);

                expect(parsed[0]).toMatchObject({ dropCondition: 5, dropCondInt: 0, dropCondName: 'None', assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaDisc.GOtaDisc_C' });
                expect(parsed[1]).toMatchObject({ dropCondition: 6, dropCondInt: 0, dropCondName: 'None', minDrops: 5, maxDrops: 5 });
            });

            test('A non-None DropCondName is read and the rest of the slot stays aligned', () => {
                const { parsed, AIProperties } = readStatic(tekiEdgeCases.teki_dropcondname);

                expect(parsed[1]).toMatchObject({ dropCondition: 6, dropCondName: 'GOtaBanana', assetName: '/Game/Carrot4/Placeables/Items/GHoney.GHoney_C', minDrops: 5 });
                // Fields after the inventory are only right if every variable-length section was skipped correctly
                expect(AIProperties).toMatchObject({ bEnableFreezeBothDrop: 1, bEnableOptionalPoint: 1, optionalPointOffsets: [{ X: -130, Y: -240, Z: -60 }] });
            });

            test('A drop slot with bSetTerritory reads its territory cylinder', () => {
                const { parsed } = readStatic(tekiEdgeCases.teki_territory_drop);

                expect(parsed[0]).toMatchObject({
                    assetName: '/Game/Carrot4/Placeables/Teki/GMiniMochi.GMiniMochi_C',
                    bSetTerritory: 1, X: 0, Y: 0, Z: 0, halfHeight: 50, radius: 100
                });
            });

            test('A drop slot keeps its CustomParameter', () => {
                const { parsed } = readStatic(tekiEdgeCases.teki_customparam);

                expect(parsed[0]).toMatchObject({ assetName: '/Game/Carrot4/Placeables/Objects/Survivor/GSurvivorA.GSurvivorA_C', customParameter: 'SVSleep000' });
                expect(parsed[1].customParameter).toBe('None');
            });

            test('Sniff optional point offsets are read', () => {
                const { AIProperties, inventoryEnd } = readStatic(tekiEdgeCases.teki_optional_points);

                expect(AIProperties).toMatchObject({ bEnableOptionalPoint: 1, optionalPointOffsets: [{ X: -800, Y: -1250, Z: -270 }], optionalPointPriorityInfo: [] });
                expect(inventoryEnd).toBe(tekiEdgeCases.teki_optional_points.bytes.length);
            });

            test('A DropCondInt of -1 is read as a signed int32', () => {
                // Egg's PlayedDemo drop conditions store DropCondInt -1
                const egg = knownBugFixtures.find(f => f.name === 'Egg');
                const { parsed } = readStatic(egg);

                expect(parsed.filter(d => d.dropCondition === 7).map(d => d.dropCondInt)).toEqual([-1, -1]);
            });

            test('FutakuchiAdult reads bCreateIcicle from the bytes', () => {
                const fixture = tekiReadingFixtures.find(f => f.name === 'YukiFutakuchiAdult');
                expect(readStatic(fixture).AIProperties.bCreateIcicle).toBe(0);
            });

            test('Every variable-length section populated at once (synthetic)', () => {
                const fixture = tekiSynthetic.tekiAllSections;
                const { parsed, AIProperties } = getReadAIStaticFunc(fixture.creatureId, InfoType.Creature)(fixture.bytes, fixture.generatorVersion, fixture.creatureId);

                expect(parsed).toEqual(fixture.parsed);
                expect(AIProperties).toEqual(fixture.AIProperties);
            });
        });
    });

    describe('AI.Static - Objects and gimmicks', () => {
        test.each(objectReadingFixtures)('$name is read by $reader', fixture => {
            expect(readStatic(fixture)).toEqual(fixture.expected);
        });

        describe('ObjectAIParameter sections', () => {
            test('8626647386 objects have no bEnableFreezeBothDrop', () => {
                const { AIProperties } = readStatic(objectEdgeCases.obj_empty_15a);

                expect(AIProperties).not.toHaveProperty('bEnableFreezeBothDrop');
                expect(AIProperties).toMatchObject({
                    boneName: 'None',
                    bEnableOptimizeWaterBoxContext: 1,
                    linkNarrowSpaceBoxID: 'None',
                    linkWarpTriggerID: 'None',
                    navMeshTriggerID: 'None',
                    escapePoints: []
                });
            });

            test('8626647418 objects read bEnableFreezeBothDrop', () => {
                const { AIProperties } = readStatic(objectEdgeCases.obj_empty_17a);

                expect(AIProperties.bEnableFreezeBothDrop).toBe(0);
                expect(AIProperties).toMatchObject({ jumpForceXY: 600, jumpForceZ: 325, ropeAng: -20, manualWorkNum: -1 });
            });

            test('Object drop slots get sequential string IDs because their UniqueIds are always -1', () => {
                const fixture = objectEdgeCases.obj_two_drops;
                const { parsed } = readStatic(fixture);

                expect(fixture.bytes.slice(4, 12)).toEqual(Array(8).fill(255));
                expect(parsed.map(d => d.id)).toEqual(['1', '2']);
                expect(parsed).toMatchObject([
                    { dropCondition: 5, dropCondInt: 0, dropCondName: 'None', assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaPuzzleG.GOtaPuzzleG_C' },
                    { dropCondition: 6, dropCondInt: 0, dropCondName: 'None', assetName: '/Game/Carrot4/Placeables/Items/GHoney.GHoney_C' }
                ]);
            });

            test('An object drop slot with a territory cylinder', () => {
                const { parsed, AIProperties } = readStatic(objectEdgeCases.obj_territory_drop);

                expect(parsed).toEqual([expect.objectContaining({
                    assetName: '/Game/Carrot4/Placeables/Teki/GKanitama.GKanitama_C',
                    customParameter: 'None',
                    bSetTerritory: 1, X: 0, Y: 0, Z: 0, halfHeight: 50, radius: 170
                })]);
                // The RopeFishing parameters sit after the whole ObjectAIParameter, so they only line up if the drop was skipped correctly
                expect(AIProperties).toMatchObject({ jumpForceXY: 375, jumpForceZ: 325, ropeAng: -20, manualWorkNum: 7 });
            });

            test('Sniff optional point offsets on an object', () => {
                const { AIProperties } = readStatic(objectEdgeCases.obj_optional_points);

                expect(AIProperties).toMatchObject({ bEnableOptionalPoint: 1, optionalPointOffsets: [{ X: 0, Y: -250, Z: 0 }], bAutoSpawnMush: 1 });
            });

            test('Escape points are read from a real gate, and the RareDropParameter follows them', () => {
                const { parsed, rareDrops, AIProperties } = readStatic(objectEdgeCases.obj_escape_points);

                expect(AIProperties.escapePoints).toEqual([{ X: -550, Y: -745, Z: 10 }, { X: -550, Y: -605, Z: 10 }]);
                expect(parsed).toHaveLength(3);
                expect(rareDrops).toHaveLength(3);
                expect(rareDrops.every(d => d.assetName === '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C')).toBe(true);
            });

            test('Link IDs, escape points, optional points and priorities (synthetic)', () => {
                const fixture = objectSynthetic.objectAllSections;
                const { parsed, AIProperties } = getReadAIStaticFunc(fixture.creatureId, InfoType.Object)(fixture.bytes, fixture.generatorVersion, fixture.creatureId);

                expect(parsed).toEqual([expect.objectContaining(fixture.parsed[0])]);
                expect(AIProperties).toEqual(fixture.AIProperties);
            });

            test('The same object in both generator versions reads identically apart from bEnableFreezeBothDrop', () => {
                const fixture = objectSynthetic.objectVersionGate;
                const as17 = getReadAIStaticFunc(fixture.creatureId, InfoType.Gimmick)(fixture.bytes, V17, fixture.creatureId);
                const as15 = readStatic(objectEdgeCases.obj_empty_15a);

                const { bEnableFreezeBothDrop, ...rest17 } = as17.AIProperties;
                expect(bEnableFreezeBothDrop).toBe(0);
                expect(rest17).toEqual(as15.AIProperties);
            });
        });
    });

    describe('AI.Dynamic', () => {
        test.each(dynamicReadingFixtures)('$name is read by $reader', fixture => {
            expect(getReadAIDynamicFunc(fixture.creatureId, fixture.infoType)(fixture.bytes)).toEqual(fixture.expected);
        });
    });

    describe('Other ActorSerializeParameter fields', () => {
        test.each(portalTriggerReadingFixtures)('PortalTrigger: $name', fixture => {
            expect(getReadPortalFunc(fixture.infoType)(fixture.bytes)).toEqual(fixture.expected);
        });

        test.each(popPlaceReadingFixtures)('PopPlace: $name', fixture => {
            expect(getReadPopPlaceFunc(fixture.creatureId)(fixture.bytes)).toEqual(fixture.expected);
        });

        test.each(actorParameterReadingFixtures)('ActorParameter: $name', fixture => {
            expect(getReadActorParameterFunc(fixture.creatureId)(fixture.bytes)).toEqual(fixture.expected);
        });

        test.each(navMeshTriggerReadingFixtures)('NavMeshTrigger: $name', fixture => {
            expect(getReadNavMeshTriggerFunc(fixture.creatureId)(fixture.bytes)).toEqual(fixture.expected);
        });

        test.each(waterTriggerReadingFixtures)('WaterTrigger: $name', fixture => {
            expect(getReadWaterTriggerFunc(fixture.creatureId)(fixture.bytes)).toEqual(fixture.expected);
        });

        test.each(subAIReadingFixtures)('SubAI: $name', fixture => {
            expect(getReadSubAIStaticFunc(fixture.creatureId, fixture.infoType)(fixture.bytes)).toEqual(fixture.expected);
        });

        test.each(lifeReadingFixtures)('Life: $name', fixture => {
            expect(readLife(fixture.bytes)).toEqual(fixture.expected);
        });

        test.each(affordanceReadingFixtures)('Affordance weight: $name', fixture => {
            // main.js reads the DownWall weight from the last 4 bytes of Affordance.Static
            expect({ weight: byteArrToInt(fixture.bytes.slice(-4).reverse()) }).toEqual(fixture.expected);
        });
    });
});
