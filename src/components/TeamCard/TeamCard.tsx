import './TeamCard.scss';

import { Icon, IconType } from '../../atoms/Icon/Icon';

import IconCrown from '../../styles/svg/IconCrown';
import React from 'react';
import { Team } from '../../models/Team';

export enum SelectionType {
    Close = 'close',
    Selected = 'selected',
}

interface TeamCardProps {
    team: Team;
    full: boolean;
    xs: boolean;
    selectable?: SelectionType;
    selected?: boolean;
    hoverHook?: (hovered?: string) => void;
}

export const TeamCard: React.FunctionComponent<TeamCardProps> = (props: TeamCardProps) => {
    const handleHoverHook = (hovered?: string) => {
        if (props.hoverHook) {
            props.hoverHook(hovered);
        }
    };

    let captainName: string | undefined;
    let captainCode: string | undefined;
    if(props.team.players) {
        Object.keys(props.team.players).forEach((playerId) => {
            if (props.team.players[playerId].captain) {
                const captain = props.team.players[playerId];
                captainCode = captain.name.slice(-4);
                captainName = captain.name.slice(0, -5);
                return;
            }
        });
    }

    return (
        <div
            className={`d-flex position-relative nc-team-card align-items-center
                ${props.xs ? 'nc-team-card-xs' : 'nc-team-card-lg'} 
                ${props.full ? 'full p-2' : ''}
                ${props.selectable ? 'cursor-pointer pr-2' : 'pr-3'}
                ${props.selected ? `card-selected-${props.selectable}` : ''}
            }`}
            onMouseEnter={() => handleHoverHook(props.team.slug)}
            onMouseLeave={() => handleHoverHook(undefined)}
        >
            <div className='background-image selected w-100 h-100 position-absolute'>
                <BackgroundImg team={props.team.team} />
            </div>
            <div className='background-gradient w-100 h-100 position-absolute'></div>
            <ProfileImg team={props.team.team} full={props.full} />
            <div
                className={`d-flex flex-column details mt-1 ${
                    props.full ? 'full ml-3' : 'ml-2'
                }`}
            >
                <div className='tag text-elipsis'>[{props.team.tag}]</div>
                <div className='name text-elipsis'>{props.team.name}</div>
                {props.full && captainName && captainCode && (
                    <div className='captain text-elipsis'>
                        <IconCrown className='crown mr-2' />
                        <span className='name'>{captainName}</span>
                        <span className='code ml-1'>#{captainCode}</span>
                    </div>
                )}
            </div>
            {props.selectable && props.selectable === SelectionType.Close && (
                <div className='ml-auto mt-2 d-flex align-self-start'>
                    <Icon
                        styleName={`ml-2 ${props.selected ? 'selected' : ''}`}
                        icon={IconType.Close}
                        width={12}
                        height={12}
                    />
                </div>
            )}
        </div>
    );
};

const ProfileImg = React.memo<{ team: string; full: boolean }>((props) => {
    const avatarFallback =
        process.env.REACT_APP_S3_URL + '/media/default/default-team-avatar.png';

    return (
        <img
            className={`logo w-100 ${props.full ? 'full' : ''}`}
            src={`${String(process.env.REACT_APP_S3_URL)}/teams/${
                props.team
            }/medias/ProfileImage?${Date.now()}`}
            onError={(e) => (e.currentTarget.src = avatarFallback)}
            alt=''
        />
    );
});

const BackgroundImg = React.memo<{ team: string }>(({ team }) => {
    const backgroundFallback =
        process.env.REACT_APP_S3_URL + '/media/default/default-team-banner.svg';
    return (
        <img
            className='h-100 w-100'
            src={`${
                process.env.REACT_APP_S3_URL
            }/teams/${team}/medias/BannerImage?${Date.now()}`}
            onError={(e) => (e.currentTarget.src = backgroundFallback)}
            alt=''
        />
    );
});
