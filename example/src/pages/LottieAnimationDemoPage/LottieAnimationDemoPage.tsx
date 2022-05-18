import { NCLottieAnimation } from '@cactus/srm-component';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import './LottieAnimationDemoPage.scss';

export const LottieAnimationDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Lottie',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCLottieAnimation',
            description: '',
            component: NCLottieAnimation,
            exampleList: [
                {
                    name: 'Default',
                    props: {
                        lottieUrl: 'https://esm-dev-public.s3.amazonaws.com/media/lottie/HowToTabAnimationMobile/data.json',
                        animationDuration: 15000,
                    },
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
