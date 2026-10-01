import './setupTests'; // Ensure this import is at the top
import { expect, test, describe } from 'vitest';
import {
    getConstructAIStaticFunc,
    getConstructDynamicFunc,
    getConstructPortalTriggerFunc,
    getConstructPopPlaceFunc,
    getConstructActorParamFunc,
    getConstructNavMeshTriggerFunc,
    getConstructWaterTriggerFunc,
    getConstructSubAIStaticFunc,
    writeLifeDynamic,
    writeAffordanceWeight
} from '../src/genEditing/constructing';
import { getReadAIStaticFunc, getReadAIDynamicFunc, getReadActorParameterFunc, getReadPopPlaceFunc, getReadPortalFunc } from '../src/genEditing/reading';
import { intToByteArr } from '../src/utils/bytes';
import { deepCopy } from '../src/utils';
import { DefaultDrop, InfoType } from '../src/api/types';
import { tekiConstructingFixtures, tekiEdgeCases, tekiSynthetic } from './fixtures/constructing/teki.fixtures';
import { objectConstructingFixtures, objectEdgeCases, objectSynthetic } from './fixtures/constructing/objects.fixtures';
import {
    dynamicConstructingFixtures,
    portalTriggerConstructingFixtures,
    popPlaceConstructingFixtures,
    actorParameterConstructingFixtures,
    navMeshTriggerConstructingFixtures,
    waterTriggerConstructingFixtures,
    subAIConstructingFixtures,
    lifeConstructingFixtures,
    affordanceConstructingFixtures
} from './fixtures/constructing/asp.fixtures';
import { knownBugFixtures } from './fixtures/knownBugs.fixtures';

const V15 = 8626647386;

// Mirrors the call regenerateAGLEntity makes. Inputs are copied because some writers mutate them (e.g. JSON-parsing CIDLists).
const constructStatic = (fixture, overrides = {}) => {
    const f = { ...fixture, ...overrides };
    return getConstructAIStaticFunc(f.creatureId, f.infoType)(
        deepCopy(f.drops),
        f.template ?? [],
        {
            inventoryEnd: f.inventoryEnd,
            groupingRadius: f.groupingRadius,
            ignoreList: deepCopy(f.ignoreList),
            AIProperties: deepCopy(f.AIProperties),
            transform: f.transform
        },
        f.generatorVersion,
        f.creatureId
    );
};

const readStatic = (f, bytes) => getReadAIStaticFunc(f.creatureId, f.infoType)(bytes, f.generatorVersion, f.creatureId);

const floatsLE = (...values) => values.flatMap(v => {
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, v, true);
    return [0, 1, 2, 3].map(i => view.getUint8(i));
});

// Some writers regenerate a 12-byte location from the actor's transform (X, Y, Z + 50) rather than keeping the original.
// Everything else must be byte-identical.
const expectTransformRegenerated = (out, expected, { X, Y, Z }) => {
    expect(out).toHaveLength(expected.length);
    const location = floatsLE(X, Y, Z + 50);
    const at = out.findIndex((_, i) => location.every((b, j) => out[i + j] === b));
    expect(at).toBeGreaterThanOrEqual(0);
    expect([...out.slice(0, at), ...out.slice(at + 12)]).toEqual([...expected.slice(0, at), ...expected.slice(at + 12)]);
};

const exact = fixtures => fixtures.filter(f => !f.mode);

// readFloat rounds tiny negatives to -0, which re-reads as 0 once written - the sign of zero doesn't matter for these checks
const ignoreZeroSign = value => JSON.parse(JSON.stringify(value));
const withMode = (fixtures, mode) => fixtures.filter(f => f.mode === mode);

