import { NCPromotionalBanner, NCPromotionalBannerProps } from '@cactus/srm-component';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';

export const PromotionnalBannerDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Partner Card',
        description: '',
        links: [],
    };

    const checkNCPromotionalBannerProps = (props: NCPromotionalBannerProps) => {
        return props;
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCPromotionalBanner',
            description: '',
            component: NCPromotionalBanner,
            exampleList: [
                {
                    name: 'Image',
                    props: checkNCPromotionalBannerProps({
                        image: 'https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover',
                    })
                },
                {
                    name: 'Image Text',
                    props: checkNCPromotionalBannerProps({
                        image: 'https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover',
                        text: ['this is a banner without button'],
                    })
                },
                {
                    name: 'Image Text ButtonLink',
                    props: checkNCPromotionalBannerProps({
                        image: 'https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover',
                        text: ['this is a banner without button and there is a link'],
                        buttonLink: 'https://www.google.com/',
                    })
                },
                {
                    name: 'Image Text ButtonText ButtonLink',
                    props: checkNCPromotionalBannerProps({
                        image: 'https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover',
                        text: ['this is a banner with button and also a link. And man this is a long text. I need it for test. Like yea look it up. It is a very long text. I could make it longer but it needs to stop right here. Thank you'],
                        buttonText: 'Test',
                        buttonLink: 'https://www.google.com/',
                    })
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
