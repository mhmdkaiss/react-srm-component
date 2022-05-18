import { NCCardList, NCPartnerCard } from '@cactus/srm-component';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { createMockPartner } from '../../mock/PartnerCard/PartnerCard.mock';

export const PartnerCardDemoPage: React.FunctionComponent = () => {
    const generateCards = () => {
        return [...Array(10)].map(() => {
            const partner = createMockPartner();
            return [<NCPartnerCard key={partner.id} partner={partner} />];
        });
    };
    const MOCK_PARTNER = createMockPartner();
    const MOCK_CARDSLIST = generateCards();

    const exampleIntro: NCExampleIntroProps = {
        title: 'Partner Card',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCPartnerCard',
            description: '',
            component: NCPartnerCard,
            exampleList: [
                {
                    renderPreview: false,
                    name: 'Simple',
                    props: {
                        partner: MOCK_PARTNER,
                    }
                },
            ]
        },
        {
            name: 'NCCardList',
            description: '',
            component: NCCardList,
            exampleList: [
                {
                    renderPreview: false,
                    name: 'Simple',
                    props: {
                        cards: MOCK_CARDSLIST,
                    }
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
