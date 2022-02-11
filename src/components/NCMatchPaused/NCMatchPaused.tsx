import React from 'react';
import { useIntl } from 'react-intl';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { NCCountdown } from '../../atoms/NCCountdown/NCCountdown';
import { formatDateTime } from '../../utils/formatDateTime';
import './NCMatchPaused.scss';

interface NCMatchPausedProps {
    round: string;
    date: string;
}

export const NCMatchPaused: React.FunctionComponent<NCMatchPausedProps> = (
    props: NCMatchPausedProps
) => {
    const { round, date } = props;
    const intl = useIntl();
    const formatted = formatDateTime(date);

    return (
        <React.Fragment>
            <div className='nc-match-paused-container'>
                <div className='nc-match-header-container'>
                    <p className='nc-match-stage'>
                        {intl.formatMessage({ id: `${round}` })}
                    </p>
                    <div className="nc-copy-match-id clickable">
                        <Icon
                            icon={IconType.Copy}
                            width={16}
                            height={16}
                            styleName="nc-copy-match-paused-id-icon"
                        />
                        <p>Copy match ID</p>
                    </div>
                </div>
                <div className='nc-scheduled-date-container'>
                    <div className='nc-match-scheduled-date'>
                        {formatted.date}
                    </div>
                    <NCCountdown datetime={date} />
                </div>
            </div>
        </React.Fragment>
    );
};
