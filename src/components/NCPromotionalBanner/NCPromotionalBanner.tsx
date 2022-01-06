import React from 'react';
import { NCBackgroundImage, NCCard } from '../../atoms';
import { Button, ButtonSize, ButtonTheme, ButtonType } from '../../atoms/Button/Button';
import './NCPromotionalBanner.scss';

interface NCPromotionalBannerProps {
    text: string;
    image: string,
    buttonText?: string;
    openLink?: () => void;
}

export const NCPromotionalBanner: React.FunctionComponent<NCPromotionalBannerProps> = (
    props: NCPromotionalBannerProps
) => {
    const { text, image, buttonText, openLink } = props;
    return (
        buttonText ?
            <div className='nc-promo-banner'>
                <NCCard>
                    <NCBackgroundImage src={image} />
                    <div className='promo-content-container'>
                        <p className='promo-text'>{text}</p>
                        <Button
                            label={buttonText}
                            theme={ButtonTheme.CLASSIC}
                            type={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            setClick={openLink}
                            styleClass='promo-button'
                        />
                    </div>
                </NCCard>
            </div>
            : <div className={`nc-promo-banner ${openLink ? 'clickable' : ''}`} onClick={openLink}>
                <NCCard>
                    <NCBackgroundImage src={image} />
                    <div className='promo-content-container'>
                        <p className='promo-text'>{text}</p>
                    </div>
                </NCCard>
            </div>
    );
};
