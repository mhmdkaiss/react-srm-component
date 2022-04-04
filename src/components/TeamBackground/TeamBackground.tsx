import React from 'react';

export interface TeamBackgroundProps {
    team: string;
}

export const TeamBackground: React.FunctionComponent<TeamBackgroundProps> = ({ team }: TeamBackgroundProps) => {
    const defaultBackground = `${process.env.REACT_APP_S3_URL}/media/default/default-team-banner.png`;
    const currentBackground = `${process.env.REACT_APP_S3_URL}/teams/${team}/medias/BannerImage`;
    return (
        <div
            className='background-image w-100 h-100 position-absolute'
            style={{ backgroundImage: `url(${currentBackground}?${Date.now()}), url(${defaultBackground})` }}
        ></div>
    );
};

export const MemoizedTeamBackground = React.memo(TeamBackground);
