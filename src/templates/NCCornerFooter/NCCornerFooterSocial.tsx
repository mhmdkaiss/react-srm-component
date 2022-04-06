import React from 'react';
import { IconType, Icon } from '../../atoms/Icon/Icon';
import { SocialEnum } from '../../models/Social';
export interface NCCornerFooterSocialProps {
    social?: Array<{type: SocialEnum, url: string}>
    socialCustomText?: string
}

export const NCCornerFooterSocial: React.FunctionComponent<NCCornerFooterSocialProps> = (props) => {
    return <React.Fragment>
        {props.social && <div className='social-section footer-section'>
            {props.socialCustomText && <div className='social-custom-text'>
                {props.socialCustomText}
            </div>}
            <div className='d-flex justify-content-around'>
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
                })}
            </div>
        </div>}
    </React.Fragment>;
};
