import React from 'react';
import { useIntl } from 'react-intl';

export interface NCCornerFooterLinksProps {
    links?: Array<{name: string, url: string}>
}

export const NCCornerFooterLinks: React.FunctionComponent<NCCornerFooterLinksProps> = (props) => {
    const intl = useIntl();
    return <React.Fragment>
        {props.links && <div className='links-section footer-section d-flex justify-content-around text-center align-items-center flex-column flex-md-row'>
            {props.links.map(l => {
                const nameTranslated = intl.messages[l.name] ? intl.formatMessage({ id: l.name }): l.name;
                return <a key={l.name} href={l.url}>{nameTranslated}</a>;
            })}</div>}
    </React.Fragment>;
};
