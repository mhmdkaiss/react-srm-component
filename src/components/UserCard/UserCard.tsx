import './UserCard.scss';


import { MemoizedProfilePicture } from '../ProfilePicture/ProfilePicture';
import { Player, PremiumStatus } from '../../models/Player';
import React from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';

export interface UserCardProps {
    playerId: string;
    player: Player;
    full: boolean;
    xs: boolean;
    selectable?: boolean;
    selected?: boolean;
    hoverHook?: (hovered?: string) => void;
    disabled?: boolean;
}

export const UserCard: React.FunctionComponent<UserCardProps> = (
    props: UserCardProps
) => {
    const backgroundFallback =
        process.env.REACT_APP_S3_URL + '/media/default/default-user-banner.jpg';
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
        isPremium = props.player.premium.status === PremiumStatus.PREMIUM;
    }

    return (
        <div
            className={`d-flex nc-user-card align-items-center pl-2 pr-3
                ${props.xs ? 'nc-user-card-xs' : 'nc-user-card-lg'}
                ${props.full ? 'full' : ''}
                ${isPremium ? 'premium' : ''}
                ${props.selectable ? 'cursor-pointer pr-2' : 'pr-3'}
                ${props.selected ? 'user-card-selected' : ''}
                ${props.disabled ? 'disabled' : ''}`}
            onMouseEnter={() => handleHoverHook(props.playerId)}
            onMouseLeave={() => handleHoverHook(undefined)}
        >
            <div className='background-image w-100 h-100 position-absolute'>
                <img
                    className='h-100 w-100'
                    src={`${process.env.REACT_APP_S3_URL}/user/${props.playerId}/medias/BannerImage`}
                    onError={(e) => (e.currentTarget.src = backgroundFallback)}
                    alt=''
                />
            </div>
            <div className='background-gradient w-100 h-100 position-absolute'></div>
            <MemoizedProfilePicture
                size={profilePictureSize}
                playerId={props.playerId}
                player={props.player}
            />
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
        </div>
    );
};
