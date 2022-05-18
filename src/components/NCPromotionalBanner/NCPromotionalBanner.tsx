import React from 'react';
import { NCBackgroundImage, NCCard } from '../../atoms';
import { Button, ButtonSize, ButtonTheme, ButtonType } from '../../atoms/Button/Button';
import { useDynamicText } from '../../hooks/useDynamicText';
import './NCPromotionalBanner.scss';

export interface NCPromotionalBannerProps {
    image: string,
    text?: Array<string>;
    buttonText?: string;
    buttonLink?: string;
}

export const NCPromotionalBanner: React.FunctionComponent<NCPromotionalBannerProps> = (
    props: NCPromotionalBannerProps
) => {
    const dynamicTextValue = props.text?.length ? useDynamicText(props.text) : undefined;

    const openLink = () => {
        window.open(props.buttonLink, '_blank');
    };

    return (
        <div
            className={`nc-promo-banner ${props.buttonLink && !props.buttonText ? 'clickable' : ''} ${!props.buttonText?.length && !props.text?.length && 'full'}`}
            onClick={() => {
                if (props.buttonLink && !props.buttonText) {
                    openLink();
                }
            }}
        >
            <NCCard>
                <NCBackgroundImage src={props.image} />
                <div className='promo-content-container'>
                    <p className='promo-text'>{dynamicTextValue}</p>
                    {
                        props.buttonText && props.buttonLink &&
                        <Button
                            label={props.buttonText}
                            theme={ButtonTheme.CLASSIC}
                            type={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            setClick={openLink}
                            styleClass='promo-button'
                        />
                    }
                </div>
            </NCCard>
        </div>
    );
};
