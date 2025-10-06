import React, { useContext } from 'react';
import { ConfigInput } from '../Inputs/ConfigInput';
import { ConfigSelect } from '../Inputs/ConfigSelect';
import { CakTalkVoiceModel, CakTalkVoiceType, DemoBindName, LeafFaceId, NpcBodyType, NpcFaceType, NpcHairType, NpcInfoKey, NpcPlayerColorType, NpcSkinColorType } from '../../../api/types';
import { ConfigContext } from '../ConfigContext';

export const NpcInfo = () => {
    const { config, configData, selectedRow } = useContext(ConfigContext);
    let data = configData[config.name][selectedRow];

    return <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
        <ConfigSelect iconType="object" iconId="survivora" value="BodyId" optionEnum={NpcBodyType} nested={"EditData"} />
        <ConfigInput iconType="object" iconId="survivora" value="bDispHelm" type="checkbox" nested={"EditData"} />
        <ConfigInput iconType="object" iconId="survivorleaf" value="bLeafBody" type="checkbox" nested={"EditData"} />
        <ConfigInput iconType="object" iconId="survivorleaf" value="bLeafParts" type="checkbox" nested={"EditData"} />
        <ConfigInput iconType="object" iconId="survivora" value="bUseHairColor" type="checkbox" nested={"EditData"} />
        <ConfigInput iconType="object" iconId="survivorleaf" value="bUseLeafNpcColor" type="checkbox" nested={"EditData"} />
        <ConfigInput iconType="object" iconId="survivora" value="bChangePartsFromBodyColor" type="checkbox" nested={"EditData"} />
        <ConfigSelect iconType="object" iconId="survivora" value="DemoBindName" optionEnum={Object.fromEntries(DemoBindName.map(v => [v, v]))} />
        <ConfigSelect iconType="object" iconId="survivora" value="FaceId" optionEnum={NpcFaceType} nested={"EditData"} />
        <ConfigSelect iconType="object" iconId="survivora" value="HairColorId" optionEnum={NpcPlayerColorType} nested={"EditData"} />
        <ConfigSelect iconType="object" iconId="survivora" value="HairId" optionEnum={NpcHairType} nested={"EditData"} />
        <ConfigInput iconType="object" iconId="survivora" value="IconIndex" type="number" />
        <ConfigSelect iconType="icon" iconId={data.EditData.LeafFaceId.slice(14, 25)} value="LeafFaceId" optionEnum={LeafFaceId} nested={"EditData"} />
        <ConfigSelect iconType="object" iconId="survivora" value="NameMsgId" optionEnum={Object.fromEntries(NpcInfoKey.map(v => [v, v]))} />
        <ConfigSelect iconType="object" iconId="survivora" value="PlayerColorId" optionEnum={NpcPlayerColorType} nested={"EditData"} />
        <ConfigSelect iconType="icon" iconId={data.EditData.SkinColorId.slice(19, 35)} value="SkinColorId" optionEnum={NpcSkinColorType} nested={"EditData"} />
        <ConfigSelect iconType="object" iconId="survivora" value="TalkVoiceId" optionEnum={CakTalkVoiceType} nested={"EditData"} />
        <ConfigSelect iconType="object" iconId="survivora" value="TalkVoiceModel" optionEnum={CakTalkVoiceModel} nested={"EditData"} />
    </div>;
}

