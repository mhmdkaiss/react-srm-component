import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Icon } from '../../atoms';
import { ButtonTheme, ButtonType } from '../../atoms/Button/Button';
import { IconType } from '../../atoms/Icon/Icon';
import { IconMask } from '../../atoms/Icon/IconMask';
import { NCProgressBar } from '../../atoms/NCProgressBar/NCProgressBar';
import { useProgressBar } from '../../hooks/useProgressBar';
import { ChallengeExtended, ContestType } from '../../models/Challenge';
import { rewardsToString } from '../../utils/rewards';
import './NCChallengeCard.scss';

type ChallengeContestType = {
    icon: IconType.ArtGallery;
    text: string;
}

const ICON_SIZE = 24;
const WINNER_ICON_SIZE = 16;
const CHALLENGE_CARD_DATE_FORMAT = 'dddd D MMMM HH:mm';

const CONTEST_TYPES = {
    [ContestType.PICTURE]: {
        icon: IconType.ArtGallery,
        text: 'Picture contest'
    },
    [ContestType.VIDEO]: {
        icon: IconType.Camera,
        text: 'Video contest'
    },
    [ContestType.TICKET]: {
        icon: IconType.Ticket,
        text: 'Tickets contest'
    }
};

export interface NCChallengeCardProps {
    challenge: ChallengeExtended;
    goTo: (challengeId: string) => void,
    color?: string
}

export const NCChallengeCard: React.FunctionComponent<NCChallengeCardProps> = (
    props: NCChallengeCardProps
) => {
    const { challenge } = props;
    const intl = useIntl();
    const [now] = useState<Moment>(moment());
    const [start] = useState<Moment>(moment(challenge.startDate));
    const [end] = useState<Moment>(moment(challenge.endDate));
    const [ progressRatio, setProgressRatio ] = useState<number>(0);
    const [ daysInfoMessage, setDaysInfoMessage ] = useState<string>('');
    const todayText = intl.formatMessage({ id: 'organization.challenges.starts_ends.today' });
    const rewards = rewardsToString(challenge.rewards);
    const { calculateProgressRatio, calculateTimeLeftText } = useProgressBar();

    useEffect(() => {
        setProgressRatio(calculateProgressRatio(challenge.startDate, challenge.endDate));
        setDaysInfoMessage(calculateTimeLeftText(challenge.startDate, challenge.endDate));
    }, [ challenge.startDate, challenge.endDate ]);

    const { isAvailableInRegion, type } = challenge;

    const renderGame = () => {
        return (
            challenge.game &&
                <div className='challenge-game' >
                    {challenge.game.slug &&
                        <IconMask
                            icon={`${process.env.REACT_APP_S3_PUBLIC_URL}/game/${challenge.game.slug}/medias/LogoImage`}
                            width={ICON_SIZE}
                            height={ICON_SIZE}
                            name='game'
                        />
                    }
                    {challenge.game.name &&
                        <p className="game-title">{challenge.game.name}</p>
                    }
                </div>
        );
    };

    const renderContestType = () => {
        const contestType: ChallengeContestType = Object.assign(CONTEST_TYPES[type]);
        return (
            <React.Fragment>
                {(challenge.game?.slug || challenge.game?.name) &&
                    <div className='separator'></div>
                }
                <div className='challenge-contest-type'>
                    <Icon
                        icon={contestType.icon}
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                    />
                    <p className='contest-type-text'>{contestType.text}</p>
                </div>
            </React.Fragment>
        );
    };

    const renderRewards = () => {
        return rewards &&
            <React.Fragment>
                {challenge.participants > 0 &&
                    <div className='separator'></div>
                }
                <div className='challenge-rewards'>{rewards}</div>
            </React.Fragment>;
    };

    const renderWinner = () => {
        return (
            challenge.winner &&
                <React.Fragment>
                    <div className='separator'></div>
                    <div className='challenge-winner d-flex'>
                        <Icon
                            icon={IconType.Crown}
                            width={WINNER_ICON_SIZE}
                            height={WINNER_ICON_SIZE}
                        />
                        <div className='winner'>{challenge.winner}</div>
                    </div>
                </React.Fragment>
        );
    };

    const formatContestDate = (id: string, date: Moment) => {
        return `${intl.formatMessage(
            { id }, { date: date === now ? todayText : date.format(CHALLENGE_CARD_DATE_FORMAT) }
        )}`;
    };

    const renderContestDate = () => {
        let startText, endText;
        if (progressRatio < 1) {
            if (start === end) {
                startText = formatContestDate('organization.challenges.starts_ends', start);
            } else {
                if (now <= start) {
                    startText = formatContestDate('organization.challenges.starts', start);
                }
                endText = formatContestDate('organization.challenges.ends', end);
            }
        } else {
            endText = formatContestDate('organization.challenges.ended', end);
        }
        return (
            <React.Fragment>
                {startText && <p>{startText}</p>}
                {(startText && endText) && <div className='separator'></div>}
                {(endText) && <p>{endText}</p>}
            </React.Fragment>
        );
    };

    return (
        <div className={
            `nc-challenge-card d-flex flex-row ${isAvailableInRegion ? '' : 'not-available'}`
        }>
            <div className="challenge-banner">
                <img className="banner-image" src={challenge.banner} />
            </div>
            <div className="challenge-content d-flex flex-column">
                <div className='challange-header'>
                    <div className='challange-title d-flex'>
                        <p>{challenge.i18n.title}</p>
                        {!isAvailableInRegion &&
                            <Icon
                                icon={IconType.UnavailableLocation}
                                width={ICON_SIZE}
                                height={ICON_SIZE}
                            />
                        }
                    </div>
                    <Button
                        label="More info"
                        styleClass='challenge-more-info'
                        theme={ButtonTheme.CLASSIC}
                        type={ButtonType.SECONDARY}
                        setClick={() => props.goTo(challenge.id)}
                    />
                </div>
                <div className='challange-info-container'>
                    <div className='d-flex'>
                        {renderGame()}
                        {renderContestType()}
                    </div>
                    {daysInfoMessage &&
                        <span className='view-leaderboard clickable'>
                            {intl.formatMessage({
                                id: 'organization.challenges.view_leaderboard'
                            })}
                        </span>
                    }
                </div>
                <div className='challange-date-container'>
                    {renderContestDate()}
                </div>
                <div className='challenge-ongoing-container'>
                    <NCProgressBar width='36%' ratio={progressRatio} color={props.color} />
                    {daysInfoMessage &&
                        <p className="ongoing-text">{daysInfoMessage}</p>
                    }
                </div>
                {challenge.i18n.description &&
                    <div className='challenge-description'>
                        {challenge.i18n.description}
                    </div>}
                <div className='challenge-footer'>
                    <div className='challenge-extra-info d-flex'>
                        {/* FIXME: Jira descrition: No 5v5
                            <div className='challenge-display-format'>5v5</div>
                            <div className='separator'></div> 
                        */}
                        {challenge.participants > 0 &&
                            <div className='challenge-participants'>
                                {`${intl.formatMessage(
                                    { id: 'organization.challenges.participants' },
                                    { noParticipants: challenge.participants }
                                )}`}
                            </div>
                        }
                        {renderRewards()}
                        {renderWinner()}
                    </div>
                    {!isAvailableInRegion &&
                        <div className='unavailable-location-text'>
                            {intl.formatMessage({ id: 'organization.challenges.not_available' })}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
