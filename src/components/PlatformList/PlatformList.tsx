import React, { useEffect, useState } from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { IconMask } from '../../atoms/Icon/IconMask';
import { ExtendedPlatform } from '../../models/Platform';
import { NCCheckbox } from '../NCCheckbox/NCCheckbox';
import './PlatformList.scss';

export interface PlatformListProps {
    platforms: Array<ExtendedPlatform>;
    onChange: ( platforms : Array<ExtendedPlatform> ) => void;
    singlePlatform?: boolean;
    disabled? : boolean ;
}

enum IconsPlatforms {
    Ps4 = 'ps4',
    Ps5 = 'ps5',
    Mobile = 'mobile',
    Pc = 'pc',
    Switch = 'switch',
    Xbox = 'xbox',
    Pcmobile = 'pc-mobile'
}

export const PlatformList: React.FunctionComponent<PlatformListProps> = ( { platforms, onChange, singlePlatform, disabled = false } : PlatformListProps) => {
    const [ search, setSearch ] = useState('Various');
    const [ icon, setIcon ] = useState<string>('Pc');
    const [ isDropdownVisible, setIsDropdownVisible ] = useState(false);

    const [ platformsState, setPlatformsState ] = useState( platforms );
    const tempSelectedPlatforms : Array<ExtendedPlatform> = [];

    useEffect(() => {
        if (platforms.length > 0) {
            changeCheckbox();
        }
    }, [platforms]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getKeyByValue(object : any, id : string ) {
        return Object.keys(object).find(key => object[key] === id);
    }

    const initialPlatforms = (index?: number) => {
        if (singlePlatform ) {
            return (index !== undefined)? platforms.map((e) => ({ ...e, checked: false }) ) : platforms;
        } else {
            return platformsState;
        }
    };

    const changeCheckbox = ( index?: number) => {
        let count = 0;
        const tempPlatforms = JSON.parse(JSON.stringify(initialPlatforms(index)));

        if (index !== undefined) {
            tempPlatforms[index].checked = !tempPlatforms[index].checked;
        }

        for (let i=0; i< tempPlatforms.length ; i++){
            if (tempPlatforms[i].checked) {
                count ++;
                tempSelectedPlatforms.push(tempPlatforms[i]);
            }
        }

        if (count > 1){
            setIcon('Pc');
            setSearch('Various');
        } else {
            const id = tempPlatforms.find((element: ExtendedPlatform) => element.checked)?.id || '';
            const key = getKeyByValue( IconsPlatforms, id ) ?? 'Pc' ;
            setIcon(key);
            setSearch(id);
        }

        setPlatformsState(tempPlatforms);
    };

    const clickPlatform = (index: number) => {
        if (singlePlatform) {
            changeCheckbox(index);
            onChange(tempSelectedPlatforms);
        }
    };

    return (
        <div className="platform-style ">
            <div
                className={'main-button p-2 d-flex align-items-center' + ((isDropdownVisible) ? ' color-border' : ' d-none') }
                onClick={() => { if ( disabled === false ) {setIsDropdownVisible(!isDropdownVisible);} } }
            >
                <div className=''>
                    <IconMask
                        key={IconsPlatforms[icon]}
                        icon={`${process.env.REACT_APP_S3_URL}/media/platforms/${IconsPlatforms[icon]}.svg`}
                        width={20}
                        height={20}
                        name="platform"
                        styleName='icons-background'
                    />
                </div>
                <div className='mx-auto' >
                    {search}
                </div >
                <div>
                    <Icon icon={IconType.Colapse} width={12} height={6} styleName='icons-background'/>
                </div>
            </div>

            <div className={'platform-dropdown dropdown ' + ((isDropdownVisible) ? '' : 'd-none')} >
                {
                    platformsState.map((element, index) => (
                        <div key={index}
                            className={'p-1 d-flex align-items-center ' + `${singlePlatform ? 'select-div' : ''} ` }
                            onClick={() => clickPlatform(index) }
                        >
                            { !singlePlatform && <NCCheckbox
                                checked={element.checked}
                                onChange={() => { changeCheckbox(index); onChange(tempSelectedPlatforms);} }
                            />}
                            <span className='ml-2'>{element.id}</span>
                        </div>
                    ))
                }
            </div>

        </div>

    );
};
