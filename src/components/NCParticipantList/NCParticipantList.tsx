import React, { useEffect, useState } from 'react';
import {useIntl} from "react-intl";
import { TeamLeaderboard} from '../../models/Team';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { TeamPicture } from '../TeamPicture/TeamPicture';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import './NCParticipantList.scss';

export interface NCParticipantListProps {
    list: Array<TeamLeaderboard>,
    winners?: Array<string>,
    selected?: string,
    isLeaderboard?: boolean,
}

export const NCParticipantList: React.FunctionComponent<NCParticipantListProps> = ({ list, selected, winners = [], isLeaderboard }: NCParticipantListProps) => {
    const intl = useIntl();
    const [isSolo, setIsSolo] = useState<boolean>(false);

    useEffect(() => {
        setIsSolo(Math.max(...list.filter(t => t).map(t => Object.keys(t.players).length)) < 2);
    }, [list])

    return (
            <table className="table color-white nc-tournament-list">
                <thead>
                    <tr>
                        {
                            isLeaderboard &&
                            <th scope="col">{intl.formatMessage({id: "tournament.match.position"})}</th>

                        }
                        <th scope="col">{intl.formatMessage({id: "tournament.match.participant"})}</th>
                        {
                            isLeaderboard &&
                            <th scope="col">{intl.formatMessage({id: "tournament.match.score"})}</th>
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    list.filter(t => t).map((team: TeamLeaderboard, index: number) => {
                        return (
                            <tr key={index} className={`${(team.route === selected) ? 'selected' : ''}`}>
                                {
                                    isLeaderboard &&
                                    <th scope="row">#{index + 1}</th>
                                }
                                <td className="d-flex flex-row align-items-center">
                                    {
                                        isSolo ?
                                        <ProfilePicture
                                            playerId={Object.keys(team.players)[0]}
                                            player={Object.values(team.players)[0]}
                                            size={32}
                                        /> :
                                        <TeamPicture
                                            slug={team.slug}
                                            size={32}
                                        />
                                    }
                                    <p className="mx-2 my-auto">{team.name}</p>
                                    {
                                        winners.includes(team.route) &&
                                        <Icon icon={IconType.Prize} width={24} height={24}/>
                                    }
                                </td>
                                {
                                    isLeaderboard &&
                                    <td>{team.score}</td>
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}