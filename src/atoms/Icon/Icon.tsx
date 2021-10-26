import React from 'react';
import { IconMask } from './IconMask'

export enum IconType {
    AddUser = 'addUser',
    Brackets = 'brackets',
    BurgerMenu = 'burgerMenu',
    Calendar = 'calendar',
    Discord = 'discord',
    Close = 'close',
    Copy = 'copy',
    Cross = 'cross',
    Crown = 'crown',
    Comments = 'comments',
    Cloud = 'cloud',
    Error = 'error',
    Eye = 'eye',
    EyeCrossed = 'eyeCrossed',
    Facebook = 'facebook',
    Gift = 'gift',
    GoToLink = 'goToLink',
    GoToPreviousPage = 'goToPreviousPage',
    Instagram = 'instagram',
    Maximize = 'maximize',
    Minimize = 'minimize',
    Move = 'move',
    People = 'people',
    Plus = 'plus',
    Premium = 'premium',
    Prize = 'prize',
    Search = 'search',
    Send = 'send',
    Settings = 'settings',
    Trashcan = 'trashcan',
    Twitter = 'twitter',
    UploadCloud = 'uploadCloud',
    User = 'user',
    WaffleMenu = 'waffleMenu',
    Warning = 'warning',
}

export interface IconProps {
    width?: number;
    height?: number;
    icon: IconType;
    styleName?: string;
}

export const Icon: React.FunctionComponent<IconProps> = ({
    width,
    height,
    icon,
    styleName,
}) => {
    return (
        <IconMask icon={`${process.env.REACT_APP_S3_URL}/media/icons/${icon}.svg`} name={icon} width={width} height={height} styleName={styleName}/>
    );
};