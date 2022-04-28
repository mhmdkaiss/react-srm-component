import React, { useState } from 'react';
import { NCCardList } from '../../components/NCCardList/NCCardList';
import { NCHoverCard } from '../../components/NCHoverCard/NCHoverCard';

export interface NCAnimatedCardListProps {
    cards: Array<React.ReactNode>;
    cardGap?: number;
    maxCardWidth?: number;
    loadingCard?: React.ReactNode;
    scrollHook?: (scrollLeft: number) => void;
    cardClicked?: (index: number) => void;
    fullScroll?: boolean;
}

export const NCAnimatedCardList: React.FunctionComponent<NCAnimatedCardListProps> = (props: NCAnimatedCardListProps) => {
    const [ hoverCard, setHoverCard ] = useState<React.ReactNode>();

    const updateHoverCard = (cardIndex: number, cardRect: DOMRect, containerRect: DOMRect) => {
        const card = props.cards[cardIndex];
        if (!card || props.loadingCard) {
            return;
        }

        const customCard = <NCHoverCard
            card={card}
            cardRect={cardRect}
            containerRect={containerRect}
            maxCardWidth={props.maxCardWidth}
            closedHook={() => setHoverCard(undefined)}
            onClick={() => {
                if (props.cardClicked) {
                    props.cardClicked(cardIndex);
                }
            }}
        />;
        setHoverCard(customCard);
    };

    return (
        <React.Fragment>
            <NCCardList
                cards={props.loadingCard ? Array(props.cards.length || 4).fill(props.loadingCard) : props.cards}
                hoveredCard={updateHoverCard}
                scrollHook={props.scrollHook}
                cardClicked={props.cardClicked}
                fullScroll={props.fullScroll}
            />
            { hoverCard }
        </React.Fragment>
    );
};
