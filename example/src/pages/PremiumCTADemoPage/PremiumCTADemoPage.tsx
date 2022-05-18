import { NCPremiumCTA } from '@cactus/srm-component';
import React from 'react';
import { useHistory } from 'react-router';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';

export const PremiumCTADemoPage: React.FunctionComponent = () => {
    const history = useHistory();

    const onPremiumClick = () => {
        history.push('/premium');
    };

    const exampleIntro: NCExampleIntroProps = {
        title: 'Partner Card',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCPartnerCard',
            description: '',
            component: NCPremiumCTA,
            exampleList: [
                {
                    name: 'bg-promote',
                    props: {
                        image: 'https://nicecactus.gg/assets/img/premium/bg-promote-2.jpg',
                        staticText: 'Get premium now for unlimited access to Trainings, fast cash prize payments, and many other features.',
                        dynamicText: 'Increase your chances of',
                        dynamicTextValues: [ 'win tournaments', 'leave elo hell', 'progress faster', 'reach top level' ],
                        setClick: () => onPremiumClick(),
                    }
                },
                {
                    name: 'training-cover',
                    props: {
                        image: 'https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover',
                        staticText: 'Get premium now for unlimited access to Trainings, fast cash prize payments, and many other features.',
                        dynamicText: 'Increase your chances of',
                        dynamicTextValues: [ 'win tournaments', 'leave elo hell', 'progress faster', 'reach top level' ],
                        setClick: () => onPremiumClick(),
                    }
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
