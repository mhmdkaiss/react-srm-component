import "../../styles/TeamCard.scss";

import React from "react";
import { Team } from "../../models/Team";
import IconCrown from "../../styles/svg/IconCrown";

interface TeamCardProps {
    team: Team;
    full: boolean;
    xs: boolean;
}

export const TeamCard: React.FunctionComponent<TeamCardProps> = (props: TeamCardProps) => {
    const avatarFallback = process.env.REACT_APP_S3_URL + "/media/default/default-team-avatar.png";
    const backgroundFallback = process.env.REACT_APP_S3_URL + "/media/default/default-team-banner.svg";

    let captainName: string | undefined;
    let captainCode: string | undefined;
    Object.keys(props.team.players).forEach(playerId => {
        if (props.team.players[playerId].captain) {
            const captain = props.team.players[playerId];
            captainCode = captain.name.slice(-4)
            captainName = captain.name.slice(0, -5)
            return;
        }
    });

    return (
        <div className={`d-flex team-card overflow-hidden position-relative ${props.xs ? 'team-card-xs' : ''} ${props.full ? 'full p-2' : ''}`}>
            <div
                className="background-image w-100 h-100 position-absolute">
                <img className="h-100 w-100"
                    src={`${String(process.env.REACT_APP_S3_URL)}/teams/${props.team.team}/medias/BannerImage?${Date.now()}`}
                    onError={(e) =>
                        (e.currentTarget.src = backgroundFallback)
                    }
                    alt=""
                />
            </div>
            <div className="background-gradient w-100 h-100 position-absolute"></div>
            <img className={`logo mr-3 my-auto ${props.xs ? 'team-card-xs' : ''} ${props.full ? 'full' : ''}`}
                src={`${String(process.env.REACT_APP_S3_URL)}/teams/${props.team.team}/medias/ProfileImage?${Date.now()}`}
                onError={(e) =>
                    (e.currentTarget.src = avatarFallback)
                }
                alt=""
            />
            <div className={`text-content my-auto ${props.xs ? 'team-card-xs' : ''}`}>
                <div className="d-flex flex-column">
                    <div className="tag">[{props.team.tag}]</div>
                    {props.full && <React.Fragment>
                        <div className="name ellipsis">{props.team.name}</div>
                        {captainName && captainCode &&
                            <div className="captain ellipsis">
                                <IconCrown className="crown mr-2" />
                                <span className="name">{captainName}</span>
                                <span className="code ml-1">#{captainCode}</span>
                            </div>
                        }
                    </React.Fragment>
                    }
                </div>
            </div>
        </div>
    );
}
