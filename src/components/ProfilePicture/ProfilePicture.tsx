import React, { CSSProperties } from 'react';
import { Premium, PremiumStatus } from '../../models/Player';
import './ProfilePicture.scss';

export interface ProfilePictureProps {
    playerId: string;
    player: { premium: boolean | Premium };
    size?: number;
}

export const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = (
    props
) => {
    const defaultProfileImage =
        process.env.REACT_APP_S3_URL + '/media/default/default-user-avatar.svg';
    let style: CSSProperties | undefined;

    if (props.size) {
        const size = props.size + 'px';
        style = {
            minHeight: size,
            minWidth: size,
            maxHeight: size,
            maxWidth: size,
        };
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
            className={`user-avatar position-relative default ${
                isPremium ? 'premium' : ''
            }`}
            style={style}
        >
            <img
                className={`position-absolute sm ${
                    (props.size || 40) < 30 ? 'small-border' : 'big-border'
                }`}
                src={`${process.env.REACT_APP_S3_URL}/user/${
                    props.playerId
                }/medias/ProfileImage?cache=${Date.now()}`}
                defaultValue={defaultProfileImage}
                onError={(e) => (e.currentTarget.src = defaultProfileImage)}
                alt=''
            />
        </div>
    );
};

export const MemoizedProfilePicture = React.memo(ProfilePicture);
