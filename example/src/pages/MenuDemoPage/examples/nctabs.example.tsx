import { NCTabs, NCTypography, TabParameter } from '@cactus/srm-component';
import React from 'react';
import { useIntl } from 'react-intl';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

export const NCTabsExample: React.FunctionComponent = () => {
    const intl = useIntl();
    const location = useLocation();

    const basename = location.pathname;

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
        <Router basename={basename}>
            <NCTabs
                basename={basename}
                tabs={wbRoutes}
                color='#909FFF'
            />
        </Router>
    );
};
