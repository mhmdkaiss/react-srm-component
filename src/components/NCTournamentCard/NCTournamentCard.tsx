import './NCTournamentCard.scss';

import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Icon, IconMask, Button, ButtonTheme, ButtonType, IconType } from '../..';
import { Tournament, TournamentFee } from '../../models/Tournament';

export enum TournamentCardStyle {
    HIGHLIGHT1 = 1,
    HIGHLIGHT2 = 2
}
export interface NCTournamentCardProps {
    tournament: Tournament;
    gameName: string;
    gameId: string;
    restricted?: boolean;
    prize?: string;
    winner?: string;
    cardStyle?: TournamentCardStyle;
    joinHook?: (event: React.MouseEvent) => void;
    readHook?: (event: React.MouseEvent) => void;
}

export const NCTournamentCard: React.FunctionComponent<NCTournamentCardProps> = (props: NCTournamentCardProps) => {
    const intl = useIntl();
    const [ platforms, setPlatforms ] = useState<Array<string>>(props.tournament.platforms);
    const platformContaierRef = useRef<HTMLDivElement | null>(null);

    const dateOption: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    const iconSize = 16;

    useEffect(() => {
        if (platformContaierRef?.current) {
            const containerWidth = platformContaierRef.current.clientWidth;
            const childCount = platformContaierRef.current.childElementCount;
            if (containerWidth < childCount* iconSize) {
                setPlatforms([...platforms.slice(0, Math.floor(containerWidth / iconSize) - 2)]);
            }
        }
    }, [platformContaierRef]);

    const renderSecondRow = () => {
        return (
            <div className="tournament-infos">
                <div>{ props.prize }</div>
                <div>{ intl.formatMessage({ id: `tournament.format.${props.tournament.min === 1 ? 'solo' : 'team' }` }) }</div>
            </div>
        );
    };

    const renderLastRow = () => {
        return (
            <div className="tournament-infos">
                <div>
                    {new Intl.DateTimeFormat('default', dateOption).format(new Date(props.tournament.date * 1000))}
                </div>
                <div
                    ref={platformContaierRef}
                    className="d-flex align-items-center"
                >
                    {
                        platforms.map(platform => {
                            return (
                                <IconMask
                                    key={platform}
                                    icon={`${process.env.REACT_APP_S3_URL}/media/platforms/${platform}.svg`}
                                    width={iconSize}
                                    height={iconSize}
                                    name="platform"
                                />
                            );
                        })
                    }
                    {
                        props.tournament.platforms.length > platforms.length &&
                        <Icon
                            icon={IconType.Plus}
                            width={iconSize - 4}
                            height={iconSize - 4}
                            styleName="ml-1"
                        />
                    }
                </div>
            </div>
        );
    };

    const renderWinner = () => {
        return props.winner ?
            <div className="tournament-infos">
                <div className="winner">
                    <Icon
                        icon={IconType.Crown}
                        width={16}
                        height={16}
                        styleName="mr-2"
                    />
                    <div>{props.winner}</div>
                </div>
            </div> :
            null;
    };

    const renderPartner = () => {
        return (
            <div className="partner my-2">
                <div className="mr-2">
                    { intl.formatMessage({ id: 'tournament.card.sponsored' }) }
                </div>
                <img
                    src={`${process.env.REACT_APP_S3_URL}/organization/${props.tournament.partner}/medias/LeftMenuIcon`}
                    className="icon-partner"
                />
            </div>
        );
    };

    return (
        <div className={
            `nc-tournament-card
            ${props.cardStyle === TournamentCardStyle.HIGHLIGHT1 ? 'highlight1' :
            (props.cardStyle === TournamentCardStyle.HIGHLIGHT2) ? 'highlight2' : ''}
            ${props.restricted ? 'restricted' : ''}`
        }>
            <div className="tournament-banner position-relative">
                <img
                    className="banner-image position-absolute"
                    src={`${process.env.REACT_APP_S3_PUBLIC_URL}/game/${props.gameId}/medias/TournamentBanner`}
                />
            </div>
            <div className="tournament-content align-self-center">
                <div className="tournament-infos title mt-1">
                    <div>{ props.gameName }</div>
                    <div>{ props.tournament.name }</div>
                </div>
                {
                    !props.restricted &&
                    <div className='tournament-infos text-uppercase entrance mb-2'>
                        <div>{ intl.formatMessage({ id: `tournament.card.fee.${TournamentFee[props.tournament.entrance.fee].toLowerCase()}` }) }</div>
                    </div>
                }
                {
                    props.restricted ?
                        <div className="tournament-infos">
                            <div>{ intl.formatMessage({ id: 'tournament.card.restricted' }) }</div>
                        </div> :
                        renderSecondRow()
                }
                {
                    props.winner ?
                        renderWinner() :
                        renderLastRow()
                }

                <div className="additional-infos">
                    {
                        props.winner &&
                            renderLastRow()
                    }
                    {
                        props.tournament.partner &&
                        <div className="partner-container d-flex justify-content-between align-items-center">
                            { renderPartner() }
                            { renderWinner() }
                        </div>
                    }
                    <div className={`d-flex justify-content-${props.winner ? 'end' : 'between'}`}>
                        <Button
                            theme={ButtonTheme.TOURNAMENT}
                            type={props.restricted || props.winner ? ButtonType.SECONDARY : ButtonType.PRIMARY}
                            label={intl.formatMessage({ id: `tournament.card.${props.winner ? 'about' : props.restricted ? 'moreinfo' : 'join'}` })}
                            setClick={(e: React.MouseEvent) => {
                                if (props.joinHook) {
                                    props.joinHook(e);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
