import React from 'react';
import './NCMenuAuth.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import { NCMenuAuthUser } from '../../../models/NCMenuUser';
import { NCDropdownMenu } from '../../../atoms/NCDropdownMenu/NCDropdownMenu';
import { Button, ButtonTheme } from '../../../atoms/Button/Button';
import { ProfilePicture } from '../../../components/ProfilePicture/ProfilePicture';
import { HashLink } from 'react-router-hash-link';

export interface NCMenuAuthProps {
  isSideMenu?: boolean,
  user: NCMenuAuthUser | null,
  onLogout: () => void,
  onOpenDashboard: () => void,
  onAction?: () => void,
}

export const NCMenuAuth: React.FunctionComponent<NCMenuAuthProps> = (props) => {
    const intl = useIntl();

    const onAction = () => {
        if (props.onAction) {
            props.onAction();
        }
    };

    const navigateDashboard = () => {
        onAction();
        props.onOpenDashboard();
    };

    const logout = () => {
        onAction();
        props.onLogout();
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
                            <div className="mr-2 d-sm-flex flex-column align-self-center mt-1 nick-code-container d-none">
                                <span className='nickname text-elipsis'>{props.user.nickname}</span>
                                <span className="code">#{props.user.code}</span>
                            </div>
                            <MemoProfileImage user={props.user} />
                        </div>

                        <div className="position-fixed menu">
                            <NCDropdownMenu items={[
                                {
                                    name: intl.formatMessage({ id: 'ds.nc-menu-auth.dashboard' }),
                                    onClick: navigateDashboard
                                },
                                {
                                    name: intl.formatMessage({ id: 'ds.nc-menu-auth.logout' }),
                                    onClick: logout,
                                    className: 'logout'
                                }
                            ]} />
                        </div>

                    </div>
                </div>
            )}
            {!props.user && (
                <div className={`my-auto ${!props.isSideMenu ? 'mr-4 d-none d-md-block' : 'menu-item'}`}>
                    <HashLink
                        className={'login-button'}
                        to={{ pathname: '/login', hash: '#' }}
                        onClick={onAction}
                    >
                        <FormattedMessage id="ds.nc-menu-auth.login" />
                    </HashLink>
                </div>
            )}
            {!props.user && !props.isSideMenu && (
                <HashLink to={{ pathname: '/register', hash: '#' }} onClick={onAction}>
                    <Button
                        label={intl.formatMessage({ id: 'ds.nc-menu-auth.register' })}
                        theme={ButtonTheme.CUSTOM}
                    />
                </HashLink>
            )}
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
