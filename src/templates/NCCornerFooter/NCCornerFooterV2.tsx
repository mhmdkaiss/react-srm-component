import React from 'react';
import { SocialEnum } from '../../models/Social';
import { NCCornerFooterLinks } from './NCCornerFooterLinks';
import { NCCornerFooterSocial } from './NCCornerFooterSocial';

export interface NCCornerFooterV2Props {
    logos?: Array<{image: string, url: string}>
    links?: Array<{name: string, url: string}>
    social?: Array<{type: SocialEnum, url: string}>
    socialCustomText?: string
}

export const NCCornerFooterV2: React.FunctionComponent<NCCornerFooterV2Props> = (props) => {
    return (
        <div className="nc-corner-footer">
            <div className='logo-social-container d-flex flex-column flex-md-row justify-content-around align-items-center'>
                {props.logos && <div className='logo-section footer-section d-flex flex-column'>
                    <div className='powered-by'>Powered by</div>
                    <div className='logos d-flex justify-content-around align-items-center flex-row'>
                        {props.logos.map(l => {
                            return <a className='logo' key={l.image} href={l.url}><img src={l.image}></img></a>;
                        })}
                    </div>
                </div>}
                <NCCornerFooterSocial social={props.social} socialCustomText={props.socialCustomText}/>
            </div>
            {props.children && <div className='custom-content-section footer-section d-flex justify-content-center'>
                {props.children}
            </div>}
            <NCCornerFooterLinks links={props.links} />
        </div>
    );
};
