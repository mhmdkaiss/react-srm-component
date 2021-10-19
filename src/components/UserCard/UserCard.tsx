import "./UserCard.scss";

import React from "react";
import { Player } from "../../models/Player";
import { ProfilePicture } from "../ProfilePicture/ProfilePicture";

export enum UserCardType {
    xs = 'xs',
    small = 'small',
    lg = 'lg'
}
export interface UserCardProps {
    playerId: string;
    player: Player;
    full: boolean;
    size: UserCardType;
    hoverHook?: (hovered?: string) => void;
}

export const UserCard: React.FunctionComponent<UserCardProps> = (props: UserCardProps) => {
    const backgroundFallback = process.env.REACT_APP_S3_URL + "/media/default/default-user-banner.jpg";
    const hashIndex = props.player.name.lastIndexOf('#');
    const code = hashIndex !== -1 ? props.player.name.slice(hashIndex) : '';
    const name = hashIndex !== -1 ? props.player.name.slice(0, hashIndex) : props.player.name;
    const handleHoverHook = (hovered?: string) => {
        if (props.hoverHook) {
            props.hoverHook(hovered)
        }
    }
    if (props.size === 'small') {
        return (
            <div className={`d-flex align-items-center user-card overflow-hidden position-relative ${props.full ? 'px-2' : 'p-2'} user-card-small`}
                onMouseEnter={() => handleHoverHook(props.playerId)}
                onMouseLeave={() => handleHoverHook(undefined)}>
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
                <div className={`background-gradient w-100 h-100 position-absolute`} ></div>

                <ProfilePicture size={40} playerId={props.playerId} player={props.player} />
                <div className={`text-content align-middle ml-2`}>
                    <div className={`${props.full ? '' : 'h-100'}`}>
                        <span className={`name ${props.full ? 'full' : 'my-auto'}`}>{name}</span>
                        {props.full &&
                            <span className={`ml-1 code`}>{code}</span>
                        }
                    </div>
                </div>
            </div>
        );

    }
    else {
        return (
            <div className={`d-flex user-card overflow-hidden position-relative ${props.size === 'xs' ? 'user-card-xs' : ''} ${props.size === 'lg' ? 'user-card-lg' : ''} ${props.full ? 'full px-2 py-3' : 'p-2'}`}
                onMouseEnter={() => handleHoverHook(props.playerId)}
                onMouseLeave={() => handleHoverHook(undefined)}>
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
                <div className={`background-gradient w-100 h-100 position-absolute ${props.size === 'lg' ? 'justify-content-center' : ''}`} ></div>

                <ProfilePicture size={props.full && props.size === 'lg' ? 80 : 40} playerId={props.playerId} player={props.player} />
                <div className={`text-content  ${props.size === 'lg' ? 'mt-2' : 'ml-3 my-auto'} h-100 ${props.size === 'xs' ? 'user-card-xs' : ''}`}>

                    <div className={`${props.size === 'xs' || props.size === 'lg' ? '' : 'd-flex flex-column'} ${props.size === 'lg' ? 'justify-content-center' : ''} ${props.full ? '' : 'h-100'}`}>
                        <span className={`name  ${props.size === 'xs' ? '' : 'ellipsis'} ${props.full ? 'full' : 'my-auto'}`}>{name}</span>
                        {props.full &&
                            <span className={`code ${props.size === 'xs' ? 'ml-1' : ''}`}>{code}</span>
                        }
                    </div>
                    <span className={`d-block game-account ellipsis ${props.size === 'lg' ? 'text-align-center' : ''} ${props.size === 'xs' ? '' : 'mt-2'} `}>{props.player.account}</span>
                </div>
            </div>
        );
    }
}
