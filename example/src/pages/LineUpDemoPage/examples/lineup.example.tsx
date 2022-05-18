import React from 'react';
import { NCCard, NCLineUp, NCReminderTools, NCTitle } from '@cactus/srm-component';

export const NCLineUpExample: React.FunctionComponent = () => {
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

    return (
        <>
            <NCCard>
                <NCTitle label={'Line up this song'} />
                <NCLineUp
                    message={'Thank you for watching this widget. Here the all steps to follow:'}
                    nextSteps={demoSteps}
                />
                <NCReminderTools
                    text={'Some tools for remindig you some news:'}
                    reminderTools={reminderTools}
                />
            </NCCard>
        </>
    );
};
