import React from 'react';
import { ReminderToolPropsType } from '../../components/NCReminderTools/NCReminderTools';
import { useIcon } from '../../hooks/useIcon';
import './NCNotificationButton.scss';
import { FingerIndicator } from '../../components/FingerIndicator/FingerIndicator';

export const NCNotificationButton: React.FunctionComponent<ReminderToolPropsType> = ( props: ReminderToolPropsType ) => {
    const { getIcon } = useIcon();
    const { iconName, label, action, showFinger } = props;
    return (
        <div className="nc-notification-button" onClick={action}>
            <div className="nc-icon-container">
                { getIcon(iconName) }
            </div>
            <p className="nc-notification-button-text">{ label }</p>
            {
                showFinger &&
                <div className='position-absolute finger-container mt-4'>
                    <FingerIndicator />
                </div>
            }
        </div>
    );
};

