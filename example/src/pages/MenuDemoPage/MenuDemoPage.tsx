import { NCTabs } from '@cactus/srm-component';
import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { NCTabsBoExample } from './examples/nctabs-bo.example';
import { NCTabsExample } from './examples/nctabs.example';

const NCTabsExampleRaw = raw('./examples/nctabs.example.tsx');
const NCTabsBoExampleRaw = raw('./examples/nctabs-bo.example.tsx');

export const MenuDemoPage: React.FunctionComponent = (props) => {
    console.log('MenuDemoPage', props);
    const exampleIntro: NCExampleIntroProps = {
        title: 'Lists',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCList',
            description: '',
            component: NCTabs,
            exampleList: [
                {
                    name: 'NCTabs',
                    raw: NCTabsExampleRaw,
                    component: NCTabsExample,
                },
                {
                    name: 'NCTabs - bo',
                    raw: NCTabsBoExampleRaw,
                    component: NCTabsBoExample,
                }
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
