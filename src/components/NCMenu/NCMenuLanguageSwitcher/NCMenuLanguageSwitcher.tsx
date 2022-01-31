import React, { useState } from 'react';
import { NCLanguageIcon } from '../../../atoms/NCLanguageIcon/NCLanguageIcon';

export interface NCMenuLanguageSwitcherProps {
  languages: Array<string>,
  selectedLanguage: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLanguageSelected: (language: string) => void,
  isSideMenu?: boolean,
}

export const NCMenuLanguageSwitcher: React.FunctionComponent<NCMenuLanguageSwitcherProps> = (props) => {
    const [ isLanguageMenuOpen, setIsLanguageMenuOpen ] = useState<boolean>(false);

    const renderSideMenuSwitcher = () => {
        return <div className='d-flex w-100 justify-content-around'>
            { props.languages.map(l => {
                return <NCLanguageIcon key={l} language={l} onClick={() => props.onLanguageSelected(l)} />;
            })}
        </div>;
    };

    const renderSwitcher = () => {
        return <NCLanguageIcon language={props.selectedLanguage} onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}/>;
    };

    return <div className='nc-menu-language-switcher'>
        { props.isSideMenu ? renderSideMenuSwitcher() : renderSwitcher()}
    </div>;
};

