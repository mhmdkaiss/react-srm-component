import React from 'react';
import { Icon, IconType } from '../atoms/Icon/Icon';
import { GoogleIcon } from '../styles/svg';

type UseIconReturnType = {
    getIcon: (id: string) => JSX.Element;
};

const ICONS = {
    google: <GoogleIcon />,
    notification: <Icon width={24} height={24} icon={IconType.Notification} styleName={'nc-notification-button-icon nc-active-icon'} />,
    mobile: <Icon width={24} height={24} icon={IconType.Mobile} styleName={'nc-notification-button-icon nc-active-icon'} />
};

export const useIcon = () : UseIconReturnType => {
    /**
     * Function to get the specific icon
     */
    const getIcon = ((nameId: string) => {
        return ICONS[nameId];
    });

    return { getIcon };
};
