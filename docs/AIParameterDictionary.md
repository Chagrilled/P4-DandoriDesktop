# Pikmin 4 AI parameter dictionary

Every field of every `*AIParameter` struct, with what it does in-game. See `README.md` for method, key findings and caveats.

**Exposed** column: `BP` = appears in `blueprints.json` (Placeables blueprint defaults), `SL` = appears in `sublevels.json` (per-actor `AI.Static` bytes), `—` = **not exposed in the blueprint/sublevel files** (only the game code/cooked class defaults set it).  

**Confidence** column: `T` traced in the decompiled code, `S` structural (confirmed by the per-instance static serializer, constructor or data), `N` inferred from the name, type and default values.

| | count |
|---|---|
| blueprints+sublevels | 179 |
| blueprints | 2415 |
| sublevels | 256 |
| not exposed | 2320 |
| **total** | **5170** |

Confidence: inferred 4563, structural 555, traced 52

## Contents

- [ActorSpawnAIParameter](#actorspawnaiparameter) (16 fields, 16 exposed)
- [AIAttackParameter](#aiattackparameter) (5 fields, 5 exposed)
- [AICarryParameter](#aicarryparameter) (5 fields, 5 exposed)
- [AIFlickParameter](#aiflickparameter) (1 fields, 1 exposed)
- [AirWallAIComponent](#airwallaicomponent) (5 fields, 5 exposed)
- [AIWanderParameter](#aiwanderparameter) (7 fields, 6 exposed)
- [AmeBozuAIParameter](#amebozuaiparameter) (65 fields, 43 exposed)
- [AmemboAIBulletParameter](#amemboaibulletparameter) (8 fields, 4 exposed)
- [AmemboAIParameter](#amemboaiparameter) (31 fields, 16 exposed)
- [AngBound2](#angbound2) (1 fields, 1 exposed)
- [AngleSpeedParameter](#anglespeedparameter) (3 fields, 2 exposed)
- [AppealToHappyParam](#appealtohappyparam) (3 fields, 2 exposed)
- [ArikuiAIParameter](#arikuiaiparameter) (16 fields, 12 exposed)
- [AttackEventParameter](#attackeventparameter) (2 fields, 2 exposed)
- [AttributeChappyAIParameter](#attributechappyaiparameter) (6 fields, 4 exposed)
- [AwadakoAIParameter](#awadakoaiparameter) (27 fields, 18 exposed)
- [BabyAIParameter](#babyaiparameter) (2 fields, 1 exposed)
- [BabyCrowAIParameter](#babycrowaiparameter) (4 fields, 3 exposed)
- [BankAIParameter](#bankaiparameter) (5 fields, 3 exposed)
- [BaseEffectParameter](#baseeffectparameter) (2 fields, 1 exposed)
- [BaumkuchenBound2](#baumkuchenbound2) (6 fields, 4 exposed)
- [BaumkuchenSearchArea](#baumkuchensearcharea) (1 fields, 1 exposed)
- [BigChappyAIParameter](#bigchappyaiparameter) (24 fields, 18 exposed)
- [BigFrogAIParameter](#bigfrogaiparameter) (4 fields, 2 exposed)
- [BigFrogJumpCountParameter](#bigfrogjumpcountparameter) (2 fields, 2 exposed)
- [BigKingChappyAIParameter](#bigkingchappyaiparameter) (3 fields, 2 exposed)
- [BigKingChappyBigJumpWarnFaceMessageParameter](#bigkingchappybigjumpwarnfacemessageparameter) (2 fields, 2 exposed)
- [BigUjinkoAIParameter](#bigujinkoaiparameter) (11 fields, 8 exposed)
- [BikkuriGikuAIParameter](#bikkurigikuaiparameter) (23 fields, 13 exposed)
- [BikkuriGikuDamageAreaParameter](#bikkurigikudamageareaparameter) (4 fields, 3 exposed)
- [BillyAIParameter](#billyaiparameter) (15 fields, 9 exposed)
- [BillyContactFlickParameter](#billycontactflickparameter) (8 fields, 5 exposed)
- [BillyGenerateParameter](#billygenerateparameter) (1 fields, 1 exposed)
- [BillyStickerrFlickParameter](#billystickerrflickparameter) (6 fields, 5 exposed)
- [BlendParam](#blendparam) (2 fields, 2 exposed)
- [BokeNamekoAIParameter](#bokenamekoaiparameter) (18 fields, 10 exposed)
- [BombBaseAIParameter](#bombbaseaiparameter) (15 fields, 1 exposed)
- [BoneParameter](#boneparameter) (3 fields, 3 exposed)
- [BookendAIParameter](#bookendaiparameter) (5 fields, 2 exposed)
- [BossInu2AIParameter](#bossinu2aiparameter) (4 fields, 4 exposed)
- [BossInu2AttackDist](#bossinu2attackdist) (1 fields, 1 exposed)
- [BossInu2AttackDistParameter](#bossinu2attackdistparameter) (2 fields, 1 exposed)
- [BossInu2AttackNum](#bossinu2attacknum) (1 fields, 1 exposed)
- [BossInu2AttackNumParameter](#bossinu2attacknumparameter) (3 fields, 1 exposed)
- [BossInu2AttrArmorParam](#bossinu2attrarmorparam) (5 fields, 4 exposed)
- [BossInu2CommonParam](#bossinu2commonparam) (12 fields, 10 exposed)
- [BossInu2CurseBallAIParameter](#bossinu2curseballaiparameter) (6 fields, 5 exposed)
- [BossInu2CurseBallNum](#bossinu2curseballnum) (1 fields, 1 exposed)
- [BossInu2CurseBallNumParameter](#bossinu2curseballnumparameter) (7 fields, 3 exposed)
- [BossInu2CurseBeamAreaAIParameter](#bossinu2cursebeamareaaiparameter) (13 fields, 6 exposed)
- [BossInu2CurseBeamAreaBoundParameter](#bossinu2cursebeamareaboundparameter) (4 fields, 3 exposed)
- [BossInu2CurseBeamAreaEftParam](#bossinu2cursebeamareaeftparam) (4 fields, 1 exposed)
- [BossInu2DangleParameter](#bossinu2dangleparameter) (8 fields, 3 exposed)
- [BossInu2DebugParam](#bossinu2debugparam) (7 fields, 1 exposed)
- [BossInu2DemoParam](#bossinu2demoparam) (1 fields, 1 exposed)
- [BossInu2DownParam](#bossinu2downparam) (10 fields, 6 exposed)
- [BossInu2EatParam](#bossinu2eatparam) (11 fields, 9 exposed)
- [BossInu2ElecModeHighSpeedRushParam](#bossinu2elecmodehighspeedrushparam) (10 fields, 5 exposed)
- [BossInu2FallRockNum](#bossinu2fallrocknum) (1 fields, 1 exposed)
- [BossInu2FallRockNumParameter](#bossinu2fallrocknumparameter) (3 fields, 1 exposed)
- [BossInu2FlickParam](#bossinu2flickparam) (1 fields, 1 exposed)
- [BossInu2FloatMoveParam](#bossinu2floatmoveparam) (4 fields, 3 exposed)
- [BossInu2GenseiModeBikkuriKinokoParam](#bossinu2genseimodebikkurikinokoparam) (20 fields, 14 exposed)
- [BossInu2GenseiModeBikkuriKinokoPoisonBallParam](#bossinu2genseimodebikkurikinokopoisonballparam) (11 fields, 9 exposed)
- [BossInu2GenseiModeBillyElecPartsParam](#bossinu2genseimodebillyelecpartsparam) (7 fields, 6 exposed)
- [BossInu2GenseiModeBillyParam](#bossinu2genseimodebillyparam) (6 fields, 6 exposed)
- [BossInu2GenseiModeBillyThunderAtkParam](#bossinu2genseimodebillythunderatkparam) (21 fields, 13 exposed)
- [BossInu2GenseiModeBillyThunderChaseParam](#bossinu2genseimodebillythunderchaseparam) (10 fields, 5 exposed)
- [BossInu2GenseiModeCommonParam](#bossinu2genseimodecommonparam) (6 fields, 5 exposed)
- [BossInu2GenseiModeDarkAffordanceParam](#bossinu2genseimodedarkaffordanceparam) (3 fields, 3 exposed)
- [BossInu2GenseiModeDarkBeamApproachParam](#bossinu2genseimodedarkbeamapproachparam) (4 fields, 2 exposed)
- [BossInu2GenseiModeDarkBeamParam](#bossinu2genseimodedarkbeamparam) (15 fields, 12 exposed)
- [BossInu2GenseiModeDarkBeamRandTimeParam](#bossinu2genseimodedarkbeamrandtimeparam) (2 fields, 2 exposed)
- [BossInu2GenseiModeDarkCryParam](#bossinu2genseimodedarkcryparam) (10 fields, 6 exposed)
- [BossInu2GenseiModeDarkEscapeParam](#bossinu2genseimodedarkescapeparam) (3 fields, 2 exposed)
- [BossInu2GenseiModeDarkPushParam](#bossinu2genseimodedarkpushparam) (2 fields, 2 exposed)
- [BossInu2GenseiModeEscapeParam](#bossinu2genseimodeescapeparam) (7 fields, 4 exposed)
- [BossInu2GenseiModeFireChappyFireBallParam](#bossinu2genseimodefirechappyfireballparam) (8 fields, 5 exposed)
- [BossInu2GenseiModeFireChappyFireWaveParam](#bossinu2genseimodefirechappyfirewaveparam) (10 fields, 7 exposed)
- [BossInu2GenseiModeFireChappyLavaRockParam](#bossinu2genseimodefirechappylavarockparam) (7 fields, 5 exposed)
- [BossInu2GenseiModeFireChappyParam](#bossinu2genseimodefirechappyparam) (4 fields, 4 exposed)
- [BossInu2GenseiModeNormalModeFaceMessageParam](#bossinu2genseimodenormalmodefacemessageparam) (6 fields, 3 exposed)
- [BossInu2GenseiModeNormalModeParam](#bossinu2genseimodenormalmodeparam) (5 fields, 5 exposed)
- [BossInu2GenseiModeNormalModePressParam](#bossinu2genseimodenormalmodepressparam) (24 fields, 22 exposed)
- [BossInu2GenseiModeNormalModeRockFallParam](#bossinu2genseimodenormalmoderockfallparam) (7 fields, 5 exposed)
- [BossInu2GenseiModeNormalModeRushParam](#bossinu2genseimodenormalmoderushparam) (19 fields, 13 exposed)
- [BossInu2GenseiModeNormalModeSmallPressParam](#bossinu2genseimodenormalmodesmallpressparam) (4 fields, 3 exposed)
- [BossInu2GenseiModeParam](#bossinu2genseimodeparam) (11 fields, 9 exposed)
- [BossInu2GenseiModeWaterTankParam](#bossinu2genseimodewatertankparam) (3 fields, 3 exposed)
- [BossInu2GoHomeParam](#bossinu2gohomeparam) (1 fields, 1 exposed)
- [BossInu2IceBallAIParameter](#bossinu2iceballaiparameter) (17 fields, 6 exposed)
- [BossInu2IceBallDarumaParam](#bossinu2iceballdarumaparam) (6 fields, 1 exposed)
- [BossInu2IceModeBreathEftParam](#bossinu2icemodebreatheftparam) (6 fields, 5 exposed)
- [BossInu2IceModeIceBallParam](#bossinu2icemodeiceballparam) (9 fields, 7 exposed)
- [BossInu2IceModeWaterBreathParam](#bossinu2icemodewaterbreathparam) (18 fields, 10 exposed)
- [BossInu2LookAroundParam](#bossinu2lookaroundparam) (1 fields, 1 exposed)
- [BossInu2LouieAIParameter](#bossinu2louieaiparameter) (4 fields, 3 exposed)
- [BossInu2LouieParam](#bossinu2louieparam) (4 fields, 3 exposed)
- [BossInu2MaterialAnimParam](#bossinu2materialanimparam) (2 fields, 2 exposed)
- [BossInu2MoveParam](#bossinu2moveparam) (5 fields, 5 exposed)
- [BossInu2MoveToTerritoryCenterParam](#bossinu2movetoterritorycenterparam) (7 fields, 3 exposed)
- [BossInu2NormalModeRushFlickBound](#bossinu2normalmoderushflickbound) (3 fields, 3 exposed)
- [BossInu2RushEatParam](#bossinu2rusheatparam) (10 fields, 5 exposed)
- [BossInu2ScatterObjParam](#bossinu2scatterobjparam) (6 fields, 3 exposed)
- [BossInu2WanderParam](#bossinu2wanderparam) (3 fields, 3 exposed)
- [BossInu2ZukanParam](#bossinu2zukanparam) (1 fields, 1 exposed)
- [BoxBound2](#boxbound2) (3 fields, 3 exposed)
- [BranchAIParameter](#branchaiparameter) (3 fields, 2 exposed)
- [BridgeFlexibleAIComponent](#bridgeflexibleaicomponent) (3 fields, 3 exposed)
- [BuildObjectAIComponent](#buildobjectaicomponent) (3 fields, 2 exposed)
- [BuildWallFlexibleAIComponent](#buildwallflexibleaicomponent) (2 fields, 2 exposed)
- [BurningAIParameter](#burningaiparameter) (5 fields, 2 exposed)
- [BurrowAIParameter](#burrowaiparameter) (2 fields, 2 exposed)
- [CakeSearchArea](#cakesearcharea) (1 fields, 1 exposed)
- [CakeSSphereSearchArea](#cakesspheresearcharea) (1 fields, 1 exposed)
- [CameraDistStepParameter](#cameradiststepparameter) (5 fields, 4 exposed)
- [CameraStartEndInterpolateParameter](#camerastartendinterpolateparameter) (3 fields, 3 exposed)
- [CarrotActorComponent](#carrotactorcomponent) (1 fields, 1 exposed)
- [CarrotAIComponent](#carrotaicomponent) (29 fields, 22 exposed)
- [CarrotColorAnimation](#carrotcoloranimation) (2 fields, 2 exposed)
- [CarrotRangeF](#carrotrangef) (2 fields, 2 exposed)
- [ChappyBaseAIParameter](#chappybaseaiparameter) (16 fields, 12 exposed)
- [ChappyBaseRayCheckParameter](#chappybaseraycheckparameter) (1 fields, 1 exposed)
- [CharcoalAIParameter](#charcoalaiparameter) (5 fields, 4 exposed)
- [CharmParameter](#charmparameter) (6 fields, 3 exposed)
- [ChaseParameter](#chaseparameter) (2 fields, 2 exposed)
- [ChaserAIParameter](#chaseraiparameter) (25 fields, 16 exposed)
- [ChaserAreaMoveParameter](#chaserareamoveparameter) (6 fields, 5 exposed)
- [ChaserBarkParameter](#chaserbarkparameter) (13 fields, 8 exposed)
- [ChaserCaptureParameter](#chasercaptureparameter) (10 fields, 2 exposed)
- [ChaserChaseParameter](#chaserchaseparameter) (9 fields, 6 exposed)
- [ChaserEscapeParameter](#chaserescapeparameter) (7 fields, 4 exposed)
- [ChaserIntimidationParameter](#chaserintimidationparameter) (8 fields, 4 exposed)
- [ChaserRestCancelDamageParameter](#chaserrestcanceldamageparameter) (3 fields, 3 exposed)
- [ChaserRestParameter](#chaserrestparameter) (5 fields, 5 exposed)
- [ChaserRideParameter](#chaserrideparameter) (2 fields, 1 exposed)
- [ChaserRouteWanderParameter](#chaserroutewanderparameter) (6 fields, 2 exposed)
- [ChaserYuudouEsaReactionParameter](#chaseryuudouesareactionparameter) (6 fields, 2 exposed)
- [CirculatorAIParameter](#circulatoraiparameter) (17 fields, 15 exposed)
- [ColdBoxAIParameter](#coldboxaiparameter) (4 fields, 3 exposed)
- [Cond](#cond) (2 fields, 1 exposed)
- [ConeBound](#conebound) (2 fields, 2 exposed)
- [ConveyorBaseAIParameter](#conveyorbaseaiparameter) (4 fields, 4 exposed)
- [ConveyorNavAIParameter](#conveyornavaiparameter) (1 fields, 1 exposed)
- [CrackPotAIParameter](#crackpotaiparameter) (9 fields, 7 exposed)
- [CrushJellyAIParameter](#crushjellyaiparameter) (11 fields, 10 exposed)
- [CushionAIParameter](#cushionaiparameter) (6 fields, 6 exposed)
- [CylinderBound2](#cylinderbound2) (3 fields, 2 exposed)
- [CylinderSearchArea](#cylindersearcharea) (3 fields, 3 exposed)
- [DamageAreaAIParameter](#damageareaaiparameter) (13 fields, 7 exposed)
- [DamageAreaOverrideParameter](#damageareaoverrideparameter) (10 fields, 9 exposed)
- [DamagumoBaseAIParameter](#damagumobaseaiparameter) (57 fields, 48 exposed)
- [DamagumoCannonAIParameter](#damagumocannonaiparameter) (32 fields, 25 exposed)
- [DamagumoCannonBulletParameter](#damagumocannonbulletparameter) (8 fields, 7 exposed)
- [DamagumoCannonShootSetCountParameter](#damagumocannonshootsetcountparameter) (3 fields, 2 exposed)
- [DamagumoMoveCurves](#damagumomovecurves) (6 fields, 6 exposed)
- [DemejakoAIParameter](#demejakoaiparameter) (38 fields, 27 exposed)
- [DemejakoBoundParameter](#demejakoboundparameter) (3 fields, 2 exposed)
- [DemejakoBurrowParameter](#demejakoburrowparameter) (1 fields, 1 exposed)
- [DemejakoFaceMessageParameter](#demejakofacemessageparameter) (2 fields, 1 exposed)
- [DemejakoMoveParameter](#demejakomoveparameter) (5 fields, 1 exposed)
- [DemejakoPointerParameter](#demejakopointerparameter) (2 fields, 1 exposed)
- [DemejakoStateMoveParameter](#demejakostatemoveparameter) (1 fields, 1 exposed)
- [DiscoDamagumoAIParameter](#discodamagumoaiparameter) (41 fields, 28 exposed)
- [DiscoDamagumoLaunchParameter](#discodamagumolaunchparameter) (4 fields, 4 exposed)
- [DodoroAIParameter](#dodoroaiparameter) (15 fields, 9 exposed)
- [DodoroBulletParameter](#dodorobulletparameter) (9 fields, 8 exposed)
- [DodoroChaseAngVelTimeParameter](#dodorochaseangveltimeparameter) (6 fields, 4 exposed)
- [DodoroChaseParameter](#dodorochaseparameter) (6 fields, 4 exposed)
- [DodoroChasePathMoveParameter](#dodorochasepathmoveparameter) (4 fields, 1 exposed)
- [DodoroEggAIParameter](#dodoroeggaiparameter) (20 fields, 8 exposed)
- [DodoroEggCrackLifeRateParam](#dodoroeggcrackliferateparam) (2 fields, 1 exposed)
- [DodoroLookAtParameter](#dodorolookatparameter) (2 fields, 2 exposed)
- [DodoroMiasmaForFlashParam](#dodoromiasmaforflashparam) (4 fields, 2 exposed)
- [DodoroMiasmaParameter](#dodoromiasmaparameter) (10 fields, 7 exposed)
- [DodoroRoarParameter](#dodororoarparameter) (3 fields, 1 exposed)
- [DodoroStepCheckRayParameter](#dodorostepcheckrayparameter) (3 fields, 3 exposed)
- [DodoroStepParameter](#dodorostepparameter) (13 fields, 4 exposed)
- [DodoroWasurenagusaParameter](#dodorowasurenagusaparameter) (10 fields, 2 exposed)
- [DodoroZukanParameter](#dodorozukanparameter) (1 fields, 1 exposed)
- [DokuNamekoAIParameter](#dokunamekoaiparameter) (6 fields, 6 exposed)
- [DokuNamekoGenerateParameter](#dokunamekogenerateparameter) (11 fields, 4 exposed)
- [DownFloorAIComponent](#downflooraicomponent) (1 fields, 1 exposed)
- [DropActorParameter](#dropactorparameter) (10 fields, 10 exposed)
- [DropConditionParameter](#dropconditionparameter) (4 fields, 4 exposed)
- [DropItemParameter](#dropitemparameter) (7 fields, 6 exposed)
- [DropParameter](#dropparameter) (5 fields, 4 exposed)
- [DropSpawnMiniInfo](#dropspawnminiinfo) (6 fields, 6 exposed)
- [DweevilAIParameter](#dweevilaiparameter) (10 fields, 7 exposed)
- [DweevilAttackParam](#dweevilattackparam) (8 fields, 3 exposed)
- [DweevilBombChaseParam](#dweevilbombchaseparam) (5 fields, 1 exposed)
- [DweevilEscapeParam](#dweevilescapeparam) (6 fields, 2 exposed)
- [DweevilFallAppearParam](#dweevilfallappearparam) (2 fields, 2 exposed)
- [DweevilOtakaraParam](#dweevilotakaraparam) (24 fields, 9 exposed)
- [EffectColorDTParam](#effectcolordtparam) (2 fields, 2 exposed)
- [EftCustomRequestParam](#eftcustomrequestparam) (17 fields, 13 exposed)
- [EggAIParameter](#eggaiparameter) (10 fields, 1 exposed)
- [ElecMushiAIParameter](#elecmushiaiparameter) (18 fields, 8 exposed)
- [EnemyFightCameraParameter](#enemyfightcameraparameter) (9 fields, 7 exposed)
- [ExcavationAIParameter](#excavationaiparameter) (22 fields, 13 exposed)
- [FenceFallAIParameter](#fencefallaiparameter) (3 fields, 3 exposed)
- [FindInput](#findinput) (5 fields, 1 exposed)
- [FireAIParameter](#fireaiparameter) (4 fields, 4 exposed)
- [FireChappyAIParameter](#firechappyaiparameter) (2 fields, 1 exposed)
- [FlickArg](#flickarg) (45 fields, 34 exposed)
- [FlickLimit](#flicklimit) (2 fields, 2 exposed)
- [FollowKochappyBaseAIComponent](#followkochappybaseaicomponent) (1 fields, 1 exposed)
- [FollowKochappyBaseAIParameter](#followkochappybaseaiparameter) (4 fields, 4 exposed)
- [FollowKochappyBaseChildParameter](#followkochappybasechildparameter) (5 fields, 4 exposed)
- [FollowKochappyBaseLeaderParameter](#followkochappybaseleaderparameter) (5 fields, 2 exposed)
- [FrogAIParameter](#frogaiparameter) (36 fields, 30 exposed)
- [FrogFlyEffectParameter](#frogflyeffectparameter) (3 fields, 3 exposed)
- [FutakuchiAdultAIParameter](#futakuchiadultaiparameter) (57 fields, 38 exposed)
- [FutakuchiAdultAttackBaseParameter](#futakuchiadultattackbaseparameter) (6 fields, 6 exposed)
- [FutakuchiAdultSplineParameter](#futakuchiadultsplineparameter) (3 fields, 2 exposed)
- [FutakuchiAIHomingParameter](#futakuchiaihomingparameter) (3 fields, 1 exposed)
- [FutakuchiAIParameter](#futakuchiaiparameter) (28 fields, 19 exposed)
- [GasKoganeAIParameter](#gaskoganeaiparameter) (5 fields, 4 exposed)
- [GateAIComponent](#gateaicomponent) (3 fields, 3 exposed)
- [GCCarryPikminParameter](#gccarrypikminparameter) (26 fields, 6 exposed)
- [GeyserAIParameter](#geyseraiparameter) (15 fields, 12 exposed)
- [GroupDropManagerAIParameter](#groupdropmanageraiparameter) (6 fields, 5 exposed)
- [HageDamagumoAIParameter](#hagedamagumoaiparameter) (8 fields, 8 exposed)
- [HamboAIParameter](#hamboaiparameter) (44 fields, 15 exposed)
- [HanachirashiAIParameter](#hanachirashiaiparameter) (14 fields, 12 exposed)
- [HanachirashiAttackParameter](#hanachirashiattackparameter) (5 fields, 2 exposed)
- [HanachirashiAvoidParameter](#hanachirashiavoidparameter) (8 fields, 4 exposed)
- [HanachirashiChaseParameter](#hanachirashichaseparameter) (8 fields, 1 exposed)
- [HanachirashiDieParameter](#hanachirashidieparameter) (2 fields, 1 exposed)
- [HanachirashiEscapeParameter](#hanachirashiescapeparameter) (10 fields, 2 exposed)
- [HandleBoardAIParameter](#handleboardaiparameter) (8 fields, 1 exposed)
- [HappyDoorAIParameter](#happydooraiparameter) (6 fields, 3 exposed)
- [HappyReactionParameter](#happyreactionparameter) (3 fields, 3 exposed)
- [HariAIBulletParameter](#hariaibulletparameter) (9 fields, 3 exposed)
- [HariAIParameter](#hariaiparameter) (22 fields, 9 exposed)
- [HariCautionParameter](#haricautionparameter) (6 fields, 1 exposed)
- [HariuoAIParameter](#hariuoaiparameter) (28 fields, 20 exposed)
- [HibaAIBulletParameter](#hibaaibulletparameter) (7 fields, 6 exposed)
- [HibaAIParameter](#hibaaiparameter) (18 fields, 16 exposed)
- [HiddenBoxAIParameter](#hiddenboxaiparameter) (1 fields, 1 exposed)
- [HikariKinokoAIParameter](#hikarikinokoaiparameter) (6 fields, 1 exposed)
- [IceChappyAIParameter](#icechappyaiparameter) (2 fields, 1 exposed)
- [IcicleAIParameter](#icicleaiparameter) (15 fields, 2 exposed)
- [InvasionParameter](#invasionparameter) (2 fields, 2 exposed)
- [IwakkoAIParameter](#iwakkoaiparameter) (49 fields, 25 exposed)
- [IwakkoCrystalAIParameter](#iwakkocrystalaiparameter) (6 fields, 5 exposed)
- [KaburiBaseAIParameter](#kaburibaseaiparameter) (8 fields, 4 exposed)
- [KajiokoshiAIParameter](#kajiokoshiaiparameter) (12 fields, 11 exposed)
- [KajiokoshiEffectParameter](#kajiokoshieffectparameter) (4 fields, 4 exposed)
- [KajiokoshiPoolParameter](#kajiokoshipoolparameter) (3 fields, 1 exposed)
- [KanitamaAIParameter](#kanitamaaiparameter) (67 fields, 34 exposed)
- [KareHamboAIParameter](#karehamboaiparameter) (43 fields, 23 exposed)
- [KemekujiAIParameter](#kemekujiaiparameter) (24 fields, 8 exposed)
- [KingChappyBaseAIParameter](#kingchappybaseaiparameter) (12 fields, 10 exposed)
- [KingChappyBaseAppearParameter](#kingchappybaseappearparameter) (3 fields, 3 exposed)
- [KingChappyBaseAttackParameter](#kingchappybaseattackparameter) (13 fields, 8 exposed)
- [KingChappyBaseBigJumpParameter](#kingchappybasebigjumpparameter) (20 fields, 16 exposed)
- [KingChappyBaseDamageParameter](#kingchappybasedamageparameter) (1 fields, 1 exposed)
- [KingChappyBaseFallRockParameter](#kingchappybasefallrockparameter) (8 fields, 6 exposed)
- [KingChappyBaseFallRockRange](#kingchappybasefallrockrange) (4 fields, 4 exposed)
- [KingChappyBaseHideParameter](#kingchappybasehideparameter) (5 fields, 3 exposed)
- [KingChappyBaseInvalidHitFaceMessageParameter](#kingchappybaseinvalidhitfacemessageparameter) (6 fields, 3 exposed)
- [KingChappyBasePressParameter](#kingchappybasepressparameter) (6 fields, 6 exposed)
- [KingChappyBaseWalkParameter](#kingchappybasewalkparameter) (8 fields, 7 exposed)
- [KingChappyBaseWarCryParameter](#kingchappybasewarcryparameter) (9 fields, 6 exposed)
- [KochappyAIParameter](#kochappyaiparameter) (7 fields, 6 exposed)
- [KoganeBaseAIParameter](#koganebaseaiparameter) (18 fields, 13 exposed)
- [KoganeBaseDropParameter](#koganebasedropparameter) (2 fields, 2 exposed)
- [KoganiAIParameter](#koganiaiparameter) (7 fields, 6 exposed)
- [KoganiAttackableArea](#koganiattackablearea) (5 fields, 4 exposed)
- [KoganiAttackParameter](#koganiattackparameter) (6 fields, 2 exposed)
- [KoganiBubbleBlowParameter](#koganibubbleblowparameter) (13 fields, 2 exposed)
- [KoganiChaseParameter](#koganichaseparameter) (8 fields, 3 exposed)
- [KoganiClawDestroyParameter](#koganiclawdestroyparameter) (2 fields, 2 exposed)
- [KoganiClawDestroyStageSettings](#koganiclawdestroystagesettings) (4 fields, 2 exposed)
- [KoganiHiddenParameter](#koganihiddenparameter) (5 fields, 4 exposed)
- [KoganiMoveParameter](#koganimoveparameter) (4 fields, 1 exposed)
- [KomushAIParameter](#komushaiparameter) (3 fields, 1 exposed)
- [KumaChappyAIParameter](#kumachappyaiparameter) (10 fields, 9 exposed)
- [KurageAIParameter](#kurageaiparameter) (69 fields, 49 exposed)
- [KurioneAIParameter](#kurioneaiparameter) (12 fields, 9 exposed)
- [MarAIParameter](#maraiparameter) (40 fields, 28 exposed)
- [MiniMochiAIParameter](#minimochiaiparameter) (18 fields, 9 exposed)
- [MiniMochiFaceMsgParam](#minimochifacemsgparam) (3 fields, 2 exposed)
- [MitsuMochiAbsorbParameter](#mitsumochiabsorbparameter) (10 fields, 5 exposed)
- [MitsuMochiAIParameter](#mitsumochiaiparameter) (15 fields, 11 exposed)
- [MitsuMochiChaseParameter](#mitsumochichaseparameter) (6 fields, 1 exposed)
- [MitsuMochiContinuousAttackParameter](#mitsumochicontinuousattackparameter) (6 fields, 3 exposed)
- [MitsuMochiCounterParameter](#mitsumochicounterparameter) (4 fields, 2 exposed)
- [MitsuMochiDownParameter](#mitsumochidownparameter) (12 fields, 4 exposed)
- [MitsuMochiEffectParameter](#mitsumochieffectparameter) (3 fields, 3 exposed)
- [MitsuMochiEscapeParameter](#mitsumochiescapeparameter) (8 fields, 6 exposed)
- [MitsuMochiFaceMsgParameter](#mitsumochifacemsgparameter) (1 fields, 1 exposed)
- [MitsuMochiFrozenParameter](#mitsumochifrozenparameter) (5 fields, 1 exposed)
- [MitsuMochiSplidBodyParameter](#mitsumochisplidbodyparameter) (9 fields, 5 exposed)
- [MitsuMochiSplidBodySpawnParameter](#mitsumochisplidbodyspawnparameter) (6 fields, 3 exposed)
- [MitsuMochiSplitBodyAbsorbParameter](#mitsumochisplitbodyabsorbparameter) (7 fields, 3 exposed)
- [MitsuMochiSplitBodyAIParameter](#mitsumochisplitbodyaiparameter) (2 fields, 2 exposed)
- [MitsuMochiSplitBodyEscapeParameter](#mitsumochisplitbodyescapeparameter) (5 fields, 1 exposed)
- [MitsuMochiSplitBodyMoveParameter](#mitsumochisplitbodymoveparameter) (6 fields, 1 exposed)
- [MitsuMochiTargetIntpParameter](#mitsumochitargetintpparameter) (3 fields, 3 exposed)
- [MitsuMochiTerritoryEdge](#mitsumochiterritoryedge) (9 fields, 2 exposed)
- [MitsuMochiTerritoryEdgeTurnParam](#mitsumochiterritoryedgeturnparam) (2 fields, 1 exposed)
- [MiulinAIParameter](#miulinaiparameter) (34 fields, 27 exposed)
- [MiulinSitWaitParameter](#miulinsitwaitparameter) (3 fields, 2 exposed)
- [MizunukiAIComponent](#mizunukiaicomponent) (1 fields, 1 exposed)
- [MouthParameter](#mouthparameter) (8 fields, 7 exposed)
- [MouthSettings](#mouthsettings) (8 fields, 8 exposed)
- [MoveFloorAIParameter](#moveflooraiparameter) (11 fields, 9 exposed)
- [NamazuAIParameter](#namazuaiparameter) (4 fields, 2 exposed)
- [NightDropParameter](#nightdropparameter) (2 fields, 2 exposed)
- [NiseBaseAIParameter](#nisebaseaiparameter) (8 fields, 8 exposed)
- [NiseBaseAttackParameter](#nisebaseattackparameter) (10 fields, 7 exposed)
- [NiseBaseChaseParameter](#nisebasechaseparameter) (1 fields, 1 exposed)
- [NiseBaseDownParameter](#nisebasedownparameter) (5 fields, 5 exposed)
- [NiseBaseJammingParameter](#nisebasejammingparameter) (1 fields, 1 exposed)
- [NiseBaseLockonParameter](#nisebaselockonparameter) (2 fields, 2 exposed)
- [NiseBaseMorphParameter](#nisebasemorphparameter) (2 fields, 1 exposed)
- [NiseBaseMorphPlayInfo](#nisebasemorphplayinfo) (3 fields, 2 exposed)
- [NiseBaseMorphStepInfo](#nisebasemorphstepinfo) (4 fields, 2 exposed)
- [NiseBaseOtakaraPieceParameter](#nisebaseotakarapieceparameter) (13 fields, 2 exposed)
- [NiseBaseWeakPointParameter](#nisebaseweakpointparameter) (21 fields, 17 exposed)
- [NiseBaseWeakPointPersonalParameter](#nisebaseweakpointpersonalparameter) (7 fields, 3 exposed)
- [NiseBossAIParameter](#nisebossaiparameter) (2 fields, 2 exposed)
- [NiseBossDefeatDemoParameter](#nisebossdefeatdemoparameter) (1 fields, 1 exposed)
- [NiseBossDemoParameter](#nisebossdemoparameter) (1 fields, 1 exposed)
- [NiseBossFirstWaitParameter](#nisebossfirstwaitparameter) (3 fields, 1 exposed)
- [NiseOtakaraAIParameter](#niseotakaraaiparameter) (5 fields, 5 exposed)
- [NiseOtakaraDestroyParameter](#niseotakaradestroyparameter) (2 fields, 2 exposed)
- [NiseOtakaraJammingParameter](#niseotakarajammingparameter) (3 fields, 3 exposed)
- [NiseOtakaraLandingParameter](#niseotakaralandingparameter) (5 fields, 4 exposed)
- [NomiAIParameter](#nomiaiparameter) (3 fields, 3 exposed)
- [NomiJumpParam](#nomijumpparam) (12 fields, 1 exposed)
- [NomiMoveParam](#nomimoveparam) (7 fields, 2 exposed)
- [NomiStickParam](#nomistickparam) (9 fields, 3 exposed)
- [NoraSpawnerAIParameter](#noraspawneraiparameter) (31 fields, 31 exposed)
- [NumaSuitoriAIParameter](#numasuitoriaiparameter) (30 fields, 21 exposed)
- [ObjectAIParameter](#objectaiparameter) (19 fields, 11 exposed)
- [OoAshibaKinokoAIParameter](#ooashibakinokoaiparameter) (7 fields, 5 exposed)
- [OoPanModokiAIParameter](#oopanmodokiaiparameter) (3 fields, 2 exposed)
- [OoPanModokiRideParameter](#oopanmodokirideparameter) (10 fields, 4 exposed)
- [OoPanModokiRushParameter](#oopanmodokirushparameter) (11 fields, 6 exposed)
- [OoPanModokiRushStartBound](#oopanmodokirushstartbound) (4 fields, 3 exposed)
- [OtakaraAIComponent](#otakaraaicomponent) (2 fields, 2 exposed)
- [OtakaraAIParameter](#otakaraaiparameter) (40 fields, 10 exposed)
- [OtamaAIParameter](#otamaaiparameter) (12 fields, 3 exposed)
- [OverlapConditions](#overlapconditions) (6 fields, 6 exposed)
- [PanModokiBaseAIParameter](#panmodokibaseaiparameter) (7 fields, 4 exposed)
- [PanModokiBaseCarryParameter](#panmodokibasecarryparameter) (20 fields, 12 exposed)
- [PatrollerAIParameter](#patrolleraiparameter) (51 fields, 34 exposed)
- [PatrollerChasePriority](#patrollerchasepriority) (9 fields, 3 exposed)
- [PelletAIParameter](#pelletaiparameter) (6 fields, 1 exposed)
- [PelplantAIParameter](#pelplantaiparameter) (26 fields, 3 exposed)
- [PIDControlParameter](#pidcontrolparameter) (11 fields, 7 exposed)
- [PieceStationAIComponent](#piecestationaicomponent) (1 fields, 1 exposed)
- [PikminFlashAIParameter](#pikminflashaiparameter) (33 fields, 24 exposed)
- [PikminFlashEffectScale](#pikminflasheffectscale) (7 fields, 6 exposed)
- [PikminHeadAIParameter](#pikminheadaiparameter) (7 fields, 2 exposed)
- [PodAIParameter](#podaiparameter) (31 fields, 11 exposed)
- [PopPlaceComponent](#popplacecomponent) (15 fields, 9 exposed)
- [PortalBaseAIParameter](#portalbaseaiparameter) (10 fields, 2 exposed)
- [PortalTriggerComponent](#portaltriggercomponent) (26 fields, 17 exposed)
- [PressFloorAIParameter](#pressflooraiparameter) (11 fields, 2 exposed)
- [PressFloorParameter](#pressfloorparameter) (6 fields, 6 exposed)
- [PullNekkoAIParameter](#pullnekkoaiparameter) (12 fields, 1 exposed)
- [PushGimmickAIParameter](#pushgimmickaiparameter) (14 fields, 1 exposed)
- [QueenAIParameter](#queenaiparameter) (56 fields, 39 exposed)
- [QueenTypeParameter](#queentypeparameter) (10 fields, 10 exposed)
- [RAngBound2](#rangbound2) (2 fields, 1 exposed)
- [RBaumkuchenBound2](#rbaumkuchenbound2) (7 fields, 5 exposed)
- [RopeFishingAIParameter](#ropefishingaiparameter) (7 fields, 4 exposed)
- [RusherAIParameter](#rusheraiparameter) (5 fields, 3 exposed)
- [RusherClashParameter](#rusherclashparameter) (3 fields, 3 exposed)
- [RusherRushBox](#rusherrushbox) (4 fields, 4 exposed)
- [RusherRushParameter](#rusherrushparameter) (13 fields, 11 exposed)
- [RusherTurnParameter](#rusherturnparameter) (4 fields, 3 exposed)
- [SakadachiAIParameter](#sakadachiaiparameter) (16 fields, 8 exposed)
- [SakadachiChaseParameter](#sakadachichaseparameter) (7 fields, 4 exposed)
- [SakadachiDownParameter](#sakadachidownparameter) (6 fields, 2 exposed)
- [SakadachiGoBackParameter](#sakadachigobackparameter) (10 fields, 3 exposed)
- [SakadachiHandleFlickParameter](#sakadachihandleflickparameter) (4 fields, 2 exposed)
- [SakadachiHandleParameter](#sakadachihandleparameter) (6 fields, 5 exposed)
- [SakadachiLookAtParameter](#sakadachilookatparameter) (3 fields, 2 exposed)
- [SakadachiStateLookAtParameter](#sakadachistatelookatparameter) (7 fields, 4 exposed)
- [SaraiAIParameter](#saraiaiparameter) (27 fields, 13 exposed)
- [SearchArea](#searcharea) (2 fields, 2 exposed)
- [SearchInput](#searchinput) (1 fields, 1 exposed)
- [SenbeiAttrAttackEftParam](#senbeiattrattackeftparam) (8 fields, 7 exposed)
- [SenbeiBaseAIParameter](#senbeibaseaiparameter) (18 fields, 11 exposed)
- [ShakeCameraParameter](#shakecameraparameter) (4 fields, 3 exposed)
- [ShakoAIParameter](#shakoaiparameter) (29 fields, 17 exposed)
- [ShakoGoParameter](#shakogoparameter) (4 fields, 4 exposed)
- [ShakoMoveParameter](#shakomoveparameter) (7 fields, 7 exposed)
- [ShakoStateMoveParameter](#shakostatemoveparameter) (2 fields, 2 exposed)
- [ShakoTurnParameter](#shakoturnparameter) (2 fields, 2 exposed)
- [ShijimiAIParameter](#shijimiaiparameter) (34 fields, 21 exposed)
- [ShijimiAmplitudeParameter](#shijimiamplitudeparameter) (4 fields, 3 exposed)
- [ShijimiRangeF](#shijimirangef) (2 fields, 2 exposed)
- [ShippoAIParameter](#shippoaiparameter) (44 fields, 32 exposed)
- [ShippoAttackBoundParameter](#shippoattackboundparameter) (7 fields, 6 exposed)
- [ShippoHintMessageParameter](#shippohintmessageparameter) (6 fields, 3 exposed)
- [ShippoPressBoundParameter](#shippopressboundparameter) (8 fields, 5 exposed)
- [ShippoSlamAttackParameter](#shipposlamattackparameter) (2 fields, 1 exposed)
- [ShippoSlamTurnParameter](#shipposlamturnparameter) (11 fields, 8 exposed)
- [ShortcakeBound2](#shortcakebound2) (4 fields, 3 exposed)
- [SitRowInfo](#sitrowinfo) (3 fields, 2 exposed)
- [SlowStickerParameter](#slowstickerparameter) (4 fields, 3 exposed)
- [SnakeCrowAIParameter](#snakecrowaiparameter) (43 fields, 23 exposed)
- [SniffPointParameter](#sniffpointparameter) (5 fields, 3 exposed)
- [SpaceBusAIParameter](#spacebusaiparameter) (1 fields, 1 exposed)
- [SpawnTireParameter](#spawntireparameter) (2 fields, 2 exposed)
- [SphereBound2](#spherebound2) (2 fields, 1 exposed)
- [SphereSearchArea](#spheresearcharea) (2 fields, 1 exposed)
- [SporePoolAIParameter](#sporepoolaiparameter) (5 fields, 5 exposed)
- [SprinklerAIParameter](#sprinkleraiparameter) (15 fields, 4 exposed)
- [StickyFloorAIParameter](#stickyflooraiparameter) (12 fields, 1 exposed)
- [StringAIParameter](#stringaiparameter) (9 fields, 2 exposed)
- [SuitoriAIParameter](#suitoriaiparameter) (32 fields, 22 exposed)
- [SuitoriChasePriority](#suitorichasepriority) (9 fields, 9 exposed)
- [SuitoriChasePriorityElement](#suitorichasepriorityelement) (2 fields, 2 exposed)
- [SuitoriFullMoveParam](#suitorifullmoveparam) (2 fields, 2 exposed)
- [SuitoriMotionControl](#suitorimotioncontrol) (5 fields, 1 exposed)
- [SwallowWeightParameter](#swallowweightparameter) (15 fields, 2 exposed)
- [SwitchBaseAIParameter](#switchbaseaiparameter) (7 fields, 2 exposed)
- [TamagoMushiAIParameter](#tamagomushiaiparameter) (36 fields, 29 exposed)
- [TamagoMushiAppearTimeParameter](#tamagomushiappeartimeparameter) (5 fields, 1 exposed)
- [TamagumoAIParameter](#tamagumoaiparameter) (16 fields, 7 exposed)
- [TamagumoNetAIParameter](#tamagumonetaiparameter) (17 fields, 9 exposed)
- [TamagumoNetForRockPikminParam](#tamagumonetforrockpikminparam) (2 fields, 2 exposed)
- [TanebiInsideParameter](#tanebiinsideparameter) (2 fields, 2 exposed)
- [TanebiStationAIParameter](#tanebistationaiparameter) (6 fields, 1 exposed)
- [TankAttackBox](#tankattackbox) (4 fields, 4 exposed)
- [TankBaseAIParameter](#tankbaseaiparameter) (24 fields, 21 exposed)
- [TargetFilter](#targetfilter) (1 fields, 1 exposed)
- [TateanaAIParameter](#tateanaaiparameter) (7 fields, 4 exposed)
- [TateanaBaseAIParameter](#tateanabaseaiparameter) (4 fields, 3 exposed)
- [TekiAIParameter](#tekiaiparameter) (44 fields, 43 exposed)
- [TekiCarcassWaterContextParameter](#tekicarcasswatercontextparameter) (3 fields, 3 exposed)
- [TekiDanagerParameter](#tekidanagerparameter) (2 fields, 2 exposed)
- [TekiHardLockParam](#tekihardlockparam) (8 fields, 6 exposed)
- [ThrowEaterAIParameter](#throweateraiparameter) (29 fields, 14 exposed)
- [ThrowEaterLookAtParameter](#throweaterlookatparameter) (3 fields, 2 exposed)
- [ThrowEaterLookAtPartsParam](#throweaterlookatpartsparam) (5 fields, 2 exposed)
- [ThrowEaterMouthCtrlParameter](#throweatermouthctrlparameter) (7 fields, 6 exposed)
- [ThrowEaterThrowParam](#throweaterthrowparam) (4 fields, 4 exposed)
- [ThrowEaterThrowParameter](#throweaterthrowparameter) (2 fields, 1 exposed)
- [TobiKaburiAIParameter](#tobikaburiaiparameter) (8 fields, 3 exposed)
- [TobinkoAIParameter](#tobinkoaiparameter) (27 fields, 13 exposed)
- [TobiuoAIParameter](#tobiuoaiparameter) (59 fields, 17 exposed)
- [TobiuoGoParameter](#tobiuogoparameter) (2 fields, 2 exposed)
- [TobiuoTurnParameter](#tobiuoturnparameter) (5 fields, 4 exposed)
- [TrampolineAIParameter](#trampolineaiparameter) (4 fields, 3 exposed)
- [TrapBaseAIParameter](#trapbaseaiparameter) (7 fields, 3 exposed)
- [TrapBikkuriAIParameter](#trapbikkuriaiparameter) (3 fields, 2 exposed)
- [TrapRockBallAIParameter](#traprockballaiparameter) (8 fields, 6 exposed)
- [TriggerDoorAIParameter](#triggerdooraiparameter) (19 fields, 15 exposed)
- [TwinSwitchAIParameter](#twinswitchaiparameter) (2 fields, 1 exposed)
- [UjinkoBaseAIParameter](#ujinkobaseaiparameter) (11 fields, 3 exposed)
- [ValveAIParameter](#valveaiparameter) (8 fields, 3 exposed)
- [ValveGimmickBaseAIComponent](#valvegimmickbaseaicomponent) (1 fields, 1 exposed)
- [WarpCarryAIParameter](#warpcarryaiparameter) (58 fields, 29 exposed)
- [WasurenagusaAIParameter](#wasurenagusaaiparameter) (19 fields, 2 exposed)
- [WaterBoxAIParameter](#waterboxaiparameter) (1 fields, 1 exposed)
- [WaterBoxNavAIComponent](#waterboxnavaicomponent) (2 fields, 2 exposed)
- [WaterLevel](#waterlevel) (12 fields, 8 exposed)
- [WayChecker](#waychecker) (6 fields, 3 exposed)
- [YamashinjuAIParameter](#yamashinjuaiparameter) (13 fields, 9 exposed)
- [YamashinjuFlickMiniArg](#yamashinjuflickminiarg) (3 fields, 2 exposed)
- [YukimushiAIParameter](#yukimushiaiparameter) (42 fields, 30 exposed)
- [ZiplineAIParameter](#ziplineaiparameter) (11 fields, 7 exposed)
- [AIWanderRangeLimitParam](#aiwanderrangelimitparam) (5 fields, 0 exposed)
- [AmeBozuTireAIParameter](#amebozutireaiparameter) (1 fields, 0 exposed)
- [AreaBaseCampComponent](#areabasecampcomponent) (5 fields, 0 exposed)
- [AreaBaseCampParameter](#areabasecampparameter) (9 fields, 0 exposed)
- [BankCardAIParameter](#bankcardaiparameter) (6 fields, 0 exposed)
- [BikkuriGikuTopBaseAIParameter](#bikkurigikutopbaseaiparameter) (1 fields, 0 exposed)
- [BikkuriKinokoPoisonAreaAIParameter](#bikkurikinokopoisonareaaiparameter) (1 fields, 0 exposed)
- [BillyChargeParameter](#billychargeparameter) (4 fields, 0 exposed)
- [BillyOroroParameter](#billyororoparameter) (1 fields, 0 exposed)
- [BillyRunAwayParameter](#billyrunawayparameter) (2 fields, 0 exposed)
- [BombAIParameter](#bombaiparameter) (7 fields, 0 exposed)
- [BossInu2AttackTime](#bossinu2attacktime) (1 fields, 0 exposed)
- [BossInu2AttackTimeParameter](#bossinu2attacktimeparameter) (2 fields, 0 exposed)
- [BossInu2CommonJumpTurnParam](#bossinu2commonjumpturnparam) (2 fields, 0 exposed)
- [BossInu2CurseBallShotParameter](#bossinu2curseballshotparameter) (2 fields, 0 exposed)
- [BossInu2DarkModeFaceMsgParam](#bossinu2darkmodefacemsgparam) (2 fields, 0 exposed)
- [BossInu2GenseiModeBillyDischargeEffectParam](#bossinu2genseimodebillydischargeeffectparam) (3 fields, 0 exposed)
- [BossInu2GenseiModeBillyEffectParam](#bossinu2genseimodebillyeffectparam) (2 fields, 0 exposed)
- [BossInu2GenseiModeBillyThunderChaseFlickParam](#bossinu2genseimodebillythunderchaseflickparam) (3 fields, 0 exposed)
- [BossInu2HandleFlickParameter](#bossinu2handleflickparameter) (3 fields, 0 exposed)
- [BossInu2RippleWaveAIParameter](#bossinu2ripplewaveaiparameter) (12 fields, 0 exposed)
- [BossInu2ScatterElecPartsNumParam](#bossinu2scatterelecpartsnumparam) (3 fields, 0 exposed)
- [BossInu2ScatterElecPartsParam](#bossinu2scatterelecpartsparam) (2 fields, 0 exposed)
- [BossInu2UIParam](#bossinu2uiparam) (1 fields, 0 exposed)
- [BossInuPoisonAreaAIParameter](#bossinupoisonareaaiparameter) (2 fields, 0 exposed)
- [BubbleAIParameter](#bubbleaiparameter) (24 fields, 0 exposed)
- [CarrotColorAnimationParameterValue](#carrotcoloranimationparametervalue) (2 fields, 0 exposed)
- [CarrotRange](#carrotrange) (2 fields, 0 exposed)
- [ChappyAIParameter](#chappyaiparameter) (3 fields, 0 exposed)
- [ChaserDownParameter](#chaserdownparameter) (6 fields, 0 exposed)
- [ChaserLookAtParameter](#chaserlookatparameter) (3 fields, 0 exposed)
- [ChaserPatrolParameter](#chaserpatrolparameter) (2 fields, 0 exposed)
- [DecoAIParameter](#decoaiparameter) (2 fields, 0 exposed)
- [DecoSpawnerAIParameter](#decospawneraiparameter) (12 fields, 0 exposed)
- [DemoTabletAIParameter](#demotabletaiparameter) (1 fields, 0 exposed)
- [DodoroChaseToAttackParameter](#dodorochasetoattackparameter) (2 fields, 0 exposed)
- [DodoroEggBreakParam](#dodoroeggbreakparam) (6 fields, 0 exposed)
- [DogFoodAIParameter](#dogfoodaiparameter) (6 fields, 0 exposed)
- [DrkMinionAIParameter](#drkminionaiparameter) (5 fields, 0 exposed)
- [DronePinAIParameter](#dronepinaiparameter) (4 fields, 0 exposed)
- [DweevilEsaParam](#dweevilesaparam) (2 fields, 0 exposed)
- [EditableBound](#editablebound) (1 fields, 0 exposed)
- [EftCustomRequestFloatParam](#eftcustomrequestfloatparam) (2 fields, 0 exposed)
- [EsaBaseAIParameter](#esabaseaiparameter) (5 fields, 0 exposed)
- [EventSimulatorAIParameter](#eventsimulatoraiparameter) (10 fields, 0 exposed)
- [EventSimulatorAttackParameter](#eventsimulatorattackparameter) (5 fields, 0 exposed)
- [EventSimulatorBaseParameter](#eventsimulatorbaseparameter) (1 fields, 0 exposed)
- [EventSimulatorBoundParameter](#eventsimulatorboundparameter) (1 fields, 0 exposed)
- [EventSimulatorCapsuleParameter](#eventsimulatorcapsuleparameter) (1 fields, 0 exposed)
- [EventSimulatorItemParameter](#eventsimulatoritemparameter) (1 fields, 0 exposed)
- [EventSimulatorLaunchParameter](#eventsimulatorlaunchparameter) (1 fields, 0 exposed)
- [EventSimulatorPutRouletteEggParameter](#eventsimulatorputrouletteeggparameter) (1 fields, 0 exposed)
- [EventSimulatorTateanaParameter](#eventsimulatortateanaparameter) (1 fields, 0 exposed)
- [EventSimulatorVacuumParameter](#eventsimulatorvacuumparameter) (3 fields, 0 exposed)
- [FallTrapBikkuriAIParameter](#falltrapbikkuriaiparameter) (1 fields, 0 exposed)
- [FireFloorAIParameter](#fireflooraiparameter) (5 fields, 0 exposed)
- [GCFollowInvalidCondition](#gcfollowinvalidcondition) (2 fields, 0 exposed)
- [GCRideJumpInvalidCondition](#gcridejumpinvalidcondition) (4 fields, 0 exposed)
- [GCRideParameter](#gcrideparameter) (11 fields, 0 exposed)
- [HanachirashiTakeOffParameter](#hanachirashitakeoffparameter) (2 fields, 0 exposed)
- [HariAIDebugParameter](#hariaidebugparameter) (2 fields, 0 exposed)
- [HoneyAIParameter](#honeyaiparameter) (4 fields, 0 exposed)
- [IceAIParameter](#iceaiparameter) (1 fields, 0 exposed)
- [IcicleBreakEffectParameter](#iciclebreakeffectparameter) (2 fields, 0 exposed)
- [IcicleLandEffectParameter](#iciclelandeffectparameter) (2 fields, 0 exposed)
- [KoganiProwlParameter](#koganiprowlparameter) (6 fields, 0 exposed)
- [MitsuMochiContinuousAttackNumParameter](#mitsumochicontinuousattacknumparameter) (2 fields, 0 exposed)
- [MitsuMochiLookAtParameter](#mitsumochilookatparameter) (3 fields, 0 exposed)
- [MitsuMochiPullHairParameter](#mitsumochipullhairparameter) (4 fields, 0 exposed)
- [MitsuMochiQuickTurnParameter](#mitsumochiquickturnparameter) (2 fields, 0 exposed)
- [NightKochappyAIParameter](#nightkochappyaiparameter) (1 fields, 0 exposed)
- [NiseOtakaraCrackSettings](#niseotakaracracksettings) (4 fields, 0 exposed)
- [NpcAIInfo](#npcaiinfo) (3 fields, 0 exposed)
- [NpcAIMiniParameter](#npcaiminiparameter) (5 fields, 0 exposed)
- [NpcAIParameter](#npcaiparameter) (15 fields, 0 exposed)
- [NpcAIParameterDataTable](#npcaiparameterdatatable) (2 fields, 0 exposed)
- [NpcFollowAIParameter](#npcfollowaiparameter) (12 fields, 0 exposed)
- [NpcLookAIParameter](#npclookaiparameter) (2 fields, 0 exposed)
- [NpcLookCustomAIParameter](#npclookcustomaiparameter) (4 fields, 0 exposed)
- [NpcMoveAIParameter](#npcmoveaiparameter) (2 fields, 0 exposed)
- [NpcNearNpcReactionAIParameter](#npcnearnpcreactionaiparameter) (2 fields, 0 exposed)
- [NpcNearPlayerReactionAIParameter](#npcnearplayerreactionaiparameter) (2 fields, 0 exposed)
- [NpcPlaceCheckQuestStatus](#npcplacecheckqueststatus) (3 fields, 0 exposed)
- [NpcWaitAIParameter](#npcwaitaiparameter) (11 fields, 0 exposed)
- [NpcWanderAIParameter](#npcwanderaiparameter) (3 fields, 0 exposed)
- [OjamaBlockPhotoAIParameter](#ojamablockphotoaiparameter) (5 fields, 0 exposed)
- [OnyonAIParameter](#onyonaiparameter) (34 fields, 0 exposed)
- [OnyonCarryAIParameter](#onyoncarryaiparameter) (3 fields, 0 exposed)
- [OoPanModokiRigidityParameter](#oopanmodokirigidityparameter) (2 fields, 0 exposed)
- [OtaBankCardAIParameter](#otabankcardaiparameter) (4 fields, 0 exposed)
- [OtakaraEffectOverrideSetting](#otakaraeffectoverridesetting) (3 fields, 0 exposed)
- [OtakaraEffectParam](#otakaraeffectparam) (2 fields, 0 exposed)
- [OverrideLocationParam](#overridelocationparam) (4 fields, 0 exposed)
- [OverrideRadiusParam](#overrideradiusparam) (3 fields, 0 exposed)
- [OverrideScaleParam](#overridescaleparam) (2 fields, 0 exposed)
- [OverrideSetting](#overridesetting) (2 fields, 0 exposed)
- [PanModokiAIParameter](#panmodokiaiparameter) (1 fields, 0 exposed)
- [PanModokiBaseChaseParameter](#panmodokibasechaseparameter) (1 fields, 0 exposed)
- [PanModokiBaseDemoParameter](#panmodokibasedemoparameter) (1 fields, 0 exposed)
- [PhotonBallAIParameter](#photonballaiparameter) (6 fields, 0 exposed)
- [PieceAIParameter](#pieceaiparameter) (16 fields, 0 exposed)
- [PieceStationAIParameter](#piecestationaiparameter) (12 fields, 0 exposed)
- [PlantsAIParameter](#plantsaiparameter) (2 fields, 0 exposed)
- [PoisonMushAIParameter](#poisonmushaiparameter) (4 fields, 0 exposed)
- [PongashiAIParameter](#pongashiaiparameter) (12 fields, 0 exposed)
- [RespawnLocationControl](#respawnlocationcontrol) (11 fields, 0 exposed)
- [RockBallAIParameter](#rockballaiparameter) (41 fields, 0 exposed)
- [RockBallDelayRollEffectParameter](#rockballdelayrolleffectparameter) (2 fields, 0 exposed)
- [RockBallRollHDRumbleParameter](#rockballrollhdrumbleparameter) (1 fields, 0 exposed)
- [RopeBranchAIParameter](#ropebranchaiparameter) (2 fields, 0 exposed)
- [RusherLookAtParameter](#rusherlookatparameter) (3 fields, 0 exposed)
- [SakadachiFaceMsgParam](#sakadachifacemsgparam) (2 fields, 0 exposed)
- [SakadachiGoHomeParameter](#sakadachigohomeparameter) (4 fields, 0 exposed)
- [SearchBombAIParameter](#searchbombaiparameter) (8 fields, 0 exposed)
- [ShakoBoneParameter](#shakoboneparameter) (3 fields, 0 exposed)
- [ShakoFlickNonStickerParameter](#shakoflicknonstickerparameter) (3 fields, 0 exposed)
- [ShugoFlagAIParameter](#shugoflagaiparameter) (20 fields, 0 exposed)
- [SlopeBothAIParameter](#slopebothaiparameter) (1 fields, 0 exposed)
- [SuitoriKeepDistance](#suitorikeepdistance) (4 fields, 0 exposed)
- [SwampCarrotTriggerComponent](#swampcarrottriggercomponent) (1 fields, 0 exposed)
- [TanebiAIParameter](#tanebiaiparameter) (5 fields, 0 exposed)
- [TestSearchAIParameter](#testsearchaiparameter) (7 fields, 0 exposed)
- [ThrowItemAIParameter](#throwitemaiparameter) (8 fields, 0 exposed)
- [TsuyuAIParameter](#tsuyuaiparameter) (3 fields, 0 exposed)
- [TsuyukusaAIParameter](#tsuyukusaaiparameter) (18 fields, 0 exposed)
- [WasurenagusaMiniAIParameter](#wasurenagusaminiaiparameter) (2 fields, 0 exposed)
- [WaterCarrotTriggerComponent](#watercarrottriggercomponent) (6 fields, 0 exposed)

## ActorSpawnAIParameter

ActorSpawner: spawns actors (usually enemies/bombs) when its overlap condition is met. Whole struct except FirstSpawnWaitTime is per-instance.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FirstSpawnWaitTime` | Float | BP | N | Delay (s) before the first spawn after the spawner activates. | 5 |
| `OverlapCond` | OverlapConditions | BP+SL | S | Which actors must be inside OverlapArea to trigger spawning (OverlapConditions). |  |
| `OverlapArea` | CakeSSphereSearchArea | BP+SL | S | Trigger volume that activates the spawner. |  |
| `DropSpawnMiniInfo` | DropSpawnMiniInfo | BP+SL | S | What to spawn (class, custom param, game-mode permission, optional territory). |  |
| `MotionName` | Name | SL | S | Animation the spawned actor starts in (e.g. "FallStart" = drops from the sky; Dandori's fallStart flag). | "FallStart" |
| `SpawnLocation` | Vector | BP+SL | S | Local offset where actors appear. |  |
| `bSpawnAngRand` | Bool | BP | S | Randomise the spawn yaw. | true |
| `SpawnAng` | Float | BP | S | Spawn yaw (or random range when bSpawnAngRand). | 45 |
| `SpawnVel` | Vector2D | BP | S | Initial XY/Z launch velocity of spawned actors. |  |
| `bInfiniteSpawn` | Bool | BP+SL | S | Keep spawning forever (respawn when killed) instead of a limited count. | true |
| `SpawnInterval` | Float | BP+SL | N | Seconds between spawns (compared against the spawn timer in 0x00ED4410). | 2, 2.2, 3 |
| `MaxAreaNum` | Int | SL | S | Maximum spawned actors alive at once. | 5, 6, 1 |
| `MaxSpawnNum` | Int | SL | S | Total spawn limit (Dandori "spawnLimit"). | 3 |
| `bRandomRotation` | Bool | SL | S | Randomise the spawned actor's rotation. | true |
| `bNoDropItem` | Bool | SL | S | Spawned actors drop nothing when killed. | true |
| `InvasionStartTimeRatio` | Float | SL | N | Night-mode: fraction of the night timer after which spawning starts (compared in 0x025F7B50). | 0.11, 0.41, 0.29 |

## AIAttackParameter

Eat attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EatRange` | Float | BP | N | Range of the bite/eat attack. | 15, 28, 20 |
| `bEatFlickSticker` | Bool | BP | N | When eating, also shake off Pikmin latched on the body. | true |
| `bEatFlickNonSticker` | Bool | BP | N | When eating, also blow away nearby Pikmin not latched on. | true |
| `FlickArg` | FlickArg | BP+SL | N | Flick used by the eat attack, see FlickArg. |  |
| `EatableTarget` | TargetFilter | BP | N | Which target types can be eaten, see TargetFilter. |  |

## AICarryParameter

Carcass carrying

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ArriveDistance` | Float | BP | N | Distance at which carriers consider the destination reached. | 30, 40, 60 |
| `ArriveDistanceToPod` | Float | BP | N | Arrival distance when the destination is the pod/Onion. | 100, 70, 90 |
| `AngAccelRatio` | Float | BP | N | Turning acceleration while carried. | 0.20000000298023224, 0.30000001192092896, 0.25 |
| `bIgnoreTurn` | Bool | BP | N | Carried body does not rotate toward the travel direction. | false |
| `PIDControlParam` | PIDControlParameter | BP | N | PID controller for carried movement, see PIDControlParameter. |  |

## AIFlickParameter

Wrapper

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FlickArg` | FlickArg | BP+SL | N | The shake-off definition, see FlickArg. |  |

## AirWallAIComponent

Invisible walls that disappear when a target leaves

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bUseFlick` | Bool | BP | N | Flick things out of the wall area. | true |
| `SearchCID` | Name | SL | S | CID to look for (e.g. STRING, PULLNEKKO, CRACKPOT); wall stays while it exists nearby. | "STRING", "PULLNEKKO", "CRACKPOT" |
| `SearchRadius` | Float | SL | S | Radius for SearchCID. | 200, 150, 199.7549 |
| `SearchTagList` | Name | SL | S | Tags to search for. |  |
| `bCheckAtAnd` | Bool | SL | S | Require all tags instead of any. | false |

## AIWanderParameter

Idle wandering

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CheckWaitToWanderIntervalSec` | Float | BP | T | How often (seconds) the idle state rolls whether to start wandering (per-instance for MarAI). | 1.7999999523162842, 1, 1.5 |
| `RatioWaitToWander` | Float | BP+SL | T | Probability of switching from waiting to wandering at each check. | 0 |
| `HalfHeight` | Float | BP+SL | N | Vertical tolerance for wander destinations. | 30 |
| `MinDistRate` | Float | BP+SL | T | Minimum wander distance as a fraction of territory radius. | 0.05, 0, 0.47619 |
| `MaxDistRate` | Float | BP+SL | T | Maximum wander distance as a fraction of territory radius. | 0.1, 0, 0.35 |
| `MinDistRateFromActor` | Float | BP | N | Minimum distance of the next wander point from the current position (fraction of territory). | 0.03999999910593033, 0.06666699796915054, 0.10000000149011612 |
| `DemoWanderRangeLimitParam` | AIWanderRangeLimitParam | — | N | Range limits used while wandering in cutscenes/Piklopedia, see AIWanderRangeLimitParam. |  |

## AmeBozuAIParameter

AmeBozu = Waddlequaff? (tire/roller boss: "Ame-bozu"); the rolling tire-wheeled boss that hides and ambushes. Per-instance: bAppearSearch, SearchTagName, HideTimeMin/Max, bAppearFixedLocation, AppearSearchRadius, WalkType, CanAttackLevelFaceMessageName

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `InPullNekkoArea` | Float | BP | N | Radius around a pull-root (Nekko) point considered "in the pull area". No native reader found. | 200 |
| `PullNekkoOffset` | Vector | BP | N | Offset of the pull-root attachment point. |  |
| `RunMinTime` | Float | BP | N | Minimum time spent running (scaled by speed factor in vfunc_164). | 3 |
| `FreezeTime` | Float | — | N | Time frozen by Ice Pikmin. |  |
| `BendFreezeTime` | Float | BP | N | Freeze time while in the "bend"/crouched state. | 6 |
| `ThunderTime` | Float | — | N | Stun time from electricity. |  |
| `BendThunderTime` | Float | BP | N | Electric stun time while bent. | 6 |
| `CanAttackLevelNames` | Name | BP+SL | S | Levels in which this boss is allowed to attack (list of level names). |  |
| `CanAttackLevelFaceMessageName` | Name | SL | S | Captain face message shown in those levels (e.g. Teki_Announce_AmeBozu_Cave016_00). Per-instance. | "Teki_Announce_AmeBozu_Cave016_00" |
| `EscapeHintMessageTime` | Float | BP | N | Seconds before the "how to escape" hint message appears. | 180 |
| `EscapeHintMessageKillNum` | Int | — | N | Pikmin kills before the escape hint appears. |  |
| `OnHitFlickHintCount` | Int | BP | N | Hits counted before the flick hint message (incremented per hit, vfunc_138). | 10 |
| `SpawnTireParameterForward` | SpawnTireParameter | BP | N | Front tire attachment/actor (SpawnTireParameter). |  |
| `SpawnTireParameterBack` | SpawnTireParameter | BP | N | Rear tire attachment/actor. |  |
| `bAppearSearch` | Bool | SL | S | Search for targets while appearing. Per-instance. | true |
| `HideTimeMin` | Float | SL | S | Minimum time hidden before reappearing. Per-instance. | 300, 3.5, 3 |
| `HideTimeMax` | Float | SL | S | Maximum hidden time. Per-instance. | 300, 3.5, 3 |
| `EasyModeHideTimeMin` | Float | — | N | HideTimeMin used on easy difficulty. No native reader found. |  |
| `EasyModeHideTimeMax` | Float | — | N | HideTimeMax used on easy difficulty. No native reader found. |  |
| `bAppearFixedLocation` | Bool | SL | S | Always reappear at the fixed search-tag point rather than near the player. Per-instance. | true |
| `AppearSearchRadius` | Float | BP | S | Radius searched for targets when appearing (Dandori's "searchDistance?"). Per-instance. | 300 |
| `BendTimeMin` | Float | BP | N | Minimum time in the bend state. | 4 |
| `BendTimeMax` | Float | BP | N | Maximum time in the bend state. | 5 |
| `EscapeTimeMax` | Float | BP | N | Maximum escape duration. | 6 |
| `EscapeFlickArg` | FlickArg | BP | N | Flick used when escaping. |  |
| `AppearFlickArg` | FlickArg | BP | N | Flick used when appearing. |  |
| `ReturnDownFlickArg` | FlickArg | BP | N | Flick when returning from being knocked down. |  |
| `TiredTimeMin` | Float | BP | N | Minimum tired time. | 5 |
| `TiredTimeMax` | Float | — | N | Maximum tired time. |  |
| `WalkDistance` | Float | — | N | Distance walked per walk cycle. |  |
| `RollerSpeed` | Float | BP | N | Rolling speed. | 120 |
| `ThroughSpeed` | Float | BP | N | Speed while charging through. | 100 |
| `WalkSpeed` | Float | — | N | Walk speed. |  |
| `EscapeSpeed` | Float | BP | N | Speed when escaping. | 280 |
| `EscapeSpeedAccelRatio` | Float | BP | N | Acceleration toward EscapeSpeed. | 0.44999998807907104 |
| `BrokenTireMaxAngVelTime` | Float | — | N | Turning speed limit when a tire is broken. |  |
| `SlowAngleDistance` | Float | BP | N | Heading error below which it slows turning. | 25 |
| `SlowAnglePrevDiff` | Float | — | N | Previous heading difference used for slow turning. |  |
| `bTestRideSlowSpeedZero` | Bool | — | N | Debug: zero speed when ridden. No native reader found. |  |
| `CapsuleBoundRadius` | Float | BP | N | Radius of the capsule collision bound. | 30 |
| `CapsuleBoundHalfDist` | Float | — | N | Half-length of the capsule bound. |  |
| `CapsuleBoundOffsetZ` | Float | — | N | Vertical offset of the capsule bound. |  |
| `FixedCapsuleBoundOffset` | Vector | BP | N | Fixed offset of the capsule bound. |  |
| `SearchPikminAfterMoveDist` | Float | BP | N | After moving this far, search for Pikmin again. | 250 |
| `ThroughDistance` | Float | — | N | Distance of a charge-through. |  |
| `RopeThroughDistance` | Float | — | N | Charge-through distance on ropes. |  |
| `SearchDistance` | Float | BP+SL | N | Target search distance. | 500 |
| `EscapeDistance` | Float | BP | N | Distance it tries to put between itself and threats. | 300 |
| `FlyTime` | Float | BP | N | Airborne time of jumps. | 0.25 |
| `FlyAddLocation` | Vector | BP | N | Location offset added during jumps. |  |
| `FlyGravity` | Vector | — | N | Gravity used when airborne. |  |
| `NormalMass` | Float | — | N | Physics mass normally. |  |
| `MoveMass` | Float | — | N | Physics mass while moving. |  |
| `WalkType` | EAmeBozuWalkType | — | S | EAmeBozuWalkType walking pattern (Dandori's "random 1" byte). Per-instance. |  |
| `SearchTagName` | Name | SL | S | Tag of the route/root points it uses (e.g. AmeBozuRootPoint000). Per-instance. | "AmeBozuRootPoint001", "AmeBozuRootPoint000" |
| `MoveEftCustomRequestParam` | EftCustomRequestParam | BP | N | Effect played while moving. |  |
| `WalkEftCustomRequestParam` | EftCustomRequestParam | BP | N | Effect played while walking. |  |
| `RunEftCustomRequestParam` | EftCustomRequestParam | BP | N | Effect played while running. |  |
| `TireRollSpeed` | Float | — | N | Tire animation roll speed. |  |
| `TurnSpeedUpRate` | Float | BP | N | Turn speed increase rate. | 0.10000000149011612 |
| `FlickAfterKeepBendStartLastTime` | Float | — | N | Timestamp tracking for FlickAfterKeepBendTime. |  |
| `FlickAfterKeepBendTime` | Float | BP | N | Stay bent this long after a flick. | 2 |
| `AdjustAfterNoFlickTime` | Float | — | N | Time without flicks before readjusting. |  |
| `WalkWaterContextRadius` | Float | BP | N | Radius of the water-context check while walking. | 60 |
| `WalkWaterContextOffset` | Vector | BP | N | Offset of that check. |  |

## AmemboAIBulletParameter

Amembo projectile

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GenericActorPoolType` | EGenericActorPoolType | BP | N | Actor pool for the bullet (e.g. DoromboMud). | "EGenericActorPoolType::DoromboMud" |
| `BulletActor` | Class | BP | N | Bullet class. |  |
| `Altitude` | Float | BP | N | Arc apex height. | 18 |
| `DistanceMin` | Float | — | N | Minimum shot distance. |  |
| `AltitudeMin` | Float | — | N | Minimum apex height. |  |
| `CorrectImpactZ` | Float | — | N | Impact height correction. |  |
| `CustomGravityRate` | Float | BP | N | Gravity scale for the bullet. | 0.8500000238418579 |
| `LimitAngle` | Float | — | N | Maximum firing angle. |  |

## AmemboAIParameter

Amembo = water strider enemies (Dorombo mud-spitter variant etc.)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AIType` | EAmemboAIType | BP | N | EAmemboAIType variant (e.g. Dorombo); branches behaviour (vfunc_138). | "EAmemboAIType::Dorombo" |
| `BulletParam` | AmemboAIBulletParameter | BP | N | Projectile settings (AmemboAIBulletParameter). |  |
| `UntagetableDiffHeight` | Float | BP | N | Targets more than this height difference away are ignored (0x00EE6FB0). | 40 |
| `TurnToTargetRate` | Float | BP | N | Probability of turning to face a target. | 1 |
| `AttackRate` | Float | BP | N | Probability of attacking when possible. | 0.8999999761581421 |
| `CantMoveWaitRate` | Float | BP | N | Probability of waiting when it can't move. | 0.30000001192092896 |
| `RandomTurnRate` | Float | BP | N | Probability of a random turn. | 0.10000000149011612 |
| `RandomWaitRate` | Float | BP | N | Probability of a random wait. | 0.10000000149011612 |
| `RandomTurnAngMin` | Float | BP | N | Minimum random turn angle. | 50 |
| `RandomTurnAngMax` | Float | BP | N | Maximum random turn angle. | 90 |
| `RandomMoveAng` | Float | — | N | Random movement angle spread. |  |
| `TurnToTargetMaxAng` | Float | BP | N | Max angle turned toward a target. | 140 |
| `TurnToTargetCountMax` | Int | — | N | Max consecutive turns toward the target. |  |
| `MoveTime` | Float | — | N | Duration of a move. |  |
| `MoveDistanceMin` | Float | — | N | Minimum move distance. |  |
| `MoveDistanceMax` | Float | — | N | Maximum move distance. |  |
| `MoveTurnTime` | Float | — | N | Turn time while moving. |  |
| `MoveTurnRate` | Float | — | N | Turn rate while moving. |  |
| `TurnTime` | Float | — | N | Turn duration. |  |
| `TurnRate` | Float | — | N | Turn rate. |  |
| `SearchEnemyRadius` | Float | BP | S | Target search radius. Per-instance. | 300 |
| `EscapeNumMax` | Int | — | N | Maximum consecutive escapes. |  |
| `EscapeRadius` | Float | — | S | Threat radius that triggers escaping. Per-instance. |  |
| `EscapeMoveTime` | Float | — | N | Duration of an escape move. |  |
| `DrinkableRadius` | Float | BP | S | Radius in which it can drink (water surface). Per-instance. | 200 |
| `DrinkRate` | Float | — | N | Probability of drinking. |  |
| `AtkTurnMaxAngVelTime` | Float | BP | N | Turn speed limit during attack. | 0.4000000059604645 |
| `AtkTurnAngAccelRatio` | Float | BP | N | Turn acceleration during attack. | 0.800000011920929 |
| `DieStateCustomGravityZ` | Float | — | N | Gravity when dying. |  |
| `CarcassWaterBoxFollowContextRadius` | Float | — | N | Radius for following water after death. |  |
| `CarcassWaterBoxFollowContextOffset` | Vector | BP | N | Offset for that. |  |

## AngBound2

Angle bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AngDeg` | Float | BP | N | Angle. | 210, 140 |

## AngleSpeedParameter

Turning

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bUse` | Bool | BP | N | Use. | true |
| `MaxAngVelTime` | Float | BP | N | Turn speed. | 2.5 |
| `AngAccelRatio` | Float | — | N | Turn accel. |  |

## AppealToHappyParam

Oatchi disguise detection

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DetectMimicrySearchRadius` | Float | BP | N | Radius in which Oatchi sniffs out a disguised enemy. | 170, 80, 150 |
| `DetectMimicryBowCount` | Int | BP | N | Number of bows/barks Oatchi does when detecting it. | 4, 2 |
| `MisleadRadius` | Float | — | N | Radius in which the disguise misleads. |  |

## ArikuiAIParameter

Arikui = anteater-like enemy (Arikui = Anteater; P4 "Bearded Amprat"? no – ChappyBase-derived). Foot stomp/eat.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FootBoundRangeXY` | Float | BP | N | Horizontal range of the foot stomp bound (0x00F6B180). | 60 |
| `FootBoundRangeZ` | Float | — | N | Vertical range of the foot bound. |  |
| `FootBoundOffset` | Vector | BP | N | Offset of the foot bound. |  |
| `EatRangeAtFoot` | Float | BP | N | Eat range for Pikmin at its feet. | 40 |
| `EatOffsetAtFoot` | Vector | BP | N | Offset for eating at feet. |  |
| `ScratchRatio` | Float | BP | N | Probability of a scratch attack. | 0.44999998807907104 |
| `ScratchLimitedNum` | Int | BP | N | Max scratch attacks in a row. | 2 |
| `LookAroundUnderLimitedNum` | Int | BP | N | Max look-under attempts. | 4 |
| `LookAroundUnderLoopTimeMin` | Float | BP | N | Min look-under loop time. | 4 |
| `LookAroundUnderLoopTimeMax` | Float | BP | N | Max look-under loop time. | 6 |
| `bNoStopTurnInWandar` | Bool | BP | N | Turn without stopping while wandering. | true |
| `bNoStopTurnInChase` | Bool | — | N | Turn without stopping while chasing. |  |
| `AttackUnderCoolTime` | Float | — | N | Cooldown for the under-attack. |  |
| `ReverseTurnTime` | Float | — | N | Duration of the reverse turn. |  |
| `ReverseTurnEndTime` | Float | BP | N | End time of reverse turn with a target. | 6 |
| `ReverseTurnEndTimeNoTarget` | Float | BP | N | End time of reverse turn without a target. | 2 |

## AttackEventParameter

Damage event

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Damage` | Float | BP | N | Damage. | 15, 0 |
| `EventType` | EAttackEventType | BP | N | EAttackEventType (Fire, Denki, Water...). | "EAttackEventType::Fire", "EAttackEventType::Denki", "EAttackEventType::Freeze" |

## AttributeChappyAIParameter

Elemental Bulborbs (fire/ice) base

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttributeEffect` | ParticleSystem | BP | N | Elemental aura effect. |  |
| `AttributeEndEffect` | ParticleSystem | BP | N | Effect when the aura ends. |  |
| `TimeToFlick` | Float | — | N | Time before the element flicks latched Pikmin. |  |
| `AttributeFlickWaitTime` | Float | — | N | Wait between elemental flicks. |  |
| `GoHomeMaxAngVelTime` | Float | BP | N | Turn speed when going home. | 5 |
| `RideActorDamageRadius` | Float | BP | N | Radius damaging things riding on it. | 25 |

## AwadakoAIParameter

Awadako = bubble-blowing octopus/jellyfish? (Bubble attacks; head and mouth bubbles)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackArea` | CakeSSphereSearchArea | BP | N | Area in which it attacks. |  |
| `WakeUpArea` | CakeSSphereSearchArea | BP | N | Area that wakes it. |  |
| `SearchInWanderArea` | CakeSSphereSearchArea | BP | N | Search area while wandering. |  |
| `ChargeSecMin` | Float | BP | N | Minimum charge time. | 2 |
| `ChargeSecMax` | Float | — | N | Maximum charge time. |  |
| `HomeRadiusRatio` | Float | — | N | Home radius as a fraction of territory. |  |
| `SleepRadiusRatio` | Float | — | N | Sleep radius fraction. |  |
| `WaitNoticeRate` | Float | — | N | Probability of noticing while waiting. |  |
| `MinWalkSec` | Float | BP | N | Minimum walk time. | 4 |
| `BubbleActor` | Class | BP | N | Bubble projectile class. |  |
| `AttackHeadRate` | Float | — | N | Probability of head bubble attack. |  |
| `AttackHeadAngle` | Float | — | N | Head attack spread. |  |
| `AttackHeadAngleMin` | Float | — | N | Min head attack angle. |  |
| `AttackHeadVelMin` | Float | BP | N | Min head bubble speed. | 2 |
| `AttackHeadVelMax` | Float | BP | N | Max head bubble speed. | 4 |
| `AttackHeadShift` | Float | BP | N | Head bubble offset. | 1 |
| `AttackHeadBubbleMax` | Int | BP | N | Max head bubbles. | 30 |
| `AttackMouthRate` | Float | — | N | Probability of mouth bubble attack. |  |
| `AttackMouthAngleY` | Float | BP | N | Mouth attack yaw spread. | 20 |
| `AttackMouthAngleZ` | Float | BP | N | Mouth attack pitch spread. | 20 |
| `AttackMouthVelMin` | Float | BP | N | Min mouth bubble speed. | 2 |
| `AttackMouthVelMax` | Float | BP | N | Max mouth bubble speed. | 6 |
| `AttackMouthShift` | Float | BP | N | Mouth bubble offset. | 18 |
| `AttackMouthBubbleMax` | Int | BP | N | Max mouth bubbles. | 20 |
| `bStickPikmininBubble` | Bool | BP | N | Bubbles trap Pikmin. | true |
| `FrmStickPikminNum` | Int | — | N | Pikmin trapped per bubble. |  |
| `AttackStickPikminMax` | Int | BP | N | Max Pikmin trapped per attack. | 15 |

## BabyAIParameter

Baby = Bulborb larva/baby (spawned by Queen/Empress)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bPatrolType` | Bool | SL | S | Uses patrol behaviour. | true |
| `SearchTagName` | Name | — | S | Tag of patrol/hide points. Per-instance. |  |

## BabyCrowAIParameter

Baby crow (Snake-crow chick)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookAroundRate` | Float | — | N | Probability of looking around. |  |
| `MoveSpeedCurve` | CurveFloat | BP | N | Move speed curve. |  |
| `MoveAngleCurve` | CurveFloat | BP | N | Move angle curve. |  |
| `TurnAngleCurve` | CurveFloat | BP | N | Turn angle curve. |  |

## BankAIParameter

Bank / dial vault (combination treasure safe)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SerialNum` | Byte | SL | N | Serial number of this bank (links to its bank cards). Per-instance. | 1 |
| `DialNum` | Byte | — | N | Current dial values. |  |
| `DialCorrectNum` | Byte | BP+SL | S | Correct dial combination. |  |
| `RotateDegrees` | Float | — | N | Degrees per dial step. |  |
| `bOpened` | Bool | SL | S | Already opened (state). | true |

## BaseEffectParameter

Effect request

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Request` | EftCustomRequest | BP | N | Effect request. |  |
| `OverrideSetting` | OverrideSetting | — | N | Overrides. |  |

## BaumkuchenBound2

Ring-sector bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MinRadius2D` | Float | BP | N | Inner radius. | 200 |
| `SqMinRadius2D` | Float | — | N | Cached squared inner radius. |  |
| `MaxRadius2D` | Float | BP | N | Outer radius. | 1000 |
| `SqMaxRadius2D` | Float | — | N | Cached squared outer radius. |  |
| `HalfHeight` | Float | BP | N | Half height. | 300 |
| `AngDeg` | Float | BP+SL | S | Sector angle (per-instance for Demejako burrows). | 220, 360 |

## BaumkuchenSearchArea

Ring-shaped search volume

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MinRadius` | Float | BP | N | Inner radius; targets closer than this are ignored. | 100, 50, 200 |

## BigChappyAIParameter

BigChappy (large Bulborb that hides in boxes). Per-instance: bHideEnter, HideOffset

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HideLookAroundRate` | Float | BP | N | Probability of peeking while hidden. | 0.699999988079071 |
| `BlinkPlayRate` | Float | — | N | Blink animation rate. |  |
| `BlinkJudgeTime` | Float | — | N | Blink check interval. |  |
| `AttackNum` | Int | BP | N | Number of attacks in a combo. | 2, 1, 3 |
| `OnceEatLimitNum` | Int | — | N | Max Pikmin eaten per bite. |  |
| `AttackChargeTime` | Float | BP | N | Charge time before biting. | 1 |
| `ChargeFlickArg` | FlickArg | BP | N | Flick during charge. |  |
| `TiredTime` | Float | BP | N | Tired duration after attacking. | 1.7999999523162842 |
| `DownBombTime` | Float | BP | N | Knock-down time from a bomb. | 3 |
| `NonStickersFlickArgAttack` | FlickArg | BP | N | Flick for non-latched Pikmin during attack. |  |
| `UnderStickersFlickArgAttack` | FlickArg | BP | N | Flick for latched Pikmin during attack. |  |
| `FlickArgForPlayer` | FlickArg | BP | N | Flick applied to captains. |  |
| `UnderStickersOffsetZ` | Float | BP | N | Height below which latched Pikmin count as "under". | 20 |
| `AttackMoveLength` | Float | BP | N | Lunge distance. | 220 |
| `AttackCoolTime` | Float | BP | N | Attack cooldown. | 1.2000000476837158 |
| `AttackMaxTurnDegrees` | Float | BP | N | Max turn during attack. | 10 |
| `bHideEnter` | Bool | BP+SL | S | Starts hidden inside its box. Per-instance. | false |
| `HideLookAroundTime` | Float | SL | S | Look-around time while hidden. | 3 |
| `HideLookAroundRandomTime` | Float | — | N | Random extra look-around time. |  |
| `HiddenBoxSearchRadius` | Float | — | N | Radius for finding its hiding box. |  |
| `SearchAreaGoToHiddenBox` | CakeSSphereSearchArea | BP | N | Search area used when returning to the box. |  |
| `HideOffset` | Vector | SL | S | Offset to the hiding spot. Per-instance. |  |
| `SearchAreaHideAttack` | CakeSSphereSearchArea | BP | N | Area in which it ambushes from hiding. |  |
| `DieMaxDepenetrationVelocity` | Float | — | N | Physics depenetration limit on death. |  |

## BigFrogAIParameter

BigFrog = Masked Mawdad? (large Wollywog variant; jumps harder as it loses health)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `JumpCounts` | BigFrogJumpCountParameter | BP | N | Number of consecutive jumps per attack, selected by current life ratio (BigFrogJumpCountParameter list). |  |
| `AddTerritoryRadius` | Float | — | N | Extra territory radius for the big variant. |  |
| `JumpTurnMaxAngVelTime` | Float | — | N | Turn speed limit while turning to jump. |  |
| `TurnRatioCurve` | CurveFloat | BP | N | Curve controlling turn ratio. |  |

## BigFrogJumpCountParameter

Life-ratio -> jump count

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRatio` | Float | BP | N | Applies while current life / max life is at or below this value. | 0.4000000059604645, 0.800000011920929, 1 |
| `Count` | Int | BP | N | Number of jumps in a row. | 3, 2, 1 |

## BigKingChappyAIParameter

BigKingChappy = the giant Emperor Bulblax-type boss (Big King Chappy). Per-instance: BigJumpParameter.bSinkFloor, bWithFallRock, FallRockParameter.bSinkFloor (+ KingChappyBase ones)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BigJumpParameter` | KingChappyBaseBigJumpParameter | BP+SL | S | Big jump (body slam) attack, see KingChappyBaseBigJumpParameter. |  |
| `BigJumpWarnFaceMessageParameter` | BigKingChappyBigJumpWarnFaceMessageParameter | BP | N | Captain warning face message before the big jump. |  |
| `NightVitality` | Float | — | N | Health used during night expeditions. |  |

## BigKingChappyBigJumpWarnFaceMessageParameter

Warning message

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bCheckDistance` | Bool | BP | N | Only show when the captain is within RequestDistance. | true |
| `RequestDistance` | Float | BP | N | Distance for the warning message. | 800 |

## BigUjinkoAIParameter

BigUjinko = large Ujinko (big grub/beetle-like). Per-instance: bPatrolType, SearchTagName (+ UjinkoBase bNoBurrowType, SearchAreaCaution)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bPatrolType` | Bool | SL | S | Patrols between tagged points instead of wandering. Per-instance. | true |
| `PatrolTimeMin` | Float | — | N | Min time per patrol leg. |  |
| `PatrolTimeMax` | Float | — | N | Max time per patrol leg. |  |
| `SearchTagName` | Name | — | S | Tag of the patrol points. Per-instance. |  |
| `PressRangeXY` | Float | BP | N | Horizontal range of its press/body-slam. | 28 |
| `PressRangeZ` | Float | BP | N | Vertical range of the press. | 15 |
| `PressOffset` | Vector | BP | N | Offset of the press area. |  |
| `PressJumpHeight` | Float | BP | N | Hop height when pressing. | 30 |
| `PressJumpForwardDist` | Float | BP | N | Forward distance of the press hop. | 45 |
| `PressGravity` | Float | BP | N | Gravity during the hop. | 2000 |
| `GiveupChaseBound` | SphereBound2 | BP | N | Give up chasing when the target leaves this sphere. |  |

## BikkuriGikuAIParameter

BikkuriGiku = Startle Spore/mimic flower that ambushes (Bikkuri = surprise, Giku = chrysanthemum). Per-instance: bFixedArtillery, MimicrySearchRangeForFixedArtillery, SearchAreaForFixedArtillery, MimicrySearchRange, MimicrySearchOffset

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bFixedArtillery` | Bool | SL | S | Stationary "artillery" variant that never moves. Per-instance. | true |
| `FixedArtilleryForceAtkAng` | Float | — | N | Angle at which the fixed variant is forced to attack. |  |
| `MimicrySearchRangeForFixedArtillery` | Float | BP+SL | S | Mimicry detection range for the fixed variant. | 150 |
| `SearchAreaForFixedArtillery` | CakeSSphereSearchArea | BP+SL | S | Attack search area for the fixed variant. |  |
| `MimicrySearchRange` | Float | BP | S | Range in which it notices targets while disguised. Per-instance. | 120 |
| `AppealToHappyParam` | AppealToHappyParam | BP | N | How Oatchi can detect the disguise (see AppealToHappyParam). |  |
| `MimicrySearchOffset` | Vector | BP | S | Offset of the mimicry search. Per-instance. |  |
| `SurpriseAttackRotRate` | Float | — | N | Rotation rate of the surprise attack. |  |
| `WatchBlendSpeed` | Float | — | N | Blend speed of the watching head. |  |
| `SurpriseAttackSocketName` | Str | — | N | Socket for the surprise attack. |  |
| `SurpriseAttackRadius` | Float | BP | N | Radius of the surprise attack. | 70 |
| `SurpriseAttackFlickParam` | FlickArg | BP | N | Flick of the surprise attack. |  |
| `EatFlickParam` | FlickArg | BP | N | Flick when eating. |  |
| `NoticeTime` | Float | — | N | Time to notice a target. |  |
| `BlinkInterval` | CarrotRangeF | — | N | Random blink interval range. |  |
| `WalkSpeed` | Float | BP | N | Walk speed. | 50 |
| `RunSpeed` | Float | BP | N | Run speed. | 72 |
| `bEnableMimicryWatch` | Bool | BP | N | Disguised flower head turns to watch targets. | true |
| `bUpdateTerritoryPos` | Bool | — | N | Move the territory with the enemy. |  |
| `InitPostureArriveAng` | Float | — | N | Angle tolerance returning to its initial pose. |  |
| `StopTurnToAttackTime` | Float | — | N | Stop turning this long before attacking. |  |
| `DamageAreaParam` | BikkuriGikuDamageAreaParameter | BP | N | Poison/damage area spawned (BikkuriGikuDamageAreaParameter). |  |
| `TonguePoisonRadius` | Float | — | N | Radius of the poison tongue. |  |

## BikkuriGikuDamageAreaParameter

Poison areas

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DamageAreaActor` | Class | BP | N | Damage-area actor class. |  |
| `DamageAreaOfs` | Vector | — | N | Spawn offset. |  |
| `AtkDamageArea` | DamageAreaOverrideParameter | BP | N | Area spawned by its attack. |  |
| `DownDamageArea` | DamageAreaOverrideParameter | BP | N | Area spawned when knocked down. |  |

## BillyAIParameter

Billy = Anode Beetle/"Waddlepus"? – electric enemy (Denki on/off). Billy = electric rolling beetle (e.g. Anode Dweevil-like)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bNewAttackTransition` | Bool | BP | N | Use the newer attack state transitions. | true |
| `AnimLoopCntBeforeStretchOrSniff` | Int | — | N | Idle loops before stretching or sniffing. |  |
| `ProbTransitionStretchOrSniff` | Float | — | N | Chance of doing a stretch/sniff. |  |
| `ProbChooseStretch` | Float | — | N | Chance that it's a stretch rather than a sniff. |  |
| `TimerTillDenkiOff` | Float | BP | N | Seconds electricity stays on. | 9 |
| `BanDenkiOnTime` | Float | BP | N | Cooldown before electricity can turn on again. | 2 |
| `SearchAreaFarEat` | CakeSSphereSearchArea | BP | N | Far eat search area. |  |
| `SearchAreaNearEat` | CakeSSphereSearchArea | BP | N | Near eat search area. |  |
| `ContactFlickAtDenkiOn` | BillyContactFlickParameter | BP | N | Flick on contact while electrified. |  |
| `StickerFlickAtDenkiOn` | BillyStickerrFlickParameter | BP | N | Flick of latched Pikmin while electrified. |  |
| `StickerFlickAtRunning` | BillyStickerrFlickParameter | BP | N | Flick of latched Pikmin while running. |  |
| `Generate` | BillyGenerateParameter | BP | N | Generation (electricity charge-up) settings. |  |
| `Charge` | BillyChargeParameter | — | N | Charge attack settings. |  |
| `Ororo` | BillyOroroParameter | — | N | Flustered ("ororo") state settings. |  |
| `RunAway` | BillyRunAwayParameter | — | N | Run-away settings. |  |

## BillyContactFlickParameter

Contact flick

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FrontMul` | Float | BP | N | Multiplier for flicks from the front. | 1 |
| `SpeedXY` | Float | BP | N | Horizontal speed. | 70 |
| `SpeedZ` | Float | — | N | Vertical speed. |  |
| `SpeedZAddMin` | Float | — | N | Min extra vertical speed. |  |
| `SpeedZAddMax` | Float | — | N | Max extra vertical speed. |  |
| `SpeedRandMin` | Float | BP | N | Min random speed multiplier. | 1.25 |
| `SpeedRandMax` | Float | BP | N | Max random speed multiplier. | 1.5 |
| `FlickToRiderSphereRadius` | Float | BP | N | Radius for flicking riders. | 15 |

## BillyGenerateParameter

Billy electricity generation

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AnimLoopCnt` | Int | BP | N | Animation loops spent charging electricity. | 5 |

## BillyStickerrFlickParameter

Latched flick

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpeedXY` | Float | — | N | Horizontal speed. |  |
| `SpeedZ` | Float | BP | N | Vertical speed. | 50 |
| `SpeedRandMin` | Float | BP | N | Min random multiplier. | 3, 2 |
| `SpeedRandMax` | Float | BP | N | Max random multiplier. | 4, 3 |
| `FlickIntervalMin` | Float | BP | N | Min interval between flicks. | 0.3330000042915344 |
| `FlickIntervalMax` | Float | BP | N | Max interval between flicks. | 0.6660000085830688 |

## BlendParam

Blend

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BlendType` | EEaseCurveInterpolation | BP | N | Easing curve. | "EEaseCurveInterpolation::EaseInOut", "EEaseCurveInterpolation::EaseOut" |
| `BlendTime` | Float | BP | N | Time. | 0.1 |

## BokeNamekoAIParameter

BokeNameko = spore-shedding mushroom enemy (Puffstool-like; "boke" = dazed). bCharmType selects the charm-spore variant.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EscapeMaxTime` | Float | BP | N | Max time spent escaping. | 4 |
| `EscapeLength` | Float | — | N | Escape distance. |  |
| `EscapeDamageCount` | Int | — | N | Damage hits that trigger escaping. |  |
| `LeadDamageCount` | Int | — | N | Damage hits before it starts leading charmed Pikmin. |  |
| `LeadWalkDist` | Float | BP | N | Distance walked while leading charmed Pikmin. | 150 |
| `SporeBoundRadiusXY` | Float | BP | N | Horizontal radius of the spore cloud. | 100, 130 |
| `SporeBoundHeightZ` | Float | — | N | Height of the spore cloud. |  |
| `DownTimeMin` | Float | BP | N | Min knocked-down time. | 3.5, 4 |
| `DownTimeMax` | Float | BP | N | Max knocked-down time. | 5 |
| `DownDamageRate` | Float | BP | N | Damage multiplier while knocked down. | 1.5 |
| `bCharmType` | Bool | BP | N | Spores charm (take over) Pikmin instead of just stunning. | false |
| `DangerTargetOffsetMin` | Vector | — | N | Min offset of the danger marker. |  |
| `DangerTargetOffsetMax` | Vector | — | N | Max offset of the danger marker. |  |
| `ReflectionFlickArg` | FlickArg | BP | N | Flick when spores are reflected. |  |
| `CharmEndFlickArg` | FlickArg | BP | N | Flick when the charm ends. |  |
| `bNoStopTurnInWandar` | Bool | — | N | Turn without stopping while wandering. |  |
| `bNoStopTurnInEscape` | Bool | — | N | Turn without stopping while escaping. |  |
| `WanderLimitTime` | Float | BP | N | Max wander time. | 25 |

## BombBaseAIParameter

Common bomb settings

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `IgnitionTime` | Float | — | S | Fuse time (per-instance on SearchBomb). |  |
| `ExplosionRadius` | Float | — | S | Blast radius. |  |
| `ExplosionPower` | Float | — | S | Blast damage. |  |
| `NotifyPutRadius` | Float | — | S | Radius in which AI is warned a bomb was placed. |  |
| `NotifyExplodeRadius` | Float | — | S | Radius in which AI is warned of the explosion. |  |
| `RippleVelocity` | Float | — | N | Water ripple speed. |  |
| `RippleRadiusScale` | Float | — | N | Water ripple radius scale. |  |
| `IgnitionAuraEffect` | ParticleSystem | — | N | Lit-fuse aura effect. |  |
| `IgnitionAuraOnMouthSleepEffect` | ParticleSystem | — | N | Aura effect while inside a sleeping enemy's mouth. |  |
| `IgnitionAuraEftScale` | Vector | — | N | Aura effect scale. |  |
| `IgnitionAuraEftBoneName` | Name | — | N | Aura effect bone. |  |
| `ExplosionEftRequest` | EftRequest | — | N | Explosion effect. |  |
| `RequestRumbleName` | Name | BP | N | Controller rumble preset on explosion. | "Obj_Common_Excavation", "Teki_BossInu_FlyBeam" |
| `ShakeCameraParam` | ShakeCameraParameter | — | N | Camera shake settings. |  |
| `CameraShakeData` | Class | — | N | Camera shake class. |  |

## BoneParameter

Mouth bone override

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Name` | Name | BP | N | Bone name. | "C_j000", "C_j001", "C_j002" |
| `Param` | MouthSettings | BP | N | MouthSettings for the bone. |  |
| `BoneOffset` | Vector | BP | N | Offset. |  |

## BookendAIParameter

Bookend (tipping book-end/slope gimmick)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BookendType` | EBookendType | BP | N | EBookendType (e.g. Slope). | "EBookendType::Slope" |
| `bFallen` | Bool | — | N | Already knocked over. |  |
| `FallDownFlickArg` | FlickArg | BP | N | Flick when it falls over. |  |
| `SearchOffset` | Vector | — | N | Offset of the push-detection box. |  |
| `SearchBoundBoxSize` | Vector | — | N | Size of the push-detection box. |  |

## BossInu2AIParameter

BossInu2 = Ancient Sirehound (final boss, ridden by Louie; absorbs creature "Gensei modes")

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DebugParam` | BossInu2DebugParam | BP | N | Debug switches (BossInu2DebugParam). |  |
| `CommonParam` | BossInu2CommonParam | BP | N | Shared behaviour (BossInu2CommonParam). |  |
| `GenseiModeParam` | BossInu2GenseiModeParam | BP | N | Absorbed-creature mode settings (fire, water, electric, mushroom, dark). |  |
| `ZukanParam` | BossInu2ZukanParam | BP | N | Piklopedia-viewer behaviour. |  |

## BossInu2AttackDist

Life-scaled distance

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackDistParams` | BossInu2AttackDistParameter | BP | N | Entries per life ratio. |  |

## BossInu2AttackDistParameter

Distance per life

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Applies below this life ratio. |  |
| `AttackDist` | Float | BP | N | Distance. | 220, 275, 300 |

## BossInu2AttackNum

Life-scaled counts

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackNumParams` | BossInu2AttackNumParameter | BP | N | Count entries per life ratio. |  |

## BossInu2AttackNumParameter

Count per life

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | BP | N | Applies below this life ratio. | 0.3330000042915344, 0.6660000085830688, 1 |
| `AttackNum` | Int | — | N | Count. |  |
| `EasyModeAttackNum` | Int | — | N | Count on easy. |  |

## BossInu2AttrArmorParam

Elemental armour

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BodyEffect` | ParticleSystem | BP | N | Armour effect. |  |
| `DamageRatio` | Float | — | N | Damage taken multiplier while armoured. |  |
| `BombDamage` | Float | BP | N | Damage from bombs. | 240 |
| `AttrAttackType` | EAttackEventType | BP | N | EAttackEventType that breaks the armour (Freeze, Denki...). | "EAttackEventType::Freeze", "EAttackEventType::Denki" |
| `DamageRideActorNum` | Int | BP | N | Pikmin riding needed to damage it. | 5 |

## BossInu2CommonParam

Shared Sirehound behaviour

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LouieParam` | BossInu2LouieParam | BP | N | Louie rider settings. |  |
| `WanderMoveParam` | BossInu2MoveParam | BP | N | Movement while wandering. |  |
| `WanderParam` | BossInu2WanderParam | BP | N | Wander pattern. |  |
| `GoHomeParam` | BossInu2GoHomeParam | BP | N | Returning home movement. |  |
| `MoveToTerritoryCenterParam` | BossInu2MoveToTerritoryCenterParam | BP | N | Jumping back to the arena centre. |  |
| `CommonJumpTurnParam` | BossInu2CommonJumpTurnParam | — | N | Jump-turn movement. |  |
| `EatParam` | BossInu2EatParam | BP | N | Eat attack. |  |
| `LookAroundParam` | BossInu2LookAroundParam | BP | N | Look-around behaviour. |  |
| `DangleTailParam` | BossInu2DangleParameter | BP | N | Tail-grab ("dangle") mechanics. |  |
| `FlickParam` | BossInu2FlickParam | BP | N | Shake-off settings. |  |
| `DemoParam` | BossInu2DemoParam | BP | N | Cutscene timing. |  |
| `UIParam` | BossInu2UIParam | — | N | Boss HP UI settings. |  |

## BossInu2CurseBallAIParameter

Curse (poison) ball projectile

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PoolType` | EGenericActorPoolType | BP | N | Actor pool (BossInuPoisonBall). | "EGenericActorPoolType::BossInuPoisonBall" |
| `BallEffect` | ParticleSystem | BP | N | Ball effect. |  |
| `ImpactActor` | Class | BP | N | Actor spawned on impact. |  |
| `ImpactActorParam` | DamageAreaOverrideParameter | BP | N | Poison area spawned on impact. |  |
| `ImpactEffect` | ParticleSystem | — | N | Impact effect. |  |
| `HDRumbleKey` | Name | BP | N | Rumble preset. | "Teki_Bossinu_CurseBall" |

## BossInu2CurseBallNum

Curse ball table

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CurseBallNumParams` | BossInu2CurseBallNumParameter | BP | N | Entries per life ratio. |  |

## BossInu2CurseBallNumParameter

Curse ball counts

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Applies below this life ratio. |  |
| `InsideNum` | Int | BP | N | Inner ring count. | 1 |
| `MiddleNum` | Int | BP | N | Middle ring count. | 6, 5, 4 |
| `OutsideNum` | Int | BP | N | Outer ring count. | 6, 4, 3 |
| `EasyModeInsideNum` | Int | — | N | Inner on easy. |  |
| `EasyModeMiddleNum` | Int | — | N | Middle on easy. |  |
| `EasyModeOutsideNum` | Int | — | N | Outer on easy. |  |

## BossInu2CurseBeamAreaAIParameter

Curse beam area

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SignEffectParam` | BossInu2CurseBeamAreaEftParam | — | N | Warning effect. |  |
| `SpurtEffectParam` | BossInu2CurseBeamAreaEftParam | — | N | Beam effect. |  |
| `FireWaitTime` | Float | BP | N | Wait before firing. | 0.75 |
| `FireScaleTime` | Float | BP | N | Scale-up time. | 0.30000001192092896 |
| `DestroyWaitTime` | Float | BP | N | Wait before destroying. | 0.10000000149011612 |
| `BoundParam` | BossInu2CurseBeamAreaBoundParameter | — | N | Beam volume. |  |
| `FlickArg` | FlickArg | — | N | Flick. |  |
| `Damage` | Float | BP | N | Damage. | 60 |
| `KillLimit` | Int | BP | N | Max Pikmin killed. | 20 |
| `RequestRumbleName` | Name | — | N | Rumble preset. |  |
| `RumbleTime` | Float | BP | N | Rumble duration. | 0.75 |
| `ShakeCameraParam` | ShakeCameraParameter | — | N | Camera shake. |  |
| `CameraShakeData` | Class | — | N | Camera shake class. |  |

## BossInu2CurseBeamAreaBoundParameter

Beam volume

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Width` | Float | BP | N | Width. | 40 |
| `Length` | Float | BP | N | Length. | 2291, 2105, 395 |
| `Height` | Float | BP | N | Height. | 125 |
| `Offset` | Vector | — | N | Offset. |  |

## BossInu2CurseBeamAreaEftParam

Beam effect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Effect` | ParticleSystem | — | N | Effect. |  |
| `PosOfs` | Vector | — | N | Position offset. |  |
| `RotOfs` | Rotator | — | N | Rotation offset. |  |
| `Scale` | Vector | BP | N | Scale. | 0.5, 0.75, 1 |

## BossInu2DangleParameter

Tail grab ("dangle"): Pikmin hang on the tail to pull the boss down

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WorkNumOfs` | Vector | — | N | Offset of the "number of Pikmin working" counter UI. |  |
| `DisappearTime` | Float | — | N | Time the tail handle stays available. |  |
| `FlickParam` | BossInu2HandleFlickParameter | — | N | How Pikmin on the tail get flicked. |  |
| `DownDangleNum` | Int | — | N | Pikmin needed on the tail to pull it down. |  |
| `DownParam` | BossInu2DownParam | BP | N | Knock-down settings when pulled down. |  |
| `FaceMessageInterval` | Int | BP | N | Tail pulls between captain hint messages. | 1 |
| `bNoFaceMessageLifeThresholdOnlyDarkMode` | Bool | — | N | Apply the life threshold only in the dark mode. |  |
| `NoFaceMessageLifeThreshold` | Float | BP | N | Below this life no hint messages are shown. | 5000 |

## BossInu2DebugParam

Debug only

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDbgPlayerFullEquip` | Bool | — | N | Debug: give the player full equipment. |  |
| `bDbgZukanAI` | Bool | — | N | Debug: use Piklopedia AI. |  |
| `DbgModeStep` | EBossInu2ModeStep | — | N | Debug: start at this mode step. |  |
| `bUseDbgModeStepLimit` | Bool | — | N | Debug: cap the mode step. |  |
| `DbgModeStepLimit` | EBossInu2ModeStep | — | N | Debug: mode step cap. |  |
| `bDbgDisablePreDemoWait` | Bool | — | N | Debug: skip pre-cutscene wait. |  |
| `bDbgEnableFurColl` | Bool | BP | N | Enable fur collision (default true in the blueprint). | true |

## BossInu2DemoParam

Cutscenes

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaitTimeAtAppearDemoEnd` | Float | BP | N | Wait after the intro cutscene. | 2 |

## BossInu2DownParam

Knock-down

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DownTime` | CarrotRangeF | BP | N | Knock-down time range. |  |
| `EasyModeDownTime` | CarrotRangeF | — | N | Knock-down time on easy. |  |
| `FreezeTime` | Float | BP | N | Freeze duration. | 6 |
| `bEnableCancelByDamage` | Bool | — | N | Taking enough damage ends the stun early. |  |
| `CancelStiffenDamage` | Float | BP | N | Damage that cancels the stun. | 2900, 300 |
| `EasyModeCancelStiffenDamage` | Float | — | N | Same on easy. |  |
| `CancelFrozenDamage` | Float | BP | N | Damage that breaks the freeze. | 2200 |
| `EasyModeCancelFrozenDamage` | Float | — | N | Same on easy. |  |
| `DownFlickParam` | FlickArg | BP | N | Flick when going down. |  |
| `RecovertyFlickParam` | FlickArg | BP | N | Flick when recovering. |  |

## BossInu2EatParam

Eat attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackNum` | Int | — | N | Bites per attack. |  |
| `OnceEatLimitNum` | Int | BP | N | Max Pikmin eaten per bite. | 5 |
| `ChargeTime` | Float | BP | N | Wind-up time. | 1.2000000476837158 |
| `NonStickersFlickArgAttack` | FlickArg | BP | N | Flick for Pikmin not latched on. |  |
| `UnderStickersFlickArgAttack` | FlickArg | BP | N | Flick for latched Pikmin. |  |
| `UnderStickersOffsetZ` | Float | — | N | Height threshold for "under" latched Pikmin. |  |
| `EnemyAttackRadius` | Float | BP | N | Radius for eating other enemies. | 80 |
| `FlickRadius` | Float | BP | N | Flick radius. | 60, 55 |
| `FlickArgAttack` | FlickArg | BP | N | Attack flick. |  |
| `EatableTargetFilter` | TargetFilter | BP | N | What it can eat. |  |
| `WaitTime` | Float | BP | N | Wait after the attack. | 2 |

## BossInu2ElecModeHighSpeedRushParam

High-speed rush

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `RayCheckDist` | Float | — | N | Wall ray length. |  |
| `RayCheckOfs` | Vector | — | N | Ray offset. |  |
| `TerritoryDist` | Float | BP | N | Distance from centre. | 450 |
| `RushDist` | Float | — | N | Rush distance. |  |
| `ArriveDist` | Float | — | N | Arrival distance. |  |
| `RushMoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `RushFlickParam` | FlickArg | BP | N | Flick. |  |
| `TiredTime` | Float | — | N | Tired time afterwards. |  |
| `RushNum` | BossInu2AttackNum | BP | N | Rushes per life ratio. |  |

## BossInu2FallRockNum

Rock count table

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FallRockNumParams` | BossInu2FallRockNumParameter | BP | N | Entries per life ratio. |  |

## BossInu2FallRockNumParameter

Rock count

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Applies below this life ratio. |  |
| `FallNum` | Int | BP | N | Rocks. | 5, 4, 3 |
| `EasyModeFallNum` | Int | — | N | Rocks on easy. |  |

## BossInu2FlickParam

Shake-off

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StickTargetTime` | Float | BP | N | Time Pikmin can stay latched before being shaken off. | 2.5 |

## BossInu2FloatMoveParam

Flying movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `FlyHeight` | Float | BP | N | Hover height. | 230, 200, 225 |
| `bNoStopTurn` | Bool | BP | N | Turn without stopping. | true |
| `bUseFloatMove` | Bool | — | N | Use floating movement. |  |

## BossInu2GenseiModeBikkuriKinokoParam

Poison/dark mode (absorbed Bikkuri Kinoko)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PoisonAreaActor` | Class | BP | N | Poison area class. |  |
| `PoisonBallParam` | BossInu2GenseiModeBikkuriKinokoPoisonBallParam | BP | N | Poison (curse) balls. |  |
| `bDestroyDamageAreaWhenEndMode` | Bool | BP | N | Remove poison areas when the mode ends. | true |
| `bDestroyDamageAreaWhenDown` | Bool | BP | N | Remove poison areas when knocked down. | true |
| `FlyDownStartPosWhenDie` | Float | — | N | Height to start descending on death. |  |
| `FloatMoveParam` | BossInu2FloatMoveParam | BP | N | Flying movement. |  |
| `FallNum` | Int | — | N | Falls needed. |  |
| `TakeOffFlickParam` | FlickArg | BP | N | Flick at take-off. |  |
| `BeamParam` | BossInu2GenseiModeDarkBeamParam | BP | N | Dark beam. |  |
| `EscapeDistance` | Float | — | N | Escape distance. |  |
| `EasyModeEscapeDistance` | Float | — | N | Escape distance on easy. |  |
| `EscapeParam` | BossInu2GenseiModeEscapeParam | BP | N | Escape. |  |
| `EscapeArriveDist` | Float | — | N | Escape arrival distance. |  |
| `DarkEscapeParam` | BossInu2GenseiModeDarkEscapeParam | BP | N | Dark-mode escape. |  |
| `AffordParam` | BossInu2GenseiModeDarkAffordanceParam | BP | N | How Pikmin can grab it in dark mode. |  |
| `FlyVigilantTime` | Float | BP | N | Alert time while flying. | 1.2999999523162842 |
| `PushParam` | BossInu2GenseiModeDarkPushParam | BP | N | Push-away shockwave. |  |
| `FaceMsgParam` | BossInu2DarkModeFaceMsgParam | — | N | Hint messages. |  |
| `CryParam` | BossInu2GenseiModeDarkCryParam | BP | N | Panic-inducing cry. |  |
| `ChangeCameraDistance` | Float | BP | N | Camera distance in this mode. | 400 |

## BossInu2GenseiModeBikkuriKinokoPoisonBallParam

Poison balls

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CurseBallNumParam` | BossInu2CurseBallNum | BP | N | Balls per ring and life ratio. |  |
| `FloatMoveParam` | BossInu2FloatMoveParam | BP | N | Movement. |  |
| `PoisonBallActor` | Class | BP | N | Ball class. |  |
| `Altitude` | Float | — | N | Arc height. |  |
| `CustomGravityRate` | Float | BP | N | Gravity scale. | 0.30000001192092896 |
| `InsideShootLength` | CarrotRangeF | BP | N | Inner ring distance range. |  |
| `ShootLength` | CarrotRangeF | BP | N | Middle ring distance range. |  |
| `OutsideShootLength` | CarrotRangeF | BP | N | Outer ring distance range. |  |
| `ChargeTime` | Float | BP | N | Wind-up. | 0.10000000149011612 |
| `DisableShotAngle` | Float | — | N | Angle where shots are disabled. |  |
| `ShotParam` | BossInu2CurseBallShotParameter | BP | N | Shot origin. |  |

## BossInu2GenseiModeBillyElecPartsParam

Electric parts

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ElecPartsActor` | Class | BP | N | Part class. |  |
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `ScatterParam` | BossInu2ScatterElecPartsParam | BP | N | Count and flick. |  |
| `ScatterObjParam` | BossInu2ScatterObjParam | BP | N | Scatter pattern. |  |
| `ScatterElecPartsWaitTime` | Float | BP | N | Wait after scattering. | 1.5 |
| `ElecPartsFaceMsgChkCount` | Int | — | N | Checks before a hint message. |  |
| `ElecPartsFaceMsgTime` | Float | BP | N | Time before a hint message. | 10.020000457763672 |

## BossInu2GenseiModeBillyParam

Electric mode

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EftParam` | BossInu2GenseiModeBillyEffectParam | BP | N | Discharge effects. |  |
| `ElecPartsParam` | BossInu2GenseiModeBillyElecPartsParam | BP | N | Scattered electric parts. |  |
| `ThunderChaseParam` | BossInu2GenseiModeBillyThunderChaseParam | BP | N | Thunder chase. |  |
| `RushEatParam` | BossInu2RushEatParam | BP | N | Rush-eat. |  |
| `HighSpeedRushParam` | BossInu2ElecModeHighSpeedRushParam | BP | N | High-speed rush. |  |
| `ThunderAtkParam` | BossInu2GenseiModeBillyThunderAtkParam | BP | N | Thunder attack. |  |

## BossInu2GenseiModeBillyThunderAtkParam

Thunder strikes

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `MoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `TerritoryDist` | Float | — | N | Distance from centre. |  |
| `TurnArriveAng` | Float | BP | N | Turn tolerance. | 8 |
| `OmenEffect` | ParticleSystem | BP | N | Warning effect. |  |
| `ThunderEffect` | ParticleSystem | BP | N | Lightning effect. |  |
| `bEnableEftScale` | Bool | — | N | Scale effects. |  |
| `ThunderEftOfsRot` | Float | — | N | Effect rotation offset. |  |
| `AttackNum` | Int | — | N | Strikes. |  |
| `AttackTime` | Float | BP | N | Duration. | 10 |
| `EasyModeAttackTime` | Float | — | N | Duration on easy. |  |
| `AttackRadius` | Float | BP | N | Strike radius. | 125 |
| `AttackMoveSpd` | Float | BP | N | Strike movement speed. | 0 |
| `AttackHalfHeight` | Float | — | N | Strike half height. |  |
| `AttackBaseAng` | Float | — | N | Base angle. |  |
| `AttackRandAng` | CarrotRangeF | BP | N | Random angle range. |  |
| `AttackOfs` | BossInu2AttackDist | BP | N | Distance by life ratio. |  |
| `TiredTime` | Float | BP | N | Tired time. | 1 |
| `AntiActorFlickParam` | FlickArg | BP | N | Flick for other actors. |  |
| `AttackEndFlickParam` | FlickArg | BP | N | Flick at the end. |  |
| `HDRumbleKey` | Name | — | N | Rumble preset. |  |

## BossInu2GenseiModeBillyThunderChaseParam

Electric chase

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `MoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `ChaseTime` | Float | BP | N | Chase duration. | 8 |
| `ChaseMinGuaranteedTime` | Float | — | N | Minimum chase time. |  |
| `ChaseFlickParam` | BossInu2GenseiModeBillyThunderChaseFlickParam | BP | N | Flick spheres attached to bones during the chase. |  |
| `FaceFlickParam` | FlickArg | — | N | Flick from the face. |  |
| `BodyFlickDist` | Float | — | N | Body flick distance. |  |
| `BodyFlickCoolTime` | Float | — | N | Body flick cooldown. |  |
| `ThunderFlickParam` | FlickArg | — | N | Electric flick. |  |
| `HighSpeedRushNum` | Int | BP | N | High-speed rushes after the chase. | 1 |

## BossInu2GenseiModeCommonParam

Per-mode common

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Life` | Float | BP | N | HP of this mode. | 9000, 12000 |
| `FreezeTime` | Float | BP | N | Freeze time in this mode. | 0.3499999940395355 |
| `ModeChangeEffect` | ParticleSystem | BP | N | Effect when switching into the mode. |  |
| `AttrArmor` | BossInu2AttrArmorParam | BP | N | Elemental armour. |  |
| `MaterialAnimParam` | BossInu2MaterialAnimParam | BP | N | Material animations. |  |
| `bAlive` | Bool | — | N | Runtime: mode still alive. |  |

## BossInu2GenseiModeDarkAffordanceParam

Grab affordance

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WorkableHeight` | Float | BP | N | Height Pikmin can reach. | 200 |
| `WorkableHeightForWing` | Float | BP | N | Height Winged Pikmin can reach. | 200 |
| `bUseNidomi` | Bool | BP | N | Use the double-look (nidomi) check. | true |

## BossInu2GenseiModeDarkBeamApproachParam

Approach

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ApproachShotNum` | Int | BP | N | Shots while approaching. | 3 |
| `ApproachDistance` | Float | — | N | Approach distance. |  |
| `StayBound` | ShortcakeBound2 | BP | N | Area to stay in. |  |
| `StayBoundOffset` | Vector | — | N | Offset. |  |

## BossInu2GenseiModeDarkBeamParam

Dark beam

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BeamAreaActor` | Class | BP | N | Beam area class. |  |
| `AttackSearchArea` | BaumkuchenSearchArea | BP | N | Ring-shaped target area. |  |
| `EnableAttackBound` | BaumkuchenBound2 | BP | N | Ring-sector volume where beams are allowed. |  |
| `AttackBoundOffset` | Vector | BP | N | Offset. |  |
| `ImpactDistance` | Float | BP | N | Impact distance. | 100 |
| `BeamFlickArg` | FlickArg | BP | N | Flick. |  |
| `EscapeBound` | CylinderBound2 | BP | N | Area it escapes from. |  |
| `EscapeBoundOffset` | Vector | — | N | Offset. |  |
| `EscapeTime` | Float | BP | N | Escape time. | 0.10000000149011612 |
| `EasyModeBeamWarningTime` | Float | — | N | Warning time on easy. |  |
| `RandTimeParams` | BossInu2GenseiModeDarkBeamRandTimeParam | BP | N | Weighted random delays. |  |
| `ShotNum` | BossInu2AttackNum | BP | N | Beams per life ratio. |  |
| `BeamOffset` | Vector | — | N | Offset. |  |
| `FloatMoveParam` | BossInu2FloatMoveParam | BP | N | Movement. |  |
| `ApproachParam` | BossInu2GenseiModeDarkBeamApproachParam | BP | N | Approach behaviour. |  |

## BossInu2GenseiModeDarkBeamRandTimeParam

Weighted delay

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Probability` | Float | BP | N | Weight. | 20, 30, 50 |
| `Time` | Float | BP | N | Delay. | 0, 1.2000000476837158, 1.5 |

## BossInu2GenseiModeDarkCryParam

Panic cry

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Life ratio for the cry. |  |
| `bEnableReversalCry` | Bool | BP | N | Enable the reversal cry. | true |
| `bEnableCry` | Bool | BP | N | Enable the cry. | true |
| `SearchArea` | CylinderSearchArea | BP | N | Area searched. |  |
| `PanicRadius2D` | Float | — | N | Panic radius. |  |
| `PanicHalfHeight` | Float | — | N | Panic half height. |  |
| `PanicOffset` | Vector | BP | N | Panic offset. |  |
| `RestNum` | Int | BP | N | Cries remaining. | 1 |
| `Probability` | Float | — | N | Chance of crying. |  |
| `PurpleProbability` | Float | BP | N | Chance when Purple Pikmin are present. | 0.75 |

## BossInu2GenseiModeDarkEscapeParam

Dark escape

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EscapeNum` | Int | BP | N | Escapes. | 12 |
| `LimitDistance` | Float | BP | N | Minimum distance. | 50 |
| `LimitAreaDistance` | Float | — | N | Area limit. |  |

## BossInu2GenseiModeDarkPushParam

Push shockwave

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius` | Float | BP | N | Radius. | 150 |
| `Speed` | Float | BP | N | Push speed. | 3000 |

## BossInu2GenseiModeEscapeParam

Escape

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EscapeSearchArea` | CakeSearchArea | BP | N | Threat area. |  |
| `EscapeAngle` | Float | — | N | Escape angle. |  |
| `EscapeLength` | Float | BP | N | Escape distance. | 375 |
| `MoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `StartEscapeFlickParam` | FlickArg | BP | N | Flick on escape start. |  |
| `EscapeFlickMax` | Int | — | N | Max flicks. |  |
| `EscapeFlickRateForSticker` | Float | — | N | Chance to flick latched Pikmin. |  |

## BossInu2GenseiModeFireChappyFireBallParam

Fire balls

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FireBallActor` | Class | BP | N | Fire ball class. |  |
| `ShotParam` | BossInu2AttackNum | BP | N | Shots per life ratio. |  |
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `MoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `CheckRushEatTime` | Float | — | N | Time before checking a rush-eat. |  |
| `BulletOffset` | Vector | BP | N | Spawn offset. |  |
| `BulletVelocity` | Float | — | N | Speed. |  |
| `ShotFlickParam` | FlickArg | — | N | Flick. |  |

## BossInu2GenseiModeFireChappyFireWaveParam

Fire wave

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `MoveParam` | BossInu2MoveParam | — | N | Movement. |  |
| `TerritoryDist` | Float | BP | N | Distance from centre. | 300 |
| `TurnArriveAng` | Float | BP | N | Turn tolerance. | 8 |
| `AttackNum` | Int | — | N | Waves. |  |
| `ChargeTime` | BossInu2AttackTime | BP | N | Wind-up by life ratio. |  |
| `BulletActor` | Class | BP | N | Wave class. |  |
| `BulletOffset` | Vector | — | N | Spawn offset. |  |
| `WaveVelocity` | Float | BP | N | Wave speed. | 130 |
| `ShotFlickParam` | FlickArg | BP | N | Flick. |  |

## BossInu2GenseiModeFireChappyLavaRockParam

Lava rocks

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LavaRockActor` | Class | BP | N | Lava rock class. |  |
| `RippleWaveActor` | Class | BP | N | Ripple wave class. |  |
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `ScatterMax` | Int | — | N | Max rocks. |  |
| `ScatterParam` | BossInu2AttackNum | BP | N | Rocks per life ratio. |  |
| `ScatterObjParam` | BossInu2ScatterObjParam | BP | N | Scatter pattern. |  |
| `FlickParam` | FlickArg | — | N | Flick. |  |

## BossInu2GenseiModeFireChappyParam

Fire mode

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LavaRockParam` | BossInu2GenseiModeFireChappyLavaRockParam | BP | N | Lava rocks. |  |
| `FireBallParam` | BossInu2GenseiModeFireChappyFireBallParam | BP | N | Fire balls. |  |
| `FireWaveParam` | BossInu2GenseiModeFireChappyFireWaveParam | BP | N | Fire waves. |  |
| `RushEatParam` | BossInu2RushEatParam | BP | N | Rush-eat. |  |

## BossInu2GenseiModeNormalModeFaceMessageParam

Hint messages

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RequestMessageNeedNoPiyoriTime` | Float | BP | N | Time without stunning the boss before a hint appears. | 35 |
| `TailDownMessageInterval` | Int | BP | N | Tail knock-downs between messages. | 1 |
| `RequestMessageNeedUselessAttackHitCount` | Int | — | N | Useless hits before a hint. |  |
| `IncrementUselessAttackHitCountCoolTime` | Float | BP | N | Cooldown between counting useless hits. | 0.699999988079071 |
| `bDecrementUselessAttackHitCount` | Bool | — | N | Decay the useless-hit counter over time. |  |
| `DecrementUselessAttackHitCountCoolTime` | Float | — | N | Decay interval. |  |

## BossInu2GenseiModeNormalModeParam

Normal mode

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RushParam` | BossInu2GenseiModeNormalModeRushParam | BP | N | Rush attack. |  |
| `PressParam` | BossInu2GenseiModeNormalModePressParam | BP | N | Jump-press attack. |  |
| `RockFallParam` | BossInu2GenseiModeNormalModeRockFallParam | BP | N | Falling rocks. |  |
| `SmallPressParam` | BossInu2GenseiModeNormalModeSmallPressParam | BP | N | Small press. |  |
| `FaceMessageParam` | BossInu2GenseiModeNormalModeFaceMessageParam | BP | N | Hint messages. |  |

## BossInu2GenseiModeNormalModePressParam

Jump press

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `MaxJampableAngle` | Float | BP | N | Max target angle for jumping. | 65 |
| `DoJampTurnDiffAngle` | Float | BP | N | Angle above which it jump-turns first. | 50 |
| `JumpTurnMoveParam` | BossInu2MoveParam | BP | N | Jump-turn movement. |  |
| `JumpNum` | BossInu2AttackNum | BP | N | Jumps per attack. |  |
| `RockSubNum` | Int | BP | N | Rocks subtracted per jump. | 1 |
| `JumpFlickStickerParam` | FlickArg | — | N | Flick latched Pikmin on jump. |  |
| `JumpMoveParam` | BossInu2MoveParam | BP | N | Jump movement. |  |
| `JumpHeight` | Float | BP | N | Jump height. | 150 |
| `JumpDist2DLimit` | Float | — | N | Max jump distance. |  |
| `JumpGravityRate` | Float | BP | N | Rising gravity. | 2 |
| `MaxJumpGravityAdjustRate` | Float | BP | N | Gravity adjustment limit. | -1.2000000476837158 |
| `FallGravityRate` | Float | BP | N | Falling gravity. | 4 |
| `PressBound` | CylinderBound2 | BP | N | Crush volume. |  |
| `PressBoundAfterDiscoveryDemo` | CylinderBound2 | BP | N | Crush volume after the discovery cutscene. |  |
| `PressOffsetZ` | Float | BP | N | Crush volume height offset. | -75 |
| `ShockWaveBound` | CylinderBound2 | BP | N | Shockwave volume. |  |
| `ShockWaveOffsetZ` | Float | BP | N | Shockwave height offset. | -90 |
| `ShockWaveLaunchSpeed` | Float | BP | N | Shockwave launch speed. | 300 |
| `ShockWaveFlickParam` | FlickArg | BP | N | Shockwave flick. |  |
| `WaitTime` | Float | BP | N | Wait after landing. | 0 |
| `HitRockCameraShakeParam` | ShakeCameraParameter | BP | N | Camera shake when hitting rock. |  |
| `HitRockCameraShakeData` | Class | BP | N | Camera shake class. |  |
| `HitRockHDRumbleKey` | Name | BP | N | HD rumble preset. | "Teki_Common_Press_XL" |

## BossInu2GenseiModeNormalModeRockFallParam

Rock fall

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RockFallActor` | Class | BP | N | Rock class. |  |
| `RockFallNum` | BossInu2FallRockNum | BP | N | Rocks per life ratio. |  |
| `SpawnAltitude` | CarrotRangeF | BP | N | Spawn height range. |  |
| `SpawnRadius` | CarrotRangeF | BP | N | Spawn radius range. |  |
| `EasyModeSpawnRadius` | CarrotRangeF | — | N | Spawn radius on easy. |  |
| `RockRadius` | Float | — | N | Rock size. |  |
| `BossInuBound` | BoxBound2 | BP | N | Area around the boss where rocks don't fall. |  |

## BossInu2GenseiModeNormalModeRushParam

Rush attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HomingTurnEndWidth` | Float | BP | N | Stop homing when within this lateral width. | 10 |
| `HomingTurnEndWidthMargin` | Float | BP | N | Margin on that width. | 20 |
| `HomingTurnStartJudgeTime` | Float | — | N | Time before homing starts. |  |
| `HomingTurnEndJudgeTime` | Float | — | N | Time before homing ends. |  |
| `ChargeTime` | Float | BP | N | Wind-up. | 1.5 |
| `ChargeSubTime` | Float | BP | N | Extra wind-up for chained rushes. | 0.5 |
| `RushMoveParam` | BossInu2MoveParam | BP | N | Rush movement. |  |
| `RushNum` | BossInu2AttackNum | BP | N | Rushes per attack by life ratio. |  |
| `RushStartFlickStickerParam` | FlickArg | — | N | Flick latched Pikmin at rush start. |  |
| `RushFlickParam` | FlickArg | BP | N | Flick things hit. |  |
| `JumpMoveParam` | BossInu2MoveParam | BP | N | Jump movement. |  |
| `JumpGravityRate` | Float | BP | N | Jump gravity scale. | 1.2000000476837158 |
| `JumpSpeed` | Float | BP | N | Jump speed. | 360 |
| `JumpFlickStickerParam` | FlickArg | — | N | Flick latched Pikmin on jumps. |  |
| `bDestroyRock` | Bool | — | N | Rush breaks rocks. |  |
| `DownParam` | BossInu2DownParam | BP | N | Stun when crashing into a wall. |  |
| `ClashFlickParam` | FlickArg | — | N | Flick on wall clash. |  |
| `EndDistanceToWall` | Float | BP | N | Stop rush this far from walls. | 350 |
| `RushFlickBound` | BossInu2NormalModeRushFlickBound | BP | N | Hit volume of the rush. |  |

## BossInu2GenseiModeNormalModeSmallPressParam

Small press

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaitTime` | Float | — | N | Wait. |  |
| `MoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `PressBound` | CylinderBound2 | BP | N | Crush volume. |  |
| `PressOffsetZ` | Float | BP | N | Height offset. | -95 |

## BossInu2GenseiModeParam

Absorbed-creature ("Gensei") modes

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackChargeTime` | Float | BP | N | Wind-up before attacks. | 0.8500000238418579 |
| `FlickArg` | FlickArg | BP | N | Default flick. |  |
| `JumpTurnFlickArg` | FlickArg | — | N | Flick on jump turns. |  |
| `ChaseMoveParam` | BossInu2MoveParam | BP | N | Chase movement. |  |
| `BlindArea` | CylinderSearchArea | BP | N | Area the boss can't see (blind spot). |  |
| `NormalModeParam` | BossInu2GenseiModeNormalModeParam | BP | N | Normal mode attacks. |  |
| `FireChappyParam` | BossInu2GenseiModeFireChappyParam | BP | N | Fire (absorbed Fiery Bulblax) mode. |  |
| `WaterTankParam` | BossInu2GenseiModeWaterTankParam | BP | N | Water/ice mode. |  |
| `BillyParam` | BossInu2GenseiModeBillyParam | BP | N | Electric mode. |  |
| `BikkuriKinokoParam` | BossInu2GenseiModeBikkuriKinokoParam | BP | N | Poison mushroom mode. |  |
| `CurrentModeStep` | EBossInu2ModeStep | — | N | Runtime current mode (EBossInu2ModeStep). |  |

## BossInu2GenseiModeWaterTankParam

Water/ice mode

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `IceBallParam` | BossInu2IceModeIceBallParam | BP | N | Ice balls. |  |
| `WaterBreathParam` | BossInu2IceModeWaterBreathParam | BP | N | Water breath. |  |
| `RushEatParam` | BossInu2RushEatParam | BP | N | Rush-eat. |  |

## BossInu2GoHomeParam

Go home

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveParam` | BossInu2MoveParam | BP | N | Movement profile. |  |

## BossInu2IceBallAIParameter

Rolling ice ball

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BodyEffect` | ParticleSystem | — | N | Body effect. |  |
| `DestroyEffect` | ParticleSystem | — | N | Destroy effect. |  |
| `RollEftReq` | EftRequest | — | N | Rolling effect. |  |
| `SplashEffect` | ParticleSystem | — | N | Splash effect. |  |
| `SplashRadius` | Float | BP | N | Splash radius. | 0 |
| `RollingVelocity` | Float | BP | N | Roll speed. | 300 |
| `BlownRollingVelocity` | Float | BP | N | Roll speed when knocked back. | 500 |
| `RollingTime` | Float | — | N | Roll duration. |  |
| `StopSpeed` | Float | — | N | Speed at which it stops. |  |
| `VelocityAttenuation` | Float | — | N | Speed decay. |  |
| `LifeTime` | Float | — | N | Lifetime. |  |
| `StoneDurability` | Int | BP | N | Hits to break. | 5 |
| `PressNumMax` | Int | — | N | Max Pikmin crushed. |  |
| `FlickParam` | FlickArg | — | N | Flick. |  |
| `PressDamage` | Float | BP | N | Crush damage. | 30 |
| `DarumaParam` | BossInu2IceBallDarumaParam | — | N | Snowman (daruma) capture. |  |
| `RollingHDRumbleKey` | Name | BP | N | Rumble preset. | "None" |

## BossInu2IceBallDarumaParam

Snowball capture

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableDaruma` | Bool | — | N | Captains can be trapped in the snowball. |  |
| `GachaCount` | Int | — | N | Button presses to escape. |  |
| `DarumaRadius` | Float | BP | N | Capture radius. | 45 |
| `DamageRate` | Float | — | N | Damage rate while trapped. |  |
| `FlickParam` | FlickArg | — | N | Flick on release. |  |
| `FlickDirRange` | Float | — | N | Release direction range. |  |

## BossInu2IceModeBreathEftParam

Breath effect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackEffect` | ParticleSystem | BP | N | Effect. |  |
| `AtkEftBoneName` | Name | BP | N | Bone. | "root" |
| `AttackEffectPosOfs` | Vector | BP | N | Position offset. |  |
| `AttackEffectRotOfs` | Rotator | BP | N | Rotation offset. |  |
| `AttackEffectScale` | Vector | BP | N | Scale. |  |
| `bEnableAtkEftScale` | Bool | — | N | Apply scale. |  |

## BossInu2IceModeIceBallParam

Ice balls

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `MoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `ChargeTime` | Float | BP | N | Wind-up. | 1.5 |
| `IceBallActor` | Class | BP | N | Ice ball class. |  |
| `IceBallSpawnPosOfs` | Vector | BP | N | Spawn offset. |  |
| `IceBallSpawnDist` | Float | — | N | Spawn distance. |  |
| `IceBallNum` | BossInu2AttackNum | BP | N | Ice balls per life ratio. |  |
| `IceBallRandAngle` | Float | — | N | Random angle. |  |
| `ShotFlickParam` | FlickArg | BP | N | Flick. |  |

## BossInu2IceModeWaterBreathParam

Water breath

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EftParam` | BossInu2IceModeBreathEftParam | BP | N | Breath effect. |  |
| `AttackSearchArea` | CakeSearchArea | BP | N | Target area. |  |
| `ReinforceLifeRate` | Float | BP | N | Life ratio below which the breath is reinforced. | 0 |
| `TurnArriveAng` | Float | — | N | Turn tolerance. |  |
| `IntervalTime` | Float | BP | N | Interval between breaths. | 0 |
| `NeckTurnDegrees` | Float | — | N | Neck sweep angle. |  |
| `ChargeMaxAngVelTime` | Float | BP | N | Turn speed while charging. | 1 |
| `ChargeAngAccelRatio` | Float | — | N | Turn acceleration while charging. |  |
| `DischargeMaxAngVelTime` | Float | BP | N | Turn speed while breathing. | 17 |
| `DischargeAngAccelRatio` | Float | — | N | Turn acceleration while breathing. |  |
| `AttackBound` | BoxBound2 | BP | N | Breath hit box. |  |
| `AttackBoundOffset` | Vector | — | N | Offset. |  |
| `AttackBoundScaleRatio` | Float | — | N | Scale ratio. |  |
| `MouthAttackRadius` | Float | — | N | Mouth hit radius. |  |
| `WaterAttackFlickArg` | FlickArg | BP | N | Flick from the water. |  |
| `AntiActorFlickParam` | FlickArg | BP | N | Flick for other actors. |  |
| `HDRumbleKey` | Name | — | N | Rumble preset. |  |
| `HDRumbleOfsRate` | Float | BP | N | Rumble offset rate. | 0.44999998807907104 |

## BossInu2LookAroundParam

Look around

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ToWaitRate` | Float | BP | N | Chance to go back to waiting. | 0.30000001192092896 |

## BossInu2LouieAIParameter

Louie throwing items at you

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ThrowItemActors` | EBossInu2ThrowItemType->Class | BP | N | Map from EBossInu2ThrowItemType to thrown actor classes. |  |
| `ThrowHeightOffset` | Float | BP | N | Throw height offset. | 125 |
| `ThrowWaitTime` | Float | BP | N | Wait between throws. | 0.15000000596046448 |
| `ThrowPredictionCoef` | Float | — | N | Target lead coefficient. |  |

## BossInu2LouieParam

Louie riding the boss

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LouieActor` | Class | BP | N | Louie actor class. |  |
| `RideLocation` | Vector | BP | N | Where Louie sits. |  |
| `PreDemoWaitPosOfs` | Vector | — | N | Louie position offset before the intro cutscene. |  |
| `PreDemoWaitRot` | Rotator | BP | N | Louie rotation before the intro cutscene. |  |

## BossInu2MaterialAnimParam

Material animation names

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DownStart` | Name | BP | N | Material animation on knock-down start. | "FireDownStart", "IceDownStart", "ThunderDownStart" |
| `DownEnd` | Name | BP | N | Material animation on knock-down end. | "FireDownEnd", "IceDownEnd", "ThunderDownEnd" |

## BossInu2MoveParam

Movement profile

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxSpeed` | Float | BP | N | Max speed. | 50, 36, 250 |
| `SpeedAccelRatio` | Float | BP | N | Acceleration ratio. | 0.699999988079071, 0.10000000149011612, 1 |
| `StopAccelRatio` | Float | BP | N | Deceleration ratio. | 0, 0.10000000149011612, 0.20000000298023224 |
| `MaxAngVelTime` | Float | BP | N | Turn speed limit. | 5, 10, 3 |
| `AngAccelRatio` | Float | BP | N | Turn acceleration. | 0.30000001192092896, 0.25999999046325684, 0.25 |

## BossInu2MoveToTerritoryCenterParam

Jump back to centre

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveParam` | BossInu2MoveParam | BP | N | Movement profile. |  |
| `CenterRadius` | Float | — | N | Radius considered "centre". |  |
| `ArriveDist` | Float | — | N | Arrival distance. |  |
| `Altitude` | Float | BP | N | Jump apex height. | 150 |
| `CustomGravityRate` | Float | — | N | Gravity scale. |  |
| `JumpStartFlickParam` | FlickArg | — | N | Flick at take-off. |  |
| `JumpEndFlickParam` | FlickArg | BP | N | Flick at landing. |  |

## BossInu2NormalModeRushFlickBound

Rush hit bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius` | Float | BP | N | Radius. | 95 |
| `HalfDist` | Float | BP | N | Half length. | 70 |
| `Offset` | Vector | BP | N | Offset. |  |

## BossInu2RushEatParam

Rush and eat

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | N | Target area. |  |
| `OutOfSearchDist` | Float | — | N | Give up beyond this distance. |  |
| `MoveParam` | BossInu2MoveParam | BP | N | Movement. |  |
| `ChargeTime` | Float | — | N | Wind-up. |  |
| `MoveDistMin` | Float | — | N | Minimum rush distance. |  |
| `RushTimeMin` | Float | — | N | Minimum rush time. |  |
| `ArriveDist` | Float | BP | N | Arrival distance. | 350 |
| `TurnArriveAng` | Float | BP | N | Turn tolerance. | 15 |
| `MoveEndDistOfs` | Float | BP | N | End-of-move offset. | 1500 |
| `RushEatNumMax` | Int | — | N | Max rush-eats in a row. |  |

## BossInu2ScatterObjParam

Scatter pattern

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ScatterAreaNum` | Int | BP | N | Number of scatter sectors. | 6, 8 |
| `ScatterPosOfs` | Vector | BP | N | Scatter origin offset. |  |
| `ScatterRandAng` | Float | — | N | Random angle. |  |
| `ScatterDistance` | Float | — | N | Distance. |  |
| `ScatterHeightOfs` | Float | — | N | Height offset. |  |
| `TerritoryCenterOffset` | Vector | BP | N | Offset from arena centre. |  |

## BossInu2WanderParam

Wander pattern

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveParam` | BossInu2MoveParam | BP | N | Movement profile. |  |
| `WanderStartFixedAng` | Float | BP | N | Fixed turn angle when starting to wander. | 24 |
| `WanderLoopFixedAng` | Float | BP | N | Fixed turn angle per wander loop. | 42 |

## BossInu2ZukanParam

Piklopedia viewer

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | N | Search area in the viewer. |  |

## BoxBound2

Box bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HalfX` | Float | BP | N | Half size X. | 30, 85, 300 |
| `HalfY` | Float | BP | N | Half size Y. | 45, 200, 80 |
| `HalfZ` | Float | BP | N | Half size Z. | 40, 100, 50 |

## BranchAIParameter

Jumpable branch/ledge (Oatchi jump link). Per-instance: bShort, JumpHeight, NavLinkRightOffset

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bShort` | Bool | — | S | Short branch variant. |  |
| `JumpHeight` | Float | BP | S | Jump height for the link. | 35 |
| `NavLinkRightOffset` | Vector | BP+SL | S | Offset of the landing nav-link point (Dandori "navLinkRight"). |  |

## BridgeFlexibleAIComponent

Flexible bridges

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NeedColumnNum` | Int | SL | S | Number of columns/segments in the bridge. | 7, 12, 8 |
| `BaseWallColType` | Byte | SL | S | Collision type of the base wall. | 20, 22, 24 |
| `bEnableAdjustNavLinkPos` | Bool | SL | S | Adjust nav-link positions to the built length. | false |

## BuildObjectAIComponent

Buildable objects (bridges, walls, stairs)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PiecePutNum` | Int | SL | S | Number of material pieces already placed (dynamic state). | 19, 33, 26 |
| `PiecePerPanel` | Int | SL | S | Pieces needed per panel/segment. | 3 |
| `EntranceOffset` | Float | — | S | Offset of the builder entrance. |  |

## BuildWallFlexibleAIComponent

Flexible buildable walls

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NeedColumnNum` | Int | SL | S | Number of columns. | 3, 2, 1 |
| `bDisableNavLink` | Bool | SL | S | Don't create a nav link across the wall. | true |

## BurningAIParameter

Burning objects (fire hazard). Per-instance: FireEffect, ColdBoxEventRadius, SearchActorCID

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FireEffect` | ParticleSystem | — | S | Fire effect. |  |
| `BurningEventRadius` | Float | — | N | Radius that ignites things. |  |
| `ColdBoxEventRadius` | Float | SL | S | Radius in which cold boxes (ice) extinguish it. | 85 |
| `SearchActorRadius` | Float | — | N | Radius for SearchActorCID. |  |
| `SearchActorCID` | Name | SL | S | CID linked to this fire (e.g. MADORIPOKO, OTADARUMA – the object it is burning/blocking). | "MADORIPOKO", "OTADARUMA", "OTATOMATOM" |

## BurrowAIParameter

Burrow points used by burrowing enemies (Shako/Demejako). Per-instance.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Tag` | Name | SL | S | Burrow tag linking it to its enemy (e.g. Shako1). | "shako003", "Shako1", "Shako2" |
| `bEnableSoftEdge` | Bool | BP+SL | S | Soft edge enabled around the burrow. | true |

## CakeSearchArea

Cylinder with a view angle ("cake slice")

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Angle` | Float | BP+SL | S | Opening angle (degrees) of the slice in front of the actor. | 225, 150, 40 |

## CakeSSphereSearchArea

Cake slice plus a near sphere

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SphereRadius` | Float | BP+SL | S | Radius of the always-detect sphere close to the actor (ignores Angle). | 250, 150, 225 |

## CameraDistStepParameter

Camera step

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Fov` | Float | BP | N | Field of view. | 37, 32, 26 |
| `Angle` | Float | BP | N | Pitch. | 25 |
| `Dist` | Float | BP | N | Distance. | 440, 290, 550 |
| `LookOffset` | Float | BP | N | Look offset. | 45, 100, 55 |
| `WorldCameraShakeRate` | Float | — | N | Shake rate. |  |

## CameraStartEndInterpolateParameter

Camera blend

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CamDistInterpolateRateCurve` | CurveFloat | BP | N | Distance blend curve. |  |
| `FovInterpolateRateCurve` | CurveFloat | BP | N | FOV blend curve. |  |
| `InterpolateTime` | Float | BP | N | Blend time. | 1, 0.5, 1.5 |

## CarrotActorComponent

Base component

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SerializeType` | ESerializeType | BP | N | ESerializeType: whether the component state is saved as Static or Dynamic data. | "ESerializeType::Dynamic" |

## CarrotAIComponent

Component-level fields on every AI component (set in the actor blueprints)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableBombHoming` | Bool | BP | N | Thrown bombs home in on this actor. | false |
| `bEnableAdjustRadarTargetPoint` | Bool | BP | N | Shift the radar marker position by AdjustRadarTargetPointOffsetSize. | true |
| `AdjustRadarTargetPointOffsetSize` | Float | BP | N | Size of the radar marker offset. | 195, 50, 80 |
| `bEnableProjectionRadarOffsetToForwardVec` | Bool | BP | N | Project the radar offset along the forward vector. | true |
| `AddAssistPointValue` | Float | BP | N | Assist points awarded (co-op assist scoring). | 10, 5, 30 |
| `bSlipRidingActor` | Bool | BP | N | Riders slip off this actor. | true |
| `bUsePikminAttackJumpRatio` | Bool | BP | N | Scale the Pikmin attack jump against this actor. | true |
| `PikminAttackJumpRatio` | Float | BP | N | Jump ratio for Pikmin attacking this actor. | 0, 0.5, 1 |
| `bSlipCollTreeRidingActor` | Bool | BP | N | Riders slip off this actor's collision tree. | false |
| `UpdateInterval` | Int | BP | N | AI tick interval (frames) used when throttled. | 2, 5, 60 |
| `bLookTargetFromPikmin` | Bool | BP | N | Pikmin look at this actor. | false |
| `bLookTargetFromAvatar` | Bool | BP | N | Captains look at this actor. | false |
| `bLookTargetFromHappy` | Bool | BP | N | Oatchi looks at this actor. | false |
| `bEnableShoulder` | Bool | BP | N | Actor can be carried on the shoulder (e.g. by Dweevils). | true |
| `bUseShoulderOffset` | Bool | BP | N | Use ShoulderOffset when shouldered. | true |
| `RouletteGaugeUp` | Float | BP | N | Amount this actor adds to the Dandori-battle roulette gauge. | 0.5, 1, 0.6000000238418579 |
| `bEnablePerch` | Bool | BP+SL | N | Birds/insects can perch on this actor. | true |
| `bReceiveStickersEvent` | Bool | BP | N | Receives events when Pikmin latch on. | true |
| `bUsePikminAttackJumpRatioWhenFrozen` | Bool | BP | N | Different jump ratio while frozen. | true |
| `ShoulderedCarryType` | EShoulderedCarry | BP | N | EShoulderedCarry: None/Carry/FlyCarry – how it is carried when shouldered. | "EShoulderedCarry::FlyCarry" |
| `BombHomingBoneName` | Name | BP | N | Bone bombs home toward. | "T_j006" |
| `bAttackedOwner` | Bool | BP | N | Remembers that the owner was attacked. | true |
| `CameraLookAtParameter` | CommonCameraLookAtParameter | — | N | Camera look-at bone/offset for this actor. |  |
| `AdjustRadarTargetBaseLocOffset` | Vector | — | N | Base location offset for the radar marker. |  |
| `PikminAttackJumpRatioWhenFrozen` | Float | — | N | Jump ratio while frozen. |  |
| `bShoulderableDist` | Float | — | N | Distance within which it can be shouldered. |  |
| `bShoulderableBacklash` | Float | — | N | Backlash distance when shouldered. |  |
| `ShoulderOffset` | Vector | — | N | Offset when carried on a shoulder. |  |
| `SniffPointParameter` | SniffPointParameter | — | S | See SniffPointParameter (per-instance). |  |

## CarrotColorAnimation

Material colour animation

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ParameterValues` | CarrotColorAnimationParameterValue | BP | N | Named colour animation parameters (Name/Value pairs). |  |
| `ColorAnimationDTArray` | DataTable | BP | N | Data tables with colour animations. |  |

## CarrotRangeF

Float range

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Min` | Float | BP | N | Minimum. | 12, 7.5, 600 |
| `Max` | Float | BP | N | Maximum. | 12, 7.5, 800 |

## ChappyBaseAIParameter

Shared Bulborb-family behaviour

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HappyFlickParam` | FlickArg | BP | N | Flick applied to Oatchi. |  |
| `BurpAfterEatPikminNum` | Int | BP | N | Pikmin eaten before a burp. | 5, 4 |
| `StartEatTime` | Float | BP | N | Delay before eating starts. | 0.20000000298023224 |
| `NeckBoneAngVelDeg_Normal` | Float | BP | N | Neck turn speed normally. | 6 |
| `NeckBoneAngVelDeg_Notice` | Float | — | N | Neck turn speed when noticing. |  |
| `LookRatioChangeSpeed` | Float | — | N | Look blend speed. |  |
| `GoHomeSpeed` | Float | BP | N | Speed when returning home. | 55 |
| `ChaseParameter` | ChaseParameter | BP | N | Chase speed override. |  |
| `BombLookTime` | Float | BP | N | Time spent looking at a bomb. | 1.2999999523162842 |
| `CondNonStickerChase` | Cond | — | N | Condition for chasing non-latched targets. |  |
| `bPrioritizeYuudouEsa` | Bool | — | N | Prefer lure food over Pikmin. |  |
| `bUseCalcCheckChaseOrGiveup` | Bool | BP | N | Use the chase-or-give-up calculation. | true |
| `DontWakeupTime` | Float | BP | N | Time it can't be woken after falling asleep. | 15 |
| `bPlayWalkInInvasion` | Bool | BP | N | Walk animation during night invasion. | true |
| `bPlayRunInNightWander` | Bool | BP | N | Run animation while wandering at night. | false |
| `RayCheckParameter` | ChappyBaseRayCheckParameter | BP | N | Wall ray check. |  |

## ChappyBaseRayCheckParameter

Wall check

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnable` | Bool | BP | N | Ray-check walls before chasing. | true |

## CharcoalAIParameter

Burning charcoal hazard

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FireEffect` | ParticleSystem | BP | N | Fire effect. |  |
| `BreakEffect` | ParticleSystem | BP | N | Break effect. |  |
| `DamageToAvatar` | Float | BP | N | Damage to captains. | 0 |
| `DamageToHappy` | Float | BP | N | Damage to Oatchi. | 15 |
| `RideActorDamageRadius` | Float | — | N | Radius damaging riders. |  |

## CharmParameter

Charm dance circles

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CircleRadius` | Float | BP | N | Circle radius. | 45 |
| `InnerCircleRadius` | Float | BP | N | Inner radius. | 30 |
| `OuterCircleRadius` | Float | BP | N | Outer radius. | 45, 110 |
| `Required2linesNum` | Int | — | N | Lines required. |  |
| `bRotateCircle` | Bool | — | N | Rotate circles. |  |
| `CircleRotationDegree` | Int | — | N | Rotation. |  |

## ChaseParameter

Chase speed override

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bUseChaseParameter` | Bool | BP | N | Use ChaseSpeed instead of the default. | true |
| `ChaseSpeed` | Float | BP | N | Chase speed. | 80, 120, 115 |

## ChaserAIParameter

Chaser = Moss (the rival dog in Primordial Thicket/Area010 that sniffs, barks, captures Pikmin, rests to heal and can be ridden). Not per-instance.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDbgZukanMode` | Bool | — | N | Debug: Piklopedia mode. |  |
| `bNewDemo` | Bool | — | N | Use the newer cutscene flow. |  |
| `bFindNearestPikminFromList` | Bool | — | N | Pick the nearest Pikmin from its list. |  |
| `RouteWanderParam` | ChaserRouteWanderParameter | BP | N | Route wandering. |  |
| `PatrolParam` | ChaserPatrolParameter | — | N | Patrol timing. |  |
| `LookAtParam` | ChaserLookAtParameter | — | N | Look-at blending. |  |
| `IntimidationParam` | ChaserIntimidationParameter | BP | N | Intimidating (growl) behaviour. |  |
| `CaptureParam` | ChaserCaptureParameter | BP | N | Capturing and throwing Pikmin. |  |
| `EscapeParam` | ChaserEscapeParameter | BP | N | Escape when badly hurt. |  |
| `RestParam` | ChaserRestParameter | BP | N | Resting to recover HP. |  |
| `AreaMoveParam` | ChaserAreaMoveParameter | BP | N | Moving between areas. |  |
| `DownParam` | ChaserDownParameter | — | N | Knock-down durations. |  |
| `ChaseParam` | ChaserChaseParameter | BP | N | Chasing. |  |
| `BarkParam` | ChaserBarkParameter | BP | N | Bark shockwave. |  |
| `RideParam` | ChaserRideParameter | BP | N | Riding (as a mount) and Pikmin seating. |  |
| `ChaserYuudouEsaReactionParam` | ChaserYuudouEsaReactionParameter | BP | N | Reactions to lure food. |  |
| `PlayerFlickByGacha` | Int | — | N | Button-mash count to shake the player off. |  |
| `ChangeFlickHitCount` | Int | BP | N | Hits before a big shake-off. | 250 |
| `ChangeSmallFlickHitCount` | Int | BP | N | Hits before a small shake-off. | 50 |
| `SmallFlickArg` | FlickArg | BP | N | Small shake-off. |  |
| `ChangeTargetAvatarHitCount` | Int | BP | N | Hits from a captain before targeting them. | 10 |
| `UnguardedTime` | Float | BP | N | Vulnerable time after attacks. | 2 |
| `RidePreventionVelZ` | Float | — | N | Vertical velocity preventing mounting. |  |
| `bPartitionArea` | Bool | — | N | Use partitioned areas. |  |
| `HappyReactionParam` | HappyReactionParameter | BP | N | Reaction to Oatchi. |  |

## ChaserAreaMoveParameter

Area move

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AreaMoveSniffCount` | Int | BP | N | Sniffs before moving area. | 6 |
| `JumpPointTags` | Name | BP | N | Jump point tags. |  |
| `MoveTargetPointTags` | Name | BP | N | Destination tags. |  |
| `ArriveDist` | Float | BP | N | Arrival distance. | 40 |
| `ArriveAng` | Float | — | N | Turn tolerance. |  |
| `SearchArea` | CakeSSphereSearchArea | BP | N | Search area. |  |

## ChaserBarkParameter

Bark shockwave

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BarkEffect` | ParticleSystem | BP | N | Effect. |  |
| `BarkEffectOfs` | Vector | BP | N | Effect offset. |  |
| `ChaseToBarkArea` | CakeSSphereSearchArea | BP | N | Area that triggers a bark. |  |
| `SendEventMax` | Int | — | N | Max events per bark. |  |
| `BarkLoopTime` | Float | BP | N | Bark duration. | 1 |
| `InitRadius` | Float | BP | N | Start radius. | 10 |
| `InitHeight` | Float | BP | N | Start height. | 50 |
| `MaxRadius` | Float | BP | N | Max radius. | 120 |
| `MaxHeight` | Float | — | N | Max height. |  |
| `ExpandSpeedXY` | Float | BP | N | Horizontal expansion speed. | 100 |
| `ExpandSpeedZ` | Float | — | N | Vertical expansion speed. |  |
| `CantSendEnemyFueCounter` | Float | — | N | Cooldown for scaring enemies. |  |
| `BarkHDRumbleKey` | Name | — | N | Rumble preset. |  |

## ChaserCaptureParameter

Capture

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CaptureThrowTag` | Name | — | N | Tag of the throw point. |  |
| `CaptureTag` | Name | — | N | Tag of the capture destination. |  |
| `ChangeToCaptureThrowPikminNum` | Int | — | N | Pikmin captured before throwing. |  |
| `ChangeToCaptureThrowTime` | Float | — | N | Time before throwing. |  |
| `CaptureMoveSpeed` | Float | BP | N | Speed while carrying captives. | 75 |
| `ArriveDist` | Float | BP | N | Arrival distance. | 40 |
| `ArriveAng` | Float | — | N | Turn tolerance. |  |
| `ThrowVelocityXY` | Float | — | N | Throw speed horizontal. |  |
| `ThrowVelocityZ` | Float | — | N | Throw speed vertical. |  |
| `CantChaseTime` | Float | — | N | Chase cooldown afterwards. |  |

## ChaserChaseParameter

Chase

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EyePositionHeight` | Float | BP | N | Eye height for sight checks. | 60 |
| `EyePositionOfsDist` | Float | BP | N | Eye forward offset. | 150 |
| `LastTargetPosArriveDist` | Float | BP | N | Arrival distance to last seen position. | 20 |
| `StuckDetectTime` | Float | — | N | Stuck detection time. |  |
| `StuckDetectRatio` | Float | — | N | Stuck detection threshold. |  |
| `CantChaseTime` | Float | BP | N | Chase cooldown. | 5 |
| `LostTargetTime` | Float | — | N | Time before losing the target. |  |
| `LostTargetSearchArea` | CakeSSphereSearchArea | BP | N | Search area after losing it. |  |
| `AlertSearchTime` | Int | BP | N | Alert searches. | 2 |

## ChaserEscapeParameter

Escape

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StartEscapeDamage` | Float | BP | N | Damage that makes it flee. | 2500 |
| `EscapeTime` | Float | BP | N | Flee duration. | 10 |
| `EscapeMaxSpeed` | Float | — | N | Flee speed. |  |
| `StartEscapeFlickArg` | FlickArg | BP | N | Flick on fleeing. |  |
| `EscapeFlickMax` | Int | — | N | Max flicks. |  |
| `EscapeFlickRateForSticker` | Float | — | N | Chance to flick latched Pikmin. |  |
| `EscapeFlickArg` | FlickArg | BP | N | Flick while fleeing. |  |

## ChaserIntimidationParameter

Intimidation

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableIntimidation` | Bool | — | N | Enable growling at targets. |  |
| `SearchArea` | CakeSSphereSearchArea | BP | N | Area. |  |
| `ArriveAng` | Float | — | N | Turn tolerance. |  |
| `CheckIntimidationTime` | Float | — | N | Check interval. |  |
| `IntimidationTime` | CarrotRangeF | BP | N | Duration range. |  |
| `InvalidIntimidationTime` | Float | BP | N | Cooldown. | 30 |
| `InvalidCarryIntimidationTime` | Float | — | N | Cooldown for carriers. |  |
| `SearchAreaForCarry` | CakeSSphereSearchArea | BP | N | Area for carrying Pikmin. |  |

## ChaserRestCancelDamageParameter

Rest interruption

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HitCountPikmin` | Int | BP | N | Pikmin hits needed. | 1 |
| `HitCountHappy` | Int | BP | N | Oatchi hits needed. | 1 |
| `HitCountOther` | Int | BP | N | Other hits needed. | 1 |

## ChaserRestParameter

Rest

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RestPointTags` | Name | BP | N | Rest point tags. |  |
| `ArriveDist` | Float | BP | N | Arrival distance. | 40 |
| `RecoveryLifeSpd` | Float | BP | N | HP regained per second while resting. | 15 |
| `EndRestRecoveryLife` | Float | BP | N | HP at which rest ends. | 1500 |
| `CancelRestHitCountParam` | ChaserRestCancelDamageParameter | BP | N | Hits that interrupt resting. |  |

## ChaserRideParameter

Mount

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RideParameter` | GCRideParameter | — | N | Riding rules. |  |
| `CarryPikminParameter` | GCCarryPikminParameter | BP | N | Pikmin seating on its back. |  |

## ChaserRouteWanderParameter

Route wander

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RouteWanderPathTag` | Name | — | N | Route path tag. |  |
| `RouteWanderPathTags` | Name | BP | N | Route path tags. |  |
| `SniffTargetArea` | CakeSSphereSearchArea | BP | N | Sniffing search area. |  |
| `RouteWanderTimeMin` | Float | — | N | Min time. |  |
| `RouteWanderTimeMax` | Float | — | N | Max time. |  |
| `RouteWanderArriveDist` | Float | — | N | Arrival distance. |  |

## ChaserYuudouEsaReactionParameter

Lure food reactions

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ReactionDist` | Float | — | N | Reaction distance. |  |
| `BarkReactionTime` | Float | BP | N | Time before barking at it. | 3.2799999713897705 |
| `BarkWaitTime` | CarrotRangeF | — | N | Wait range after barking. |  |
| `SniffReactionTime` | Float | BP | N | Time before sniffing. | 4.5 |
| `SniffWaitTime` | CarrotRangeF | — | N | Wait range after sniffing. |  |
| `NoReactionTime` | Float | — | N | Time it ignores lures. |  |

## CirculatorAIParameter

Circulator (wind fan/updraft gimmick). Per-instance: SwitchID, bWindLong (+NavLinkRight in Dandori)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SwitchID` | Name | BP+SL | S | Switch that turns it on. | "CirculatorSwitch04", "CirculatorSwitch00", "CirculatorSwitch05" |
| `bRotateDefault` | Bool | BP+SL | S | Rotating at start (dynamic state). | false |
| `bWindLong` | Bool | SL | S | Long wind (higher/longer lift) variant. | true |
| `bLeanType` | Bool | BP | N | Leaning variant. | true |
| `ArriveDist` | Float | BP | N | Arrival distance. | 110 |
| `JumpInPointOffset` | Vector | BP | N | Jump-in point offset. |  |
| `JumpInSpeed` | Float | — | N | Jump-in speed. |  |
| `JumpInHeightOffset` | Float | BP | N | Jump-in height offset. | 20, 0 |
| `JumpOutHeight` | Float | BP | N | Launch height. | 300, 200 |
| `DropEndMotionTime` | Float | — | N | Landing motion time. |  |
| `ChaserRandRange` | Float | BP | N | Random range for Moss using it. | 60 |
| `WindLoopEffect` | ParticleSystem | BP | N | Wind effect. |  |
| `WindEndEffect` | ParticleSystem | BP | N | Wind end effect. |  |
| `LongWindLoopEffect` | ParticleSystem | BP | N | Long wind effect. |  |
| `LongWindEndEffect` | ParticleSystem | BP | N | Long wind end effect. |  |
| `bDoWorkWithQuestEventInsteadOfSwitch` | Bool | BP | N | Activated by a quest event instead of a switch. | true |
| `bDoWorkOnlyDay` | Bool | BP | N | Only works during day. | true |

## ColdBoxAIParameter

Ice block that extinguishes fire

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ColdEffect` | ParticleSystem | BP | N | Cold effect. |  |
| `BreakEffect` | ParticleSystem | BP | N | Break effect. |  |
| `OnEventBound` | BoxBound2 | BP | N | Event volume. |  |
| `RideActorDamageRadius` | Float | — | N | Damage radius for riders. |  |

## Cond

Search condition

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Attr` | Int | BP | N | Attribute bitmask to match. | 2, 8 |
| `Attitude` | Int | — | N | Attitude (friend/foe) to match. |  |

## ConeBound

Cone

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Length` | Float | BP | N | Length. | 400, 200, 180 |
| `Angle` | Float | BP | N | Angle. | 16 |

## ConveyorBaseAIParameter

Conveyor belts. Per-instance: SwitchID, DriveSpeed

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SwitchID` | Name | SL | S | Controlling switch. | "switch01", "switch03" |
| `DriveSpeed` | Float | BP | S | Belt speed. | 100 |
| `RushGenseiMag` | Float | BP | N | Speed multiplier for rushing creatures. | 0.5 |
| `ChangeMotionSpeedMag` | Float | BP | N | Motion speed multiplier. | 0.5 |

## ConveyorNavAIParameter

Conveyor nav link

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SwitchID` | Name | SL | S | Controlling switch. | "switch01" |

## CrackPotAIParameter

Breakable pots. Per-instance: drops + bSendBreakEvent, bHiddenBRMesh

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BreakEffect` | ParticleSystem | BP | N | Break effect. |  |
| `bBroken` | Bool | — | N | Already broken. |  |
| `ObjectSearchRadius` | Float | BP | N | Radius for objects inside. | 25 |
| `MaxWaitShakeRandTime` | Float | BP | N | Random shake delay. | 3 |
| `bBigSize` | Bool | BP | N | Large pot. | true |
| `bBrokenFromDemo` | Bool | BP | N | Broken by a cutscene. | true |
| `bSendBreakEvent` | Bool | SL | S | Send an event to nearby actors when broken. | true |
| `SendEventRange` | Float | — | N | Event range. |  |
| `bHiddenBRMesh` | Bool | SL | S | Hide the broken-remains mesh. | true |

## CrushJellyAIParameter

Crush jelly (jello blocks holding items). Per-instance: TouchAnimInterval, bFreezeStart, SearchCIDList

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TouchAnimInterval` | Float | BP | S | Interval of the touch wobble animation. | 0 |
| `ShakeAnimInterval` | Float | — | N | Interval of the shake animation. |  |
| `bFreezeStart` | Bool | SL | S | Starts frozen (needs Ice Pikmin). | true |
| `WrapActorMaterials` | MaterialInterface | BP | N | Materials of wrapped items. |  |
| `StickBoneName` | Name | BP | N | Bone items stick to. | "S_j004", "S_j003" |
| `FrozenDemoDelay` | Float | BP | N | Delay of the freeze cutscene. | 0.5 |
| `RequestFreezeRumbleName` | Name | BP | N | Rumble on freeze. | "Obj_CrushJelly_Freeze_L", "Obj_CrushJelly_Freeze_M", "Obj_CrushJelly_Freeze_S" |
| `RequestRumbleName` | Name | BP | N | Rumble on break. | "Obj_Common_Break_L", "Obj_Common_Break_M", "Obj_Common_Break_S" |
| `CameraShakeType` | ECameraShakeType | BP | N | Camera shake size. | "ECameraShakeType::Large", "ECameraShakeType::Medium", "ECameraShakeType::Micro" |
| `ShakeCameraParameter` | ShakeCameraParameter | BP | N | Camera shake. |  |
| `SearchCIDList` | Name | SL | S | CIDs of actors held inside (Dandori's searchCIDList). |  |

## CushionAIParameter

Bouncy cushion

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ShakeBoundExtent` | Vector | BP | S | Shake detection box extent. |  |
| `BoundOffset` | Vector | BP | S | Box offset. |  |
| `JumpDir` | Vector | BP | N | Bounce direction. |  |
| `CushionFlickArg` | FlickArg | BP | N | Flick when bouncing. |  |
| `ShizaiVel` | Vector2D | BP | N | Launch velocity of raw materials. |  |
| `ShizaiRandVel` | Vector2D | BP | N | Random launch velocity. |  |

## CylinderBound2

Cylinder bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RadiusXZ` | Float | BP | N | Radius. | 60, 95, 15 |
| `SqRadiusXZ` | Float | — | N | Cached squared radius. |  |
| `HalfHeight` | Float | BP | N | Half height. | 80, 50, 25 |

## CylinderSearchArea

Cylinder volume (Territory etc.)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Center` | Vector | BP+SL | S | Centre (world position for territories; offset for search areas). |  |
| `HalfHeight` | Float | BP+SL | S | Half-height of the cylinder. | 50, 100, 200 |
| `Radius` | Float | BP+SL | S | Radius of the cylinder. | 100, 150, 286.39993 |

## DamageAreaAIParameter

Generic hazard area

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DamageAreaEffect` | ParticleSystem | BP | N | Effect. |  |
| `bEnableDamageAreaEffectScale` | Bool | — | N | Scale effect. |  |
| `DamageAreaEffectRadius` | Float | — | N | Effect radius. |  |
| `DamageAreaEffectScale` | Vector | — | N | Effect scale. |  |
| `DamageAreaInitRadius` | Float | BP | N | Start radius. | 50 |
| `DamageAreaWidth` | Float | — | N | Ring width. |  |
| `DamageAreaExpandWaitTime` | Float | — | N | Wait before expanding. |  |
| `DamageAreaExpandTime` | Float | — | N | Expansion time. |  |
| `DamageAreaExpandType` | EEaseCurveInterpolation | BP | N | Easing curve. | "EEaseCurveInterpolation::Linear" |
| `DamageAreaRadius` | Float | BP | N | Final radius. | 200 |
| `DamageAreaHalfHeight` | Float | BP | N | Half height. | 10 |
| `DestroyTime` | Float | BP | N | Lifetime (-1 infinite). | 15, -1 |
| `PoolType` | EGenericActorPoolType | BP | N | Actor pool. | "EGenericActorPoolType::BikkuriKinokoPoisonArea", "EGenericActorPoolType::BossIn |

## DamageAreaOverrideParameter

Expanding hazard area (poison/fire clouds)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DamageAreaEffect` | ParticleSystem | BP | N | Particle effect. |  |
| `DamageAreaEffectScale` | Vector | BP | N | Effect scale. |  |
| `DamageAreaInitRadius` | Float | BP | N | Starting radius. | 35, 50 |
| `DamageAreaWidth` | Float | — | N | Ring width. |  |
| `DamageAreaExpandWaitTime` | Float | BP | N | Wait before expanding. | 0 |
| `DamageAreaExpandTime` | Float | BP | N | Expansion duration. | 1, 1.5 |
| `DamageAreaExpandType` | EEaseCurveInterpolation | BP | N | Easing curve of the expansion. | "EEaseCurveInterpolation::Linear" |
| `DamageAreaRadius` | Float | BP | N | Final radius. | 80 |
| `DamageAreaHalfHeight` | Float | BP | N | Half height. | 45, 20 |
| `DestroyTime` | Float | BP | N | Lifetime (-1 = infinite). | 10, 9, -1 |

## DamagumoBaseAIParameter

Damagumo = Long Legs family (Baldy/Groovy Long Legs etc.). Per-instance: SearchTagName, bStraddle, FightCameraParameter.CameraChangeDistanceXY

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ZukanForceAppearTime` | Float | — | N | Forced appear time in the Piklopedia. |  |
| `HikaridukaHitDist` | Float | BP | N | Hit distance against a Lumiknoll (night mode). | 110 |
| `HikaridukaModeWaitTime` | Float | — | N | Wait at the Lumiknoll. |  |
| `HikaridukaToWaitSetCount` | Int | — | N | Steps before waiting at the Lumiknoll. |  |
| `WingPikminFallSpeed` | Float | BP | N | Winged Pikmin fall speed when hit. | 500, 600 |
| `OverwriteRippleVelocity` | Float | BP | N | Water ripple speed. | 100 |
| `OverwriteRippleRadiusScale` | Float | — | N | Water ripple scale. |  |
| `LegMoveLerpRate` | Float | BP | N | Leg IK interpolation. | 0.05000000074505806 |
| `WalkFlickRatio` | Float | BP | N | Chance to flick while walking. | 0, 0.1599999964237213 |
| `LegHeightRate` | Float | BP | N | Leg lift height scale. | 1.2000000476837158 |
| `LegTargetOffsetLB` | Vector | BP | N | Resting foot target offsets (left/right, back/front). |  |
| `LegTargetOffsetLF` | Vector | BP | N | Resting foot target offsets (left/right, back/front). |  |
| `LegTargetOffsetRB` | Vector | BP | N | Resting foot target offsets (left/right, back/front). |  |
| `LegTargetOffsetRF` | Vector | BP | N | Resting foot target offsets (left/right, back/front). |  |
| `AppearLegTargetOffsetLB` | Vector | BP | N | Foot targets during the appear. |  |
| `AppearLegTargetOffsetLF` | Vector | BP | N | Foot targets during the appear. |  |
| `AppearLegTargetOffsetRB` | Vector | BP | N | Foot targets during the appear. |  |
| `AppearLegTargetOffsetRF` | Vector | BP | N | Foot targets during the appear. |  |
| `LegLookAtOffset` | Vector | BP | N | Leg look-at offset. |  |
| `bCanPress` | Bool | BP | N | Feet crush Pikmin. | false |
| `AttackHeight` | Float | BP | N | Stomp height. | 60 |
| `PressRadiusXY` | Float | BP | N | Stomp radius. | 28 |
| `MaxTimeBattle` | Float | — | N | Max battle time. |  |
| `LifeStopBattle` | Float | BP | N | HP threshold to stop battling. | 500 |
| `bUseWait` | Bool | BP | N | Pauses between steps. | true |
| `ToWaitSetCountMin` | Int | BP | N | Min steps before waiting. | 2 |
| `ToWaitSetCountMax` | Int | BP | N | Max steps before waiting. | 3 |
| `WaitTime` | Float | BP | N | Wait duration. | 2.5 |
| `SplineWaitTime` | Float | BP | N | Wait on spline routes. | 3, 5 |
| `LegBreakLifeRate` | Float | — | N | Life ratio for leg break. |  |
| `WalkMaxDist` | Float | BP | N | Max step distance. | 200, 115, 50 |
| `WalkMaxDistSpline` | Float | BP | N | Max step distance on splines. | 90 |
| `WalkMaxAngle` | Float | BP | N | Max step turn. | 20, 35 |
| `HikaridukaWalkMaxAngle` | Float | BP | N | Max step turn near a Lumiknoll. | 45 |
| `HikaridukaAngAccelRatio` | Float | — | N | Turn accel near a Lumiknoll. |  |
| `HikaridukaMaxAngVelTime` | Float | BP | N | Turn speed near a Lumiknoll. | 30 |
| `SplineMoveAnimSpeed` | Float | BP | N | Animation speed on splines. | 0.949999988079071 |
| `WalkFlickSpeedXY` | Float | BP | N | Walking flick horizontal speed. | 100, 90 |
| `WalkFlickSpeedZ` | Float | BP | N | Walking flick vertical speed. | 200 |
| `AppearFlickArg` | FlickArg | BP | N | Flick when appearing. |  |
| `WalkHeadOffset` | Float | BP | N | Body bob while walking. | 10 |
| `SplineWalkHeadOffset` | Float | BP | N | Body bob on splines. | 13 |
| `SearchTagName` | Name | BP+SL | S | Tag of the spline route it walks (per-instance). | "None" |
| `CanStepSearchTagName` | Name | SL | S | Tag of areas it may step in. | "None" |
| `PressEffectRequest` | EftRequest | BP | N | Stomp effect. |  |
| `LegUpEffectRequest` | EftRequest | BP | N | Leg lift effect. |  |
| `MoveCurves` | DamagumoMoveCurves | BP | N | Movement curves. |  |
| `DamagedMoveCurves` | DamagumoMoveCurves | BP | N | Movement curves when damaged. |  |
| `bStraddle` | Bool | SL | S | Straddles (walks over) obstacles/terrain; per-instance (Dandori mislabels this byte as bSplineWalkStart). | true |
| `StraddleMoveCurves` | DamagumoMoveCurves | BP | N | Curves when straddling. |  |
| `StraddleDamagedMoveCurves` | DamagumoMoveCurves | BP | N | Damaged curves when straddling. |  |
| `BaseHeight` | Float | BP | N | Body height. | 136, 153, 148 |
| `ArriveDistance` | Float | BP | N | Arrival distance. | 10 |
| `AngAccelRatio` | Float | — | N | Turn acceleration. |  |
| `MaxAngVelTime` | Float | BP | N | Turn speed limit. | 5, 20, 45 |
| `LegDamageRatio` | Float | — | N | Damage multiplier on legs. |  |
| `FightCameraParameter` | EnemyFightCameraParameter | BP+SL | S | Boss fight camera (per-instance CameraChangeDistanceXY). |  |

## DamagumoCannonAIParameter

Groovy/cannon Long Legs (shoots). Per-instance: HideDamageRatio?, bAlreadyAppear, SearchAreaGoToHome/Caution/Rest

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HideDamageRatio` | Float | BP | S | Damage multiplier while hidden. | 0.30000001192092896 |
| `bAlreadyAppear` | Bool | SL | S | Starts already revealed (skip appear). Per-instance. | true |
| `HappyMisleadRadius` | Float | BP | N | Radius in which it misleads Oatchi. | 220 |
| `BulletParam` | DamagumoCannonBulletParameter | BP | N | Projectiles. |  |
| `ToAttackRatio` | Float | BP | N | Chance to attack. | 0.8999999761581421 |
| `ToAttackTime` | Float | BP | N | Time before attacking. | 10 |
| `InitialAimLocationOffset` | Vector | BP | N | Initial aim offset. |  |
| `ReadyAimLocationOffset` | Vector | BP | N | Ready aim offset. |  |
| `RandomAimStartLocationOffset` | Vector | BP | N | Random aim start offset. |  |
| `RandomAimYawRange` | Float | BP | N | Random aim yaw. | 5 |
| `RandomAimMoveSpeed` | Float | BP | N | Random aim speed. | 10 |
| `FirstShootReadyTimeMin` | Float | — | N | First shot min ready time. |  |
| `FirstShootReadyTimeMax` | Float | — | N | First shot max ready time. |  |
| `ShootReadyTimeMin` | Float | BP | N | Ready time min. | 0.33000001311302185 |
| `ShootReadyTimeMax` | Float | BP | N | Ready time max. | 0.6600000262260437 |
| `ShootAfterTimeMin` | Float | BP | N | After-shot time min. | 0.6000000238418579 |
| `ShootAfterTimeMax` | Float | BP | N | After-shot time max. | 0.6000000238418579 |
| `AimMoveSpeed` | Float | BP | N | Aim speed. | 125 |
| `RayDist` | Float | — | N | Aim ray distance. |  |
| `ShootFlickParameter` | FlickArg | BP | N | Flick of shots. |  |
| `AppearFlickParameter` | FlickArg | BP | N | Flick when appearing. |  |
| `MoveRangeMin` | Float | BP | N | Min move range. | 10 |
| `MoveRangeMax` | Float | BP | N | Max move range. | 200 |
| `TopPrioritySearchDist` | Float | BP | N | Top-priority target distance. | 300 |
| `AppearAttackHitCount` | Int | BP | N | Hits that make it appear. | 30 |
| `WraparoundTimer` | Float | BP | N | Time before circling around. | 3 |
| `CanWraparoundDist` | Float | — | N | Distance allowing circling. |  |
| `ChangeAimTargetRadius` | Float | — | N | Aim target change radius. |  |
| `AimHeightOffsetMin` | Float | — | N | Min aim height offset. |  |
| `AimHeightOffsetMax` | Float | — | N | Max aim height offset. |  |
| `AimHeightOffsetApplyDistMinSq` | Float | BP | N | Squared distance where offset starts. | 40000 |
| `AimHeightOffsetApplyDistMaxSq` | Float | BP | N | Squared distance where offset maxes. | 1000000 |

## DamagumoCannonBulletParameter

Cannon bullets

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BulletActor` | Class | BP | N | Bullet class. |  |
| `BulletActorPoolNum` | Int | BP | N | Pool size. | 25 |
| `Speed` | Float | BP | N | Speed. | 750 |
| `AttackHitAngle` | Float | BP | N | Hit angle tolerance. | 0.004999999888241291 |
| `SpawnOffset` | Vector | — | N | Spawn offset. |  |
| `ShootCountMin` | Int | BP | N | Min shots per volley. | 15 |
| `ShootCountMax` | Int | BP | N | Max shots per volley. | 30 |
| `ShootSetCounts` | DamagumoCannonShootSetCountParameter | BP | N | Volleys by life ratio. |  |

## DamagumoCannonShootSetCountParameter

Volleys

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRatio` | Float | — | N | Applies below this life ratio. |  |
| `ShootSetCountMin` | Int | BP | N | Min volleys. | 3, 2, 1 |
| `ShootSetCountMax` | Int | BP | N | Max volleys. | 3, 2, 1 |

## DamagumoMoveCurves

Walk curves

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HeightCurve` | CurveFloat | BP | N | Body height curve. |  |
| `MoveCurve` | CurveFloat | BP | N | Move curve. |  |
| `RotCurve` | CurveFloat | BP | N | Rotation curve. |  |
| `CenterRotCurve` | CurveFloat | BP | N | Centre rotation curve. |  |
| `LookAtCurve` | CurveFloat | BP | N | Look-at curve. |  |
| `AddTerrainHeightCurve` | CurveFloat | BP | N | Terrain height adjustment curve. |  |

## DemejakoAIParameter

Demejako = burrowing enemy with two big eyes (the eyes are the weak points). Per-instance: BurrowSearchAreaLength, BurrowSearchTagName (+bEnableSoftEdge)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableSoftEdge` | Bool | BP | S | Soft edge around it. | false |
| `LockonTime` | Float | BP | N | Time locked on to a target. | 5 |
| `HideTimeMin` | Float | BP | N | Min time hidden. | 3 |
| `ShowTimeMin` | Float | BP | N | Min time exposed. | 8 |
| `BurrowTimeEye` | Float | — | N | Time burrowed with eyes up. |  |
| `BurrowTimeWait` | Float | BP | N | Burrowed wait time. | 4 |
| `LargeDamageTime` | Float | BP | N | Stun time after heavy damage. | 7 |
| `LargeDamageEndRate` | Float | BP | N | Life ratio to end heavy-damage state. | 0.25 |
| `DisappearProbability` | Float | BP | N | Chance to disappear. | 0 |
| `AttackAfterDamageTime` | Float | — | N | Delay before attacking after damage. |  |
| `AppearAttackTime` | Float | — | N | Attack time on appearing. |  |
| `NoActionBurrowTime` | Float | BP | N | Burrow time without action. | 10 |
| `SearchAreaAttack` | CakeSearchArea | BP | N | Attack area. |  |
| `SearchAreaTurn` | CakeSearchArea | BP | N | Turn area. |  |
| `AttackMoveLength` | Float | — | N | Lunge length. |  |
| `EyeMaxLife` | Float | BP | N | HP of each eye. | 300 |
| `MaxLidRatio` | Float | — | N | Max eyelid closure. |  |
| `MaxLidAngDeg` | Float | — | N | Max eyelid angle. |  |
| `EyeMaterialControlSpeedRatio` | Float | — | N | Eye material speed. |  |
| `EyeDieScale` | Float | — | N | Eye scale on death. |  |
| `DemejakoStateMoveParameter` | DemejakoStateMoveParameter | BP | N | Turning movement. |  |
| `AttackFlickArg` | FlickArg | BP | N | Attack flick. |  |
| `GetupFlickArg` | FlickArg | BP | N | Get-up flick. |  |
| `DisappearFlickArg` | FlickArg | BP | N | Disappear flick. |  |
| `PointerParamEyeL` | DemejakoPointerParameter | BP | N | Targetable angle for the left eye. |  |
| `PointerParamEyeR` | DemejakoPointerParameter | BP | N | Targetable angle for the right eye. |  |
| `BurrowActorClass` | Class | BP | N | Burrow actor class. |  |
| `BurrowSearchAreaLength` | Float | SL | S | Distance searched for burrow holes. Per-instance. | 2000 |
| `BurrowSearchTagName` | Name | SL | S | Tag of burrow holes it uses. Per-instance. | "Demejako001", "Demejako01" |
| `BurrowSearchAreaBound` | RAngBound2 | BP | N | Angular bounds for burrow search. |  |
| `bBurrowKill` | Bool | — | N | Kills Pikmin when burrowing. |  |
| `EyeDamageEffect` | ParticleSystem | BP | N | Eye damage effect. |  |
| `EyeDieDamage` | Float | BP | N | Damage to the body when an eye dies. | 50 |
| `AttackFlickBoundParam` | DemejakoBoundParameter | BP | N | Attack flick bound. |  |
| `FlickToCarrierArg` | FlickArg | — | N | Flick carriers. |  |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |
| `EyeDamageFlickArg` | FlickArg | BP | N | Flick when an eye is hit. |  |
| `FaceMsgParam` | DemejakoFaceMessageParameter | BP | N | Hint message. |  |

## DemejakoBoundParameter

Sphere bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius` | Float | BP | N | Radius. | 60 |
| `Offset` | Vector | BP | N | Offset. |  |
| `BoneName` | Name | — | N | Bone. |  |

## DemejakoBurrowParameter

Demejako burrow hole (per-instance)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AreaBound` | RAngBound2 | SL | S | Angular sectors (RAngBound2 list) around the burrow in which the Demejako can emerge/attack. |  |

## DemejakoFaceMessageParameter

Hint

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CheckRadius` | Float | — | N | Radius. |  |
| `CheckTime` | Float | BP | N | Time. | 3 |

## DemejakoMoveParameter

Movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxSpeed` | Float | — | N | Max speed. |  |
| `SpeedAccelRatio` | Float | — | N | Acceleration. |  |
| `StopAccelRatio` | Float | — | N | Deceleration. |  |
| `MaxAngVelTime` | Float | BP | N | Turn speed limit. | 10 |
| `AngAccelRatio` | Float | — | N | Turn acceleration. |  |

## DemejakoPointerParameter

Eye targeting

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TargetableBaseDirAng` | Float | — | N | Base direction. |  |
| `TargetableAng` | Float | BP | N | Targetable angle. | 90 |

## DemejakoStateMoveParameter

Movement per state

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Turn` | DemejakoMoveParameter | BP | N | Turning movement. |  |

## DiscoDamagumoAIParameter

Groovy Long Legs (disco lights, dance, charm)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BigStepAttackHeight` | Float | BP | N | Big stomp height. | 110 |
| `BigStepPressRadiusXY` | Float | BP | N | Big stomp radius. | 40 |
| `bAlreadyAppear` | Bool | — | N | Starts revealed. |  |
| `HideHappyAppealDist` | Float | — | N | Distance Oatchi detects it hidden. |  |
| `HideHappyAppealBowCount` | Int | — | N | Oatchi bows when detecting. |  |
| `LightNormalEftCustomRequestParam` | EftCustomRequestParam | BP | N | Normal light effect. |  |
| `LightCautionEftCustomRequestParam` | EftCustomRequestParam | BP | N | Caution light effect. |  |
| `LightDanceEftCustomRequestParam` | EftCustomRequestParam | BP | N | Dance light effect. |  |
| `ForceAppearDelayTime` | Float | BP | N | Delay before forced appear. | 2 |
| `HideDamageRatio` | Float | — | N | Damage multiplier hidden. |  |
| `AppearFlickArg` | FlickArg | BP | N | Appear flick. |  |
| `AppearLaunchParameter` | DiscoDamagumoLaunchParameter | BP | N | Appear launch. |  |
| `CautionDamageCount` | Int | BP | N | Hits to enter caution. | 40 |
| `NormalTime` | Float | — | N | Normal state time. |  |
| `ShortNormalTime` | Float | — | N | Short normal time. |  |
| `CautionTime` | Float | BP | N | Caution state time. | 25 |
| `CautionMotionSpeedRate` | Float | — | N | Caution animation speed. |  |
| `DownDamageCount` | Int | BP | N | Hits to knock down. | 300 |
| `ChangeStateDamageCountFromHappy` | Int | BP | N | Oatchi hits to change state. | 15 |
| `ChangeStateCrushCountFromHappy` | Int | BP | N | Oatchi crushes to change state. | 5 |
| `CrushDelayTime` | Float | — | N | Crush delay. |  |
| `LegDamageRatio` | Float | — | N | Leg damage multiplier. |  |
| `DownTime` | Float | — | N | Down time. |  |
| `DownEndDamage` | Float | BP | N | Damage to end the down early. | 120 |
| `DanceMotionSpeedRate` | Float | BP | N | Dance speed. | 2 |
| `SearchLightRangeXY` | Float | BP | N | Light cone radius. | 170 |
| `SearchLightRangeZ` | Float | BP | N | Light cone height. | 200 |
| `DanceWalkFlickRatio` | Float | BP | N | Chance to flick while dancing. | 0.30000001192092896 |
| `CautionCharmParameter` | CharmParameter | BP | N | Charm circles in caution. |  |
| `DanceCharmParameter` | CharmParameter | BP | N | Charm circles in dance. |  |
| `ChangeStatusWaitTime` | Float | — | N | Status change wait. |  |
| `ResidentEffectOffset` | Vector | BP | N | Effect offset. |  |
| `BigStepLifeRatio` | Float | — | N | Life ratio for big steps. |  |
| `BigStepLaunchParameter` | DiscoDamagumoLaunchParameter | BP | N | Big step launch. |  |
| `BigStepStickersFlickArg` | FlickArg | BP | N | Big step flick. |  |
| `StepPatternDataTable` | DataTable | BP | N | Step pattern table. |  |
| `CautionLaunchParameter` | DiscoDamagumoLaunchParameter | BP | N | Caution launch. |  |
| `DanceLaunchParameter` | DiscoDamagumoLaunchParameter | BP | N | Dance launch. |  |
| `CautionWalkMaxDist` | Float | BP | N | Caution step distance. | 120 |
| `RopeBranchActor` | Class | BP | N | Rope actor class. |  |
| `RopeBranchOffsetZ` | Float | — | N | Rope height offset. |  |

## DiscoDamagumoLaunchParameter

Stomp launch

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius` | Float | BP | N | Radius. | 290, 250, 0 |
| `Speed` | Float | BP | N | Launch speed. | 350, 300, 0 |
| `bUseFlick` | Bool | BP | N | Use FlickArg. | true |
| `FlickArg` | FlickArg | BP | N | Flick. |  |

## DodoroAIParameter

Dodoro = Smoky Progg (hatches from an egg, follows a spline route, attacks Lumiknolls). Per-instance: bSpawnFromEgg, SplineRoutePathTag, SubSplineRoutePathTag, RefObstacleGenID

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bSpawnFromEgg` | Bool | — | S | Spawned from a DodoroEgg. |  |
| `SplineRoutePathTag` | Name | — | S | Tag of the main spline route. |  |
| `SubSplineRoutePathTag` | Name | — | S | Tag of the secondary route. |  |
| `RefObstacleGenID` | Int | — | S | Generator ID of an obstacle it references. |  |
| `NightVitality` | Float | — | N | HP at night. |  |
| `MiasmaParam` | DodoroMiasmaParameter | BP | N | Poison miasma. |  |
| `StepParam` | DodoroStepParameter | BP | N | Step/climb handling. |  |
| `RoarParam` | DodoroRoarParameter | BP | N | Roar. |  |
| `BulletParam` | DodoroBulletParameter | BP | N | Curse ball projectiles. |  |
| `WasurenagusaParam` | DodoroWasurenagusaParameter | BP | N | Lumiknoll attack behaviour. |  |
| `ChaseParam` | DodoroChaseParameter | BP | N | Chase. |  |
| `CorrectWaterHeightTime` | Float | — | N | Water height correction time. |  |
| `LookAtParam` | DodoroLookAtParameter | BP | N | Look-at blending. |  |
| `ZukanParam` | DodoroZukanParameter | BP | N | Piklopedia. |  |
| `FrozenMaterial` | MaterialInstance | BP | N | Frozen material. |  |

## DodoroBulletParameter

Curse balls

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BulletActor` | Class | BP | N | Class. |  |
| `Altitude` | Float | — | N | Arc height. |  |
| `CustomGravityRate` | Float | BP | N | Gravity. | 0.125 |
| `ArriveAng` | Float | BP | N | Turn tolerance. | 8 |
| `Range` | CarrotRangeF | BP | N | Distance range. |  |
| `ThisSideOfsForWasurenagusa` | Float | BP | N | Aim offset vs Lumiknoll. | 75 |
| `ThisSideOfsForPlayer` | Float | BP | N | Aim offset vs player. | 75 |
| `AfterWaitTime` | Float | BP | N | Wait after. | 2 |
| `AfterDisableFlickTime` | Float | BP | N | Flick-disabled time after. | 2 |

## DodoroChaseAngVelTimeParameter

Turning

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AngleDistanceBase` | Float | — | N | Angle base. |  |
| `SubAngVelTime` | Float | BP | N | Turn time subtracted. | 4 |
| `AddAngVelTime` | Float | BP | N | Turn time added. | 2 |
| `AngVelTimeMin` | Float | BP | N | Min. | 4.5 |
| `AngVelTimeMax` | Float | — | N | Max. |  |
| `ChangeRoarTime` | Float | BP | N | Time before roaring. | 4 |

## DodoroChaseParameter

Chase

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchTargetArea` | CakeSSphereSearchArea | — | N | Target area. |  |
| `ReturnAttackParam` | DodoroChaseToAttackParameter | — | N | Return to attack. |  |
| `ChaseAngVelTimeParam` | DodoroChaseAngVelTimeParameter | BP | N | Chase turning. |  |
| `ShotBulletAngVelTimeParam` | DodoroChaseAngVelTimeParameter | BP | N | Turning when shooting. |  |
| `PathMoveParam` | DodoroChasePathMoveParameter | BP | N | Path movement. |  |
| `CurseBallTargetPriority` | EDodoroCurseBallTargetPriority | BP | N | Who curse balls target first (e.g. Pikmin). | "EDodoroCurseBallTargetPriority::Pikmin" |

## DodoroChasePathMoveParameter

Path move

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PathMoveTime` | Float | BP | N | Time on path. | 30 |
| `StartPathMoveAng` | Float | — | N | Start angle. |  |
| `StopPathMoveAng` | Float | — | N | Stop angle. |  |
| `ArriveDist` | Float | — | N | Arrival distance. |  |

## DodoroEggAIParameter

Smoky Progg egg (hatches after a timer). Per-instance: SplineRoutePathTag, SpawnTimer, bUseParentDropInfo, bOnceDodoroAppearDemo, SpawnTimerAfterDemo, SubSplineRoutePathTag, RefObstacleGenID

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpawnActorClass` | Class | — | S | Class hatched. |  |
| `PoolActor` | Class | — | N | Pooled actor class. |  |
| `PoolActorType` | EGenericActorPoolType | — | N | Pool type. |  |
| `SplineRoutePathTag` | Name | SL | S | Route tag passed to the hatchling. | "DodoroRoutePoint010", "DodoroRoutePoint011", "DodoroRoutePoint012" |
| `SubSplineRoutePathTag` | Name | SL | S | Secondary route tag. | "GsplineDodoro_test", "GsplineDodoro_test2" |
| `RefObstacleGenID` | Int | SL | S | Obstacle generator ID. | 5 |
| `BreakParam` | DodoroEggBreakParam | — | N | Cracking/breaking. |  |
| `SpawnTimer` | Float | SL | S | Seconds before it hatches. | 150, 140, 100 |
| `ZukanSpawnTime` | Float | SL | S | Hatch time in the Piklopedia. | 0 |
| `bOnceDodoroAppearDemo` | Bool | SL | S | Play the appearance cutscene only once. | true |
| `SpawnTimerAfterDemo` | Float | SL | S | Hatch time after the cutscene has played. | 0.1 |
| `SpawnDemoTime` | Float | — | N | Cutscene time. |  |
| `SpawnPosOfs` | Vector | — | N | Spawn offset. |  |
| `SpawnEffect` | ParticleSystem | — | N | Spawn effect. |  |
| `SpawnEftOfs` | Vector | — | N | Effect offset. |  |
| `DropStationPieceNum` | Int | — | N | Pieces dropped. |  |
| `bUseParentDropInfo` | Bool | SL | S | Hatchling uses the egg's drop table. | true |
| `KillWaitFrame` | Int | — | N | Frames before removing. |  |
| `bReqOnceDemo` | Bool | — | N | Request a once-only cutscene. |  |
| `SpawnTimerForSnapshot` | Float | — | N | Timer used for snapshots. |  |

## DodoroEggCrackLifeRateParam

Crack stage

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CrackLifeRate` | Float | — | N | Life ratio for the stage. |  |
| `MaterialSlotName` | Name | BP | N | Material slot swapped. | "T01!!2", "T02!!2", "T02!!3" |

## DodoroLookAtParameter

Look-at

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookAtBlendOn` | BlendParam | BP | N | Blend in. |  |
| `LookAtBlendOff` | BlendParam | BP | N | Blend out. |  |

## DodoroMiasmaForFlashParam

Glow flash interaction

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MiasmaBoneNameForFlash` | Name | — | N | Bone. |  |
| `MiasmaRadiusForFlash` | Float | BP | N | Radius. | 55 |
| `MiasmaHalfHeightForFlash` | Float | — | N | Half height. |  |
| `MiasmaPosOfsForFlash` | Vector | BP | N | Offset. |  |

## DodoroMiasmaParameter

Miasma

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MiasmaEftReqParam` | EftCustomRequestParam | BP | N | Effect. |  |
| `MiasmaBodyHitOfs` | Vector | BP | N | Hit offset. |  |
| `ResidentMiasmaRadius` | Float | BP | N | Always-on radius. | 50 |
| `MiasmaTailEffect` | ParticleSystem | BP | N | Trail effect. |  |
| `MiasmaTailPosOfs` | Vector | BP | N | Trail offset. |  |
| `MiasmaRadius` | Float | — | N | Radius. |  |
| `MiasmaInterval` | Float | — | N | Interval. |  |
| `MiasmaLife` | Float | BP | N | Lifetime. | 2.5 |
| `MiasmaFlickArg` | FlickArg | — | N | Flick. |  |
| `MiasmaForFlashParam` | DodoroMiasmaForFlashParam | BP | N | Miasma vs Glow flash. |  |

## DodoroRoarParameter

Roar

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RoarRadius` | Float | — | N | Radius. |  |
| `RoarHalfHeight` | Float | BP | N | Half height. | 180 |
| `RoarWaitTime` | Float | — | N | Wait. |  |

## DodoroStepCheckRayParameter

Probe

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ForwardOffset` | Float | BP | N | Forward offset. | 150, 65 |
| `HeightOfs` | Float | BP | N | Height offset. | 150 |
| `RayLength` | Float | BP | N | Length. | 300 |

## DodoroStepParameter

Steps

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StepCheckRayParam` | DodoroStepCheckRayParameter | BP | N | Ray probes. |  |
| `CheckStepOffset` | Float | BP | N | Probe offset. | 50 |
| `CheckStepRayHeightOfs` | Float | — | N | Probe height. |  |
| `CheckStepRayLength` | Float | — | N | Probe length. |  |
| `StepHeight` | Float | — | N | Step height. |  |
| `CanClimbHeight` | Float | — | N | Max climb. |  |
| `ClimbVelocityZ` | Float | — | N | Climb speed. |  |
| `ArriveStepDiffHeight` | Float | — | N | Arrival height difference. |  |
| `ArriveStepGoalDist` | Float | — | N | Arrival distance. |  |
| `bEnableStepDown` | Bool | BP | N | Can step down. | true |
| `bEnableClimbStep` | Bool | — | N | Can climb steps. |  |
| `StepDownHeight` | Float | — | N | Step-down height. |  |
| `StepDownHeightList` | Float | BP | N | Step-down heights. |  |

## DodoroWasurenagusaParameter

Lumiknoll attacking

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchTargetRadius` | Float | — | N | Radius. |  |
| `SearchTargeHalfHeight` | Float | — | N | Half height. |  |
| `DummyAttackCount` | Int | — | N | Fake attacks. |  |
| `IgnoreDummyTime` | Float | — | N | Ignore fake targets time. |  |
| `WanderRadiusMin` | Float | — | N | Min wander radius. |  |
| `WanderRadiusMax` | Float | — | N | Max wander radius. |  |
| `WanderAngle` | Float | — | N | Wander angle. |  |
| `WanderTime` | Float | BP | N | Wander time. | 20 |
| `ReturnAttackTime` | Float | — | N | Return-to-attack time. |  |
| `MovetToTargetPosCalcAng` | Float | BP | N | Approach angle. | 75 |

## DodoroZukanParameter

Piklopedia

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSearchArea | BP | N | Search area. |  |

## DokuNamekoAIParameter

DokuNameko = poison mushroom enemy that revives carcasses/creates sticky floors

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ReviveFaceMessageInterval` | Float | BP | N | Interval between revive hints. | 15 |
| `GenerateParam` | DokuNamekoGenerateParameter | BP | N | Spawning mushrooms/sticky floors. |  |
| `RunFlickTime` | Float | BP | N | Flick interval while running. | 0.699999988079071 |
| `RunFlickArg` | FlickArg | BP | N | Running flick. |  |
| `CarcassBound` | AngBound2 | BP | N | Angular bound around carcasses. |  |
| `bRiviveCarcassOnly` | Bool | BP | N | Only revives carcasses. | true |

## DokuNamekoGenerateParameter

Generation

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bGenerateMush` | Bool | — | N | Spawns mushrooms. |  |
| `SpawnMush` | Class | BP | N | Mushroom class. |  |
| `BirthMushRadiusMin` | Float | — | N | Min radius. |  |
| `BirthMushRadiusMax` | Float | — | N | Max radius. |  |
| `MushRadiusZ` | Float | — | N | Height range. |  |
| `bGenerateStickyFloor` | Bool | BP | N | Spawns sticky floors. | true |
| `SpawnStickyFloor` | Class | BP | N | Sticky floor class. |  |
| `GenerateStickyFloorLocationTagName` | Name | — | N | Location tag. |  |
| `CanDamageRadius` | Float | BP | N | Damage radius. | 200 |
| `StickyFloorInvisibleTime` | Float | — | N | Invisible time. |  |
| `StickyFloorRadiusZ` | Float | — | N | Height range. |  |

## DownFloorAIComponent

Falling floors

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDisableAirWall` | Bool | SL | S | Disable the associated air wall. | true |

## DropActorParameter

Drop spawn placement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDropNotifyTime` | Bool | BP+SL | N | Spawn drops at an animation-notify time instead of immediately on death. | false |
| `Index` | Int | BP+SL | S | Index used for the drop (serialized as -1 by default – Dandori's "255s"). | -1 |
| `BoneName` | Name | BP+SL | S | Bone the drops spawn from. | "None" |
| `LocalOffset` | Vector | BP+SL | S | Offset from that bone. |  |
| `Vel` | Vector | BP+SL | S | Initial launch velocity of dropped items. |  |
| `RandVel` | Vector | BP+SL | S | Random velocity added per item. |  |
| `DropOption` | UInt16 | BP+SL | S | uint16 option flags for dropping. | 68, 128, 384 |
| `FixedHotExtractDropNum` | Int | BP+SL | S | Fixed number of nectar ("hot extract") drops, overriding random counts. | 0 |
| `bOverrideInitLocation` | Bool | BP+SL | S | Use OverrideInitLocation as the spawn position. | false, true |
| `OverrideInitLocation` | Vector | BP+SL | S | Explicit spawn position for drops. |  |

## DropConditionParameter

Drop condition (all must pass; 0x01DB7BA0)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DropCond` | EDropCondition | BP+SL | T | EDropCondition: 1 NoRescueSurvivor / 2 RescueSurvivor (castaway DropCondName not/already rescued), 3 NoSalvageOtakara / 4 SalvageOtakara (treasure DropCondName not/already collected), 5 NoSalvageDropItem / 6 SalvageDropItem (DropCondInt not/already in this generator's collected-drop list), 7 PlayedDemo (cutscene DropCondDemo already seen). | "EDropCondition::NoSalvageDropItem", "EDropCondition::SalvageDropItem", "EDropCo |
| `DropCondInt` | Int | BP+SL | T | Integer operand (drop-item index) for the SalvageDropItem conditions. | 0, -1 |
| `DropCondName` | Name | BP+SL | T | Name operand (castaway or treasure name) for the Survivor/Otakara conditions. | "None", "GOtaBanana", "OTAHEROPARTSP" |
| `DropCondDemo` | EDemoFlagType | BP+SL | T | EDemoFlagType cutscene that must have been played for PlayedDemo. | "EDemoFlagType::None", "EDemoFlagType::SuckNectar" |

## DropItemParameter

One drop slot

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpawnMiniInfo` | DropSpawnMiniInfo | BP+SL | S | What to spawn (actor class, custom param, permissions, optional territory), see DropSpawnMiniInfo. |  |
| `UniqueId` | UInt64 | — | S | 64-bit unique id of the slot (serialized first; Dandori reads it as "id"+"flags" 32-bit halves; -1 when unused). |  |
| `MinNum` | Int | BP+SL | T | Minimum number of this item to drop. | 1, 2, 5 |
| `MaxNum` | Int | BP+SL | T | Maximum number of this item to drop. | 1, 2, 5 |
| `DropRatio` | Float | BP+SL | T | Probability (0..1) that this slot drops. | 1, 0.75, 0.2 |
| `bRegistGenerator` | Bool | BP+SL | T | Register the spawned drop with the level generator so it is persisted/saved like a placed object (and tracked for Salvage conditions). | false, true |
| `DropConditions` | DropConditionParameter | BP+SL | T | Extra conditions that must all pass for the slot to drop, see DropConditionParameter (checked in 0x01DB7BA0). |  |

## DropParameter

Drop table (the Dandori Desktop "inventory")

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DropItemParameter` | DropItemParameter | BP+SL | S | Array of drop slots; each slot is independently rolled (see DropItemParameter). |  |
| `DebugUniqueIdList` | UInt64 | — | S | List of uint64 unique IDs (serialized after the slots; Dandori's "inventory flag loop"). Debug/bookkeeping of slot UniqueIds. |  |
| `DropActorParameter` | DropActorParameter | BP+SL | S | Where/how drops spawn (bone, offsets, velocity), see DropActorParameter. |  |
| `bEnableZukanDrop` | Bool | BP+SL | T | If false, nothing drops while in the Piklopedia (Zukan) viewer game rule (0x01DB8E70). | false |
| `bEnableFreezeBothDrop` | Bool | BP+SL | S | Frozen kills produce both the normal drop and the frozen drop (version-gated per-instance bool). | true, false |

## DropSpawnMiniInfo

Spawn descriptor used by drops, spawners and pearls

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DropActor` | Class | BP+SL | S | Blueprint class to spawn (e.g. GOtaXXX_C treasure, pellets, nectar). | "Null" |
| `CustomParameter` | Name | BP+SL | S | Free-form FName passed to the spawned actor (e.g. SVSleep000 = castaway NPC key, UseSpawnerTerritory for Dweevils). | "None", "SVSleep000", "BasedOnSpawner" |
| `CustomFloatParameter` | Float | BP+SL | S | Free-form float passed to the spawned actor. | 0, 150, 120 |
| `GameRulePermissionFlag` | UInt16 | BP+SL | T | EDropGameRulePermissionFlag bitmask of game modes in which it may spawn: 1 Area day, 2 Area night, 4 Cave, 8 Hero (Olimar's Shipwreck Tale), 256 Mission/Dandori challenge (cave bingo/collection/extra), 4096 VS (Dandori Battle). 0 = always; negative = never (0x01DB8E70). | 269, 2, 0 |
| `bSetTerritory` | Bool | BP+SL | S | Give the spawned actor its own territory (uses Territory below). | false, true |
| `Territory` | CylinderSearchArea | BP+SL | S | Territory cylinder for the spawned actor when bSetTerritory is set. |  |

## DweevilAIParameter

Dweevils (steal treasure/bombs; elemental attacks). Per-instance: OtakaraParam (bInitShoulder, bEnableWallClimb, bUpdateTerritoryWhenShoulder, OtakaraSearchArea, NewTerritoryPos...), EscapeParam.bEnableWallCheck

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableWaitEnd` | Bool | — | S | Ends waiting state early. |  |
| `DweevilType` | EDweevilType | BP | N | EDweevilType (Elec, Gas, Ice, Fire...). | "EDweevilType::Elec", "EDweevilType::Gas", "EDweevilType::Ice" |
| `AttackParam` | DweevilAttackParam | BP | N | Elemental attack. |  |
| `OtakaraParam` | DweevilOtakaraParam | BP+SL | S | Treasure-stealing behaviour. |  |
| `EscapeParam` | DweevilEscapeParam | BP | S | Escape behaviour. |  |
| `BombChaseParam` | DweevilBombChaseParam | BP | N | Carrying bombs toward players. |  |
| `FoundOutWaitTime` | Float | — | N | Wait after being found out. |  |
| `AppealToHappyParamWithOtakara` | AppealToHappyParam | BP | N | Oatchi detection when holding treasure. |  |
| `AppealToHappyParamWithBomb` | AppealToHappyParam | BP | N | Oatchi detection when holding a bomb. |  |
| `EsaParam` | DweevilEsaParam | — | N | Lure/food behaviour. |  |

## DweevilAttackParam

Elemental attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ChargeEffect` | ParticleSystem | BP | N | Charge effect. |  |
| `AttackEffect` | ParticleSystem | BP | N | Attack effect. |  |
| `AttackType` | EAttackEventType | BP | N | EAttackEventType (Denki, Fire, Water, Freeze...). | "EAttackEventType::Denki", "EAttackEventType::Fire", "EAttackEventType::Doku" |
| `AttackLoopTime` | Float | — | N | Attack duration. |  |
| `AttackRadius` | Float | — | N | Radius. |  |
| `PlayerBlowPowerCoef` | Float | — | N | Captain knock-back scale. |  |
| `BlowPowerMin` | Float | — | N | Min knock-back. |  |
| `BlowPowerMax` | Float | — | N | Max knock-back. |  |

## DweevilBombChaseParam

Carrying a bomb toward players

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ShoulderBombTerritoryRadius` | Float | — | N | Territory radius while carrying a bomb. |  |
| `ShoulderBombTerritoryHeightDiff` | Float | — | N | Territory height range. |  |
| `ShoulderBombStopChaseRadius` | Float | — | N | Stop chasing within this radius. |  |
| `ShoulderBombChaseSpeed` | Float | — | N | Chase speed. |  |
| `ExplosionWaitRate` | Float | BP | N | Fuse wait rate. | 0.10000000149011612 |

## DweevilEscapeParam

Escape. Per-instance: bEnableWallCheck

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EscapeSearchRadius` | Float | — | N | Threat radius. |  |
| `EscapeSearchHeightDiff` | Float | — | N | Threat height range. |  |
| `EscapeEndDistance` | Float | — | N | Stop escaping at this distance. |  |
| `UpdateEscapeDirInterval` | Float | — | N | Direction update interval. |  |
| `bEnableWallCheck` | Bool | BP | S | Check walls while escaping. | true |
| `HitWallTime` | Float | BP | N | Time after hitting a wall before changing direction. | 2 |

## DweevilFallAppearParam

Items a Dweevil drops in with

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BombActor` | Class | BP | N | Bomb class. |  |
| `IceBombActor` | Class | BP | N | Ice blast class. |  |

## DweevilOtakaraParam

Treasure carrying

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bInitShoulder` | Bool | SL | S | Starts carrying treasure on its back. | true |
| `FallAppearParam` | DweevilFallAppearParam | BP | N | Items it falls with. |  |
| `OtakaraSearchWaitTime` | Float | — | N | Wait between treasure searches. |  |
| `bUpdateTerritoryWhenShoulder` | Bool | SL | S | Move territory when it picks up treasure. | true |
| `bUseNewTerritoryWhenShoulder` | Bool | SL | S | Use NewTerritoryPos after picking up. | true |
| `NewTerritoryPos` | Vector | SL | S | Territory centre after picking up. |  |
| `OtakaraSearchArea` | CylinderSearchArea | BP+SL | S | Treasure search area. |  |
| `ShoulderableArea` | CylinderSearchArea | — | N | Area to pick up treasure. |  |
| `ShoulderableDistance` | Float | BP | N | Pick-up distance. | 50 |
| `ShoulderableHeightDiff` | Float | — | N | Pick-up height difference. |  |
| `bEnableWallClimb` | Bool | SL | S | Can climb walls. | true |
| `WallClimbAngle` | Float | — | N | Max climb angle. |  |
| `CorrectUpAcceleration` | Float | — | N | Upward correction acceleration. |  |
| `CorrectUpVelocityMax` | Float | — | N | Max upward correction. |  |
| `StopCorrectUpVelocityTime` | Float | — | N | Stop correction time. |  |
| `bUseOtakaraShoulderOffset` | Bool | — | N | Use custom treasure offset. |  |
| `OtakaraShoulderOffset` | Transform | BP | N | Treasure offset. |  |
| `OtakaraLife` | Float | — | N | Treasure HP (hits to drop it). |  |
| `OtakaraDropVelocityXY` | Float | — | N | Treasure drop speed horizontal. |  |
| `OtakaraDropVelocityZ` | Float | — | N | Treasure drop speed vertical. |  |
| `OtakaraDropOffset` | Vector | — | N | Drop offset. |  |
| `OtakaraDropMass` | Float | — | N | Drop mass. |  |
| `WaitActionIntervalMin` | Float | — | N | Min idle interval. |  |
| `WaitActionIntervalMax` | Float | — | N | Max idle interval. |  |

## EffectColorDTParam

Colour data table

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ColorDTType` | EEffectNotifyColorDTType | BP | N | Which colour data table. | "EEffectNotifyColorDTType::DT_PlayerEffectColor" |
| `ColorColum` | EPlayerEffectColorColumn | BP | N | Column in that table. | "EPlayerEffectColorColumn::Warp" |

## EftCustomRequestParam

Effect spawn request (used by many enemies)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ColorType` | EEffectNotifyColorType | BP | N | EEffectNotifyColorType – how the effect is coloured (e.g. from terrain). | "EEffectNotifyColorType::Terrain" |
| `ParticleSystem` | ParticleSystem | BP | N | Particle system to spawn. |  |
| `TerrainEffect` | EftRequest | BP | N | Terrain-dependent effect request. | "Null" |
| `LocationSocketName` | Name | BP | N | Socket for location. | "B_j000", "root", "s_j010_weak00" |
| `LocationOffset` | Vector | BP | N | Location offset. |  |
| `RotationSocketName` | Name | BP | N | Socket for rotation. | "B_j000", "None" |
| `RotationOffset` | Rotator | — | N | Rotation offset. |  |
| `ScaleSocketName` | Name | BP | N | Socket for scale. | "None" |
| `ScaleOffset` | Vector | — | N | Scale offset. |  |
| `bIsAttached` | Bool | BP | N | Attach the effect to the socket. | false |
| `bUseParentRotation` | Bool | BP | N | Follow parent rotation. | false |
| `bUseParentScale` | Bool | BP | N | Follow parent scale. | false |
| `bUseTerrainEffect` | Bool | BP | N | Use TerrainEffect. | false |
| `bUseLastCollideTerrain` | Bool | BP | N | Use the last collided terrain type. | false |
| `bUseOneScale` | Bool | BP | N | Uniform scale. | false |
| `EffectColorDTParam` | EffectColorDTParam | — | N | Colour data-table parameters. |  |
| `FloatParams` | EftCustomRequestFloatParam | — | N | Named float parameters passed to the effect. |  |

## EggAIParameter

Eggs (break open to release nectar/enemies). Per-instance: bDropCaveComplete

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BreakVel` | Float | — | N | Impact speed that breaks it. |  |
| `CrackLifeRatio` | Float | — | N | Life ratio at first crack. |  |
| `CrackSecondLifeRatio` | Float | — | N | Life ratio at second crack. |  |
| `BabyCrowAppearRatioPerMinute` | Float | — | N | Chance per minute a baby crow hatches. |  |
| `BabyCrowAppearInitCollisionRatio` | Float | — | N | Initial collision ratio for hatchling. |  |
| `BabyCrowDropVelZ` | Float | — | N | Hatchling launch speed. |  |
| `MiniMochiAppearRatioPerMinute` | Float | — | N | Chance per minute a Mini Mochi hatches. |  |
| `MiniMochiAppearInitCollisionRatio` | Float | — | N | Initial collision ratio. |  |
| `MiniMochiDropVelZ` | Float | — | N | Launch speed. |  |
| `bDropCaveComplete` | Bool | SL | S | Drops even after the cave is complete (per-instance). | true |

## ElecMushiAIParameter

Electric bug pairs (Anode beetles linking with a current)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ChargeEffect` | ParticleSystem | BP | N | Charge effect. |  |
| `DischargeRootEffect` | ParticleSystem | BP | N | Arc root effect. |  |
| `DischargeEffect` | ParticleSystem | BP | N | Arc effect. |  |
| `SingleDischargeEffect` | ParticleSystem | BP | N | Solo discharge effect. |  |
| `DischargeOffset` | Vector | BP | N | Arc offset. |  |
| `ChargeWaitTime` | Float | BP | N | Wait before charging. | 2.5 |
| `ChargeTime` | Float | — | N | Charge time. |  |
| `SearchPartnerTime` | Float | — | N | Time to search for a partner. |  |
| `SearchPartnerRadius` | Float | — | N | Partner search radius. |  |
| `DischargeTime` | Float | — | N | Arc duration. |  |
| `ThunderAttackHalfWidth` | Float | — | N | Arc half width. |  |
| `ThunderAttackHalfHeight` | Float | — | N | Arc half height. |  |
| `BodyAttackRadius` | Float | — | N | Body shock radius. |  |
| `BodyAttackOffset` | Vector | — | N | Body shock offset. |  |
| `StruggleTime` | Float | — | N | Struggle time when flipped. |  |
| `BombDamageRate` | Float | BP | N | Bomb damage multiplier. | 0.10000000149011612 |
| `SingleDischargeTime` | Float | BP | N | Solo discharge time. | 1 |
| `SingleDischargeBodyAttackRadius` | Float | — | N | Solo shock radius. |  |

## EnemyFightCameraParameter

Boss battle camera

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Name` | Name | BP | N | Preset name. | "FreeEffectsOpacity", "Fly", "FlyNear" |
| `NearSingle` | CameraDistStepParameter | BP | N | Near camera (single player). |  |
| `MiddleSingle` | CameraDistStepParameter | BP | N | Middle camera (single). |  |
| `FarSingle` | CameraDistStepParameter | — | N | Far camera (single). |  |
| `NearSplit` | CameraDistStepParameter | BP | N | Near camera (split screen). |  |
| `MiddleSplit` | CameraDistStepParameter | BP | N | Middle camera (split). |  |
| `FarSplit` | CameraDistStepParameter | — | N | Far camera (split). |  |
| `CameraChangeDistanceXY` | Float | BP+SL | S | Distance to the boss at which the fight camera engages (per-instance for Long Legs). | 600 |
| `StartEndInterpolateParameter` | CameraStartEndInterpolateParameter | BP | N | Blend in/out. |  |

## ExcavationAIParameter

Dig spots (buried treasure/items). Per-instance (ExcavationParam): SaveSlotRadiusRatio, SaveLaunchVelZ, BuryEndItemRate, bWorkEndKill, WorkedHeight

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ExcavationType` | EExcavationType | BP | N | Size L/M/S. | "EExcavationType::L", "EExcavationType::M", "EExcavationType::Under" |
| `DepthPerPower` | Float | BP | N | Depth dug per unit of Pikmin work. | 0.009999999776482582, 0.019999999552965164, 0.0010000000474974513 |
| `ItemRadius` | Float | — | N | Radius of buried items. |  |
| `GoalDepth` | Float | BP | N | Depth when fully dug. | 50, 30, 15 |
| `PortalGoalDepth` | Float | BP | N | Depth when it hides a portal. | 10 |
| `SaveSlotInterval` | Float | BP | N | Spacing of saved item slots. | 2.950000047683716 |
| `SaveSlotRadiusRatio` | Float | BP+SL | S | Radius ratio of saved item slots. | 1.011754, 0.955814, 0.821925 |
| `SaveLaunchVelZ` | Float | BP+SL | S | Launch speed of items popped out. | 4, 2.2, 3 |
| `BuryEndItemRate` | Float | BP+SL | S | Dig progress at which items are released. | 0.85, 0.75, 0.9 |
| `bWorkEndKill` | Bool | SL | S | Remove the dig spot when finished. | true |
| `FillRatio` | Float | — | N | Fill ratio. |  |
| `ColUpSpeed` | Float | BP | N | Collision rise speed. | 30 |
| `SoilFilledScale` | Float | — | N | Soil scale when filled. |  |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `RequestCompleteRumbleName` | Name | BP | N | Rumble on completion. | "Obj_Excavation_M", "Obj_Excavation_S" |
| `CameraShakeType` | ECameraShakeType | — | N | Camera shake size. |  |
| `ShakeCameraParameter` | ShakeCameraParameter | — | N | Camera shake. |  |
| `WorkedHeight` | Float | BP | S | Height of the mound. | 31.5, 23.5, 17.5 |
| `WorkedRadius` | Float | BP | N | Radius of the mound. | 220, 135, 80 |
| `BreakEffect` | ParticleSystem | — | N | Break effect. |  |
| `BombEffect` | ParticleSystem | — | N | Bomb effect. |  |
| `EffectScale` | Vector | — | N | Effect scale. |  |

## FenceFallAIParameter

Falling fence. Per-instance: bLinkSwitch, SwitchID, bEnableLockOtakara

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bLinkSwitch` | Bool | BP | S | Driven by a switch. | false |
| `SwitchID` | Name | BP+SL | S | Switch ID. | "None", "switch01" |
| `bEnableLockOtakara` | Bool | SL | S | Locks a treasure until it falls. | true |

## FindInput

Search input

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Cond` | Cond | BP | N | Attribute/attitude condition, see Cond. |  |
| `bAtAnimEnd` | Bool | — | N | Evaluate at the end of the animation. |  |
| `OfsTime` | Float | — | N | Time offset. |  |
| `bEnableCullSearchEnemy` | Bool | — | N | Allow culling of the search. |  |
| `EditableBound` | EditableBound | — | N | Editable bound object. |  |

## FireAIParameter

Fire spot (from Kajiokoshi)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FirePS` | ParticleSystem | BP | N | Fire effect. |  |
| `OnEventBound` | BoxBound2 | BP | N | Event box. |  |
| `DestroyTime` | Float | BP | N | Lifetime. | 6 |
| `PoolType` | EGenericActorPoolType | BP | N | Actor pool. | "EGenericActorPoolType::KajiokoshiFire" |

## FireChappyAIParameter

Fiery Bulblax-type fire Bulborb

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GoHomeMaxAngVelTime` | Float | BP | N | Turn speed going home. | 5 |
| `AttackMaxDepenetrationVelocity` | Float | — | N | Depenetration limit when attacking. |  |

## FlickArg

A shake-off / knock-back definition (used by every enemy attack that throws Pikmin off)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FlickType` | FFlickType | BP | N | FFlickType reaction: Attack, Faint, Denki(electric), FallMeck, Blow, AssistGensei, Strong, Thrown, Big, FallMeckDown. | "FFlickType::Blow" |
| `bFreeze` | Bool | — | N | Flicked Pikmin are frozen. |  |
| `bRush` | Bool | — | N | Flick triggered by a rush/charge. |  |
| `ShibireTimeRatio` | Float | — | N | Scale of the electric-stun (shibire) time applied to flicked Pikmin. |  |
| `bKaisan` | Bool | — | N | Flicked Pikmin are dismissed from the squad. |  |
| `bBombActivate` | Bool | SL | S | Flicking ignites bomb rocks carried/stuck (serialized for some species). | true |
| `IgnoreFlickFlags` | UInt16 | BP | N | EIgnoreFlickBitFlags bitmask of targets that are NOT flicked (bit0 Avatar, 1 Pressed, 2 Capsule, 3 Panic, 4 Frozen, 5 Charm, 6 Flick, 7 Dangle, 8 SameTeam, 9 NotTeki, 10 TakeAway, 11 FallMeck, 12 Happy, 13 DangleJump, 14 RidingDog). | 1, 0, 4 |
| `Ratio` | Float | BP | N | Fraction of latched Pikmin that are thrown off (0..1). | 0.699999988079071, 0.5, 0.6000000238418579 |
| `DirType` | FFlickDirType | BP | N | FFlickDirType: Radiation(outward), Front, Back, Left, Right, Attract(inward), Direct, Marigumo. | "FFlickDirType::Back", "FFlickDirType::Left", "FFlickDirType::Direct" |
| `RandRot` | Float | BP | N | Random rotation (degrees) added to the throw direction. | 30 |
| `DirExclusionAngle` | Float | BP | N | Angle range excluded from random directions. | 60 |
| `MaxFlickNum` | Int | BP | N | Maximum number of Pikmin flicked per shake. | 10, 20, 35 |
| `SpeedXY` | Float | BP | N | Horizontal launch speed. | 300, 110, 200 |
| `SpeedXYRand` | Float | BP | N | Random fraction added to SpeedXY. | 0.6000000238418579, 0.30000001192092896, 0.4000000059604645 |
| `RandAng` | Float | BP | N | Random angle spread. | 20, 5, 0.10000000149011612 |
| `SpeedZ` | Float | BP | N | Vertical launch speed. | 100, 230, 250 |
| `SpeedZRand` | Float | BP | N | Random fraction added to SpeedZ. | 0.6000000238418579, 0.20000000298023224, 1.25 |
| `bOverridePlayerDamage` | Bool | BP | N | Use OverridePlayerDamage when this flick hits a captain. | true |
| `OverridePlayerDamage` | Int | BP | N | Damage dealt to captains hit by the flick. | 10, 20 |
| `bStickerFlickToHappy` | Bool | BP | N | Latched Oatchi is also flicked. | false |
| `FlickHappyReactionType` | EFlickHappyReactionType | BP | N | EFlickHappyReactionType: how Oatchi reacts (Normal, Flick, NoReaction). | "EFlickHappyReactionType::Flick", "EFlickHappyReactionType::NoReaction", "EFlick |
| `bForceNotDegradeLeaf` | Bool | BP | N | Flicked Pikmin keep their flower/bud (no leaf degradation). | true |
| `bForceFlickForFlickSate` | Bool | — | N | Force the flick even if the target is already in a flick state. |  |
| `bIgnoreCollisionFlicker` | Bool | — | N | Ignore collision with the flicking actor while airborne. |  |
| `bIgnoreCollisionSender` | Bool | BP | N | Ignore collision with the sender. | true |
| `bSavedAI` | Bool | BP | N | Restore the victim's saved AI after the flick. | false |
| `bDirectKnockBackVelocity` | Bool | BP | N | Apply KnockBackVelocity directly. | true |
| `KnockBackVelocity` | Float | BP | N | Knock-back velocity applied to captains/Oatchi. | 60, 50, 100 |
| `BoneNames` | Name | BP | N | Bones used as flick origins. |  |
| `FlickBoneName` | Name | BP | N | Bone used as flick origin. | "X_j001", "F_j000", "root" |
| `bUseSphereCenterLocation` | Bool | — | N | Use the sphere centre instead of the bone as origin. |  |
| `Offset` | Vector | BP | N | Origin offset. |  |
| `FlickSearchType` | FFlickSearchType | — | N | FFlickSearchType: Sphere, SearchInput or CollTree – how targets to flick are gathered. |  |
| `bScaleRange` | Bool | — | N | Scale the flick range with the actor scale. |  |
| `SearchInput` | SearchInput | BP | N | Search definition when FlickSearchType = SearchInput. |  |
| `CollTreeSurfaceDistance` | Float | BP | N | Distance from the collision tree surface for CollTree searches. | 75, 0 |
| `SphereRadius` | Float | BP | N | Radius for Sphere searches. | 70, 80, 0 |
| `GetupTimer` | Float | BP | N | Time flicked Pikmin stay down before getting up. | 2, 0.5 |
| `InvincibleTime` | Float | BP | N | Invincibility time after being flicked. | 0.30000001192092896 |
| `bIgnoreInvincible` | Bool | — | N | Flick even invincible targets. |  |
| `bSwapControlRidingAvatar` | Bool | — | N | Swap control when a captain riding Oatchi is flicked. |  |
| `bRadiationFlickOnlyHappy` | Bool | BP | N | Only Oatchi uses radiation direction. | true |
| `bEnableSpeedOnlyHappy` | Bool | BP | N | Use the *OnlyHappy speeds for Oatchi. | true |
| `SpeedXYOnlyHappy` | Float | BP | N | Horizontal speed applied to Oatchi. | 220, 100, 250 |
| `SpeedZOnlyHappy` | Float | BP | N | Vertical speed applied to Oatchi. | 300, 150, 50 |

## FlickLimit

Shake-off threshold

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NumStickers` | Int | BP | N | Latched Pikmin count. | 4, 9, 19 |
| `NumHitCounts` | Int | BP | N | Hits count. | 6, 12, 18 |

## FollowKochappyBaseAIComponent

Follower Dwarf Bulborbs

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bLeader` | Bool | SL | S | This individual is the group leader others follow (per-instance). | true |

## FollowKochappyBaseAIParameter

Follower Dwarf Bulborbs (night). Per-instance: GiveupDistance (+component bLeader)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GiveupDistance` | Float | SL | S | Give up chasing beyond this distance. | 100 |
| `LeaderParam` | FollowKochappyBaseLeaderParameter | BP | N | Leader behaviour. |  |
| `ChildParam` | FollowKochappyBaseChildParameter | BP | N | Follower behaviour. |  |
| `WaitLimitCount` | Int | BP | N | Waits before moving on. | 7 |

## FollowKochappyBaseChildParameter

Follower

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LeaderSearchRangeXY` | Float | BP | N | Radius to find a leader. | 200 |
| `LeaderLoseSightRangeXY` | Float | BP | N | Radius where it loses the leader. | 300 |
| `LeaderSearchRangeZ` | Float | — | N | Height range. |  |
| `ChaseLeaderOffsetMin` | Vector | BP | N | Min offset from the leader. |  |
| `ChaseLeaderOffsetMax` | Vector | BP | N | Max offset from the leader. |  |

## FollowKochappyBaseLeaderParameter

Leader

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxChildNum` | Int | — | S | Max followers (serialized in the Leader sub-struct). |  |
| `SendLeaderSearchRangeXY` | Float | — | N | Radius to recruit followers. |  |
| `SendLeaderSearchRangeZ` | Float | — | N | Height range. |  |
| `ChildCIDs` | Name | BP | S | Follower CIDs. |  |
| `SearchTagName` | Name | BP | N | Route tag. | "NightKochappyRootPoint" |

## FrogAIParameter

Wollywogs/Frogs (jump and crush). Per-instance: bNoSearchOuterTerritory, SearchAreaRest, EatArea

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bNoSearchOuterTerritory` | Bool | SL | S | Ignore targets outside territory. | true |
| `PressFloorParameter` | PressFloorParameter | BP+SL | S | Floor sink on landing. |  |
| `PressFloorOffset` | Vector | BP | N | Floor sink offset. |  |
| `JumpVelY` | Float | BP | N | Jump vertical speed. | 150, 75, 107 |
| `JumpVelXYLerpRatio` | Float | BP | N | Horizontal jump interpolation. | 350, 420 |
| `FaceWashRate` | Float | — | N | Chance to wash face (idle). |  |
| `MaxWaitCount` | Int | — | N | Max waits. |  |
| `MaxFaceWashCount` | Int | BP | N | Max face washes. | 2 |
| `FallCond` | Cond | BP | N | Condition for falling from the sky. |  |
| `FloatSec` | Float | BP | N | Hang time at the jump apex. | 0.4000000059604645, 0 |
| `WanderRadius` | Float | BP | N | Wander radius. | 60 |
| `WaitToWanderIntervalTimeMin` | Float | BP | N | Min wait before wandering. | 3 |
| `WaitToWanderIntervalTimeMax` | Float | BP | N | Max wait before wandering. | 10 |
| `JumpRadius` | Float | BP | N | Jump target radius. | 5 |
| `JumpSpeedDownRadius` | Float | BP | N | Radius where it slows. | 80, 0 |
| `JumpSpeedDownRate` | Float | BP | N | Slow-down rate. | 0.8999999761581421, 1 |
| `JumpTimer` | Float | BP | N | Delay before jumping. | 0.10000000149011612 |
| `JumpTargetPosShift` | Float | BP | N | Target position shift. | -10, -15 |
| `PressRangeXY` | Float | BP | N | Crush radius. | 50, 25 |
| `PressRangeZ` | Float | BP | N | Crush height. | 30, 20 |
| `PressOffset` | Vector | BP | N | Crush offset. |  |
| `TanebiPressRangeXY` | Float | — | N | Crush radius vs Tanebi. |  |
| `TanebiPressRangeZ` | Float | BP | N | Crush height vs Tanebi. | 60 |
| `TanebiPressOffset` | Vector | — | N | Crush offset vs Tanebi. |  |
| `WanderTurnLimitAngle` | Float | — | N | Wander turn limit. |  |
| `bOutTerritoryAttack` | Bool | BP | N | Attacks outside territory. | true |
| `DistanceLand` | Float | BP | N | Landing distance. | 70, 32.5, 46 |
| `DistancePressFloor` | Float | BP | N | Floor sink distance. | 150, 60, 80 |
| `SpawnActor` | Class | BP | N | Actor spawned (ice variant). |  |
| `FallNum` | Int | BP | N | Items spawned. | 20, 8 |
| `JumpInterval` | Float | SL | S | Interval between jumps. | 0 |
| `FallSpeed` | Float | BP | N | Fall speed. | 3000 |
| `FlyEffectParam` | FrogFlyEffectParameter | BP | N | Jump effect. |  |
| `TanebiBreakDamage` | Float | — | N | Damage to Tanebi. |  |
| `PoolType` | EGenericActorPoolType | BP | N | Actor pool. | "EGenericActorPoolType::IceFrogFreeze" |
| `LandFlickArg` | FlickArg | BP | N | Landing flick. |  |

## FrogFlyEffectParameter

Jump effect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EffectRequest` | EftRequest | BP | N | Effect. |  |
| `BoneName` | Name | BP | N | Bone. | "B_j001" |
| `Offset` | Vector | BP | N | Offset. |  |

## FutakuchiAdultAIParameter

Adult cannon beetle (inhales Pikmin, fires rocks, can drop icicles). Per-instance: AttackArea, bSplineType, SplineParam, AttackParam, bCreateIcicle, EscapeSecMin/Max, VacuumHalfHeight, SearchAreaCaution

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HitMessageDispVacuumSuccessCount` | Int | — | N | Successful inhales before a hint. |  |
| `CapsuleLength` | Float | BP | N | Collision capsule length. | 60 |
| `bCreateIcicle` | Bool | SL | S | Inhale attack knocks icicles down. | false |
| `bSplineType` | Bool | SL | S | Uses spline mode. | true |
| `SplineParam` | FutakuchiAdultSplineParameter | SL | S | Spline mode parameters. |  |
| `AttackParam` | FutakuchiAdultAttackBaseParameter | BP | S | Attack timing. |  |
| `AttackArea` | CakeSSphereSearchArea | BP+SL | S | Attack area. |  |
| `EscapeTargetArea` | CakeSSphereSearchArea | BP+SL | S | Escape trigger area. |  |
| `EscapeAngle` | Float | — | N | Escape angle. |  |
| `FlickSearchAreaXY` | Float | BP | N | Flick radius. | 130 |
| `FlickSearchAreaZ` | Float | — | N | Flick height. |  |
| `ShellCloseFlickSpeedXY` | Float | — | N | Flick speed when closing shell. |  |
| `ShellCloseFlickSpeedZ` | Float | — | N | Vertical flick speed. |  |
| `EscapeSecMin` | Float | BP+SL | S | Min escape time. | 0 |
| `EscapeSecMax` | Float | BP+SL | S | Max escape time. | 0 |
| `EscapeEndDamage` | Float | BP | N | Damage that ends the escape. | 600 |
| `FlickSearchTime` | Float | BP | N | Flick search interval. | 2 |
| `LookAroundRate` | Float | — | N | Look-around chance. |  |
| `VacuumPower` | Float | BP | N | Inhale power on Pikmin. | 400, 300 |
| `VacuumPowerToAvatar` | Float | BP | N | Inhale power on captains. | 250 |
| `SignVacuumPower` | Float | BP | N | Warning inhale power. | 15 |
| `SignVacuumPowerToAvatar` | Float | BP | N | Warning inhale power on captains. | 10 |
| `VacuumGoalOffset` | Vector | BP | N | Inhale target offset. |  |
| `VacuumLength` | Float | BP | N | Inhale length. | 200, 400 |
| `VacuumHalfHeight` | Float | BP+SL | S | Inhale half height. | 17 |
| `VacuumHDRumbleMaxNum` | Int | — | N | Rumble count. |  |
| `VacuumHDRumblePosRatio` | Float | BP | N | Rumble position ratio. | 0.6000000238418579 |
| `VacuumHDRumbleKey` | Name | BP | N | Rumble preset. | "Teki_Common_Breathe_L" |
| `TargetLostTime` | Float | — | N | Target lost time. |  |
| `bPlayNoticeMotion` | Bool | BP | N | Play notice animation. | true |
| `LookAtMoveSpeed` | Float | BP | N | Look-at speed. | 100 |
| `LookAtClampRot` | Float | BP | N | Look-at clamp. | 20 |
| `StopTurnMaxAngVelTime` | Float | — | N | Stop-turn speed. |  |
| `MarkerHeightOnBurst` | Float | BP | N | Marker height on burst. | 80 |
| `bDispCollision` | Bool | — | N | Debug. |  |
| `bDispStickPikmin` | Bool | — | N | Debug. |  |
| `CasheChaseTargetTime` | Float | — | N | Cached target time. |  |
| `IcicleSpawnRadius` | Float | BP | N | Icicle spawn radius. | 300 |
| `IcicleIgnoreOwnerSpawnRadius` | Float | — | N | Icicle exclusion radius. |  |
| `IcicleSpawnHeightMin` | Float | BP | N | Icicle min height. | 800 |
| `IcicleSpawnHeightMax` | Float | BP | N | Icicle max height. | 1100 |
| `IcicleSpawnNum` | Int | BP | N | Icicles. | 5 |
| `VacuumBombDamageTimeMin` | Float | — | N | Bomb-inhale damage time min. |  |
| `VacuumBombDamageTimeMax` | Float | — | N | Bomb-inhale damage time max. |  |
| `VacuumEndDamage` | Float | BP | N | Damage that ends the inhale. | 200 |
| `SignVacuumLength` | Float | BP | N | Warning inhale length. | 250 |
| `SignVacuumHalfHeight` | Float | BP | N | Warning inhale height. | 20 |
| `HintMessageAttackCount` | Int | BP | N | Attacks before a hint. | 4 |
| `HintMessageAttackInterval` | Float | BP | N | Hint interval. | 20 |
| `HintMessageNearAttackPikminTimeFirst` | Float | — | N | First hint time. |  |
| `HintMessageNearAttackPikminTimeSecond` | Float | BP | N | Second hint time. | 15 |
| `HintMessageSpreadCount` | Int | BP | N | Hint spread. | 1 |
| `EasyModeTurretAttackDelay` | Float | — | N | Extra delay on easy. |  |
| `RockBallClass` | Class | BP | N | Rock class. |  |
| `RockSpeed` | Float | — | N | Rock speed. |  |
| `RockLocalOffset` | Vector | — | N | Rock offset. |  |
| `PoolType` | EGenericActorPoolType | BP | N | Rock pool. | "EGenericActorPoolType::BigFutakuchiRockBall", "EGenericActorPoolType::BigFutaku |

## FutakuchiAdultAttackBaseParameter

Attack timing (per-instance)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackLoopWaitSecMin` | Float | BP+SL | S | Min wait between attack loops. | 0 |
| `AttackLoopWaitSecMax` | Float | BP+SL | S | Max wait between attack loops. | 0 |
| `AttackSignSecMin` | Float | BP+SL | S | Min warning time. | 0 |
| `AttackSignSecMax` | Float | BP+SL | S | Max warning time. | 0 |
| `AttackInterval` | Float | BP+SL | S | Interval between attacks. | 0 |
| `AttackIntervalSuccess` | Float | BP+SL | S | Interval after a successful attack. | 0 |

## FutakuchiAdultSplineParameter

Spline mode (per-instance)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackParam` | FutakuchiAdultAttackBaseParameter | SL | S | Attack timing in spline mode. |  |
| `SearchTagName` | Name | — | S | Spline tag. |  |
| `EndSplineModeTargetDist` | Float | SL | S | Distance at which spline mode ends. | 150 |

## FutakuchiAIHomingParameter

Homing

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TargetHomingAngleMax` | Float | — | N | Max homing angle. |  |
| `TargetHomingAngleMin` | Float | — | N | Min homing angle. |  |
| `TargetHomingAngleAccelRatio` | Float | BP | N | Homing acceleration. | 0 |

## FutakuchiAIParameter

Futakuchi = cannon larva (fires rock balls, can roll rocks along splines). Per-instance: RockMode, SearchTagName, SplineSearchArea, SearchAreaAttack, bFixCautionAreaCenter, bDissapearVisibleOff, SearchAreaCaution

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DissapearAttackContinueCount` | Int | — | N | Attacks before disappearing. |  |
| `bDissapearVisibleOff` | Bool | SL | S | Become invisible while disappeared. | true |
| `bAppearLocationFix` | Bool | BP | N | Reappear at a fixed location. | true |
| `bFixCautionAreaCenter` | Bool | SL | S | Keep the caution area centred on the spawn point. | true |
| `SearchAreaAttack` | CakeSearchArea | BP+SL | S | Attack area. |  |
| `AppearFlickParam` | FlickArg | BP | N | Appear flick. |  |
| `DisappearFlickParam` | FlickArg | BP | N | Disappear flick. |  |
| `AttackFlickStickerArg` | FlickArg | BP | N | Flick latched Pikmin when attacking. |  |
| `AttackInvalidTime` | Float | BP | N | Attack cooldown. | 0.33000001311302185 |
| `HideTimeMin` | Float | BP | N | Min hidden time. | 2.5 |
| `RockMode` | ERockMode | SL | S | ERockMode – how its rocks behave (e.g. Spline = roll along a spline route). | "ERockMode::Spline" |
| `SearchTagName` | Name | SL | S | Tag of the spline/rock route (e.g. FutakuchiRock01). | "FutakuchiRock01", "FutakuchiRock03", "FutakuchiRock2" |
| `SplineSearchArea` | CakeSSphereSearchArea | SL | S | Search area for spline rock mode. |  |
| `RockBallClass` | Class | BP | N | Rock class. |  |
| `RockSpeed` | Float | SL | S | Rock speed. | 200 |
| `SplineSearchInTerritoryIntervalMin` | Float | — | N | Min spline search interval. |  |
| `SplineSearchInTerritoryIntervalMax` | Float | SL | S | Max spline search interval. | 0.8 |
| `AppearIntervalMin` | Float | — | N | Min appear interval. |  |
| `AppearIntervalMax` | Float | — | N | Max appear interval. |  |
| `WaitTime` | Float | — | N | Wait. |  |
| `bHoming` | Bool | BP | N | Rocks home on targets. | false |
| `HomingParam` | FutakuchiAIHomingParameter | BP | N | Homing. |  |
| `TurnMaxTime` | Float | — | N | Max turn time. |  |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |
| `ZukanBanDissapearTime` | Float | BP | N | Piklopedia no-disappear time. | 3 |
| `bDebugNoAttack` | Bool | — | N | Debug. |  |
| `PoolType` | EGenericActorPoolType | BP | N | Rock pool. | "EGenericActorPoolType::FutakuchiRockBall", "EGenericActorPoolType::FutakuchiSno |
| `EasyModeTurretAttackDelay` | Float | — | N | Extra delay on easy. |  |

## GasKoganeAIParameter

Gas-spraying Iridescent Flint Beetle variant

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackRadius` | Float | BP | N | Gas radius. | 68 |
| `AttackTime` | Float | — | N | Gas time. |  |
| `AttackHeightOffset` | Float | BP | N | Gas height offset. | -25 |
| `AttackEffect` | ParticleSystem | BP | N | Gas effect. |  |
| `HDRumbleKeyOnGasInjection` | Name | BP | N | Rumble. | "Teki_Common_Breathe_M" |

## GateAIComponent

Gates (bramble/electric/etc.)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StartValidWallIndex` | Int | SL | S | Index of the first intact wall segment (dynamic state; lower = already partly broken). | 2, 1 |
| `RareDropParameter` | DropItemParameter | SL | S | Extra rare drop slots (Dandori "rareDrops"). |  |
| `bNoCollisionAirWall` | Bool | SL | S | Disable the invisible air wall. | true |

## GCCarryPikminParameter

Pikmin seating on a mount. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDebug` | Bool | — | N | Debug. |  |
| `bDebugSlotLocation` | Bool | — | N | Debug slot locations. |  |
| `bDebugForceIrregular` | Bool | — | N | Debug irregular layout. |  |
| `RideJumpLocationRandomMin` | Float | — | N | Min random jump-on location. |  |
| `RideJumpLocationRandomMax` | Float | — | N | Max random jump-on location. |  |
| `RideJumpExcludeAngle` | Float | — | N | Excluded jump-on angle. |  |
| `RidingSlotSelectionRule` | ERidingSlotSelectionRule | — | N | ERidingSlotSelectionRule. |  |
| `DebugRideRowIndex` | Int | — | N | Debug row. |  |
| `SitLocationRollOffset` | Rotator | — | N | Seat roll offset. |  |
| `PikminRadius` | Float | — | N | Pikmin spacing radius. |  |
| `RidePikminMax` | Int | — | N | Max riding Pikmin. |  |
| `bZigZag` | Bool | — | N | Zig-zag seat layout. |  |
| `LatitudeMinPikminPitchOffset` | Float | — | N | Pitch offset at min latitude. |  |
| `LatitudeMaxPikminPitchOffset` | Float | — | N | Pitch offset at max latitude. |  |
| `LatitudeMin` | Float | BP | N | Min seat latitude. | -45 |
| `LatitudeMax` | Float | BP | N | Max seat latitude. | 15 |
| `FormationLongitudeInterval` | Float | BP | N | Longitude spacing. | 16 |
| `LongitudeCenter` | Float | — | N | Longitude centre. |  |
| `SitNum` | SitRowInfo | BP | N | Rows of seats. |  |
| `Radius` | Float | BP | N | Seat sphere radius. | 15.5 |
| `HeightOffset` | Float | — | N | Seat height offset. |  |
| `PikminScale` | Float | — | N | Pikmin scale while riding. |  |
| `PikminYawOffset` | Float | — | N | Yaw offset. |  |
| `PikminRollOffset` | Rotator | BP | N | Roll offset. |  |
| `DebugDrawNum` | Int | — | N | Debug. |  |
| `DebugSphereRadius` | Float | — | N | Debug. |  |

## GeyserAIParameter

Geysers (launch Pikmin/captains). Per-instance: bSetCrystal, StopQueenDistXY (+ Dandori: navLinks, snap)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ActEffect` | ParticleSystem | BP | S | Active effect. |  |
| `GoEffect` | ParticleSystem | BP | N | Launch effect. |  |
| `SetEffect` | ParticleSystem | BP | N | Idle effect. |  |
| `bSetCrystal` | Bool | SL | S | Blocked by a crystal until broken. | true |
| `ArriveDist` | Float | — | N | Arrival distance. |  |
| `EnableJumpWaitTime` | Float | BP | N | Wait before launching. | 2.5 |
| `JumpInPointOffset` | Vector | BP | N | Entry point offset. |  |
| `JumpInSpeed` | Float | BP | N | Entry speed. | 120 |
| `JumpInHeightOffset` | Float | BP | N | Entry height offset. | 5 |
| `UpSpeed` | Float | BP | N | Launch speed. | 200 |
| `UpHeight` | Float | BP | N | Launch height. | 100 |
| `JumpOutGravity` | Float | BP | N | Gravity after launch. | 600 |
| `JumpOutHeight` | Float | — | N | Exit height. |  |
| `DropEndMotionTime` | Float | — | N | Landing motion time. |  |
| `StopQueenDistXY` | Float | SL | S | Radius within which it stops a Queen (Empress) nearby. | 195, 210 |

## GroupDropManagerAIParameter

Group drop manager: gives a reward when all enemies in a group are defeated. Per-instance: GroupingRadius, IgnoreCIDList, DropParameter

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GroupingRadius` | Float | SL | S | Radius in which enemies are grouped. | 100, 150, 120 |
| `IgnoreCIDList` | Name | SL | S | CIDs excluded from the group. |  |
| `GroupingCIDList` | Name | BP | N | CIDs included. |  |
| `GroupingGIDList` | Name | BP | N | GIDs included. |  |
| `DropParameter` | DropParameter | BP+SL | S | Reward dropped when the group is wiped out. |  |
| `DropTiming` | EDropTiming | — | N | EDropTiming – when the reward drops. |  |

## HageDamagumoAIParameter

Baldy Long Legs. Per-instance: bSplineWalkStart, bUseUniqueLife, UniqueLife, bAlreadyAppear (+SearchTagName, bStraddle, SearchAreaRest, FightCamera distance)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LegFlickArg` | FlickArg | BP | N | Flick from legs. |  |
| `LegFlickBoneNames` | Name | BP | N | Leg bones that flick. |  |
| `FlickLimits` | FlickLimit | BP | N | Latched counts/hits before shaking off. |  |
| `bSplineWalkStart` | Bool | SL | S | Starts walking its spline route immediately. | true |
| `bUseUniqueLife` | Bool | SL | S | Override max HP with UniqueLife. | true |
| `UniqueLife` | Float | SL | S | Custom max HP. | 6000, 5500 |
| `bAlreadyAppear` | Bool | SL | S | Starts revealed. | true |
| `ZukanInvasionTimer` | Float | BP | N | Piklopedia invasion timer. | 8.5 |

## HamboAIParameter

Hambo = swimming fish enemy that flicks and carries pellets

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HappyFlickParam` | FlickArg | BP | N | Flick applied to Oatchi. |  |
| `AppealToHappyParam` | AppealToHappyParam | BP | N | Oatchi detection. |  |
| `SearchArea` | CakeSSphereSearchArea | BP | N | Search area. |  |
| `RunSecMin` | Float | — | N | Min run time. |  |
| `RunSecMax` | Float | — | N | Max run time. |  |
| `SwimTargetSpeed` | Float | BP | N | Swim speed. | 40 |
| `SwimMaxSpeedRatio` | Float | BP | N | Max speed ratio. | 0.800000011920929 |
| `SwimAccelRatio` | Float | BP | N | Swim acceleration. | 0.30000001192092896 |
| `SwimSecMin` | Float | — | N | Min swim time. |  |
| `SwimSecMax` | Float | — | N | Max swim time. |  |
| `MinTurnAngDeg` | Float | — | N | Min turn. |  |
| `MaxTurnAngDeg` | Float | — | N | Max turn. |  |
| `WaterDepth` | Float | — | N | Water depth. |  |
| `SwimDepth` | Float | — | N | Swim depth. |  |
| `SwimMaxVelZ` | Float | BP | N | Max vertical speed. | 40 |
| `SinkVelZRatio` | Float | — | N | Sink speed ratio. |  |
| `SinkVelZ` | Float | — | N | Sink speed. |  |
| `SwimAccZ` | Float | — | N | Vertical acceleration. |  |
| `SwimTurnRatio` | Float | — | N | Turn ratio. |  |
| `SwimHeightOffset` | Float | — | N | Swim height offset. |  |
| `WaitRatio` | Float | — | N | Wait chance. |  |
| `MinWaitTime` | Float | — | N | Min wait. |  |
| `MaxWaitTime` | Float | — | N | Max wait. |  |
| `MaxWallCos` | Float | — | N | Wall angle limit. |  |
| `AvoidTurnAngDeg` | Float | — | N | Avoid turn. |  |
| `FlickIntervalTime` | Float | — | N | Flick interval. |  |
| `SearchHamboXY` | Float | BP | N | Radius to find other Hambos. | 100 |
| `SearchHamboZ` | Float | — | N | Height range. |  |
| `SearchPikminXY` | Float | — | N | Pikmin search radius. |  |
| `SearchPikminZ` | Float | — | N | Height range. |  |
| `ForceFlickPikminNum` | Int | — | N | Latched Pikmin that force a flick. |  |
| `ForceFlickTime` | Float | BP | N | Time before forced flick. | 1 |
| `IntervalRotateTimeMin` | Float | BP | N | Min rotate interval. | 0.4000000059604645 |
| `IntervalRotateTimeMax` | Float | BP | N | Max rotate interval. | 0.699999988079071 |
| `FallRotateRate` | Float | BP | N | Rotation when falling. | 1 |
| `FallTurnRate` | Float | BP | N | Turn when falling. | 0.30000001192092896 |
| `FallRotateSpeed` | Float | BP | N | Rotate speed falling. | 140 |
| `FallSpeed` | Float | — | N | Fall speed. |  |
| `FallScaleRatioPerMinute` | Float | BP | N | Scale change falling. | 0.5 |
| `DieMoveSpeed` | Float | — | N | Death move speed. |  |
| `CheckWallDistance` | Float | — | N | Wall check distance. |  |
| `PelletMoveSpeed` | Float | — | N | Speed carrying a pellet. |  |
| `WaitRotationTime` | Float | — | N | Rotation time waiting. |  |
| `WaitRotationRate` | Float | — | N | Rotation rate waiting. |  |

## HanachirashiAIParameter

Hanachirashi ("flower scatterer") – flies, knocks flowers off Pikmin. Per-instance: bWayCheckToTarget, WayCheckStartHeightOffset

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ChaseParameter` | HanachirashiChaseParameter | BP | N | Chase. |  |
| `AttackParameter` | HanachirashiAttackParameter | BP | N | Attack. |  |
| `EscapeParameter` | HanachirashiEscapeParameter | BP | N | Escape. |  |
| `TakeOffParameter` | HanachirashiTakeOffParameter | — | N | Take-off. |  |
| `AvoidParameter` | HanachirashiAvoidParameter | BP | N | Avoid/counter. |  |
| `DieParameter` | HanachirashiDieParameter | BP | N | Death. |  |
| `FallStickNum` | Int | — | N | Latched Pikmin that make it fall. |  |
| `ThresholdTimeToFlyFlick` | Float | BP | N | Time before flicking in the air. | 2 |
| `ThresholdTimeToGroundFlick` | Float | BP | N | Time before flicking on the ground. | 3.5 |
| `ExcludePikminHeadFromTargetTime` | Float | BP | N | Time a de-flowered Pikmin is ignored. | 10 |
| `bIncludeYudouEsaInTargetOnlyZukan` | Bool | BP | N | Targets lures only in the Piklopedia. | false |
| `ExcludeYudouEsaFromTargetTime` | Float | BP | N | Time a lure is ignored. | 10 |
| `bWayCheckToTarget` | Bool | BP | S | Check the path to the target is clear (per-instance). | true |
| `WayCheckStartHeightOffset` | Float | BP | S | Height offset of that check (per-instance). | -50 |

## HanachirashiAttackParameter

Attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackableDistance` | Float | — | N | Max attack distance. |  |
| `AttackableRadius2D` | Float | — | N | Attack radius. |  |
| `AttackableHalfHeight` | Float | — | N | Attack height. |  |
| `AttackDistance` | Float | BP | N | Swoop distance. | 270 |
| `AttackAngle` | Float | BP | N | Swoop angle. | 21 |

## HanachirashiAvoidParameter

Counter-attack when hit

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TriggerDamage` | Float | — | N | Damage that triggers it. |  |
| `AttackDistance` | Float | BP | N | Distance. | 700 |
| `AttackAngle` | Float | — | N | Angle. |  |
| `WaitTimeToAppear` | Float | — | N | Wait before reappearing. |  |
| `AppearHeightOffsetZ` | Float | BP | N | Reappear height. | 500 |
| `FlickArg` | FlickArg | BP | N | Flick. |  |
| `AttackHDRumblePosRatio` | Float | — | N | Rumble position. |  |
| `AttackHDRumbleKey` | Name | BP | N | Rumble preset. | "Teki_Mar_Breathe" |

## HanachirashiChaseParameter

Chase

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxSpeed` | Float | — | N | Max speed. |  |
| `SpeedAccelRatio` | Float | — | N | Acceleration. |  |
| `PersonalRadius2D` | Float | — | N | Personal space radius. |  |
| `ChaseableRadius2D` | Float | — | N | Chase radius. |  |
| `ChaseableHalfHeight` | Float | — | N | Chase height. |  |
| `ChaseableAngle` | Float | — | N | Chase angle. |  |
| `ChaseableAngleAtCaution` | Float | — | N | Chase angle when alerted. |  |
| `PatienceLimitTime` | Float | BP | N | Give up after this long. | 10 |

## HanachirashiDieParameter

Death

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FallOffsetZ` | Float | BP | N | Fall height offset. | 350 |
| `ReternOriginScaleTime` | Float | — | N | Scale restore time. |  |

## HanachirashiEscapeParameter

Escape

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxSpeed` | Float | — | N | Max speed. |  |
| `SpeedAccelRatio` | Float | — | N | Acceleration. |  |
| `EscapableRadius2D` | Float | — | N | Threat radius. |  |
| `EscapableHalfHeight` | Float | — | N | Threat height. |  |
| `EscapableAngle` | Float | — | N | Threat angle. |  |
| `EscapableAngleAtCaution` | Float | — | N | Threat angle when alerted. |  |
| `EscapeLength` | Float | — | N | Escape distance. |  |
| `StuckTimeToAvoid` | Float | BP | N | Stuck time before avoiding. | 2 |
| `AfterMoveStopTime` | Float | — | N | Stop time after moving. |  |
| `AfterWaitTimer` | Float | BP | N | Wait after escaping. | 1 |

## HandleBoardAIParameter

Handle board (Pikmin push/pull to raise a platform). Per-instance: WorkNum (+NavLink points)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WorkNumOffs` | Vector | — | S | Offset of the Pikmin work counter. |  |
| `CompleteWorkNumInvisibleTime` | Float | — | N | Counter hide time after completion. |  |
| `CylinderBound` | CylinderBound2 | — | N | Work area. |  |
| `WorkNum` | Int | SL | S | Pikmin needed. | 10 |
| `JumpDist` | Float | — | N | Jump distance for the nav link. |  |
| `JumpHeight` | Float | — | N | Jump height. |  |
| `bYellowOnly` | Bool | — | N | Only Yellow Pikmin can work it. |  |
| `bWorkEnd` | Bool | — | N | Completed state. |  |

## HappyDoorAIParameter

Oatchi door (dog door warp). Per-instance: HappyDoorID

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HappyDoorID` | Name | SL | S | Pairs two dog doors together. | "HappyDoorID_1" |
| `BeforeWarpDelayTime` | Float | BP | N | Delay before warping. | 1.524999976158142 |
| `AfterWarpDelayTime` | Float | BP | N | Delay after warping. | 0.25 |
| `OpenDoorAdjustTime` | Float | — | N | Door open adjustment time. |  |
| `UIWipeInDelayTime` | Float | — | N | Screen wipe-in delay. |  |
| `UIWipeOutDelayTime` | Float | — | N | Screen wipe-out delay. |  |

## HappyReactionParameter

Reaction to Oatchi

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CheckInterval` | Int | BP | N | Check interval. | 15 |
| `ReactionDist` | Float | BP | N | Reaction distance. | 1300 |
| `BowCount` | Float | BP | N | Bows performed. | 3 |

## HariAIBulletParameter

Needles

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BulletActor` | Class | BP | N | Needle class. |  |
| `ShootPosOfs` | Vector | BP | N | Shot offset. |  |
| `Altitude` | Float | — | N | Arc height. |  |
| `CustomGravityRate` | Float | — | N | Gravity. |  |
| `WarningShotOfs` | Float | — | N | Warning shot offset. |  |
| `ShootLengthMin` | Float | — | N | Min range. |  |
| `ShootLengthMax` | Float | BP | N | Max range. | 350 |
| `PlayerFormationNum` | Byte | — | N | Pikmin in formation that attract fire. |  |
| `PredictionCoef` | Float | — | S | Target lead coefficient (per-instance). |  |

## HariAIParameter

Hari = needle-shooting enemy (spines regrow). Per-instance: CautionParam.bEnableNotice, RegenerateNeedleFlickRadius, bNoRegenerateNeedle, bFixedArtillery, EscapeLength, EscapeArea(+NoNeedle), BulletParameter.PredictionCoef, FixedArtillery*, SearchAreaRest, EatArea

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DebugParam` | HariAIDebugParameter | — | N | Debug switches. |  |
| `CautionParam` | HariCautionParameter | SL | S | Caution/notice behaviour. |  |
| `BulletParameter` | HariAIBulletParameter | BP | S | Needle projectiles. |  |
| `RegenerateNeedleFlickRadius` | Float | — | S | Flick radius when needles regrow. |  |
| `EscapeFlickRadius` | Float | — | N | Flick radius when escaping. |  |
| `EscapeAngle` | Float | — | N | Escape angle. |  |
| `EscapeLength` | Float | SL | S | Escape distance. | 220, 100 |
| `EscapeArea` | CakeSearchArea | BP | S | Threat area that triggers escape. |  |
| `EscapeAreaNoNeedle` | CakeSearchArea | BP | S | Threat area while needle-less. |  |
| `EscapeFlickArg` | FlickArg | BP | N | Escape flick. |  |
| `EscapeFlickMax` | Int | — | N | Max escape flicks. |  |
| `EscapeFlickRateForSticker` | Float | — | N | Chance to flick latched Pikmin. |  |
| `DamageForHappyCrush` | Float | — | N | Damage from Oatchi crush. |  |
| `SearchProWrestlingPikminRadius` | Float | BP | N | Radius to detect grappling Pikmin. | 350 |
| `bNoRegenerateNeedle` | Bool | — | S | Needles never regrow. |  |
| `bFixedArtillery` | Bool | SL | S | Stationary turret variant. | true |
| `FixedArtilleryVitality` | Float | — | S | HP of the turret variant. |  |
| `FixedArtilleryWaitTime` | Float | BP | S | Turret wait time. | 1 |
| `FixedArtilleryShotWaitTime` | Float | — | S | Turret shot interval. |  |
| `EasyModeTurretAttackDelay` | Float | — | N | Extra turret delay on easy. |  |
| `EasyModeAllAttackDelay` | Float | — | N | Extra attack delay on easy. |  |
| `EasyModeAttackInterval` | Float | — | N | Attack interval on easy. |  |

## HariCautionParameter

Notice

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableNotice` | Bool | SL | S | Turn to notice targets. | true |
| `NoticeMaxAngVelTime` | Float | — | N | Notice turn speed. |  |
| `NoticeAngAccelRatio` | Float | — | N | Notice turn acceleration. |  |
| `CautionTime` | Float | — | N | Caution time. |  |
| `CautionTurnStopAng` | Float | — | N | Stop turning angle. |  |
| `CautionTurnStartAng` | Float | — | N | Start turning angle. |  |

## HariuoAIParameter

Hariuo = swimming spiny fish (swims and beaches onto land). Per-instance: bDisableSwimMode

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SwimHeightMax` | Float | BP | N | Max swim height. | 75 |
| `SwimHeightMin` | Float | BP | N | Min swim height. | 25 |
| `SwimHeightDistanceMin` | Float | BP | N | Min height distance. | 15 |
| `ShoalHeight` | Float | — | N | Shallow-water height. |  |
| `StopAccelRatioOnFord` | Float | — | N | Deceleration in shallows. |  |
| `StopAccelRatioInSwimAction` | Float | — | N | Deceleration while swimming. |  |
| `ChargeTime` | Float | BP | N | Charge time. | 1.350000023841858 |
| `LookAtRateChangeRate` | Float | — | N | Look blend rate. |  |
| `LookAtZMinOnFord` | Float | BP | N | Min look height in shallows. | -15 |
| `SwimFordLoopMaxCount` | Int | — | N | Loops in shallows. |  |
| `AttackBoundRadius` | Float | BP | N | Attack radius. | 40 |
| `AttackBoundOffset` | Vector | BP | N | Attack offset. |  |
| `ReflectionFlickArg` | FlickArg | BP | N | Reflection flick. |  |
| `EnableMouthNum` | Int | — | N | Pikmin the mouth can hold. |  |
| `StickingToHeadFlickArg` | FlickArg | BP | N | Flick of Pikmin on its head. |  |
| `SinkBoundRadius` | Float | — | N | Sink radius. |  |
| `SinkBoundOffset` | Vector | BP | N | Sink offset. |  |
| `SinkTimer` | Float | BP | N | Sink delay. | 0.10000000149011612 |
| `SinkSpeed` | Float | BP | N | Sink speed. | 150 |
| `MaxSpeedOnLand` | Float | BP | N | Land speed. | 150 |
| `MaxAngVelTimeOnLand` | Float | BP | N | Land turn speed. | 1 |
| `SpeedAccelRatioOnLand` | Float | BP | N | Land acceleration. | 0.10000000149011612 |
| `StopAccelRatioOnLand` | Float | — | N | Land deceleration. |  |
| `LandMoveLoopMaxCount` | Int | BP | N | Land move loops. | 1 |
| `LandWanderParameter` | AIWanderParameter | BP | N | Land wander. |  |
| `LandWanderDistMin` | Float | BP | N | Min land wander distance. | 30 |
| `LandWanderDistMax` | Float | BP | N | Max land wander distance. | 50 |
| `bDisableSwimMode` | Bool | SL | S | Never swims (land only); per-instance. | true |

## HibaAIBulletParameter

Vent bubbles

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BubbleActor` | Class | BP | N | Bubble class. |  |
| `BubbleInterval` | Float | BP | N | Interval. | 0.10000000149011612, 0.30000001192092896 |
| `BubbleVelMin` | Float | — | N | Min speed. |  |
| `BubbleVelMax` | Float | BP | N | Max speed. | 3.5, 2.200000047683716 |
| `UpperSpeed` | Float | BP | N | Rise speed. | 1000, 1200 |
| `UpperStartTime` | Float | BP | N | Rise start. | 0.6299999952316284, 1 |
| `BubblePoolNum` | Int | BP | N | Pool size. | 60 |

## HibaAIParameter

Hiba = fire/electric/water vent that erupts periodically. Per-instance (HibaBaseAI): StartWaitRandTime, WaitAddTime, SpurtTime

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SignEffect` | ParticleSystem | BP | S | Warning effect. |  |
| `SpurtEffect` | ParticleSystem | BP | N | Eruption effect. |  |
| `BreakEffect` | ParticleSystem | BP | N | Break effect. |  |
| `DecalCurve` | CurveFloat | BP | N | Scorch decal curve. |  |
| `StartWaitRandTime` | Float | BP+SL | S | Random start delay (desyncs vents). | 0 |
| `WaitTime` | Float | — | N | Wait between eruptions. |  |
| `WaitAddTime` | Float | BP+SL | S | Extra wait added. | 0 |
| `SignTime` | Float | — | N | Warning time. |  |
| `SpurtTime` | Float | BP+SL | S | Eruption duration. | 10 |
| `CylinderBound` | CylinderBound2 | BP | N | Hit cylinder. |  |
| `SphereBound` | SphereBound2 | BP | N | Hit sphere. |  |
| `BoundOffsetZ` | Float | BP | N | Hit height offset. | -25, -10 |
| `TekiSearchBound` | SphereBound2 | BP | N | Enemy detection sphere. |  |
| `SecureSpurtTime` | Float | BP | N | Minimum eruption time. | 0.30000001192092896 |
| `AttackEvent` | AttackEventParameter | BP | N | Damage type and amount. |  |
| `bAlwaysSpurt` | Bool | BP | N | Erupts continuously. | true |
| `BubbleParameter` | HibaAIBulletParameter | BP | N | Bubbles (water variant). |  |
| `RequestRumbleName` | Name | BP | N | Rumble. | "Obj_Hiba" |

## HiddenBoxAIParameter

Hiding box (BigChappy)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableShakeByBigChappy` | Bool | BP | N | Box shakes when the hidden Bulborb moves. | true |

## HikariKinokoAIParameter

Glowing mushroom. Per-instance: LightEffect, bLightUp

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LightEffect` | ParticleSystem | — | S | Light effect. |  |
| `bLightUp` | Bool | SL | S | Starts lit. | true |
| `bNightOnly` | Bool | — | N | Only glows at night. |  |
| `EffectSearchRadius` | Float | — | N | Radius that triggers it. |  |
| `MaxIntensity` | Float | — | N | Max light intensity. |  |
| `MaxIntensityArriveTime` | Float | — | N | Time to reach max intensity. |  |

## IceChappyAIParameter

Frosty Bulborb-type ice Bulborb

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TanebiInsideParmeter` | TanebiInsideParameter | BP | N | Behaviour with a Tanebi (flame) inside it. |  |
| `IgnoreStopConditionBlendTime` | Float | — | N | Blend time ignoring stop conditions. |  |

## IcicleAIParameter

Falling icicles. Per-instance: bWaitStart, FallHeight, bFallSearchInTerritory

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HappyStickerFlickArg` | FlickArg | — | S | Flick of Oatchi latched on. |  |
| `bBossInu` | Bool | — | N | Spawned by the Sirehound. |  |
| `BrokenPiecesOffsetZ` | Float | — | N | Debris height. |  |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `PressRadius` | Float | — | N | Crush radius. |  |
| `HeightOffset` | Float | — | N | Height offset. |  |
| `CanExistNum` | Int | — | N | Max icicles at once. |  |
| `GravityRate` | Float | — | N | Fall gravity. |  |
| `CameraShakeData` | Class | — | N | Camera shake class. |  |
| `ShakeParam` | ShakeCameraParameter | — | N | Camera shake. |  |
| `bWaitStart` | Bool | SL | S | Hangs until triggered. | true |
| `FallHeight` | Float | — | S | Fall height. |  |
| `bFallSearchInTerritory` | Bool | SL | S | Falls when a target enters its territory. | true |
| `LandEffectParameter` | IcicleLandEffectParameter | — | N | Landing effect. |  |
| `BreakEffectParameter` | IcicleBreakEffectParameter | — | N | Break effect. |  |

## InvasionParameter

Night invasion

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StartTimeRatio` | Float | BP+SL | S | Fraction of the night timer at which this enemy starts its invasion (attacking the Lumiknoll). Per-instance. | 0.3, 0.49, 0.19 |
| `RagingMotionName` | Name | BP | N | Animation played when the enemy becomes enraged at night. | "Charge", "WarCry", "Liquid" |

## IwakkoAIParameter

Iwakko = hermit-crab-like crystal shell enemy (throws Pikmin; drops its shell "Kara"). Per-instance: bBareStart

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bBareStart` | Bool | SL | S | Starts without its shell. | false |
| `EncounterXY` | Float | BP | N | Encounter radius. | 300 |
| `EncounterZ` | Float | BP | N | Encounter height. | 150 |
| `ThrowXY` | Float | — | N | Throw distance. |  |
| `ThrowZ` | Float | BP | N | Throw height. | 150 |
| `bThrowIncludeSticker` | Bool | — | N | Throws latched Pikmin. |  |
| `IgnoreThrowNearPikmin` | Float | — | N | Ignore close Pikmin for throws. |  |
| `AvatarFlickSpeedXY` | Float | BP | N | Captain flick horizontal. | 100 |
| `AvatarFlickSpeedZ` | Float | BP | N | Captain flick vertical. | 300 |
| `NearFlickDist` | Float | BP | N | Near flick distance. | 25 |
| `NearFlickTime` | Float | BP | N | Near flick time. | 1 |
| `DontTouchMeXY` | Float | BP | N | Personal radius. | 75 |
| `DontTouchMeBombXY` | Float | — | N | Personal radius vs bombs. |  |
| `DontTouchMeZ` | Float | — | N | Personal height. |  |
| `DiveSearchXY` | Float | BP | N | Dive search radius. | 300 |
| `DiveSearchZ` | Float | — | N | Dive search height. |  |
| `ChaseSearchXY` | Float | — | N | Chase radius. |  |
| `ChaseSearchZ` | Float | — | N | Chase height. |  |
| `LoopNumRandMinWSRest` | Int | — | N | Idle loop min (walk-stop-rest). |  |
| `LoopNumRandMaxWSRest` | Int | — | N | Idle loop max. |  |
| `LoopNumRandMinRDSRest` | Int | — | N | Idle loop min (ready-dive). |  |
| `LoopNumRandMaxRDSRest` | Int | BP | N | Idle loop max. | 1 |
| `LoopNumRandMinIWSRest` | Int | BP | N | Idle loop min. | 2 |
| `DistRandMinWidth` | Float | BP | N | Random destination min width. | 30 |
| `DistRandMaxWidth` | Float | BP | N | Max width. | 50 |
| `DistRandMinLength` | Float | BP | N | Min length. | 30 |
| `DistRandMaxLength` | Float | BP | N | Max length. | 50 |
| `SqDistHomeRange` | Float | — | N | Squared home range. |  |
| `SqXYDistRandDest` | Float | — | N | Squared random destination range. |  |
| `XYDistAvoidKara` | Float | BP | N | Avoid distance from its shell. | 150 |
| `XYDistAvoidOuter` | Float | BP | N | Avoid distance from the outside. | 200 |
| `DistXZEnableDive` | Float | — | N | Dive distance. |  |
| `MoveVelIniWan` | Float | — | N | Wander speed. |  |
| `MoveVelDrctDv` | Float | — | N | Direct dive speed. |  |
| `MoveVelRdyDv` | Float | — | N | Ready dive speed. |  |
| `MoveVelKaraOn` | Float | — | N | Speed with shell. |  |
| `ChaseAngVelTimeRatio` | Float | BP | N | Chase turn ratio. | 5 |
| `SecMaxThrowOK` | Float | BP | N | Max throw window. | 0 |
| `ThrowHeight` | Float | BP | N | Throw height. | 200 |
| `XZDistDodge` | Float | BP | N | Dodge distance. | 110 |
| `SecGiveUpBare` | Float | BP | N | Give up time without shell. | 2.5 |
| `SecGiveUpKara` | Float | — | N | Give up time with shell. |  |
| `ThrowAngle` | Float | — | N | Throw angle. |  |
| `SqDistEnableSlide` | Float | — | N | Squared slide distance. |  |
| `DotValEnableSlide` | Float | — | N | Slide angle. |  |
| `HeightKaraSearch` | Float | — | N | Shell search height. |  |
| `FrmKillGC` | Int | — | N | Frames before cleanup. |  |
| `KaraDropParam` | DropParameter | BP+SL | S | Drop table of its shell. |  |
| `KaraActor` | Class | BP | N | Shell class. |  |

## IwakkoCrystalAIParameter

Crystal shell

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WingPikminFallSpeed` | Float | BP | N | Winged Pikmin fall speed when hit. | 800 |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `PressRadius` | Float | BP | N | Crush radius. | 16 |
| `DownEffectRequest` | EftRequest | BP | N | Land effect. |  |
| `DownCameraShakeData` | Class | BP | N | Camera shake class. |  |
| `DownShakeParam` | ShakeCameraParameter | BP | N | Camera shake. |  |

## KaburiBaseAIParameter

Kaburi = shell-wearing enemies (hide under a shell/lid)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BombGuardAngRad` | Float | — | N | Angle guarded against bombs. |  |
| `NearTargetTime` | Float | — | N | Time a target is near before attacking. |  |
| `NearTargetDistanceXY` | Float | — | N | Near distance. |  |
| `NearTargetDistanceZ` | Float | BP | N | Near height. | 50 |
| `InAndOutFlickArg` | FlickArg | BP | N | Flick when popping in/out. |  |
| `ForceAttackTime` | Float | BP | N | Forced attack time. | 7 |
| `ForceAttackRadius` | Float | — | N | Forced attack radius. |  |
| `OffsetDistForHappyApeal` | Float | BP | N | Oatchi detection offset. | 20 |

## KajiokoshiAIParameter

Kajiokoshi = fire-starting enemy (spawns fires)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BirthActorBoneName` | Name | BP | N | Bone fires spawn from. | "T_j006" |
| `FireEffect00` | KajiokoshiEffectParameter | BP | N | Fire effect 1. |  |
| `FireEffect01` | KajiokoshiEffectParameter | BP | N | Fire effect 2. |  |
| `BodyKinoEffect` | KajiokoshiEffectParameter | BP | N | Body effect. |  |
| `SpawnActor` | Class | BP | N | Fire class. |  |
| `SpawnInterval` | Float | BP | N | Interval. | 1.2000000476837158 |
| `SpawnLimitDist` | Float | BP | N | Min distance between fires. | 15 |
| `bDebugSpawnLimit` | Bool | — | N | Debug. |  |
| `FlickWaitTime` | Float | BP | N | Flick wait. | 0.800000011920929 |
| `AttackNearBurningRadius` | Float | BP | N | Attack radius near fires. | 80 |
| `PoolParam` | KajiokoshiPoolParameter | BP | N | Fire pool. |  |
| `RideActorDamageRadius` | Float | BP | N | Rider damage radius. | 25 |

## KajiokoshiEffectParameter

Effect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Effect` | ParticleSystem | BP | N | Effect. |  |
| `SocketName` | Name | BP | N | Socket. | "B_j000", "T_j001", "T_j006" |
| `RotationType` | EKajiokoshiEffectRotationType | BP | N | Rotation mode. | "EKajiokoshiEffectRotationType::Actor" |
| `RotateOffset` | Vector | BP | N | Rotation offset. |  |

## KajiokoshiPoolParameter

Pool

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PoolType` | EGenericActorPoolType | BP | N | Pool type. | "EGenericActorPoolType::KajiokoshiFire", "EGenericActorPoolType::KinoKajiokoshiS |
| `PoolActorNum` | Int | — | N | Actors. |  |
| `PoolBufNum` | Int | — | N | Buffer. |  |

## KanitamaAIParameter

Kanitama = crab-like guard enemy (guards with claws, blows bubbles, parries). Per-instance: bAmbush

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bAmbush` | Bool | SL | S | Starts buried in ambush. | true |
| `FlickStickTime` | Float | BP | N | Time before flicking latched Pikmin. | 1.5 |
| `SearchHeight` | Float | — | N | Search height. |  |
| `SlackAngle` | Float | BP | N | Turn slack. | 15 |
| `GuardSlackAngle` | Float | BP | N | Guard slack. | 25 |
| `LockOnTime` | Float | — | N | Lock-on time. |  |
| `NearScoreBonus` | Float | — | N | Target score bonus for near. |  |
| `FarScoreBonus` | Float | — | N | Target score bonus for far. |  |
| `NoGuardTurnSpeedRate` | Float | — | N | Turn speed not guarding. |  |
| `SlowAngVelTimeRatio` | Float | BP | N | Slow turn ratio. | 0.10000000149011612 |
| `GuardTurnAnimSpd` | Float | — | N | Guard turn animation speed. |  |
| `MoveInterval` | Float | — | N | Move interval. |  |
| `MoveTimeMin` | Float | BP | N | Min move time. | 3 |
| `MoveTimeMax` | Float | BP | N | Max move time. | 4 |
| `ProwlMinUpdateSec` | Float | BP | N | Prowl update min. | 3 |
| `ProwlMaxUpdateSec` | Float | BP | N | Prowl update max. | 4.5 |
| `EscapeMinUpdateSec` | Float | BP | N | Escape update min. | 2 |
| `EscapeMaxUpdateSec` | Float | BP | N | Escape update max. | 3 |
| `ProwlMinRadRate` | Float | BP | N | Prowl min radius ratio. | 0 |
| `ProwlMaxRadRate` | Float | BP | N | Prowl max radius ratio. | 0.699999988079071 |
| `ProwlAngle` | Float | — | N | Prowl angle. |  |
| `EscapeAngle` | Float | — | N | Escape angle. |  |
| `ProwlMinDistRateFromActor` | Float | — | N | Prowl min distance ratio. |  |
| `EscapeMinDistRateFromActor` | Float | BP | N | Escape min distance ratio. | 0.699999988079071 |
| `SideStepGuardNum` | Int | — | N | Side-steps per guard. |  |
| `SideStepRockCoef` | Int | — | N | Side-step rock coefficient. |  |
| `SideStepSec` | Float | — | N | Side-step time. |  |
| `AttackInterval` | Float | — | N | Attack interval. |  |
| `AttackMinRadius` | Float | — | N | Min attack radius. |  |
| `AttackRadius` | Float | — | N | Attack radius. |  |
| `AttackHeight` | Float | BP | N | Attack height. | 30 |
| `AttackHeightOffset` | Float | BP | N | Attack height offset. | -20 |
| `AttackAngle` | Float | — | N | Attack angle. |  |
| `AttackFlickArgForPlayer` | FlickArg | BP | N | Captain flick. |  |
| `HBAngle` | Float | — | N | Claw swipe angle. |  |
| `HBSearchOffset` | Float | — | N | Claw swipe offset. |  |
| `HBDirType` | FFlickDirType | BP | N | Claw flick direction. | "FFlickDirType::Left" |
| `HBFlickSpeedXY` | Float | BP | N | Claw flick horizontal. | 210 |
| `HBFlickSpeedZ` | Float | BP | N | Claw flick vertical. | 300 |
| `HBFlickRandAng` | Float | BP | N | Claw flick random angle. | 20 |
| `HBFlickPlayerDamage` | Float | BP | N | Claw damage to captains. | 20 |
| `BubbleActor` | Class | BP | N | Bubble class. |  |
| `BubbleStickerNum` | Int | — | N | Latched Pikmin that trigger bubbles. |  |
| `BubbleMinInterval` | Float | BP | N | Min bubble interval. | 0.019999999552965164 |
| `BubbleMaxInterval` | Float | BP | N | Max bubble interval. | 0.029999999329447746 |
| `BubbleMinVel` | Float | BP | N | Min bubble speed. | 2.5 |
| `BubbleMaxVel` | Float | BP | N | Max bubble speed. | 3 |
| `bFixedBubbleVelZ` | Bool | BP | N | Fixed vertical bubble speed. | true |
| `FixedBubbleVelOffsetZ` | Float | BP | N | Fixed vertical offset. | -0.20000000298023224 |
| `BubbleVelOffsetZ` | Float | — | N | Vertical offset. |  |
| `BubbleOffset` | Float | — | N | Bubble offset. |  |
| `BubbleHomingDistance` | Float | BP | N | Bubble homing distance. | 8 |
| `ParrySlackSec` | Float | — | N | Parry window. |  |
| `ParryStickerNum` | Int | — | N | Latched Pikmin to parry. |  |
| `ParryDistance` | Float | BP | N | Parry distance. | 150 |
| `ParryNearPikNum` | Int | — | N | Near Pikmin to parry. |  |
| `ThrownAngle` | Float | — | N | Throw angle. |  |
| `ThrownAngleOffset` | Float | — | N | Throw angle offset. |  |
| `GuardEndDelay` | Float | BP | N | Guard end delay. | 0.25 |
| `GuardRatioVel` | Float | — | N | Guard blend velocity. |  |
| `GuardRatioVelR` | Float | — | N | Guard blend velocity (release). |  |
| `GuardRatioAcc` | Float | — | N | Guard blend acceleration. |  |
| `GuardRatioAccR` | Float | — | N | Guard blend acceleration (release). |  |
| `GuardRatioP` | Float | — | N | Guard blend P. |  |
| `GuardYawOffset` | Float | BP | N | Guard yaw. | 80 |
| `GuardDistance` | Float | BP | N | Guard distance. | 40 |
| `GuardCollisionScaleMag` | Float | — | N | Guard collision scale. |  |

## KareHamboAIParameter

Land/night variant of Hambo that runs and hides

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HappyFlickParam` | FlickArg | BP | N | Flick applied to Oatchi. |  |
| `AppealToHappyParam` | AppealToHappyParam | BP | N | Oatchi detection. |  |
| `SearchArea` | CakeSSphereSearchArea | BP | N | Search area. |  |
| `HideSearchPikminArea` | CakeSSphereSearchArea | BP | N | Search area while hidden. |  |
| `SearchPlayerArea` | CakeSSphereSearchArea | BP | N | Player search area. |  |
| `SafeArea` | CakeSSphereSearchArea | BP | N | Safe area. |  |
| `GoHomeSpeed` | Float | BP | N | Go home speed. | 180 |
| `ChaseSpeed` | Float | BP | N | Chase speed. | 180 |
| `EscapeSpeed` | Float | BP | N | Escape speed. | 210 |
| `InWaterSpeedRate` | Float | — | N | Water speed ratio. |  |
| `WaterDepth` | Float | — | N | Water depth. |  |
| `MinWaitTime` | Float | BP | N | Min wait. | 1.5 |
| `MaxWaitTime` | Float | BP | N | Max wait. | 2.5 |
| `MinEscapeTime` | Float | — | N | Min escape. |  |
| `MaxEscapeTime` | Float | — | N | Max escape. |  |
| `MinChaseTime` | Float | BP | N | Min chase. | 1, 0.5 |
| `MaxChaseTime` | Float | BP | N | Max chase. | 2, 1 |
| `FallGravity` | Float | — | N | Fall gravity. |  |
| `MaxWallCos` | Float | — | N | Wall angle limit. |  |
| `AvoidTurnAngDeg` | Float | — | N | Avoid turn. |  |
| `WallAvoidTime` | Float | — | N | Wall avoid time. |  |
| `BombPanicTime` | Float | — | N | Panic time from bombs. |  |
| `FlickIntervalTime` | Float | — | N | Flick interval. |  |
| `SearchHamboXY` | Float | BP | N | Radius for other Hambos. | 100 |
| `SearchHamboZ` | Float | — | N | Height. |  |
| `SearchPikminXY` | Float | — | N | Pikmin radius. |  |
| `SearchPikminZ` | Float | — | N | Height. |  |
| `ForceFlickPikminNum` | Int | — | N | Latched Pikmin forcing a flick. |  |
| `ForceFlickTime` | Float | BP | N | Forced flick time. | 1 |
| `IntervalRotateTimeMin` | Float | BP | N | Min rotate interval. | 0.4000000059604645 |
| `IntervalRotateTimeMax` | Float | BP | N | Max rotate interval. | 0.699999988079071 |
| `FallRotateRate` | Float | BP | N | Fall rotation. | 1 |
| `FallTurnRate` | Float | BP | N | Fall turning. | 0.30000001192092896 |
| `FallRotateSpeed` | Float | BP | N | Fall rotation speed. | 140 |
| `FallSpeed` | Float | — | N | Fall speed. |  |
| `FallScaleRatioPerMinute` | Float | BP | N | Fall scale change. | 0.5 |
| `WanderRotateRate` | Float | — | N | Wander rotation. |  |
| `WanderSecMin` | Float | BP | N | Min wander. | 1 |
| `WanderSecMax` | Float | BP | N | Max wander. | 3 |
| `InvasionSpeed` | Float | — | N | Night invasion speed. |  |
| `DieMoveSpeed` | Float | — | N | Death move speed. |  |
| `CheckWallDistance` | Float | — | N | Wall check distance. |  |
| `PelletMoveSpeed` | Float | — | N | Pellet carrying speed. |  |

## KemekujiAIParameter

Kemekuji = worm/slug enemy that eats captains and drops a flower

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `InvationTerritoryRadius` | Float | BP | N | Night invasion territory radius. | 60 |
| `DirectRockNumLiquid` | Int | — | N | Rock Pikmin hits to liquefy (direct). |  |
| `ZutsukiRockNumLiquid` | Int | — | N | Rock Pikmin headbutts to liquefy. |  |
| `LiquidRadiusXY` | Float | — | N | Liquid radius. |  |
| `LiquidRadiusZ` | Float | — | N | Liquid height. |  |
| `DefaultMoveSpeed` | Float | — | N | Default speed. |  |
| `ChaseMoveSpeed` | Float | — | N | Chase speed. |  |
| `DefaultAngVelTimeMax` | Float | — | N | Default turn max. |  |
| `DefaultAngVelTimeMin` | Float | — | N | Default turn min. |  |
| `ChaseAngVelTimeMax` | Float | — | N | Chase turn max. |  |
| `ChaseAngVelTimeMin` | Float | — | N | Chase turn min. |  |
| `AngleDistanceBase` | Float | — | N | Angle base. |  |
| `AddAngVelTime` | Float | — | N | Turn time added. |  |
| `SubAngVelTime` | Float | — | N | Turn time subtracted. |  |
| `ArriveDistance` | Float | BP | N | Arrival distance. | 50 |
| `bNoMoveMotionDone` | Bool | — | N | No move motion. |  |
| `EatPlayerRadius1st` | Float | BP | N | First eat radius. | 20 |
| `EatPlayerRadius2nd` | Float | BP | N | Second eat radius. | 50 |
| `EatPlayerFlickSpeedXY` | Float | BP | N | Spit horizontal speed. | 175 |
| `EatPlayerFlickSpeedZ` | Float | — | N | Spit vertical speed. |  |
| `BodyDamageRate` | Float | BP | N | Body damage multiplier. | 0.6600000262260437 |
| `DropFlowerActor` | Class | BP | N | Flower dropped. |  |
| `DropFolowerPosOfs` | Vector | BP | N | Flower drop offset. |  |
| `DropFlowerVelocity` | Vector | — | N | Flower drop velocity. |  |

## KingChappyBaseAIParameter

Emperor Bulblax family base. Per-instance: AttackParameter.TangueColiisionScopeRatio & bTangueCollisionOnlyWall, WarCryParameter.bTriggerByAppear, PressParameter.bSinkFloor, AppearParameter.bSinkFloor, HideParameter.AppearDelayTime

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HideParameter` | KingChappyBaseHideParameter | BP+SL | S | Hidden (buried) state. |  |
| `AppearParameter` | KingChappyBaseAppearParameter | BP+SL | S | Appearing from the ground. |  |
| `WalkParameter` | KingChappyBaseWalkParameter | BP+SL | S | Walking. |  |
| `AttackParameter` | KingChappyBaseAttackParameter | BP+SL | S | Tongue attack. |  |
| `PressParameter` | KingChappyBasePressParameter | BP+SL | S | Body press. |  |
| `WarCryParameter` | KingChappyBaseWarCryParameter | BP+SL | S | War cry (panic roar). |  |
| `DamageParameter` | KingChappyBaseDamageParameter | BP | N | Damage reaction. |  |
| `InvalidHitFaceMessageParameter` | KingChappyBaseInvalidHitFaceMessageParameter | BP | N | Hint when attacks do nothing. |  |
| `BlindRadius2D` | Float | BP | N | Blind spot radius. | 130 |
| `AddHitCountByPlayer` | Float | — | N | Hit count added per captain hit. |  |
| `BombGuardAng` | Float | BP | N | Angle guarded against bombs. | 90 |
| `BombDamageRatio` | Float | — | N | Bomb damage multiplier. |  |

## KingChappyBaseAppearParameter

Emerging from the ground

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FlickRadius2D` | Float | BP | N | Flick radius when emerging. | 108, 65 |
| `bSinkFloor` | Bool | SL | S | Emerging sinks the floor (per-instance). | true |
| `PressFloorParameter` | PressFloorParameter | BP | N | Floor deformation. |  |

## KingChappyBaseAttackParameter

Tongue attack. Per-instance: TangueColiisionScopeRatio, bTangueCollisionOnlyWall

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ViewRadius2D` | Float | BP | N | Sight radius. | 400 |
| `ViewHalfHeight` | Float | BP | N | Sight height. | 70, 42 |
| `ViewAngle` | Float | BP | N | Sight angle. | 180 |
| `PersonalRadius2D` | Float | — | N | Personal radius. |  |
| `AttackableRadius2D` | Float | BP | N | Tongue range. | 240 |
| `AttackableHalfHeight` | Float | BP | N | Tongue height. | 70, 42 |
| `AttackableAngle` | Float | — | N | Tongue angle. |  |
| `bEatableStickToMe` | Bool | — | N | Can eat Pikmin latched on it. |  |
| `BanTime` | Float | BP | N | Attack cooldown. | 1.5 |
| `TangueColiisionScopeRatio` | Float | — | S | Fraction of the tongue that collides. |  |
| `TangueCollIgnoreBottomDiffRatio` | Float | BP | N | Ignore collisions below this ratio. | 0.05000000074505806 |
| `bTangueCollisionOnlyWall` | Bool | BP+SL | S | Tongue only collides with walls. | false |
| `TangueCollCheckNormalThreshold` | Float | — | N | Wall normal threshold. |  |

## KingChappyBaseBigJumpParameter

Big jump attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StartLifeRatio` | Float | BP | N | Big jumps become available below this life ratio. | 0.6700000166893005 |
| `CanTransitionChaseTime` | Float | BP | N | Time chasing before a big jump can be chosen. | 5 |
| `TransitionRatioForAtkFailed` | Float | BP | N | Chance to big-jump after a failed attack. | 0.4000000059604645 |
| `JumpableRadius2D` | Float | BP | N | Horizontal distance to target at which it can jump. | 350 |
| `JumpableHeight` | Float | — | N | Height difference allowed for a jump. |  |
| `JumpableAngle` | Float | — | N | Angle to target allowed for a jump. |  |
| `StartContinuousLifeRatio` | Float | BP | N | Below this life ratio it may chain jumps. | 0.33000001311302185 |
| `ContinuousJumpRatio` | Float | BP | N | Probability of chaining another jump. | 0.800000011920929 |
| `ContinuousJumpLimitNum` | Int | BP | N | Max chained jumps. | 2 |
| `BanTime` | Float | BP | N | Cooldown before another big jump. | 8 |
| `SignTime` | Float | — | N | Wind-up time before jumping. |  |
| `SignTimeForAfterAttack` | Float | BP | N | Wind-up time when following another attack. | 2.5 |
| `bUpdateTargetPos` | Bool | BP | N | Track the target position during the jump. | true |
| `bSinkFloor` | Bool | SL | S | Landing sinks/deforms soft floors (press floor). Per-instance. | true |
| `SinkFloorDistance` | Float | BP | N | Radius of the floor sink. | 100 |
| `SinkFloowOffset` | Vector | BP | N | Offset of the floor sink. |  |
| `PressFloorParameter` | PressFloorParameter | BP | N | Floor deformation settings, see PressFloorParameter. |  |
| `bWithFallRock` | Bool | SL | S | Landing makes rocks fall from the ceiling. Per-instance. | false |
| `bFallRockOnlyAtLastJump` | Bool | — | N | Only the last chained jump drops rocks. |  |
| `FallRockParameter` | KingChappyBaseFallRockParameter | BP+SL | S | Falling rock settings, see KingChappyBaseFallRockParameter. |  |

## KingChappyBaseDamageParameter

Damage

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ComebackTime` | Float | BP | N | Recovery time after being stunned. | 4 |

## KingChappyBaseFallRockParameter

Falling rocks

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpawnActor` | Class | BP | N | Rock actor class. |  |
| `PoolNumCoefficient` | Int | — | N | Pool size multiplier. |  |
| `SpawnNum` | Int | BP | N | Rocks spawned per jump. | 7 |
| `SpawnRangeArroundSelf` | KingChappyBaseFallRockRange | BP | N | Spawn range around the boss. |  |
| `SpawnRangeArroundPlayer` | KingChappyBaseFallRockRange | BP | N | Spawn range around the player. |  |
| `bSinkFloor` | Bool | SL | S | Rock impacts sink the floor. Per-instance. | true |
| `SinkFloorDistance` | Float | — | N | Sink radius for rock impacts. |  |
| `PressFloorParameter` | PressFloorParameter | BP | N | Floor deformation for rock impacts. |  |

## KingChappyBaseFallRockRange

Rock spawn range

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius2DMin` | Float | BP | N | Min horizontal distance. | 150 |
| `Radius2DMax` | Float | BP | N | Max horizontal distance. | 300, 200 |
| `HeightMin` | Float | BP | N | Min drop height. | 800 |
| `HeightMax` | Float | BP | N | Max drop height. | 1100 |

## KingChappyBaseHideParameter

Hidden

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HideTimeMin` | Float | — | N | Min hidden time. |  |
| `NoticeRadius2D` | Float | BP | N | Notice radius. | 130, 90 |
| `AppearDelayTime` | Float | SL | S | Delay before appearing (per-instance). | 1 |
| `NoticeRadius2DForNearOtakaraCarry` | Float | BP | N | Notice radius for treasure carriers. | 500 |
| `OffsetDistForHappyApeal` | Float | — | N | Oatchi detection offset. |  |

## KingChappyBaseInvalidHitFaceMessageParameter

Useless-hit hint

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bCheckDistance` | Bool | BP | N | Require the captain within RequestDistance. | true |
| `RequestDistance` | Float | BP | N | Distance. | 800 |
| `RequestMessageNeedUselessAttackHitCount` | Int | BP | N | Useless hits before the hint. | 5 |
| `IncrementUselessAttackHitCountCoolTime` | Float | — | N | Count cooldown. |  |
| `bDecrementUselessAttackHitCount` | Bool | — | N | Decay the count. |  |
| `DecrementUselessAttackHitCountCoolTime` | Float | — | N | Decay interval. |  |

## KingChappyBasePressParameter

Body press. Per-instance: bSinkFloor

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PressRadius2D` | Float | BP | N | Crush radius. | 80, 40 |
| `PressHalfHeight` | Float | BP | N | Crush height. | 10 |
| `PressAreaOffset` | Vector | BP | N | Crush offset. |  |
| `bSinkFloor` | Bool | SL | S | Sinks the floor. | true |
| `SinkFloowOffset` | Vector | BP | N | Sink offset. |  |
| `PressFloorParameter` | PressFloorParameter | BP | N | Floor deformation. |  |

## KingChappyBaseWalkParameter

Walking/searching

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LimitTime` | Float | BP | N | Max walk time. | 7 |
| `SearchRadius2D` | Float | BP | N | Search radius. | 400 |
| `SearchHalfHeight` | Float | BP | N | Search height. | 70, 42 |
| `SearchAngle` | Float | BP | N | Search angle. | 180 |
| `bSearchOuterTerritory` | Bool | SL | S | Search outside territory. | false |
| `SearchableTerritoryRatio` | Float | — | N | Searchable territory fraction. |  |
| `LimitTimeForMoveLostPos` | Float | BP | N | Time moving to last seen position. | 4.5 |
| `ToWaitRatio` | Float | BP | N | Chance to go back to waiting. | 1 |

## KingChappyBaseWarCryParameter

War cry (panics Pikmin). Per-instance: bTriggerByAppear

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StartLifeRatio` | Float | — | N | Life ratio to start crying. |  |
| `ChooseRatio` | Float | BP | N | Chance to cry. | 0.20000000298023224 |
| `FlickDirType` | FFlickDirType | BP | N | Flick direction. | "FFlickDirType::Front" |
| `PanicRadius2D` | Float | BP | N | Panic radius. | 420, 330 |
| `PanicHalfHeight` | Float | — | N | Panic height. |  |
| `PanicAngle` | Float | — | N | Panic angle. |  |
| `PanicAreaOffset` | Vector | BP | N | Panic offset. |  |
| `ForceLifeRatios` | Float | BP | N | Life ratios that force a cry. |  |
| `bTriggerByAppear` | Bool | SL | S | Cries when it appears. | true |

## KochappyAIParameter

Dwarf Bulborb. Per-instance: bCloseSetting

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `IceEffect` | ParticleSystem | BP | N | Ice effect (frozen variant). |  |
| `WaitLimitCount` | Int | BP | N | Waits before moving. | 7 |
| `DispHintSporeDownCount` | Int | BP | N | Spore stuns before a hint. | 4 |
| `MessageDist` | Float | BP | N | Hint distance. | 550 |
| `bCloseSetting` | Bool | SL | T | Confines the Dwarf Bulborb: on init (KochappyAIComponent vfunc_138) it clears bSearchOuterTerritory on SearchAreaGoToHome, SearchAreaCaution, SearchAreaRest and SearchAreaOtakaraCarry, so it only reacts to targets inside its territory. Per-instance. | true |
| `IgnoreStopConditionBlendTime` | Float | — | N | Blend time. |  |
| `RideActorDamageRadius` | Float | BP | N | Rider damage radius. | 7.5 |

## KoganeBaseAIParameter

Kogane = Iridescent Flint Beetle family (drops items per hit, burrows). Per-instance: SearchDivePointCheckRay, DropParameter.CanDieDropIndex, bAppearRotatorFixed, TurnAngleMin/Max

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchDivePointCheckRay` | Vector | — | S | Ray used to find burrow points. |  |
| `AppearTimeMin` | Float | — | N | Min time above ground. |  |
| `AppearTimeMax` | Float | BP | N | Max time above ground. | 25 |
| `MoveTimeMin` | Float | BP | N | Min move time. | 0.699999988079071, 0.5 |
| `MoveTimeMax` | Float | BP | N | Max move time. | 1.2999999523162842, 1 |
| `WaitTimeMin` | Float | BP | N | Min wait. | 1.5, 1, 0.5 |
| `WaitTimeMax` | Float | BP | N | Max wait. | 1.5, 0.699999988079071 |
| `TurnAngleMin` | Float | BP+SL | S | Min turn. | 15 |
| `TurnAngleMax` | Float | BP | S | Max turn. | 30, 45 |
| `AppearAccelRate` | Float | BP | N | Appear acceleration. | 0.10000000149011612, 0.30000001192092896 |
| `ResidentEffect` | ParticleSystem | BP | N | Sparkle effect. |  |
| `DropParameter` | KoganeBaseDropParameter | BP+SL | S | Per-hit drops (see KoganeBaseDropParameter). |  |
| `AppearAgainIntervalMin` | Float | BP | N | Min re-appear interval. | 10 |
| `AppearAgainIntervalMax` | Float | BP | N | Max re-appear interval. | 10 |
| `bAppearRotatorFixed` | Bool | BP+SL | S | Always appears facing the same direction. | false |
| `CheckWallDistance` | Float | — | N | Wall check distance. |  |
| `CheckWallOffset` | Vector | — | N | Wall check offset. |  |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |

## KoganeBaseDropParameter

Per-hit drop tables

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CanDieDropIndex` | Int | BP+SL | S | Index in ParameterList after which the beetle can die. | 2 |
| `ParameterList` | DropParameter | BP+SL | S | Drop tables used in sequence for each hit. |  |

## KoganiAIParameter

Kogani = small crab (hides, snips, blows bubbles; claws can be broken). Per-instance: bEnableHidden, HiddenParameter

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableHidden` | Bool | SL | S | Starts hidden. | true |
| `HiddenParameter` | KoganiHiddenParameter | BP+SL | S | Hidden behaviour. |  |
| `MoveParameter` | KoganiMoveParameter | BP | N | Movement. |  |
| `AttackParameter` | KoganiAttackParameter | BP | N | Claw attack. |  |
| `BubbleBlowParameter` | KoganiBubbleBlowParameter | BP | N | Bubble blowing. |  |
| `ClawDestroyParameter` | KoganiClawDestroyParameter | BP | N | Breakable claws. |  |
| `ContinuousStickedTimeToFlick` | Float | — | N | Time latched before flicking. |  |

## KoganiAttackableArea

Attack ring

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MinRadius2D` | Float | BP | N | Min radius. | 25 |
| `MaxRadius2D` | Float | BP | N | Max radius. | 45 |
| `HalfHeight` | Float | BP | N | Half height. | 70 |
| `Angle` | Float | BP | N | Angle. | 30 |
| `HeightOffset` | Float | — | N | Height offset. |  |

## KoganiAttackParameter

Attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackInterval` | Float | — | N | Interval. |  |
| `AttackableAreaNormal` | KoganiAttackableArea | — | N | Normal attack area. |  |
| `AttackableAreaBubble` | KoganiAttackableArea | BP | N | Attack area vs bubbled targets. |  |
| `GiveupFailedNumForAttackInBubble` | Int | — | N | Failed attempts before giving up. |  |
| `ValidGiveupTargetTime` | Float | — | N | Give-up target time. |  |
| `FlickArgForHappy` | FlickArg | BP | N | Flick on Oatchi. |  |

## KoganiBubbleBlowParameter

Bubbles

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BubbleActor` | Class | BP | N | Bubble class. |  |
| `BubblePoolNum` | Int | — | N | Pool size. |  |
| `ProbChoseBubbleBlow` | Float | BP | N | Chance to blow bubbles. | 0.5 |
| `OffsetlBlowDistOffset` | Float | — | N | Blow distance offset. |  |
| `MinBlowVel` | Float | — | N | Min speed. |  |
| `MaxBlowVel` | Float | — | N | Max speed. |  |
| `bFixedBlowVelZ` | Bool | — | N | Fixed vertical speed. |  |
| `FixedBlowVelZ` | Float | — | N | Vertical speed. |  |
| `OffsetBlowVelZ` | Float | — | N | Vertical offset. |  |
| `MinBlowInterval` | Float | — | N | Min interval. |  |
| `MaxBlowInterval` | Float | — | N | Max interval. |  |
| `bCatchSticker` | Bool | — | N | Bubbles catch latched Pikmin. |  |
| `StickerCatchRadius` | Float | — | N | Catch radius. |  |

## KoganiChaseParameter

Chase scoring

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveInterval` | Float | — | N | Move interval. |  |
| `SearchHalfHeight` | Float | — | N | Search height. |  |
| `TargetValidTime` | Float | — | N | Target valid time. |  |
| `NearScoreBonus` | Float | — | N | Near bonus. |  |
| `FarScoreBonus` | Float | BP | N | Far bonus. | 1.5 |
| `ToPlayerScoreBonus` | Float | BP | N | Captain bonus. | 0.800000011920929 |
| `ToPikminScoreBonus` | Float | — | N | Pikmin bonus. |  |
| `InBubbleScoreBonus` | Float | BP | N | Bonus for targets in bubbles. | 3.5 |

## KoganiClawDestroyParameter

Breakable claws

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CollTreeName` | Name | BP | N | Collision tree of the claw. | "CollTree_Arm", "CollTree_WeakPoint00", "CollTree_WeakPoint01" |
| `StageSettings` | KoganiClawDestroyStageSettings | BP | N | Break stages. |  |

## KoganiClawDestroyStageSettings

Claw break stage

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Life ratio for the stage. |  |
| `DispSlotName` | Name | BP | N | Mesh slot shown. | "Hasami01", "Hasami02", "None" |
| `Effect` | ParticleSystem | — | N | Effect. |  |
| `EffectBoneName` | Name | BP | N | Effect bone. | "RA_j004", "Root", "root" |

## KoganiHiddenParameter

Hidden

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NoticeRadius2D` | Float | BP+SL | S | Notice radius. | 200 |
| `NoticeHalfHeight` | Float | SL | S | Notice height. | 140 |
| `GoHomeInterval` | Float | BP | N | Go-home interval. | 3 |
| `FlickRadius2DForAppear` | Float | — | N | Flick radius on appearing. |  |
| `OffsetDistForHappyApeal` | Float | BP | N | Oatchi detection offset. | 20 |

## KoganiMoveParameter

Movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MinMovableTime` | Float | — | N | Min move time. |  |
| `MaxMovableTime` | Float | — | N | Max move time. |  |
| `ProwlParam` | KoganiProwlParameter | — | N | Prowling. |  |
| `ChaseParam` | KoganiChaseParameter | BP | N | Chasing. |  |

## KomushAIParameter

Komush = small mushroom creature. Per-instance: bSetRandomRotate

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bSetRandomRotate` | Bool | SL | S | Random initial rotation. | false |
| `ShakeCurve` | CurveFloat | — | N | Shake curve. |  |
| `ShakeTime` | Float | — | N | Shake time. |  |

## KumaChappyAIParameter

Spotty Bulbear (leads Dwarf Bulbears along a spline). Per-instance: SearchTagName, GiveupDistance (MaxChildNum is NOT per-instance)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchTagName` | Name | SL | S | Spline route tag (e.g. SplineKumaChappy_A). | "SplineKumaChappy_C", "SplineKumaChappy_A" |
| `GiveupDistance` | Float | BP+SL | S | Distance at which it stops chasing and returns to its route. | 500, 300, 400 |
| `MaxChildNum` | Int | SL | N | Max followers (blueprint-only; not in the static serializer). | 10 |
| `ChildSearchRangeXY` | Float | BP | N | Radius to recruit followers. | 250 |
| `ChildSearchRangeZ` | Float | — | N | Height range. |  |
| `ChildCIDs` | Name | BP | N | Follower CIDs. |  |
| `LowSearchGiveupCount` | Int | BP | N | Low searches before giving up. | 3 |
| `LowSearchHeight` | Float | BP | N | Low search height. | 32 |
| `LowSearchTime` | Float | BP | N | Low search time. | 10 |
| `BitePikminWingOfsZ` | Float | BP | N | Bite height for Winged Pikmin. | 60 |

## KurageAIParameter

Kurage = Jellyfloat (vacuums things into its stomach, vomits on death/mash). Per-instance: EatOnBirthRange, bFallStart, SearchAreaRest

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `IgnoreStopConditionBlendTime` | Float | — | N | Blend time. |  |
| `PlayerCapsuleSpeedXY` | Float | — | N | Captured captain speed XY. |  |
| `PlayerCapsuleSpeedZ` | Float | — | N | Captured captain speed Z. |  |
| `PlayerCapsuleRadiusXY` | Float | — | N | Capture capsule radius. |  |
| `PlayerCapsuleRadiusZ` | Float | — | N | Capture capsule height. |  |
| `FallVerticalSpeed` | Float | BP | N | Fall speed. | 80 |
| `FallScaleRatioPerMinute` | Float | BP | N | Fall scale change. | 1 |
| `EscapeAngle` | Float | — | N | Escape angle. |  |
| `EscapeLength` | Float | BP | N | Escape distance. | 100 |
| `EscapeArea` | CakeSearchArea | BP | N | Threat area. |  |
| `EatLimitTime` | Float | BP | N | Max inhale time. | 3, 2.5 |
| `EatCoolTime` | Float | BP | N | Inhale cooldown. | 0.2, 0 |
| `SuccessEatCoolTime` | Float | BP | N | Cooldown after a successful inhale. | 0 |
| `VomitCoolTime` | Float | BP | N | Vomit cooldown. | 3 |
| `VacuumPower` | Float | BP | N | Suction power. | 200, 330 |
| `VacuumXYSpeedRate` | Float | — | N | Horizontal suction rate. |  |
| `VacuumAngle` | Float | — | N | Suction angle. |  |
| `VacuumLength` | Float | BP | N | Suction length. | 240, 245 |
| `EatRadius` | Float | BP | N | Eat radius. | 18, 40 |
| `EatHalfHeight` | Float | BP | N | Eat height. | 25 |
| `EatOffset` | Vector | BP | N | Eat offset. |  |
| `bDoSwallow` | Bool | BP | N | Swallows (digests) captured Pikmin. | true |
| `DoSwallowTime` | Float | BP | N | Time before swallowing. | 10 |
| `VomitRotationRatio` | Float | — | N | Vomit rotation. |  |
| `PlayerVomitTime` | Float | — | N | Time before spitting out a captain. |  |
| `PlayerVomitSpeed` | Float | BP | N | Captain spit speed. | 500 |
| `bPlayerVomitDamage` | Bool | — | N | Captain takes damage when spat. |  |
| `PlayerVomitKillTime` | Float | BP | N | Time until a captured captain is downed. | 30 |
| `CapturedOtakaraScale` | Float | BP | N | Treasure scale inside. | 1 |
| `CapturedPikminScale` | Float | BP | N | Pikmin scale inside. | 0.800000011920929 |
| `CapturedPlayerScale` | Float | — | N | Captain scale inside. |  |
| `CapturedOtherScale` | Float | BP | N | Other scale inside. | 0.699999988079071 |
| `CapturedSurviverScale` | Float | — | N | Castaway scale inside. |  |
| `CapturedOnyonScale` | Float | — | N | Onion scale inside. |  |
| `CaptureTotalLimit` | Int | BP | N | Max captured total. | 100 |
| `CaptureOtakaraLimit` | Int | BP | N | Max treasure. | 0, 1 |
| `CapturePikminLimit` | Int | BP | N | Max Pikmin. | 100 |
| `CapturePlayerLimit` | Int | BP | N | Max captains. | 0, 1 |
| `CaptureOtherLimit` | Int | BP | N | Max other. | 3, 1 |
| `OnceCaptureTotalLimit` | Int | BP | N | Max per inhale. | 50, 40 |
| `bForceInStomach` | Bool | BP | N | Force captives into the stomach. | true |
| `StomachRadiusRatio` | Float | BP | N | Stomach radius ratio. | 0 |
| `DeadVomitSpeed` | Float | BP | N | Vomit speed on death. | 200 |
| `DeadVomitMaxSpeed` | Float | — | N | Max vomit speed on death. |  |
| `bVacuumOtakara` | Bool | BP | N | Sucks treasure. | false |
| `bVacuumPikmin` | Bool | — | N | Sucks Pikmin. |  |
| `bVacuumPlayer` | Bool | BP | N | Sucks captains. | false |
| `bVacuumOther` | Bool | — | N | Sucks other things. |  |
| `bAllSetFlickMoveCoolTime` | Bool | — | N | Shared flick-move cooldown. |  |
| `bFlickMove` | Bool | BP | N | Moves away after flicking. | true |
| `FlickMoveArea` | BaumkuchenSearchArea | BP | N | Flick move ring. |  |
| `FlickMoveCoolTime` | Float | BP | N | Flick move cooldown. | 10 |
| `bVacuumFaildFlickMove` | Bool | BP | N | Moves after a failed inhale. | true |
| `VacuumFaildFlickMoveArea` | BaumkuchenSearchArea | BP | N | Ring for that move. |  |
| `VacuumFaildFlickMoveCoolTime` | Float | BP | N | Cooldown. | 10 |
| `VomitByGacha` | Int | BP | N | Button presses to escape. | 15 |
| `TurnSpeedUpRate` | Float | BP | N | Turn speed up. | 0.05000000074505806 |
| `TurnSpeedDownRate` | Float | BP | N | Turn speed down. | 0.800000011920929 |
| `EatOnBirthRange` | Float | SL | S | Radius it inhales on spawning (per-instance). | 50, 100, 150 |
| `bFallStart` | Bool | SL | S | Spawns by falling from above (per-instance). | true |
| `FallStartHeight` | Float | BP | N | Start height when falling in. | 350 |
| `CapsuleRadius` | Float | BP | N | Collision radius. | 15 |
| `CapsuleRadiusForSensorBomb` | Float | BP | N | Radius for sensor bombs. | 5, 10 |
| `CanContinuousAttack` | Int | BP | N | Consecutive attacks. | 3 |
| `ContinuousAttackFailedIgnoreTime` | Float | BP | N | Ignore time after failed attacks. | 15 |
| `VomitSpeedXY` | Float | BP | N | Vomit horizontal speed. | 0.10000000149011612 |
| `VomitSpeedZ` | Float | BP | N | Vomit vertical speed. | -500 |
| `FullStockFlickSpeedXY` | Float | — | N | Flick speed when full. |  |
| `FullStockFlickSpeedZ` | Float | — | N | Flick vertical when full. |  |

## KurioneAIParameter

Kurione = sea angel (swims, hides, lays eggs). Per-instance: bFixedHeight, bGoFaceDir, bDropHotExtractOnly

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ZukanForceAppearTime` | Float | — | S | Piklopedia appear time. |  |
| `bFixedHeight` | Bool | — | S | Stays at a fixed height. |  |
| `BirthEgg` | Class | BP | N | Egg class. |  |
| `DeadUpInitialSpeed` | Float | BP | N | Initial rise speed on death. | 0 |
| `DeadUpAcceleration` | Float | BP | N | Rise acceleration. | 3000 |
| `DeadInvisibleTime` | Float | — | N | Invisible time after death. |  |
| `DeadUpHideTime` | Float | BP | N | Hide time after rising. | 2 |
| `WanderToHideTime` | Float | BP | N | Wander before hiding. | 7.5 |
| `ReAppearTime` | Float | BP | N | Re-appear time. | 1.5 |
| `bGoFaceDir` | Bool | BP+SL | S | Moves in its facing direction. | false |
| `ShadowScaleRate` | Float | BP | N | Shadow scale. | 0.9850000143051147 |
| `bDropHotExtractOnly` | Bool | SL | S | Drops only nectar. | true |

## MarAIParameter

Mar = Puffy Blowhog family (flies, blows wind/ice; falls when enough Pikmin latch). Per-instance: bWayCheckToTarget, WayCheckStartHeightOffset, AppearFallSearchArea, AIWander min/max

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ChaseSpeed` | Float | BP | N | Chase speed. | 108 |
| `AttackAreaParam` | CylinderSearchArea | BP | N | Blow attack area. |  |
| `AttackableDist` | Float | — | N | Blow distance. |  |
| `BlowStartTime` | Float | BP | N | Blow wind-up. | 1 |
| `BlowingTime` | Float | — | N | Blow duration. |  |
| `BlowSpeed` | Float | BP | N | Blow speed. | 13 |
| `BlowHeight` | Float | — | N | Blow height. |  |
| `BlowPower` | Float | BP | N | Blow power. | 1.75 |
| `BlowPowerRand` | Float | — | N | Random blow power. |  |
| `BlowPowerZ` | Float | BP | N | Vertical blow power. | 3.5 |
| `BlowPowerZRand` | Float | — | N | Random vertical power. |  |
| `BlowPowerAvatorCorVal` | Float | — | N | Captain blow correction. |  |
| `BlowClampAng` | Float | BP | N | Blow clamp angle. | 0.4000000059604645 |
| `BlowHDRumblePosRatio` | Float | BP | N | Rumble position. | 0.44999998807907104 |
| `BlowHDRumbleKey` | Name | BP | N | Rumble preset. | "Teki_Mar_Breathe" |
| `StickNumToFall` | Int | BP | N | Latched Pikmin needed to bring it down. | 10 |
| `FlickStartTimeToFly` | Float | BP | N | Flick time in the air. | 2 |
| `FlickStartTimeToGround` | Float | BP | N | Flick time on the ground. | 3.5 |
| `FallFlickParam` | AIFlickParameter | BP | N | Flick when falling. |  |
| `TakeOffStartTime` | Float | BP | N | Time before taking off again. | 3.5 |
| `DieFallOfsZ` | Float | BP | N | Death fall height. | 300 |
| `ScaleRate` | Float | — | N | Scale rate. |  |
| `bClose` | Bool | SL | S | Close-range variant. | true |
| `ChaseMoveRatio` | Float | — | N | Chase move ratio. |  |
| `ChaseMoveRatioClose` | Float | BP | N | Chase move ratio (close). | 0.10999999940395355 |
| `ChaseTurnRatio` | Float | — | N | Chase turn ratio. |  |
| `ChaseTurnRatioClose` | Float | BP | N | Chase turn ratio (close). | 0.029999999329447746 |
| `IceEffectRequest` | EftRequest | BP | N | Ice breath effect. |  |
| `FreezeRayDistMax` | Float | BP | N | Freeze ray distance. | 280 |
| `FreezeRadius` | Float | — | N | Freeze radius. |  |
| `FreezeRemainingTime` | Float | — | N | Freeze time. |  |
| `bAppearFallStart` | Bool | SL | S | Appears by dropping from above. | true |
| `AppearFallStartHeight` | Float | SL | S | Drop start height. | 50 |
| `AppearFallVerticalSpeed` | Float | BP+SL | S | Drop speed. | 5 |
| `AppearFallScaleRatioPerMinute` | Float | — | N | Drop scale change. |  |
| `AppearFallSearchArea` | CylinderSearchArea | SL | S | Area that triggers the drop. |  |
| `ChaseGiveupTimeMin` | Float | BP | N | Min chase give-up time. | 10 |
| `ChaseGiveupTimeMax` | Float | BP | N | Max chase give-up time. | 10 |
| `bWayCheckToTarget` | Bool | SL | S | Check path to target. | true |
| `WayCheckStartHeightOffset` | Float | SL | S | Path check height. | 70 |

## MiniMochiAIParameter

Mini Mochi = small blob that absorbs Pikmin/bombs. Per-instance flag bSpawnFromEgg

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bSpawnFromEgg` | Bool | SL | S | Spawned from an egg. | false |
| `AbsorbPikminEffect` | ParticleSystem | BP | N | Absorb effect. |  |
| `AbsorbBombEffect` | ParticleSystem | BP | N | Absorb bomb effect. |  |
| `ChaseToWaitTimeMin` | Float | — | N | Min chase before waiting. |  |
| `ChaseToWaitTimeMax` | Float | — | N | Max chase before waiting. |  |
| `ForceWaitTimeMin` | Float | — | N | Min forced wait. |  |
| `ForceWaitTimeMax` | Float | — | N | Max forced wait. |  |
| `AbsorbMax` | Int | — | N | Max absorbed. |  |
| `ChaseToAtkTime` | Float | — | N | Chase before attacking. |  |
| `AbsorbStickOfs` | Vector | BP | N | Absorbed offset. |  |
| `AbsorbStickDispersion` | Transform | BP | N | Absorbed dispersion. |  |
| `KnockBackVelocity` | Float | BP | N | Knock-back. | 50 |
| `LandingFlickArg` | FlickArg | BP | N | Landing flick. |  |
| `PikminAttackSuccessDistWhenFrozen` | Float | — | N | Attack distance when frozen. |  |
| `FaceMsgParam` | MiniMochiFaceMsgParam | BP | N | Hint. |  |
| `RideOnBoundSpdXY` | Float | BP | N | Bounce speed XY. | 170 |
| `RideOnBoundSpdZ` | Float | — | N | Bounce speed Z. |  |
| `SearchBombRadius` | Float | — | N | Bomb search radius. |  |

## MiniMochiFaceMsgParam

Hint

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ChkAtkPikminRadius` | Float | BP | N | Radius. | 50 |
| `ChkAtkPikminTime` | Float | BP | N | Time. | 1.5 |
| `FaceMsgId` | Name | — | N | Message IDs. |  |

## MitsuMochiAbsorbParameter

Absorb

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CorrectStickLenRatio` | Float | — | N | Stick length correction. |  |
| `CorrectStickRatio` | Float | — | N | Stick correction. |  |
| `AbsorbTime` | Float | BP | N | Absorb time. | 5 |
| `AbsorbIcePikminDamage` | Float | BP | N | Damage per absorbed Ice Pikmin. | 1.1119999885559082 |
| `AbsorbIcePikminMaxNum` | Int | BP | N | Max Ice Pikmin counted. | 100 |
| `DamageOverTimeInterval` | Float | — | N | DOT interval. |  |
| `DamageOverTimeValue` | Float | — | N | DOT value. |  |
| `GachaCount` | Int | — | N | Button presses to escape. |  |
| `PlayerEscapeParam` | MitsuMochiEscapeParameter | BP | N | Captain escape. |  |
| `PikminEscapeParam` | MitsuMochiEscapeParameter | BP | N | Pikmin escape. |  |

## MitsuMochiAIParameter

Mitsu Mochi = big blob boss (absorbs Pikmin, core pulled by its "hair", splits into bodies)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MimicrySearchRadius` | Float | — | N | Disguise search radius. |  |
| `EftParam` | MitsuMochiEffectParameter | BP | N | Bubble effects. |  |
| `AppealToHappyParam` | AppealToHappyParam | BP | N | Oatchi detection. |  |
| `ChaseParam` | MitsuMochiChaseParameter | BP | N | Chase. |  |
| `CounterParam` | MitsuMochiCounterParameter | BP | N | Counter attack. |  |
| `PullHairParam` | MitsuMochiPullHairParameter | — | N | Pulling the core out by its hair. |  |
| `DownParam` | MitsuMochiDownParameter | BP | N | Knock-down. |  |
| `AbsorbParam` | MitsuMochiAbsorbParameter | BP | N | Absorbing. |  |
| `SplitBodyParam` | MitsuMochiSplidBodyParameter | BP | N | Splitting. |  |
| `ContinuousAttackParam` | MitsuMochiContinuousAttackParameter | BP | N | Continuous attacks. |  |
| `QuickTurnParam` | MitsuMochiQuickTurnParameter | — | N | Quick turns. |  |
| `FrozenParam` | MitsuMochiFrozenParameter | BP | N | Frozen behaviour. |  |
| `TerritoryEdgeParam` | MitsuMochiTerritoryEdge | BP | N | Territory edge behaviour. |  |
| `LookAtParam` | MitsuMochiLookAtParameter | — | N | Look-at. |  |
| `FaceMsgParam` | MitsuMochiFaceMsgParameter | BP | N | Hints. |  |

## MitsuMochiChaseParameter

Chase

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ExpandTargetAng` | Float | — | N | Expand angle. |  |
| `ShrinkTargetAng` | Float | — | N | Shrink angle. |  |
| `ExpandTime` | Float | — | N | Expand time. |  |
| `ShrinkTime` | Float | — | N | Shrink time. |  |
| `ShrinkVelocity` | Float | — | N | Shrink speed. |  |
| `TargetIntpParam` | MitsuMochiTargetIntpParameter | BP | N | Target interpolation. |  |

## MitsuMochiContinuousAttackParameter

Continuous attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ChaseToContinuousAttackTime` | Float | BP | N | Chase time before continuous attack. | 3 |
| `ContinuousAttackNumParam` | MitsuMochiContinuousAttackNumParameter | BP | N | Attacks by life ratio. |  |
| `MaxAngVelTime` | Float | — | N | Turn speed. |  |
| `AngAccelRatio` | Float | — | N | Turn accel. |  |
| `GoHomeMaxAngVelTime` | Float | BP | N | Go home turn speed. | 7 |
| `GoHomeAngAccelRatio` | Float | — | N | Go home turn accel. |  |

## MitsuMochiCounterParameter

Counter

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PullHairToCounterTime` | Float | BP | N | Hair-pull time before countering. | 10 |
| `CounterChargeLoopTime` | Float | — | N | Charge time. |  |
| `CounterLoopTime` | Float | — | N | Counter time. |  |
| `CounterFlickArg` | FlickArg | BP | N | Counter flick. |  |

## MitsuMochiDownParameter

Knock-down

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PullCoreFlickArg` | FlickArg | BP | N | Flick when core is pulled. |  |
| `PullCoreDownTime` | Float | — | N | Down time after pull. |  |
| `BombDownTime` | Float | — | N | Down time from bombs. |  |
| `InsideBombDownTime` | Float | — | N | Down time from bombs inside it. |  |
| `FrozenToDownHitNum` | Int | BP | N | Hits while frozen to knock down. | 9 |
| `HappyAttackHitNum` | Int | BP | N | Oatchi hits to knock down. | 4 |
| `HappyRushHitNum` | Int | BP | N | Oatchi rushes to knock down. | 9 |
| `FrozenDownTime` | Float | — | N | Down time frozen. |  |
| `ThunderDownTime` | Float | — | N | Down time from electricity. |  |
| `MaxAngVelTime` | Float | — | N | Turn speed. |  |
| `AngAccelRatio` | Float | — | N | Turn accel. |  |
| `DownEndSearchRadius` | Float | — | N | Search radius after recovering. |  |

## MitsuMochiEffectParameter

Bubbles

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BubbleEffect` | ParticleSystem | BP | N | Bubble effect. |  |
| `AbsorbBubbleEffect` | ParticleSystem | BP | N | Absorb bubble effect. |  |
| `BubbleEffectBoneName` | Name | BP | N | Bones. |  |

## MitsuMochiEscapeParameter

Escaping the blob

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EscapeFueTime` | Float | BP | N | Whistle time to escape. | 2.800000011920929, 0.800000011920929 |
| `FrozenEscapeFueTime` | Float | — | N | Whistle time when frozen. |  |
| `EscapeFueTimeDecRate` | Float | BP | N | Decay rate. | 0.10000000298023223, 0.20000000298023224 |
| `EscapeMoveSpd` | Float | BP | N | Escape speed. | 35 |
| `AbsorbedMoveSpd` | Float | BP | N | Move speed while absorbed. | 7 |
| `EscapeJumpDist` | Float | BP | N | Escape jump distance. | 60 |
| `EscapeJumpHeight` | Float | — | N | Escape jump height. |  |
| `EscapeInvincibleTime` | Float | BP | N | Invincibility after escaping. | 0.5 |

## MitsuMochiFaceMsgParameter

Hint

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NoPullHairTime` | Float | BP | N | Time without hair pulls before a hint. | 30 |

## MitsuMochiFrozenParameter

Frozen

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ChangeAttackDistance` | Float | — | N | Distance at which frozen attack changes. |  |
| `PikminAttackSuccessDistance` | Float | — | N | Pikmin hit distance when frozen. |  |
| `AffordanceSphere` | Float | — | N | Grab sphere when frozen. |  |
| `FrozenEscapeCurve` | CurveVector | BP | N | Escape vibration curve. |  |
| `FrozenEscapeVibMinTime` | Float | — | N | Min vibration time. |  |

## MitsuMochiSplidBodyParameter

Splitting

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SplitBodyActor` | Class | BP | N | Split body class. |  |
| `SplitOffsetXY` | Float | — | N | Split offset XY. |  |
| `SplitOffsetZ` | Float | — | N | Split offset Z. |  |
| `SplitVelocityMinXY` | Float | BP | N | Min launch speed. | 300 |
| `SplitVelocityMaxXY` | Float | BP | N | Max launch speed. | 400 |
| `SplitVelocityXYToCore` | Float | BP | N | Speed back to core. | 200 |
| `SplitVelocityZ` | Float | — | N | Vertical speed. |  |
| `SpawnParam` | MitsuMochiSplidBodySpawnParameter | BP | N | Split waves by life ratio. |  |
| `AbsorbSplitBodyDist` | Float | — | N | Re-absorb distance. |  |

## MitsuMochiSplidBodySpawnParameter

Split wave

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRatio` | Float | — | N | Life ratio. |  |
| `SplitNum` | CarrotRange | — | N | Number of bodies. |  |
| `SplitBodyScale` | CarrotRangeF | — | N | Scale range. |  |
| `SplitBodyScaleMaxNum` | Int | BP | N | Max scaled bodies. | 4, 20 |
| `SplitBodyAngleBase` | Float | BP | N | Base angle. | 0 |
| `SplitBodyRandAngle` | Float | BP | N | Random angle. | 15, 20, 30 |

## MitsuMochiSplitBodyAbsorbParameter

Absorbing

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AbsorbRadius` | Float | — | N | Radius. |  |
| `AbsorbPikminNum` | Int | — | N | Max Pikmin. |  |
| `AbsorbIcePikminDamage` | Float | BP | N | Damage per Ice Pikmin. | 200 |
| `GachaCount` | Int | — | N | Button presses to escape. |  |
| `CorrectStickRatioForHappy` | Float | — | N | Oatchi stick correction. |  |
| `PlayerEscapeParam` | MitsuMochiSplitBodyEscapeParameter | BP | N | Captain escape. |  |
| `PikminEscapeParam` | MitsuMochiSplitBodyEscapeParameter | BP | N | Pikmin escape. |  |

## MitsuMochiSplitBodyAIParameter

Split-off blobs

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveParam` | MitsuMochiSplitBodyMoveParameter | BP | N | Movement. |  |
| `AbsorbParam` | MitsuMochiSplitBodyAbsorbParameter | BP | N | Absorbing. |  |

## MitsuMochiSplitBodyEscapeParameter

Escape

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EscapeFueTime` | Float | — | N | Whistle time. |  |
| `EscapeMoveSpd` | Float | — | N | Escape speed. |  |
| `EscapeJumpDist` | Float | — | N | Jump distance. |  |
| `EscapeJumpHeight` | Float | — | N | Jump height. |  |
| `EscapeInvincibleTime` | Float | BP | N | Invincibility. | 1.5, 2 |

## MitsuMochiSplitBodyMoveParameter

Movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveWaitTime` | CarrotRangeF | — | N | Wait range. |  |
| `AbsorbDistance` | Float | BP | N | Distance to rejoin. | 45 |
| `WaitMoveVelocity` | Float | — | N | Speed while waiting. |  |
| `AbsorbVelocity` | Float | — | N | Speed rejoining. |  |
| `MaxAngVelTime` | Float | — | N | Turn speed. |  |
| `AngAccelRatio` | Float | — | N | Turn accel. |  |

## MitsuMochiTargetIntpParameter

Interpolation

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BlendOn` | BlendParam | BP | N | Blend in. |  |
| `BlendOff` | BlendParam | BP | N | Blend out. |  |
| `GiveUpTime` | Float | BP | N | Give up time. | 0.30000001192092896 |

## MitsuMochiTerritoryEdge

Territory edge

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StopTurnTime` | Float | — | N | Stop-turn time. |  |
| `AttackLoopTime` | Float | — | N | Attack loop time. |  |
| `ExpandTargetAng` | Float | — | N | Expand angle. |  |
| `SearchTargetRadius` | Float | — | N | Search radius. |  |
| `TurnParam` | MitsuMochiTerritoryEdgeTurnParam | — | N | Turning. |  |
| `ExpandTurnParam` | MitsuMochiTerritoryEdgeTurnParam | BP | N | Expanding turn. |  |
| `TurnLerpRatio` | Float | — | N | Turn blend. |  |
| `FlickArg` | FlickArg | — | N | Flick. |  |
| `TargetIntpParam` | MitsuMochiTargetIntpParameter | BP | N | Target interpolation. |  |

## MitsuMochiTerritoryEdgeTurnParam

Turning

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxAngVelTime` | Float | BP | N | Turn speed. | 20 |
| `AngAccelRatio` | Float | — | N | Turn accel. |  |

## MiulinAIParameter

Miulin = enemy that sits on / swats at Pikmin heads with its hands. Per-instance: SitWaitParam.bEnable

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NarrowAttackArea` | CakeSearchArea | BP | N | Narrow attack area. |  |
| `WideAttackArea` | CakeSearchArea | BP | N | Wide attack area. |  |
| `NarrowAttackPikminHeadArea` | CakeSearchArea | BP | N | Narrow head attack area. |  |
| `WideAttackPikminHeadArea` | CakeSearchArea | BP | N | Wide head attack area. |  |
| `LeftFingerForwardAttackXY` | Float | — | N | Left finger forward swipe volume. |  |
| `LeftFingerForwardAttackZ` | Float | BP | N | Left finger forward swipe volume. | 32 |
| `LeftFingerForwardAttackOffset` | Vector | BP | N | Left finger forward swipe volume. |  |
| `LeftWristForwardAttackXY` | Float | BP | N | Left wrist forward swipe volume. | 25 |
| `LeftWristForwardAttackZ` | Float | BP | N | Left wrist forward swipe volume. | 32 |
| `RightFingerForwardAttackXY` | Float | — | N | Right finger forward swipe volume. |  |
| `RightFingerForwardAttackZ` | Float | BP | N | Right finger forward swipe volume. | 32 |
| `LeftFingerLeftAttackXY` | Float | BP | N | Left finger side swipe volume. | 35 |
| `LeftFingerLeftAttackZ` | Float | BP | N | Left finger side swipe volume. | 32 |
| `LeftFingerLeftAttackOffset` | Vector | BP | N | Left finger side swipe volume. |  |
| `LeftWristLeftAttackXY` | Float | BP | N | Left wrist side swipe volume. | 25 |
| `LeftWristLeftAttackZ` | Float | BP | N | Left wrist side swipe volume. | 32 |
| `RightFingerRightAttackXY` | Float | — | N | Right finger side swipe volume. |  |
| `RightFingerRightAttackZ` | Float | BP | N | Right finger side swipe volume. | 32 |
| `RightFingerRightAttackOffset` | Vector | BP | N | Right finger side swipe volume. |  |
| `FallSpeedZ` | Float | BP | N | Fall speed. | 180 |
| `SearchPikminHeadRadius` | Float | — | N | Radius for Pikmin heads. |  |
| `SearchPikminHeadArea` | CakeSearchArea | BP | N | Area for Pikmin heads. |  |
| `FillPikminsNumForSitting` | Int | BP | N | Pikmin under it needed to sit. | 5 |
| `AngryFlickArg` | FlickArg | BP | N | Angry flick. |  |
| `AngryWaitTime` | Float | BP | N | Angry wait. | 1.5 |
| `LookAtRateSpeed` | Float | BP | N | Look rate. | 1 |
| `LookAtMoveSpeed` | Float | — | N | Look speed. |  |
| `FlickBound` | ShortcakeBound2 | BP | N | Flick volume. |  |
| `ReservedAngryIntervalTime` | Float | BP | N | Angry interval. | 0.6000000238418579 |
| `ReservedAngryIntervalTimeByHappy` | Float | — | N | Angry interval from Oatchi. |  |
| `AttackFailedNum` | Int | — | N | Failed attacks. |  |
| `DisableAttackRadius` | Float | BP | N | No-attack radius. | 20 |
| `LeaveDistance` | Float | BP | N | Leave distance. | 40 |
| `SitWaitParam` | MiulinSitWaitParameter | BP+SL | S | Sit-and-wait behaviour. |  |

## MiulinSitWaitParameter

Sit wait (per-instance bEnable)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnable` | Bool | SL | S | Sits and waits. | true |
| `Time` | Float | BP | N | Wait time. | 15 |
| `OverrideFillPikminsNumForSitting` | Int | — | N | Override Pikmin count. |  |

## MizunukiAIComponent

Drain plug

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaterBoxID` | Name | BP+SL | S | ID of the water box drained by this plug. | "WaterBox_Off_1", "WaterBox_Off_2" |

## MouthParameter

Swallow/mouth setup (big eaters)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DefaultParameter` | MouthSettings | BP | N | Default MouthSettings. |  |
| `BoneParameter` | BoneParameter | BP | N | Per-bone MouthSettings overrides. |  |
| `bSwallowCameraStartByNotify` | Bool | BP | N | Start that camera from an animation notify. | true |
| `SwallowCameraCurve` | CurveFloat | BP | N | Camera curve while swallowed. |  |
| `MouthCollisionType` | EMouthCollisionType | BP | N | EMouthCollisionType – mouth collision from a socket or bones. | "EMouthCollisionType::Socket", "EMouthCollisionType::Both" |
| `SwallowCameraOffset` | Vector | BP | N | Camera offset while swallowed. |  |
| `IgnoreBoneName` | Name | BP | N | Bones ignored for mouth collision. |  |
| `bEnableSwallowCamera` | Bool | — | N | Camera effect when swallowing a captain. |  |

## MouthSettings

Per-bone mouth settings

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bIsNoLeaf` | Bool | BP | N | Swallowed Pikmin lose their leaf/flower. | true, false |
| `BombFlickVel` | Float | BP | N | Velocity used when a bomb is spat out. | 130, 150, 240 |
| `BombAttachName` | Name | BP | N | Socket bombs attach to. | "C_j000", "C_j004", "S_j000" |
| `bDisableGacha` | Bool | BP | N | Disable button-mash escape. | false, true |
| `PlayerAttachName` | Name | BP | N | Socket captains attach to. | "P_j001", "None", "LC_j001" |
| `bIsIgnoreLanding` | Bool | BP | N | Ignore landing when released. | true |
| `bIsFree` | Bool | BP | N | Mouth slot is free. | true |
| `PikminAttachName` | Name | BP | N | Socket Pikmin attach to. | "None" |

## MoveFloorAIParameter

Moving platforms (spline). Per-instance: WaitTime, MoveSpeed, bEnableWarpActor, WarpOffset (+spline points)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaitTime` | Float | BP+SL | S | Wait at each end. | 1.5, 1, 4 |
| `MoveSpeed` | Float | SL | S | Speed. | 100, 150, 90.5 |
| `MoveAcceleration` | Float | — | N | Acceleration. |  |
| `bCanMove` | Bool | BP | N | Moving from the start. | false |
| `bPikminRideType` | Bool | BP | N | Pikmin can ride. | true |
| `StartWaitTime` | Float | BP | N | Initial wait. | 1.5 |
| `bRoundType` | Bool | BP | N | Loops around instead of back-and-forth. | true |
| `ShakeIntervalTime` | Float | BP | N | Shake interval. | 0.20000000298023224 |
| `BrakingDistCorrectVal` | Float | — | N | Braking correction. |  |
| `bEnableWarpActor` | Bool | SL | S | Carries a warp point. | true |
| `WarpOffset` | Vector | SL | S | Warp point offset. |  |

## NamazuAIParameter

Namazu = catfish

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HappyFlickParam` | FlickArg | BP | N | Flick on Oatchi. |  |
| `EatableRange` | Float | BP | N | Eat range. | 35 |
| `ChaseArriveDistance` | Float | — | N | Chase arrival distance. |  |
| `ChaseArriveAngleDistance` | Float | — | N | Chase arrival angle. |  |

## NightDropParameter

Night drop origin

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BoneName` | Name | BP | N | Bone used as drop origin at night. | "X_j001", "S_j003_flower" |
| `Offset` | Vector | BP | N | Offset from that bone. |  |

## NiseBaseAIParameter

Nise = fake-treasure enemies (covered in fake/real treasures as weak points)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WeakPointParameter` | NiseBaseWeakPointParameter | BP | N | Weak points (treasure pieces). |  |
| `JammingParameter` | NiseBaseJammingParameter | BP | N | Radar jamming effect. |  |
| `ChaseParameter` | NiseBaseChaseParameter | BP | N | Chase. |  |
| `AttackParameter` | NiseBaseAttackParameter | BP | N | Attack. |  |
| `DownParameter` | NiseBaseDownParameter | BP | N | Knock-down. |  |
| `LockonParameter` | NiseBaseLockonParameter | BP | N | Lock-on. |  |
| `PercepteArea` | CylinderSearchArea | BP | N | Perception area. |  |
| `PercepteFlickLimitTime` | Float | BP | N | Time before flicking when perceived. | 2 |

## NiseBaseAttackParameter

Attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableLimitEatStickedOtakara` | Bool | BP | N | Limit eating latched treasure. | true |
| `LimitEatNumStickedOtakara` | Int | BP | N | Limit. | 5 |
| `CapsuleBoneName` | Name | — | N | Capsule bone. |  |
| `CapsuleStickOfs` | Vector | BP | N | Capsule offset. |  |
| `CapsuleStickDispersionPos` | Vector | BP | N | Capsule dispersion. |  |
| `FlickArgForStickedOtakara` | FlickArg | BP | N | Flick for latched treasure. |  |
| `NiseOtakaraEatStartArea` | CakeSearchArea | BP | N | Eat start area. |  |
| `NiseOtakaraEatRange` | Float | BP | N | Eat range. | 7, 4.800000190734863 |
| `NiseOtakaraEatOffset` | Vector | — | N | Eat offset. |  |
| `NiseOtakaraOffsetCalcSpace` | EOffsetCalcSpace | — | N | Offset space. |  |

## NiseBaseChaseParameter

Chase

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchTargetBanTime` | Float | BP | N | Target ban time. | 6 |

## NiseBaseDownParameter

Down

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ComebackTime` | Float | BP | N | Recovery time. | 1.5 |
| `DetachNiseOtakaraCameraParam` | ShakeCameraParameter | BP | N | Shake when a fake treasure detaches. |  |
| `DetachNiseOtakaraCameraShakeData` | Class | BP | N | Shake class. |  |
| `DestroyWeakPointCameraParam` | ShakeCameraParameter | BP | N | Shake when a weak point breaks. |  |
| `DestroyWeakPointCameraShakeData` | Class | BP | N | Shake class. |  |

## NiseBaseJammingParameter

Jamming

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Effect` | ParticleSystem | BP | N | Effect. |  |

## NiseBaseLockonParameter

Lock-on

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableIgnoreLimitAngle` | Bool | BP | N | Ignore the lock-on angle limit inside the area. | true |
| `IgnoreLimitAngleArea` | CylinderSearchArea | BP | N | Area. |  |

## NiseBaseMorphParameter

Morph

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StepParameters` | NiseBaseMorphStepInfo | — | N | Morph steps. |  |
| `ExRate` | Float | BP | N | Exaggeration rate. | 2, 1 |

## NiseBaseMorphPlayInfo

Morph target

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TargetName` | Name | BP | N | Morph target. | "wp00_01", "wp01_01", "wp02_01" |
| `Curve` | CurveFloat | — | N | Curve. |  |
| `MaterialAnimName` | Name | BP | N | Material animation. | "Damage00", "Damage01", "Damage02" |

## NiseBaseMorphStepInfo

Morph step

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ThresholdLifeRatio` | Float | BP | N | Life ratio. | 0.5, 0, 0.699999988079071 |
| `TargetScaleMag` | Float | BP | N | Target scale. | 0.5, 0 |
| `DamagePlayInfo` | NiseBaseMorphPlayInfo | — | N | Damage morph. |  |
| `DestroyPlayInfo` | NiseBaseMorphPlayInfo | — | N | Destroy morph. |  |

## NiseBaseOtakaraPieceParameter

Treasure piece

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CollTreeName` | Name | — | N | Collision tree. |  |
| `MaterialSlotName` | Name | — | N | Material slot. |  |
| `OffsetPos` | Vector | — | N | Offset. |  |
| `Rotation` | Rotator | — | N | Rotation. |  |
| `LockOnPointOffset` | Vector | — | N | Lock-on offset. |  |
| `StickSphereRadiuus` | Float | BP | N | Latch sphere radius. | 23, 12.5 |
| `StickBoneOffsetPos` | Vector | — | N | Latch bone offset. |  |
| `StickAnimTranslationCurve` | CurveVector | — | N | Stick animation translation. |  |
| `StickAnimRotationCurve` | CurveVector | — | N | Stick animation rotation. |  |
| `FallAnimTranslationCurve` | CurveVector | BP | N | Fall animation translation. | "Null" |
| `FallAnimRotationCurve` | CurveVector | — | N | Fall animation rotation. |  |
| `bStickingHeightLimit` | Bool | — | N | Limit latch height. |  |
| `StickingHeightLimitLength` | Float | — | N | Latch height limit. |  |

## NiseBaseWeakPointParameter

Weak points

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PersonalParams` | NiseBaseWeakPointPersonalParameter | BP | N | Per weak point settings. |  |
| `OtakaraClassList` | Class | BP | N | Treasure classes on the body. |  |
| `OtakaraCruckNum` | Int | BP | N | Crack stages. | 2, 1 |
| `FallOtakaraHitCounts` | Int | BP | N | Hits to knock a treasure off. | 30, 15 |
| `BombDamageRatioForNotHitWeakPoint` | Float | BP | N | Bomb damage when missing weak points. | 0.10000000149011612 |
| `FallOtakaraDistance` | Float | BP | N | Knock-off distance. | 270, 150 |
| `FallOtakaraHeight` | Float | — | N | Knock-off height. |  |
| `FallOtakaraTerritoryRatio` | Float | — | N | Knock-off territory ratio. |  |
| `PickupOtakaraTrigerDamage` | Float | BP | N | Damage to re-pick treasure. | 300, 100 |
| `bOtakaraRebirthFlickNonStickers` | Bool | BP | N | Flick nearby Pikmin when a treasure reattaches. | true |
| `OtakaraRebirthFlickArg` | FlickArg | BP | N | That flick. |  |
| `bEnableOtakakraComeOffByCrush` | Bool | — | N | Crushing knocks treasures off. |  |
| `FallOtakaraRecoveryViewLength` | Float | BP | N | View length for recovering treasures. | 450 |
| `FallOtakaraRecoveryViewAngle` | Float | — | N | View angle. |  |
| `FallOtakaraRecoveryForcePenaltyAngle` | Float | BP | N | Penalty angle. | 15 |
| `HitNumByPikminRock` | Float | BP | N | Hit value of Rock Pikmin. | 2.5 |
| `HitNumByHappy` | Float | BP | N | Hit value of Oatchi. | 5 |
| `HitNumByBean` | Float | BP | N | Hit value of Bean. | 1.5 |
| `StickedShakeCameraParam` | ShakeCameraParameter | BP | N | Camera shake. |  |
| `StickedCameraShakeData` | Class | BP | N | Camera shake class. |  |
| `StickedHDRumbleKey` | Name | BP | N | Rumble. | "Teki_Common_Press_L", "Teki_Common_Hit_S" |

## NiseBaseWeakPointPersonalParameter

One weak point

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CollTreeName` | Name | — | N | Collision tree. |  |
| `DestoryEffectParameter` | EftCustomRequestParam | — | N | Destroy effect. |  |
| `DestroyEffectDelayTime` | Float | BP | N | Effect delay. | 0.17000000178813934, 0.10199999809265137, 0.07000000029802322 |
| `OtakaraPieceParameters` | NiseBaseOtakaraPieceParameter | — | N | Treasure pieces. |  |
| `MorphParameter` | NiseBaseMorphParameter | — | N | Morph steps. |  |
| `bStickingHeightLimit` | Bool | BP | N | Limit latch height. | false, true |
| `StickingHeightLimitLength` | Float | BP | N | Latch height limit. | 20, 12.5, 24.5 |

## NiseBossAIParameter

Fake-treasure boss

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FirstWaitParameter` | NiseBossFirstWaitParameter | BP | N | Idle before the fight. |  |
| `DemoParameter` | NiseBossDemoParameter | BP | N | Cutscenes. |  |

## NiseBossDefeatDemoParameter

Defeat

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DieDelayTime` | Float | BP | N | Death delay. | 0.10000000149011612 |

## NiseBossDemoParameter

Cutscenes

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DefeatParameter` | NiseBossDefeatDemoParameter | BP | N | Defeat cutscene. |  |

## NiseBossFirstWaitParameter

Idle

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaitTimeBeforeLookAroundOrWait2` | Float | — | N | Wait before changing idle. |  |
| `ProbTransitionLookAroundOrWait2` | Float | BP | N | Chance to change idle. | 0.6000000238418579 |
| `ProbChooseWait2` | Float | — | N | Chance of the second idle. |  |

## NiseOtakaraAIParameter

Fake treasure (mimic)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `JammingParameter` | NiseOtakaraJammingParameter | BP | N | Radar jamming. |  |
| `DestroyParameter` | NiseOtakaraDestroyParameter | BP | N | Destruction. |  |
| `LandingParameter` | NiseOtakaraLandingParameter | BP | N | Landing. |  |
| `InitMaterialSlotName` | Name | BP | N | Initial material slot. | "T01!!2", "T03!!2", "T03!!3" |
| `DropParameter` | DropParameter | BP | N | Drops. |  |

## NiseOtakaraDestroyParameter

Destroy

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CrackSettings` | NiseOtakaraCrackSettings | BP | N | Crack stages. |  |
| `Effect` | ParticleSystem | BP | N | Effect. |  |

## NiseOtakaraJammingParameter

Jamming

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `JammingRadius` | Float | BP | N | Radius. | 250 |
| `IdlingTimer` | Float | BP | N | Idle timer. | 4 |
| `Effect` | ParticleSystem | BP | N | Effect. |  |

## NiseOtakaraLandingParameter

Landing

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AnimRotationCurve` | CurveVector | BP | N | Rotation curve. |  |
| `LimitSpeedXY` | Float | — | N | Speed limit. |  |
| `ShakeCameraParam` | ShakeCameraParameter | BP | N | Shake. |  |
| `CameraShakeData` | Class | BP | N | Shake class. |  |
| `HDRumbleKey` | Name | BP | N | Rumble. | "Teki_Common_Hit_M", "Teki_Common_Hit_S" |

## NomiAIParameter

Nomi = flea (jumps and latches onto captains/Oatchi)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveParam` | NomiMoveParam | BP | N | Movement. |  |
| `JumpParam` | NomiJumpParam | BP | N | Jumping. |  |
| `StickParam` | NomiStickParam | BP | N | Latching. |  |

## NomiJumpParam

Jumping

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `JumpMass` | Float | — | N | Mass. |  |
| `JumpAttackAltitudeMin` | Float | — | N | Min jump height. |  |
| `JumpAttackAltitudeMax` | Float | — | N | Max jump height. |  |
| `JumpAttackDistMax` | Float | — | N | Max distance. |  |
| `AltitudeRateForPurplePikmin` | Float | — | N | Height ratio vs Purple Pikmin. |  |
| `JumpDistCorrectRate` | Float | — | N | Distance correction. |  |
| `JumpVelocityAttenuationRate` | Float | — | N | Speed decay. |  |
| `JumpCustomGravityRate` | Float | BP | N | Gravity. | 2.200000047683716 |
| `JumpCollisionEnableTime` | Float | — | N | Collision enable delay. |  |
| `EscapeDistMin` | Float | — | N | Min escape. |  |
| `EscapeDistMax` | Float | — | N | Max escape. |  |
| `EscapeDistForPikminPurple` | Float | — | N | Escape from Purple Pikmin. |  |

## NomiMoveParam

Movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveCountMin` | Int | — | N | Min moves. |  |
| `MoveCountMax` | Int | BP | N | Max moves. | 3 |
| `MoveWaitMin` | Float | — | N | Min wait. |  |
| `MoveWaitMax` | Float | — | N | Max wait. |  |
| `MaxContinuousLargeJumpNum` | Int | — | N | Max consecutive big jumps. |  |
| `GiveupTime` | Float | — | N | Give up time. |  |
| `UpdateTerritoryOfsDist` | Float | BP | N | Territory update distance. | 150 |

## NomiStickParam

Latching

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StickAttackInterval` | Float | BP | N | Bite interval while latched. | 0.25 |
| `PlayerStickMax` | Int | — | N | Max fleas on a captain. |  |
| `PlayerStickBoneName` | Name | — | N | Bone they latch to. |  |
| `HappyStickMax` | Int | — | N | Max fleas on Oatchi. |  |
| `FlickByAttackNum` | Int | — | N | Attacks before being flicked off. |  |
| `FlickByGacha` | Int | — | N | Button presses to shake off. |  |
| `FlickSpeedXY` | Float | BP | N | Shake-off horizontal speed. | 100 |
| `FlickSpeedZ` | Float | BP | N | Shake-off vertical speed. | 250 |
| `StickBodyCollisionRadius` | Int | — | N | Collision radius while latched. |  |

## NoraSpawnerAIParameter

Wild ("nora") Pikmin spawner: idle Pikmin groups / Pikmin sprouts you find in the field. Almost everything is per-instance.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpawnPikminList` | Class | BP | S | Pikmin classes to spawn. |  |
| `SpawnPikminHead` | Class | BP | S | Class used when spawning as buried sprouts. |  |
| `SpawnPongashiList` | Class | BP | S | Candypop Bud classes. |  |
| `SpawnUseType` | ESpawnUseType | BP+SL | S | ESpawnUseType: ColorFixed (use PikminColor) or NotOnyonColor (a colour you don't have an Onion for) etc. | "ESpawnUseType::ColorFixed", "ESpawnUseType::NotOnyonColor" |
| `PikminColor` | EPikminColor | BP+SL | S | Pikmin colour spawned. | "EPikminColor::Yellow", "EPikminColor::Blue", "EPikminColor::Red" |
| `SpawnActorType` | ESpawnActorType | BP+SL | S | Spawn walking Pikmin or buried sprouts (PikminHead). | "ESpawnActorType::PikminHead", "ESpawnActorType::Pikmin" |
| `SpawnHeadLeaves` | EPikminLeaves | SL | S | Leaf/bud/flower state of sprouts (Dandori's "dunno int" byte). | "EPikminLeaves::Leaf" |
| `SpawnNum` | Int | BP+SL | S | Number spawned. | 4, 1, 3 |
| `SpawnRadius` | Float | BP+SL | S | Spawn radius. | 30, 40, 20 |
| `NoSpawnRadius` | Float | BP+SL | S | Captains inside this radius block spawning. | 55, 25, 50 |
| `SpawnOffsetZ` | Float | BP | N | Height offset. | 5, 16 |
| `bMabikiEnable` | Bool | BP+SL | T | Enable "mabiki" (thinning): the spawn is skipped/replaced when you already own enough Pikmin of the spawner's colour (decision in FUN_014FFF30; Dandori's "No idea bool"). | true |
| `MabikiNumFromFollow` | Int | BP+SL | T | Threshold count of Pikmin of the spawner's colour at which it thins out (-1 disables). In 2-player co-op the threshold is floor(value*0.6) (FUN_014FFF30). | 30, 50, 5 |
| `MabikiNumFromAll` | Int | BP+SL | T | Second thinning threshold over all owned Pikmin (-1 = off), checked in FUN_014FFF30 (Dandori's "unknownInt"). | -1, 30 |
| `bMabikiPongashi` | Bool | SL | T | When thinned out, a Candypop Bud is placed (at MabikiPongashiOffset) instead of the Pikmin (read in FUN_014FFF30). | true |
| `MabikiPongashiOffset` | Vector | SL | S | Offset of that Candypop Bud. |  |
| `PongashiChangeColorFollowNum` | Int | SL | S | Follower count at which the Candypop colour changes. | 0, 41, 50 |
| `PongashiChangeColorFromFollow` | EPikminColor | SL | S | Colour whose follower count is checked. | "EPikminColor::Undef", "EPikminColor::Yellow", "EPikminColor::Ice" |
| `RandomActorSpawnList` | DropSpawnMiniInfo | BP+SL | S | Extra random actors spawned (Dandori's inventory slots here). |  |
| `bReservedBirth` | Bool | SL | S | Reserve the birth until the player approaches. | true |
| `bDisableForcePongashi` | Bool | SL | S | Never force a Candypop replacement. | true |
| `PongashiColor` | EPikminColor | SL | S | Candypop colour. | "EPikminColor::Yellow", "EPikminColor::Ice", "EPikminColor::Red" |
| `bProWrestling` | Bool | SL | T | Spawned Pikmin start grappling ("pro-wrestling") a nearby enemy found within ProWrestlingTekiSearchRange (vfunc_139 / FUN_01506030). | true |
| `ProWrestlingTekiSearchRange` | Float | SL | S | Radius to find that enemy. | 200, 192.769, 151.77524 |
| `ProWrestlingOffset` | Vector | SL | S | Offset from the enemy. |  |
| `NoraIdlingPresetId` | Name | BP+SL | S | Idle pose preset (NoraHide, NoraSleep, NoraLookdown...). | "NoraHide", "NoraSleep", "NoraLookdown" |
| `bEnablePointLight` | Bool | BP+SL | S | Spawned Pikmin emit a point light (Dandori read this byte as bDisableForcePongashi). | false, true |
| `GroupIdlingType` | EPikminIdlePlayType | BP+SL | S | EPikminIdlePlayType group idle (Guidance, Gather...). | "EPikminIdlePlayType::Guidance", "EPikminIdlePlayType::GatherInCircle" |
| `GroupIdlingLocationList` | Vector | BP | N | Locations used by group idling. |  |
| `bExcludesFue` | Bool | SL | T | Copied onto each spawned Pikmin (+0x686) so they ignore the whistle until touched (FUN_01506030). | true |
| `AIWaitTime` | Float | SL | S | Wait time before the spawned Pikmin's AI starts (Dandori's "-1 float"). | 3, 5 |

## NumaSuitoriAIParameter

NumaSuitori = swamp "sucker" (vacuums Pikmin from a swamp). Per-instance: bFixLocation, SearchAreaRest

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GiveupAttackNum` | Int | BP | N | Failed attacks before giving up. | 2 |
| `bFixLocation` | Bool | SL | S | Stays at a fixed spot. | true |
| `AttackConeBound` | ConeBound | BP | N | Attack cone. |  |
| `AttackConeBoundHeightOffset` | Float | BP | N | Cone height offset. | -40 |
| `EatForwardOffset` | Float | BP | N | Eat offset. | 55 |
| `EatRange` | Float | — | N | Eat range. |  |
| `VacuumConeBound` | ConeBound | BP | N | Vacuum cone. |  |
| `VacuumPower` | Float | BP | N | Vacuum power. | 100 |
| `BombVacuumPower` | Float | BP | N | Vacuum power on bombs. | 350 |
| `VacuumTime` | Float | BP | N | Vacuum time. | 4.5 |
| `CapsuleMoveSpeed` | Float | — | N | Captured move speed. |  |
| `CapsuleScaleSpeed` | Float | — | N | Captured scale speed. |  |
| `VacuumPikminMaxNum` | Int | — | N | Max Pikmin. |  |
| `WaitTimeAfterVacuum` | Float | — | N | Wait after. |  |
| `SearchAreaDisappear` | CylinderSearchArea | BP | N | Disappear area. |  |
| `GroundFlickArg` | FlickArg | BP | N | Ground flick. |  |
| `HideTimeMin` | Float | — | N | Min hidden. |  |
| `AppearDistMax` | Float | BP | N | Max appear distance. | 300 |
| `TweakOfs` | Float | BP | N | Position tweak. | 150 |
| `AppearZOffset` | Float | BP | N | Appear height. | 40 |
| `VomitBoneName` | Name | BP | N | Vomit bone. | "C_j000" |
| `VomitOffset` | Vector | — | N | Vomit offset. |  |
| `VomitSpeed` | Float | BP | N | Vomit speed. | 300 |
| `VacuumGenerateOffset` | Vector | BP | N | Vacuum origin offset. |  |
| `VacuumCoreOffset` | Vector | BP | N | Vacuum core offset. |  |
| `LookAtLerpRate` | Float | BP | N | Look-at rate. | 0.10000000149011612 |
| `CarcassInSwampGravity` | Float | — | N | Carcass gravity in the swamp. |  |
| `CarcassInSwampGravityHeightDiffMin` | Float | BP | N | Min height difference. | 30 |
| `CarcassInSwampGravityHeightDiffMax` | Float | BP | N | Max height difference. | 120 |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |

## ObjectAIParameter

Base parameters for all gimmicks/objects/treasure containers (ObjectAIComponent+0x710). Per-instance: DropParameter, bIgnoreLaterTask, bIgnoreCompleteUI, CompleteUIOffset, bEnableOptimizeWaterBoxContext, bDisableSoftEdge(+OnlyFrom/OnlyTo), LinkNarrowSpaceBoxID, LinkWarpTriggerID, NavMeshTriggerID, escape points

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DropParameter` | DropParameter | BP+SL | S | Items dropped when the object is broken/completed, see DropParameter. Per-instance. |  |
| `bNeedsTerrainCollisionOverride` | Bool | BP | N | Object overrides terrain collision (so Pikmin/players collide with it as terrain). | true |
| `RayOffsetLength` | Float | — | N | Length/offset of the ground ray used to settle the object. |  |
| `EscapePointSerializeNum` | Byte | BP | S | Number of "escape point" scene components whose transforms are saved per instance (serializer FUN_01565C60 writes this many transforms). | 2, 4 |
| `bNeedsAdditionalEscapePoint` | Bool | — | N | Adds an extra escape point (where Pikmin/players are pushed out to when the object moves over them). |  |
| `bIgnoreLaterTask` | Bool | SL | S | Exclude this object from the "later task"/to-do list tracking. Per-instance. | true |
| `bIgnoreCompleteUI` | Bool | — | S | Don't show the completion UI popup when finished. Per-instance. |  |
| `CompleteUIOffset` | Vector | — | S | World offset for the completion UI popup. Per-instance. |  |
| `bEnableOptimizeWaterBoxContext` | Bool | — | S | Enables the water-box context optimisation (skip water checks when not near water). Per-instance. |  |
| `LinkNarrowSpaceBoxID` | Name | SL | S | ID of the NarrowSpace trigger this object is linked to (tight passages / camera). Per-instance. | "NarrowSpace0", "NarrowSpace1", "NarrowSpace2" |
| `LinkWarpTriggerID` | Name | SL | S | ID of the WarpTrigger linked to this object. Per-instance. | "WarpTriggerLink1", "GBridgeFlexible4", "WarpTriggerLink0" |
| `NavMeshTriggerID` | Name | SL | S | ID of the NavMeshTrigger this object toggles when its state changes (e.g. opens a path). Per-instance. | "NavMeshTrigger00", "NavMeshTrigger01", "NavMeshTrigger02" |
| `bEnableCustomSoftEdge` | Bool | BP | N | Use custom soft-edge (Pikmin fall-off protection) settings. | true |
| `bDisableSoftEdge` | Bool | SL | S | Disable the soft edge that stops Pikmin walking off this object. Per-instance. | true, false |
| `bDisableSoftEdgeOnlyFrom` | Bool | SL | S | Disable soft edge only when leaving the object. Per-instance. | true |
| `bDisableSoftEdgeOnlyTo` | Bool | SL | S | Disable soft edge only when stepping onto the object. Per-instance. | true |
| `CarrotColorAnimation` | CarrotColorAnimation | — | N | Material colour animation parameters (see CarrotColorAnimation). |  |
| `InstanceCustomData00` | LinearColor | — | N | Per-instance custom material data (colour) slot 0. |  |
| `InstanceCustomData01` | LinearColor | — | N | Per-instance custom material data (colour) slot 1. |  |

## OoAshibaKinokoAIParameter

Large platform mushroom. Per-instance: bGrown, GrowHeight

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bGrown` | Bool | — | S | Already grown. |  |
| `GrowHeight` | Float | SL | S | Grow height. | 25, 5.5, 40 |
| `EffectSearchRadius` | Float | BP | N | Effect radius. | 150 |
| `CollisionOffset` | Float | BP | N | Collision offset. | 72 |
| `BreakEffect` | ParticleSystem | BP | N | Break effect. |  |
| `IgnoreCrushEventHeight` | Float | — | N | Crush-ignore height. |  |
| `CapsuleShadowFadeRatio` | Vector2D | BP | N | Shadow fade. |  |

## OoPanModokiAIParameter

Large Breadbug (Oo = big)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RideParameter` | OoPanModokiRideParameter | BP | N | Riding on it. |  |
| `RushParameter` | OoPanModokiRushParameter | BP | N | Rush. |  |
| `RigidityParameter` | OoPanModokiRigidityParameter | — | N | Stagger. |  |

## OoPanModokiRideParameter

Riding

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CriticalWeight` | Int | — | N | Pikmin weight to pin it. |  |
| `DamageForPressed` | Float | BP | N | Damage when pinned. | 800 |
| `FlickNumMin` | Int | — | N | Min flicked. |  |
| `FlickNumMax` | Int | — | N | Max flicked. |  |
| `NoFlickRatio` | Float | — | N | No-flick chance. |  |
| `FlickInterval` | Float | BP | N | Interval. | 1 |
| `FlickIntervalJitter` | Float | — | N | Jitter. |  |
| `FlickArg` | FlickArg | BP | N | Flick. |  |
| `RideNumDispOffset` | Vector | — | N | Counter offset. |  |
| `RideOffsetZ` | Float | BP | N | Ride height. | 41.25 |

## OoPanModokiRushParameter

Rush

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RushableRadius2D` | Float | — | N | Radius. |  |
| `RushableHalfHeight` | Float | — | N | Height. |  |
| `RushableAngle` | Float | BP | N | Angle. | 180 |
| `AimingTurnAngleSpeedParam` | AngleSpeedParameter | BP | N | Aim turning. |  |
| `AimingLimitTime` | Float | BP | N | Aim time. | 3 |
| `RushStartBound` | OoPanModokiRushStartBound | BP | N | Start volume. |  |
| `MaxRushTime` | Float | — | N | Rush time. |  |
| `MaxSpeed` | Float | BP | N | Speed. | 250 |
| `SpeedAccelRatio` | Float | — | N | Acceleration. |  |
| `FlickArg` | FlickArg | BP | N | Flick. |  |
| `FlickToCarrierArg` | FlickArg | — | N | Flick carriers. |  |

## OoPanModokiRushStartBound

Box

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HalfWidth` | Float | BP | N | Half width. | 30 |
| `HalfHeight` | Float | BP | N | Half height. | 45 |
| `HalfLength` | Float | BP | N | Half length. | 250 |
| `Offset` | Float | — | N | Offset. |  |

## OtakaraAIComponent

Treasure component

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NpcInfoKey` | Name | SL | S | Castaway NPC key when the "treasure" is a sleeping castaway (e.g. LFSleep000). | "LFSleep000", "LFSleep010", "LFSleep004" |
| `bDDBSurvivorLeaf` | Bool | SL | S | Dandori Battle castaway variant (leaf). | true |

## OtakaraAIParameter

Treasure objects. Per-instance: bCanFall, bEnableChangeInitTransformAfterFalling, InitTransformAfterFalling, bSendCrushImpactEventToOtakara, bReceiveCrushImpactEventFromOtakara, bChangeCrushImpactMoveDir, CrushImpactMoveRot, bUseCrushDDB, CrushDDBPoint, DDBPikminHeightType

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bUseArrowFace` | Bool | — | N | Arrow faces the carry direction. |  |
| `MaterialParameterAnimationName` | Name | — | N | Material animation. |  |
| `RushMoveVel` | Float | — | N | Speed when rushed. |  |
| `bCanFall` | Bool | SL | S | Treasure can fall (hanging/perched). | true |
| `CrushImpactMoveVelFall` | Float | — | N | Speed when knocked falling. |  |
| `bSendCrushImpactEventToOtakara` | Bool | SL | S | Sends an impact to treasure it lands on. | true |
| `bReceiveCrushImpactEventFromOtakara` | Bool | SL | S | Moves when hit by falling treasure. | true |
| `bEnableChangeInitTransformAfterFalling` | Bool | SL | S | Uses InitTransformAfterFalling once fallen. | true |
| `InitTransformAfterFalling` | Transform | SL | S | Transform after falling (saved). |  |
| `CrushImpactMoveVel` | Float | — | N | Speed after impact. |  |
| `bChangeCrushImpactMoveDir` | Bool | SL | S | Impact moves it in CrushImpactMoveRot direction. | true |
| `CrushImpactMoveRot` | Rotator | SL | S | Direction of impact movement. |  |
| `bEnableFallSpeedRate` | Bool | — | N | Scale fall speed. |  |
| `FallSpeedRate` | Float | — | N | Fall speed scale. |  |
| `bEnableSuddenMoveSound` | Bool | — | N | Sound on sudden moves. |  |
| `SuddenMoveAccelaration` | Float | — | N | Threshold acceleration. |  |
| `SuddenMoveAngularAccelaration` | Float | — | N | Threshold angular acceleration. |  |
| `bEnableRollingSound` | Bool | — | N | Rolling sound. |  |
| `RollingAngularVel` | Float | — | N | Rolling threshold. |  |
| `bUseDisableCapsuleShadowByBuried` | Bool | — | N | Hide shadow while buried. |  |
| `bPlayRopeBranchMotion` | Bool | — | N | Rope animation. |  |
| `bCreateRopeBranchEffect` | Bool | — | N | Rope effect. |  |
| `RopeBranchEffect` | ParticleSystem | — | N | Rope effect. |  |
| `bCanPlayShakeMotion` | Bool | — | N | Shake animation. |  |
| `AnimPlayRateMax` | Float | — | N | Max animation rate. |  |
| `AnimPlayRateChangeSpeed` | Float | — | N | Animation rate change. |  |
| `bUseFightCamera` | Bool | — | N | Use fight camera. |  |
| `FightCameraParameter` | EnemyFightCameraParameter | — | N | Fight camera. |  |
| `bUseCrushDDB` | Bool | SL | S | Dandori Battle: crush point enabled. | true |
| `CrushDDBPoint` | Vector | SL | S | Dandori Battle crush point. |  |
| `DDBPikminHeightType` | EDDBPikminHeightType | SL | S | Dandori Battle Pikmin height type. | "EDDBPikminHeightType::None", "EDDBPikminHeightType::YellowOnly" |
| `RequestRumbleNameOnTerrain` | Name | — | N | Rumble on terrain. |  |
| `bStandCarry` | Bool | — | N | Carried upright. |  |
| `bStandCarryChangeMass` | Bool | — | N | Change mass when upright. |  |
| `CarryMass` | Vector | — | N | Carry mass. |  |
| `bEnableZukanActionMotion` | Bool | — | N | Treasure catalogue animation. |  |
| `bEnableZukanRotatingSound` | Bool | — | N | Catalogue rotation sound. |  |
| `FuwafuwaTime` | Float | — | N | Catalogue float time. |  |
| `ZukanFuwafuwaLocCurve` | CurveVector | — | N | Catalogue float location curve. |  |
| `ZukanFuwafuwaRotCurve` | CurveVector | — | N | Catalogue float rotation curve. |  |

## OtamaAIParameter

Otama = tadpole

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveCalcSec` | Float | — | N | Move recalculation interval. |  |
| `EscapeLength` | Float | BP | N | Escape distance. | 200 |
| `EscapeArea` | CakeSearchArea | BP | N | Threat area. |  |
| `ProbBound` | Float | — | N | Bounce chance. |  |
| `LeapMoveRatio` | Float | — | N | Leap ratio. |  |
| `JumpStopAccelRatio` | Float | — | N | Jump deceleration. |  |
| `BoundFaceRotation` | Float | BP | N | Bounce rotation. | 5 |
| `WanderLimitTimeMin` | Float | — | N | Min wander. |  |
| `WanderLimitTimeMax` | Float | — | N | Max wander. |  |
| `InWaterBodyRate` | Float | — | N | Water body ratio. |  |
| `bDispTerritory` | Bool | — | N | Debug. |  |
| `DebugRayVectorIndex` | Int | — | N | Debug. |  |

## OverlapConditions

Actor spawner overlap conditions

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Avatar` | Bool | BP+SL | S | Spawner fires when a captain is inside OverlapArea. | false |
| `Pikmin` | Bool | BP+SL | S | Fires when Pikmin are inside. | false |
| `AvatarAndPikmin` | Bool | BP+SL | S | Requires both. | false |
| `Carry` | Bool | BP+SL | S | Fires when a carried object is inside. | false |
| `bGenseiControl` | Bool | BP+SL | S | Fires under "Gensei control" (native-creature control mode). | false |
| `bNotOverlap` | Bool | BP | S | Invert: spawn while nothing overlaps. | true |

## PanModokiBaseAIParameter

Breadbug family (steal and carry items home). Per-instance: RouteTag, HideAreaTag

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CarryParameter` | PanModokiBaseCarryParameter | BP | N | Stealing/carrying. |  |
| `ChaseParameter` | PanModokiBaseChaseParameter | — | N | Chase. |  |
| `EscapeTime` | Float | — | N | Escape time. |  |
| `RouteTag` | Name | SL | S | Route it walks. | "PanModokiRoute1", "PanModokiRoute2", "PanModokiRoute3" |
| `HideAreaTag` | Name | SL | S | Hiding area (its nest). | "PanModokiHideArea1", "PanModokiHideArea2", "PanModokiHideArea3" |
| `ExcavationClass` | Class | BP | N | Dig spot class. |  |
| `DemoParameter` | PanModokiBaseDemoParameter | — | N | Cutscene. |  |

## PanModokiBaseCarryParameter

Carrying

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CarryPower` | Int | BP | N | Pulling strength vs Pikmin. | 30, 10 |
| `CorrectionPcp` | Float | BP | N | Pull correction. | -25, -10 |
| `AngAccelRatioForPulled` | Float | — | N | Turn while being pulled. |  |
| `MaxSpeed` | Float | — | N | Speed. |  |
| `SpeedAccelRatio` | Float | BP | N | Acceleration. | 0.75 |
| `MaxAngVelTime` | Float | BP | N | Turn speed. | 4 |
| `AngAccelRatio` | Float | BP | N | Turn accel. | 0.10000000149011612 |
| `SearchRadius2D` | Float | BP | N | Item search radius. | 600 |
| `SearchHalfHeight` | Float | BP | N | Search height. | 40 |
| `SearchAngle` | Float | — | N | Search angle. |  |
| `FlickSearchRadius2D` | Float | BP | N | Flick radius. | 250 |
| `FlickSearchHalfHeight` | Float | — | N | Flick height. |  |
| `FlickSearchAngle` | Float | — | N | Flick angle. |  |
| `FlickIntervalForPulling` | Float | — | N | Flick interval while pulling. |  |
| `FlickIntervalForCompete` | Float | BP | N | Flick interval while competing. | 2, 3 |
| `ContinuousCarryNum` | Int | — | N | Consecutive carries. |  |
| `ContinuousChoiceSameTargetBanTime` | Float | — | N | Same-target ban. |  |
| `SuckedDistance` | Float | BP | N | Distance it's sucked into the nest. | 18, 15 |
| `DamageForSucked` | Float | BP | N | Damage when sucked. | 1500, 1000 |
| `HDRumbleKeyByPulled` | Name | BP | N | Rumble. | "Teki_Common_Shake_S" |

## PatrollerAIParameter

Patroller = shelled patrolling enemy that eats Pikmin and flicks treasure (walks a root-point route). Per-instance: CapsuleBoneName?, SearchTagName, GiveupDistance

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CapsuleBoneName` | Name | BP | S | Bone of the eat capsule. | "F_j003_jaw" |
| `CapsuleMoveSpeed` | Float | — | N | Captured move speed. |  |
| `CapsuleScaleSpeed` | Float | BP | N | Captured scale speed. | 5 |
| `ShellBombDamageRatio` | Float | — | N | Bomb damage on the shell. |  |
| `ShellBombDamageRange` | Float | BP | N | Shell bomb range. | 110 |
| `FlowerBombDamageBoneName` | Name | — | N | Weak point bone. |  |
| `RestFastChaseBound` | AngBound2 | BP | N | Fast chase bound when resting. |  |
| `RestNoChaseBoundWaitTime` | Float | — | N | No-chase wait. |  |
| `HappyFlickSpeed` | Float | BP | N | Oatchi flick speed. | 200 |
| `AttackRangeXY` | Float | BP | N | Attack radius. | 25 |
| `AttackRangeZ` | Float | BP | N | Attack height. | 20 |
| `AttackOffset` | Vector | — | N | Attack offset. |  |
| `PikminEatSpeed` | Float | — | N | Eat speed. |  |
| `PikminEatRadius` | Float | — | N | Eat radius. |  |
| `EatPikminNum` | Int | — | N | Pikmin per bite. |  |
| `SwallowResetSec` | Float | — | N | Swallow reset. |  |
| `PanicDamageCount` | Int | BP | N | Hits before panicking. | 10 |
| `FlickOtakaraVelocityForward` | Float | BP | N | Treasure flick forward. | 350 |
| `FlickOtakaraVelocityUp` | Float | BP | N | Treasure flick up. | 300 |
| `BackFlickSearchRangeXY` | Float | BP | N | Back flick radius. | 80 |
| `BackFlickSearchRangeZ` | Float | BP | N | Back flick height. | 50 |
| `FlickSearchTime` | Float | BP | N | Flick search time. | 5 |
| `SearchTagName` | Name | SL | S | Route tag (e.g. PatrollerRootPoint02). | "PatrollerRootPoint02", "PatrollerRootPoint001", "PatrollerRootPoint000" |
| `DownTimeMin` | Float | BP | N | Min down. | 4 |
| `DownTimeMax` | Float | BP | N | Max down. | 5 |
| `MoveStopDecisionSec` | Float | BP | N | Stop decision interval. | 60 |
| `MoveStopDecisionRate` | Float | BP | N | Stop chance. | 0.6000000238418579 |
| `MoveStopWaitTime` | Float | BP | N | Stop wait. | 3 |
| `ThroatJointName` | Name | BP | N | Throat bone. | "F_j002_tentacle" |
| `AppearRatioPerMinute` | Float | BP | N | Appear chance per minute. | 10 |
| `DropFlowerActor` | Class | BP | N | Flower dropped. |  |
| `DropFlowerVelocity` | Vector | BP | N | Flower velocity. |  |
| `MarkerHeightOnBurst` | Float | BP | N | Marker height. | 180 |
| `LockOnOffsetOnBurst` | Float | BP | N | Lock-on offset. | 50 |
| `FlowerEffectOtakaraNum` | Int | — | N | Treasures for flower effect. |  |
| `LookAtEndAngleDistance` | Float | — | N | Look-at end angle. |  |
| `LookAtOffset` | Float | — | N | Look-at offset. |  |
| `LookAroundMotiolnRate` | Float | — | N | Look-around chance. |  |
| `PlayerCollideWaitTime` | Float | — | N | Wait after bumping a captain. |  |
| `bEatAtOnce` | Bool | BP | N | Eat everything at once. | false |
| `TurnSpeedUpRate` | Float | BP | N | Turn up. | 0.25 |
| `TurnSpeedDownRate` | Float | BP | N | Turn down. | 0.5 |
| `ChangeChaseTargetDist` | Float | BP | N | Target change distance. | 150 |
| `ChasePriority` | PatrollerChasePriority | BP | N | Target priorities. |  |
| `DownFlickArg` | FlickArg | BP | N | Down flick. |  |
| `DieMaterialParameterAnimName` | Name | BP | N | Death material animation. | "Die" |
| `ChaseTargetChangeIntarval` | Float | — | N | Target change interval. |  |
| `GiveupDistance` | Float | SL | S | Give-up distance. | 200 |
| `GiveupAreaTime` | Float | — | N | Give-up time. |  |
| `SwallowAfterWaitTime` | Float | BP | N | Wait after swallowing. | 2 |
| `SplineWaitIgnoreTimer` | Float | — | N | Spline wait ignore time. |  |

## PatrollerChasePriority

Target priority (higher = preferred)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Pikmin` | Int | — | N | Pikmin. |  |
| `Avatar` | Int | — | N | Captains. |  |
| `Bomb` | Int | — | N | Bombs. |  |
| `Otakara` | Int | — | N | Treasure. |  |
| `Pellet` | Int | — | N | Pellets. |  |
| `Sizai` | Int | — | N | Raw materials. |  |
| `Kinkai` | Int | BP | N | Gold nuggets. | 4 |
| `Survivor` | Int | BP | N | Castaways. | 4 |
| `Onyon` | Int | BP | N | Onions. | 4 |

## PelletAIParameter

Pellets. Per-instance: PelletColor

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PelletColor` | EPikminColor | SL | S | Pellet colour. | "EPikminColor::Yellow" |
| `PelletForwardForcePow` | Float | — | N | Forward launch force. |  |
| `PelletUpForcePow` | Float | — | N | Upward launch force. |  |
| `PelletRot` | Float | — | N | Rotation. |  |
| `PelletTorqueForce` | Float | — | N | Torque. |  |
| `InvisibleTime` | Float | — | N | Invisible time after spawn. |  |

## PelplantAIParameter

Pellet Posies. Per-instance: PelplantType, PelletColor, ForceFloweringTimeRatio, PetalDirectDamage, PetalDurability, PetalFallRate, TimeToGrowBud, TimeToGrowFlower

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PelplantType` | EPelplantType | — | S | EPelplantType (1/5/10/20 pellet). |  |
| `ForceFlowringPlayerDistance` | Float | — | N | Force flowering when the player is close. |  |
| `ForceFloweringTimeRatio` | Float | SL | S | Time ratio at which it force-flowers. | 0 |
| `TimeToGrowBud` | Float | SL | S | Time to grow a bud. | 0 |
| `TimeToGrowBudRebirth` | Float | — | N | Bud time after regrowing. |  |
| `TimeToGrowFlower` | Float | SL | S | Time to flower. | 0 |
| `TimeToGrowFlowerRebirth` | Float | — | N | Flower time after regrowing. |  |
| `PelletColor` | EPikminColor | — | S | Pellet colour. |  |
| `NextPelletColorChangeTime` | Float | — | N | Colour cycle time. |  |
| `NextPelletColorChangeTimeRandomRange` | Float | — | N | Random range. |  |
| `DisableNextPelletColorChangeTime` | Float | — | N | Disable colour cycling. |  |
| `PelletColorChangeTime` | Float | — | N | Colour change time. |  |
| `PetalDirectDamage` | Int | — | S | Damage per hit on petals. |  |
| `PetalDurability` | Int | — | S | Petal HP. |  |
| `PetalFallRate` | Int | — | S | Petal fall rate. |  |
| `FallPetalEffect` | ParticleSystem | — | N | Petal effect. |  |
| `FallPetalEffectScale` | Float | — | N | Petal effect scale. |  |
| `SpawnPellet` | Class | — | N | Pellet class. |  |
| `PelletStickBoneName` | Name | — | N | Pellet bone. |  |
| `PelletStickOffset` | Vector | — | N | Pellet offset. |  |
| `bBloomFromWithered` | Bool | — | N | Blooms again after withering. |  |
| `bCheckOnyon` | Bool | — | N | Only colours you have an Onion for. |  |
| `bRebirthMode` | Bool | — | N | Regrows. |  |
| `PikminMaxNumForRebirth` | Int | — | N | Pikmin limit for regrowing. |  |
| `StoneDamageToStem` | Float | — | N | Rock damage to stem. |  |
| `StoneDamageToPetal` | Float | — | N | Rock damage to petals. |  |

## PIDControlParameter

PID movement controller

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnablePIDControl` | Bool | BP | N | Enable PID steering. | true |
| `ProportionalGain` | Float | BP | N | PID gains when moving freely. | 1 |
| `IntegralGain` | Float | BP | N | PID gains when moving freely. | 0 |
| `DerivativeGain` | Float | — | N | PID gains when moving freely. |  |
| `ProportionalGainWithCarry` | Float | BP | N | PID gains while being carried. | 4 |
| `IntegralGainWithCarry` | Float | BP | N | PID gains while being carried. | 4 |
| `DerivativeGainWithCarry` | Float | — | N | PID gains while being carried. |  |
| `ValidAngleForPID` | Float | — | N | Heading error below which PID control is used. |  |
| `bEnableSleepPIDControl` | Bool | BP | N | Allow PID to go to sleep when settled. | false |
| `TimeToShiftSleepPID` | Float | — | N | Time before switching to the sleeping PID mode. |  |
| `EnableRayCaster` | Bool | BP | N | Enable the ground ray caster used by PID movement. | true |

## PieceStationAIComponent

Material piles

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PieceNum` | Int | SL | S | Number of pieces in the pile. | 4, 25, 26 |

## PikminFlashAIParameter

Glow Pikmin flash burst (night)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Speed` | Float | — | N | Speed. |  |
| `DownSpeed` | Float | BP | N | Descent speed. | -60 |
| `GravityZ` | Float | — | N | Gravity. |  |
| `DistanceLimit` | Float | — | N | Distance limit. |  |
| `IgnoreBottomDiffRatio` | Float | — | N | Bottom difference ratio. |  |
| `Height` | Float | BP | N | Hover height. | 30 |
| `WaitTime` | Float | — | N | Wait. |  |
| `LaunchBaseZ` | Float | BP | N | Launch base height. | -30 |
| `LaunchTime` | Float | BP | N | Launch time. | 0.15000000596046448 |
| `LaunchSpeed` | Float | BP | N | Launch speed. | 150 |
| `MinRange` | Float | BP | N | Min flash range. | 55 |
| `MaxRange` | Float | — | N | Max flash range. |  |
| `RangeCurve` | CurveFloat | BP | N | Range by Glow Pikmin count. |  |
| `MinBlindTime` | Float | BP | N | Min enemy stun. | 2 |
| `MaxBlindTime` | Float | BP | N | Max enemy stun. | 15 |
| `BlindTimeCurve` | CurveFloat | BP | N | Stun by count. |  |
| `bUseVacuumSpeedCurve` | Bool | BP | N | Use suction speed curve. | true |
| `VacuumSpeedCurve` | CurveFloat | BP | N | Suction speed curve. |  |
| `ChargeMinSpeed` | Float | — | N | Charge min speed. |  |
| `ChargeMoveTime` | Float | BP | N | Charge move time. | 1.2999999523162842 |
| `ChargeRotatorRatio` | Float | — | N | Charge rotation. |  |
| `VacuumPikminScaleCurve` | CurveFloat | BP | N | Pikmin scale while absorbed. |  |
| `PhotonSphereEffect00` | ParticleSystem | BP | N | Sphere effect 1. |  |
| `PhotonSphereEffect01` | ParticleSystem | BP | N | Sphere effect 2. |  |
| `PhotonFlashEffect00` | ParticleSystem | BP | N | Flash effect 1. |  |
| `PhotonFlashEffect01` | ParticleSystem | BP | N | Flash effect 2. |  |
| `PhotonFlashCancelEffect` | ParticleSystem | BP | N | Cancel effect. |  |
| `EffectScale` | PikminFlashEffectScale | BP | N | Effect scale by count. |  |
| `UpDownCycleCurve` | CurveFloat | BP | N | Bob curve. |  |
| `UpDownCycleRange01` | Float | BP | N | Bob range 1. | 3 |
| `UpDownCycleTime01` | Float | — | N | Bob time 1. |  |
| `UpDownCycleRange02` | Float | BP | N | Bob range 2. | 3.9000000953674316 |
| `UpDownCycleTime02` | Float | BP | N | Bob time 2. | 0.46000000834465027 |

## PikminFlashEffectScale

Flash scale step

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Num` | Int | BP | N | Glow Pikmin count threshold. | 0, 20, 60 |
| `Scale` | Float | — | N | Scale. |  |
| `ChargeOffsetZ` | Float | BP | N | Charge offset. | -8, 0, 7 |
| `ShootOffsetZ` | Float | BP | N | Shoot offset. | 0, 2, 8 |
| `VacuumScale` | Float | BP | N | Suction scale. | 0.15000000596046448, 0.25, 0.3499999940395355 |
| `VacuumGoalRange` | Float | BP | N | Suction goal range. | 10, 13 |
| `TypeSE` | Int | BP | N | Sound type. | 0, 1, 2 |

## PikminHeadAIParameter

Pikmin sprouts (seeds). Not exposed per-instance.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PhysicsLinearDamping` | Float | — | N | Damping. |  |
| `GravityScale` | Float | BP | N | Gravity scale. | 0.25 |
| `AirDragV` | Float | — | N | Vertical drag. |  |
| `AirDragH` | Float | BP | N | Horizontal drag. | 0.9300000071525574 |
| `GrowUpTime` | Float | — | N | Time to grow. |  |
| `GenDistFromOnyonCenter` | Float | — | N | Spawn distance from an Onion. |  |
| `GenDistFromPongashiCenter` | Float | — | N | Spawn distance from a Candypop. |  |

## PodAIParameter

Shepherd pod / S.S. Shepherd Onion-like pod (base "Pod"). Per-instance: bHeyWakka

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bIsDummyMode` | Bool | BP | N | Dummy pod. | true |
| `bIsDolphin` | Bool | BP | N | Uses the Dolphin (ship) model. | true |
| `bHasAllParts` | Bool | BP | N | All parts attached. | true |
| `bHasNoParts` | Bool | BP | N | No parts attached. | true |
| `bHeyWakka` | Bool | — | S | Plays the greeting/"hey" behaviour on arrival. |  |
| `SuckDelayTime` | Float | BP | N | Delay before sucking in items. | 0.5 |
| `ShugoExTime` | Float | — | N | Extended gather time. |  |
| `SendShugoExEventInterval` | Float | — | N | Gather event interval. |  |
| `WaitAnimPlayRateInShugoEx` | Float | — | N | Wait animation rate during gather. |  |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `LightEffect` | ParticleSystem | BP | N | Light effect. | "Null" |
| `CollectEffect` | ParticleSystem | BP | N | Collect effect. |  |
| `VomitEffect` | ParticleSystem | BP | N | Vomit effect. |  |
| `WarpEffect` | ParticleSystem | — | N | Warp effect. |  |
| `ShugoExEffect` | ParticleSystem | BP | N | Gather effect. |  |
| `ShugoExEftBoneName` | Name | BP | N | Gather effect bone. | "root" |
| `AreaOpenEffect` | ParticleSystem | BP | N | Area open effect. |  |
| `LightEftFadeOutRange` | Float | — | N | Light fade range. |  |
| `LightEftFadeInOutTime` | Float | — | N | Light fade time. |  |
| `LightEftMinOpacity` | Float | — | N | Light min opacity. |  |
| `CollectEffectPlayInterval` | Float | — | N | Collect interval. |  |
| `VomitEffectPlayInterval` | Float | — | N | Vomit interval. |  |
| `BrinkOneLoopTime` | Float | — | N | Blink loop time. |  |
| `BrinkRequestTime` | Float | — | N | Blink request time. |  |
| `FaceMessageDelay` | Float | — | N | Message delay. |  |
| `NextFaceMessageTime` | Float | — | N | Next message time. |  |
| `PushActorArroundRadius` | Float | — | N | Push radius. |  |
| `PushActorArroundSpeed` | Float | — | N | Push speed. |  |
| `BodyColUpSpeed` | Float | — | N | Collision rise speed. |  |
| `CameraToCapsuleDistForCancelDitherOn` | Float | — | N | Dither cancel distance. |  |
| `CapsuleEndPointOffsetForCancelDitherOn` | Vector | — | N | Dither capsule offset. |  |

## PopPlaceComponent

Dandori Battle object spawn points (per-instance)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PopObjectType` | EVsPopObjectType | SL | S | EVsPopObjectType – what spawns here (treasure, enemy, etc.). | "EVsPopObjectType::Otakara", "EVsPopObjectType::Gensei", "EVsPopObjectType::SPBo |
| `GroupId` | Int | SL | S | Spawn group id. | 100, 103, 4 |
| `IsOtakaraSetting` | Bool | SL | S | Apply OtakaraAIParameter to spawned treasure. | true |
| `IsTerritorySetting` | Bool | SL | S | Apply Territory to spawned enemies. | true |
| `Territory` | CylinderSearchArea | SL | S | Territory for spawned enemies. |  |
| `bNoSearchOuterTerritory` | Bool | SL | S | Spawned enemies ignore targets outside territory. | true |
| `SearchAreaCaution` | CakeSSphereSearchArea | SL | S | Caution area for spawned enemies. |  |
| `SearchRange` | Float | SL | S | Range used for MaxObjectNumInRange. | 350 |
| `MaxObjectNumInRange` | Int | SL | S | Max objects allowed within SearchRange. | 2 |
| `FutakuchiAIParameter` | FutakuchiAIParameter | — | S | Futakuchi parameters used when the pop spawns one. |  |
| `IsDropSetting` | Bool | — | S | Apply the drop table below. |  |
| `DropParameter` | DropParameter | — | S | Drop table for spawned objects. |  |
| `OtakaraAIParameter` | OtakaraAIParameter | — | S | Treasure parameters for spawned treasure. |  |
| `NecessaryCID` | Name | — | S | CID required for this pop point. |  |
| `NecessarySerachLocation` | Vector | — | S | Location searched for the required CID. |  |

## PortalBaseAIParameter

Portal object (cave entrances etc.). Per-instance: bPlayUncompletedEffect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FlickRadius` | Float | — | N | Flick radius. |  |
| `FlickArg` | FlickArg | — | N | Flick. |  |
| `InvisibleColsUpSpeed` | Float | — | N | Invisible collision rise speed. |  |
| `ChangeInvisibleCol` | StaticMesh | — | N | Invisible collision mesh. |  |
| `bPlayUncompletedEffect` | Bool | — | S | Show the "not completed" sparkle. |  |
| `UncompletedEffect` | ParticleSystem | — | N | That effect. |  |
| `ExitPS` | ParticleSystem | BP | N | Exit effect. |  |
| `ExitPSForFade` | ParticleSystem | BP | N | Exit effect (fading). |  |
| `ExitPSFadeOutDist` | Float | — | N | Fade distance. |  |
| `ExitPSFadeInOutTime` | Float | — | N | Fade time. |  |

## PortalTriggerComponent

Portals (cave entrances/exits, floor holes, base transitions). All listed fields are per-instance (serializer UPortalTriggerComponent::vfunc_156 @0x01AFD620, in this order)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PortalType` | EPortalType | BP+SL | S | EPortalType: PortalMove, DungeonEntrance, DungeonExit, UpPortal, DownPortal, Madori* (hub rooms), InitialPortalMove, ExitPortal. | "EPortalType::InitialPortalMove", "EPortalType::UpPortal" |
| `PortalNumber` | Int | BP+SL | S | This portal's ID within the level. | 11, 8, 4 |
| `ToSubLevelName` | Name | BP | S | Destination sub-level. | "Ship000" |
| `ToPortalNumber` | Int | BP+SL | S | Portal ID to arrive at in the destination. | 2, 1, 4 |
| `bPlayDemo` | Bool | BP | S | Play the enter/exit cutscene (Dandori's "unknown boolean, always 1"). | true |
| `bPlayAnimation` | Bool | BP | N | Play the portal's animation when the player is near. | true |
| `PlayAnimDist` | Float | BP+SL | S | Distance at which the portal plays its idle/open animation. | 100, 175, 150 |
| `ToLevelName` | Name | SL | S | Destination level (e.g. Cave001_F00). | "CaveVS000_F00", "CaveSP001_F00", "Cave001_F00" |
| `bInitialPortalMove` | Bool | SL | S | This is the initial portal move for a level. | true, false |
| `CheckPointLevelNames` | Name | SL | S | Levels that count as checkpoints for this portal. |  |
| `PankuzuPriority` | Int | SL | S | Real name of Dandori Desktop's "panzakuPriority". Pankuzu (パンくず, "breadcrumbs") is the game's guide-trail system (PlayerConfig.PankuzuConfig, ENavAreaFlag::Pankuzu, radar canvas N_Cvs_Pankuzu, PS_eft_UI_Pankuzu00 effect). This int ranks the portal as a breadcrumb destination; 0 = not a target. In the whole game only one portal sets it: Area001 GMadoriRuins -> Cave001_F00 (first cave) = 5, i.e. the early-game guide trail leads you to the first cave. No native C++ reader exists besides the ctor/serializer (flags = Edit\|BlueprintVisible), so it is consumed via Blueprint/reflection by the Pankuzu logic. | 5 |
| `ToBaseCampId` | Int | SL | S | Base camp you arrive at. | 0, 1 |
| `DemoPlayParamExit` | DemoPlayParam | SL | S | Cutscene asset played when exiting. |  |
| `DisablePikminFlags` | Int | SL | S | EPikminColorFlags mask of Pikmin types that may NOT pass through (cave Pikmin-type restrictions): 1 Red, 2 Blue, 4 Yellow, 8 Rock, 16 Wing, 32 Purple, 64 White, 128 Ice, 256 Bean, 512 Photon(Glow), 16384 GenseiControl. E.g. 766 = Red only, 17149 = Blue (+Bean) only. | 17149, 17405, 766 |
| `DemoPlayParamEnter` | DemoPlayParam | SL | S | Cutscene asset played when entering. |  |
| `bDisableIsFlareGuard` | Bool | SL | S | Disables the Flare (Glow) guard check at this portal. | true |
| `bDeactivateByExit` | Bool | SL | S | Portal deactivates after it has been used to exit. | true |
| `ShowIconDist` | Float | — | S | Distance at which the portal icon appears (Dandori's "some float"). |  |
| `bPlayAnimDemo` | Bool | — | S | Play the animation as a cutscene (Dandori's "unknown zeros"). |  |
| `bDiscovered` | Bool | — | N | Portal has been discovered (runtime state). |  |
| `bFlagVisible` | Bool | — | N | Show the portal's flag/marker. |  |
| `bDisablePortalMoveUntilCleared` | Bool | — | N | Can't use the portal until the area is cleared. |  |
| `bIgnoreCompleteUIAndLaterTask` | Bool | — | N | Skip completion UI and later-task list for this portal. |  |
| `bNoLidType` | Bool | — | N | Portal has no lid. |  |
| `EntranceOffset` | Vector | — | N | Offset of the entrance point. |  |
| `Player` | GActor | — | N | Runtime pointer to the player using the portal. |  |

## PressFloorAIParameter

Sinking floor (in water). Per-instance: WaterBoxID, CreateNavBoxRange/Offset

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Height` | Float | — | S | Height. |  |
| `MaxHeightSpeed` | Float | — | S | Height speed. |  |
| `Radius` | Float | — | S | Radius. |  |
| `MaxRadiusSpeed` | Float | — | S | Radius speed. |  |
| `WaterBoxID` | Name | SL | S | Water box it interacts with. | "1" |
| `MaxPressHeight` | Float | — | N | Max press height. |  |
| `MaxSlopeAngle` | Float | — | N | Max slope. |  |
| `NavBoxClass` | Class | — | N | Nav box class. |  |
| `NavBoxReservedClass` | Class | — | N | Reserved nav box class. |  |
| `CreateNavBoxRange` | Vector | — | S | Nav box extent. |  |
| `CreateNavBoxOffset` | Vector | SL | S | Nav box offset. |  |

## PressFloorParameter

Deformable (sinking) floor response

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bUseEventParam` | Bool | BP+SL | S | Use the event-supplied parameters instead of these. | false |
| `SinkHeight` | Float | BP | N | Depth the floor sinks (negative = down). | -50, -30 |
| `MaxSinkHeightSpeed` | Float | BP | N | Max sink speed. | 20, 25, 15 |
| `SinkRadius` | Float | BP | N | Radius of the depression. | 240, 75, 160 |
| `MaxSinkRadiusSpeed` | Float | BP | N | Max radius growth speed. | 100, 25, 70 |
| `SmoothFactor` | Float | BP | N | Smoothing of the deformation. | 0, 0.20000000298023224 |

## PullNekkoAIParameter

Pull root ("nekko" = root; Pikmin pull it out). Per-instance: bSoilInvisible

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MinMotionSpeed` | Float | — | N | Min pull animation speed. |  |
| `MaxMotionSpeed` | Float | — | N | Max pull animation speed. |  |
| `WorkPowerToMaxMotionSpeed` | Float | — | N | Pikmin power for max speed. |  |
| `RequiredEnergyToMove` | Float | — | N | Energy required. |  |
| `MinTimeToMove` | Float | — | N | Min time. |  |
| `MaxTimeToMove` | Float | — | N | Max time. |  |
| `TutorialAddPower` | Float | — | N | Tutorial power bonus. |  |
| `PullSignEffect` | ParticleSystem | — | N | Warning effect. |  |
| `PullEffect` | ParticleSystem | — | N | Pull effect. |  |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `bSoilInvisible` | Bool | SL | S | Hide the soil mound. | true |
| `NekkoFlickArg` | FlickArg | — | N | Flick when uprooted. |  |

## PushGimmickAIParameter

Push boxes/blocks. Per-instance: WarpPos

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WorkSpeed` | Float | — | N | Push speed. |  |
| `AccelTime` | Float | — | N | Acceleration time. |  |
| `GoalDist` | Float | — | N | Push distance. |  |
| `SearchSphereOffs` | Vector | — | N | Search sphere offset. |  |
| `BoundBoxSize` | Vector | — | N | Bound box. |  |
| `FallFlickArg` | FlickArg | — | N | Fall flick. |  |
| `WarpPos` | Vector | SL | S | Position after pushing (saved). |  |
| `ShowWorkNumOffs` | Vector | — | N | Counter offset. |  |
| `CompleteWorkNumInvisibleTime` | Float | — | N | Counter hide time. |  |
| `GimmickType` | EPushGimmickType | — | N | EPushGimmickType. |  |
| `bCanType` | Bool | — | N | Can-type variant. |  |
| `CompleteUIType` | ECmnRankUpEffectType | — | N | Completion UI. |  |
| `PushEftReq` | EftRequest | — | N | Push effect. |  |
| `RequestRumbleName` | Name | — | N | Rumble. |  |

## QueenAIParameter

Empress Bulblax (Queen: spawns larvae/babies, rolls, rock balls). Per-instance: QueenAIType, RockBall* (incl. OppositeSide), FallBabyHeightMin/Max, FallBabySpawnRadius, FallBabySpawnNum, FlickDistXY. Dandori's "bornSpeed"/"childSearchRadius" are actually FallBabyHeightMin/FallBabyHeightMax.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FaceMessageDieBabyNum1` | Int | — | N | Babies killed before first hint. |  |
| `FaceMessageDieBabyNum2` | Int | — | N | Babies killed before second hint. |  |
| `RollFlickArg` | FlickArg | BP | N | Roll flick. |  |
| `RequestRumbleName` | Name | BP | N | Rumble. | "Teki_Common_Land_M" |
| `RollIgnoreContactCIDs` | Name | BP | N | CIDs ignored when rolling. |  |
| `RollIgnoreContactGIDs` | Name | BP | N | GIDs ignored when rolling. |  |
| `RollDist` | Float | — | N | Roll distance. |  |
| `RollTime` | Float | — | N | Roll time. |  |
| `QueenAIType` | EQueenAIType | SL | S | EQueenAIType behaviour set: e.g. Born (gives birth to larvae), FallBaby (babies drop from ceiling), SleepStart, BornAndRock. | "EQueenAIType::FallBaby", "EQueenAIType::Born" |
| `SleepStartTypeParameter` | QueenTypeParameter | BP | N | Settings for SleepStart type. |  |
| `BornTypeParameter` | QueenTypeParameter | BP | N | Settings for Born type. |  |
| `BornAndRockTypeParameter` | QueenTypeParameter | BP | N | Settings for BornAndRock type. |  |
| `FallBabyTypeParameter` | QueenTypeParameter | BP | N | Settings for FallBaby type. |  |
| `OverrideLifeSpawnBabyType` | Float | BP | N | HP for spawn-baby type. | 10000 |
| `OverrideLifeSpawnBabyAndRockType` | Float | BP | N | HP for spawn-baby-and-rock type. | 10000 |
| `OverrideLifeFallBabyType` | Float | — | N | HP for fall-baby type. |  |
| `bUseOverrideLifeZukanType` | Bool | BP | N | Override HP in the Piklopedia. | true |
| `OverrideLifeZukanType` | Float | BP | N | Piklopedia HP. | 10000 |
| `SpawnChild` | Class | BP | N | Baby class. |  |
| `SpawnRock` | Class | BP | N | Rock class. |  |
| `SpawnRockPoolNum` | Int | — | N | Rock pool. |  |
| `BornTime` | Float | BP+SL | S | Time between births. | 5 |
| `BornSpeed` | Float | BP | N | Birth launch speed. | 500 |
| `BornMaxNum` | Int | — | N | Max babies. |  |
| `ChildTerritoryRadius` | Float | — | N | Baby territory radius. |  |
| `ChildSearchRadius` | Float | BP | N | Baby search radius. | 800 |
| `WakeupChildNum` | Int | — | N | Babies that wake it. |  |
| `RockBallHeightMin` | Float | BP+SL | S | Min rock drop height. | 400 |
| `RockBallHeightMax` | Float | BP+SL | S | Max rock drop height. | 700 |
| `RockBallSpawnRadius` | Float | BP+SL | S | Rock spawn radius. | 100 |
| `RockBallSpawnOffsetY` | Float | BP | S | Rock spawn offset. | 200 |
| `RockBallHeightMinInOppositeSide` | Float | BP+SL | S | Min height on the opposite side. | 400 |
| `RockBallHeightMaxInOppositeSide` | Float | BP+SL | S | Max height on the opposite side. | 700 |
| `RockBallSpawnRadiusInOppositeSide` | Float | SL | S | Radius on the opposite side. | 150 |
| `FallBabyHeightMin` | Float | — | S | Min height babies fall from (Dandori's "bornSpeed"). |  |
| `FallBabyHeightMax` | Float | — | S | Max height babies fall from (Dandori's "childSearchRadius"). |  |
| `FallBabySpawnRadius` | Float | SL | S | Radius babies fall in. | 100 |
| `FallBabySpawnNum` | Int | SL | S | Babies that fall. | 10 |
| `CapsuleBoundRadius` | Float | BP | N | Collision radius. | 110 |
| `CapsuleBoundHalfDist` | Float | BP | N | Collision length. | 120 |
| `AddHappyHitCount` | Int | BP | N | Oatchi hit value. | 4 |
| `AddHappyCrushHitCount` | Int | — | N | Oatchi crush value. |  |
| `FlickLeftRate` | Float | — | N | Chance to flick left. |  |
| `FlickRatio` | Float | BP | N | Flick ratios. |  |
| `FlickDistXY` | Float | BP+SL | S | Flick distance. | 500 |
| `FlickHeight` | Float | — | N | Flick height. |  |
| `FlickRandRot` | Float | BP | N | Flick random rotation. | 15 |
| `ReverseFlickSpeedRatio` | Float | — | N | Reverse flick speed. |  |
| `DamageLimits` | FlickLimit | BP | N | Hit limits before shaking off. |  |
| `RollingLoopCameraShakeData` | Class | BP | N | Rolling shake class. |  |
| `RollingLoopShakeParam` | ShakeCameraParameter | BP | N | Rolling shake. |  |
| `RollingEndCameraShakeData` | Class | BP | N | Roll end shake class. |  |
| `RollingEndShakeParam` | ShakeCameraParameter | BP | N | Roll end shake. |  |
| `bUsePressAngleDistance` | Bool | — | N | Use press angle distance. |  |
| `BlinkPlayRate` | Float | BP | N | Blink rate. | 0.699999988079071 |
| `BlinkJudgeTime` | Float | — | N | Blink check. |  |

## QueenTypeParameter

Behaviour per Queen type

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bSleepType` | Bool | BP | N | Starts asleep. | true |
| `bSpawnChildType` | Bool | BP | N | Gives birth. | true |
| `bSpawnRockBall` | Bool | BP | N | Drops rock balls. | false |
| `bSpawnFallBaby` | Bool | BP | N | Drops babies from above. | true |
| `bSpawnInOppositeSide` | Bool | BP | N | Also spawns on the opposite side. | true |
| `bFlickBothDir` | Bool | BP | N | Flicks both directions. | true |
| `bRollToPlayerDir` | Bool | BP | N | Rolls toward the player. | true |
| `RollToFlickDirRate` | Float | BP | N | Roll-to-flick direction ratio. | 0, 1 |
| `RockBallSpawnNum` | Int | BP | N | Rock balls. | 4 |
| `RockBallSpawnNumInOppositeSide` | Int | BP | N | Rock balls on the opposite side. | 4 |

## RAngBound2

Rotated angle bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AngDeg` | Float | — | N | Sector angle. |  |
| `RotDeg` | Float | BP+SL | S | Sector rotation (per-instance in DemejakoBurrowParameter.AreaBound). | -80, 0 |

## RBaumkuchenBound2

Rotated ring-sector

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MinRadius2D` | Float | BP | N | Inner radius. | 50 |
| `SqMinRadius2D` | Float | — | N | Cached squared inner radius. |  |
| `MaxRadius2D` | Float | BP | N | Outer radius. | 200 |
| `SqMaxRadius2D` | Float | — | N | Cached squared outer radius. |  |
| `HalfHeight` | Float | BP | N | Half height. | 50 |
| `AngDeg` | Float | BP | N | Angle. | 90 |
| `RotDeg` | Float | BP | N | Rotation. | 180 |

## RopeFishingAIParameter

Rope fishing (Pikmin pull a rope to fling something). Per-instance: JumpForceXY, JumpForceZ, RopeAng, ManualWorkNum

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `JumpForceXY` | Float | SL | S | Fling horizontal force. | 600, 500, 100 |
| `JumpForceZ` | Float | SL | S | Fling vertical force. | 1500, 250 |
| `RopeAng` | Float | SL | S | Rope angle. | -30, -48.73256, -23 |
| `ManualWorkNum` | Int | SL | S | Pikmin needed. | 7, 5, 10 |
| `CompleteWorkNumInvisibleTime` | Float | — | N | Counter hide time. |  |
| `RopeAngSpeed` | Float | — | N | Rope angle speed. |  |
| `FishingFlickArg` | FlickArg | — | N | Flick. |  |

## RusherAIParameter

Rusher = charging enemy. Per-instance: Rush.DistMin, Rush.DistMax

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookAroundRate` | Float | — | N | Look-around chance. |  |
| `Turn` | RusherTurnParameter | BP+SL | S | Turning before a rush. |  |
| `Rush` | RusherRushParameter | BP+SL | S | Rush. |  |
| `Clash` | RusherClashParameter | BP | N | Hitting walls. |  |
| `LookAt` | RusherLookAtParameter | — | N | Look-at. |  |

## RusherClashParameter

Clash

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpeedRatio` | Float | BP | N | Speed ratio. | 2.5 |
| `Brake` | Float | BP | N | Brake. | 0.800000011920929 |
| `FlickNonStickerArg` | FlickArg | BP | N | Flick. |  |

## RusherRushBox

Rush path box

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HalfWidth` | Float | BP | N | Half width. | 12.5 |
| `HalfHeight` | Float | BP | N | Half height. | 40 |
| `HalfLength` | Float | BP+SL | S | Half length. | 135 |
| `Offset` | Float | BP | N | Offset. | 0 |

## RusherRushParameter

Rush. Per-instance: DistMin, DistMax

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HomingAngleAccelRatio` | Float | — | S | Homing turn acceleration. |  |
| `bStraightRush` | Bool | BP | N | Rush straight (no homing). | true |
| `RushStartFlick` | FlickArg | BP | N | Start flick. |  |
| `RushCrushFlick` | FlickArg | BP | N | Crush flick. |  |
| `RushTimeMin` | Float | BP | N | Min rush time. | 0.15000000596046448 |
| `DistMin` | Float | BP+SL | S | Min rush distance. | 150, 120, 50 |
| `DistMax` | Float | SL | S | Max rush distance. | 200, 150, 50 |
| `RushMag` | Float | BP | N | Speed multiplier. | 8.75 |
| `RushSpeedAccelRatio` | Float | BP | N | Acceleration. | 0.20000000298023224 |
| `RushAfterflow` | Float | BP | N | Overrun distance. | 20 |
| `ArriveDistance` | Float | — | N | Arrival distance. |  |
| `ClashDotAngleDegree` | Float | BP | N | Clash angle. | 53 |
| `BanTimeByCrushed` | Float | BP | N | Cooldown after being crushed. | 2.5 |

## RusherTurnParameter

Turn

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Time` | Float | BP | N | Turn time. | 1.5 |
| `RotateRatio` | Float | BP | N | Rotation ratio. | 0.05999999865889549 |
| `MaxContinueGiveupCnt` | Int | — | N | Consecutive give-ups. |  |
| `CheckRushBox` | RusherRushBox | BP+SL | S | Box checked before rushing. |  |

## SakadachiAIParameter

Sakadachi ("handstand") enemy: walks upside-down, has a tail handle Pikmin can pull to topple it

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HandleParam` | SakadachiHandleParameter | BP | N | Tail handle. |  |
| `LookAtParam` | SakadachiStateLookAtParameter | BP | N | Look-at by state. |  |
| `DownParam` | SakadachiDownParameter | BP | N | Toppled state. |  |
| `FlickTime` | Float | — | N | Flick time. |  |
| `StompFlickArg` | FlickArg | BP | N | Stomp flick. |  |
| `AttackEventType` | EAttackEventType | — | N | Attack type. |  |
| `AttackFlickArg` | FlickArg | BP | N | Attack flick. |  |
| `AttackFlickArgForCarry` | FlickArg | — | N | Attack flick on carriers. |  |
| `EatFlickArg` | FlickArg | BP | N | Eat flick. |  |
| `AttackToGoBackCount` | Int | — | N | Attacks before backing off. |  |
| `ChaseParam` | SakadachiChaseParameter | BP | N | Chase. |  |
| `GoBackParam` | SakadachiGoBackParameter | BP | N | Back off. |  |
| `GoHomeParam` | SakadachiGoHomeParameter | — | N | Go home. |  |
| `FaceMsgParam` | SakadachiFaceMsgParam | — | N | Hints. |  |
| `CheckBombDamageDist` | Float | — | N | Bomb distance check. |  |
| `BombDamageForArmor` | Float | — | N | Bomb damage to armour. |  |

## SakadachiChaseParameter

Chase

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ChaseToAttackTime` | Float | BP | N | Chase before attack. | 8 |
| `ChaseTurnToAttackArea` | CakeSSphereSearchArea | BP | N | Turn-to-attack area. |  |
| `ChaseTurnToAttackTime` | Float | — | N | Turn-to-attack time. |  |
| `ChaseToGoBackArea` | CakeSSphereSearchArea | BP | N | Back-off area. |  |
| `ChaseTurnToGoBackTime` | Float | — | N | Back-off turn time. |  |
| `ChaseToFlickArea` | CakeSSphereSearchArea | BP | N | Flick area. |  |
| `ChaseToFlickTime` | Float | — | N | Flick time. |  |

## SakadachiDownParameter

Toppled

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DownByBombCheckAng` | Int | — | N | Bomb angle that topples. |  |
| `FreezeFromIceBombDist` | Int | — | N | Ice blast freeze distance. |  |
| `DownTime` | Float | — | N | Down time. |  |
| `DonwCancelDamage` | Float | — | N | Damage to end early. |  |
| `RecoveryFlickTailStikerArg` | FlickArg | BP | N | Flick of tail Pikmin on recovery. |  |
| `RecoveryFlickTailArg` | FlickArg | BP | N | Flick on recovery. |  |

## SakadachiGoBackParameter

Back off

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackToBackArea` | CakeSSphereSearchArea | BP | N | Area. |  |
| `GoBackDist` | Float | — | N | Distance. |  |
| `GoBackTargetDist` | Float | — | N | Target distance. |  |
| `GoBackTargetAng` | Float | — | N | Target angle. |  |
| `GoBackEndTime` | Float | BP | N | End time. | 5 |
| `GoBackToFlickArea` | CakeSSphereSearchArea | BP | N | Flick area. |  |
| `GoBackToFlickTime` | Float | — | N | Flick time. |  |
| `GoBackMaxSpeed` | Float | — | N | Speed. |  |
| `GoBackMaxAngVelTime` | Float | — | N | Turn speed. |  |
| `GoBackAngAccelRatio` | Float | — | N | Turn accel. |  |

## SakadachiHandleFlickParameter

Handle flick

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HandleFlickRate` | Float | — | N | Chance. |  |
| `HandleFlickMin` | Int | — | N | Min flicked. |  |
| `HandleFlickMax` | Int | BP | N | Max flicked. | 1, 2 |
| `HandleFlickArg` | FlickArg | BP | N | Flick. |  |

## SakadachiHandleParameter

Tail handle

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HandleFlickParam` | SakadachiHandleFlickParameter | BP | N | Handle flick. |  |
| `HandleFlickParamForAttack` | SakadachiHandleFlickParameter | BP | N | Handle flick during attacks. |  |
| `DownDangleNum` | Int | BP | N | Pikmin needed to pull it down. | 15 |
| `WorkNumOfs` | Vector | BP | N | Counter offset. |  |
| `WorkNumOfs2D` | Vector2D | BP | N | Counter 2D offset. |  |
| `DisappearTime` | Float | — | N | Handle time. |  |

## SakadachiLookAtParameter

Look-at clamp

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookAtClamp` | Float | BP | N | Clamp. | 20, 0.009999999776482582 |
| `LookAtClampIntpTime` | Float | BP | N | Clamp blend time. | 0.699999988079071 |
| `LookAtClampCurve` | EEaseCurveInterpolation | — | N | Clamp curve. |  |

## SakadachiStateLookAtParameter

Look-at by state

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StartIntpTime` | Float | BP | N | Blend-in time. | 0.20000000298023224 |
| `StopIntpTime` | Float | — | N | Blend-out time. |  |
| `LookAtStartCurve` | EEaseCurveInterpolation | — | N | Blend-in curve. |  |
| `LookAtStopCurve` | EEaseCurveInterpolation | — | N | Blend-out curve. |  |
| `NoticeState` | SakadachiLookAtParameter | BP | N | Notice look-at. |  |
| `RunState` | SakadachiLookAtParameter | BP | N | Run look-at. |  |
| `TurnState` | SakadachiLookAtParameter | BP | N | Turn look-at. |  |

## SaraiAIParameter

Sarai ("kidnapper") = Snitchbug-type flier that grabs Pikmin/captains and drops them (can grab bombs). Per-instance: SearchAreaCaution.bSearchOuterTerritory

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FirstAltitude` | Float | BP | N | Initial flight height. | 60 |
| `FlyHeightLow` | Float | — | N | Low flight height. |  |
| `FlyHeightHigh` | Float | BP | N | High flight height. | 82 |
| `FlyHeightTakeOff` | Float | BP | N | Take-off height. | 70 |
| `ChangeHeightRatioOfFlightTime` | Float | — | N | Height change ratio. |  |
| `ChangeHeightTimeOfs` | Float | — | N | Height change offset. |  |
| `ChangeHighHeightRatio` | Float | BP | N | Chance to fly high. | 0 |
| `FlyHighMaxPikmin` | Int | BP | N | Max Pikmin carried when flying high. | 1 |
| `AttackArriveDist` | Float | — | N | Swoop arrival distance. |  |
| `AttackHeight` | Float | — | N | Swoop height. |  |
| `AttackFailBrakeRatioXY` | Float | — | N | Brake after a miss. |  |
| `FlickMinRatio` | Float | BP | N | Min flick ratio. | 0.800000011920929 |
| `FlickMaxRatio` | Float | — | N | Max flick ratio. |  |
| `HitNumCheckFlick` | Int | BP | N | Hits before flicking. | 3 |
| `StickNumMin` | Int | — | N | Min latched to bring down. |  |
| `StickNumMax` | Int | — | N | Max latched. |  |
| `AttackInterval` | Float | — | N | Attack interval. |  |
| `EscapeMaxTime` | Float | — | N | Max escape. |  |
| `AttackStartLeftOffset` | Float | — | N | Left start offset. |  |
| `AttackStartRightOffset` | Float | — | N | Right start offset. |  |
| `ReleaseBombSearchArea` | CakeSearchArea | BP | N | Area where it drops grabbed bombs. |  |
| `ReleaseSpeedXY` | Float | — | N | Release horizontal speed. |  |
| `ReleaseSpeedZ` | Float | BP | N | Release vertical speed. | -300 |
| `ReleasePlayerSpeedXY` | Float | BP | N | Captain release horizontal. | 1 |
| `ReleasePlayerSpeedZ` | Float | BP | N | Captain release vertical. | -100 |
| `EatFlickArg` | FlickArg | BP | N | Grab flick. |  |
| `FlyDieUpSpeed` | Float | BP | N | Rise speed on death. | 300 |

## SearchArea

Base of every search volume

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchType` | ESearchAreaSearchType | BP+SL | N | LocationDirZ (upright cylinder/cone around the actor) or Matrix (fully oriented by the actor transform). | "ESearchAreaSearchType::LocationDirZ" |
| `bSearchOuterTerritory` | Bool | BP+SL | T | Allow detecting targets that are outside the owner's territory. | true, false |

## SearchInput

Generic search description

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Filter` | ECellFilter | BP | N | Target filter (ESearchTargetFilterFlags). | "ECellFilter::cPikmin" |

## SenbeiAttrAttackEftParam

Element effects

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttrPressEffect` | ParticleSystem | BP | N | Press effect. |  |
| `AttrPressEffectBoneName` | Name | BP | N | Bone. | "root" |
| `AttrPressEffectOfs` | Vector | BP | N | Offset. |  |
| `AttrPressEffectScale` | Float | — | N | Scale. |  |
| `FrozenPressSmokeEffectReq` | EftRequest | BP | N | Frozen press smoke. |  |
| `FrozenPressSmokeEffectBoneName` | Name | BP | N | Bone. | "root" |
| `FrozenPressSmokeEffectOfs` | Vector | BP | N | Offset. |  |
| `FrozenPressSmokeEffectScale` | Float | BP | N | Scale. | 1.350000023841858 |

## SenbeiBaseAIParameter

Senbei ("rice cracker") = flat pressing enemy (rises and slams; elemental variants)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `OnPressEventBound` | CylinderBound2 | BP | N | Crush volume. |  |
| `OnPlayerDamageBound` | CylinderBound2 | BP | N | Captain damage volume. |  |
| `OnPressureEventBound` | CylinderBound2 | BP | N | Pressure volume. |  |
| `FlickParamForStickers` | FlickArg | BP | N | Flick latched Pikmin. |  |
| `AttrEffect` | ParticleSystem | BP | N | Element effect. |  |
| `AttackType` | EAttackEventType | BP | N | Element (Denki, Freeze). | "EAttackEventType::Denki", "EAttackEventType::Freeze" |
| `AttrAttackEftParam` | SenbeiAttrAttackEftParam | BP | N | Element attack effect. |  |
| `AttrAttackDotEps` | Float | — | N | Attack angle epsilon. |  |
| `RideActorDamageRadius` | Float | BP | N | Rider damage radius. | 20 |
| `WaitToSearchMinTime` | Float | — | N | Min wait. |  |
| `WaitToSearchMaxTime` | Float | — | N | Max wait. |  |
| `FirstRiseWaitTime` | Float | BP | N | First rise wait. | 2 |
| `FirstRiseWaitTimeWhenLookAround` | Float | — | N | First rise wait when looking around. |  |
| `RiseWaitTime` | Float | — | N | Rise wait. |  |
| `FallWaitTime` | Float | — | N | Fall wait. |  |
| `OnDieDmyCollisionBound` | CylinderBound2 | BP | N | Dummy collision after death. |  |
| `DmyPushVelocity` | Float | BP | N | Push speed of that collision. | 7 |
| `bPushPikmin` | Bool | — | N | Pushes Pikmin. |  |

## ShakeCameraParameter

Camera shake falloff

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `InnerRadius` | Float | BP | N | Full-strength radius. | 400 |
| `OuterRadius` | Float | BP | N | Radius where shake fades out. | 1500, 1300, 1000 |
| `Falloff` | Float | BP | N | Falloff exponent. | 1, 4, 7 |
| `bOrientShakeTowardsEpicenter` | Bool | — | N | Orient the shake toward the source. |  |

## ShakoAIParameter

Shako = burrowing mantis-shrimp-like charger (moves between burrows). Per-instance: bEnableSoftEdge, BurrowSearchAreaLength, BurrowSearchTagName

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableSoftEdge` | Bool | BP+SL | S | Soft edge enabled. | true |
| `MinStayTime` | Float | — | N | Min stay time. |  |
| `AppearTargetKeepTime` | Float | — | N | Target keep time on appearing. |  |
| `WaitAfterEatTimeMin` | Float | BP | N | Min wait after eating. | 1 |
| `WaitAfterEatTimeMax` | Float | BP | N | Max wait after eating. | 2 |
| `BackTimeMin` | Float | — | N | Min back-up time. |  |
| `BackTimeMax` | Float | BP | N | Max back-up time. | 1.1670000553131104 |
| `ZigZagAngleCoefficient` | Float | — | N | Zig-zag coefficient. |  |
| `ZigZagMaxAngleDeg` | Float | — | N | Max zig-zag angle. |  |
| `ShakoBoneParameter` | ShakoBoneParameter | — | N | Body bending. |  |
| `BombCautionTime` | Float | — | N | Bomb caution time. |  |
| `BombAppearWaitTimeMin` | Float | — | N | Min wait before appearing near bombs. |  |
| `BombAppearWaitTimeMax` | Float | — | N | Max wait. |  |
| `SearchAreaAttack` | CakeSearchArea | BP | N | Attack area. |  |
| `AttackShortRange` | Float | — | N | Short attack range. |  |
| `AppearFlickNonStickerArg` | FlickArg | BP | N | Appear flick. |  |
| `HideFlickStickerArg` | FlickArg | BP | N | Hide flick. |  |
| `SwallowFlickStickerArg` | FlickArg | BP | N | Swallow flick. |  |
| `ShakoMoveParameter` | ShakoMoveParameter | BP | N | Movement per state. |  |
| `BurrowActorClass` | Class | BP | N | Burrow class. |  |
| `BurrowSearchAreaLength` | Float | SL | S | Distance to search for burrows. | 700, 600, 1350 |
| `BurrowSearchTagName` | Name | SL | S | Burrow tag (links to BurrowAIParameter.Tag). | "Shako004", "shako003", "Shako2" |
| `bBurrowKill` | Bool | — | N | Kills when burrowing. |  |
| `NoActionBurrowTime` | Float | BP | N | Burrow time without action. | 10 |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |
| `ZukanBanHideTime` | Float | BP | N | Piklopedia no-hide time. | 3 |
| `FlickNonStickerParamArray` | ShakoFlickNonStickerParameter | BP | N | Flick spheres. |  |
| `DDBSearchAreaRest` | CakeSSphereSearchArea | BP | N | Dandori Battle rest area. |  |
| `DDBSearchAreaAttack` | CakeSearchArea | BP | N | Dandori Battle attack area. |  |

## ShakoGoParameter

Forward movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxSpeed` | Float | BP | N | Speed. | 300, 450, 45 |
| `SpeedAccelRatio` | Float | BP | N | Acceleration. | 1 |
| `StopAccelRatio` | Float | BP | N | Deceleration. | 1 |
| `StickerBrake` | SlowStickerParameter | BP | N | Slowing from latched Pikmin. |  |

## ShakoMoveParameter

Movement per state

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Appear` | ShakoStateMoveParameter | BP | N | Appear. |  |
| `Charge` | ShakoStateMoveParameter | BP | N | Charge. |  |
| `DDBCharge` | ShakoStateMoveParameter | BP | N | Dandori Battle charge. |  |
| `Return` | ShakoStateMoveParameter | BP | N | Return. |  |
| `BackFast` | ShakoStateMoveParameter | BP | N | Fast retreat. |  |
| `BackSlow` | ShakoStateMoveParameter | BP | N | Slow retreat. |  |
| `GoHomeTurnRatioCurve` | CurveFloat | BP | N | Go-home turn curve. |  |

## ShakoStateMoveParameter

State movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Go` | ShakoGoParameter | BP | N | Forward movement. |  |
| `Turn` | ShakoTurnParameter | BP | N | Turning. |  |

## ShakoTurnParameter

Turn

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxAngVelTime` | Float | BP | N | Turn speed. | 2.4000000953674316, 0 |
| `AngAccelRatio` | Float | BP | N | Turn accel. | 0.20000000298023224, 0 |

## ShijimiAIParameter

Shijimi = small butterfly (perches, flies away). Per-instance: SearchAreaCaution, MoveRadiusFlyAwayXY, bStartMaxHeight, bStartPerch, bBirthPerch (+PerchClass, DistanceOnPerch, SearchPerchRadiusXY in data)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchAreaCaution` | SphereSearchArea | BP+SL | S | Caution area. |  |
| `SearchAreaDanger` | SphereSearchArea | BP | N | Danger area. |  |
| `SearchAreaFlyAway` | SphereSearchArea | BP | N | Fly-away area. |  |
| `WaitTime` | ShijimiRangeF | BP | N | Wait range. |  |
| `SearchTime` | ShijimiRangeF | BP | N | Search range. |  |
| `MoveTime` | ShijimiRangeF | BP | N | Move range. |  |
| `ForceWaitTime` | ShijimiRangeF | BP | N | Forced wait range. |  |
| `AngAccelRatioMove` | Float | — | N | Turn accel moving. |  |
| `MaxAngVelTimeMove` | Float | — | N | Turn speed moving. |  |
| `AngAccelRatioLanding` | Float | — | N | Turn accel landing. |  |
| `MaxAngVelTimeLanding` | Float | BP | N | Turn speed landing. | 0.25 |
| `HeightMove` | Float | BP | N | Move height. | 60 |
| `HeightFlyAway` | Float | — | N | Fly-away height. |  |
| `HeightHide` | Float | BP | N | Hide height. | 130 |
| `MoveRadiusFlyAwayXY` | Float | BP+SL | S | Fly-away radius. | 100, 60 |
| `MoveRadiusFlyAwayMinZ` | Float | BP | N | Fly-away min height. | 60 |
| `MoveRadiusFlyAwayMaxZ` | Float | — | N | Fly-away max height. |  |
| `SpeedZ` | Float | — | N | Vertical speed. |  |
| `SpeedZLanding` | Float | — | N | Landing speed. |  |
| `DistanceDown` | Float | — | N | Descent distance. |  |
| `DistanceLandingCheck` | Float | — | N | Landing check distance. |  |
| `DistanceOnPerch` | Float | BP+SL | S | Distance above the perch. | 20 |
| `ContactFloorDistance` | Float | — | N | Floor contact distance. |  |
| `bBirthPerch` | Bool | BP+SL | S | Spawns with its own perch. | false |
| `PerchClass` | Class | BP+SL | S | Perch class. | null |
| `AmplitudeParam` | ShijimiAmplitudeParameter | BP | N | Wing flap bobbing. |  |
| `CheckSearchPerchTime` | Float | — | N | Perch search interval. |  |
| `bStartMaxHeight` | Bool | BP+SL | S | Starts at max height. | false |
| `bStartPerch` | Bool | SL | S | Starts perched. | true |
| `bFlyInTerritory` | Bool | BP | N | Stays in territory. | true |
| `SearchPerchRadiusXY` | Float | BP+SL | S | Perch search radius. | 300 |
| `TakeOffPelplantAngDistance` | Float | BP | N | Take-off angle from Pellet Posies. | 60 |
| `IgnoreStickActorTime` | Float | — | N | Ignore latch time. |  |
| `FlyingMass` | Float | — | N | Mass flying. |  |

## ShijimiAmplitudeParameter

Bobbing

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnable` | Bool | BP | N | Enable. | true |
| `Amplitude` | ShijimiRangeF | BP | N | Amplitude range. |  |
| `Time` | ShijimiRangeF | BP | N | Time range. |  |
| `AmplitudeRatio` | Float | — | N | Ratio. |  |

## ShijimiRangeF

Range

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Min` | Float | BP | N | Minimum. | 10, 4, 5 |
| `Max` | Float | BP | N | Maximum. | 15, 5, 10 |

## ShippoAIParameter

Shippo ("tail") = tail-slamming/spinning enemy

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bCanSlam` | Bool | BP | N | Can slam its tail. | false |
| `bEnableTargetPriority` | Bool | — | N | Use target priority. |  |
| `TurnAttackBound` | ShippoAttackBoundParameter | BP | N | Spin attack volume. |  |
| `SlamAttackBound` | ShippoAttackBoundParameter | BP | N | Slam volume. |  |
| `TurnAttackFlickArg` | FlickArg | BP | N | Spin flick. |  |
| `TurnAttackingFlickArg` | FlickArg | BP | N | Flick while spinning. |  |
| `TurnAttackStickFlickArg` | FlickArg | BP | N | Spin flick of latched Pikmin. |  |
| `SlamAttackFlickArg` | FlickArg | BP | N | Slam flick. |  |
| `ChangeAttackToCautionFlickArg` | FlickArg | BP | N | Flick when switching to caution. |  |
| `bSlamAttackFlick` | Bool | BP | N | Slam flicks. | true |
| `SlamAttackFlickRange` | Float | BP | N | Slam flick range. | 0 |
| `SlamAttackJumpRange` | Float | BP | N | Slam jump range. | 200 |
| `SlamBounceHeight` | Float | BP | N | Slam bounce. | 300 |
| `TerritoryOutSideLength` | Float | BP | N | Outside-territory distance. | 0 |
| `TurnAttackRotate` | Float | BP | N | Spin rotation. | 290, 300 |
| `TurnAttackNoHitRange` | Float | — | N | Spin no-hit range. |  |
| `TurnAttackNoHitAngle` | Float | — | N | Spin no-hit angle. |  |
| `AttckCoolTime` | Float | BP | N | Attack cooldown. | 0 |
| `BackBombDamageRate` | Float | BP | N | Bomb damage from behind. | 0.10000000149011612 |
| `DownTime` | Float | BP | N | Down time. | 9, 5 |
| `ChaseGiveupTime` | Float | BP | N | Chase give-up time. | 1.5 |
| `ChaseStartTurnAngle` | Float | — | N | Chase start angle. |  |
| `ChaseEndTurnAngle` | Float | — | N | Chase end angle. |  |
| `SearchAreaBomb` | CakeSSphereSearchArea | BP | N | Bomb search area. |  |
| `BombAttackSearchArea` | BaumkuchenSearchArea | BP | N | Bomb attack ring. |  |
| `LookTailTargetChangeSpeed` | Float | — | N | Tail look-at change speed. |  |
| `LookTailRatioChangeSpeed` | Float | — | N | Tail look ratio speed. |  |
| `SlamAttackParam` | ShippoSlamAttackParameter | BP | N | Slams per life ratio. |  |
| `bAreaShakeOffBomb` | Bool | — | N | Shake off bombs in an area. |  |
| `bAreaTurnAttack` | Bool | BP | N | Area spin attack. | true |
| `TurnAttackArea` | CakeSearchArea | BP | N | Spin attack area. |  |
| `AttackRadius` | Float | BP | N | Attack radius. | 5, 8 |
| `RootAttackRadius` | Float | BP | N | Tail root attack radius. | 20, 10 |
| `RootAttackOffset` | Vector | BP | N | Tail root offset. |  |
| `SlamTurnParam` | ShippoSlamTurnParameter | BP | N | Slam turning. |  |
| `TurnAttackWaitTimer` | Float | BP | N | Spin wait. | 1 |
| `ShakeOffBombWaitTimer` | Float | — | N | Bomb shake-off wait. |  |
| `PressBoundParam` | ShippoPressBoundParameter | BP | N | Press volume. |  |
| `FrontDownAngleDistance` | Float | — | N | Front knock-down angle. |  |
| `LargeDownEndDamage` | Float | BP | N | Damage ending big knock-down. | 0.3499999940395355 |
| `HintMessageParam` | ShippoHintMessageParameter | BP | N | Hints. |  |
| `LookAroundWaitRate` | Float | — | N | Look-around chance. |  |
| `PushLength` | Float | — | N | Push length. |  |
| `CrushCollTreeName` | Name | BP | N | Crush collision trees. |  |

## ShippoAttackBoundParameter

Attack volume

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius2D` | Float | BP | N | Radius. | 250, 90, 300 |
| `HalfHeight` | Float | BP | N | Half height. | 100, 50 |
| `AngDeg` | Float | BP | N | Angle. | 90, 10, 360 |
| `RotDeg` | Float | — | N | Rotation. |  |
| `bEnableSphereBound` | Bool | BP | N | Also a sphere. | true |
| `SphereRadius` | Float | BP | N | Sphere radius. | 50, 35 |
| `SphereOffset` | Vector | BP | N | Sphere offset. |  |

## ShippoHintMessageParameter

Hints

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchNearPikminAttackRadius` | Float | BP | N | Radius. | 100 |
| `SearchNearPikminAttackHalfHeight` | Float | — | N | Height. |  |
| `NearPikminAttackTimeFirst` | Float | — | N | First hint time. |  |
| `NearPikminAttackTimeSecond` | Float | BP | N | Second hint time. | 15 |
| `NearPikminAttackTimeThird` | Float | BP | N | Third hint time. | 25 |
| `DownNum` | Int | — | N | Downs before hint. |  |

## ShippoPressBoundParameter

Press volume

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius` | Float | BP | N | Radius. | 0 |
| `HalfHeight` | Float | BP | N | Half height. | 0 |
| `Offset` | Vector | — | N | Offset. |  |
| `CylinderRadius` | Float | BP | N | Cylinder radius. | 0 |
| `CylinderHalfHeight` | Float | — | N | Cylinder half height. |  |
| `FlyBound` | BoxBound2 | BP | N | Fly volume. |  |
| `FlyOffset` | Vector | — | N | Fly offset. |  |
| `WingPikminFallSpeed` | Float | BP | N | Winged Pikmin fall speed. | 500 |

## ShippoSlamAttackParameter

Slams by life

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Life ratio. |  |
| `SlamCount` | Int | BP | N | Slams. | 2, 3 |

## ShippoSlamTurnParameter

Slam turn

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AngVelTime` | Float | BP | N | Turn speed 1. | 5 |
| `AngAccelRatio` | Float | BP | N | Turn accel 1. | 0.5 |
| `SecondAngVelTime` | Float | BP | N | Turn speed 2. | 2 |
| `SecondAngAccelRatio` | Float | — | N | Turn accel 2. |  |
| `ThirdAngVelTime` | Float | BP | N | Turn speed 3. | 2 |
| `ThirdAngAccelRatio` | Float | — | N | Turn accel 3. |  |
| `TurnTime` | Float | BP | N | Turn time. | 3 |
| `TurnBound` | ShippoAttackBoundParameter | BP | N | Turn volume. |  |
| `SlamBound` | ShippoAttackBoundParameter | BP | N | Slam volume. |  |
| `IntervalTime` | Float | BP | N | Interval. | 0.5 |
| `AngVelTimeTurnFast` | Float | — | N | Fast turn speed. |  |

## ShortcakeBound2

Cylinder sector bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius2D` | Float | BP | N | Radius. | 500, 100 |
| `SqRadius2D` | Float | — | N | Cached squared radius. |  |
| `HalfHeight` | Float | BP | N | Half height. | 100 |
| `AngDeg` | Float | BP | N | Sector angle. | 360 |

## SitRowInfo

Seat row

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PikminNum` | Int | BP | N | Pikmin in the row. | 6, 12, 10 |
| `CenterEmptyNum` | Int | BP | N | Empty seats in the centre. | 4, 0, 2 |
| `DistanceOffset` | Float | — | N | Per-seat distance offsets. |  |

## SlowStickerParameter

Latched slowdown

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bSlow` | Bool | BP | N | Latched Pikmin slow it. | true |
| `MaxSlowRatio` | Float | BP | N | Max slowdown. | 0.800000011920929 |
| `MinSlowStickers` | Int | — | N | Min latched to slow. |  |
| `MaxSlowStickers` | Int | BP | N | Latched for max slowdown. | 4 |

## SnakeCrowAIParameter

Burrowing Snagret (SnakeCrow)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BurrowMaxTime` | Float | — | N | Max burrowed time. |  |
| `RepartitionTime` | Float | BP | N | Re-emerge interval. | 20 |
| `BurrowDamage` | Float | — | N | Damage to force burrowing. |  |
| `ShakeDamage` | Float | — | N | Damage to shake. |  |
| `AppearInterval` | Float | — | N | Appear interval. |  |
| `StrikeSuccessStickTime` | Float | — | N | Stuck time after a successful strike. |  |
| `StrikeFailStickTime` | Float | — | N | Stuck time after a miss. |  |
| `LookAtDistanceMin` | Float | BP | N | Min look-at distance. | 50 |
| `LookAtDistanceMinStrike` | Float | — | N | Min look-at distance striking. |  |
| `WaitTurnSpeed` | Float | BP | N | Turn speed waiting. | 3 |
| `AttackTurnSpeed` | Float | BP | N | Turn speed attacking. | 5 |
| `StrikeTurnSpeed` | Float | — | N | Turn speed striking. |  |
| `BurrowTurnSpeed` | Float | — | N | Turn speed burrowing. |  |
| `ReturnTurnSpeed` | Float | BP | N | Turn speed returning. | 2.5 |
| `CanAttackAngle` | Float | — | N | Attack angle. |  |
| `StrikeRate` | Float | BP | N | Strike chance. | 1 |
| `StrikeEatRange` | Float | BP | N | Strike eat range. | 25 |
| `StrikeEatOffset` | Vector | BP | N | Strike eat offset. |  |
| `StrikeFlickParameter` | AIFlickParameter | BP | N | Strike flick. |  |
| `StrikeOffset` | Vector | BP | N | Strike offset. |  |
| `StrikeCoolTime` | Float | BP | N | Strike cooldown. | 25 |
| `EffDamage` | Float | BP | N | Damage threshold for effect. | 60 |
| `EffLifeRatio` | Float | — | N | Effect life ratio. |  |
| `EnableEffLifeRatio` | Float | BP | N | Effect enable ratio. | 0.3499999940395355 |
| `BombInsideEftCustomRequestParam` | EftCustomRequestParam | BP | N | Bomb-inside effect. |  |
| `HairStartRate` | Float | — | N | Hair effect start. |  |
| `HairEndRate` | Float | — | N | Hair effect end. |  |
| `DamageHairDispLifeRate` | Float | BP | N | Damaged hair life ratio. | 0.5 |
| `BiteFarDistance` | Float | — | N | Far bite distance. |  |
| `BiteTryCountMin` | Int | BP | N | Min bite tries. | 4 |
| `BiteTryCountMax` | Int | — | N | Max bite tries. |  |
| `EnableMouthNum` | Int | — | N | Pikmin per bite. |  |
| `AppearDistanceMin` | Float | — | N | Min appear distance. |  |
| `AppearDistanceMax` | Float | BP | N | Max appear distance. | 250 |
| `AppearRandRot` | Float | BP | N | Appear random rotation. | 30 |
| `StrikeEffectRequest00` | EftRequest | BP | N | Strike effects. |  |
| `StrikeEffectRequest00_1` | EftRequest | — | N | Strike effects. |  |
| `StrikeEffectRequest01` | EftRequest | BP | N | Strike effects. |  |
| `StrikeEffectRequest02` | EftRequest | BP | N | Strike effects. |  |
| `StrikeEffectRequest03` | EftRequest | BP | N | Strike effects. |  |
| `VomitSpeedXY` | Float | — | N | Vomit speed. |  |
| `AppearFlickArg` | FlickArg | BP | N | Appear flick. |  |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |

## SniffPointParameter

Extra target points for Oatchi's sniff / radar (CarrotAIComponent+0x688, per-instance for every AI)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableOptionalPoint` | Bool | SL | S | Use the optional points below instead of the actor origin. | true |
| `OptionalPointOffsets` | Vector | SL | S | Local offsets of optional sniff/target points (Dandori "optionalPointOffsets"). |  |
| `OptionalPointPriorityInfo` | Int | SL | S | Priority per optional point (int array). |  |
| `bDroppedDirectOptionalPoint` | Bool | — | N | After being dropped, use the direct optional points list. |  |
| `DroppedDirectOptionalPoints` | Array | — | N | Optional points used after the actor has been dropped. |  |

## SpaceBusAIParameter

Space bus (hub vehicle)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SmokeEffect` | ParticleSystem | BP | N | Smoke effect. |  |

## SpawnTireParameter

Tire part spawn

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttachBoneName` | Name | BP | N | Bone the tire actor attaches to (e.g. B_j001_Tire). | "B_j001_Tire", "B_j002_Tire" |
| `Actor` | Class | BP | N | Tire actor class. |  |

## SphereBound2

Sphere bound

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Radius` | Float | BP | N | Radius. | 60, 30, 10 |
| `SqRadius` | Float | — | N | Cached squared radius (runtime). |  |

## SphereSearchArea

Sphere volume

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Center` | Vector | — | N | Centre offset. |  |
| `Radius` | Float | BP+SL | N | Radius. | 150 |

## SporePoolAIParameter

Spore pool (from fire/spore enemies)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SporePoolSplitPS01` | ParticleSystem | BP | N | Split effect 1. |  |
| `SporePoolSplitPS02` | ParticleSystem | BP | N | Split effect 2. |  |
| `OnEventBound` | BoxBound2 | BP | N | Event volume. |  |
| `DestroyTime` | Float | BP | N | Lifetime. | 4 |
| `PoolType` | EGenericActorPoolType | BP | N | Pool. | "EGenericActorPoolType::KinoKajiokoshiSpore" |

## SprinklerAIParameter

Sprinklers (watered by valves). Per-instance: WaterRange, OpenTime, bUseFlatEffect, FlatEffectOffsetZ, bSprinklerOnly (+ValveID on component)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaterEffect` | ParticleSystem | — | S | Water effect. |  |
| `WaterEffectSmall` | ParticleSystem | — | N | Small water effect. |  |
| `WaterEffectFlat` | ParticleSystem | — | N | Flat water effect. |  |
| `WaterEffectFlatSmall` | ParticleSystem | — | N | Small flat water effect. |  |
| `WaterRange` | Float | SL | S | Spray radius. | 345, 350, 365 |
| `OpenTime` | Float | SL | S | Spray duration. | 10 |
| `DecalFadeWaitTime` | Float | — | N | Wet decal fade wait. |  |
| `DecalFadeIn` | Float | — | N | Decal fade-in. |  |
| `DecalFadeOut` | Float | — | N | Decal fade-out. |  |
| `WaitTime` | Float | — | N | Wait. |  |
| `DemoWaitTime` | Float | — | N | Cutscene wait. |  |
| `bUseFlatEffect` | Bool | — | S | Use the flat spray effect (Dandori's skipped 4 bytes). |  |
| `FlatEffectOffsetZ` | Float | SL | S | Flat effect height. | -30, -25, 3 |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `bSprinklerOnly` | Bool | SL | S | Only sprays (doesn't trigger other water effects). | true |

## StickyFloorAIParameter

Sticky floor (mushroom goo). Per-instance: StickyFloorSize, bAutoSpawnMush

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StickyFloorSize` | EStickyFloorSize | — | S | Size. |  |
| `bBirthFromDokuNameko` | Bool | — | N | Created by a DokuNameko. |  |
| `bAutoSpawnMush` | Bool | SL | S | Automatically spawns mushrooms. | false |
| `SpawnMush` | Class | — | N | Mushroom class. |  |
| `SpawnMushNumMin` | Int | — | N | Min mushrooms. |  |
| `SpawnMushNumMax` | Int | — | N | Max mushrooms. |  |
| `MushOffsetZ` | Float | — | N | Mushroom height. |  |
| `ReLotNum` | Int | — | N | Re-roll count. |  |
| `MushBreakEffect` | ParticleSystem | — | N | Mushroom break effect. |  |
| `BreakEffect` | ParticleSystem | — | N | Break effect. |  |
| `ReviveEffect` | ParticleSystem | — | N | Revive effect. |  |
| `BreakEftCreateStopTime` | Float | — | N | Break effect stop time. |  |

## StringAIParameter

Hanging strings (pull down to make a path). Per-instance: FallHeight (+dynamic bFalled)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ClimbSpeed` | Float | — | N | Climb speed. |  |
| `JumpHeight` | Float | — | N | Jump height. |  |
| `JumpDist` | Float | — | N | Jump distance. |  |
| `FallHeight` | Float | SL | S | Fall height. | 100, 92.5, 130 |
| `bFalled` | Bool | SL | S | Already pulled down (dynamic). | true |
| `FallAnimPlayRate` | Float | — | N | Fall animation rate. |  |
| `FallEffect` | ParticleSystem | — | N | Fall effect. |  |
| `FallEftCustomRequestParam` | EftCustomRequestParam | — | N | Fall effect request. |  |
| `CompleteWorkNumInvisibleTime` | Float | — | N | Counter hide time. |  |

## SuitoriAIParameter

Suitori ("sucker") = trunk-vacuum enemy that sucks in Pikmin/items. Per-instance: SuitoriType

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SuitoriType` | ESuitoriType | — | S | ESuitoriType variant. |  |
| `MoveParamFull` | SuitoriFullMoveParam | BP | N | Movement when full. |  |
| `MotionControl` | SuitoriMotionControl | BP | N | Idle behaviour. |  |
| `ChasePriority` | SuitoriChasePriority | BP | N | Target priorities. |  |
| `bUseNotifyEffect` | Bool | — | N | Notify effect. |  |
| `AttackEffect` | ParticleSystem | BP | N | Attack effect. |  |
| `PikminVacuumPower` | Float | BP | N | Suction on Pikmin. | 60 |
| `NoPikminVacuumPower` | Float | BP | N | Suction on items. | 120 |
| `VacuumTime` | Float | BP | N | Suction time. | 4 |
| `VacuumInTime` | Float | BP | N | Pull-in time. | 0.30000001192092896 |
| `VacuumMaxPikminCnt` | Int | — | N | Max Pikmin. |  |
| `SuitoriWeightParam` | SwallowWeightParameter | BP | N | Item weights in its stomach. |  |
| `CapsuleMoveSpeed` | Float | BP | N | Captured move speed. | 120 |
| `CapsuleScaleSpeed` | Float | — | N | Captured scale speed. |  |
| `AttackOffset` | Float | BP | N | Attack offset. | -12 |
| `SuitoriAttackBound` | ConeBound | BP | N | Attack cone. |  |
| `SuitoriTargetBound` | ConeBound | BP | N | Target cone. |  |
| `NozzleInSphereRadius` | Float | BP | N | Nozzle sphere radius. | 30 |
| `NozzleOffset` | Vector | BP | N | Nozzle offset. |  |
| `NeckBoneLerpRatio` | Float | BP | N | Neck blend. | 0.07999999821186066 |
| `LookAtLocationLerpRatio` | Float | BP | N | Look-at blend. | 0.5 |
| `NeckSpineBoneBendNeckRatio` | Float | — | N | Neck bend ratio. |  |
| `FlickBoneName` | Name | — | N | Flick bone. |  |
| `FlickActorOffsetLocation` | Vector | — | N | Flick offset. |  |
| `FlickOtakaraVelocityForward` | Float | BP | N | Treasure flick forward. | 310 |
| `FlickOtakaraVelocityUp` | Float | BP | N | Treasure flick up. | 200 |
| `FlickOtakaraScaleUpTime` | Float | BP | N | Treasure scale-up time. | 0.5 |
| `VomitBoneName` | Name | BP | N | Vomit bone. | "F_j003_upper" |
| `VomitSpeed` | Float | — | N | Vomit speed. |  |
| `VomitOffset` | Vector | BP | N | Vomit offset. |  |
| `KeepDistanceParameter` | SuitoriKeepDistance | — | N | Distance keeping. |  |
| `ForceWaitTimeOnBirth` | Float | — | N | Wait after spawning. |  |

## SuitoriChasePriority

Target priorities

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Pikmin` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |
| `Avator` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |
| `Bomb` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |
| `Otakara` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |
| `Pellet` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |
| `Sizai` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |
| `Kinkai` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |
| `Survivor` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |
| `Onyon` | SuitoriChasePriorityElement | BP | N | Priority for this target type (Normal / Blind values). |  |

## SuitoriChasePriorityElement

Priority pair

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Normal` | Int | BP | N | Priority normally. | 1, 4, 3 |
| `Blind` | Int | BP | N | Priority while blinded. | 5, 1, 4 |

## SuitoriFullMoveParam

Full movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxSpeed` | Float | BP | N | Speed. | 22 |
| `MaxAngVelTime` | Float | BP | N | Turn speed. | 5.5 |

## SuitoriMotionControl

Idle behaviour

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RatioWaitToWander` | Float | — | N | Wait to wander chance. |  |
| `RatioWaitToWait` | Float | — | N | Keep waiting chance. |  |
| `RatioWaitToLookAround` | Float | — | N | Look around chance. |  |
| `LimitMotionNumLookAt` | Int | BP | N | Look-at motion limit. | 2 |
| `RatioBlink` | Float | — | N | Blink chance. |  |

## SwallowWeightParameter

Stomach capacity weights

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `KinkaiWeight` | Int | — | N | Gold nugget weight. |  |
| `SizaiWeight` | Int | — | N | Raw material weight. |  |
| `SurvivorWeight` | Int | BP | N | Castaway weight. | 3 |
| `OnyonCarryWeight` | Int | — | N | Onion weight. |  |
| `Pellet1Weight` | Int | — | N | 1-pellet weight. |  |
| `Pellet5Weight` | Int | — | N | 5-pellet weight. |  |
| `Pellet10Weight` | Int | — | N | 10-pellet weight. |  |
| `OtakaraSWeight` | Int | — | N | Small treasure weight. |  |
| `OtakaraMWeight` | Int | — | N | Medium treasure weight. |  |
| `OtakaraLWeight` | Int | — | N | Large treasure weight. |  |
| `OtakaraXLWeight` | Int | — | N | XL treasure weight. |  |
| `MCarryNum` | Float | — | N | Carry number for M. |  |
| `LCarryNum` | Float | — | N | Carry number for L. |  |
| `XLCarryNum` | Float | — | N | Carry number for XL. |  |
| `StomachSize` | Int | BP | N | Stomach capacity. | 5 |

## SwitchBaseAIParameter

Floor switches. Per-instance: SwitchID

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SwitchID` | Name | SL | S | Switch ID (links doors/circulators/conveyors). | "switch02", "CirculatorSwitch04", "CirculatorSwitch05" |
| `Type` | EControlSwitchEvent | — | N | EControlSwitchEvent type. |  |
| `bIsRepeatable` | Bool | BP | N | Can toggle repeatedly. | false |
| `IntervalTime` | Float | — | N | Toggle interval. |  |
| `RequiredDownNormal` | Float | — | N | Required press normal. |  |
| `RequiredPushVelZ` | Float | — | N | Required press speed. |  |
| `RequiredPushVelZForHappy` | Float | — | N | Required press speed by Oatchi. |  |

## TamagoMushiAIParameter

TamagoMushi = egg bugs that pop out of pots/treasure/fires when disturbed. Per-instance: SearchArea?, SearchObjectRadius, SearchType, bMultiTarget, bBirthUnderGround

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchArea` | CakeSSphereSearchArea | BP | S | Panic search area. |  |
| `MinWaitTime` | Float | BP | N | Min wait. | 0.5 |
| `MaxWaitTime` | Float | BP | N | Max wait. | 2.5 |
| `MinWaitTimeAfterAppear` | Float | BP | N | Min wait after appearing. | 0.25 |
| `MaxWaitTimeAfterAppear` | Float | BP | N | Max wait after appearing. | 1.5 |
| `MinWaitTurnDegree` | Float | BP | N | Min idle turn. | 60 |
| `MaxWaitTurnDegree` | Float | BP | N | Max idle turn. | 180 |
| `KeepMoveDirTime` | Float | BP | N | Direction keep time. | 0.10000000149011612 |
| `CollideKeepMoveDirTime` | Float | — | N | Direction keep after collision. |  |
| `MinMoveTime` | Float | BP | N | Min move. | 0.5 |
| `MaxMoveTime` | Float | BP | N | Max move. | 2.5 |
| `MoveTurnRate` | Float | BP | N | Move turn rate. | 0.30000001192092896 |
| `MinMoveTurnDegree` | Float | BP | N | Min move turn. | 35 |
| `MaxMoveTurnDegree` | Float | BP | N | Max move turn. | 80 |
| `MinDiveTime` | Float | BP | N | Min dive time. | 8 |
| `MaxDiveTime` | Float | BP | N | Max dive time. | 10 |
| `SearchPanicXY` | Float | BP | N | Panic radius. | 80 |
| `SearchPanicZ` | Float | BP | N | Panic height. | 100 |
| `PanicTimer` | Float | — | N | Panic time. |  |
| `SearchAlwaysPanicXY` | Float | BP | N | Always-panic radius. | 30 |
| `SearchAlwaysPanicZ` | Float | BP | N | Always-panic height. | 40 |
| `SearchObjectRadius` | Float | — | S | Radius to find the host object. |  |
| `SearchType` | ETamagoMushiSearchType | SL | S | ETamagoMushiSearchType host type (CrackPot, Otakara, StickyFloor, Burning, HikariKinoko...). | "ETamagoMushiSearchType::CrackPot", "ETamagoMushiSearchType::StickyFloor", "ETam |
| `bMultiTarget` | Bool | SL | S | Can use several hosts. | true |
| `AppearTimeParam` | TamagoMushiAppearTimeParameter | BP | N | Appear delay per host type. |  |
| `bBirthUnderGround` | Bool | SL | S | Spawns underground. | false |
| `SpeedFromEgg` | Float | BP | N | Launch speed from host. | 50 |
| `SpeedHeightFromEgg` | Float | BP | N | Launch height. | 200 |
| `RandAddSpeedFromEgg` | Float | — | N | Random speed. |  |
| `RandAddSpeedHeightFromEgg` | Float | BP | N | Random height. | 200 |
| `LandingEffectRequest` | EftRequest | BP | N | Landing effect. |  |
| `LandingEffectScale` | Float | BP | N | Landing effect scale. | 1.2000000476837158 |
| `LandingEffectOffset` | Vector | BP | N | Landing effect offset. |  |
| `CheckActorDistance` | Float | — | N | Host check distance. |  |
| `CheckActorOffset` | Vector | — | N | Host check offset. |  |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |

## TamagoMushiAppearTimeParameter

Appear delay per host

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Otakara` | Float | — | N | Treasure host. |  |
| `CrackPot` | Float | — | N | Pot host. |  |
| `StickyFloor` | Float | — | N | Sticky floor host. |  |
| `Burning` | Float | BP | N | Fire host. | 0.30000001192092896 |
| `HikariKinoko` | Float | — | N | Glow mushroom host. |  |

## TamagumoAIParameter

Tamagumo = egg spider (drops on a net)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchPikminRadius` | Float | — | N | Pikmin search radius. |  |
| `SearchBombRadius` | Float | — | N | Bomb search radius. |  |
| `EscapeTime` | Float | — | N | Escape time. |  |
| `TurnSpeed` | Float | — | N | Turn speed. |  |
| `NetHalfWidth` | Float | — | N | Net half width. |  |
| `NetHalfHeight` | Float | — | N | Net half height. |  |
| `ClosableLowerDist` | Float | BP | N | Closable distance. | 40 |
| `DropRotAng` | Float | — | N | Drop rotation. |  |
| `DropRotAccel` | Float | BP | N | Drop rotation acceleration. | 20 |
| `DropVelocity` | Float | — | N | Drop speed. |  |
| `StartContactFrame` | Int | BP | N | Contact start frame. | 3 |
| `SearchRadiusForHappy` | Float | BP | N | Oatchi search radius. | 75 |
| `AttackDistanceForHappy` | Float | BP | N | Oatchi attack distances. |  |
| `BoundSmokeEffectRequest` | EftRequest | BP | N | Landing smoke. |  |
| `BoundSmokeEffectScale` | Float | BP | N | Smoke scale. | 1.100000023841858 |
| `InvincibleTime` | Float | — | N | Invincible time. |  |

## TamagumoNetAIParameter

Egg spider net (webs that trap Pikmin). Per-instance: TamagumoOffsetPos, SearchNetStickActorRadius

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TamagumoActorClass` | Class | BP | N | Spider class. |  |
| `TamagumoOffsetPos` | Vector | SL | S | Spider offset from the net. |  |
| `ClosableLowerDist` | Float | BP | N | Closable distance. | 30 |
| `SearchOtakaraRadius` | Float | — | N | Treasure search radius. |  |
| `SearchNetStickActorRadius` | Float | SL | S | Radius for actors stuck in the net. | 100 |
| `bHeightCorrect` | Bool | BP | N | Height correction. | true |
| `HeightCorrectDiff` | Float | BP | N | Height difference. | 40 |
| `HeightCorrectRate` | Float | BP | N | Height correction rate. | 1.25 |
| `PikminCaptureDistOfs` | Float | — | N | Capture distance offset. |  |
| `RockPikminParam` | TamagumoNetForRockPikminParam | BP | N | Rock Pikmin tearing the net. |  |
| `FlickArgForCarryActor` | FlickArg | BP | N | Flick carriers. |  |
| `PushDistForHitActor` | Float | — | N | Push distance. |  |
| `PushVelocityForHitActorXY` | Float | — | N | Push speed XY. |  |
| `PushVelocityForHitActorZ` | Float | — | N | Push speed Z. |  |
| `FlickSpeedXY` | Float | — | N | Flick speed XY. |  |
| `FlickSpeedZ` | Float | — | N | Flick speed Z. |  |
| `DisableNetCaptureTime` | Float | — | N | Capture cooldown. |  |

## TamagumoNetForRockPikminParam

Rock Pikmin

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CheckHitDist` | Float | BP | N | Hit distance. | 40 |
| `CheckHitAng` | Float | BP | N | Hit angle. | 40 |

## TanebiInsideParameter

Swallowed flame

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EffectParam` | TanebiInsideEffectParameter | BP | N | Effect. |  |
| `LethalDose` | Float | BP | N | Time until the flame kills it. | 3 |

## TanebiStationAIParameter

Tanebi station (ember source). Per-instance: bInitOff

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TanebiActor` | Class | — | N | Ember class. |  |
| `FireDamage` | Float | — | N | Fire damage. |  |
| `FireEffect` | ParticleSystem | — | N | Fire effect. |  |
| `ExtinguishEffect` | ParticleSystem | — | N | Extinguish effect. |  |
| `bInitOff` | Bool | SL | S | Starts extinguished. | true |
| `RideActorDamageRadius` | Float | — | N | Rider damage radius. |  |

## TankAttackBox

Box

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HalfWidth` | Float | BP | N | Half width. | 35, 50 |
| `HalfHeight` | Float | BP | N | Half height. | 50 |
| `HalfLength` | Float | BP | N | Half length. | 180, 90, 190 |
| `Offset` | Float | BP | N | Offset. | 0, 4, 10 |

## TankBaseAIParameter

Tank = water/ice-spitting enemy (Watery/Icy Blowhog-like)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TankType` | ETankType | BP | N | ETankType (Water, Ice, ...). | "ETankType::Ice", "ETankType::Water" |
| `BodyEffectName` | Name | BP | N | Body effect name. | "PS_eft_BigTank_BodyIce00", "PS_eft_Tank_BodyIce00" |
| `AttackEffect` | ParticleSystem | BP | N | Attack effect. |  |
| `AttackEffectSub` | ParticleSystem | BP | N | Secondary attack effect. |  |
| `AttackEffectScale` | Float | BP | N | Effect scale. | 2.5, 1 |
| `bUseHomingAttack` | Bool | — | N | Homing attack. |  |
| `bUseAttackFlick` | Bool | BP | N | Attack flicks. | true |
| `AttackFlickArg` | FlickArg | BP | N | Attack flick. |  |
| `AttackFlickArgForPlayer` | FlickArg | BP | N | Captain flick. |  |
| `HDRumbleKey` | Name | BP | N | Rumble. | "Teki_Tank_Attack" |
| `HDRumbleOfsRate` | Float | BP | N | Rumble offset. | 0.699999988079071, 0.8999999761581421 |
| `CheckAttackBox` | TankAttackBox | BP | N | Attack check box. |  |
| `AttackBox` | TankAttackBox | BP | N | Attack box. |  |
| `AttackSpeed` | Float | BP | N | Spray speed. | 600, 300 |
| `bUseMouthAttack` | Bool | BP | N | Mouth attack. | true |
| `MouthAttackRadius` | Float | BP | N | Mouth radius. | 13 |
| `bSendVaccumEvent` | Bool | BP | N | Send vacuum event. | true |
| `AfterFlickAttackTime` | Float | BP | N | Time after flick. | 1.5 |
| `AfterFlickAttackRate` | Float | BP | N | Rate after flick. | 2 |
| `AtkSameTargetNum` | Int | BP | N | Attacks on the same target. | 3 |
| `AtkOnlyTargetTime` | Float | BP | N | Single target time. | 3 |
| `bEnableTiredByAttack` | Bool | BP | N | Gets tired after attacking. | true |
| `TiredAttackNum` | Int | — | N | Attacks before tired. |  |
| `CheckTiredAttackTime` | Float | — | N | Tired check time. |  |

## TargetFilter

Target type filter

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Flags` | UInt16 | BP | S | ESearchTargetFilterFlags: 1 Pikmin, 2 Avatar(captain), 4 Happy(Oatchi), 8 YuudouEsa(lure food), 16 Wasurenagusa(Lumiknoll), 32 NightMush, 64 Bomb, 128 Tanebi, 256 DogFood, 512 Other (63 = default, 65535 = all). | 511, 319, 265 |

## TateanaAIParameter

Tateana ("vertical hole") = dig-up enemy spawner holes / Pikmin dig spots. Per-instance: NumDig (dynamic), TimeDigWork (+drops via ActorSpawner sub-static)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NumDig` | Int | SL | S | Remaining dig count (dynamic). | 5 |
| `TimeDigWork` | Float | BP | S | Dig work time. | 30 |
| `TimeDigStart` | Float | — | N | Dig start time. |  |
| `TimeDieWait` | Float | BP | N | Wait before removal. | 0.5 |
| `DamageEftReq` | EftRequest | BP | N | Damage effect. |  |
| `DigPowerSumCorrectFactor` | Float | — | N | Dig power correction. |  |
| `DamageMag` | Float | — | N | Damage multiplier. |  |

## TateanaBaseAIParameter

Hole base

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaitTime` | Float | BP | N | Wait. | 0 |
| `JumpVelXY` | Float | BP | N | Jump-out speed XY. | 40 |
| `JumpVelZ` | Float | BP | N | Jump-out speed Z. | 200 |
| `JumpStartZOffset` | Float | — | N | Jump start height. |  |

## TekiAIParameter

Base parameters shared by every enemy (embedded at TekiAIComponent+0x710). Per-instance (AI.Static) fields: Territory, DropParameter, bCalcSearchAreaOtakaraCarryWithTerritory, SearchAreaOtakaraCarry, InvasionParameter.StartTimeRatio, bNotifyCarryNearProWrestlingPikmin, bEnableCullSearchEnemy, bUseActorLastRenderTime (+ per-species extras)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchAreaGoToHome` | CakeSSphereSearchArea | BP+SL | N | Search volume used while the enemy is returning to its nest/home; targets entering it can interrupt the go-home walk. |  |
| `SearchAreaCaution` | CakeSSphereSearchArea | BP+SL | T | "Alert" search volume: targets inside it put the enemy into its caution/notice state (serialized per-instance for several species, e.g. Futakuchi, BigUjinko, NightKochappy). |  |
| `SearchAreaRest` | CakeSSphereSearchArea | BP+SL | T | Search volume used while the enemy is resting/sleeping; the wake-up radius (serialized per-instance for Frog, Hari, Kurage, NumaSuitori, HageDamagumo, FireChappy). |  |
| `bUseOtakaraCarrySearchArea` | Bool | BP+SL | T | If true, the enemy also looks for Pikmin carrying treasure using SearchAreaOtakaraCarry (read by the Teki search code at 0x00ED4230/0x00ED48E0). | false |
| `bCalcSearchAreaOtakaraCarryWithTerritory` | Bool | BP+SL | T | When set, the treasure-carry search area is re-centred on / computed from the territory rather than the enemy's own position (read at 0x017F27C0; per-instance). | false |
| `SearchAreaOtakaraCarry` | CakeSSphereSearchArea | BP+SL | T | Search volume for detecting Pikmin carrying treasure/items (lets thieves such as Dweevils/Patrollers react to carriers). Per-instance. |  |
| `EatArea` | CakeSearchArea | BP+SL | T | Cone/cylinder in front of the mouth that defines where Pikmin can be eaten (bite hit area). Per-instance for Frog/Hari. |  |
| `EatOffset` | Vector | BP | N | Offset of the EatArea origin from the mouth/bone (space chosen by OffsetCalcSpace). |  |
| `OffsetCalcSpace` | EOffsetCalcSpace | BP | T | Whether EatOffset is interpreted in component space or bone space (EOffsetCalcSpace). | "EOffsetCalcSpace::BoneSpace" |
| `Territory` | CylinderSearchArea | BP+SL | T | Home cylinder (Center/HalfHeight/Radius). The enemy wanders and chases within it and returns home when targets leave it. Per-instance – this is the "territory" edited in Dandori Desktop. |  |
| `TerritoryNestRatio` | Float | BP+SL | T | Size of the "nest" as a fraction of Territory.Radius (0x011F17C0 computes Territory.Radius * TerritoryNestRatio); the enemy considers itself home once inside this radius. | 0.01, 0, 0.15 |
| `bFlickRecoverFreeze` | Bool | BP | T | If true the enemy performs a shake-off (flick) when it thaws from being frozen by Ice Pikmin (checked in the freeze-recover handler 0x017C4820). | false |
| `bResetAIWhenRecoverFreezeOnAir` | Bool | BP | T | If the enemy thaws while airborne, reset its AI to the default state (0x017C4820). | false |
| `GazeTime` | Float | BP | N | How long the enemy stares at / tracks a newly noticed target before acting. | 1.7999999523162842 |
| `AIWanderParameter` | AIWanderParameter | BP+SL | S | Wander (idle roaming) settings, see AIWanderParameter. |  |
| `AIFlickParameter` | AIFlickParameter | BP+SL | S | Default shake-off used when too many Pikmin are latched on, see AIFlickParameter/FlickArg. |  |
| `AIDefaultFlickParameterForProWrestling` | AIFlickParameter | BP | N | Shake-off used when the enemy is being grappled ("pro-wrestling", i.e. pinned by Oatchi/Pikmin grab). |  |
| `DefaultHappyHitCounts` | Int | BP | T | How many hits an Oatchi (Happy) attack counts as against this enemy (passed to the damage helper 0x00D9F980). | 1, 2, 4 |
| `DropParameter` | DropParameter | BP+SL | T | What the enemy drops when defeated, see DropParameter. Per-instance (this is the Dandori Desktop "inventory"). |  |
| `NightDropParameter` | NightDropParameter | BP | N | Bone/offset used as the drop origin during night expeditions. |  |
| `AttackParameter` | AIAttackParameter | BP+SL | N | Eat/bite attack settings, see AIAttackParameter. |  |
| `DangerParameter` | TekiDanagerParameter | BP | T | Marks the enemy as dangerous for AI avoidance, see TekiDanagerParameter. |  |
| `CarcassWaterContextParameter` | TekiCarcassWaterContextParameter | BP | N | Water context applied to the carcass (whether a dead body sits in water), see TekiCarcassWaterContextParameter. |  |
| `DayActionType` | ETekiDayActionType | BP+SL | N | ETekiDayActionType: Auto/Day/Night – which time of day this enemy variant acts in. | "ETekiDayActionType::Day" |
| `bIsIgnoreBiten` | Bool | BP | N | No reader found in 0x0-0x2200000 – appears unused. | false |
| `CarryParameter` | AICarryParameter | BP | N | How the carcass is carried back by Pikmin, see AICarryParameter. |  |
| `InvasionParameter` | InvasionParameter | BP+SL | T | Night-expedition invasion settings, see InvasionParameter. StartTimeRatio is per-instance. |  |
| `DefaultMaterialAnimationName` | Name | BP | N | Name of the default material animation played on the mesh. | "Default" |
| `bDieRootMotionMontage` | Bool | BP | T | Death montage uses root motion (checked in the die handler 0x00E832F0). | false |
| `bDieMaterialAnimRequestToShadowMesh` | Bool | BP | T | Also apply the death material animation to the shadow mesh (0x00E832F0). | true |
| `bCaughtInSnowBall` | Bool | BP | T | Whether the enemy can be caught up in a rolling snowball (checked by snowball handlers 0x017C13A0/0x017C5E10). | true |
| `bAffectGravityInStopCondition` | Bool | BP | T | Returned by UTekiAIComponent::vfunc_276 – keep gravity active while the enemy is in a stop condition (frozen/stunned). | false |
| `bEnableFreezeFallDeadAction` | Bool | BP | N | Enables the special "frozen then falls and dies" action. | false |
| `bDetachStickersAllWhenDie` | Bool | BP | T | Knock off all latched Pikmin when the enemy dies (0x01DD7B40/0x01E0B510). | false |
| `bOriginalGravityControl` | Bool | BP | T | Use the enemy's own gravity handling instead of the default movement gravity (0x01B74C60). | true |
| `bNotifyCarryNearProWrestlingPikmin` | Bool | — | T | Notify nearby carrying Pikmin when this enemy is grappled (0x00E82A80). Per-instance. |  |
| `bEnableCullSearchEnemy` | Bool | BP | T | Allows the enemy's target search to be culled/skipped when off-screen (0x01E0B760). Per-instance. | false |
| `bUseActorLastRenderTime` | Bool | SL | T | Use the actor's last-rendered time to decide culling; if the check fails it falls back to bEnableCullSearchEnemy (0x01E0B760). Per-instance. | true |
| `DieCapsuleShadowRadiusScale` | Float | BP | T | Scale of the capsule shadow radius after death (0x00E80760). | 0 |
| `HardLockParam` | TekiHardLockParam | BP | N | Rules for the hard lock-on / face-message hints, see TekiHardLockParam. |  |
| `bEnableBombGuideMessage` | Bool | BP | N | Allow the "use a bomb" guide/hint message for this enemy. | true |
| `bEnableGekikaraGuideMessage` | Bool | BP | T | Allow the "use ultra-spicy spray" guide message (read in UTekiAIComponent::vfunc_139). | true |
| `bEnableFlashBurstGuideMessage` | Bool | BP | T | Allow the Glow-Pikmin "flash burst" guide message (vfunc_139). | true |
| `FlashBurstGuideMessageDist` | Float | BP | T | Distance (squared internally) within which the flash-burst guide message can trigger (vfunc_139). | 250 |

## TekiCarcassWaterContextParameter

Carcass water check

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnable` | Bool | BP | N | Enable the water check around the carcass. | true |
| `Radius` | Float | BP | N | Radius of the check. | 35, 12, 45 |
| `Offset` | Vector | BP | N | Offset of the check. |  |

## TekiDanagerParameter

Danger marking

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDangerActor` | Bool | BP | T | Marks the enemy as a danger (Pikmin/NPC AI avoid it; checked in UTekiAIComponent::vfunc_169). | false |
| `NoDangerAINames` | Name | BP | N | AI state names during which the enemy is not considered dangerous. |  |

## TekiHardLockParam

Lock-on hints

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NoCheckHardLockDemoAINames` | Name | BP | N | AI states in which the hard-lock cutscene check is skipped. |  |
| `bCheckHardLockDemo` | Bool | BP | N | Play the "hard lock" (strong enemy) cutscene when locked on. | true |
| `bCheckAutoLockOffLockDemo` | Bool | — | N | Also check when auto-lock is off. |  |
| `bCheckHardLockFaceMsg` | Bool | BP | N | Show the captain face message on hard lock. | true |
| `FaceMsgName` | Name | — | N | Face-message ID to show. |  |
| `CheckFaceMsgDist` | Float | BP | N | Distance for the face message. | 350, 500, 400 |
| `CheckFaceMsgTime` | Float | BP | N | Time locked on before the message appears. | 30 |
| `CheckFaceMsgIntervalTime` | Float | BP | N | Minimum interval between messages. | 30 |

## ThrowEaterAIParameter

ThrowEater = enemy that grabs Pikmin and throws them into a cage/mouth

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MouthCtrlParam` | ThrowEaterMouthCtrlParameter | BP | N | Mouth open/close. |  |
| `LookAtParam` | ThrowEaterLookAtParameter | BP | N | Look-at. |  |
| `ThrowParam` | ThrowEaterThrowParam | BP | N | Throws. |  |
| `EatCageBound` | CylinderBound2 | BP | N | Cage volume. |  |
| `EatCageBoneName` | Name | BP | N | Cage bones. |  |
| `StickCageRandX` | Float | — | N | Cage random X. |  |
| `StickCageRandY` | Float | — | N | Cage random Y. |  |
| `StickCageOfsZ` | Float | — | N | Cage height. |  |
| `InvisibleRadius` | Float | BP | N | Invisible radius. | 40 |
| `StickBodyFlickTime` | Float | — | N | Body flick time. |  |
| `DamageCountForDown` | Int | — | N | Hits to knock down. |  |
| `DamageCountForDown_Zukan` | Int | BP | N | Hits to knock down in the Piklopedia. | 10 |
| `DownTime` | Float | — | N | Down time. |  |
| `DownFlickArg` | FlickArg | BP | N | Down flick. |  |
| `DisableCageTime` | Float | — | N | Cage disabled time. |  |
| `LegFlickArg` | FlickArg | BP | N | Leg flick. |  |
| `LegFlickCoolTime` | Float | BP | N | Leg flick cooldown. | 10 |
| `MouthCloseAttackCount` | Int | — | N | Attacks before closing mouth. |  |
| `MouthCloseToSwallowTime` | Float | BP | N | Time before swallowing. | 10 |
| `EscapeArea` | CakeSSphereSearchArea | BP | N | Escape area. |  |
| `EscapeDist` | Float | — | N | Escape distance. |  |
| `EscapeSpd` | Float | — | N | Escape speed. |  |
| `EscapeAngVelTime` | Float | — | N | Escape turn. |  |
| `LookAroundTimeMin` | Float | — | N | Look-around time. |  |
| `FlickAttackFlickArg` | FlickArg | BP | N | Flick attack. |  |
| `OnDieDmyCollisionBound` | CylinderBound2 | BP | N | Dummy collision on death. |  |
| `DmyPushVelocity` | Float | — | N | Dummy push speed. |  |
| `WanderStartFixedAng` | Float | — | N | Wander start angle. |  |
| `WanderLoopFixedAng` | Float | — | N | Wander loop angle. |  |

## ThrowEaterLookAtParameter

Look-at

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookAtHeadParam` | ThrowEaterLookAtPartsParam | BP | N | Head. |  |
| `LookAtEyeParam` | ThrowEaterLookAtPartsParam | BP | N | Eyes. |  |
| `LerpRatio` | Float | — | N | Blend. |  |

## ThrowEaterLookAtPartsParam

Part look-at

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookAtOfsZ` | Float | — | N | Height offset. |  |
| `StartIntpTime` | Float | BP | N | Blend-in time. | 0.10000000149011612 |
| `StopIntpTime` | Float | BP | N | Blend-out time. | 0.30000001192092896, 0.05000000074505806 |
| `LookAtStartCurve` | EEaseCurveInterpolation | — | N | Blend-in curve. |  |
| `LookAtStopCurve` | EEaseCurveInterpolation | — | N | Blend-out curve. |  |

## ThrowEaterMouthCtrlParameter

Mouth

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NoticeOpenMouthTime` | Float | BP | N | Open time on notice. | 0.800000011920929 |
| `OpenMouthTime` | Float | BP | N | Open time. | 1 |
| `CloseMouthTime` | Float | BP | N | Close time. | 1 |
| `OpenMouthAngle` | Float | — | N | Open angle. |  |
| `MouthCtrlCurve` | EEaseCurveInterpolation | BP | N | Curve. | "EEaseCurveInterpolation::Linear" |
| `MouthShakeBlendOn` | BlendParam | BP | N | Shake blend in. |  |
| `MouthShakeBlendOff` | BlendParam | BP | N | Shake blend out. |  |

## ThrowEaterThrowParam

Throw variants

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BothHandsRight` | ThrowEaterThrowParameter | BP | N | Two-handed right throw. |  |
| `BothHandsLeft` | ThrowEaterThrowParameter | BP | N | Two-handed left throw. |  |
| `OneHandRight` | ThrowEaterThrowParameter | BP | N | One-handed right throw. |  |
| `OneHandLeft` | ThrowEaterThrowParameter | BP | N | One-handed left throw. |  |

## ThrowEaterThrowParameter

Throw

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ThrowSpeedXY` | Float | BP | N | Horizontal speed. | 230, 150, 200 |
| `ThrowSpeedZ` | Float | — | N | Vertical speed. |  |

## TobiKaburiAIParameter

Flying shell enemy

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `InvasionSpeed` | Float | — | N | Night invasion speed. |  |
| `SearchAreaInFlying` | CakeSSphereSearchArea | BP | N | Search while flying. |  |
| `EatAreaInFlying` | CakeSearchArea | BP | N | Eat area flying. |  |
| `ChaseOffsetInFlying` | Vector | — | N | Chase offset. |  |
| `StickedSecLimit` | Float | — | N | Latched time before falling. |  |
| `StickedNumLimit` | Int | — | N | Latched count before falling. |  |
| `FlyDieLinearDamping` | Float | — | N | Death damping. |  |
| `GroundFlickArg` | FlickArg | BP | N | Ground flick. |  |

## TobinkoAIParameter

Tobinko = flying larva/grub (flies, bites, burrows). Per-instance: bNoBurrowType

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `InvasionSpeed` | Float | — | N | Night invasion speed. |  |
| `ParamInvoke` | CakeSearchArea | BP | N | Trigger area. |  |
| `ParamChase` | CakeSearchArea | BP | N | Chase area. |  |
| `SecReady` | Float | BP | N | Ready time. | 0.15000000596046448 |
| `SecStruggle` | Float | BP | N | Struggle time. | 1 |
| `FlyTerritoryNestRatio` | Float | — | N | Flight nest ratio. |  |
| `FallLifeRatio` | Float | — | N | Life ratio that grounds it. |  |
| `LifeRatioRunAway` | Float | BP | N | Life ratio to flee. | 0 |
| `SecReappearEnable` | Float | BP | N | Reappear delay. | 0 |
| `FatalImpactVelSclD` | Float | — | N | Fatal impact scale. |  |
| `BlastPowBombDead` | Float | — | N | Bomb death blast. |  |
| `MinBlastPowBombDead` | Float | — | N | Min blast. |  |
| `BlastFrictionRatio` | Float | — | N | Blast friction. |  |
| `FlyOfsZ` | Float | — | N | Flight height. |  |
| `FlyArriveDistance` | Float | BP | N | Flight arrival. | 10 |
| `FlyWaitSec` | Float | — | N | Flight wait. |  |
| `BiteArriveDistance` | Float | BP | N | Bite arrival. | 0 |
| `BiteMaxSpeedRatio` | Float | — | N | Bite speed. |  |
| `BiteVerticalSpeedRatio` | Float | BP | N | Bite vertical speed. | 0.10000000149011612 |
| `EatAreaGnd` | CakeSearchArea | BP | N | Ground eat area. |  |
| `DirectHitDamageRate` | Float | — | N | Direct hit damage. |  |
| `WanderArriveDistance` | Float | BP | N | Wander arrival. | 25 |
| `TakeOffLimitTime` | Float | — | N | Take-off time. |  |
| `bNoBurrowType` | Bool | SL | S | Never burrows. | true |
| `WarpTerritoryDistRatio` | Float | — | N | Warp distance ratio. |  |
| `WarpPredictAdjustFrame` | Int | BP | N | Warp prediction frames. | 60 |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |

## TobiuoAIParameter

Tobiuo = flying fish (schools, leaps). Mostly not exposed; JumpVel per-instance.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ProwlTimeMin` | Float | — | N | Prowl time range. |  |
| `ProwlTimeMax` | Float | — | N | Prowl time range. |  |
| `RestTimeMin` | Float | — | N | Rest time range. |  |
| `RestTimeMax` | Float | — | N | Rest time range. |  |
| `DeadVel` | Float | BP | N | Death velocity. | 600 |
| `DeadFric` | Float | — | N | Death friction. |  |
| `DeadFallFric` | Float | BP | N | Death fall friction. | 0.5 |
| `MaxAngDown` | Float | — | N | Max dive angle. |  |
| `MaxAngUp` | Float | — | N | Max climb angle. |  |
| `MaxAngDownHeight` | Float | — | N | Dive angle height. |  |
| `MaxAngUpDepth` | Float | — | N | Climb angle depth. |  |
| `MinDepth` | Float | BP | N | Min depth. | 8 |
| `DiveDepth` | Float | — | N | Dive depth. |  |
| `JumpDepth` | Float | — | N | Jump depth. |  |
| `MinJumpSin` | Float | — | N | Min jump angle. |  |
| `ChaseRatio` | Float | — | N | Chase ratio. |  |
| `LeapVel` | Float | BP | N | Leap speed. | 50 |
| `LockOnTime` | Float | — | N | Lock-on time. |  |
| `TurnSec` | Float | — | N | Turn time. |  |
| `AttackRadius` | Float | — | N | Attack radius. |  |
| `AttackHeight` | Float | — | N | Attack height. |  |
| `AttackAngle` | Float | — | N | Attack angle. |  |
| `AfterAttackSec` | Float | — | N | Post-attack time. |  |
| `JumpHeight` | Float | — | N | Jump height. |  |
| `JumpVel` | Float | SL | S | Jump speed. | 200 |
| `CheckFrontDist` | Float | — | N | Front check distance. |  |
| `AttackedDelaySec` | Float | — | N | Delay after being attacked. |  |
| `ProwlDepth` | Float | — | N | Prowl depth. |  |
| `ProwlSlack` | Float | — | N | Prowl slack. |  |
| `StableFactor` | Float | — | N | Schooling (boids) weights. |  |
| `RandomFactor` | Float | — | N | Schooling (boids) weights. |  |
| `TerritoryFactor` | Float | — | N | Schooling (boids) weights. |  |
| `DepthFactor` | Float | — | N | Schooling (boids) weights. |  |
| `RepulsionFactor` | Float | — | N | Schooling (boids) weights. |  |
| `CohesionFactor` | Float | — | N | Schooling (boids) weights. |  |
| `CoopFactor` | Float | — | N | Schooling (boids) weights. |  |
| `VitalityInc` | Float | — | N | Vitality gain. |  |
| `VitalityDec` | Float | — | N | Vitality loss. |  |
| `UpdateInterval` | Float | — | N | Update interval. |  |
| `SearchForProwlAngle` | Float | BP | N | Prowl search angle. | 240 |
| `SearchForProwlAngleXY` | Float | BP | N | Prowl search XY. | 180 |
| `SearchForProwlAngleZ` | Float | BP | N | Prowl search Z. | 150 |
| `TurnFactorVelY` | Float | — | N | Turn factor Y. |  |
| `TurnFactorVelX` | Float | — | N | Turn factor X. |  |
| `AngRatioZ` | Float | — | N | Z angle ratio. |  |
| `AngZInterpRatio` | Float | — | N | Z angle blend. |  |
| `WaterFricY` | Float | — | N | Water friction Y. |  |
| `WaterFricXZ` | Float | — | N | Water friction XZ. |  |
| `Gravity` | Float | BP | N | Gravity. | 350 |
| `DeadGravity` | Float | — | N | Death gravity. |  |
| `ParamSwim` | TobiuoGoParameter | BP | N | Swim. |  |
| `SwimFastSpeedRate` | Float | — | N | Fast swim rate. |  |
| `ParamRestSwim` | TobiuoGoParameter | BP | N | Rest swim. |  |
| `ParamTurnZ` | TobiuoTurnParameter | BP | N | Turning profiles. |  |
| `ParamRestTurnZ` | TobiuoTurnParameter | BP | N | Turning profiles. |  |
| `ParamLeapTurnZ` | TobiuoTurnParameter | BP | N | Turning profiles. |  |
| `ParamTurnX` | TobiuoTurnParameter | BP | N | Turning profiles. |  |
| `ParamRestTurnX` | TobiuoTurnParameter | BP | N | Turning profiles. |  |
| `ParamFallTurnX` | TobiuoTurnParameter | BP | N | Turning profiles. |  |

## TobiuoGoParameter

Swim

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Speed` | Float | BP | N | Speed. | 100, 60 |
| `AccelRatio` | Float | BP | N | Acceleration. | 0.15000000596046448, 0.05000000074505806 |

## TobiuoTurnParameter

Turn

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MinDeg` | Float | — | N | Min angle. |  |
| `MaxDeg` | Float | BP | N | Max angle. | 12, 8, 4 |
| `ARatio` | Float | BP | N | Acceleration ratio. | 0.30000001192092896, 0.019999999552965164, 0.05000000074505806 |
| `Ratio` | Float | BP | N | Ratio. | 0.30000001192092896, 0.10000000149011612, 0.05000000074505806 |
| `CenterDeg` | Float | BP | N | Centre angle. | 12, 4, 8 |

## TrampolineAIParameter

Bounce mushroom/trampoline. Per-instance: BounceHeight, bAdjustLocation, AdjustAngle, bHiddenTsubo

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BounceHeight` | Float | — | S | Bounce height. |  |
| `bAdjustLocation` | Bool | SL | S | Adjust landing location. | false |
| `AdjustAngle` | Float | BP+SL | S | Adjust angle. | 360 |
| `bHiddenTsubo` | Bool | SL | S | Hide the pot/base mesh. | true |

## TrapBaseAIParameter

Traps base. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SearchRadius` | Float | — | N | Trigger radius. |  |
| `EffectiveRadius` | Float | BP | N | Effect radius. | 100 |
| `StartTime` | Float | BP | N | Start time. | 0 |
| `EndTime` | Float | BP | N | End time. | 0.20000000298023224, 0.30000001192092896 |
| `FlickSpeedXY` | Float | — | N | Flick XY. |  |
| `FlickSpeedZ` | Float | — | N | Flick Z. |  |
| `bIsTargetTeki` | Bool | — | N | Also targets enemies. |  |

## TrapBikkuriAIParameter

Explosive trap

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BaseParam` | TrapBaseAIParameter | BP | N | Base. |  |
| `IgnitionEffect` | ParticleSystem | — | N | Ignition effect. |  |
| `ExplosionEffect` | ParticleSystem | BP | N | Explosion effect. |  |

## TrapRockBallAIParameter

Falling rock trap

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BaseParam` | TrapBaseAIParameter | BP | N | Base. |  |
| `IgnitionEffect` | ParticleSystem | — | N | Ignition effect. |  |
| `Damage` | Float | BP | N | Damage. | 15 |
| `BirthNum` | Int | — | N | Rocks. |  |
| `BirthInterval` | Float | BP | N | Interval. | 0.675000011920929 |
| `BirthHeight` | Float | BP | N | Height. | 450 |
| `BirthRangeMin` | Float | BP | N | Min range. | 30 |
| `BirthRangeMax` | Float | BP | N | Max range. | 150 |

## TriggerDoorAIParameter

Switch-operated doors/gates. Per-instance: SwitchID, CompleteUIType, OpenWaitTime, bEnableAirWall, bNoCollisionAirWall, CIDList

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `TriggerDoorType` | ETriggerDoorType | BP | S | ETriggerDoorType (Switch, SwitchOnce...). | "ETriggerDoorType::Switch", "ETriggerDoorType::SwitchOnce" |
| `TriggerDoorSwitchColor` | ETriggerDoorSwitchColor | BP | N | Switch colour. | "ETriggerDoorSwitchColor::Blue", "ETriggerDoorSwitchColor::White", "ETriggerDoor |
| `SwitchEventTypeForOpen` | EControlSwitchEvent | BP | N | Switch channel that opens. | "EControlSwitchEvent::GeneralChB", "EControlSwitchEvent::General" |
| `SwitchEventTypeForClose` | EControlSwitchEvent | BP | N | Switch channel that closes. | "EControlSwitchEvent::GeneralChA", "EControlSwitchEvent::General" |
| `CIDList` | Name | SL | S | CIDs of objects linked to the door (Dandori's CIDList). |  |
| `SwitchID` | Name | SL | S | Switch ID. | "FenceFall01", "switch05", "switch04" |
| `bIsAlreadyOpen` | Bool | BP | N | Starts open. | true |
| `CountDownDelay` | Float | BP | N | Countdown delay. | 1.5 |
| `CompleteUIType` | ECmnRankUpEffectType | SL | S | Completion UI type. | "ECmnRankUpEffectType::CompletedDestructionGate_plural", "ECmnRankUpEffectType:: |
| `FixedOpenWaitTimeMin` | Float | BP | N | Min open wait. | 2, 0 |
| `OpenWaitTime` | Float | SL | S | Open wait. | 9.8, 5, 4 |
| `ChangeHeightCurve` | CurveFloat | BP | N | Height curve. |  |
| `HeightDifference` | Float | — | N | Height difference. |  |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `RequestRumbleNameOpened` | Name | — | N | Rumble when opened. |  |
| `OpenedCameraShakeType` | ECameraShakeType | BP | N | Shake type. | "ECameraShakeType::Micro" |
| `ShakeCameraParameter` | ShakeCameraParameter | BP | N | Shake. |  |
| `bEnableAirWall` | Bool | — | S | Air wall enabled. |  |
| `bNoCollisionAirWall` | Bool | SL | S | Air wall without collision. | true |

## TwinSwitchAIParameter

Twin switch

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bIsButtonAOnInit` | Bool | — | N | Button A pressed at start. |  |
| `FlickArg` | FlickArg | BP | N | Flick. |  |

## UjinkoBaseAIParameter

Ujinko = grub/larva enemies (burrow). Per-instance: bNoBurrowType

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRatioRunAway` | Float | — | N | Life ratio to flee. |  |
| `SecRandTurn` | Float | — | N | Random turn interval. |  |
| `SecReappearEnable` | Float | BP | N | Reappear delay. | 1.5 |
| `BlastPowBombDead` | Float | — | N | Bomb death blast. |  |
| `MinBlastPowBombDead` | Float | — | N | Min blast. |  |
| `BlastFrictionRatio` | Float | — | N | Blast friction. |  |
| `SecPlptCmpst` | Float | — | N | Pellet posy compensation time. |  |
| `bNoBurrowType` | Bool | SL | S | Never burrows. | true |
| `WarpTerritoryDistRatio` | Float | — | N | Warp distance ratio. |  |
| `WarpPredictAdjustFrame` | Int | BP | N | Warp prediction frames. | 60 |
| `ZukanForceAppearTime` | Float | — | N | Piklopedia appear time. |  |

## ValveAIParameter

Valves (build then turn to operate sprinklers). Per-instance: ValveID, BuiltWorkType, DemoID (Dandori's workType/demoID)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ValveID` | Name | SL | S | Valve ID linking sprinklers. | "valve4", "valve5", "valve3" |
| `WorkType` | EValveWorkType | SL | S | EValveWorkType. | "EValveWorkType::Build" |
| `BuiltWorkType` | EValveWorkType | — | S | Work type after being built. |  |
| `TurnTime` | Float | — | N | Turn time. |  |
| `MaxAngularVel` | Float | — | N | Max spin. |  |
| `StartAngularAccel` | Float | — | N | Spin-up. |  |
| `EndAngularAccel` | Float | — | N | Spin-down. |  |
| `DemoID` | Int | SL | S | Cutscene ID played when opened. | 4, 1, 2 |

## ValveGimmickBaseAIComponent

Valve-driven gimmicks

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ValveID` | Name | SL | S | ID of the valve controlling this gimmick. | "valve3", "valve4", "valve5" |

## WarpCarryAIParameter

Tunnels (warp carry holes). Per-instance: WarpCarryID

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WarpCarryID` | Name | SL | S | Pairs tunnel ends. | "TunnelID_1", "TunnelID_02", "WarpCarryID_3" |
| `WarpCarryType` | EWarpCarryType | BP | N | EWarpCarryType. | "EWarpCarryType::TateWarp" |
| `EntryPointOffset` | Vector | BP | N | Entry offset. |  |
| `DigStep1Life` | Float | BP | N | HP of first dig stage. | 9500, 4750 |
| `DigStep2Life` | Float | BP | N | HP of second dig stage. | 8000, 4000 |
| `DigStartRate` | Float | — | N | Dig start rate. |  |
| `bCanWarpOtakara` | Bool | — | N | Treasure can go through. |  |
| `bCanWarpHappy` | Bool | — | N | Oatchi can go through. |  |
| `MoveMotionSpeed` | Float | — | N | Move animation speed. |  |
| `JumpInHeightOffset` | Float | BP | N | Jump-in height. | 30 |
| `JumpInEndOffset` | Float | — | N | Jump-in end offset. |  |
| `JumpInDefaultLength` | Float | — | N | Jump-in length. |  |
| `JumpInSpeed` | Float | — | N | Jump-in speed. |  |
| `EntryTime` | Float | BP | N | Entry time. | 0.6000000238418579 |
| `LeaveTime` | Float | BP | N | Leave time. | 0.6000000238418579 |
| `ScalingJumpInSpeed` | Float | — | N | Scaling jump speed. |  |
| `ScaleDownTime` | Float | BP | N | Scale-down time. | 0.6000000238418579 |
| `ScalingEntryTime` | Float | BP | N | Scaling entry time. | 0.6000000238418579 |
| `MoveStartScaleDownTime` | Float | BP | N | Move start scale time. | 0 |
| `EffectStartScaleDownTime` | Float | BP | N | Effect start scale time. | 0.550000011920929 |
| `ScaleUpTime` | Float | BP | N | Scale-up time. | 0.6000000238418579 |
| `ScalingLeaveTime` | Float | BP | N | Scaling leave time. | 0.6000000238418579 |
| `ScaleUpStartMoveTime` | Float | BP | N | Scale-up move start. | 0.029999999329447746, 0.20000000298023224 |
| `EffectStartLeaveTime` | Float | BP | N | Effect start leave. | 0.10000000149011612 |
| `MinScale` | Float | BP | N | Min scale. | 0.5 |
| `MinScaleForActorCarry` | Float | — | N | Min scale carrying. |  |
| `BeforeWarpDelayTime` | Float | BP | N | Delay before. | 2 |
| `AfterWarpDelayTime` | Float | BP | N | Delay after. | 0.8999999761581421 |
| `TemporaryNoAdmissionTime` | Float | — | N | No-entry time. |  |
| `GoalLocRange` | Float | — | N | Goal range. |  |
| `PikminFlyHeightOffset` | Float | — | N | Pikmin fly height. |  |
| `DXYCorrectRatio` | Float | — | N | XY correction. |  |
| `PushObstacleVel` | Float | — | N | Obstacle push speed. |  |
| `JumpOutSpeedXY` | Float | BP | N | Exit speed XY. | 100 |
| `JumpOutSpeedZ` | Float | BP | N | Exit speed Z. | 250 |
| `JumpOutHappyRatio` | Float | — | N | Oatchi exit ratio. |  |
| `BreakWallEffect` | ParticleSystem | BP | N | Wall break effect. |  |
| `DigEffect` | ParticleSystem | BP | N | Dig effect. |  |
| `DigEftReq` | EftRequest | — | N | Dig effect request. |  |
| `BreakEffect` | ParticleSystem | BP | N | Break effect. |  |
| `BreakEftReq` | EftRequest | — | N | Break effect request. |  |
| `BreakBigEffect` | ParticleSystem | BP | N | Big break effect. |  |
| `BreakBigEftReq` | EftRequest | — | N | Big break effect request. |  |
| `CarriedActorEntryEffect` | ParticleSystem | BP | N | Carried entry effect. |  |
| `DigEffectDelay` | Float | — | N | Dig effect delay. |  |
| `DigEffectIntervalMax` | Float | — | N | Max dig effect interval. |  |
| `DigEffectIntervalMin` | Float | — | N | Min dig effect interval. |  |
| `DigPowerWhenEffectIntervalMax` | Float | — | N | Dig power at max interval. |  |
| `DigPowerWhenEffectIntervalMin` | Float | — | N | Dig power at min interval. |  |
| `AttackRumbleName` | Name | — | N | Attack rumble. |  |
| `DigRumbleName` | Name | — | N | Dig rumble. |  |
| `CompleteRumbleName` | Name | BP | N | Complete rumble. | "Obj_Common_Land_M" |
| `PlayerEntryAndLeaveRumbleName` | Name | BP | N | Player entry rumble. | "Obj_WarpCarry" |
| `PlayerLandRumbleName` | Name | — | N | Player land rumble. |  |
| `PlayerEntryRumbleTime` | Float | — | N | Entry rumble time. |  |
| `PlayerLeaveRumbleTime` | Float | BP | N | Leave rumble time. | 0.20000000298023224 |
| `DigPowerSumCorrectFactor` | Float | — | N | Dig power correction. |  |
| `DamageMag` | Float | — | N | Damage multiplier. |  |

## WasurenagusaAIParameter

Lumiknoll (Wasurenagusa, night base; births Glow Pikmin). Per-instance: PhotonPikminName, MaxBirthExtractNum, WasurenagusaID

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PhotonPikminName` | Name | — | S | Glow Pikmin name/type. |  |
| `BirthLocationZ` | Float | — | N | Birth height. |  |
| `BirthLocationRandZ` | Float | — | N | Random height. |  |
| `JumpBirthRange` | Float | — | N | Birth range. |  |
| `MaxBirthExtractNum` | Int | SL | S | Max Glow Pikmin it can produce. | 400, 350 |
| `EmissiveSecondLife` | Float | — | N | Emissive second life. |  |
| `EmissiveStepParam` | Vector2D | — | N | Emissive steps. |  |
| `HikariRollDist` | Float | — | N | Glow roll distance. |  |
| `AttackedFlagResetTime` | Float | — | N | Attacked flag reset time. |  |
| `WasurenagusaID` | Int | SL | S | Lumiknoll ID. | 1 |
| `SilhouetteColor00` | LinearColor | — | N | Silhouette colour 1. |  |
| `SilhouetteColor01` | LinearColor | — | N | Silhouette colour 2. |  |
| `NightEffect` | ParticleSystem | — | N | Night effect. |  |
| `NightEffectOffset` | Vector | — | N | Night effect offset. |  |
| `NightEffectColor00` | LinearColor | — | N | Night colour 1. |  |
| `NightEffectColor01` | LinearColor | — | N | Night colour 2. |  |
| `FlickeringAlphaSpeed` | Float | — | N | Flicker speed. |  |
| `FlickeringAlphaMin` | Float | — | N | Flicker min alpha. |  |
| `DeadEffect` | ParticleSystem | — | N | Death effect. |  |

## WaterBoxAIParameter

Water volumes (raise/lower, freeze)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaterLevel` | WaterLevel | BP+SL | S | Water level control (per-instance). |  |

## WaterBoxNavAIComponent

Water box navigation link

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bUseHappyOnly` | Bool | SL | S | Link only usable by Oatchi. | true |
| `RightOffset` | Vector | SL | S | Offset of the right nav-link point. |  |

## WaterLevel

Water level control. Per-instance (order): WaterBoxSwitchID, WaterLevelChangeDist, WaterLevelChangeTime, WaterLevelChangeInterval, bInitWaterLevelDown, GeneratorIndex, bUseSunMeter, WaterLevelChangeStartTime, bPlayDemo

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaterBoxSwitchID` | Name | SL | S | Switch that drains/raises the water. | "WaterBox_Off_1", "WaterBox_Off_2", "switch02" |
| `WaterLevelChangeDist` | Float | BP+SL | S | Height the water changes. | 100, 40, 50 |
| `WaterLevelChangeTime` | Float | SL | S | Time to change level. | 6, 8 |
| `WaterLevelChangeInterval` | Float | — | S | Interval between changes (Dandori's first "unknown constant"). |  |
| `bInitWaterLevelDown` | Bool | — | S | Starts lowered (Dandori's second "unknown constant"). |  |
| `GeneratorIndex` | Int | SL | S | Generator index tied to the water level. | 0 |
| `AfterMaxIcePikmins` | Int | SL | S | Ice Pikmin needed to freeze it after the change (dynamic). | 30, 20, 80 |
| `bUseSunMeter` | Bool | SL | S | Level follows the time of day. | true |
| `WaterLevelChangeStartTime` | Float | — | S | Time the change starts (Dandori's "idkFloat"). |  |
| `bPlayDemo` | Bool | SL | S | Play the cutscene when it changes. | true |
| `WaterLevelChangeDay` | Int | — | N | Day on which it changes. |  |
| `NightStartType` | UInt32 | BP | N | Night start behaviour. | 7 |

## WayChecker

Path checking (can the enemy reach the target)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bCheckRay` | Bool | BP | N | Use a ray test. | true |
| `bCheckGate` | Bool | BP | N | Treat gates as blocking. | true |
| `RayStartHeight` | Float | BP | N | Ray start height. | -40 |
| `SearchRadius` | Float | — | N | Radius of the check. |  |
| `RayEndHeight` | Float | — | N | Ray end height. |  |
| `RayCheckIntervalMax` | Float | — | N | Max interval between ray checks. |  |

## YamashinjuAIParameter

Pearly Clamclamp (Yamashinju). Per-instance: SpawnPearlInfo, DropPearlScale, bNoTargetDownShell

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpawnPearlInfo` | DropSpawnMiniInfo | BP+SL | S | What the clam holds (pearl/treasure) – already implemented in Dandori Desktop. |  |
| `DropSpeedForward` | Float | BP | N | Pearl drop forward speed. | 150 |
| `DropSpeedUp` | Float | BP | N | Pearl drop upward speed. | 380 |
| `DropPearlScale` | Float | SL | S | Pearl scale. | 0.45, 0.5 |
| `bStickingHeightLimit` | Bool | — | N | Limit latch height. |  |
| `StickingHeightLimitLength` | Float | — | N | Latch height limit. |  |
| `FlickInCapsuleArg` | FlickArg | — | N | Flick inside the shell. |  |
| `HappyFlickSpeedXY` | Float | BP | N | Oatchi flick XY. | 150 |
| `HappyFlickSpeedZ` | Float | BP | N | Oatchi flick Z. | 100 |
| `DogFoodFlickArg` | YamashinjuFlickMiniArg | BP | N | Dog food flick. |  |
| `DieMaterialParamAnimName` | Name | BP | N | Death material animation. | "Die" |
| `BombResistArea` | RBaumkuchenBound2 | BP | N | Area where bombs have no effect. |  |
| `bNoTargetDownShell` | Bool | — | S | Shell doesn't close on a target. |  |

## YamashinjuFlickMiniArg

Small flick

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DirType` | FFlickDirType | — | N | Direction. |  |
| `SpeedXY` | Float | BP | N | Speed XY. | 250 |
| `SpeedZ` | Float | BP | N | Speed Z. | 40 |

## YukimushiAIParameter

Yukimushi = snow bug (rolls snowballs, freezes Pikmin)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `OnEventFaceMessageFreezePikminNum` | Int | — | N | Frozen Pikmin before a hint. |  |
| `OnEventFaceMessageInterval` | Float | BP | N | Hint interval. | 15 |
| `TanebiStationFaceMessageInterval` | Float | BP | N | Ember hint interval. | 30 |
| `InvalidFreezeTime` | Float | — | N | Freeze cooldown. |  |
| `ChangeCameraFallHeight` | Float | BP | N | Camera change fall height. | 160 |
| `IgnoreStopConditionBlendTime` | Float | — | N | Blend time. |  |
| `FlickEffectBoneName` | Name | — | N | Flick effect bone. |  |
| `SnowAttackDistMin` | Float | BP | N | Min snow attack distance. | 50 |
| `SnowAttackDistMax` | Float | BP | N | Max snow attack distance. | 400 |
| `SnowAttackAngle` | Float | BP | N | Snow attack angle. | 40 |
| `SnowAttackHalfHeight` | Float | BP | N | Snow attack height. | 75 |
| `SnowAttackOffset` | Vector | BP | N | Snow attack offset. |  |
| `SnowAttackAddRot` | Rotator | BP | N | Snow attack rotation. |  |
| `UseSnowAttackTurnLifeRate` | Float | — | N | Life ratio for turning snow attack. |  |
| `SnowAttackTurnAngle` | Float | — | N | Snow attack turn angle. |  |
| `FlickStartStickTime` | Float | BP | N | Latched time before flick. | 3 |
| `CreateSnowStartNoSnowTime` | Float | BP | N | Time without snow before making more. | 8 |
| `CreateSecondSnowLifeRate` | Float | — | N | Life ratio for a second snowball. |  |
| `BiteRatio` | Float | BP | N | Bite chance. | 0.4000000059604645 |
| `MaxBiteContinueNum` | Int | BP | N | Max bites in a row. | 2 |
| `MaxSnowAttackContinueNum` | Int | — | N | Max snow attacks in a row. |  |
| `EatAreaParam` | CylinderSearchArea | BP | N | Eat area. |  |
| `SnowAttackAreaParam` | CylinderSearchArea | BP | N | Snow attack area. |  |
| `SnowLife` | Float | BP | N | Snowball HP. | 350 |
| `FallStartHeight` | Float | BP | N | Fall start height. | 500 |
| `bFallNoBrake` | Bool | BP | N | Falls without braking. | true |
| `FallGoalHeightOffset` | Float | BP | N | Fall goal offset. | -275 |
| `FallScaleRatioPerMinute` | Float | — | N | Fall scale. |  |
| `ChaseLimitTimeMin` | Float | BP | N | Min chase time. | 10 |
| `ChaseLimitTimeMax` | Float | BP | N | Max chase time. | 11 |
| `TanebiInsideParmeter` | TanebiInsideParameter | BP | N | Ember inside behaviour. |  |
| `HeightCurve` | CurveFloat | BP | N | Height curve. |  |
| `NoSnowHeightRate` | Float | — | N | Height without snow. |  |
| `NoSnowSpeedRate` | Float | BP | N | Speed without snow. | 1.2000000476837158 |
| `ChaseSpeed` | Float | BP | N | Chase speed. | 120 |
| `TurnAccelCurve` | CurveFloat | BP | N | Turn acceleration curve. |  |
| `BlowPower` | Float | BP | N | Blow power. | 0.5 |
| `BlowPowerRand` | Float | BP | N | Random blow power. | 1 |
| `BlowPowerZ` | Float | BP | N | Vertical blow. | 3.5 |
| `BlowPowerZRand` | Float | — | N | Random vertical blow. |  |
| `BlowPowerAvatorCorVal` | Float | — | N | Captain blow correction. |  |
| `RideActorDamageRadius` | Float | BP | N | Rider damage radius. | 20 |

## ZiplineAIParameter

Ziplines. Per-instance: GoalOffset, StartTargetSpeed, MaxMoveSpeed, MinMoveSpeed, Acceleration, Deceleration (+ spline)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StartSpeed` | Float | — | S | Starting speed. |  |
| `StartTargetSpeed` | Float | SL | S | Target start speed. | 150 |
| `MaxMoveSpeed` | Float | BP+SL | S | Max speed. | 200 |
| `MinMoveSpeed` | Float | BP+SL | S | Min speed. | 150, 100 |
| `Acceleration` | Float | BP+SL | S | Acceleration. | 600 |
| `Deceleration` | Float | BP | S | Deceleration (Dandori's "70.0 always here?"). | 70 |
| `JumpInSpeed` | Float | — | N | Jump-on speed. |  |
| `JumpInHeightOffset` | Float | BP | N | Jump-on height. | 60 |
| `JumpOutHeight` | Float | — | N | Jump-off height. |  |
| `GoalOffset` | Vector | SL | S | End point offset. |  |
| `MoveOffsetZ` | Float | — | N | Hanging height offset. |  |

## AIWanderRangeLimitParam

Wander range limiter

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableRangeLimit` | Bool | — | N | Restrict wander targets to a sector. |  |
| `RangeLimitAng` | Float | — | N | Sector angle. |  |
| `RangeLimitRadiusRate` | CarrotRangeF | — | N | Sector radius as a fraction of territory. |  |
| `MoveDistMin` | Float | — | N | Minimum move distance. |  |
| `RecalcMoveDistNum` | Int | — | N | Retries when a destination is too short. |  |

## AmeBozuTireAIParameter

AmeBozu detached tire

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PlayerDamage` | Float | — | N | Damage dealt to captains by the tire. |  |

## AreaBaseCampComponent

Base camps (landing sites / Onion bases). Per-instance order: BaseCampId, bDeactivateByExit, SafeAreaBound.Radius, SafeAreaOffset, SearchBound half-extents, ForceFloweringRadius, StateChangeDelayTime, GuruguruDist, CIDList (serializer 0x01A0D7F0)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AreaType` | EAreaBaseCampAreaType | — | N | EAreaBaseCampAreaType. |  |
| `BaseCampId` | Int | — | S | Base camp ID (portals' ToBaseCampId points here). |  |
| `CampState` | EAreaBaseCampState | — | N | Runtime camp state. |  |
| `bVisitedThisBaseCamp` | Bool | — | N | Runtime visited flag. |  |
| `bDeactivateByExit` | Bool | — | S | Base deactivates when you leave through it. |  |

## AreaBaseCampParameter

Base camp settings (per-instance)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CIDList` | Array | — | S | CIDs linked to this base (Dandori's CIDList). |  |
| `SearchBound` | BoxBound2 | — | S | Box half-extents (HalfX/Y/Z) of the base's search volume (Dandori's searchBoundX/Y/Z). |  |
| `SafeAreaBound` | SphereBound2 | — | S | Safe-area sphere radius (Dandori's safeRadius) – enemies don't enter / Pikmin are safe inside. |  |
| `SafeAreaOffset` | Vector | — | S | Offset of the safe area. |  |
| `SafeAreaScaleCurve` | CurveFloat | — | N | Safe area scaling curve. |  |
| `ForceFloweringRadius` | Float | — | S | Pikmin inside this radius are forced to flower (Dandori's "Unknown" float). |  |
| `bIsDummy` | Bool | — | N | Dummy base. |  |
| `StateChangeDelayTime` | Float | — | S | Delay before the base changes state. |  |
| `GuruguruDist` | Float | — | S | Radius of the "guruguru" (circling) idle of Pikmin around the base. |  |

## BankCardAIParameter

Bank card (dial hint card)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CardNum` | Byte | — | N | Card number/value shown. |  |
| `CardPattern` | ECardPattern | — | N | ECardPattern design. |  |
| `bCanFall` | Bool | — | N | Card can fall. |  |
| `PlaceHeight` | Float | — | N | Placement height. |  |
| `FallSpeedCurve` | CurveFloat | — | N | Fall speed curve. |  |
| `bCanTurnOver` | Bool | — | N | Card can flip over. |  |

## BikkuriGikuTopBaseAIParameter

Detached flower top

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StickBoneName` | Name | — | N | Bone Pikmin latch to. |  |

## BikkuriKinokoPoisonAreaAIParameter

Poison mushroom area

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AtkFailDamageAreaEffect` | ParticleSystem | — | N | Effect when the attack fails. |  |

## BillyChargeParameter

Billy charge attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GiveupTimerByCharging` | Float | — | N | Give up the charge after this long. |  |
| `GiveupTimerByApproachingEat` | Float | — | N | Give up approaching to eat after this long. |  |
| `FlickToCarrySphereRadius` | Float | — | N | Radius for flicking Pikmin carrying things. |  |
| `FlickToCarrySpherePosOffset` | Vector | — | N | Offset of that sphere. |  |

## BillyOroroParameter

Billy flustered state

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GiveupAnimLoopCnt` | Int | — | N | Loops before leaving the flustered state. |  |

## BillyRunAwayParameter

Billy run away

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxAngVelTime` | Float | — | N | Turn speed limit. |  |
| `GiveupTimer` | Float | — | N | Stop running away after this long. |  |

## BombAIParameter

Bomb rock item. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BaseParam` | BombBaseAIParameter | — | N | Common bomb settings (BombBaseAIParameter). |  |
| `bFollowTarget` | Bool | — | N | Bomb homes on a target. |  |
| `SearchDistance` | Float | — | N | Target search distance. |  |
| `FollowForce` | Float | — | N | Homing force. |  |
| `FollowEndDistance` | Float | — | N | Stop homing within this distance. |  |
| `AntennaInterpolatedVal` | Float | — | N | Antenna animation interpolation. |  |
| `bOnIgnition` | Bool | — | N | Starts ignited. |  |

## BossInu2AttackTime

Life-scaled times

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AttackTimeParams` | BossInu2AttackTimeParameter | — | N | Entries per life ratio. |  |

## BossInu2AttackTimeParameter

Time per life

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Applies below this life ratio. |  |
| `AttackTime` | Float | — | N | Time. |  |

## BossInu2CommonJumpTurnParam

Jump turn

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveParam` | BossInu2MoveParam | — | N | Movement profile. |  |
| `CheckTurnDist` | Float | — | N | Distance at which it jump-turns. |  |

## BossInu2CurseBallShotParameter

Shot origin

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BoneName` | Name | — | N | Bone. |  |
| `Offset` | Vector | — | N | Offset. |  |

## BossInu2DarkModeFaceMsgParam

Dark hints

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FirstHintMsgNum` | Int | — | N | First hint message index. |  |
| `HintMsgNum` | Int | — | N | Number of hint messages. |  |

## BossInu2GenseiModeBillyDischargeEffectParam

Effect set

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BodyEft` | ParticleSystem | — | N | Body effect. |  |
| `LinkEft` | ParticleSystem | — | N | Link (arc) effect. |  |
| `PartsEft` | ParticleSystem | — | N | Parts effect. |  |

## BossInu2GenseiModeBillyEffectParam

Discharge effects

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DischargeOmenEft` | BossInu2GenseiModeBillyDischargeEffectParam | — | N | Warning effect. |  |
| `DischargeEft` | BossInu2GenseiModeBillyDischargeEffectParam | — | N | Discharge effect. |  |

## BossInu2GenseiModeBillyThunderChaseFlickParam

Bone flick sphere

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FlickBoneName` | Name | — | N | Bone. |  |
| `FlickOfs` | Vector | — | N | Offset. |  |
| `FlickRadius` | Float | — | N | Radius. |  |

## BossInu2HandleFlickParameter

Tail-handle flick

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FlickRate` | Float | — | N | Chance to flick Pikmin on the handle. |  |
| `FlickNum` | CarrotRangeF | — | N | Range of Pikmin flicked. |  |
| `FlickArg` | FlickArg | — | N | Flick definition. |  |

## BossInu2RippleWaveAIParameter

Shockwave ring

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `RippleWaveEffect` | ParticleSystem | — | N | Effect. |  |
| `bEnableEffectScale` | Bool | — | N | Scale the effect. |  |
| `RippleWaveAttackType` | EAttackEventType | — | N | Damage type. |  |
| `RippleWaveDamage` | Float | — | N | Damage. |  |
| `RippleWaveEffectScale` | Vector | — | N | Effect scale. |  |
| `RippleWaveInitRadius` | Float | — | N | Start radius. |  |
| `RippleWaveExpandWaitTime` | Float | — | N | Wait before expanding. |  |
| `RippleWaveExpandSpeed` | Float | — | N | Expansion speed. |  |
| `RippleWaveWidth` | Float | — | N | Ring width. |  |
| `RippleWaveHalfHeight` | Float | — | N | Half height. |  |
| `DestroyTime` | Float | — | N | Lifetime. |  |
| `PoolType` | EGenericActorPoolType | — | N | Actor pool. |  |

## BossInu2ScatterElecPartsNumParam

Electric part counts

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Applies below this life ratio. |  |
| `ScatterElecPartsNum` | Int | — | N | Parts scattered. |  |
| `EasyModeScatterElecPartsNum` | Int | — | N | Parts on easy. |  |

## BossInu2ScatterElecPartsParam

Part scatter

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ScatterNumParam` | BossInu2ScatterElecPartsNumParam | — | N | Count per life ratio. |  |
| `FlickParam` | FlickArg | — | N | Flick. |  |

## BossInu2UIParam

UI

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ModeChangeLifeFadeOutTime` | Float | — | N | HP bar fade-out when the mode changes. |  |

## BossInuPoisonAreaAIParameter

Poison area

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Damage` | Float | — | N | Damage. |  |
| `KillLimit` | Int | — | N | Max Pikmin killed. |  |

## BubbleAIParameter

Floating bubbles (e.g. from Awadako/Kogani). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LiveTimeMin` | Float | — | N | Lifetime range when empty. |  |
| `LiveTimeMax` | Float | — | N | Lifetime range when empty. |  |
| `LiveTimeWithPikiMin` | Float | — | N | Lifetime range while holding a Pikmin. |  |
| `LiveTimeWithPikiMax` | Float | — | N | Lifetime range while holding a Pikmin. |  |
| `LiveTimeWithPurpleMin` | Float | — | N | Lifetime range while holding a Purple Pikmin. |  |
| `LiveTimeWithPurpleMax` | Float | — | N | Lifetime range while holding a Purple Pikmin. |  |
| `ScaleMin` | Float | — | N | Scale range. |  |
| `ScaleMax` | Float | — | N | Scale range. |  |
| `ResZ` | Float | — | N | Vertical resistance. |  |
| `ResZWithPiki` | Float | — | N | Vertical resistance with a Pikmin inside. |  |
| `ResXY` | Float | — | N | Horizontal resistance. |  |
| `LimitZ` | Float | — | N | Maximum rise height. |  |
| `MinAccRateZ` | Float | — | N | Vertical acceleration range. |  |
| `MaxAccRateZ` | Float | — | N | Vertical acceleration range. |  |
| `UpperSpeed` | Float | — | N | Rising speed. |  |
| `WaterAccRateZ` | Float | — | N | Vertical acceleration in water. |  |
| `BreakDotProduct` | Float | — | N | Collision angle that pops it. |  |
| `BreakDownVel` | Float | — | N | Downward speed that pops it. |  |
| `FueMoveVel` | Float | — | N | Speed when whistled. |  |
| `SearchRadius` | Float | — | N | Capture search radius. |  |
| `FloatingCurveWidth` | Float | — | N | Wobble width. |  |
| `FloatingCurveHeight` | Float | — | N | Wobble height. |  |
| `BreakEffect` | ParticleSystem | — | N | Pop effect. |  |
| `FrozenMaterial` | MaterialInstance | — | N | Material when frozen. |  |

## CarrotColorAnimationParameterValue

Name/value pair

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Name` | Name | — | N | Material parameter name. |  |
| `Value` | LinearColor | — | N | Value. |  |

## CarrotRange

Int range

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Min` | Int | — | N | Minimum. |  |
| `Max` | Int | — | N | Maximum. |  |

## ChappyAIParameter

Red Bulborb (Chappy). Per-instance: EatLimitNum

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableEatLimit` | Bool | — | N | Limit the Pikmin it can eat. |  |
| `EatLimitNum` | Int | — | S | Pikmin it can eat before stopping (per-instance). |  |
| `bDieOnlyDuringFreezing` | Bool | — | N | Only dies while frozen. |  |

## ChaserDownParameter

Knock-down

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DownTime` | Float | — | N | Down time. |  |
| `ZukanDownTime` | Float | — | N | Down time in the Piklopedia. |  |
| `RecoveryCaveExploreTime` | Float | — | N | Recovery time during cave exploration. |  |
| `DownTimeEasy` | Float | — | N | Down time on easy. |  |
| `ZukanDownTimeEasy` | Float | — | N | Piklopedia down time on easy. |  |
| `RecoveryCaveExploreTimeEasy` | Float | — | N | Cave recovery on easy. |  |

## ChaserLookAtParameter

Look-at

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookRatioSpeed` | Float | — | N | Look blend speed. |  |
| `LookAtEndSpeed` | Float | — | N | Blend-out speed. |  |
| `RotationRatioSpeed` | Float | — | N | Rotation blend speed. |  |

## ChaserPatrolParameter

Patrol

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PatrolTimeMin` | Float | — | N | Min patrol time. |  |
| `PatrolTimeMax` | Float | — | N | Max patrol time. |  |

## DecoAIParameter

Decor Pikmin (hub decoration Pikmin). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `VanishTime` | Float | — | N | Time before it vanishes. |  |
| `killEffect` | ParticleSystem | — | N | Effect when removed. |  |

## DecoSpawnerAIParameter

Decor Pikmin spawner (per-instance via static serializer, but not in the scrapes)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpawnPikminList` | Class | — | S | Pikmin classes to spawn. |  |
| `PikminColor` | EPikminColor | — | S | Pikmin colour. |  |
| `SpawnNum` | Int | — | S | Number spawned. |  |
| `PikminDecoType` | EPikminDecoType | — | S | Decor type. |  |
| `PikminDecoSize` | EPikminDecoSize | — | S | Decor size. |  |
| `PikminDecoLeaves` | EPikminLeaves | — | N | Leaf state. |  |
| `DecoIdlingPresetId` | Name | — | S | Idle animation preset. |  |
| `bEnableNearMessage` | Bool | — | S | Show a message when the player is near. |  |
| `NearWithinDistance` | Float | — | S | Distance for that message. |  |
| `PikminHorizontalWidth` | Float | — | N | Spread width. |  |
| `bIgnoreBottomRayHit` | Bool | — | S | Ignore the ground ray when placing. |  |
| `LockIntervalFrame` | Int | — | N | Frames between lock updates. |  |

## DemoTabletAIParameter

Cutscene tablet

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableApplyPlayerColor` | Bool | — | S | Tint with the player's colour. |  |

## DodoroChaseToAttackParameter

Return to attack

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ReturnToAttackDist` | Float | — | N | Distance. |  |
| `ReturnToAttackNonStickTime` | Float | — | N | Time without latched Pikmin. |  |

## DodoroEggBreakParam

Egg cracking

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CrackLifeRateParam` | DodoroEggCrackLifeRateParam | — | N | Crack stages. |  |
| `CrackEggEffect` | ParticleSystem | — | N | Crack effect. |  |
| `BreakEggEffect` | ParticleSystem | — | N | Break effect. |  |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `ShakeCameraParam` | ShakeCameraParameter | — | N | Camera shake. |  |
| `CameraShakeData` | Class | — | N | Camera shake class. |  |

## DogFoodAIParameter

Dog food (Oatchi lure). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HomingRatio` | Float | — | N | Homing ratio. |  |
| `PikminFindTime` | Float | — | N | Pikmin find time. |  |
| `StableFrame` | Int | — | N | Frames to settle. |  |
| `StableSpeed` | Float | — | N | Settle speed. |  |
| `StableAnglerSpeed` | Float | — | N | Settle angular speed. |  |
| `BreakEffect` | ParticleSystem | — | N | Break effect. |  |

## DrkMinionAIParameter

Dark minions (night/Dandori). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DrkMinionAIType` | EDrkMinionAIType | — | N | EDrkMinionAIType. |  |
| `Territory` | SphereSearchArea | — | N | Territory sphere. |  |
| `IsAlwaysGekikara` | Bool | — | N | Always spicy-sprayed. |  |
| `SearchTagName` | Name | — | N | Patrol tag. |  |
| `IsPatrol` | Bool | — | N | Patrols. |  |

## DronePinAIParameter

Drone map pin. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PinEffect` | ParticleSystem | — | N | Pin effect. |  |
| `PinEndEffect` | ParticleSystem | — | N | End effect. |  |
| `DisappearDistance` | Float | — | N | Disappear distance. |  |
| `AlphaSpeed` | Float | — | N | Fade speed. |  |

## DweevilEsaParam

Lure reactions

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DropActorHitNum` | Int | — | N | Hits before dropping its item. |  |
| `CounterHitNum` | Int | — | N | Hits before counter-attacking. |  |

## EditableBound

Bound wrapper

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EditBound` | EditBound2 | — | N | Editable bound object (EditBound2). |  |

## EftCustomRequestFloatParam

Float parameter

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ParamName` | Name | — | N | Parameter name. |  |
| `ParamValue` | Float | — | N | Value. |  |

## EsaBaseAIParameter

Throwable lure food base. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AvailableTime` | Float | — | N | Lifetime. |  |
| `ThrowNum` | Int | — | N | Throws. |  |
| `ThrowAngle` | Float | — | N | Throw angle. |  |
| `ThrowHeight` | Float | — | N | Throw height. |  |
| `AbsorbLifeTime` | Float | — | N | Absorb duration. |  |

## EventSimulatorAIParameter

Debug event simulator actor. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaitTime` | Float | — | N | Wait. |  |
| `BoundSetting` | EventSimulatorBoundParameter | — | N | Area. |  |
| `AttackEvent` | EventSimulatorAttackParameter | — | N | Simulated attack. |  |
| `VacuumEvent` | EventSimulatorVacuumParameter | — | N | Simulated vacuum. |  |
| `TateanaEvent` | EventSimulatorTateanaParameter | — | N | Simulated hole. |  |
| `PutRouletteEggEvent` | EventSimulatorPutRouletteEggParameter | — | N | Simulated egg. |  |
| `CharmEvent` | EventSimulatorCharmParameter | — | N | Simulated charm. |  |
| `CapsuleEvent` | EventSimulatorCapsuleParameter | — | N | Simulated capsule. |  |
| `ItemEvent` | EventSimulatorItemParameter | — | N | Simulated item. |  |
| `LaunchEvent` | EventSimulatorLaunchParameter | — | N | Simulated launch. |  |

## EventSimulatorAttackParameter

Attack event

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Damage` | Float | — | N | Damage. |  |
| `EventType` | EAttackEventType | — | N | Attack type. |  |
| `IteratorType` | EIteratorType | — | N | Target iterator. |  |
| `CellFilter` | ECellFilter | — | N | Cell filter. |  |
| `HitFilter` | HitFilter | — | N | Hit filter. |  |

## EventSimulatorBaseParameter

Base

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bAvailable` | Bool | — | N | Enabled. |  |

## EventSimulatorBoundParameter

Area

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Bound` | BoxBound2 | — | N | Box. |  |

## EventSimulatorCapsuleParameter

Capsule event

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CapsuleRadius` | Float | — | N | Radius. |  |

## EventSimulatorItemParameter

Item event

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Type` | EItemEventType | — | N | Item event type. |  |

## EventSimulatorLaunchParameter

Launch event

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Speed` | Vector | — | N | Launch velocity. |  |

## EventSimulatorPutRouletteEggParameter

Egg event

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ItemType` | EItemTypeIDEditor | — | N | Item type. |  |

## EventSimulatorTateanaParameter

Hole event

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Type` | EType | — | N | Hole type. |  |

## EventSimulatorVacuumParameter

Vacuum event

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Dir` | Vector | — | N | Direction. |  |
| `Power` | Float | — | N | Power. |  |
| `bChangeVacuumAI` | Bool | — | N | Switch targets to vacuum AI. |  |

## FallTrapBikkuriAIParameter

Falling trap

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FallEffect` | ParticleSystem | — | N | Fall effect. |  |

## FireFloorAIParameter

Burning floor

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FireEffect` | ParticleSystem | — | N | Fire effect. |  |
| `ExtinguishEffect` | ParticleSystem | — | N | Extinguish effect. |  |
| `PlayerDamage` | Int | — | N | Captain damage. |  |
| `HappyDamage` | Float | — | N | Oatchi damage. |  |
| `RidingAvatarDamage` | Float | — | N | Damage to a captain riding Oatchi. |  |

## GCFollowInvalidCondition

Follow blockers

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bInvalidInIdleRoll` | Bool | — | N | Idle roll blocks following. |  |
| `WorkingBehavior` | Name | — | N | Working behaviours that block following. |  |

## GCRideJumpInvalidCondition

Jump blockers

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bInJump` | Bool | — | N | Already jumping. |  |
| `bInNarrowSpace` | Bool | — | N | In a narrow space. |  |
| `bInFullStomach` | Bool | — | N | Full stomach. |  |
| `bRush` | Bool | — | N | Rushing. |  |

## GCRideParameter

Riding a creature (Oatchi/Moss). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDebug` | Bool | — | N | Debug. |  |
| `bKaisanInRideOff` | Bool | — | N | Dismiss Pikmin when dismounting. |  |
| `bRushGetOffWithPikmin` | Bool | — | N | Rushing dismounts with Pikmin. |  |
| `bGetOffByShortTrigger` | Bool | — | N | Short button press dismounts. |  |
| `InvalidFollowToControlTime` | Float | — | N | Delay before following resumes control. |  |
| `InvalidCondition` | GCFollowInvalidCondition | — | N | Follow invalid conditions. |  |
| `JumpInvalidCondition` | GCRideJumpInvalidCondition | — | N | Jump invalid conditions. |  |
| `bGetOffIfNoFollow` | Bool | — | N | Dismount if nothing follows. |  |
| `NoGetOffBehaviorName` | Name | — | N | Behaviours that block dismounting. |  |
| `WarpRideOffset` | Vector | — | N | Offset when warping while riding. |  |
| `bWaitFollowPikminRideBeforeWarpCarryIn` | Bool | — | N | Wait for riding Pikmin before warp-carry. |  |

## HanachirashiTakeOffParameter

Take-off

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpeedAccelRatio` | Float | — | N | Acceleration. |  |
| `ArriveDistance` | Float | — | N | Arrival distance. |  |

## HariAIDebugParameter

Debug

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StopAI` | Bool | — | N | Debug: freeze AI. |  |
| `InfiniteNeedle` | Bool | — | N | Debug: infinite needles. |  |

## HoneyAIParameter

Nectar drop. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ScaleMin` | Float | — | N | Min scale. |  |
| `bLevelPlacement` | Bool | — | N | Placed in the level (not dropped). |  |
| `FallHitRepulsiveForce` | Float | — | N | Bounce force on landing. |  |
| `CanSuckSinkHeight` | Float | — | N | Height at which Pikmin can drink it. |  |

## IceAIParameter

Ice area

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FreezeMoveSpeed` | Float | — | N | Move speed while frozen. |  |

## IcicleBreakEffectParameter

Break effect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Effect` | ParticleSystem | — | N | Effect. |  |
| `Offset` | Vector | — | N | Offset. |  |

## IcicleLandEffectParameter

Landing effect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EffectRequest` | EftRequest | — | N | Effect. |  |
| `Offset` | Vector | — | N | Offset. |  |

## KoganiProwlParameter

Prowl

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MinGoalUpdateInterval` | Float | — | N | Min goal update. |  |
| `MaxGoalUpdateInterval` | Float | — | N | Max goal update. |  |
| `MinTerritoryNestRatio` | Float | — | N | Min nest ratio. |  |
| `MaxTerritoryNestRatio` | Float | — | N | Max nest ratio. |  |
| `TerritoryNestAngle` | Float | — | N | Nest angle. |  |
| `SlackAngle` | Float | — | N | Turn slack. |  |

## MitsuMochiContinuousAttackNumParameter

Attacks by life

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LifeRate` | Float | — | N | Life ratio. |  |
| `AttackNum` | Int | — | N | Attacks. |  |

## MitsuMochiLookAtParameter

Look-at

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookAtBlendOn` | BlendParam | — | N | Blend in. |  |
| `LookAtBlendOff` | BlendParam | — | N | Blend out. |  |
| `LerpRatio` | Float | — | N | Blend ratio. |  |

## MitsuMochiPullHairParameter

Hair pulling

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PullHairPikminMax` | Int | — | N | Max Pikmin pulling. |  |
| `PullCoreTime` | Float | — | N | Time to pull the core. |  |
| `WorkNumOfs` | Vector | — | N | Work counter offset. |  |
| `DisappearTime` | Float | — | N | Handle disappear time. |  |

## MitsuMochiQuickTurnParameter

Quick turn

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxAngVelTime` | Float | — | N | Turn speed. |  |
| `AngAccelRatio` | Float | — | N | Turn accel. |  |

## NightKochappyAIParameter

Night Dwarf Bulborb

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WalkAnimRate` | Float | — | N | Walk animation rate. |  |

## NiseOtakaraCrackSettings

Crack stage

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `ThresholdLifeRatio` | Float | — | N | Life ratio. |  |
| `MaterialSlotName` | Name | — | N | Material slot. |  |
| `Effect` | ParticleSystem | — | N | Effect. |  |
| `EffectBoneName` | Name | — | N | Effect bone. |  |

## NpcAIInfo

AI by progress

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AIType` | ENpcAIType | — | N | ENpcAIType. |  |
| `ProgressMin` | Int | — | N | Min story progress. |  |
| `ProgressMax` | Int | — | N | Max story progress. |  |

## NpcAIMiniParameter

NPC AI row data

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaitAIParameters` | NpcWaitAIParameter | — | N | Wait animations. |  |
| `DemoWaitAIParameter` | NpcWaitAIParameter | — | N | Cutscene wait. |  |
| `MoveAIParameter` | NpcMoveAIParameter | — | N | Movement. |  |
| `FacialPresetType` | ECharacterEditFacialPresetType | — | N | Face preset. |  |
| `EmotionType` | ECharacterEditEmotionType | — | N | Emotion. |  |

## NpcAIParameter

Hub/field NPCs (castaways, Rescue Corps). Per-instance (NpcAIComponent static): NpcRoleType, NearNpcReaction range, Wander radius, DirectLookLocation, placement flags, PlayerWarpPointOffset, TalkParameter

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NpcRoleType` | ENpcRoleType | — | S | ENpcRoleType role. |  |
| `NpcAIInfos` | NpcAIInfo | — | N | AI types by story progress. |  |
| `DefaultNpcAIInfo` | NpcAIInfo | — | N | Default AI. |  |
| `CurrentNpcAIInfo` | NpcAIInfo | — | N | Runtime current AI. |  |
| `NearNpcReactionParameter` | NpcNearNpcReactionAIParameter | — | S | Reaction to other NPCs. |  |
| `WanderParameter` | NpcWanderAIParameter | — | S | Wandering. |  |
| `FollowParameter` | NpcFollowAIParameter | — | N | Following the player. |  |
| `LookParameter` | NpcLookAIParameter | — | N | Looking at the player. |  |
| `DirectLookLocation` | Vector | — | S | Fixed look-at location. |  |
| `LookCustomParameter` | NpcLookCustomAIParameter | — | N | Look timing. |  |
| `bDefaultPlacementSubLevel` | Bool | — | S | Placed in the default sub-level. |  |
| `DefaultPlacementTagName` | Name | — | S | Placement tag. |  |
| `NpcPlaceCheckQuestStatusList` | NpcPlaceCheckQuestStatus | — | N | Quest-dependent placements. |  |
| `bLeafState` | Bool | — | S | Leafling (leaf-covered) state. |  |
| `PlayerWarpPointOffset` | Vector | — | S | Warp point offset. |  |

## NpcAIParameterDataTable

NPC AI table row

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AIType` | ENpcAIType | — | N | AI type. |  |
| `MiniParameter` | NpcAIMiniParameter | — | N | Parameters. |  |

## NpcFollowAIParameter

Follow

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Dist` | Float | — | N | Follow distance. |  |
| `LookRange2D` | Float | — | N | Look range. |  |
| `LookTargetChangeIntervalMin` | Float | — | N | Min look change. |  |
| `LookTargetChangeIntervalMax` | Float | — | N | Max look change. |  |
| `ExcavApproachOffset` | Vector | — | N | Offset when approaching dig spots. |  |
| `ExcavFaceMessageInterval` | Float | — | N | Dig spot message interval. |  |
| `MoveSpeed` | Float | — | N | Speed. |  |
| `ExcavApproachOffsetSearch` | Vector | — | N | Offset when searching dig spots. |  |
| `ExcavFaceMessageIntervalSearch` | Float | — | N | Message interval when searching. |  |
| `MoveSpeedSearch` | Float | — | N | Speed when searching. |  |
| `JumpWaitRate` | Float | — | N | Jump wait chance. |  |
| `JumpWaitTimeMax` | Float | — | N | Max jump wait. |  |

## NpcLookAIParameter

Look

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookArea` | CylinderSearchArea | — | N | Area. |  |
| `TurnAngle` | Float | — | N | Turn angle. |  |

## NpcLookCustomAIParameter

Look timing

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `LookTimeMin` | Float | — | N | Min look. |  |
| `LookTimeMax` | Float | — | N | Max look. |  |
| `YosomiTimeMin` | Float | — | N | Min look-away time. |  |
| `YosomiTimeMax` | Float | — | N | Max look-away time. |  |

## NpcMoveAIParameter

Movement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MoveSpeed` | Float | — | N | Speed. |  |
| `ArriveWaitRate` | Float | — | N | Wait chance on arrival. |  |

## NpcNearNpcReactionAIParameter

NPC reactions

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NpcSearchRange` | Float | — | S | Search range. |  |
| `ToNpcReactionAITypes` | ENpcAIType | — | N | AI types to react with. |  |

## NpcNearPlayerReactionAIParameter

Player reactions

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PlayerSearchRange` | Float | — | N | Range. |  |
| `ToPlayerReactionAITypes` | ENpcAIType | — | N | AI types. |  |

## NpcPlaceCheckQuestStatus

Quest placement

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CheckQuestName` | Name | — | N | Quest. |  |
| `CheckQuestStatusType` | ENpcCheckQuestStatusType | — | N | Status. |  |
| `PlacementTagName` | Name | — | N | Tag. |  |

## NpcWaitAIParameter

Wait animation

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bLoopMotion` | Bool | — | N | Loop. |  |
| `bOneShotType` | Bool | — | N | One-shot. |  |
| `StartMotionName` | Name | — | N | Start motion. |  |
| `LoopMotionName` | Name | — | N | Loop motion. |  |
| `EndMotionName` | Name | — | N | End motion. |  |
| `bLoopEndNotify` | Bool | — | N | Notify at loop end. |  |
| `bUseLookAt` | Bool | — | N | Look at. |  |
| `bUseTurn` | Bool | — | N | Turn. |  |
| `bEndless` | Bool | — | N | Endless. |  |
| `WaitTimeMin` | Float | — | N | Min wait. |  |
| `WaitTimeMax` | Float | — | N | Max wait. |  |

## NpcWanderAIParameter

Wander

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bRandomWander` | Bool | — | N | Random wander. |  |
| `TargetPoints` | Vector | — | N | Wander points. |  |
| `Radius` | Float | — | S | Radius. |  |

## OjamaBlockPhotoAIParameter

Photo-blocking object (camera). Per-instance.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CameraInThreshold` | Float | — | S | Camera-in threshold. |  |
| `CheckDistance` | Int | — | S | Check distance. |  |
| `IsCameraWallCollision` | Bool | — | S | Use camera wall collision. |  |
| `IsCheckDistance` | Bool | — | S | Check distance. |  |
| `IsCheckCameraHeight` | Bool | — | S | Check camera height. |  |

## OnyonAIParameter

Onions. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bIsDummyMode` | Bool | — | N | Dummy (non-functional) Onion. |  |
| `bForceChangeBodyToSingleColor` | Bool | — | N | Force a single body colour. |  |
| `CustomBodyColor` | EOnyonColor | — | N | Custom colour. |  |
| `SpitVelH` | Float | — | N | Seed spit horizontal speed. |  |
| `SpitVelV` | Float | — | N | Seed spit vertical speed. |  |
| `SpawnPikminHead` | Class | — | N | Sprout class. |  |
| `bHeyWakka` | Bool | — | N | Initial greeting behaviour (PodAI per-instance bHeyWakka). |  |
| `SpawnPikminNum` | Int | — | N | Sprouts spawned. |  |
| `bWaitSpawn` | Bool | — | N | Wait before spawning. |  |
| `SpawnPikminMinionColor` | EPikminColor | — | N | Minion colour. |  |
| `ClimbPikminSpeed` | Float | — | N | Climb speed. |  |
| `DownPikminSpeedMin` | Float | — | N | Min descend speed. |  |
| `DownPikminSpeedMax` | Float | — | N | Max descend speed. |  |
| `SuckPointZOffset` | Float | — | N | Suck point height. |  |
| `ForceFloweringRadius` | Float | — | N | Radius that forces flowering. |  |
| `LightEffect` | ParticleSystem | — | N | Light effect. |  |
| `CollectEffect` | ParticleSystem | — | N | Collect effect. |  |
| `BirthEffect` | ParticleSystem | — | N | Birth effect. |  |
| `HoneyEffect` | ParticleSystem | — | N | Nectar effect. |  |
| `LightEffectTeamA` | ParticleSystem | — | N | VS team A light. |  |
| `LightEffectTeamB` | ParticleSystem | — | N | VS team B light. |  |
| `CollectEffectA` | ParticleSystem | — | N | VS team A collect. |  |
| `CollectEffectB` | ParticleSystem | — | N | VS team B collect. |  |
| `LightEftFadeTimeByNotify` | Float | — | N | Light fade. |  |
| `CollectEffectPlayInterval` | Float | — | N | Collect effect interval. |  |
| `DemoOffset` | Vector2D | — | N | Cutscene offset. |  |
| `CombineSignEffect` | ParticleSystem | — | N | Onion merge warning. |  |
| `CombineTurnEffect` | ParticleSystem | — | N | Merge turn effect. |  |
| `CombineEffect` | ParticleSystem | — | N | Merge effect. |  |
| `CombineEffectCmnSocketName` | Name | — | N | Merge socket. |  |
| `CombineEffectCmnOffset` | Vector | — | N | Merge offset. |  |
| `OnyonCombineEftColorData` | OnyonCombineEftColorData | — | N | Merge colour data. |  |
| `CombineTurnEffectColorDT` | DataTable | — | N | Merge turn colour table. |  |
| `CombineEffectColorDT` | DataTable | — | N | Merge colour table. |  |

## OnyonCarryAIParameter

Onion being carried (discovery)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AddMaxPikminNum` | Int | — | N | Max Pikmin increase. |  |
| `ForceEmitPikminNum` | Int | — | N | Forced sprout count. |  |
| `EmitPikminNum` | Int | — | N | Sprout count. |  |

## OoPanModokiRigidityParameter

Stagger

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `JumpHeight` | Float | — | N | Hop height. |  |
| `RigidityTime` | Float | — | N | Stagger time. |  |

## OtaBankCardAIParameter

Bank card treasure. Per-instance: SerialNum, CardNum

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SerialNum` | Byte | — | S | Bank serial it belongs to. |  |
| `bIsJokerCard` | Bool | — | N | Joker card. |  |
| `CardNum` | Byte | — | S | Card number. |  |
| `CardPattern` | EOtaBankCardPattern | — | N | Card design. |  |

## OtakaraEffectOverrideSetting

Overrides

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `OverrideLocationParam` | OverrideLocationParam | — | N | Location override. |  |
| `OverrideRadiusParam` | OverrideRadiusParam | — | N | Radius override. |  |
| `FloatParams` | EftCustomRequestFloatParam | — | N | Float parameters. |  |

## OtakaraEffectParam

Treasure effect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Request` | EftCustomRequest | — | N | Effect request. |  |
| `OtakaraEffectOverrideSetting` | OtakaraEffectOverrideSetting | — | N | Overrides. |  |

## OverrideLocationParam

Location override

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bOverride` | Bool | — | N | Enable. |  |
| `BoneName` | Name | — | N | Bone. |  |
| `bOverrideOffset` | Bool | — | N | Override offset. |  |
| `LocationOffset` | Vector | — | N | Offset. |  |

## OverrideRadiusParam

Radius override

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bOverride` | Bool | — | N | Enable. |  |
| `Radius` | Float | — | N | Radius. |  |
| `btransition` | Bool | — | N | Transition. |  |

## OverrideScaleParam

Scale override

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bOverride` | Bool | — | N | Enable. |  |
| `ScaleOffset` | Vector | — | N | Scale. |  |

## OverrideSetting

Effect overrides

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `OverrideLocationParam` | OverrideLocationParam | — | N | Location override. |  |
| `OverrideScaleParam` | OverrideScaleParam | — | N | Scale override. |  |

## PanModokiAIParameter

Breadbug

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EscapeTime` | Float | — | N | Escape time. |  |

## PanModokiBaseChaseParameter

Chase

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GiveupBehaindDistXY` | Float | — | N | Give-up distance behind. |  |

## PanModokiBaseDemoParameter

Cutscene

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `WaitTimeAtCollectDemoEnd` | Float | — | N | Wait after collect cutscene. |  |

## PhotonBallAIParameter

Glow seed / photon ball (night)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDemoPhotonBall` | Bool | — | N | Cutscene variant. |  |
| `BirthNum` | Int | — | N | Glow Pikmin born. |  |
| `LightEffect` | ParticleSystem | — | N | Light effect. |  |
| `BirthEffect` | ParticleSystem | — | N | Birth effect. |  |
| `ThrowEffect` | ParticleSystem | — | N | Throw effect. |  |
| `JumpBirthRange` | Float | — | N | Birth jump range. |  |

## PieceAIParameter

Raw material pieces (Sizai/Kinkai pieces). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PieceType` | EPieceType | — | N | EPieceType. |  |
| `PieceMeshList` | StaticMesh | — | N | Meshes. |  |
| `killEffect` | ParticleSystem | — | N | Removal effect. |  |
| `PetiEffect` | ParticleSystem | — | N | Small pop effect. |  |
| `RollMoveSpeed` | Float | — | N | Roll speed. |  |
| `VomitRollMoveSpeed` | Float | — | N | Roll speed when vomited. |  |
| `RotaionSpeed` | Float | — | N | Rotation speed. |  |
| `ThrowVelZ` | Float | — | N | Throw vertical speed. |  |
| `BoundForce` | Float | — | N | Bounce force. |  |
| `BoundWeakRate` | Float | — | N | Bounce decay. |  |
| `VomitTime` | Float | — | N | Vomit time. |  |
| `VomitGoalOffsetPikmin` | Vector2D | — | N | Vomit target offset (Pikmin). |  |
| `VomitGoalOffsetPuppyHappy` | Vector2D | — | N | Vomit target offset (puppy Oatchi). |  |
| `VomitGoalOffsetAdultHappy` | Vector2D | — | N | Vomit target offset (adult Oatchi). |  |
| `VomitKillTime` | Float | — | N | Vomit removal time. |  |
| `RespawnLocationControl` | RespawnLocationControl | — | N | Respawn position safety. |  |

## PieceStationAIParameter

Material pile station (builds up visually). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PieceActor` | Class | — | N | Piece class. |  |
| `PoolType` | EGenericActorPoolType | — | N | Pool. |  |
| `PoolSize` | Int | — | N | Pool size. |  |
| `bUseChildActorMesh` | Bool | — | N | Use child actor mesh. |  |
| `EachPhaseMeshMap` | Byte->StaticMesh | — | N | Mesh per phase. |  |
| `MeshScalingCurve` | CurveFloat | — | N | Mesh scaling. |  |
| `CollisionScalingCurve` | CurveFloat | — | N | Collision scaling. |  |
| `CollisionLocationZCurve` | CurveFloat | — | N | Collision height. |  |
| `KirakiraEffectParam` | OtakaraEffectParam | — | N | Sparkle effect. |  |
| `ScaleSpeed` | Float | — | N | Scale speed. |  |
| `HikariDropAppearEffect` | ParticleSystem | — | N | Glow drop effect. |  |
| `PlayDemoDistance` | Float | — | N | Cutscene distance. |  |

## PlantsAIParameter

Decorative plants. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bNotUpdateFlag` | Bool | — | N | Don't update. |  |
| `OverlapRadius` | Float | — | N | Overlap radius. |  |

## PoisonMushAIParameter

Poison mushroom (Komush variant)

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `PoisonBound` | BoxBound2 | — | N | Poison volume. |  |
| `PoisonTime` | Float | — | N | Poison time. |  |
| `PoisonEffect` | ParticleSystem | — | N | Poison effect. |  |
| `RideActorDamageRadius` | Float | — | N | Rider damage radius. |  |

## PongashiAIParameter

Candypop Bud. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `SpitPikminHead` | Class | — | N | Seed class spat out. |  |
| `PlayerSearchRadius` | Float | — | N | Player search radius. |  |
| `SwallowMax` | Int | — | N | Pikmin it accepts. |  |
| `SwallowArea` | Vector2D | — | N | Swallow area. |  |
| `CloseFlickArg` | FlickArg | — | N | Closing flick. |  |
| `SuckEftReq` | EftRequest | — | N | Suck effect. |  |
| `SuckBombEftReq` | EftRequest | — | N | Bomb suck effect. |  |
| `SpitBombEffect` | ParticleSystem | — | N | Bomb spit effect. |  |
| `DeadEffect` | ParticleSystem | — | N | Death effect. |  |
| `DemoOffset` | Vector2D | — | N | Cutscene offset. |  |
| `SerializeSwallowNum` | Int | — | N | Saved swallowed count. |  |
| `SerializeSwallowSum` | Int | — | N | Saved total. |  |

## RespawnLocationControl

Respawn safety (runtime helper). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GActor` | GActor | — | N | Owner (runtime). |  |
| `OrimaC` | OrimaComponent | — | N | Player component (runtime). |  |
| `CarrotAI` | CarrotAIComponent | — | N | AI component (runtime). |  |
| `bCheckRespawnLocationActor` | Bool | — | N | Check respawn location actors. |  |
| `bDebug` | Bool | — | N | Debug. |  |
| `OtherPointNum` | Int | — | N | Alternative points. |  |
| `CheckRespawnOtherPointDistance` | Float | — | N | Alternative point distance. |  |
| `SafePointSearchRadius` | Float | — | N | Safe point search radius. |  |
| `RayCheckHeight` | Float | — | N | Ray height. |  |
| `RayCheckLength` | Float | — | N | Ray length. |  |
| `RequestLineTraceInterval` | Byte | — | N | Trace interval. |  |

## RockBallAIParameter

Rolling boulders. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StoneHitBrokenCount` | Int | — | N | Rock Pikmin hits to break. |  |
| `RequestRumbleName` | Name | — | N | Rumble. |  |
| `IgnoreBottomDiffRatio` | Float | — | N | Bottom difference ratio. |  |
| `bUseIgnoreBottomDiffRatioInZukan` | Bool | — | N | Piklopedia override. |  |
| `IgnoreBottomDiffRatioInZukan` | Float | — | N | Piklopedia value. |  |
| `bFriendlyFire` | Bool | — | N | Hurts enemies too. |  |
| `HitRadius` | Float | — | N | Hit radius. |  |
| `FirstHitRadius` | Float | — | N | First hit radius. |  |
| `FirstHitOffset` | Vector | — | N | First hit offset. |  |
| `Damage` | Float | — | N | Damage. |  |
| `bBigType` | Bool | — | N | Big boulder. |  |
| `LifeTime` | Float | — | N | Lifetime. |  |
| `FallWaitTime` | Float | — | N | Fall wait. |  |
| `GravityRate` | Float | — | N | Gravity. |  |
| `Radius` | Float | — | N | Radius. |  |
| `bSinkFloor` | Bool | — | N | Sinks floors. |  |
| `SinkFloorDistance` | Float | — | N | Sink distance. |  |
| `PressFloorParameter` | PressFloorParameter | — | N | Floor deformation. |  |
| `DestroyEffect` | ParticleSystem | — | N | Destroy effect. |  |
| `RollEffectRequest` | EftRequest | — | N | Roll effect. |  |
| `AerialRollEffect` | ParticleSystem | — | N | Airborne effect. |  |
| `DelayRollEffectParam` | RockBallDelayRollEffectParameter | — | N | Delayed roll effect. |  |
| `DestroyEffectRequest` | EftRequest | — | N | Destroy effect request. |  |
| `FallDestroyEffectRequest` | EftRequest | — | N | Fall destroy effect. |  |
| `bCollisionBySearch` | Bool | — | N | Use search collision. |  |
| `FlickArg` | FlickArg | — | N | Flick. |  |
| `bEnableKillHeight` | Bool | — | N | Destroy below a height. |  |
| `KillHeightOffset` | Float | — | N | Kill height. |  |
| `KillHeightDestroyEffectRequest` | EftRequest | — | N | Kill height effect. |  |
| `KillHeightDestroyEffectRotation` | Rotator | — | N | Effect rotation. |  |
| `bEnableRollPressNumLimit` | Bool | — | N | Limit Pikmin crushed. |  |
| `RollPressNumMax` | Int | — | N | Crush limit. |  |
| `RollFlickParam` | FlickArg | — | N | Roll flick. |  |
| `WaterKillHeightOffset` | Float | — | N | Water kill height. |  |
| `FreezeGachaCountThreshold` | Int | — | N | Frozen button-mash threshold. |  |
| `FlickDirRange` | Float | — | N | Flick direction range. |  |
| `IcicleClass` | Class | — | N | Icicle spawned (ice variant). |  |
| `RollingHDRumbleKey` | Name | — | N | Rumble. |  |
| `CreateIcicleCameraShakeData` | Class | — | N | Icicle shake class. |  |
| `CreateIcicleShakeParam` | ShakeCameraParameter | — | N | Icicle shake. |  |
| `HDRumbleParam` | RockBallRollHDRumbleParameter | — | N | Rumble settings. |  |

## RockBallDelayRollEffectParameter

Delayed effect

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnableDelay` | Bool | — | N | Enable. |  |
| `DelayTime` | Float | — | N | Delay. |  |

## RockBallRollHDRumbleParameter

Rumble

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bEnable` | Bool | — | N | Enable. |  |

## RopeBranchAIParameter

Rope/branch hanging point. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FlickHeight` | Float | — | N | Flick height. |  |
| `bBigType` | Bool | — | N | Big variant. |  |

## RusherLookAtParameter

Look-at

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxAngle` | Float | — | N | Max angle. |  |
| `HeadRatio` | Float | — | N | Head ratio. |  |
| `SpeedRatio` | Float | — | N | Speed ratio. |  |

## SakadachiFaceMsgParam

Hints

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FirstDownFaceMsgId` | Name | — | N | First knock-down message. |  |
| `DownFaceMsgId` | Name | — | N | Knock-down messages. |  |

## SakadachiGoHomeParameter

Go home

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `GoHomeMinTime` | Float | — | N | Min time. |  |
| `GoHomeTargetDist` | Float | — | N | Target distance. |  |
| `GoHomeTargetAng` | Float | — | N | Target angle. |  |
| `GoHomeDistOfs` | Float | — | N | Distance offset. |  |

## SearchBombAIParameter

Sensor/homing bomb item. Per-instance (static): BaseParam.IgnitionTime/ExplosionRadius/ExplosionPower/Notify radii, SearchWaitTime, SearchRadius

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BaseParam` | BombBaseAIParameter | — | S | Common bomb settings. |  |
| `SearchWaitTime` | Float | — | S | Wait before searching. |  |
| `SearchRadius` | Float | — | S | Target search radius. |  |
| `ReturnToBagTime` | Float | — | N | Time before it returns to the bag. |  |
| `SearchLoopEffect` | ParticleSystem | — | N | Search effect. |  |
| `KillEffect` | ParticleSystem | — | N | Kill effect. |  |
| `BoundForce` | Float | — | N | Bounce force. |  |
| `BoundForceZ` | Float | — | N | Vertical bounce. |  |

## ShakoBoneParameter

Body bending

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BendingBoneNum` | Int | — | N | Bones bent. |  |
| `BendingMaxAngle` | Float | — | N | Max bend. |  |
| `AngleVelBengindRatio` | Float | — | N | Bend speed ratio. |  |

## ShakoFlickNonStickerParameter

Flick sphere

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `FlickBoneName` | Name | — | N | Bone. |  |
| `Offset` | Vector | — | N | Offset. |  |
| `SphereRadius` | Float | — | N | Radius. |  |

## ShugoFlagAIParameter

Gather flag (rally marker). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `Time` | Float | — | N | Duration. |  |
| `SendEventInterval` | Float | — | N | Event interval. |  |
| `MeshHeight` | Float | — | N | Flag height. |  |
| `MeshHeightNearOnyon` | Float | — | N | Height near an Onion. |  |
| `DistNearOnyon` | Float | — | N | Onion distance. |  |
| `MeshHeightNearPod` | Float | — | N | Height near the pod. |  |
| `DistNearPod` | Float | — | N | Pod distance. |  |
| `CheckIntervalTime` | Float | — | N | Check interval. |  |
| `AdjustLength` | Float | — | N | Adjust length. |  |
| `AdjustLocLerpRatio` | Float | — | N | Adjust blend. |  |
| `FueEftBoneName` | Name | — | N | Whistle effect bone. |  |
| `FueEffect` | ParticleSystem | — | N | Whistle effect. |  |
| `GroundEffect` | ParticleSystem | — | N | Ground effect. |  |
| `EndEffect` | ParticleSystem | — | N | End effect. |  |
| `FueEffect1P` | ParticleSystem | — | N | P1 whistle effect. |  |
| `FueEffect2P` | ParticleSystem | — | N | P2 whistle effect. |  |
| `GroundEffect1P` | ParticleSystem | — | N | P1 ground effect. |  |
| `GroundEffect2P` | ParticleSystem | — | N | P2 ground effect. |  |
| `EndEffect1P` | ParticleSystem | — | N | P1 end effect. |  |
| `EndEffect2P` | ParticleSystem | — | N | P2 end effect. |  |

## SlopeBothAIParameter

Buildable slope. Not exposed (except PiecePutNum on component).

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `CompleteColsUpSpeed` | Float | — | N | Collision rise speed when completed. |  |

## SuitoriKeepDistance

Keep distance

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `StartEscapeDistance` | Float | — | N | Start escape distance. |  |
| `EndEscapeDistance` | Float | — | N | End escape distance. |  |
| `CheckDegree` | Float | — | N | Check angle. |  |
| `bBack` | Bool | — | N | Back away. |  |

## SwampCarrotTriggerComponent

Swamp water

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `bDisableSink` | Bool | — | S | Swamp doesn't sink things (per-instance). |  |

## TanebiAIParameter

Tanebi (ember/flame item carried to melt ice). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `AliveTime` | Float | — | N | Lifetime. |  |
| `DamageToIceGensei` | Float | — | N | Damage to ice creatures. |  |
| `DamageToIceGate` | Float | — | N | Damage to ice gates. |  |
| `HotRadius` | Float | — | N | Heat radius. |  |
| `FireEffect` | ParticleSystem | — | N | Fire effect. |  |

## TestSearchAIParameter

Debug search test. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `EditableBound` | EditableBound | — | N | Bound. |  |
| `bSearch` | Bool | — | N | Search. |  |
| `bUseMatrix` | Bool | — | N | Use matrix. |  |
| `bCheckRand` | Bool | — | N | Random check. |  |
| `bCheckClamp` | Bool | — | N | Clamp check. |  |
| `bDebugDraw` | Bool | — | N | Debug draw. |  |
| `CheckInterval` | Int | — | N | Interval. |  |

## ThrowItemAIParameter

Throwable items base. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `NotifyPutEventRadius` | Float | — | N | Put event radius. |  |
| `HoldLoc` | Vector | — | N | Hold location. |  |
| `HoldRot` | Rotator | — | N | Hold rotation. |  |
| `ThrowHoldLoc` | Vector | — | N | Throw hold location. |  |
| `ThrowHoldRot` | Rotator | — | N | Throw hold rotation. |  |
| `ThrowStartRot` | Rotator | — | N | Throw start rotation. |  |
| `ThrowAngularVel` | Float | — | N | Spin speed. |  |
| `OnTerrainLinearDamping` | Float | — | N | Ground damping. |  |

## TsuyuAIParameter

Spicy dew drop. Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `DeadTime` | Float | — | N | Lifetime. |  |
| `BoundAngularVel` | Float | — | N | Bounce spin. |  |
| `DeadEffect` | ParticleSystem | — | N | Death effect. |  |

## TsuyukusaAIParameter

Spiderwort (spicy dew plant). Not exposed.

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `BirthTsuyu` | Class | — | N | Dew class. |  |
| `DropSumDamage` | Float | — | N | Damage to drop dew. |  |
| `TsuyuBirthTime` | Float | — | N | Dew regrow time. |  |
| `TsuyuDropDownSpeed` | Float | — | N | Drop speed down. |  |
| `TsuyuDropForwardSpeed` | Float | — | N | Drop speed forward. |  |
| `WitherTsuyuBirthTime` | Float | — | N | Withered regrow time. |  |
| `GoalOffset` | Float | — | N | Goal offset. |  |
| `TsuyuPos` | Vector | — | N | Dew positions. |  |
| `TsuyuRot` | Rotator | — | N | Dew rotations. |  |
| `HeadMotionCurve` | CurveFloat | — | N | Head curve. |  |
| `HeadMotionStartNum` | Int | — | N | Head start count. |  |
| `HeadMotionMaxNum` | Int | — | N | Head max count. |  |
| `HeadMotionResetWeight` | Int | — | N | Reset weight. |  |
| `HeadMotionForceDownWeight` | Int | — | N | Force-down weight. |  |
| `HeadMotionChangeTime` | Float | — | N | Change time. |  |
| `DefaultHeadAddValue` | Float | — | N | Head add value. |  |
| `MaxHeadAddValueByStick` | Float | — | N | Max from latched. |  |
| `MaxHeadAddValueByStickyFloor` | Float | — | N | Max from sticky floor. |  |

## WasurenagusaMiniAIParameter

Mini Lumiknoll

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `HikariRollDist` | Float | — | N | Glow roll distance. |  |
| `AttackedFlagResetTime` | Float | — | N | Attacked flag reset. |  |

## WaterCarrotTriggerComponent

Water volumes' trigger (freeze/ice). Per-instance: MaxIcePikmins, FreezeTime, ShowIceNumOffs, IceNumCullingDist, WaterExitGoalOffset, WaterAmbientSoundId

| Field | Type | Exposed | Conf. | Description | Example values |
|---|---|---|---|---|---|
| `MaxIcePikmins` | Int | — | S | Ice Pikmin needed to freeze the water. |  |
| `FreezeTime` | Float | — | S | How long the water stays frozen. |  |
| `ShowIceNumOffs` | Vector | — | S | Offset of the Ice-Pikmin counter. |  |
| `IceNumCullingDist` | Float | — | S | Counter culling distance. |  |
| `WaterExitGoalOffset` | Float | — | S | Offset where things exit the water. |  |
| `WaterAmbientSoundId` | Name | — | S | Ambient sound ID. |  |
