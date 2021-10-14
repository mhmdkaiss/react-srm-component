import React from "react";

export enum IconType {
    AddUser = 'addUser',
    Brackets = 'brackets',
    Calendar = 'calendar',
    Close = 'close',
    Crown = 'crown',
    Comments = 'comments',
    Eye = 'eye',
    EyeCrossed = 'eyeCrossed',
    Gift = 'gift',
    GoToLink = 'goToLink',
    GoToPreviousPage = 'goToPreviousPage',
    Maximize = 'maximize',
    Minimize = 'minimize',
    Move = 'move',
    People = 'people',
    Prize = 'prize',
    Search = 'search',
    Send = 'send',
    Settings = 'settings',
    Trashcan = 'trashcan',
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
    styleName
}) => {
    return (
        <div
            className={`mask-icon icon-${icon} ${styleName ? styleName : ''}`}
            style={{
                maskImage: `url("${process.env.REACT_APP_S3_URL}/media/icons/${icon}.svg")`,
                WebkitMaskImage: `url("${process.env.REACT_APP_S3_URL}/media/icons/${icon}.svg")`,
                width: width,
                height: height,
            }}
        ></div>
    );
};