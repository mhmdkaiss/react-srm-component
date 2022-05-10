import './App.scss';

import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import { AuthFormDemoPage } from './pages/AuthFormDemoPage/AuthFormDemoPage';
import { BubblesDemoPage } from './pages/BubblesDemoPage/BubblesDemoPage';
import { ButtonsDemoPage } from './pages/ButtonsDemoPage/ButtonsDemoPage';
import { CalendarDemoPage } from './pages/CalendarDemoPage/CalendarDemoPage';
import { ChallengeCardDemoPage } from './pages/ChallengeCardDemoPage/ChallengeCardDemoPage';
import ContextStore from './store';
import { CookiesDemoPage } from './pages/CookiesDemoPage/CookiesDemoPage';
import { CornerFooterDemoPage } from './pages/CornerFooterDemoPage/CornerFooterDemoPage';
import { CornerHeaderDemoPage } from './pages/CornerHeaderDemoPage/CornerHeaderDemoPage';
import { DialogDemoPage } from './pages/DialogDemoPage/DialogDemoPage';
import { DivWithBackgroundDemoPage } from './pages/DivWithBackgroundDemoPage/DivWithBackgroundDemoPage';
import { FeedCardDemoPage } from './pages/FeedCardDemoPage/FeedCardDemoPage';
import { HeadersDemoPage } from './pages/HeadersDemoPage/HeadersDemoPage';
import { InputDemoPage } from './pages/InputDemoPage/InputDemoPage';
import { LineUpDemoPage } from './pages/LineUpDemoPage/LineUpDemoPage';
import { ListDemoPage } from './pages/ListDemoPage/ListDemoPage';
import { LoaderDemoPage } from './pages/LoaderDemoPage/LoaderDemoPage';
import { LottieAnimationDemoPage } from './pages/LottieAnimationDemoPage/LottieAnimationDemoPage';
import { MediaLibraryDemoPage } from './pages/MediaLibraryDemoPage/MediaLibraryDemoPage';
import { MenuDemoPage } from './pages/MenuDemoPage/MenuDemoPage';
import { Navigation } from './components/Navigation/Navigation';
import { PartnerCardDemoPage } from './pages/PartnerCardDemoPage/PartnerCardDemoPage';
import { PremiumCTADemoPage } from './pages/PremiumCTADemoPage/PremiumCTADemoPage';
import { ProgressBarDemoPage } from './pages/ProgressBarDemoPage/ProgressBarDemoPage';
import { PromotionnalBannerDemoPage } from './pages/PromotionnalBannerDemoPage/PromotionnalBannerDemoPage';
import { SliderDemoPage } from './pages/SliderDemoPage/SliderDemoPage';
import { StepperDemoPage } from './pages/StepperDemoPage/StepperDemoPage';
import { ToastDemoPage } from './pages/ToastDemoPage/ToastDemoPage';
import Toolbar from '@material-ui/core/Toolbar';
import { TournamentCardDemoPage } from './pages/TournamentCardDemoPage/TournamentCardDemoPage';
import { TournamentRoundsDemoPage } from './pages/TournamentRoundsDemoPage/TournamentRoundsDemoPage';
import { TrainingCardDemoPage } from './pages/TrainingCardDemoPage/TrainingCardDemoPage';
import Typography from '@material-ui/core/Typography';
import { TypographyDemoPage } from './pages/TypographyDemoPage/TypographyDemoPage';
import { UserTeamCardsDemoPage } from './pages/UserTeamCardsDemoPage/UserTeamCardsDemoPage';
import { ZoneDemoPage } from './pages/ZoneDemoPage/ZoneDemoPage';

const routes = [
    {
        path: '/atoms/typography',
        component: TypographyDemoPage,
    },
    {
        path: '/atoms/zone',
        component: ZoneDemoPage,
    },
    {
        path: '/atoms/bubble',
        component: BubblesDemoPage
    },
    {
        path: '/atoms/button',
        component: ButtonsDemoPage
    },
    {
        path: '/atoms/inputs',
        component: InputDemoPage
    },
    {
        path: '/atoms/headers',
        component: HeadersDemoPage
    },
    {
        path: '/atoms/progress-bar',
        component: ProgressBarDemoPage
    },
    {
        path: '/atoms/dialog',
        component: DialogDemoPage
    },
    {
        path: '/component/stepper',
        component: StepperDemoPage
    },
    {
        path: '/component/card/user-team-cards',
        component: UserTeamCardsDemoPage,
    },
    {
        path: '/component/card/tournament-cards',
        component: TournamentCardDemoPage,
    },
    {
        path: '/component/card/training-cards',
        component: TrainingCardDemoPage,
    },
    {
        path: '/component/lists',
        component: ListDemoPage,
    },
    {
        path: '/component/toasts',
        component: ToastDemoPage,
    },
    {
        path: '/component/loader',
        component: LoaderDemoPage,
    },
    {
        path: '/component/lottie-animation',
        component: LottieAnimationDemoPage,
    },
    {
        path: '/component/premium-cta',
        component: PremiumCTADemoPage,
    },
    {
        path: '/component/promotionnal-banner',
        component: PromotionnalBannerDemoPage,
    },
    {
        path: '/component/line-up',
        component: LineUpDemoPage,
    },
    {
        path: '/component/slider',
        component: SliderDemoPage,
    },
    {
        path: '/component/tournament-rounds',
        component: TournamentRoundsDemoPage,
    },
    {
        path: '/component/card/partner-card',
        component: PartnerCardDemoPage,
    },
    {
        path: '/component/card/challenge-cards',
        component: ChallengeCardDemoPage,
    },
    {
        path: '/component/card/feed-cards',
        component: FeedCardDemoPage,
    },
    {
        path: '/component/media-library',
        component: MediaLibraryDemoPage,
    },
    {
        path: '/shared/auth-form',
        component: AuthFormDemoPage,
    },
    {
        path: '/component/calendar',
        component: CalendarDemoPage,
    },
    {
        path: '/template/div-with-background',
        component: DivWithBackgroundDemoPage,
    },
    {
        path: '/template/corner-footer',
        component: CornerFooterDemoPage,
    },
    {
        path: '/template/corner-header',
        component: CornerHeaderDemoPage,
    },
    {
        path: '/component/menu',
        component: MenuDemoPage,
    },
    {
        path: '/component/cookies',
        component: CookiesDemoPage,
    },
];

const App = (): ReactElement => {
    return (
        <div className='app'>
            <ContextStore.Provider>
                <Router basename={'/'}>
                    <AppBar position='static'>
                        <Toolbar>
                            <Typography variant='h6' className='title'>
                                NC Shared library
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className='d-flex flex-row w-100 h-100'>
                        <div className='navigation'>
                            <Navigation/>
                        </div>
                        <div className='content w-100 p-5'>
                            <Switch>
                                {routes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))}
                            </Switch>
                        </div>
                    </div>
                </Router>
            </ContextStore.Provider>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RouteWithSubRoutes(route: any) {
    return (
        <Route
            path={route.path}
            render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export default App;
