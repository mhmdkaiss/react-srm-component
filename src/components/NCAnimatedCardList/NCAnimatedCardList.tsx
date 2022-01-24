import React, { useState } from 'react';
import { NCCardList } from '../../components/NCCardList/NCCardList';
import { NCHoverCard } from '../../components/NCHoverCard/NCHoverCard';

export interface NCAnimatedCardListProps {
    cards: Array<React.ReactNode>;
    cardGap?: number;
    maxCardWidth?: number;
    loadingCard?: React.ReactNode;
    scrollHook?: (scrollLeft: number) => void;
}

export const NCAnimatedCardList: React.FunctionComponent<NCAnimatedCardListProps> = (props: NCAnimatedCardListProps) => {
    const [ hoverCard, setHoverCard ] = useState<React.ReactNode>();

    const updateHoverCard = (card: React.ReactNode, cardRect: DOMRect, containerRect: DOMRect) => {
        if (!card || props.loadingCard) {
            return;
        }

        const customCard = <NCHoverCard
            card={card}
            cardRect={cardRect}
            containerRect={containerRect}
            maxCardWidth={props.maxCardWidth}
            closedHook={() => setHoverCard(undefined)}
        />;
        setHoverCard(customCard);
    };

    return (
        <React.Fragment>
            <NCCardList
                cards={props.loadingCard ? Array(Math.floor(Math.random() * 3 + 4)).fill(props.loadingCard) : props.cards}
                hoveredCard={updateHoverCard}
                scrollHook={props.scrollHook}
            />
            { hoverCard }
        </React.Fragment>
    );
};
