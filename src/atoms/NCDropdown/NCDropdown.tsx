import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TabParameter } from '../../molecules/NCTabs/NCTabs';
import { Icon, IconType } from '../Icon/Icon';
import { NCTypography } from '../NCTypography/NCTypography';
import './NCDropdown.scss';

export interface NCDropdownProps {
  name?: string;
  children?: React.ReactChild;
  tab: TabParameter;
  click?: boolean;
}
export const NCDropdown: React.FunctionComponent<NCDropdownProps> = ({ children, tab, click }) => {
    const [ expanded, setExpanded ] = useState<boolean>(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function handleClickOutside(event: any) {
            if (wrapperRef && wrapperRef.current && !((wrapperRef.current as any).contains(event.target))) {
                setExpanded(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    // todo: emit item change + disable state + replace TabParameter + 
    return (
        <div
            ref={wrapperRef}
            className={`nc-dropdown${!click ? ' nc-dropdown-hover' : ''}${expanded ? ' nc-dropdown-active' : ''}${tab.disabled ? ' nc-dropdown-disabled' : ''}`}
            onClick={() => (!tab.disabled && click ? setExpanded(!expanded) : null)}
        >
            <div
                className="nc-dropdown-content-menu"
            >
                {children}
                <Icon width={16} icon={IconType.Colapse}></Icon>
            </div>
            <div className="nc-dropdown-content">
                {tab.children && tab.children.map((t, idx) => {
                    return (
                        <NavLink
                            key={t.name + idx}
                            className={`nc-dropdown-item${t.disabled ? ' nc-dropdown-item-disabled' : ''}`}
                            activeClassName="nc-dropdown-item-active"
                            to={{
                                pathname: tab.path + t.path,
                                search: location?.search,
                            }}
                            exact
                        >
                            <NCTypography variant='body1'>{t.name}</NCTypography>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};
