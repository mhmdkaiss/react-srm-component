import './TeamCard.scss';

import { Icon, IconType } from '../../atoms/Icon/Icon';
import React from 'react';
import { TeamCardInfo } from '../../models/Team';
import { MemoizedTeamPicture } from '../TeamPicture/TeamPicture';
import { MemoizedTeamBackground } from '../TeamBackground/TeamBackground';

export enum SelectionType {
    Close = 'close',
    Selected = 'selected',
}

interface TeamCardProps {
    team: TeamCardInfo;
    full?: boolean;
    xs?: boolean;
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

    let profilePictureSize = 48;
    if (props.full) {
        profilePictureSize = props.xs ? 80 : 112;
    }

    let captainName: string | undefined;
    let captainCode: string | undefined;
    if (props.team.players) {
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
            `}
            onMouseEnter={() => handleHoverHook(props.team.slug)}
            onMouseLeave={() => handleHoverHook(undefined)}
        >
            <div
                className='background-texture w-100 h-100 position-absolute'
                style={{ backgroundImage: `url(${process.env.REACT_APP_S3_URL}/media/shared-library/background/dialog-background.png)` }}
            >
            </div>
            <MemoizedTeamBackground team={props.team.slug} />
            <MemoizedTeamPicture slug={props.team.slug} size={profilePictureSize} />
            <div
                className={`d-flex flex-column details mt-1 ${
                    props.full ? 'full ml-3' : 'ml-2'
                }`}
            >
                <div className='tag text-elipsis'>[{props.team.tag}]</div>
                <div className='name text-elipsis'>{props.team.name}</div>
                {props.full && captainName && captainCode && (
                    <div className='captain text-elipsis d-flex align-items-center'>
                        <Icon
                            styleName="mr-2"
                            icon={IconType.Crown}
                            width={12}
                            height={12}
                        />
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
