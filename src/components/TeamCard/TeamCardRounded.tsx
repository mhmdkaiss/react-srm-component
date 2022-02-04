import './TeamCardRounded.scss';

import React from 'react';
import { Team } from '../../models/Team';
import { MemoizedTeamPicture } from '../TeamPicture/TeamPicture';

interface TeamCardRoundedProps {
    team: Team;
    onClick?: (click: boolean) => void
}

export const TeamCardRounded: React.FunctionComponent<TeamCardRoundedProps> = (props: TeamCardRoundedProps) => {
    return (
        <div
            className={`team-card-rounded d-flex align-items-center grey-6 pr-2 ${props.onClick ? 'clickable' : ''}`}
            onClick={() => {
                if (props.onClick) {
                    props.onClick(true);
                }
            }}
        >
            <MemoizedTeamPicture slug={props.team.slug} size={24} />
            <div className='font-weight-bold tag'>[{props.team.tag}]</div>
            <div className='text-elipsis'>{props.team.name}</div>
        </div>
    );
};
