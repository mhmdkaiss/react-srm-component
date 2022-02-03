import { NCTabs, NCTypography, Tabs } from '@cactus/srm-component';
import { TabParameter } from '@cactus/srm-component/dist/src/components/Tabs/Tabs';
import React from 'react';
import { useIntl } from 'react-intl';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';

export const MenuDemoPage: React.FunctionComponent = () => {
    const intl = useIntl();

    const basename = '/component/menu';

    const boRoutes: Array<TabParameter> = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            component: <NCTypography variant="span">TournamentHome</NCTypography>,
        },
        {
            name: 'Tournament list',
            path: '/list',
            disabled: true,
            component: <NCTypography variant="span">TournamentList</NCTypography>,
        },
        {
            name: 'Tournament',
            path: '/details/:id',
            component: <NCTypography variant="span">TournamentList</NCTypography>,
            hide: true,
        },
        {
            name: 'Refereeing category',
            component: <NCTypography variant="span">NCDefault</NCTypography>,
            disabled: true,
            path: '/refereeing',
            children: [
                {
                    name: 'Tournament refereeing list',
                    path: '/list',
                    internalLink: '/tournaments/referee-list',
                },
                {
                    name: 'Match refereeing list',
                    path: '/match/list',
                    internalLink: '/tournaments/refereeing/matchs/list',
                },
            ],
        },
        {
            name: 'Templater',
            path: '/templater',
            component: <NCTypography variant="span">NCDefault</NCTypography>,
            disabled: true,
        },
        {
            name: 'Settings',
            path: '/settings',
            children: [
                {
                    name: 'Rules',
                    path: '/rules',
                    children: [
                        {
                            name: 'Rule Creation',
                            path: '/create',
                            component: <NCTypography variant="span">TournamentRulesDetail</NCTypography>,
                            hide: true,
                        },
                        {
                            name: 'Rule Management',
                            path: '/:ruleID',
                            component: <NCTypography variant="span">TournamentRulesDetail</NCTypography>,
                            hide: true,
                        },
                        {
                            name: 'Rules List',
                            path: '/',
                            component: <NCTypography variant="span">TournamentRulesList</NCTypography>,
                        },
                    ],
                },
                {
                    name: 'Game options',
                    path: '/game-options',
                    component: <NCTypography variant="span">GameOptions</NCTypography>,
                },
                {
                    name: 'Match settings',
                    path: '/match-settings',
                    children: [
                        {
                            name: 'Match setting detail',
                            path: '/:matchSettingsId/:route/:ruleId',
                            component: <NCTypography variant="span">MatchSettingsDetail</NCTypography>,
                            hide: true,
                        },
                        {
                            name: 'Match settings List',
                            path: '/',
                            component: <NCTypography variant="span">MatchSettings</NCTypography>,
                        },
                    ],
                },
                {
                    name: 'Game settings',
                    path: '/game-settings',
                    component: <NCTypography variant="span">NCDefault</NCTypography>,
                    disabled: true,
                },
                {
                    name: 'Model weeks',
                    path: '/weeks-model',
                    component: <NCTypography variant="span">NCDefault</NCTypography>,
                    disabled: true,
                },
            ],
        },
        {
            name: 'Default Redirection',
            hide: true,
            path: '/',
            redirect: '/dashboard',
        },
    ];

    const wbRoutes: Array<TabParameter> = [
        {
            name: intl.formatMessage({ id: 'tournament.tabs.overview' }),
            path: '/:tournamentId/overview',
            component: <NCTypography variant="span">NCDefault</NCTypography>,
        },
        {
            name: intl.formatMessage({ id: 'tournament.tabs.matchs' }),
            path: '/:tournamentId/matchs',
            component: <NCTypography variant="span">NCDefault</NCTypography>,
            disabled: true,
        },
        {
            name: intl.formatMessage({ id: 'tournament.tabs.rules' }),
            path: '/:tournamentId/rules',
            component: <NCTypography variant="span">NCDefault</NCTypography>,
        },
        {
            name: intl.formatMessage({ id: 'tournament.tabs.bracket' }),
            path: '/:tournamentId/bracket',
            component: <NCTypography variant="span">NCDefault</NCTypography>,
        },
        {
            name: intl.formatMessage({ id: 'tournament.tabs.participants' }),
            path: '/:tournamentId/participants',
            component: <NCTypography variant="span">NCDefault</NCTypography>,

        },
        {
            name: intl.formatMessage({ id: 'tournament.tabs.howto' }),
            path: '/:tournamentId/howto',
            component: <NCTypography variant="span">NCDefault</NCTypography>,
        },
        {
            name: 'Default Redirection',
            hide: true,
            path: '/:tournamentId/',
            redirect: '/:tournamentId/overview',
        }
    ];

    return (
        <div
            className='menu-demo-page'
            style={{
                minWidth: '1300px',
            }}
        >
            <Router basename={basename}>
                <NCTypography variant='h1'>Tabs</NCTypography>
                <Tabs
                    basename={basename}
                    tabs={boRoutes}
                    NcRouterLink={NavLink}
                />
                <NCTypography variant='h1'>NCTabs:bo</NCTypography>
                <NCTabs
                    basename={basename}
                    tabs={boRoutes}
                    variant='bo'
                />
                <NCTypography variant='h1'>NCTabs:default</NCTypography>
                <NCTabs
                    basename={basename}
                    tabs={wbRoutes}
                    color='#909FFF'
                />
            </Router>
        </div>
    );
};
