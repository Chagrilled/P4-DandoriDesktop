import React from 'react';
import { ConfigInput } from '../Inputs/ConfigInput';
import { ConfigSelect } from '../Inputs/ConfigSelect';
import { CakTalkVoiceTone, NpcInfoKey, NpcRoleGroupType, NpcRoleType } from '../../../api/types';

export const NpcRole = () => <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
    <ConfigInput iconType="object" iconId="survivora" value="bIsRescue" type="checkbox" />
    <ConfigSelect iconType="object" iconId="survivora" value="NpcInfoKey" optionEnum={Object.fromEntries(NpcInfoKey.map(v => [v, v]))} />
    <ConfigSelect iconType="object" iconId="survivora" value="RoleType" optionEnum={NpcRoleType} />
    <ConfigSelect iconType="object" iconId="survivora" value="RoleGroupType" optionEnum={NpcRoleGroupType} />
    <ConfigInput iconType="object" iconId="survivora" value="SortId" type="number" />
    <ConfigSelect iconType="object" iconId="survivora" value="TalkVoiceTone" optionEnum={CakTalkVoiceTone} />
</div>;
