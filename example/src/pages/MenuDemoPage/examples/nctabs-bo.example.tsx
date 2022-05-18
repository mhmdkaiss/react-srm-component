import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { NCTypography, NCTabs } from '@cactus/srm-component';
import { TabParameter } from '@cactus/srm-component/src/components/Tabs/Tabs';

export const NCTabsBoExample: React.FunctionComponent = () => {
    const location = useLocation();

    const basename = location.pathname;

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
    return (
        <Router basename={basename}>
            <NCTabs
                basename={basename}
                tabs={boRoutes}
                variant='bo'
            />
        </Router>
    );
};
