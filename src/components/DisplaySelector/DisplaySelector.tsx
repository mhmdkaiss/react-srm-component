import './DisplaySelector.scss';

import React, { useState } from 'react';

import { ButtonIcon } from '../../atoms/Button/ButtonIcon';
import { ButtonSize } from '../../atoms/Button/Button';

export enum DisplayList {
    List=0,
    Waffle=1
}

export interface DisplaySelectorProps {
  onChange: (type: DisplayList) => void,
  defaultValue?: DisplayList
}

export const DisplaySelector: React.FunctionComponent<DisplaySelectorProps> = (props: DisplaySelectorProps) => {
    const [ selected, setSelected ] = useState<DisplayList>(props.defaultValue || 0);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selectedValue = parseInt(event.currentTarget.value);
        setSelected(selectedValue);
        props.onChange(selectedValue);
    };

    return (
        <div className='displaylist'>
            <ButtonIcon value={DisplayList.List.toString()} size={ButtonSize.MEDIUM} icon={`${process.env.REACT_APP_S3_URL}/media/icons/burgerMenu.svg`} name="list" active={selected === DisplayList.List} onClick={(e) => handleClick(e)} key={DisplayList.List}/>
            <ButtonIcon value={DisplayList.Waffle.toString()} size={ButtonSize.MEDIUM} icon={`${process.env.REACT_APP_S3_URL}/media/icons/waffleMenu.svg`} name="waffle" active={selected === DisplayList.Waffle} onClick={(e) => handleClick(e)} key={DisplayList.Waffle}/>
        </div>
    );
};
