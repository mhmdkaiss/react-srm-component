import React from 'react';
import { NCTypography } from '@cactus/srm-component';
import { NCExampleIntroProps } from '../../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../../components/NCExample/NCExamplePage';

export const PropsExampleExample: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Typography',
        description: '',
        links: [],
    };
    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCTypography',
            description: '',
            component: NCTypography,
            exampleList: [
                {
                    name: 'variant hero',
                    props: {
                        variant: 'hero',
                        children: 'hero',
                    }
                },
                {
                    name: 'variant h1',
                    props: {
                        variant: 'h1',
                        children: 'h1',
                    }
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
