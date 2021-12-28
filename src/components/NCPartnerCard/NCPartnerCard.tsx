import React from 'react';
import './NCPartnerCard.scss';
import { Partner } from '../../models/Partner';
import { Icon, IconType } from '../../atoms/Icon/Icon';

export interface NCPartnerCardProps {
    partner: Partner
}

export const NCPartnerCard: React.FunctionComponent<NCPartnerCardProps> = (props: NCPartnerCardProps) => {
    return (
        <div className='nc-partner-card-component'>
            <img className='image' src={props.partner.image} alt={props.partner.name}></img>
            <div className='text-elipsis name my-2'>{props.partner.name}</div>
            <div className='social'>
                {props.partner.social && Object.keys(props.partner.social).map(s => {
                    const url = props.partner.social ? props.partner.social[s] : '';
                    if (!url || !url.length) {
                        return;
                    }
                    const iconKey = Object.keys(IconType).find(i => {
                        return IconType[i] === s;
                    });
                    if (!iconKey) {
                        return;
                    }
                    return <a key={s} href={url} target="_blank" rel="noopener noreferrer">
                        <Icon icon={IconType[iconKey]} width={18} height={18} />
                    </a>;
                })}
            </div>
        </div>
    );
};
