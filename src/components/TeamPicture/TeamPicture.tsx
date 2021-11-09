import React, { CSSProperties } from 'react';
import './TeamPicture.scss';

export interface ProfilePictureProps {
    slug: string;
    size?: number;
}

export const TeamPicture: React.FunctionComponent<ProfilePictureProps> = ({slug, size = 32}: ProfilePictureProps) => {
    const defaultImage = process.env.REACT_APP_S3_URL + '/media/default/default-team-avatar.png';
    let style: CSSProperties | undefined;

    if (size) {
        const sizePx = size + 'px';
        style = {
            minHeight: sizePx,
            minWidth: sizePx,
            maxHeight: sizePx,
            maxWidth: sizePx,
        };
    }

    return (
        <img
            className="team-picture"
            style={style}
            src={`${process.env.REACT_APP_S3_URL}/teams/${slug}/medias/ProfileImage?cache=${Date.now()}`}
            defaultValue={defaultImage}
            onError={(e) => (e.currentTarget.src = defaultImage)}
            alt=''
        />
    );
};

export const MemoizedProfilePicture = React.memo(TeamPicture);
