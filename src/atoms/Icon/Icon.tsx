import React from 'react';
import { IconMask } from './IconMask';

export enum IconType {
    AddUser = 'addUser',
    Apple = 'apple',
    Back = 'back',
    Book = 'book',
    Brackets = 'brackets',
    BurgerMenu = 'burgerMenu',
    Calendar = 'calendar',
    Clip = 'clip',
    Clock = 'clock',
    Close = 'close',
    Copy = 'copy',
    Cross = 'cross',
    Crown = 'crown',
    Comments = 'comments',
    Cloud = 'cloud',
    Discord = 'discord',
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
    Heart = 'heart',
    Home = 'home',
    Info = 'info',
    Instagram = 'instagram',
    Lock = 'lock',
    Maximize = 'maximize',
    Minimize = 'minimize',
    Mobile = 'mobile',
    Move = 'move',
    Notification = 'notification',
    Pen = 'pen',
    People = 'people',
    Plus = 'plus',
    Premium = 'premium',
    Prize = 'prize',
    Search = 'search',
    Send = 'send',
    Settings = 'settings',
    Share = 'share',
    Stream = 'stream',
    Success = 'success',
    Sword = 'sword',
    Tournament = 'tournament',
    Training = 'training',
    Trashcan = 'trashcan',
    Twitch = 'twitch',
    Twitter = 'twitter',
    TwitterVerified = 'twitterVerified',
    UnavailableLocation = 'unavailableLocation',
    UploadCloud = 'uploadCloud',
    User = 'user',
    WaffleMenu = 'waffleMenu',
    Warning = 'warning',
    YouTube = 'youtube',
    AddFolder = 'addFolder',
    FileUpload = 'fileUpload',
    UpArrow = 'upArrow',
    Colapse = 'colapse',
    Pause = 'pause',
}

export interface IconProps {
    width?: number;
    height?: number;
    icon: IconType;
    styleName?: string;
    onClick?: (event: React.MouseEvent) => void;
}

export const Icon: React.FunctionComponent<IconProps> = ({
    width,
    height,
    icon,
    styleName,
    onClick,
}) => {
    return (
        <IconMask
            icon={`${process.env.REACT_APP_S3_URL}/media/icons/${icon}.svg`}
            name={icon}
            width={width}
            height={height}
            styleName={styleName}
            onClick={onClick}
        />
    );
};
