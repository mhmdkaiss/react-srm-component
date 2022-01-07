import { Icon, IconType } from '@cactus/srm-component';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

export const Navigation: React.FunctionComponent = () => {
    const [ atomsOpen, setAtomsOpen ] = React.useState(false);
    const [ componentsOpen, setComponentsOpen ] = React.useState(false);

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
                    <ListItem button component={Link} to='/atoms/button'>
                        <ListItemText primary='Buttons'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/inputs'>
                        <ListItemText primary='Inputs'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/headers'>
                        <ListItemText primary='Headers'/>
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/dialog'>
                        <ListItemText primary='Dialog'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/stepper'>
                        <ListItemText primary='Steppers' />
                    </ListItem>
                    <ListItem button component={Link} to='/atoms/typography'>
                        <ListItemText primary='Typography'/>
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
                    <ListItem button component={Link} to='/component/user-team-cards'>
                        <ListItemText primary='User/Team cards'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/tournament-cards'>
                        <ListItemText primary='Tournaments cards'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/tournament-rounds'>
                        <ListItemText primary='Tournament Rounds'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/training-cards'>
                        <ListItemText primary='Training cards'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/partner-card'>
                        <ListItemText primary='Partner card'/>
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
                    <ListItem button component={Link} to='/component/line-up'>
                        <ListItemText primary='Line up'/>
                    </ListItem>
                    <ListItem button component={Link} to='/component/slider'>
                        <ListItemText primary='Slider'/>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};
