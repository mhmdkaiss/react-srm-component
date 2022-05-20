import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../../components/NCExample/NCExamplePage';
import { StandaloneExampleItemExample } from './standalone-item.example';

const StandaloneExampleItemRaw = raw('./standalone-item.example.tsx');

export const StandaloneExampleExample: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Standalone Example',
        description: '',
        links: [],
    };
    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'Name of the section',
            description: '',
            exampleList: [
                {
                    name: 'Name of the example',
                    description: 'some nice description',
                    raw: StandaloneExampleItemRaw,
                    component: StandaloneExampleItemExample,
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
