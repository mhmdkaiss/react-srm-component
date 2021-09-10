import "./UserCard.scss";

import React from "react";
import { Player } from "../../models/Player";
import { ProfilePicture } from "../ProfilePicture/ProfilePicture";

interface UserCardProps {
    playerId: string;
    player: Player;
    full: boolean;
    xs: boolean;
}

export const UserCard: React.FunctionComponent<UserCardProps> = (props: UserCardProps) => {
    const backgroundFallback = process.env.REACT_APP_S3_URL + "/media/default/default-user-banner.jpg";
    const hashIndex = props.player.name.lastIndexOf('#');
    const code = hashIndex !== -1 ? props.player.name.slice(hashIndex) : '';
    const name = hashIndex !== -1 ? props.player.name.slice(0, hashIndex) : props.player.name;
    return (
        <div className={`d-flex user-card overflow-hidden position-relative ${props.xs ? 'user-card-xs' : ''} ${props.full ? 'full px-2 py-3' : 'p-2'}`}>
            <div className="background-image w-100 h-100 position-absolute">
                <img
                    className="h-100 w-100"
                    src={`${String(process.env.REACT_APP_S3_URL)}/user/${props.playerId}/medias/BannerImage`}
                    onError={(e) =>
                        (e.currentTarget.src = backgroundFallback)
                    }
                    alt=""
                />
            </div>
            <div className="background-gradient w-100 h-100 position-absolute"></div>
            <ProfilePicture size={props.full && !props.xs ? 80 : 40} playerId={props.playerId} player={props.player} />
            <div className={`text-content  ml-3 my-auto h-100 ${props.xs ? 'user-card-xs' : ''}`}>
                <div className={`${props.xs ? '' : 'd-flex flex-column'} ${props.full ? '' : 'h-100'}`}>
                    <span className={`name  ${props.xs ? '' : 'ellipsis'} ${props.full ? 'full' : 'my-auto'}`}>{name}</span>
                    {props.full &&
                        <span className={`code ${props.xs ? 'ml-1' : ''}`}>{code}</span>
                    }
                </div>
                <span className={`d-block game-account ellipsis ${props.xs ? '' : 'mt-2'} `}>{props.player.account}</span>
            </div>
        </div>
    );
}
