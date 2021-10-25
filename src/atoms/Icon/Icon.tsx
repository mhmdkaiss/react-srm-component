import React from 'react';

export enum IconType {
    AddUser = 'addUser',
    Brackets = 'brackets',
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
    Warning = 'warning',
}

export interface IconProps {
    width: number;
    height: number;
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
        <div
            className={`mask-icon icon-${icon} ${styleName ? styleName : ''}`}
            style={{
                maskImage: `url("${process.env.REACT_APP_S3_URL}/media/icons/${icon}.svg")`,
                WebkitMaskImage: `url("${process.env.REACT_APP_S3_URL}/media/icons/${icon}.svg")`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                width: width,
                height: height,
            }}
        ></div>
    );
};
