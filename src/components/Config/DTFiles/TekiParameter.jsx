import React from 'react';
import { FreezeDropTypes } from '../../../api/types';
import { ConfigInput } from '../Inputs/ConfigInput';
import { ConfigSelect } from '../Inputs/ConfigSelect';

export const TekiParameter = () => <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
    <ConfigInput iconType="item" iconId="bomb" value="BombHit" type="number" tooltip="Makes bombs and boulders do damage equal to MaxLife divided by BombHit." />
    <ConfigInput iconType="item" iconId="bomb" value="BombInsideHit" type="number" tooltip="Makes ingested bombs do damage equal to MaxLife divided by BombInsideHit." />
    <ConfigInput iconType="icon" iconId="weight" value="CarryWeightMin" type="number" tooltip="The minimum carry strength of the combined carriers required to carry an object." />
    <ConfigInput iconType="icon" iconId="weight" value="CarryWeightMax" type="number" tooltip="The maximum number of individual carriers on an object, including captains, dogs and (Giant) Breadbugs Each entity only counts as 1 regardless of its carry strength." />
    <ConfigInput iconType="icon" iconId="weight" value="CarryWeightMaxVs" type="number" tooltip="The maximum number of individual carriers on an object during Dandori Battles. This is also used when a Breadbug or Giant Breadbug is carrying the object." />
    <ConfigInput iconType="icon" iconId="weight" value="CarryWeightMinVs" type="number" tooltip="The minimum carry strength of the combined carriers required to carry an object while in a Dandori Battle." />
    <ConfigInput iconType="icon" iconId="weight" value="CarryIncPikmins" type="number" tooltip="Number of Pikmin sprouts produced by the corpse." />
    <ConfigInput iconType="creature" iconId="marofrog" value="CrushHit" type="number" tooltip="Damage taken if crushed by anoth er enemy such as a Wollyhop, equal to MaxLife divided by CrushHit." />
    <ConfigInput iconType="creature" iconId="marofrog" value="CrushKnockBackSpeed" type="number" tooltip="Knockback speed an enemy will take if CrushHit applies damage to it." />
    <ConfigInput iconType="portal" iconId="madoripoko" value="CrushStopTime" type="number" tooltip="Enemy pause time if CrushHit applies damage to it." />
    <ConfigInput iconType="icon" iconId="dropstationnumber" value="DropStationPieceNum" type="number" tooltip="???" />
    <ConfigSelect iconType="gimmick" iconId="coldbox" value="FreezeDropType" optionEnum={FreezeDropTypes} tooltip="Corresponds with values in DT_FreezeDropItem.json to determine how much nectar an enemy should drop" />
    <ConfigInput iconType="pikmin" iconId="pikminice" value="FreezeHit" type="number" tooltip="How many hits from an Ice Pikmin is required to max out the freeze gauge" />
    <ConfigInput iconType="pikmin" iconId="pikminice" value="FreezeInsideHit" type="number" tooltip="How many Ice Pikmin being eaten it takes to max out the freeze gauge." />
    <ConfigInput iconType="pikmin" iconId="pikminice" value="FreezeDamageRatio" type="number" tooltip="	Multiplier on damage that frozen enemies take, reducing damage." />
    <ConfigInput iconType="creature" iconId="icefrog" value="FrozenCrushDamageRate" type="number" tooltip="Multiplier on how much crush damage is taken while frozen." />
    <ConfigInput iconType="creature" iconId="default" value="FlashbangRate" type="number" tooltip="???" />
    <ConfigInput iconType="creature" iconId="default" value="FlashBangTargetWeight" type="number" tooltip="???" />
    <ConfigInput iconType="item" iconId="icebomb" value="IceBombHit" type="number" tooltip="How many Ice Blasts it takes to max out the freeze gauge. Typically defaults to 1.0" />
    <ConfigInput iconType="item" iconId="icebomb" value="IceBombInsideHit" type="number" tooltip="How many ingested Ice Blasts it takes to max out the freeze gauge. Typically more effective than IceBombHit." />
    <ConfigInput iconType="icon" iconId="sparklium" value="Kira" type="number" tooltip="Sparklium" />
    <ConfigInput iconType="item" iconId="recoverykit" value="MaxLife" type="number" tooltip="The max health of the enemy." />
    <ConfigInput iconType="object" iconId="wasurenagusa" value="OtherDamage" type="number" tooltip="How much damage the enemy will deal to a Tricknoll or Lumiknoll." />
    <ConfigInput iconType="icon" iconId="dandoripoints" value="Poko" type="number" tooltip="Dandori points during Dandori Challenges" />
    <ConfigInput iconType="pikmin" iconId="pikminwhite" value="PoisonHit" type="number" tooltip="Makes White Pikmin's poison damage after being eaten equal to MaxLife divided by PoisonHit" />
    <ConfigInput iconType="pikmin" iconId="pikminpurple" value="PurpleDirectHit" type="number" tooltip="Makes Purple Pikmin's impact damage equal to MaxLife divided by PurpleDirectHit." />
    <ConfigInput iconType="creature" iconId="kochappy" value="PressHit" type="number" tooltip="Used for direct hits on enemies like Bulborbs and Sheargrubs. It deals damage equal to MaxLife divided by PressHit" />
    <ConfigInput iconType="object" iconId="survivorolimarleaf" value="PlayerDamage" type="number" tooltip="How much damage the captain and Oatchi will take from the enemy's attack" />
    <ConfigInput iconType="item" iconId="rockball" value="SnowBallDamage" type="number" tooltip="Damage taken if hit by a snowball, equal to MaxLife divided by SnowBallDamage." />
    <ConfigInput iconType="item" iconId="rockball" value="StoneDamage" type="number" tooltip="Makes the Pebble Pitcher deal damage equal to MaxLife divided by StoneDamage." />
    <ConfigInput iconType="item" iconId="thunderall" value="ThunderStopTime" type="number" tooltip="How long an enemy will be paused when struck with a Lightning Strike." />
    <ConfigInput iconType="icon" iconId="dandoripoints" value="VsScore" type="number" tooltip="Dandori points during Dandori Battles" />
</div>;    