import React from 'react';
import { NCLottieAnimation } from '@cactus/srm-component';
import './LottieAnimationDemoPage.scss';

export const LottieAnimationDemoPage: React.FunctionComponent = () => {
    return (
        <div className='lottie-animation-demo-page'>
            <h1>NC Lottie Animation</h1>
            <p>Scroll down to see animation</p>
            <NCLottieAnimation lottieUrl={'https://esm-dev-public.s3.amazonaws.com/media/lottie/HowToTabAnimationMobile/data.json'} animationDuration={15000}/>
        </div>
    );
};
