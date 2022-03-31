import React from 'react';
import { NCCornerMenu, MenuVersion } from '@cactus/srm-component';
import './CornerHeaderDemoPage.scss';

export const CornerHeaderDemoPage: React.FunctionComponent = () => {
    const mapUserToAuthMenuUser = () => {
        return {
            nickname: 'Sheezeburgé',
            code: '0001',
            isPremium: false,
            id: 'a'
        };
    };
    const partnerLogo = 'https://public.nicecact.us/media/corners/wolfie/Wolfie_logo.png';
    const partnerLogoSmall = 'https://public.nicecact.us/media/corners/wolfie/small-wolf.png';
    const ncLogo = `${process.env.REACT_APP_S3_URL}/media/assets/nc-logo-horizontal-white.png`;
    const ncLogoSmall = `${process.env.REACT_APP_S3_URL}/media/assets/nc-logo-small.png`;

    const menuItems = [
        { name: 'Compete', href: '/', hash: '#compete' },
        { name: 'Ongoing', href: '/', hash: '#ongoing' },
        { name: 'News', href: '/', hash: '#news' },
        { name: 'Past tournaments', href: '/', hash: '#pastTournaments' },
    ];

    return (
        <div className='corner-footer-demo-page'>
            <h5>Can be checked in corner boilerplate
                <a className='ml-1' href='https://corner.nextcactus.gg/'>https://corner.nextcactus.gg/</a>
            </h5>
            <NCCornerMenu
                partnerLogo={partnerLogo}
                partnerLogoSmall={partnerLogoSmall}
                ncLogo={ncLogo}
                ncLogoSmall={ncLogoSmall}
                menuItems={menuItems}
                user={mapUserToAuthMenuUser()}
                onLogout={() => console.log('logout')}
                onOpenDashboard={() => console.log('opendashboard')}
                language={{
                    availlableLanguages: ['fr'],
                    selectedLanguage: 'fr',
                    onLanguageSelected: () => console.log('fr')
                }}
                variant={MenuVersion.CLASSIC}
            />

            <NCCornerMenu
                partnerLogo={partnerLogo}
                partnerLogoSmall={partnerLogoSmall}
                ncLogo={ncLogo}
                ncLogoSmall={ncLogoSmall}
                menuItems={menuItems}
                user={mapUserToAuthMenuUser()}
                onLogout={() => console.log('logout')}
                onOpenDashboard={() => console.log('opendashboard')}
                language={{
                    availlableLanguages: ['fr'],
                    selectedLanguage: 'fr',
                    onLanguageSelected: () => console.log('fr')
                }}
                variant={MenuVersion.CENTERED_LOGO}
            />
        </div>
    );
};
