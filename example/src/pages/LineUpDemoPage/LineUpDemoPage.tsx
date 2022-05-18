import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { NCLineUpExample } from './examples/lineup.example';

const NCLineUpExampleRaw = raw('./examples/lineup.example.tsx');

export const LineUpDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Partner Card',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCLineUpExample',
            description: '',
            exampleList: [
                {
                    name: 'Simple',
                    raw: NCLineUpExampleRaw,
                    component: NCLineUpExample,
                }
            ]
        }
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
