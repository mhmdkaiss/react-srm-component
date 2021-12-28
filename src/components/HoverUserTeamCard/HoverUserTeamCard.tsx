import './HoverUserTeamCard.scss';

import React, { useEffect, useState } from 'react';
import { UserCardRounded, UserCardRoundedSize } from '../UserCard/UserCardRounded';

import { Player } from '../../models/Player';
import { Team } from '../../models/Team';
import { Tooltip } from '@material-ui/core';
import { useIntl } from 'react-intl';

interface HoverUserTeamCardProps {
    team: Team;
    isSolo: boolean;
    copyGameAccountCallback: () => void;
}

export const HoverUserTeamCard: React.FunctionComponent<HoverUserTeamCardProps> = (props: HoverUserTeamCardProps) => {
    const teamPlayer = Object.entries(props.team.players);
    const intl = useIntl();
    const [ teamCaptain, setTeamCaptain ] = useState<Player>();
    const [ teamCaptainId, setTeamCaptainId ] = useState<string>();

    const copyGameAccount = () => {
        navigator.clipboard.writeText(props.team.tag);
        props.copyGameAccountCallback();
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

    if (props.team) {
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
                        className={`avatar mx-auto mb-2 mt-4 ${props.isSolo ? 'solo' : 'team'}`}
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
                    />
                    <div className="user-team-card-hover-text d-flex justify-content-center">
                        {!props.isSolo ? <div className="color-grey5 font-weight-bold pr-2 text-uppercase">[{props.team?.tag}]</div> : null}
                        <div className="color-white">{props.team?.name}</div>
                    </div>
                    {props.isSolo
                        ? <div>
                            <div className='color-white justify-content-center user-team-card-hover-text mt-4'>
                                <div className='text-uppercase font-weight-bold'>
                                    {intl.formatMessage({ id: 'player.game.account' })}
                                </div>
                                <Tooltip title={intl.formatMessage({ id: 'player.copy.game.account' })} arrow>
                                    <div onClick={() => copyGameAccount()}>{props.team.tag}</div>
                                </Tooltip>
                            </div>
                        </div>
                        : <div className='color-white user-team-card-hover-text mt-2 mx-2'>
                            <div className='captain d-flex'>
                                <div className='title ml-2 mr-4 d-flex align-self-center'>{intl.formatMessage({ id: 'team.captain' })}</div>
                                {teamCaptain && teamCaptainId &&
                                <div className='d-flex ml-4 justify-content-center'>
                                    <UserCardRounded
                                        player={teamCaptain}
                                        playerId={teamCaptainId}
                                        size={UserCardRoundedSize.small}
                                        gameAccount={true}
                                        copyGameAccountCallback={props.copyGameAccountCallback}
                                    />
                                </div>
                                }
                            </div>
                            <div className='d-flex ml-2 mt-2'>{intl.formatMessage({ id: 'team.titular.players' })}</div>
                        </div>
                    }
                    {!props.isSolo ? (
                        <div className="user-grid mx-2 mt-2 mb-3">
                            {teamPlayer.map((item, key) => {
                                return (
                                    <div key={key} className="d-flex user-container mx-2 my-1">
                                        {Object.keys(props.team.players).map((item) => {
                                            return (
                                                <div key={item} className="d-flex user-container mx-2 my-1">
                                                </div>
                                            );
                                        })}
                                        <UserCardRounded
                                            player={item[1]}
                                            playerId={item[0]}
                                            size={UserCardRoundedSize.small}
                                            gameAccount={true}
                                            copyGameAccountCallback={props.copyGameAccountCallback}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}

                    {props.isSolo ? <div className="mt-2 mb-3"></div> : null}
                </div>
            </div>
        );
    } else {
        return null;
    }
};
