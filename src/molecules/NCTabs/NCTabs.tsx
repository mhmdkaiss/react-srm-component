import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { NCDropdown, NCTypography } from '../../atoms';
import './NCTabs.scss';

export interface TabParameter {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    basePath?: string;
    name: string;
    path: string;
    redirect?: string;
    internalLink?: string;
    component?: any;
    children?: Array<TabParameter>;
    disabled?: boolean;
    hide?: boolean;
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export interface TabSettings {
    uppercase: boolean;
}

interface NCTabsProps {
    tabs: Array<TabParameter>;
    basename?: string;
    color?: string;
    variant?: 'bo' | 'default';
}

export const NCTabs: React.FunctionComponent<NCTabsProps & React.HTMLAttributes<HTMLDivElement>> = ({
    basename,
    tabs,
    color,
    variant,
    ...other
}: NCTabsProps & React.HTMLAttributes<HTMLDivElement>) => {
    // TODO: handle color customization

    const renderTab = (tab: TabParameter, idx: number) => {
        if (tab.hide) {
            return;
        }
        const tabPath = basename ? tab.path.replace(':tournamentId', basename): tab.path;
        if (tab.children) {
            return (
                <NavLink
                    key={tab.name + idx}
                    className={`nc-tab-link nc-tab-sub${tab.disabled ? ' nc-tab-disabled' : ''}`}
                    activeClassName="nc-tab-active"
                    style={{
                        color: color,
                        borderColor: color
                    }}
                    to={{
                        pathname: tabPath,
                        search: location?.search,
                    }}
                    onClick={(e) => e.preventDefault()}
                >
                    <NCDropdown name={tab.name} tab={tab}>
                        <NCTypography variant={`${variant === 'bo' ? 'body1' : 'overtitle'}`}>{tab.name}</NCTypography>
                    </NCDropdown>
                </NavLink>
            );
        }
        return (
            <NavLink
                key={tab.name + idx}
                className={`nc-tab-link${tab.disabled ? ' nc-tab-disabled' : ''}`}
                activeClassName="nc-tab-active"
                style={{
                    pointerEvents: tab.disabled ? 'none' : 'inherit',
                }}
                to={{
                    pathname: tabPath,
                    search: location?.search,
                }}
                exact
            >
                <NCTypography variant={`${variant === 'bo' ? 'body1' : 'overtitle'}`}>{tab.name}</NCTypography>
            </NavLink>
        );
    };

    if (!tabs || tabs.length === 0) {
        return <React.Fragment />;
    }

    return (
        <BrowserRouter>
            <div {...other} className={`nc-tabs${variant === 'bo' ? ' tabs-bo' : ''}${other.className ? ' ' + other.className : ''}`}>
                {tabs.map((tab, index) => renderTab(tab, index))}
            </div>
        </BrowserRouter>
    );
};
