import React, { useEffect, useRef, useState } from 'react';
import { Icon, IconProps, IconType } from '../../atoms/Icon/Icon';
import './NCCardList.scss';

export interface NCCardListProps {
    cards: Array<React.ReactNode>;
    cardGap?: number;
    hoveredCard?: (card: React.ReactNode, cardRect: DOMRect, containerRect: DOMRect) => void;
    scrollHook?: (scrollLeft: number) => void;
    customArrowsStyle?: IconProps;
}

export const NCCardList: React.FunctionComponent<NCCardListProps> = (props: NCCardListProps) => {
    const scrollableRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const cardGap = props.cardGap || 16;

    const [ leftArrow, setLeftArrow ] = useState<boolean>(false);
    const [ rightArrow, setRightArrow ] = useState<boolean>(false);
    const [ cardWidth, setCardWidth ] = useState<number>();
    const [ arrowIcon, setArrowIcon ] = useState<React.ReactNode>();

    const { customArrowsStyle } = props;

    const isTouchDevice = () => {
        return window.matchMedia('(any-hover: none)').matches;
    };

    const [ hoverTimer, setHoverTimer ] = useState<NodeJS.Timeout>();
    const hoverTimeout = isTouchDevice() ? 0 : 1000;

    const renderArrow = () => {
        const iconProps =
            customArrowsStyle
                ? { ...customArrowsStyle }
                : {
                    icon: IconType.GoToPreviousPage,
                    height: 12,
                    width: 12
                };
        return <Icon {...iconProps} />;
    };

    useEffect(() => {
        setArrowIcon(renderArrow());
        updateArrows();
    }, [props.cards]);

    useEffect(() => {
        window.addEventListener('resize', updateArrows);
    }, []);

    useEffect(() => {
        if (cardRef.current) {
            setCardWidth(cardRef.current.clientWidth);
        }
    }, [cardRef]);

    const updateArrows = () => {
        if (props.scrollHook && scrollableRef.current) {
            props.scrollHook(scrollableRef.current.scrollLeft);
        }
        const scrollLeft = scrollableRef.current?.scrollLeft || 0;
        const scrollWidth = scrollableRef.current?.scrollWidth || 0;
        const containerWidth = scrollableRef.current?.getBoundingClientRect().width || 0;
        setLeftArrow(scrollLeft > 0);
        setRightArrow((scrollWidth > containerWidth) && (Math.ceil(scrollLeft + containerWidth) < scrollWidth));
    };

    const scrollContainer = (toLeft?: boolean) => {
        if (scrollableRef.current && cardWidth) {
            const scrollVal = cardWidth + cardGap / 2;
            scrollableRef.current.scrollBy({ left: toLeft ? -scrollVal : scrollVal, behavior: 'smooth' });
        }
    };

    return (
        <div className="nc-card-list position-relative">
            {leftArrow &&
                <div
                    className="left position-absolute d-flex align-items-center cursor-pointer"
                    onClick={() => scrollContainer(true)}
                >
                    {arrowIcon}
                </div>
            }
            <div
                ref={scrollableRef}
                className={`scrollable-container d-flex ${leftArrow ? 'mask-left' : ''} ${rightArrow ? 'mask-right' : ''}`}
                style={{ gap: `${cardGap}px` }}
                onScroll={() => updateArrows()}
            >
                {
                    props.cards.map((card, index) => {
                        return (
                            <div
                                ref={index === 0 ? cardRef : null}
                                key={`card-container-${index}`}
                                className="card-container"
                                onMouseEnter={(e) => {
                                    if (props.hoveredCard && scrollableRef.current) {
                                        const target = e.currentTarget;
                                        const timer = setTimeout(() => {
                                            if (props.hoveredCard && scrollableRef.current && e.currentTarget) {
                                                props.hoveredCard(card, target.getBoundingClientRect(), scrollableRef.current.getBoundingClientRect());
                                            }
                                        }, hoverTimeout);
                                        setHoverTimer(timer);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (hoverTimer) {
                                        clearTimeout(hoverTimer);
                                    }
                                }}
                            >
                                {card}
                            </div>
                        );
                    })
                }
            </div>
            {rightArrow &&
                <div
                    className="right position-absolute d-flex align-items-center cursor-pointer"
                    onClick={() => scrollContainer()}
                >
                    {arrowIcon}
                </div>
            }
        </div>
    );
};
