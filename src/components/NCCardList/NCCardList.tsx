import './NCCardList.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';

export interface NCCardListProps {
    cards: Array<React.ReactNode>;
    cardGap?: number;
}

export const NCCardList: React.FunctionComponent<NCCardListProps> = (props: NCCardListProps) => {
    const scrollableRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const cardGap = props.cardGap || 16;

    const [ leftArrow, setLeftArrow ] = useState<boolean>(false);
    const [ rightArrow, setRightArrow ] = useState<boolean>(false);
    const [ cardWidth, setCardWidth ] = useState<number>();

    useEffect(() => {
        updateArrows();
    }, [props.cards]);

    useEffect(() => {
        if (cardRef.current) {
            setCardWidth(cardRef.current.clientWidth);
        }
    }, [cardRef]);

    const updateArrows = () => {
        const scrollLeft = scrollableRef.current?.scrollLeft || 0;
        const scrollWidth = scrollableRef.current?.scrollWidth || 0;
        const containerWidth = scrollableRef.current?.getBoundingClientRect().width || 0;
        setLeftArrow(scrollLeft > 0);
        setRightArrow((scrollWidth > containerWidth) && (scrollLeft + containerWidth < scrollWidth));
    };

    const scrollContainer = (toLeft?: boolean) => {
        if (scrollableRef.current && cardWidth) {
            const scrollVal = cardWidth + cardGap / 2;
            scrollableRef.current.scrollBy({ left: toLeft ? -scrollVal : scrollVal, behavior: 'smooth' });
        }
    };

    return (
        <div className="nc-card-list position-relative">
            {
                leftArrow &&
                <div
                    className="left position-absolute d-flex align-items-center cursor-pointer"
                    onClick={() => scrollContainer(true)}
                >
                    <Icon
                        icon={IconType.GoToPreviousPage}
                        height={12}
                        width={12}
                    />
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
                            >
                                {card}
                            </div>
                        );
                    })
                }
            </div>
            {
                rightArrow &&
                <div
                    className="right position-absolute d-flex align-items-center cursor-pointer"
                    onClick={() => scrollContainer()}
                >
                    <Icon
                        icon={IconType.GoToPreviousPage}
                        height={12}
                        width={12}
                    />
                </div>
            }
        </div>
    );
};
