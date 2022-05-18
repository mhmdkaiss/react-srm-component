import { NCTypography } from '@cactus/srm-component/dist';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';

export const TypographyDemoPage: React.FunctionComponent = () => {
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
                {
                    name: 'variant h2',
                    props: {
                        variant: 'h2',
                        children: 'h2',
                    }
                },
                {
                    name: 'variant h3',
                    props: {
                        variant: 'h3',
                        children: 'h3',
                    }
                },
                {
                    name: 'variant h4',
                    props: {
                        variant: 'h4',
                        children: 'h4',
                    }
                },
                {
                    name: 'variant h5',
                    props: {
                        variant: 'h5',
                        children: 'h5',
                    }
                },
                {
                    name: 'variant h6',
                    props: {
                        variant: 'h6',
                        children: 'h6',
                    }
                },
                {
                    name: 'variant body1',
                    props: {
                        variant: 'body1',
                        children: 'body1',
                    }
                },
                {
                    name: 'variant body2',
                    props: {
                        variant: 'body2',
                        children: 'body2',
                    }
                },
                {
                    name: 'variant subtitle1',
                    props: {
                        variant: 'subtitle1',
                        children: 'subtitle1',
                    }
                },
                {
                    name: 'variant subtitle2',
                    props: {
                        variant: 'subtitle2',
                        children: 'subtitle2',
                    }
                },
                {
                    name: 'variant overtitle',
                    props: {
                        variant: 'overtitle',
                        children: 'overtitle',
                    }
                },
                {
                    name: 'variant string',
                    props: {
                        variant: 'string',
                        children: 'string',
                    }
                },
                {
                    name: 'variant string',
                    props: {
                        variant: 'string',
                        children: 'string',
                    }
                },
            ]
        },
        {
            name: 'Intl',
            disabled: true,
            component: NCTypography,
            exampleList: [
                {
                    name: 'intlObj',
                    props: {
                        variant: 'h1',
                        intlObj: {
                            id: 'test-id-typography',
                            description: 'test-description-typography',
                        }
                    }
                },
                {
                    name: 'intlID/intlValues',
                    props: {
                        variant: 'h2',
                        intlID: 'test.id.values',
                        intlValues: { test: 'ouiii' },
                    }
                }
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
