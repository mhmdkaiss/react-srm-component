import './UserCard.scss';

import { Icon, IconType } from '../../atoms/Icon/Icon';
import { Player, PremiumStatus } from '../../models/Player';

import { MemoizedProfilePicture } from '../ProfilePicture/ProfilePicture';
import React, { useState } from 'react';
import { Select, MenuItem, MuiThemeProvider } from '@material-ui/core';
import { TeamPermission } from '../../models/Team';
import { ThemePlatform } from '../../styles/Themes';
import { NCColors } from '../..';

export interface UserCardProps {
    playerId: string;
    player: Player;
    full?: boolean;
    xs?: boolean;
    selectable?: boolean;
    selected?: boolean;
    hoverHook?: (hovered?: string) => void;
    disabled?: boolean;
    deletable?: boolean;
    onDelete?: () => void;
    onClick?: () => void;
    permission?: TeamPermission;
    onPermissionChange?: (permission: TeamPermission) => void;
    noOwnerChange?: boolean;
}

export const UserCard: React.FunctionComponent<UserCardProps> = (
    props: UserCardProps
) => {
    const permissions = Object.values(TeamPermission).filter((p: string | number) => typeof p === 'number' && (!props.noOwnerChange || p !== TeamPermission.OWNER));
    const [ selectedPermission, setSelectedPermission ] = useState<TeamPermission | undefined>(props.xs ? undefined : props.permission);
    const hashIndex = props.player.name.lastIndexOf('#');
    const code = hashIndex !== -1 ? props.player.name.slice(hashIndex) : '';
    const name =
        hashIndex !== -1
            ? props.player.name.slice(0, hashIndex)
            : props.player.name;
    const handleHoverHook = (hovered?: string) => {
        if (props.hoverHook) {
            props.hoverHook(hovered);
        }
    };

    let profilePictureSize;
    if (props.full) {
        profilePictureSize = props.xs ? 40 : 80;
    } else {
        profilePictureSize = props.xs ? 20 : 40;
    }

    let isPremium: boolean;
    if (!props.player.premium) {
        isPremium = false;
    } else if (typeof props.player.premium === 'boolean') {
        isPremium = props.player.premium;
    } else {
        isPremium = props.player.premium?.status === PremiumStatus.PREMIUM;
    }

    const renderPermissionSelector = () => {
        const changePermission = (!props.noOwnerChange || selectedPermission !== TeamPermission.OWNER) ?
            props.onPermissionChange : undefined;

        return (
            (typeof selectedPermission === 'number') ?
                <div className='permission-selector-container mt-2'>
                    <MuiThemeProvider theme={ThemePlatform}>
                        <Select
                            defaultValue={''}
                            renderValue={(val: unknown) => renderPermission(val as TeamPermission)}
                            value={selectedPermission}
                            className="select"
                            onClick={(e) => {
                                if (changePermission) {
                                    e.stopPropagation();
                                }
                            }}
                            onChange={(event) => {
                                if (changePermission) {
                                    changePermission(event.target.value as TeamPermission);
                                }
                                setSelectedPermission(event.target.value as TeamPermission);
                            }}
                            disabled={props.disabled || !changePermission}
                        >
                            {
                                permissions && permissions.map((p, index) => {
                                    return (
                                        <MenuItem key={index} value={p} className="menu-test">
                                            {renderPermission(p as TeamPermission)}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </MuiThemeProvider>
                </div> :
                null
        );
    };

    const renderPermission = (p: TeamPermission) => {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                className={`permission-container ${props.onClick ? 'cursor-pointer' : undefined}`}
            >
                <Icon
                    icon={
                        p === TeamPermission.OWNER ?
                            IconType.Crown :
                            p === TeamPermission.MANAGER ?
                                IconType.People :
                                IconType.User
                    }
                    width={props.xs ? 12 : 16}
                    height={props.xs ? 12 : 16}
                    color={NCColors.grey6}
                ></Icon>
                <div
                    style={{
                        marginLeft: '8px',
                        textTransform: 'capitalize'
                    }}
                    className='mt-auto mr-3'
                >{TeamPermission[p].toLowerCase()}</div>
            </div>
        );
    };

    return (
        <div
            className={`d-flex nc-user-card position-relative align-items-center pl-2 pr-3
                ${props.xs ? 'nc-user-card-xs' : 'nc-user-card-lg'}
                ${props.full ? 'full' : ''}
                ${isPremium ? 'premium' : ''}
                ${props.selectable ? 'cursor-pointer pr-2' : 'pr-3'}
                ${props.selected ? 'user-card-selected' : ''}
                ${props.disabled ? 'disabled' : ''}
                ${props.deletable ? 'pr-4' : 'pr-3'}
                ${props.onClick ? 'cursor-pointer' : undefined}
            `}
            onMouseEnter={() => handleHoverHook(props.playerId)}
            onMouseLeave={() => handleHoverHook(undefined)}
            onClick={props.onClick}
        >
            <div
                className='background-texture w-100 h-100 position-absolute'
                style={{ backgroundImage: `url(${process.env.REACT_APP_S3_URL}/media/shared-library/background/dialog-background.png)` }}
            >
            </div>
            <MemoizedProfilePicture
                size={profilePictureSize}
                playerId={props.playerId}
                player={props.player}
            />
            <MemoBackgroundImg playerId={props.playerId} />
            {props.full && (
                <React.Fragment>
                    <div
                        className={`d-flex flex-column details ${
                            props.xs ? 'details-xs ml-2' : 'ml-3'
                        }`}
                    >
                        <span className='name text-elipsis'>{name}</span>
                        <span className='code'>{code}</span>
                        <span className='account text-elipsis'>
                            {props.player.account}
                        </span>
                        { renderPermissionSelector() }
                    </div>
                    {isPremium && (
                        <Icon
                            styleName={'position-absolute fixed-premium'}
                            icon={IconType.Premium}
                            width={14}
                            height={14}
                        />
                    )}
                </React.Fragment>
            )}
            {!props.full && (
                <div
                    className={`d-flex flex-row align-items-center details ${
                        props.xs ? 'details-xs ml-2' : 'ml-3'
                    } `}
                >
                    <div className='text-elipsis'>
                        <span className='name'>{name}</span>
                        <span className='ml-2 code'>{code}</span>
                    </div>
                    {isPremium && (
                        <Icon
                            styleName={'ml-2'}
                            icon={IconType.Premium}
                            width={14}
                            height={14}
                        />
                    )}
                </div>
            )}
            {
                props.deletable &&
                <Icon
                    icon={IconType.Close}
                    width={13}
                    height={13}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (props.onDelete) {
                            props.onDelete();
                        }
                    }}
                />
            }
        </div>
    );
};

const MemoBackgroundImg = React.memo<{ playerId: string }>(({ playerId }) => {
    const defaultBackground = `${process.env.REACT_APP_S3_URL}/media/default/default-user-banner.jpg`;
    const currentBackground = `${process.env.REACT_APP_S3_URL}/user/${playerId}/medias/BannerImage`;

    return (
        <div
            className='background-image w-100 h-100 position-absolute'
            style={{ backgroundImage: `url(${currentBackground}?${Date.now()}), url(${defaultBackground})` }}
        ></div>
    );
});

MemoBackgroundImg.displayName = 'user-brackground-image';
