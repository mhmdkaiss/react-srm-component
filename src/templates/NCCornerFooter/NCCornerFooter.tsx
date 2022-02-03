import React from 'react';
import { useIntl } from 'react-intl';
import { IconType, Icon } from '../../atoms/Icon/Icon';
import { SocialEnum } from '../../models/Social';

export interface NCCornerFooterProps {
    logos?: Array<{image: string, url: string}>
    links?: Array<{name: string, url: string}>
    social?: Array<{type: SocialEnum, url: string}>
}

export const NCCornerFooter: React.FunctionComponent<NCCornerFooterProps> = (props) => {
    const intl = useIntl();
    return (
        <div className="nc-corner-footer">
            {props.logos && <div className='logo-section footer-section d-flex justify-content-around align-items-center flex-column flex-md-row'>
                {props.logos.map(l => {
                    return <a key={l.image} href={l.url}><img src={l.image}></img></a>;
                })}
            </div>}
            {props.children && <div className='custom-content-section footer-section d-flex justify-content-center'>
                {props.children}
            </div>}
            {props.social && <div className='social-section footer-section d-flex justify-content-around'>
                {props.social.map(l => {
                    const iconKey = Object.keys(IconType).find(i => {
                        return IconType[i] === l.type.toLowerCase();
                    });
                    if (!iconKey) {
                        return;
                    }
                    return <a key={l.type} href={l.url}>
                        <Icon icon={IconType[iconKey]} />
                    </a>;
                })}</div>}
            {props.links && <div className='links-section footer-section d-flex justify-content-around align-items-center flex-column flex-md-row'>
                {props.links.map(l => {
                    const nameTranslated = intl.messages[l.name] ? intl.formatMessage({ id: l.name }): l.name;
                    return <a key={l.name} href={l.url}>{nameTranslated}</a>;
                })}</div>}
        </div>
    );
};
