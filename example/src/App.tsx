import { NCDefault, NCTabs } from '@cactus/srm-component/dist';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import { AuthFormDemoPage } from './pages/AuthFormDemoPage/AuthFormDemoPage';
import { BubblesDemoPage } from './pages/BubblesDemoPage/BubblesDemoPage';
import { ButtonsDemoPage } from './pages/ButtonsDemoPage/ButtonsDemoPage';
import { CalendarDemoPage } from './pages/CalendarDemoPage/CalendarDemoPage';
import { ChallengeCardDemoPage } from './pages/ChallengeCardDemoPage/ChallengeCardDemoPage';
import ContextStore from './store';
import { CookiesDemoPage } from './pages/CookiesDemoPage/CookiesDemoPage';
import { CornerFooterDemoPage } from './pages/CornerFooterDemoPage/CornerFooterDemoPage';
import { DialogDemoPage } from './pages/DialogDemoPage/DialogDemoPage';
import { DivWithBackgroundDemoPage } from './pages/DivWithBackgroundDemoPage/DivWithBackgroundDemoPage';
import { FeedCardDemoPage } from './pages/FeedCardDemoPage/FeedCardDemoPage';
import { HeadersDemoPage } from './pages/HeadersDemoPage/HeadersDemoPage';
import { InputDemoPage } from './pages/InputDemoPage/InputDemoPage';
import { LineUpDemoPage } from './pages/LineUpDemoPage/LineUpDemoPage';
import { ListDemoPage } from './pages/ListDemoPage/ListDemoPage';
import { LoaderDemoPage } from './pages/LoaderDemoPage/LoaderDemoPage';
import { LottieAnimationDemoPage } from './pages/LottieAnimationDemoPage/LottieAnimationDemoPage';
import { MapRoundsDemoPage } from './pages/MapRoundsDemoPage/MapRoundsDemoPage';
import { MediaLibraryDemoPage } from './pages/MediaLibraryDemoPage/MediaLibraryDemoPage';
import { MenuDemoPage } from './pages/MenuDemoPage/MenuDemoPage';
import { PartnerCardDemoPage } from './pages/PartnerCardDemoPage/PartnerCardDemoPage';
import { PremiumCTADemoPage } from './pages/PremiumCTADemoPage/PremiumCTADemoPage';
import { ProgressBarDemoPage } from './pages/ProgressBarDemoPage/ProgressBarDemoPage';
import { PromotionnalBannerDemoPage } from './pages/PromotionnalBannerDemoPage/PromotionnalBannerDemoPage';
import { SliderDemoPage } from './pages/SliderDemoPage/SliderDemoPage';
import { StepperDemoPage } from './pages/StepperDemoPage/StepperDemoPage';
import { ToastDemoPage } from './pages/ToastDemoPage/ToastDemoPage';
import { TournamentCardDemoPage } from './pages/TournamentCardDemoPage/TournamentCardDemoPage';
import { TournamentRoundsDemoPage } from './pages/TournamentRoundsDemoPage/TournamentRoundsDemoPage';
import { TrainingCardDemoPage } from './pages/TrainingCardDemoPage/TrainingCardDemoPage';
import { TypographyDemoPage } from './pages/TypographyDemoPage/TypographyDemoPage';
import { UserTeamCardsDemoPage } from './pages/UserTeamCardsDemoPage/UserTeamCardsDemoPage';
import { ZoneDemoPage } from './pages/ZoneDemoPage/ZoneDemoPage';
import { NCTabParameter } from '../../src/molecules/NCTabs/NCTabs';
import { CornerHeaderDemoPage } from './pages/CornerHeaderDemoPage/CornerHeaderDemoPage';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';

