import './NCHoverCard.scss';
import React, { useEffect, useRef, useState } from 'react';

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
    const maxCardWidth = props.maxCardWidth || 340;

    const scrollInit = window.scrollY;
    const [ scrollDiff, setScrollDiff ] = useState<number>(0);
    const triggerBoxRef = useRef<HTMLDivElement | null>(null);

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
    }, [props]);

    useEffect(() => {
        window.onscroll = (() => {
            setScrollDiff(scrollInit - window.scrollY);
        });

        window.onmouseup = ((e: MouseEvent) => {
            if (triggerBoxRef.current) {
                const boxSize = triggerBoxRef.current.getBoundingClientRect();
                if (
                    e.pageX < boxSize.left || e.pageX > boxSize.left + boxSize.width ||
                    e.pageY < boxSize.top || e.pageX > boxSize.top + boxSize.height
                ) {
                    startClosing();
                }
            }
        });
    }, []);

    useEffect(() => {
        return () => {
            clearTimer(timerClose);
        };
    }, [timerClose]);

    const startClosing = () => {
        setOpening(false);
        const t = setTimeout(() => {
            props.closedHook(true);
        }, 200);
        setTimerClose(t);
    };

    const clearTimer = (timer?: NodeJS.Timeout) => {
        if (timer) {
            clearTimeout(timer);
        }
    };

    return (
        <div className='nc-hover-card-container'>
            <div
                className={`nc-hover-card position-fixed ${opening ? 'opening' : 'closing'}`}
                style={{
                    left: opening ? left : props.cardRect.left,
                    top: opening ? props.cardRect.top + props.containerRect.height / 2 : props.cardRect.top,
                    marginTop: scrollDiff,
                }}
            >
                {props.card}
            </div>
            <div
                ref={triggerBoxRef}
                className='trigger-box position-fixed'
                style={{
                    left: props.cardRect.left,
                    top: props.cardRect.top,
                    width: props.cardRect.width,
                    height: props.cardRect.height,
                }}
                onMouseLeave={() => {
                    if (opening) {
                        startClosing();
                    }
                }}
            ></div>
        </div>
    );
};
