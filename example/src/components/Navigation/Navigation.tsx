import './Navigation.scss';

import { Icon, IconType } from '@cactus/srm-component';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const Navigation: React.FunctionComponent = () => {
    const [ atomsOpen, setAtomsOpen ] = React.useState(false);
    const [ componentsOpen, setComponentsOpen ] = React.useState(false);
    const [ cardsOpen, setCardsOpen ] = React.useState(false);
    const [ sharedComponentsOpen, setSharedComponentsOpen ] = React.useState(false);
    const [ templatesOpen, setTemplatesOpen ] = React.useState(false);

    const location = useLocation();

    useEffect(() => {
        checkUnCollapsed(location.pathname.split('/').slice(-2)[0]);
    }, [location]);

    const checkUnCollapsed = (pathName: string) => {
        collapseAll();
        switch (pathName) {
            case 'atoms':
                setAtomsOpen(true);
                break;
            case 'component':
                setComponentsOpen(true);
                setCardsOpen(false);
                break;
            case 'card':
                setCardsOpen(true);
                setComponentsOpen(true);
                break;
            case 'shared':
                setSharedComponentsOpen(true);
                break;
            case 'template':
                setTemplatesOpen(true);
                break;
            default:
                collapseAll();
                break;
        }
    };

    const collapseAll = () => {
        setSharedComponentsOpen(false);
        setTemplatesOpen(false);
        setComponentsOpen(false);
        setAtomsOpen(false);
    };

    return (
        <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            className={'navigation-component'}
        >
            <ListItem button onClick={() => setAtomsOpen(!atomsOpen)}>
                <ListItemText primary='Atoms'/>
                <Icon
                    icon={atomsOpen ? IconType.Minimize : IconType.Maximize}
                    width={24}
                    height={24}
                />
            </ListItem>
            <Collapse in={atomsOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItem button component={Link} to='/atoms/bubble'>
                        <ListItemText primary='Bubbles'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/button'>
                        <ListItemText primary='Buttons'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/dialog'>
                        <ListItemText primary='Dialog'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/headers'>
                        <ListItemText primary='Headers'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/inputs'>
                        <ListItemText primary='Inputs'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/progress-bar'>
                        <ListItemText primary='Progress bar'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/stepper'>
                        <ListItemText primary='Steppers'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/typography'>
                        <ListItemText primary='Typography'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/zone'>
                        <ListItemText primary='Zone'/>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={() => setComponentsOpen(!componentsOpen)}>
                <ListItemText primary='Components'/>
                <Icon
                    icon={componentsOpen ? IconType.Minimize : IconType.Maximize}
                    width={24}
                    height={24}
                />
            </ListItem>
            <Collapse in={componentsOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItem button onClick={() => setCardsOpen(!cardsOpen)}>
                        <ListItemText primary='Cards'/>
                        <Icon
                            icon={cardsOpen ? IconType.Minimize : IconType.Maximize}
                            width={24}
                            height={24}
                        />
                    </ListItem>
                    <Collapse in={cardsOpen} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <ListItem button component={Link} to='/component/card/challenge-cards'>
                                <ListItemText primary='Challenges'/>
                            </ListItem>
                            <ListItem button component={Link} to='/component/card/feed-cards'>
                                <ListItemText primary='Feed'/>
                            </ListItem>
                            <ListItem button component={Link} to='/component/card/partner-card'>
                                <ListItemText primary='Partner'/>
                            </ListItem>
                            <ListItem button component={Link} to='/component/card/tournament-cards'>
                                <ListItemText primary='Tournaments'/>
                            </ListItem>
                            <ListItem button component={Link} to='/component/card/training-cards'>
                                <ListItemText primary='Training'/>
                            </ListItem>
                            <ListItem button component={Link} to='/component/card/user-team-cards'>
                                <ListItemText primary='User/Team'/>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button component={Link} to='/component/tournament-rounds'>
                        <ListItemText primary='Tournament Rounds'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/lists'>
                        <ListItemText primary="Lists"/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/toasts'>
                        <ListItemText primary='Toasts'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/loader'>
                        <ListItemText primary='Loader'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/lottie-animation'>
                        <ListItemText primary='Lottie Animations'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/premium-cta'>
                        <ListItemText primary='Premium CTA'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/promotionnal-banner'>
                        <ListItemText primary='Promotionnal banner'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/line-up'>
                        <ListItemText primary='Line up'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/slider'>
                        <ListItemText primary='Slider'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/media-library'>
                        <ListItemText primary='MediaLibrary'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/calendar'>
                        <ListItemText primary='Calendar'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/menu'>
                        <ListItemText primary='Menu'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/cookies'>
                        <ListItemText primary='Cookies'/>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={() => setTemplatesOpen(!templatesOpen)}>
                <ListItemText primary='Templates'/>
                <Icon
                    icon={templatesOpen ? IconType.Minimize : IconType.Maximize}
                    width={24}
                    height={24}
                />
            </ListItem>
            <Collapse in={templatesOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItem button component={Link} to='/template/div-with-background'>
                        <ListItemText primary='Div with background'/>
                    </ListItem>
                    <ListItem button component={Link} to='/template/corner-footer'>
                        <ListItemText primary='Corner footer'/>
                    </ListItem>
                    <ListItem button component={Link} to='/template/corner-Header'>
                        <ListItemText primary='Corner Header'/>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={() => setSharedComponentsOpen(!sharedComponentsOpen)}>
                <ListItemText primary='Shared Components'/>
                <Icon
                    icon={sharedComponentsOpen ? IconType.Minimize : IconType.Maximize}
                    width={24}
                    height={24}
                />
            </ListItem>
            <Collapse in={sharedComponentsOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItem button component={Link} to='/shared/auth-form'>
                        <ListItemText primary='Auth Form'/>
                    </ListItem>
                </List>
            </Collapse>

        </List>
    );
};
