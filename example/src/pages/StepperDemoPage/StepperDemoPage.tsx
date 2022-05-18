import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { NCStepperExample } from './examples/ncstepper.example';
import { NCBreadcrumbExample } from './examples/ncbreadcrumb.example';

const NCStepperExampleRaw = raw('./examples/ncstepper.example.tsx');
const NCBreadcrumbExampleRaw = raw('./examples/ncbreadcrumb.example.tsx');

export const StepperDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Partner Card',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCStepper',
            description: '',
            exampleList: [
                {
                    name: 'Testing',
                    raw: NCStepperExampleRaw,
                    component: NCStepperExample,
                },
            ]
        },
        {
            name: 'NCBreadcrumb',
            description: '',
            exampleList: [
                {
                    name: 'Testing',
                    raw: NCBreadcrumbExampleRaw,
                    component: NCBreadcrumbExample,
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
