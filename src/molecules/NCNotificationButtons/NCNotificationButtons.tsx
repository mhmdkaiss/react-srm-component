import React from 'react';
import { NCNotificationButton } from '../../atoms';
import { ReminderToolPropsType } from '../../components/NCReminderTools/NCReminderTools';
import './NCNotificationButtons.scss';

interface NCNotificationButtonsProps {
    buttons: Array<ReminderToolPropsType>;
    showFingers?: boolean;
}

export const NCNotificationButtons: React.FunctionComponent<NCNotificationButtonsProps> = ({ buttons, showFingers }) => {
    return (
        <div className="nc-notification-buttons-container">
            {
                buttons.map((button, i: number) => {
                    return (
                        <NCNotificationButton
                            showFinger= {showFingers}
                            key={`notification-button-${i}`}
                            {...button}
                        />
                    );
                })
            }
        </div>
    );
};

