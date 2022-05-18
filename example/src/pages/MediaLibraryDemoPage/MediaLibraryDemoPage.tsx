import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { NCMediaLibraryDialogExample } from './examples/medialibrary-dialog.example';
import { NCMediaLibraryExample } from './examples/medialibrary.example';

const NCMediaLibraryExampleRaw = raw('./examples/medialibrary.example.tsx');
const NCMediaLibraryDialogExampleRaw = raw('./examples/medialibrary-dialog.example.tsx');

export const MediaLibraryDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Media Library',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'MediaLibrary',
            description: '',
            exampleList: [
                {
                    name: 'Simple',
                    raw: NCMediaLibraryExampleRaw,
                    component: NCMediaLibraryExample,
                },
                {
                    name: 'Dialog',
                    raw: NCMediaLibraryDialogExampleRaw,
                    component: NCMediaLibraryDialogExample,
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
