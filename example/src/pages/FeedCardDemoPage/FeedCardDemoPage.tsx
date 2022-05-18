import { NCFeedCard } from '@cactus/srm-component';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import {
    createBOMockFeedModel,
    createTwiterMockFeedModel
} from '../../mock/FeedCard/FeedCard.mock';

export const FeedCardDemoPage: React.FunctionComponent = () => {
    const TMFM = createTwiterMockFeedModel();
    const BOMFM = createBOMockFeedModel();

    const exampleIntro: NCExampleIntroProps = {
        title: 'Feed Card',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCFeedCard',
            description: '',
            component: NCFeedCard,
            exampleList: [
                {
                    renderPreview: false,
                    name: 'Twitter feed',
                    props: {
                        data: TMFM,
                    }
                },
                {
                    renderPreview: false,
                    name: 'BO Feed',
                    props: {
                        data: BOMFM,
                    }
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
