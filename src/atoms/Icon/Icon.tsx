import { IconMask } from './IconMask';
import React from 'react';

export enum IconType {
    AddUser = 'addUser',
    Back = 'back',
    Brackets = 'brackets',
    BurgerMenu = 'burgerMenu',
    Calendar = 'calendar',
    Discord = 'discord',
    Clock = 'clock',
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
    Feed = 'feed',
    Filters = 'filters',
    Gift = 'gift',
    Google = 'google',
    GoToLink = 'goToLink',
    GoToPreviousPage = 'goToPreviousPage',
    Home = 'home',
    Info = 'info',
    Instagram = 'instagram',
    Lock = 'lock',
    Maximize = 'maximize',
    Minimize = 'minimize',
    Mobile = 'mobile',
    Move = 'move',
    Notification = 'notification',
    People = 'people',
    Plus = 'plus',
    Premium = 'premium',
    Prize = 'prize',
    Search = 'search',
    Send = 'send',
    Settings = 'settings',
    Stream = 'stream',
    Success = 'success',
    Sword = 'sword',
    Tournament = 'tournament',
    Training = 'training',
    Trashcan = 'trashcan',
    Twitch = 'twitch',
    Twitter = 'twitter',
    UnavailableLocation = 'unavailableLocation',
    UploadCloud = 'uploadCloud',
    User = 'user',
    WaffleMenu = 'waffleMenu',
    Warning = 'warning',
    YouTube = 'youtube',
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
