import React from 'react';
import { NCNotificationButtons } from '../../molecules';
import './NCReminderTools.scss';

export type ReminderToolPropsType = {
    iconName: string,
    label:string,
    action: () => void;
    showFinger?: boolean,
}

interface NCReminderToolsProps {
    text: string;
    reminderTools: Array<ReminderToolPropsType>
}

export const NCReminderTools: React.FunctionComponent<NCReminderToolsProps> = ({ text, reminderTools }) => {
    return (
        <div className="nc-reminder-tools">
            <p>{text}</p>
            <NCNotificationButtons buttons={reminderTools} />
        </div>
    );
};
