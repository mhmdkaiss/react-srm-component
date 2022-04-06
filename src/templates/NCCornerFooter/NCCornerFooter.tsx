import React from 'react';
import { SocialEnum } from '../../models/Social';
import { NCCornerFooterV1 } from './NCCornerFooterV1';
import { NCCornerFooterV2 } from './NCCornerFooterV2';

export enum NCCornerFooterVariant {
    V1,
    V2
}
export interface NCCornerFooterProps {
    logos?: Array<{image: string, url: string}>
    links?: Array<{name: string, url: string}>
    social?: Array<{type: SocialEnum, url: string}>
    variant?: NCCornerFooterVariant
    socialCustomText?: string
}

export const NCCornerFooter: React.FunctionComponent<NCCornerFooterProps> = (props) => {
    switch (props.variant) {
        case NCCornerFooterVariant.V2:
            return <NCCornerFooterV2 logos={props.logos} links={props.links} social={props.social} socialCustomText={props.socialCustomText}>{props.children}</NCCornerFooterV2>;
        default:
            return <NCCornerFooterV1 logos={props.logos} links={props.links} social={props.social}>{props.children}</NCCornerFooterV1>;
    }
};
