import React from 'react';
import { NCCornerFooter, SocialEnum } from '@cactus/srm-component';

import './CornerFooterDemoPage.scss';

export const CornerFooterDemoPage: React.FunctionComponent = () => {
    const logos = [
        {
            url: 'https://zeop.nicecactus.gg/',
            image: 'https://zeop.nicecactus.gg/corner/zeop/footer/zeop.svg',
        },
        {
            url: 'https://nextcactus.gg',
            image: 'https://zeop.nicecactus.gg/corner/zeop/footer/nicecactus.svg',
        }
    ];
    const links = [
        {
            name: 'corner.footer.legal', // If key exist it will be translated
            url: 'https://nicecactus.gg/legal-notice'
        },
        {
            name: 'Terms of use',
            url: 'https://nicecactus.gg/terms-of-use'
        },
        {
            name: 'Privacy',
            url: 'https://nicecactus.gg/privacy'
        }
    ];
    const social = [
        {
            type: SocialEnum.Twitch,
            url: 'http://twitch.com'
        },
        {
            type: SocialEnum.YouTube,
            url: 'https://www.youtube.com/watch?v=6Lq_4xfG1xQ'
        }
    ];

    return (
        <div className='corner-footer-demo-page'>
            <h5>Can be checked in corner boilerplate
                <a className='ml-1' href='https://corner.nextcactus.gg/'>https://corner.nextcactus.gg/</a>
            </h5>
            <NCCornerFooter logos={logos} links={links} social={social} >Custom content</NCCornerFooter>
        </div>
    );
};

