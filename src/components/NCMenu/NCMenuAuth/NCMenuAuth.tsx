import './NCMenuAuth.scss';

import { Button, ButtonTheme, ButtonType } from '../../../atoms/Button/Button';
import { DropdownMenuItem, NCDropdownMenu } from '../../../atoms/NCDropdownMenu/NCDropdownMenu';
import { FormattedMessage, useIntl } from 'react-intl';

import { HashLink } from 'react-router-hash-link';
import { NCMenuAuthUser } from '../../../models/NCMenuUser';
import { ProfilePicture } from '../../../components/ProfilePicture/ProfilePicture';
import React from 'react';

export interface NCMenuAuthProps {
    isSideMenu?: boolean,
    user: NCMenuAuthUser | null,
    hideUserInfo?: boolean;
    dropdownMenuItems?: Array<DropdownMenuItem>;
    platformMenu?: boolean;
    onLogout?: () => void,
    onOpenDashboard?: () => void,
    onAction?: () => void,
    onEvent?: (event: string) => void,
}

export const NCMenuAuth: React.FunctionComponent<NCMenuAuthProps> = (props) => {
    const intl = useIntl();

    const onAction = () => {
        if (props.onAction) {
            props.onAction();
        }
    };

    const navigateDashboard = () => {
        if (props.onOpenDashboard) {
            onAction();
            props.onOpenDashboard();
        }
    };

    const logout = () => {
        if (props.onLogout) {
            onAction();
            props.onLogout();
        }
    };

    const items = props.dropdownMenuItems ? props.dropdownMenuItems : [
        {
            name: intl.formatMessage({ id: 'ds.nc-menu-auth.dashboard' }),
            onClick: navigateDashboard
        },
        {
            name: intl.formatMessage({ id: 'ds.nc-menu-auth.logout' }),
            onClick: logout,
            className: 'logout'
        }
    ];

    const renderRegistration = () => {
        if (props.user) {
            return;
        }

        return props.platformMenu ?
            <React.Fragment>
                <Button
                    label={intl.formatMessage({ id: 'ds.nc-menu-auth.login' })}
                    setClick={() => {
                        if (props.onEvent) {
                            props.onEvent('login');
                        }
                    }}
                    type={ButtonType.SECONDARY}
                    styleClass='border-0'
                />
                {
                    !props.isSideMenu &&
                    <Button
                        containerClass='ml-2'
                        label={intl.formatMessage({ id: 'ds.nc-menu-auth.register' })}
                        setClick={() => {
                            if (props.onEvent) {
                                props.onEvent('register');
                            }
                        }}
                    />
                }
            </React.Fragment> :
            <React.Fragment>
                <div className={`my-auto ${!props.isSideMenu ? 'mr-4 d-none d-md-block' : 'menu-item'}`}>
                    <HashLink
                        className={`login-button ${props.platformMenu ? 'primary-color font-weight-bold text-uppercase' : ''}`}
                        to={{ pathname: '/login', hash: '#' }}
                        onClick={onAction}
                    >
                        <FormattedMessage id="ds.nc-menu-auth.login" />
                    </HashLink>
                </div>
                {
                    !props.isSideMenu &&
                    <HashLink to={{ pathname: '/register', hash: '#' }} onClick={onAction}>
                        <Button
                            label={intl.formatMessage({ id: 'ds.nc-menu-auth.register' })}
                            theme={ButtonTheme.CUSTOM}
                        />
                    </HashLink>
                }
            </React.Fragment>;
    };

    return (
        <div
            className={`nc-menu-auth d-flex cursor-pointer ${
                props.isSideMenu ? 'side-menu flex-column align-items-center' : 'top-menu justify-content-center'
            }`}
        >
            {props.user && !props.isSideMenu && (
                <div className="mx-auto">
                    <div className="dropdown-header-menu">
                        <div className="user d-flex pointer">
                            {!props.hideUserInfo &&
                                <div className="mr-2 d-sm-flex flex-column align-self-center nick-code-container mt-1 d-none">
                                    <span className='nickname text-elipsis'>{props.user.nickname}</span>
                                    <span className="code">#{props.user.code}</span>
                                </div>
                            }
                            <MemoProfileImage user={{ ...props.user, isPremium: props.platformMenu || props.user.isPremium }} />
                        </div>

                        <div className="position-fixed menu">
                            <NCDropdownMenu items={items} />
                        </div>

                    </div>
                </div>
            )}
            { renderRegistration() }
        </div>
    );
};

export const MemoizedNCMenuAuth = React.memo(NCMenuAuth);

const MemoProfileImage = React.memo<{ user: NCMenuAuthUser }>((props) => {
    return <div className="profile-picture">
        <ProfilePicture playerId={props.user.id || ''} player={{ premium: props.user.isPremium || false }} />
    </div>;
});

MemoProfileImage.displayName = 'profile-image';
