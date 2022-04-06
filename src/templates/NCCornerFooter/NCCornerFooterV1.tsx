import React from 'react';
import { SocialEnum } from '../../models/Social';
import { NCCornerFooterLinks } from './NCCornerFooterLinks';
import { NCCornerFooterSocial } from './NCCornerFooterSocial';

export interface NCCornerFooterV1Props {
    logos?: Array<{image: string, url: string}>
    links?: Array<{name: string, url: string}>
    social?: Array<{type: SocialEnum, url: string}>
}

export const NCCornerFooterV1: React.FunctionComponent<NCCornerFooterV1Props> = (props) => {
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
            <NCCornerFooterSocial social={props.social} />
            <NCCornerFooterLinks links={props.links} />
        </div>
    );
};
