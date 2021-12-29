import React from 'react';
import { useIntl } from 'react-intl';
import { Button, ButtonTheme } from '../../atoms/Button/Button';
import { IconType } from '../../atoms/Icon/Icon';
import { useDynamicText } from '../../hooks/useDynamicText';
import './NCPremiumCTA.scss';

export interface NCPremiumCTAProps {
    image: string;
    staticText: string;
    dynamicText: string;
    dynamicTextValues: Array<string>;
    setClick: () => void;
}

export const NCPremiumCTA: React.FunctionComponent<NCPremiumCTAProps> = (props: NCPremiumCTAProps) => {
    const intl = useIntl();
    const dynamicTextValue = useDynamicText(props.dynamicTextValues);

    return (
        <div className="position-relative p-0 overflow-hidden nc-premium-cta">
            <div className="image-container align-items-md-center justify-content-md-start align-items-start justify-content-center">
                <div className="mask d-block position-absolute"></div>
                <img className="w-100 mt-0 mt-xl-5" src={props.image} />
            </div>
            <div
                className="d-flex flex-column flex-md-row align-items-center justify-content-end mx-3 mx-md-4 mt-5 mb-3 mt-md-3 text-center text-md-left"
            >
                <div className="d-flex flex-column text mr-3">
                    <div className="message">
                        <span className="mr-1">{props.dynamicText}</span>
                        <span className="dynamic">{dynamicTextValue}</span>
                    </div>
                    <span className="package-description my-3 my-md-0">{props.staticText}</span>
                </div>
                <Button
                    styleClass='premium-button'
                    label={intl.formatMessage({ id: 'premium.go_premium' })}
                    theme={ButtonTheme.PREMIUM} icon={{ type: IconType.Premium, width: 24, height: 24 }}
                    setClick={() => props.setClick()}
                />
            </div>
        </div>

    );
};