describe('Constructing Tests', () => {
    describe('AI.Static - Teki', () => {
        test.each(exact(tekiConstructingFixtures))('$name is rebuilt byte-for-byte by $writer', fixture => {
            expect(constructStatic(fixture)).toEqual(fixture.expected);
        });

        describe('TekiAIParameter sections', () => {
            test.each(Object.values(tekiEdgeCases))('$name: $description', fixture => {
                expect(constructStatic(fixture)).toEqual(fixture.expected);
            });

            test('8626647386 teki are 4 bytes shorter than the same teki written as 8626647418', () => {
                const fixture = tekiEdgeCases.teki_empty_15a;
                const as17 = constructStatic(fixture, { generatorVersion: 8626647418 });

                expect(fixture.generatorVersion).toBe(V15);
                expect(as17).toHaveLength(fixture.expected.length + 4);
                // Territory (20) + drop count (4) + DropActorParameter with a None bone (71) + DebugUniqueIdList count (4) = 99
                expect(as17.slice(99, 103)).toEqual([0, 0, 0, 0]);
                expect([...as17.slice(0, 99), ...as17.slice(103)]).toEqual(fixture.expected);
            });

            test('Drop UniqueIds are written back as the original u64, including in the DebugUniqueIdList', () => {
                const fixture = tekiEdgeCases.teki_multi_drops;
                const out = constructStatic(fixture);
                const id = BigInt(fixture.drops.parsed[0].id);
                const idBytes = Array.from({ length: 8 }, (_, i) => Number((id >> BigInt(i * 8)) & 0xFFn));

                expect(out.slice(24, 32)).toEqual(idBytes);
                expect(out).toEqual(fixture.expected);
            });

            test('Every variable-length section populated at once', () => {
                const fixture = tekiSynthetic.tekiAllSections;
                expect(constructStatic({ ...fixture, infoType: InfoType.Creature })).toEqual(fixture.expected);
            });

            test('A DefaultDrop added in the UI produces a valid slot', () => {
                const fixture = tekiSynthetic.tekiDefaultDropAdded;
                const drops = { ...fixture.drops, parsed: [...fixture.drops.parsed, { ...DefaultDrop }] };

                const out = constructStatic({ ...fixture, infoType: InfoType.Creature, drops });

                expect(out).toEqual(fixture.expected);
                expect(readStatic({ ...fixture, infoType: InfoType.Creature }, out).parsed).toEqual([
                    expect.objectContaining({ id: '1', minDrops: 1, maxDrops: 1, dropChance: 1, customParameter: 'None', assetName: DefaultDrop.assetName })
                ]);
            });
        });
    });

    describe('AI.Static - Objects and gimmicks', () => {
        test.each(exact(objectConstructingFixtures))('$name is rebuilt byte-for-byte by $writer', fixture => {
            expect(constructStatic(fixture)).toEqual(fixture.expected);
        });

        // Their floats aren't exact to 3 decimal places, and readFloat rounds, so check read -> write -> read is stable instead
        test.each(withMode(objectConstructingFixtures, 'idempotent'))('$name survives a read/write/read cycle', fixture => {
            const out = constructStatic(fixture);
            expect(out).toHaveLength(fixture.expected.length);
            expect(ignoreZeroSign(readStatic(fixture, out).AIProperties)).toEqual(ignoreZeroSign(readStatic(fixture, fixture.expected).AIProperties));
        });

        test.each(withMode(objectConstructingFixtures, 'transform'))('$name keeps everything but the transform-derived location', fixture => {
            expectTransformRegenerated(constructStatic(fixture), fixture.expected, fixture.transform);
        });

        describe('ObjectAIParameter sections', () => {
            test.each(Object.values(objectEdgeCases))('$name: $description', fixture => {
                expect(constructStatic(fixture)).toEqual(fixture.expected);
            });

            test('Link IDs, escape points, optional points and priorities', () => {
                const fixture = objectSynthetic.objectAllSections;
                expect(constructStatic({ ...fixture, infoType: InfoType.Object })).toEqual(fixture.expected);
            });

            test('A 8626647386 object written as 8626647418 gains bEnableFreezeBothDrop and nothing else', () => {
                const fixture = objectSynthetic.objectVersionGate;
                const out = constructStatic({ ...fixture, infoType: InfoType.Gimmick });

                expect(out).toEqual(fixture.expected);
                expect(out).toHaveLength(fixture.bytes15.length + 4);
            });

            test('Object drop slots always write -1 as their UniqueId', () => {
                const fixture = objectEdgeCases.obj_two_drops;
                const drops = { parsed: fixture.drops.parsed.map((d, i) => ({ ...d, id: `${1000 + i}` })), rareDrops: [] };

                expect(constructStatic({ ...fixture, drops })).toEqual(fixture.expected);
            });

            // StickyFloor keeps its drops; Geyser/Valve/Zipline/PressFloor deliberately write an empty DropParameter
            test('A DefaultDrop added to an object produces a valid slot', () => {
                const fixture = objectEdgeCases.obj_optional_points;
                const drops = { parsed: [...fixture.drops.parsed, { ...DefaultDrop }], rareDrops: [] };

                const out = constructStatic({ ...fixture, drops });
                const reread = readStatic(fixture, out);

                expect(reread.parsed).toHaveLength(2);
                expect(reread.parsed[1]).toEqual(expect.objectContaining({ id: '2', minDrops: 1, maxDrops: 1, dropChance: 1, customParameter: 'None', assetName: DefaultDrop.assetName }));
                expect(reread.AIProperties).toEqual(readStatic(fixture, fixture.expected).AIProperties);
            });
        });
    });

    describe('AI.Dynamic', () => {
        test.each(dynamicConstructingFixtures)('$name is rebuilt byte-for-byte by $writer', fixture => {
            const out = getConstructDynamicFunc(fixture.creatureId, fixture.infoType)(fixture.template ?? [], { AIProperties: deepCopy(fixture.AIProperties) });
            expect(out).toEqual(fixture.expected);
        });
    });

    describe('Other ActorSerializeParameter fields', () => {
        test.each(portalTriggerConstructingFixtures)('PortalTrigger: $name keeps everything but the transform-derived trigger location', fixture => {
            const out = getConstructPortalTriggerFunc(fixture.infoType)({
                transform: { translation: fixture.translation },
                PortalTrigger: deepCopy(fixture.value.PortalTrigger)
            }, fixture.template);
            expectTransformRegenerated(out, fixture.expected, fixture.translation);
        });

        test.each(popPlaceConstructingFixtures)('PopPlace: $name', fixture => {
            expect(getConstructPopPlaceFunc(fixture.creatureId)(deepCopy(fixture.value.PopPlace))).toEqual(fixture.expected);
        });

        test.each(exact(actorParameterConstructingFixtures))('ActorParameter: $name', fixture => {
            expect(getConstructActorParamFunc(fixture.creatureId)(fixture.template, deepCopy(fixture.value))).toEqual(fixture.expected);
        });

        test.each(withMode(actorParameterConstructingFixtures, 'idempotent'))('ActorParameter: $name survives a read/write/read cycle', fixture => {
            const out = getConstructActorParamFunc(fixture.creatureId)(fixture.template, deepCopy(fixture.value));
            expect(ignoreZeroSign(getReadActorParameterFunc(fixture.creatureId)(out))).toEqual(ignoreZeroSign(fixture.value));
        });

        test.each(navMeshTriggerConstructingFixtures)('NavMeshTrigger: $name', fixture => {
            expect(getConstructNavMeshTriggerFunc(fixture.creatureId)(fixture.template, deepCopy(fixture.value))).toEqual(fixture.expected);
        });

        test.each(waterTriggerConstructingFixtures)('WaterTrigger: $name', fixture => {
            expect(getConstructWaterTriggerFunc(fixture.creatureId)(fixture.template, deepCopy(fixture.value))).toEqual(fixture.expected);
        });

        test.each(subAIConstructingFixtures)('SubAI: $name', fixture => {
            expect(getConstructSubAIStaticFunc(fixture.creatureId)({ parsed: deepCopy(fixture.value.parsed) }, fixture.template)).toEqual(fixture.expected);
        });

        test.each(lifeConstructingFixtures)('Life: $name', fixture => {
            expect(writeLifeDynamic(fixture.value)).toEqual(fixture.expected);
        });

        test.each(affordanceConstructingFixtures)('Affordance weight: $name only replaces the trailing weight', fixture => {
            const out = writeAffordanceWeight(fixture.weight, { Static: fixture.template });

            expect(out.slice(0, -4)).toEqual(fixture.expected.slice(0, -4));
            expect(out.slice(-4)).toEqual(intToByteArr(fixture.weight));
        });
    });

    // Each of these reads a real sample and writes it straight back. They currently fail because of the listed bug.
    // When one is fixed vitest will report the test.fails as failing - move that fixture into the normal tests.
    describe('Known bugs', () => {
        const roundTrip = f => {
            if (f.kind === 'static') {
                const read = readStatic(f, f.bytes);
                return getConstructAIStaticFunc(f.creatureId, f.infoType)(
                    { parsed: read.parsed || [], rareDrops: read.rareDrops || [] },
                    f.bytes,
                    { inventoryEnd: read.inventoryEnd, groupingRadius: read.groupingRadius, ignoreList: read.ignoreList, AIProperties: read.AIProperties },
                    f.generatorVersion,
                    f.creatureId
                );
            }
            if (f.kind === 'dynamic') {
                return getConstructDynamicFunc(f.creatureId, f.infoType)(f.bytes, { AIProperties: getReadAIDynamicFunc(f.creatureId, f.infoType)(f.bytes) });
            }
            if (f.kind === 'ActorParameter') {
                return getConstructActorParamFunc(f.creatureId)(f.bytes, getReadActorParameterFunc(f.creatureId)(f.bytes));
            }
            if (f.kind === 'PortalTrigger') {
                const { PortalTrigger } = getReadPortalFunc(f.infoType)(f.bytes);
                return getConstructPortalTriggerFunc(f.infoType)({ transform: { translation: f.translation }, PortalTrigger }, f.bytes);
            }
            if (f.kind === 'PopPlace') {
                return getConstructPopPlaceFunc(f.creatureId)(getReadPopPlaceFunc(f.creatureId)(f.bytes).PopPlace);
            }
            throw new Error(`No round trip for ${f.kind}`);
        };

        test.fails.each(knownBugFixtures)('$name ($kind): $bug', fixture => {
            expect(roundTrip(fixture)).toEqual(fixture.bytes);
        });
    });
});
