import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { ButtonsDemoPage } from './pages/ButtonsDemoPage/ButtonsDemoPage';
import { DialogDemoPage } from './pages/DialogDemoPage/DialogDemoPage';
import { FeedCardDemoPage } from './pages/FeedCardDemoPage/FeedCardDemoPage';
import { HeadersDemoPage } from './pages/HeadersDemoPage/HeadersDemoPage';
import { InputDemoPage } from './pages/InputDemoPage/InputDemoPage';
import { LineUpDemoPage } from './pages/LineUpDemoPage/LineUpDemoPage';
import { ListDemoPage } from './pages/ListDemoPage/ListDemoPage';
import { LoaderDemoPage } from './pages/LoaderDemoPage/LoaderDemoPage';
import { LottieAnimationDemoPage } from './pages/LottieAnimationDemoPage/LottieAnimationDemoPage';
import { MediaLibraryDemoPage } from './pages/MediaLibraryDemoPage/MediaLibraryDemoPage';
import { MenuDemoPage } from './pages/MenuDemoPage/MenuDemoPage';
import { PartnerCardDemoPage } from './pages/PartnerCardDemoPage/PartnerCardDemoPage';
import { PremiumCTADemoPage } from './pages/PremiumCTADemoPage/PremiumCTADemoPage';
import { SliderDemoPage } from './pages/SliderDemoPage/SliderDemoPage';
import { StepperDemoPage } from './pages/StepperDemoPage/StepperDemoPage';
import { ToastDemoPage } from './pages/ToastDemoPage/ToastDemoPage';
import { TournamentCardDemoPage } from './pages/TournamentCardDemoPage/TournamentCardDemoPage';
import { TournamentRoundsDemoPage } from './pages/TournamentRoundsDemoPage/TournamentRoundsDemoPage';
import { TrainingCardDemoPage } from './pages/TrainingCardDemoPage/TrainingCardDemoPage';
import { TypographyDemoPage } from './pages/TypographyDemoPage/TypographyDemoPage';
import { UserTeamCardsDemoPage } from './pages/UserTeamCardsDemoPage/UserTeamCardsDemoPage';
import { ZoneDemoPage } from './pages/ZoneDemoPage/ZoneDemoPage';
import { AuthFormDemoPage } from './pages/AuthFormDemoPage/AuthFormDemoPage';
import { PromotionnalBannerDemoPage } from './pages/PromotionnalBannerDemoPage/PromotionnalBannerDemoPage';
import ContextStore from './store';
import { DivWithBackgroundDemoPage } from './pages/DivWithBackgroundDemoPage/DivWithBackgroundDemoPage';
import { CornerFooterDemoPage } from './pages/CornerFooterDemoPage/CornerFooterDemoPage';
import { CalendarDemoPage } from './pages/CalendarDemoPage/CalendarDemoPage';

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
        path: '/atoms/dialog',
        component: DialogDemoPage
    },
    {
        path: '/component/stepper',
        component: StepperDemoPage
    },
    {
        path: '/component/user-team-cards',
        component: UserTeamCardsDemoPage,
    },
    {
        path: '/component/tournament-cards',
        component: TournamentCardDemoPage,
    },
    {
        path: '/component/training-cards',
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
        path: '/component/partner-card',
        component: PartnerCardDemoPage,
    },
    {
        path: '/component/feed-cards',
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
        path: '/component/menu',
        component: MenuDemoPage,
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
