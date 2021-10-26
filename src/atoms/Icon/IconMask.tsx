import React from "react";

interface IconMaskProps {
    width?: number;
    height?: number;
    name: string;
    icon: string;
    styleName?: string;
}

export const IconMask: React.FunctionComponent<IconMaskProps> = ({
    width,
    height,
    name,
    icon,
    styleName
}) => {
    return (
        <div
            className={`mask-icon icon-${name} ${styleName ? styleName : ''}`}
            style={{
                maskImage: `url("${icon}")`,
                WebkitMaskImage: `url("${icon}")`,
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