import React from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { TeamCardInfo } from '../../models/Team';
import { MemoizedTeamPicture } from '../TeamPicture/TeamPicture';

import './TeamCardSearch.scss';

interface TeamCardSearchProps {
    team: TeamCardInfo;
    memberCount?: number;
    onClick?: () => void
}

export const TeamCardSearch: React.FunctionComponent<TeamCardSearchProps> = (props: TeamCardSearchProps) => {
    const socialLinks = Object.entries(props.team.sn ?? {});

    return (
        <div
            className={`team-card-search white d-flex align-items-center pr-2 ${props.onClick ? 'clickable' : ''}`}
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
            }}
        >
            <MemoizedTeamPicture slug={props.team.slug} size={64} />
            <div className='ml-3'>
                <div className='d-flex'>
                    <div className='font-weight-bold tag mr-2'>[{props.team.tag}]</div>
                    <div className='text-elipsis'>{props.team.name}</div>
                </div>
                <div className='d-flex'>
                    {
                        socialLinks.map(([ key, value ], index) => {
                            return (
                                <a
                                    className={`mr-${index + 1 === socialLinks.length ? 4 : 2} network-link}`}
                                    key={key}
                                    href={value}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Icon icon={IconType[key[0].toUpperCase() + key.slice(1) ] || key} width={22} height={22} />
                                </a>
                            );
                        })
                    }
                    {
                        ((props.memberCount && props.memberCount > 0) || (Object.keys(props.team.players).length > 0)) &&
                        <div className='d-flex align-items-end'>
                            <Icon icon={IconType.People} width={22} height={22} />
                            <div className='ml-2 members'>{ props.memberCount ?? Object.keys(props.team.players).length }</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
