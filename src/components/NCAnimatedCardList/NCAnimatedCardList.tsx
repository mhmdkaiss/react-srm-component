import React, { useState } from 'react';
import { NCCardList } from '../../components/NCCardList/NCCardList';
import { NCHoverCard } from '../../components/NCHoverCard/NCHoverCard';

export interface NCAnimatedCardListProps {
    cards: Array<React.ReactNode>;
    cardGap?: number;
    maxCardWidth?: number;
}

export const NCAnimatedCardList: React.FunctionComponent<NCAnimatedCardListProps> = (props: NCAnimatedCardListProps) => {
    const [ hover1, setHover1 ] = useState<React.ReactNode>();
    const [ hover2, setHover2 ] = useState<React.ReactNode>();
    const [ hover3, setHover3 ] = useState<React.ReactNode>();
    const [ hover4, setHover4 ] = useState<React.ReactNode>();

    const updateHoverCards = (card: React.ReactNode, cardRect: DOMRect, containerRect: DOMRect) => {
        if (addHoverCard(hover1, setHover1, card, cardRect, containerRect)) {
            return;
        }

        if (addHoverCard(hover2, setHover2, card, cardRect, containerRect)) {
            return;
        }

        if (addHoverCard(hover3, setHover3, card, cardRect, containerRect)) {
            return;
        }

        if (addHoverCard(hover4, setHover4, card, cardRect, containerRect)) {
            return;
        }
    };

    const addHoverCard = (state: React.ReactNode, setStateFunction: React.Dispatch<React.SetStateAction<React.ReactNode>>, card: React.ReactNode, cardRect: DOMRect, containerRect: DOMRect): boolean => {
        if (!state) {
            const hoverCard = <NCHoverCard
                card={card}
                cardRect={cardRect}
                containerRect={containerRect}
                maxCardWidth={props.maxCardWidth}
                closedHook={() => {
                    setStateFunction(undefined);
                }}
            />;
            setStateFunction(hoverCard);
            return true;
        }
        return false;
    };

    return (
        <React.Fragment>
            <NCCardList
                cards={props.cards}
                hoveredCard={updateHoverCards}
            />
            {
                hover1
            }
            {
                hover2
            }
            {
                hover3
            }
            {
                hover4
            }
        </React.Fragment>
    );
};
