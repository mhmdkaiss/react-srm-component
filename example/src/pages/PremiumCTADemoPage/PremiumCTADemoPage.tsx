import React from "react";
import { NCPremiumCTA } from "@cactus/srm-component";

import './PremiumCTADemoPage.scss';
import { useHistory } from "react-router";

export const PremiumCTADemoPage: React.FunctionComponent = () => {
    const history = useHistory();

    const onPremiumClick = () => {
        history.push("/premium");
    }

    return (
        <div className='premium-cta-demo-page'>
            <NCPremiumCTA 
                image='https://nicecactus.gg/assets/img/premium/bg-promote-2.jpg' 
                staticText='Get premium now for unlimited access to Trainings, fast cash prize payments, and many other features.'
                dynamicText='Increase your chances of'
                dynamicTextValues={['win tournaments','leave elo hell', 'progress faster', 'reach top level']}
                setClick={() => onPremiumClick()}
            />
            <NCPremiumCTA 
                image='https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover' 
                staticText='Get premium now for unlimited access to Trainings, fast cash prize payments, and many other features.'
                dynamicText='Increase your chances of'
                dynamicTextValues={['win tournaments','leave elo hell', 'progress faster', 'reach top level']}
                setClick={() => onPremiumClick()}
            />
        </div>
    );

}
