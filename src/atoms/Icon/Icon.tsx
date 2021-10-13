import React from "react";

export enum IconType {
    Comments = 'comments',
    Send = 'send',
    Close = 'close',
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