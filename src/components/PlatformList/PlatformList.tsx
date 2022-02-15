import './PlatformList.scss';
import React, { useState } from 'react';
import { ExtendedPlatform } from '../../models/Platform';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { NCCheckbox } from '../NCCheckbox/NCCheckbox';
import { IconMask } from '../../atoms/Icon/IconMask';

export interface PlatformListProps {
    platforms: Array<ExtendedPlatform>;
    onChange: ( platforms : Array<ExtendedPlatform> ) => void;
    disabled? : boolean ;
}

export const PlatformList: React.FunctionComponent<PlatformListProps> = ( { platforms, onChange, disabled = false } : PlatformListProps) => {
    const [ search, setSearch ] = useState('Various');
    const [ icon, setIcon ] = useState<string>('Pc');
    const [ isDropdownVisible, setIsDropdownVisible ] = useState(false);

    const [ platformsState, setPlatforms ] = useState( platforms );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getKeyByValue(object : any, value : string ) {
        return Object.keys(object).find(key => object[key] === value);
    }

    const tempSelectedPlatforms : Array< ExtendedPlatform > = [];

    const changeCheckbox = ( index: number) => {
        let count = 0;

        const tempPlatforms = JSON.parse(JSON.stringify( platformsState ));
        tempPlatforms[index].checked = !tempPlatforms[index].checked;

        for (let i=0; i< tempPlatforms.length ; i++){
            if (tempPlatforms[i].checked === true ) {
                count ++;
                tempSelectedPlatforms.push(tempPlatforms[i]);
            }
        }

        if (count > 1){
            setIcon('Pc');
            setSearch('Various');
        } else {
            let id = '';
            for (let i=0; i< tempPlatforms.length ; i++){
                if (tempPlatforms[i].checked === true ) {id = tempPlatforms[i].id;}
            }
            const key = getKeyByValue( IconType, id ) ? getKeyByValue( IconType, id ) ?? '' : 'Pc' ;
            setIcon(key);
            setSearch(id);
        }

        setPlatforms(tempPlatforms);
    };

    return (
        <div className="platform-style ">
            <div
                className={'main-button p-2 d-flex align-items-center' + ((isDropdownVisible) ? ' color-border' : ' d-none') }
                onClick={() => { if ( disabled === false ) {setIsDropdownVisible(!isDropdownVisible);} } }
            >
                <div className=''>
                    <IconMask
                        key={IconType[icon]}
                        icon={`${process.env.REACT_APP_S3_URL}/media/platforms/${IconType[icon]}.svg`}
                        width={20}
                        height={20}
                        name="platform"
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
                        <div key={index} className='p-1 d-flex align-items-center checkbox-div'>
                            <NCCheckbox
                                checked={element.checked}
                                onChange={() => { changeCheckbox( index); onChange(tempSelectedPlatforms);} }
                            />
                            <span className='ml-2'>{element.id}</span>
                        </div>
                    ))
                }
            </div>

        </div>

    );
};
