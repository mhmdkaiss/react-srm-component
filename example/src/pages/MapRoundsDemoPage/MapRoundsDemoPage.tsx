import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { MapRoundsExample } from './examples/maprounds.example';

const MapRoundsExampleRaw = raw('./examples/maprounds.example.tsx');

export const MapRoundsDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Lottie',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCMapRounds',
            description: '',
            exampleList: [
                {
                    name: 'Default',
                    raw: MapRoundsExampleRaw,
                    component: MapRoundsExample,
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
