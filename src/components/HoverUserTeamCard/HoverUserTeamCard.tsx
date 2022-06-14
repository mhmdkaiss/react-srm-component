import { Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Player } from '../../models/Player';
import { TeamCardInfo } from '../../models/Team';
import { UserCardRounded, UserCardRoundedSize } from '../UserCard/UserCardRounded';
import './HoverUserTeamCard.scss';

interface HoverUserTeamCardProps {
    team: TeamCardInfo;
    isSolo: boolean;
    noGameAccount?: boolean;
    hideElo?: boolean;
    copyGameAccountCallback?: () => void;
    teamCallback?: (teamSlug: string) => void;
    userCallback?: (userId: string) => void;
}

export const HoverUserTeamCard: React.FunctionComponent<HoverUserTeamCardProps> = (props: HoverUserTeamCardProps) => {
    const teamPlayer = Object.entries(props.team.players);
    const intl = useIntl();
    const [ teamCaptain, setTeamCaptain ] = useState<Player>();
    const [ teamCaptainId, setTeamCaptainId ] = useState<string>();
    const player = Object.values(props.team.players)[0];
    const gotLink = (props.isSolo && props.userCallback) || (!props.isSolo && props.teamCallback);

    const copyGameAccount = () => {
        navigator.clipboard.writeText(player.account);
        props.copyGameAccountCallback && props.copyGameAccountCallback();
    };

    useEffect(() => {
        if (props.team.players) {
            Object.keys(props.team.players).forEach((playerId) => {
                if (props.team.players[playerId].captain) {
                    setTeamCaptain(props.team.players[playerId]);
                    setTeamCaptainId(playerId);
                    return;
                }
            });
        }
    }, [props.team]);

    const handleClick = () => {
        if (props.isSolo && props.userCallback) {
            props.userCallback(Object.keys(props.team.players)[0]);
        } else if (!props.isSolo && props.teamCallback) {
            props.teamCallback(props.team.slug);
        }
    };

    if (props.team) {
        const userCardSize = props.noGameAccount && props.hideElo ? UserCardRoundedSize.xs : UserCardRoundedSize.small;
        return (
            <div className="hover-user-team-card-component hovered-card text-center">
                <div
                    className="hovered-card text-center"
                    style={{
                        backgroundImage:
                            'url(' +
                            process.env.REACT_APP_S3_URL +
                            (props.isSolo
                                ? '/user/' + Object.keys(props.team.players)[0] + '/medias/BannerImage'
                                : `/teams/${props.team.slug}/medias/BannerImage`) +
                            '), url(' +
                            process.env.REACT_APP_S3_URL +
                            (props.isSolo
                                ? '/media/default/default-user-banner.jpg'
                                : '/media/default/default-team-banner.svg') +
                            ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                    }}
                >

                    <img
                        className={`avatar mx-auto mb-2 mt-4 ${props.isSolo ? 'solo' : 'team'} ${gotLink ? 'cursor-pointer' : ''}`}
                        src={
                            props.isSolo
                                ? process.env.REACT_APP_S3_URL + '/user/' + Object.keys(props.team.players)[0] + '/medias/ProfileImage'
                                : process.env.REACT_APP_S3_URL + `/teams/${props.team.slug}/medias/ProfileImage`
                        }
                        onError={(e) =>
                            (e.currentTarget.src = props.isSolo
                                ? process.env.REACT_APP_S3_URL + '/media/default/default-user-avatar.svg'
                                : process.env.REACT_APP_S3_URL + '/media/default/default-team-avatar.png')
                        }
                        alt=""
                        onClick={handleClick}
                    />
                    <div
                        className={`user-team-card-hover-text d-flex justify-content-center ${gotLink ? 'cursor-pointer' : ''}`}
                        onClick={handleClick}
                    >
                        {!props.isSolo ? <div className="color-grey5 font-weight-bold pr-2 text-uppercase">[{props.team?.tag}]</div> : null}
                        <div className="color-white">{props.team?.name}</div>
                    </div>
                    {
                        props.isSolo ?
                            props.noGameAccount ?
                                <div className='pb-4'></div> :
                                <div>
                                    <div className='color-white justify-content-center user-team-card-hover-text pb-4 mt-4'>
                                        <div className='text-uppercase font-weight-bold'>
                                            {intl.formatMessage({ id: 'player.game.account' })}
                                        </div>
                                        <Tooltip title={intl.formatMessage({ id: 'player.copy.game.account' })} arrow>
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => copyGameAccount()}
                                            >
                                                {player.account}
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div> :
                            <React.Fragment>
                                <div className='color-white user-team-card-hover-text mt-2 mx-2'>
                                    <div className='captain d-flex'>
                                        <div className='title ml-2 mr-4 d-flex align-self-center'>{intl.formatMessage({ id: 'team.captain' })}</div>
                                        {teamCaptain && teamCaptainId &&
                                        <div
                                            className='d-flex ml-4 justify-content-center cursor-pointer'
                                            onClick={() => {
                                                if (props.userCallback) {
                                                    props.userCallback(teamCaptainId);
                                                }
                                            }}
                                        >
                                            <UserCardRounded
                                                player={teamCaptain}
                                                playerId={teamCaptainId}
                                                size={userCardSize}
                                                gameAccount={!props.noGameAccount}
                                                copyGameAccountCallback={props.copyGameAccountCallback}
                                            />
                                        </div>
                                        }
                                    </div>
                                    <div className='d-flex ml-2 mt-2'>{intl.formatMessage({ id: 'team.titular.players' })}</div>
                                </div>
                                <div className="user-grid mx-2 mt-2 pb-3">
                                    {teamPlayer.map((item, key) => {
                                        return (
                                            <div
                                                key={key}
                                                className="d-flex user-container mx-2 my-1 cursor-pointer"
                                                onClick={() => {
                                                    if (props.userCallback) {
                                                        props.userCallback(item[0]);
                                                    }
                                                }}
                                            >
                                                <UserCardRounded
                                                    player={item[1]}
                                                    playerId={item[0]}
                                                    size={userCardSize}
                                                    gameAccount={!props.noGameAccount}
                                                    copyGameAccountCallback={props.copyGameAccountCallback}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </React.Fragment>
                    }
                </div>
            </div>
        );
    } else {
        return null;
    }
};