const routes: Array<NCTabParameter> = [
    {
        name: 'Welcome',
        path: '/welcome',
        component: WelcomePage,
    },
    {
        name: 'Atoms',
        path: '/atom',
        dropdownOnClick: true,
        children: [
            {
                name: 'Bubbles',
                path: '/bubbles',
                component: BubblesDemoPage,
            },
            {
                name: 'Typography',
                path: '/typography',
                component: TypographyDemoPage,
            },
            {
                name: 'Buttons',
                path: '/button',
                component: ButtonsDemoPage,
            },
            {
                name: 'Inputs',
                path: '/inputs',
                component: InputDemoPage
            },
            {
                name: 'Headers',
                path: '/headers',
                component: HeadersDemoPage
            },
            {
                name: 'Dialog',
                path: '/dialog',
                component: DialogDemoPage
            },
            {
                name: 'Zone',
                path: '/zone',
                component: ZoneDemoPage,
            },
        ],
    },
    {
        name: 'Card',
        path: '/card',
        children: [
            {
                name: 'user-team',
                path: '/user-team',
                component: UserTeamCardsDemoPage,
            },
            {
                name: 'tournament',
                path: '/tournament',
                component: TournamentCardDemoPage,
            },
            {
                name: 'training',
                path: '/training',
                component: TrainingCardDemoPage,
            },
            {
                name: 'partner',
                path: '/partner',
                component: PartnerCardDemoPage,
            },
            {
                name: 'challenge',
                path: '/challenge',
                component: ChallengeCardDemoPage,
            },
            {
                name: 'feed',
                path: '/feed',
                component: FeedCardDemoPage,
            },
        ],
    },
    {
        name: 'Components',
        path: '/component',
        dropdownOnClick: true,
        children: [
            {
                name: 'stepper',
                path: '/stepper',
                component: StepperDemoPage
            },
            {
                name: 'lists',
                path: '/lists',
                component: ListDemoPage,
            },
            {
                name: 'toasts',
                path: '/toasts',
                component: ToastDemoPage,
            },
            {
                name: 'loader',
                path: '/loader',
                component: LoaderDemoPage,
            },
            {
                name: 'lottie-animation',
                path: '/lottie-animation',
                component: LottieAnimationDemoPage,
            },
            {
                name: 'premium-cta',
                path: '/premium-cta',
                component: PremiumCTADemoPage,
            },
            {
                name: 'promotionnal-banner',
                path: '/promotionnal-banner',
                component: PromotionnalBannerDemoPage,
            },
            {
                name: 'line-up',
                path: '/line-up',
                component: LineUpDemoPage,
            },
            {
                name: 'slider',
                path: '/slider',
                component: SliderDemoPage,
            },
            {
                name: 'tournament-rounds',
                path: '/tournament-rounds',
                component: TournamentRoundsDemoPage,
            },
            {
                name: 'media-library',
                path: '/media-library',
                component: MediaLibraryDemoPage,
            },
            {
                name: 'calendar',
                path: '/calendar',
                component: CalendarDemoPage,
            },
            {
                name: 'menu',
                path: '/menu',
                component: MenuDemoPage,
            },
            {
                name: 'promotionnal-banner',
                path: '/promotionnal-banner',
                component: PromotionnalBannerDemoPage,
            },
            {
                name: 'progress-bar',
                path: '/progress-bar',
                component: ProgressBarDemoPage,
            },
            {
                name: 'map-rounds',
                path: '/map-rounds',
                component: MapRoundsDemoPage,
            },
            {
                name: 'cookies',
                path: '/cookies',
                component: CookiesDemoPage,
            },
        ],
    },
    {
        name: 'Templates',
        path: '/template',
        dropdownOnClick: true,
        children: [
            {
                name: 'Div With Background',
                path: '/div-with-background',
                component: DivWithBackgroundDemoPage,
            },
            {
                name: 'Corner Header',
                path: '/corner-header',
                component: CornerHeaderDemoPage,
            },
            {
                name: 'Corner Footer',
                path: '/corner-footer',
                component: CornerFooterDemoPage,
            },
            {
                name: 'Auth Form',
                path: '/auth-form',
                component: AuthFormDemoPage,
            },
        ],
    },
    {
        name: 'Default Redirection',
        hide: true,
        path: '/',
        redirect: '/welcome',
    },
];

const App = (): ReactElement => {
    const Content = () => {
        const basename = '/';

        return (
            <ContextStore.Provider>
                <Router basename={basename}>
                    <NCTabs
                        basename={basename}
                        tabs={routes}
                        variant='bo'
                    />
                    <div className={'content-wrapper'}>
                        <Switch>
                            {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                routes.map((route: any, i: any) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))
                            }
                        </Switch>
                    </div>
                </Router>
            </ContextStore.Provider>
        );
    };

    return (
        <div
            data-testid="shared-examples"
            className="shared-examples"
            style={{
                backgroundImage: `url(${process.env.REACT_APP_S3_URL}/game/5d31aa9684d0814f4c04bbd5/medias/BackgroundImage`,
            }}
        >
            <div className="examples-wrapper">
                <Content />
            </div>
        </div>
    );
};

function RouteWithSubRoutes(route: NCTabParameter) {
    if (route.redirect) {
        return <Redirect exact from={route.path} to={route.redirect} />;
    }
    if (route.internalLink) {
        return (
            <Route
                path={route.path}
                render={() => {
                    window.location.pathname = route.internalLink as string;
                    return null;
                }}
            />
        );
    }
    if (route.children) {
        return <Route path={route.path}>{SubRoutes(route)}</Route>;
    }

    return (
        <Route
            path={route.path}
            render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.children} />
            )}
        />
    );
}

function SubRoutes(route: NCTabParameter) {
    function goodPath(_path: string) {
        return _path && _path === '/' ? '' : _path;
    }
    return (
        <Switch>
            {(route.children as []).map((subRoute: NCTabParameter, i: number) => (
                <RouteWithSubRoutes
                    key={i}
                    {...{
                        ...subRoute,
                        path: route.path + goodPath(subRoute.path),
                    }}
                />
            ))}
        </Switch>
    );
}

export default App;
