import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, ButtonTheme, ButtonType } from '../../atoms/Button/Button';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { IconMask } from '../../atoms/Icon/IconMask';
import { Tournament, TournamentFee } from '../../models/Tournament';
import './NCTournamentCard.scss';

export enum TournamentCardStyle {
    HIGHLIGHT1 = 1,
    HIGHLIGHT2 = 2,
    SIMILAR_TOURNAMENT = 3
}
export interface NCTournamentCardProps {
    tournament: Tournament;
    gameName: string;
    banner: string;
    restricted?: boolean;
    prize?: string;
    winner?: string;
    cardStyle?: TournamentCardStyle;
    forceSmall?: boolean;
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
    const marqueeSliderRef = useRef<HTMLDivElement | null>(null);
    const marqueeContainerRef = useRef<HTMLDivElement | null>(null);
    const [ marqueeWidth, setMarqueeWidth ] = useState<number>(0);
    const [ marqueeHeight, setMarqueeHeight ] = useState<number>(0);
    const [ ellipsis, setEllipsis ] = useState<boolean>(false);

    const mainAnimationDuration = 200;
    const [ textAnimationDuration, setTextAnimationDuration ] = useState<number>(0);
    const textAnimationSpeed = 20;
    const textAnimationMargin = 6;

    useEffect(() => {
        setTimeout(() => {
            if (platformContaierRef?.current) {
                const containerWidth = platformContaierRef.current.clientWidth;
                setPlatforms(
                    containerWidth < props.tournament.platforms.length * iconSize ?
                        [...platforms.slice(0, Math.floor(containerWidth / iconSize) - 1)] :
                        props.tournament.platforms
                );
            }
        }, mainAnimationDuration);
    }, [platformContaierRef.current]);

    useEffect(() => {
        setTimeout(() => {
            if (marqueeSliderRef.current && marqueeContainerRef.current) {
                const containerSize = marqueeContainerRef.current.offsetWidth;
                const sliderSize = marqueeSliderRef.current.offsetWidth;
                const marqueeSize = sliderSize - containerSize;
                setMarqueeWidth(marqueeSliderRef.current.offsetWidth < containerSize ? 0 : marqueeSize);
                setMarqueeHeight(marqueeSliderRef.current?.offsetHeight);
                setEllipsis(marqueeSliderRef.current.offsetWidth > containerSize);
                setTextAnimationDuration((sliderSize - containerSize - textAnimationMargin) / textAnimationSpeed);
            }
        }, mainAnimationDuration);
    }, [ marqueeSliderRef.current, marqueeContainerRef.current ]);

    const renderSecondRow = () => {
        return (
            <div className="tournament-infos">
                {
                    props.prize &&
                    <div>{ props.prize } €</div>
                }
                <div>{ intl.formatMessage({ id: `tournament.format.${props.tournament.format === 1 ? 'solo' : 'team' }` }) }</div>
            </div>
        );
    };

    const renderLastRow = () => {
        return (
            <div className="tournament-infos">
                <div>
                    {new Intl.DateTimeFormat('default', dateOption).format(new Date(props.tournament.date * 1000))}
                </div>
                {
                    platforms &&
                    <div
                        ref={platformContaierRef}
                        className="platform-container d-flex align-items-center"
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
                }
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
        <div
            className={
                `nc-tournament-card
                ${props.cardStyle === TournamentCardStyle.HIGHLIGHT1 ? 'highlight1' :
            (props.cardStyle === TournamentCardStyle.HIGHLIGHT2) ? 'highlight2' :
                (props.cardStyle === TournamentCardStyle.SIMILAR_TOURNAMENT) ? 'similar-tournament' : ''}
                ${props.restricted ? 'restricted' : ''}
                ${props.forceSmall ? 'small' : ''}`
            }
        >
            <div className="tournament-banner position-relative">
                <img
                    className="banner-image position-absolute"
                    src={props.banner}
                />
            </div>
            <div className="tournament-content align-self-center">
                <div
                    ref={marqueeContainerRef}
                    className={`marquee-container ${ellipsis ? 'manual-ellipsis' : ''}`}
                >
                    <div
                        className="position-relative marquee-content"
                        style={{
                            width: marqueeWidth,
                            height: marqueeHeight,
                        }}
                    >
                        <div
                            ref={marqueeSliderRef}
                            style={{ animationDuration: `${textAnimationDuration}s` }}
                            className="marquee-slider tournament-infos title position-absolute mt-1"
                        >
                            <div>{ props.gameName }</div>
                            <div>{ props.tournament.name }</div>
                        </div>
                    </div>
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

                <div className={`additional-infos mb-1 ${props.tournament.partner ? '' : 'mt-2'}`}>
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
