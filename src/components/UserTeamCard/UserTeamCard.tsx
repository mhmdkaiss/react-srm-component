import './UserTeamCard.scss';

import React from 'react';

import { Team } from '../../models/Team';

interface UserTeamCardProps {
    team: Team;
    isSolo: boolean;
    hoverHook?: (hovered?: string) => void;
}

export const UserTeamCard: React.FunctionComponent<UserTeamCardProps> = (props: UserTeamCardProps) => {
    const handlePropsHover = (hovered?: string) => {
        if (props.hoverHook) {
            props.hoverHook(hovered);
        }
    };

    if (props.team) {
        return (
            <div className="user-team-card-component hovered-card text-center">
                <div
                    onMouseEnter={() => handlePropsHover(props.isSolo ? Object.keys(props.team.players)[0] : props.team.slug)}
                    onMouseLeave={() => handlePropsHover(undefined)}

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
                    <div className="d-flex justify-content-center">
                        {!props.isSolo ? <div className="color-grey5 font-weight-bold pr-2 text-uppercase">[{props.team?.tag}]</div> : null}
                        <div className="color-white">{props.team?.name}</div>
                    </div>
                    {!props.isSolo ? (
                        <div className="user-grid mx-2 mt-2 mb-3">
                            {Object.keys(props.team.players).map((item) => {
                                return (
                                    <div key={item} className="d-flex user-container mx-2 my-1">
                                        <img
                                            className="avatar"
                                            src={process.env.REACT_APP_S3_URL + '/user/' + item + '/medias/ProfileImage'}
                                            onError={(e) =>
                                                (e.currentTarget.src = process.env.REACT_APP_S3_URL + '/media/default/default-user-avatar.svg')
                                            }
                                            alt=""
                                        />
                                        <div className="name my-auto mx-2">{props.team.players[item].name}</div>
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
