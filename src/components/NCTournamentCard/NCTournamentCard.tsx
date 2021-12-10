import './NCTournamentCard.scss';

import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { IconMask, Button, ButtonTheme, ButtonType } from '../..';

export enum CardSize {
    xs = 1,
    s = 2,
    m = 3,
    l = 4,
}

export interface NCTournamentCardProps {
    name: string;
    banner: string;
    date: number;
    platforms: Array<string>,
    format: number,
    prize: number,
    size?: CardSize,
    partner?: string,
    joinHook?: (event: React.MouseEvent) => void;
    readHook?: (event: React.MouseEvent) => void;
}

export const NCTournamentCard: React.FunctionComponent<NCTournamentCardProps> = (props: NCTournamentCardProps) => {
    const intl = useIntl();
    const test = useRef<HTMLDivElement | null>(null);
    const size = props.size || CardSize.s;

    const dateOption: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    useEffect(() => {
        console.log(test);
    }, [test]);

    const renderFirstRow = () => {
        return (
            <React.Fragment>
                <div className="d-flex align-items-center">
                    <span className={size === CardSize.l ? 'mr-1 font-weight-bold' : 'mr-1'}>
                        {props.prize}€
                    </span>
                    <span className="text-lowercase">
                        {intl.formatMessage({ id: 'tournament.card.prize' })}
                    </span>
                </div>
                <div className="d-flex align-items-center">
                    {props.format}v{props.format}
                </div>
            </React.Fragment>
        );
    };

    const renderSecondRow = () => {
        return (
            <React.Fragment>
                <div className="d-flex align-items-center">
                    {new Intl.DateTimeFormat('default', dateOption).format(new Date(props.date * 1000))}
                </div>
                <div className="d-flex align-items-center">
                    {
                        props.platforms.map(platform => {
                            return (
                                <IconMask
                                    key={platform}
                                    icon={`${process.env.REACT_APP_S3_URL}/media/platforms/${platform}.svg`}
                                    width={16}
                                    height={16}
                                    name="platform"
                                />
                            );
                        })
                    }
                </div>
            </React.Fragment>
        );
    };

    return (
        <div className={`nc-tournament-card ${CardSize[size]} ${size === CardSize.l ? 'd-flex' : ''}`}>
            <div
                className="tournament-banner w-100"
                style={{ backgroundImage: `url(${props.banner})` }}>
            </div>
            <div className="tournament-content align-self-center">
                <div className="tournament-title mt-2">
                    {props.name}
                </div>

                <div className={`tournament-infos info-text d-flex ${size === CardSize.l ? 'my-2' : 'my-1'}`}>
                    {renderFirstRow()}
                    {
                        size !== CardSize.xs && size !== CardSize.l &&
                        renderSecondRow()
                    }
                </div>
                {
                    (size === CardSize.xs || size === CardSize.l) &&
                    <div className="tournament-infos info-text d-flex my-1">
                        {renderSecondRow()}
                    </div>
                }
                {
                    size === CardSize.l &&
                    <React.Fragment>
                        {
                            props.partner &&
                            <div className="d-flex justify-content-end align-items-center my-2">
                                <div className="mr-2 info-text">
                                    { intl.formatMessage({ id: 'tournament.card.sponsored' }) }
                                </div>
                                <img
                                    src={`${process.env.REACT_APP_S3_URL}/organization/${props.partner}/medias/LeftMenuIcon`}
                                    className="icon-partner"
                                />
                            </div>
                        }
                        <div className="d-flex justify-content-between">
                            <Button
                                theme={ButtonTheme.TOURNAMENT}
                                type={ButtonType.SECONDARY}
                                label={intl.formatMessage({ id: 'tournament.card.about' })}
                                styleClass="mr-2"
                                setClick={(e: React.MouseEvent) => {
                                    if (props.readHook) {
                                        props.readHook(e);
                                    }
                                }}
                            />
                            <Button
                                theme={ButtonTheme.TOURNAMENT}
                                type={ButtonType.PRIMARY}
                                label={intl.formatMessage({ id: 'tournament.card.join' })}
                                setClick={(e: React.MouseEvent) => {
                                    if (props.joinHook) {
                                        props.joinHook(e);
                                    }
                                }}
                            />
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    );
};
