import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { MemoizedNCMenuAuth, NCMenuAuth } from '../NCMenuAuth/NCMenuAuth';
import './NCCornerMenu.scss';
import { Link } from 'react-router-dom';
import { NCMenuLanguageSwitcher } from '../NCMenuLanguageSwitcher/NCMenuLanguageSwitcher';
import { NCDropdownMenu } from '../../../atoms/NCDropdownMenu/NCDropdownMenu';
import { NCMenuAuthUser } from '../../../models/NCMenuUser';
import { NCCornerSideMenu } from './NCCornerSideMenu';
import { Icon, IconType } from '../../../atoms/Icon/Icon';
import { useIntl } from 'react-intl';

export interface NCCornerMenuProps {
    logo: string;
    hideNcLogo?: boolean
    menuItems?: Array<MenuItem>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    language?: { selectedLanguage: string, availlableLanguages: Array<string>, onLanguageSelected: (language: string) => void }
    user: NCMenuAuthUser | null;
    onLogout: () => void;
    onOpenDashboard: () => void;
}

export interface MenuItem {
    name: string;
    href: string;
    hash?: string;
}

export const NCCornerMenu: React.FunctionComponent<NCCornerMenuProps> = (props: NCCornerMenuProps) => {
    const intl = useIntl();
    const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);
    const renderMenuItem = (menuItem: MenuItem) => {
        const nameTranslated = intl.messages[menuItem.name] ? intl.formatMessage({ id: menuItem.name }): menuItem.name;
        if (menuItem.href.startsWith('/') ) {
            return <HashLink onClick={() => setIsMenuOpen(false)} smooth to={{ pathname: menuItem.href, hash: menuItem.hash }} >{nameTranslated}</HashLink>;
        }
        return <a href={menuItem.href}>{nameTranslated}</a>;
    };

    const toggleSideMenu = (e: React.MouseEvent) => {
        e.nativeEvent.stopImmediatePropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="nc-corner-menu d-flex">
            <div
                className="top-menu-container d-none d-md-flex w-100 px-4"
            >
                <div className='d-flex align-items-center'>
                    <HashLink smooth to={{ pathname: '/', hash: '#' }} className='mr-4'>
                        <img
                            src={props.logo}
                            className='logo'
                            alt="logo"
                        />
                    </HashLink>
                    { !props.hideNcLogo && <a href={process.env.REACT_APP_NICECACTUS_URL}>
                        <img
                            src={`${process.env.REACT_APP_S3_URL}/media/assets/nc-logo-horizontal.png`}
                            className="logo d-none d-lg-block"
                            alt="Nicecactus Logo"
                        />
                        <img
                            src={`${process.env.REACT_APP_S3_URL}/media/assets/nc-logo-small.png`}
                            className="logo d-lg-none"
                            alt="Nicecactus Logo"
                        />
                    </a> }
                </div>
                <div className="menu-items d-flex align-items-center justify-content-center text-center">
                    {props.menuItems?.map(menuItem => {
                        return <span key={menuItem.name} className='mx-3'>
                            {renderMenuItem(menuItem)}
                        </span>;
                    })}
                </div>
                <div className="menu-buttons d-flex align-items-center">
                    { props.language && props.language.availlableLanguages?.length > 1 && <div className='language-switcher mx-4'>
                        <NCMenuLanguageSwitcher languages={props.language.availlableLanguages} selectedLanguage={props.language.selectedLanguage} onLanguageSelected={props.language.onLanguageSelected}/>
                        <div className="position-fixed menu pt-2">
                            <NCDropdownMenu items={ props.language.availlableLanguages.map(l => {
                                return {
                                    name: l.toUpperCase(),
                                    onClick: () => props.language?.onLanguageSelected(l)
                                };
                            })}
                            />
                        </div>
                    </div>}
                    <MemoizedNCMenuAuth user={props.user} onLogout={props.onLogout} onOpenDashboard={props.onOpenDashboard} />
                </div>
            </div>

            <div className="d-md-none top-menu-container w-100 px-2 px-sm-3">
                <div className="d-flex align-items-center">
                    <div className='side-menu-button cursor-pointer d-flex justify-content-center align-items-center' onClick={(e) => toggleSideMenu(e)}>
                        <Icon icon={IconType.BurgerMenu}/>
                    </div>
                    <NCCornerSideMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
                        {props.menuItems?.map(menuItem => {
                            return <div key={menuItem.name} className="menu-item d-flex justify-content-around">
                                {renderMenuItem(menuItem)}
                            </div>;
                        })}
                        <NCMenuAuth onAction={() => setIsMenuOpen(false)} isSideMenu={true} user={props.user} onLogout={props.onLogout} onOpenDashboard={props.onOpenDashboard} />
                        { props.language && props.language?.availlableLanguages?.length > 1 && <div className='mx-4'>
                            <NCMenuLanguageSwitcher
                                languages={props.language.availlableLanguages}
                                selectedLanguage={props.language.selectedLanguage}
                                onLanguageSelected={props.language.onLanguageSelected}
                                isSideMenu={true}
                            />
                        </div>}
                    </NCCornerSideMenu>
                    <div className='d-flex justify-content-center'>
                        <Link to="/" className='mx-3'>
                            <img
                                src={props.logo}
                                className='logo'
                                alt="logo"
                            />
                        </Link>
                        { !props.hideNcLogo && <a href={process.env.REACT_APP_NICECACTUS_URL}>
                            <img
                                src={`${process.env.REACT_APP_S3_URL}/media/assets/nc-logo-small.png`}
                                className="logo"
                                alt="Nicecactus Logo"
                            />
                        </a> }
                    </div>
                </div>
                <div className="menu-buttons">
                    <MemoizedNCMenuAuth onAction={() => setIsMenuOpen(false)} user={props.user} onLogout={props.onLogout} onOpenDashboard={props.onOpenDashboard} />
                </div>
            </div>
        </div>
    );
};
