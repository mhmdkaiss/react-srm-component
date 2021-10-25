import './UserCard.scss';

import React from 'react';
import { Player } from '../../models/Player';
import { MemoizedProfilePicture } from '../ProfilePicture/ProfilePicture';
import { Icon, IconType } from '../..';

export interface UserCardProps {
    playerId: string;
    player: Player;
    full: boolean;
    xs: boolean;
    hoverHook?: (hovered?: string) => void;
}

export const UserCard: React.FunctionComponent<UserCardProps> = ({
    playerId,
    player,
    full,
    xs,
    hoverHook,
}) => {
    const backgroundFallback =
        process.env.REACT_APP_S3_URL + '/media/default/default-user-banner.jpg';
    const hashIndex = player.name.lastIndexOf('#');
    const code = hashIndex !== -1 ? player.name.slice(hashIndex) : '';
    const name =
        hashIndex !== -1 ? player.name.slice(0, hashIndex) : player.name;
    const handleHoverHook = (hovered?: string) => {
        if (hoverHook) {
            hoverHook(hovered);
        }
    };

    let profilePictureSize;
    if (full) {
        profilePictureSize = xs ? 40 : 80;
    } else {
        profilePictureSize = xs ? 20 : 40;
    }

    return (
        <div
            className={`d-flex nc-user-card align-items-center pl-2 pr-3
                ${xs ? 'nc-user-card-xs' : 'nc-user-card-lg'}
                ${full ? 'full' : ''}
                ${player.premium === 'PREMIUM' ? 'premium' : ''}`}
            onMouseEnter={() => handleHoverHook(playerId)}
            onMouseLeave={() => handleHoverHook(undefined)}
        >
            <div className='background-image w-100 h-100 position-absolute'>
                <img
                    className='h-100 w-100'
                    src={`${process.env.REACT_APP_S3_URL}/user/${playerId}/medias/BannerImage`}
                    onError={(e) => (e.currentTarget.src = backgroundFallback)}
                    alt=''
                />
            </div>
            <div className='background-gradient w-100 h-100 position-absolute'></div>
            <MemoizedProfilePicture
                size={profilePictureSize}
                playerId={playerId}
                player={player}
            />
            {full && (
                <React.Fragment>
                    <div
                        className={`d-flex flex-column details ${
                            xs ? 'details-xs ml-2' : 'ml-3'
                        }`}
                    >
                        <span className='name text-elipsis'>{name}</span>
                        <span className='code'>{code}</span>
                        <span className='account text-elipsis'>
                            {player.account}
                        </span>
                    </div>
                    {player.premium === 'PREMIUM' && (
                        <Icon
                            styleName={'position-absolute fixed-premium'}
                            icon={IconType.Premium}
                            width={14}
                            height={14}
                        />
                    )}
                </React.Fragment>
            )}
            {!full && (
                <div
                    className={`d-flex flex-row align-items-center details ${
                        xs ? 'details-xs ml-2' : 'ml-3'
                    } `}
                >
                    <div className='text-elipsis'>
                        <span className='name'>{name}</span>
                        <span className='ml-2 code'>{code}</span>
                    </div>
                    {player.premium === 'PREMIUM' && (
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
