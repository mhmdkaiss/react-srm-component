import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { Icon, IconType } from "@cactus/srm-component";
import "./Navigation.scss";
import { Link } from 'react-router-dom';


export const Navigation: React.FunctionComponent = () => {
    const [atomsOpen, setAtomsOpen] = React.useState(false);
    const [componentsOpen, setComponentsOpen] = React.useState(false);

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={'navigation-component'}
        >
            <ListItem button onClick={() => setAtomsOpen(!atomsOpen)}>
                <ListItemText primary="Atoms" />
                <Icon icon={atomsOpen ? IconType.Minimize : IconType.Maximize} width={24} height={24} />
            </ListItem>
            <Collapse in={atomsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button component={Link} to='/atoms/button'>
                        <ListItemText primary="Buttons" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={() => setComponentsOpen(!componentsOpen)}>
                <ListItemText primary="Components" />
                <Icon icon={componentsOpen ? IconType.Minimize : IconType.Maximize} width={24} height={24} />
            </ListItem>
            <Collapse in={componentsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button component={Link} to='/component/inputs'>
                        <ListItemText primary="Inputs" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}