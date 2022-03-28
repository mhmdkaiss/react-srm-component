import React from 'react';
import { ReminderToolPropsType } from '../../components/NCReminderTools/NCReminderTools';
import { useIcon } from '../../hooks/useIcon';
import './NCNotificationButton.scss';

export const NCNotificationButton: React.FunctionComponent<ReminderToolPropsType> = ( props: ReminderToolPropsType ) => {
    const { getIcon } = useIcon();
    const { iconName, label, action } = props;
    return (
        <div className="nc-notification-button" onClick={action}>
            <div className="nc-icon-container">
                { getIcon(iconName) }
            </div>
            <p className="nc-notification-button-text">{ label }</p>
        </div>
    );
};

