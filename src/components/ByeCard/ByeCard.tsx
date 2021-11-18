import './ByeCard.scss';
import './../TeamCard/TeamCard.scss';
import './../UserCard/UserCard.scss';

import React from 'react';

interface ByeCardProps {
    full: boolean;
    xs: boolean;
    isSolo: boolean;
}

export const ByeCard: React.FunctionComponent<ByeCardProps> = (props: ByeCardProps) => {
    const soloSize = [ 20, 40, 80 ];
    const teamSize = [ 48, 80, 121 ];
    let profilePictureSize;
    profilePictureSize = props.full ?
        props.isSolo ?
            props.xs ? soloSize[1] : soloSize[2] :
            props.xs ? teamSize[1] : teamSize[2] :
        props.isSolo ?
            props.xs ? soloSize[0] : soloSize[1] :
            teamSize[0];

    return (
        <div className={
            `nc-bye-card d-flex align-items-center
            ${props.isSolo ?
            `nc-user-card ${props.xs ? 'nc-user-card-xs' : 'nc-user-card-lg'}` :
            `nc-team-card ${props.xs ? 'nc-team-card-xs' : 'nc-team-card-lg'}`}
            ${props.full ? 'full' : ''}
            ${props.full || (props.isSolo && !props.xs) ? 'pl-2 pr-3' : ''}`
        }>
            <div
                className={`avatar-container ${props.isSolo ? 'solo' : ''}`}
                style={{ width: `${profilePictureSize}px`, height: `${profilePictureSize}px` }}
            ></div>
            <div className="mx-auto">BYE</div>
        </div>
    );
};
