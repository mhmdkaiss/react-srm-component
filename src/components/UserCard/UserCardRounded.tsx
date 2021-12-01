import './UserCardRounded.scss';

import { Icon, IconType } from '../../atoms/Icon/Icon';
import { Player, PremiumStatus } from '../../models/Player';

import { MemoizedProfilePicture } from '../ProfilePicture/ProfilePicture';
import React from 'react';

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

export const UserCardRounded: React.FunctionComponent<UserCardRoundedProps> = (props: UserCardRoundedProps) => {
    const pictureSize = props.size === UserCardRoundedSize.xs ? 24 : 40;

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
            className={`user-card-rounded-component d-flex align-items-center pr-3 ${
                props.selectable ? 'cursor-pointer selectable' : ''
            } ${props.selected ? 'selected' : ''} size-${props.size}`}
        >
            <MemoizedProfilePicture
                size={pictureSize}
                playerId={props.playerId}
                player={props.player}
            />
            <div className='d-flex flex-column ml-2 details'>
                <div className='name-wrapper d-flex'>
                    <span className='name text-elipsis'>{props.player.name}</span>
                    {isPremium && (
                        <Icon
                            styleName={'ml-2'}
                            icon={IconType.Premium}
                            width={16}
                            height={16}
                        />
                    )}
                </div>
                {
                    // eslint-disable-next-line eqeqeq
                    props.size === UserCardRoundedSize.small && props.player.elo != null && (
                        <span className='elo'>ELO:{props.player.elo}</span>
                    )
                }
            </div>
            {props.selectable && (
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
