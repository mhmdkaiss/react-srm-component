import {
    NCCard,
    NCDialog,
    NCLineUp,
    NCReminderTools,
    NCTitle
} from '@cactus/srm-component';
import React, { useState } from 'react';

export const LineUpDemoPage: React.FunctionComponent = () => {
    const [ open, setOpen ] = useState<boolean>(false);

    const demoSteps = [
        'One, two, three, one, two, three, drink',
        'One, two, three, one, two, three, drink',
        'One, two, three, one, two, three, drink',
        'Throw \'em back till I lose count!',
    ];

    const reminderTools = [
        {
            iconName: 'google',
            label: 'Add to google calendar',
            action: () => {
                window.open(
                    'https://www.google.com/calendar/render?action=TEMPLATE&text=Save the date&dates=20221020T080000Z/20221020T100000Z&details=Have fun @ https://nicecactus.gg/', '_blank'
                );
            },
        },
        {
            iconName: 'notification',
            label: 'Ringin\' my doorbell',
            action: async() => {
                console.log('notification permission: ', Notification.permission);
                if (Notification.permission !== 'granted') {
                    console.log('sending new request (?)');
                    await Notification.requestPermission();
                }
            },
        }
    ];

    const lineUpTitle = 'Line up this song';
    const lineUpMessage = 'Thank you for watching this widget. Here the all steps to follow:';
    const reminderToolsText = 'Some tools for remindig you some news:';

    return (
        <React.Fragment>
            <h1 className="secondary-color-light pb-3">
                Line up widget
            </h1>
            <NCCard>
                <NCTitle label={lineUpTitle} />
                <NCLineUp message={lineUpMessage} nextSteps={demoSteps} />
                <NCReminderTools
                    text={reminderToolsText}
                    reminderTools={reminderTools}
                />
            </NCCard>
            <NCDialog show={open} setShow={setOpen}>
                <div>
                    Demo Dialog
                </div>
            </NCDialog>
        </React.Fragment>
    );
};
