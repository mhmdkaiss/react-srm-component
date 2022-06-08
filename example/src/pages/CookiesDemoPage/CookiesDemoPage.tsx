import { NCCookies, NCCookiesConsent } from '@cactus/srm-component';

import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import React from 'react';

export const CookiesDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Cookies',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCookies',
            description: 'Delete cookies and refresh page to see the modal',
            component: NCCookies,
            exampleList: [
                {
                    name: 'Simple',
                    props: {},
                }
            ],
        },
        {
            name: 'NCCookiesConsent',
            component: NCCookiesConsent,
            exampleList: [
                {
                    name: 'Simple',
                    props: {},
                }
            ],
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
