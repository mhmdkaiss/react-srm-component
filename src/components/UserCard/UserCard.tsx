import "./UserCard.scss";

import React from "react";
import { Player } from "../../models/Player";
import { ProfilePicture } from "../ProfilePicture/ProfilePicture";

export interface UserCardProps {
    playerId: string;
    player: Player;
    full: boolean;
    xs: boolean;
    lg?: boolean;
    hoverHook?: (hovered?: string) => void;
}

export const UserCard: React.FunctionComponent<UserCardProps> = (props: UserCardProps) => {
    const backgroundFallback = process.env.REACT_APP_S3_URL + "/media/default/default-user-banner.jpg";
    const hashIndex = props.player.name.lastIndexOf('#');
    const code = hashIndex !== -1 ? props.player.name.slice(hashIndex) : '';
    const name = hashIndex !== -1 ? props.player.name.slice(0, hashIndex) : props.player.name;
    return (
        <div className={`d-flex user-card overflow-hidden position-relative ${props.xs ? 'user-card-xs' : ''} ${props.lg ? 'user-card-lg': '' } ${props.full ? 'full px-2 py-3' : 'p-2'}`}
        onMouseEnter={() => props.hoverHook ? props.hoverHook (props.playerId) : ''}
        onMouseLeave={() => props.hoverHook ? props.hoverHook(undefined) : ''}>
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
            <div className={`background-gradient w-100 h-100 position-absolute ${props.lg ? 'justify-content-center' : ''}`} ></div>

                    
            {/* <div className={`${props.lg ? 'mt-2 flex-column w-100' : ''}  `}>
                <ProfilePicture size={props.full && !props.xs ? 60 : 40} playerId={props.playerId} player={props.player} />
                <div className={`text-content mt-2 h-100 ${props.lg ? 'text-center': ''}`}>

                    <div className={`${props.xs || props.lg ? '' : 'd-flex display-inline'} ${!props.xs && props.lg ? 'justify-content-center' : ''} ${props.full ? '' : 'h-100'}`}></div>
                        <span className={`name  ${props.xs ? '' : 'ellipsis'} ${props.full ? 'full' : 'my-auto'}`}>{name}</span>
                            {props.full &&
                            <span className={`code ${props.xs ? 'ml-1' : ''}`}>{code}</span>
                        }
                    
                </div>
            </div> */}
            
            <ProfilePicture size={props.full && !props.xs ? 80 : 40} playerId={props.playerId} player={props.player} />
            <div className={`text-content  ${props.lg ? 'mt-2' : 'ml-3 my-auto'} h-100 ${props.xs ? 'user-card-xs' : ''}`}>

                <div className={`${props.xs || props.lg ? '' : 'd-flex flex-column'} ${!props.xs && props.lg ? 'justify-content-center' : ''} ${props.full ? '' : 'h-100'}`}>
                    <span className={`name  ${props.xs ? '' : 'ellipsis'} ${props.full ? 'full' : 'my-auto'}`}>{name}</span>
                    {props.full &&
                        <span className={`code ${props.xs ? 'ml-1' : ''}`}>{code}</span>
                    }
                </div>
                <span className={`d-block game-account ellipsis ${props.lg ? 'text-align-center':''} ${props.xs ? '' : 'mt-2'} `}>{props.player.account}</span>
            </div>
        </div>
    );
}
