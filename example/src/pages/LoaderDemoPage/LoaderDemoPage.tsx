import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { NCLoaderImageExample } from './examples/ncloader-image.example';
import { NCLoaderExample } from './examples/ncloader.example';

const NCLoaderExampleRaw = raw('./examples/ncloader.example.tsx');
const NCLoaderImageExampleRaw = raw('./examples/ncloader-image.example.tsx');

export const LoaderDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Loaders',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCLoader',
            description: '',
            exampleList: [
                {
                    name: 'Default',
                    raw: NCLoaderExampleRaw,
                    component: NCLoaderExample,
                },
                {
                    name: 'Image',
                    raw: NCLoaderImageExampleRaw,
                    component: NCLoaderImageExample,
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
