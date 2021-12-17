import './NCHoverCard.scss';
import React, { useEffect, useState } from 'react';

export interface NCHoverCardProps {
    card: React.ReactNode,
    cardRect: DOMRect,
    containerRect: DOMRect,
    maxCardWidth?: number,
    closedHook: (closed: boolean) => void,
}

export const NCHoverCard: React.FunctionComponent<NCHoverCardProps> = (props: NCHoverCardProps) => {
    const [ opening, setOpening ] = useState<boolean>();
    const [ left, setLeft ] = useState<number>(props.cardRect.left);
    const [ timerClose, setTimerClose ] = useState<NodeJS.Timeout>();
    const [ timerDelete, setTimerDelete ] = useState<NodeJS.Timeout>();
    const maxCardWidth = props.maxCardWidth || 340;

    useEffect(() => {
        setOpening(true);

        const centered = props.cardRect.left - maxCardWidth / 4;
        if (centered < props.containerRect.left) {
            setLeft(props.containerRect.left);
        } else {
            const maxLeft = props.containerRect.left + props.containerRect.width - maxCardWidth;
            if (centered > maxLeft) {
                setLeft(maxLeft);
            } else {
                setLeft(centered);
            }
        }

        if (!isTouchDevice()) {
            const t = setTimeout(() => {
                startClosing();
            }, 200);
            setTimerClose(t);
        }
    }, [props]);

    useEffect(() => {
        window.onscroll = (() => {
            startClosing();
        });
    }, []);

    useEffect(() => {
        return () => {
            clearTimer(timerClose);
            clearTimer(timerDelete);
        };
    }, [ timerClose, timerDelete ]);

    const startClosing = () => {
        setOpening(false);
        const t = setTimeout(() => {
            props.closedHook(true);
        }, 200);
        setTimerDelete(t);
    };

    const clearTimer = (timer?: NodeJS.Timeout) => {
        if (timer) {
            clearTimeout(timer);
        }
    };

    const isTouchDevice = () => {
        return window.matchMedia('(any-hover: none)').matches;
    };

    return (
        <div
            className={`nc-hover-card position-fixed ${opening ? 'opening' : 'closing'}`}
            style={{
                left: opening ? left : props.cardRect.left,
                top: opening ? props.cardRect.top + props.containerRect.height / 2 : props.cardRect.top,
            }}
            onMouseLeave={() => {
                if (opening) {
                    startClosing();
                }
            }}
            onMouseMove={() => {
                clearTimer(timerClose);
            }}
        >
            {props.card}
        </div>
    );
};
