import React from 'react';
import { NCMenuAuthUser } from '../../../models/NCMenuUser';
import { NCCornerMenuVersion_1 } from './Version_1/NCCornerMenu';
import { NCCornerMenuVersion_2 } from './Version_2/NCCornerMenuV2';
import { MenuVersion } from '../../../models/MenuVersion';

export interface NCCornerMenuProps {
    partnerLogo: string;
    partnerLogoSmall: string;
    ncLogo: string;
    ncLogoSmall: string;
    hideNcLogo?: boolean;
    menuItems?: Array<MenuItem>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    language?: { selectedLanguage: string, availlableLanguages: Array<string>, onLanguageSelected: (language: string) => void }
    user: NCMenuAuthUser | null;
    onLogout: () => void;
    onOpenDashboard: () => void;
    variant: MenuVersion;
}

export interface MenuItem {
    name: string;
    href: string;
    hash?: string;
}

export const NCCornerMenu: React.FunctionComponent<NCCornerMenuProps> = (props: NCCornerMenuProps) => {
    const renderVersion = () => {
        switch (props.variant) {
            case MenuVersion.CENTERED_LOGO:
                return (<NCCornerMenuVersion_2 {...props} />);
            case MenuVersion.CLASSIC:
            default:
                return (<NCCornerMenuVersion_1 {...props} />);
        }
    };
    return (<React.Fragment>{renderVersion()}</React.Fragment>);
};
