import "./TeamCard.scss";

import React from "react";
import { Team } from "../../models/Team";
import IconCrown from "../../styles/svg/IconCrown";

export enum CardType {
    xs = 'xs',
    small = 'small',
    lg = 'lg'

}
interface TeamCardProps {
    team: Team;
    full: boolean;
    size: CardType;
    hoverHook?: (hovered?: string) => void;
}

export const TeamCard: React.FunctionComponent<TeamCardProps> = (props: TeamCardProps) => {
    const avatarFallback = process.env.REACT_APP_S3_URL + "/media/default/default-team-avatar.png";
    const backgroundFallback = process.env.REACT_APP_S3_URL + "/media/default/default-team-banner.svg";

    const handleHoverHook = (hovered?: string) => {
        if (props.hoverHook) {
            props.hoverHook(hovered)
        }
    }

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

    if (props.size === CardType.xs) {
        return (
            <div className={` mr-4 d-flex team-card overflow-hidden position-relative team-card-xs ${props.full ? 'full p-2' : ''}`}
                onMouseEnter={() => handleHoverHook(props.team.slug)}
                onMouseLeave={() => handleHoverHook(undefined)}>
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
                <img className={`logo mr-3 my-auto team-card-xs ${props.full ? 'full' : ''}`}
                    src={`${String(process.env.REACT_APP_S3_URL)}/teams/${props.team.team}/medias/ProfileImage?${Date.now()}`}
                    onError={(e) =>
                        (e.currentTarget.src = avatarFallback)
                    }
                    alt=""
                />
                <div className={`text-content my-auto team-card-xs`}>
                    <div className="d-flex flex-column">
                        <div className="tag primary-dim-color">[{props.team.tag}]</div>
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
    else {
        return (

            <div className={` mr-4 d-flex team-card overflow-hidden position-relative ${props.size === CardType.small ? 'team-card-small' : ''} 
                ${props.size === CardType.lg ? 'team-card-lg' : ''} ${props.full ? 'full p-2' : ''}`}
                onMouseEnter={() => handleHoverHook(props.team.slug)}
                onMouseLeave={() => handleHoverHook(undefined)}>
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
                <div className="justify-content-center">
                    <img className={`logo w-100 mr-3 my-auto ${props.full ? 'full' : ''}`}
                        src={`${String(process.env.REACT_APP_S3_URL)}/teams/${props.team.team}/medias/ProfileImage?${Date.now()}`}
                        onError={(e) =>
                            (e.currentTarget.src = avatarFallback)
                        }
                        alt=""
                    />
                </div>
                <div className={`text-content my-auto w-100 justify-content-center w-100`}>
                    <div className="tag primary-dim-color mt-1">[{props.team.tag}]</div>
                    <div className="name ellipsis">{props.team.name}</div>
                </div>
            </div>
        );
    }
}
