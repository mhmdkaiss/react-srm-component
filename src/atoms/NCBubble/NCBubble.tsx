import React, { useEffect, useState } from 'react';
import * as NCColors from '../../styles/NCColors';
import './NCBubble.scss';

interface NCBubbleProps {
    content: {
        text: string;
        size?: number;
        color?: string;
    };
    size?: number
    color?: string;
    onClick?: (value: string, active: boolean) => void;
    activeStyle?: string;
    isActive?: boolean;
}

export const NCBubble: React.FunctionComponent<NCBubbleProps> = (
    props: NCBubbleProps
) => {
    const [ active, setActive ] = useState<boolean>();
    const { content, isActive, onClick } = props;

    useEffect(() => {
        setActive(isActive);
    }, [isActive]);

    const size = props.size ? props.size : 32;
    const bubbleStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderColor: props.color ? props.color : NCColors.grey5
    };
    const contentSize = content.size ? content.size : 12;
    const contentStyle = {
        color: content.color ? content.color : NCColors.grey6,
        fontSize: `${contentSize}px`,
    };

    const activeStyle = props.activeStyle ? props.activeStyle : 'default-bubble-active';

    const activeBubble = () => {
        const updateActive = !active;
        setActive(updateActive);

        if (onClick) {
            onClick(content.text, updateActive);
        }
    };

    return (
        <div
            className={`nc-bubble ${onClick && 'clickable'} ${active && activeStyle}`}
            style={bubbleStyle}
            onClick={activeBubble}
        >
            <p className='nc-bubble-content' style={contentStyle}>
                {content.text}
            </p>
        </div>
    );
};
