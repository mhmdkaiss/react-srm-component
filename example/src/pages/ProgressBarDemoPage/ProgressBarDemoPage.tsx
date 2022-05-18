import { NCProgressBar } from '@cactus/srm-component';
import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { ProgressBarInputExample } from './examples/progressbar-input.example';

const ProgressBarInputExampleRaw = raw('./examples/progressbar-input.example.tsx');

export const ProgressBarDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Partner Card',
        description: '',
        links: [],
    };

    const customColor = '#4169E1';

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCProgressBar',
            description: '',
            component: NCProgressBar,
            exampleList: [
                {
                    name: 'Simple',
                    props: {
                        width: '20%',
                    }
                },
                {
                    name: 'Custom color 18%',
                    props: {
                        width: '20%',
                        ratio: 0.18,
                        color: customColor,
                    }
                },
                {
                    name: '50%',
                    props: {
                        width: '20%',
                        ratio: 0.5,
                    }
                },
                {
                    name: 'Input',
                    raw: ProgressBarInputExampleRaw,
                    component: ProgressBarInputExample,
                }
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
