import React from 'react';
import './UserCardRounded.scss';
import { MemoizedProfilePicture } from '../ProfilePicture/ProfilePicture';
import { Player } from '../../models/Player';
import { Icon, IconType } from '../..';

export enum UserCardRoundedSize {
    xs = 'xs',
    small = 'small',
}

export interface UserCardRoundedProps {
    playerId: string;
    player: Player;
    size: UserCardRoundedSize;
    selectable?: boolean;
    selected?: boolean;
}

export const UserCardRounded: React.FunctionComponent<UserCardRoundedProps> = ({
    playerId,
    player,
    size,
    selectable,
    selected,
}) => {
    const pictureSize = size === UserCardRoundedSize.xs ? 24 : 40;

    return (
        <div
            className={`user-card-rounded-component d-flex align-items-center my-3 pr-3 ${
                selectable ? 'cursor-pointer selectable' : ''
            } ${selected ? 'selected' : ''} size-${size}`}
        >
            <MemoizedProfilePicture
                size={pictureSize}
                playerId={playerId}
                player={player}
            />
            <div className='d-flex flex-column ml-2 details'>
                <div className='name-wrapper d-flex'>
                    <span className='name text-elipsis'>{player.name}</span>
                    {player.premium === 'PREMIUM' && (
                        <Icon
                            styleName={'ml-2'}
                            icon={IconType.Premium}
                            width={16}
                            height={16}
                        />
                    )}
                </div>
                {size === UserCardRoundedSize.small && player.elo != null && (
                    <span className='elo'>ELO:{player.elo}</span>
                )}
            </div>
            {selectable && (
                <div className='ml-auto'>
                    <Icon
                        styleName={'ml-2'}
                        icon={IconType.Close}
                        width={13}
                        height={13}
                    />
                </div>
            )}
        </div>
    );
};
