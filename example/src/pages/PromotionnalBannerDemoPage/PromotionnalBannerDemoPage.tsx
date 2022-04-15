import React from 'react';
import { NCPromotionalBanner } from '@cactus/srm-component';

import './PromotionnalBannerDemoPage.scss';

export const PromotionnalBannerDemoPage: React.FunctionComponent = () => {
    return (
        <div className='promotionnal-banner-demo-page'>
            <div className='mb-3'>
                <NCPromotionalBanner
                    image='https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover'
                    text={['this is a banner without button']}
                />
            </div>
            <div className='mb-3'>
                <NCPromotionalBanner
                    image='https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover'
                    text={['this is a banner with button and also a link. And man this is a long text. I need it for test. Like yea look it up. It is a very long text. I could make it longer but it needs to stop right here. Thank you']}
                    buttonText='Test'
                    buttonLink={'https://www.google.com/'}
                />
            </div>
            <div className='mb-3'>
                <NCPromotionalBanner
                    image='https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover'
                    text={['this is a banner without button and there is a link']}
                    buttonLink={'https://www.google.com/'}
                />
            </div>
            <div className='mb-3'>
                <NCPromotionalBanner
                    image='https://esm-dev-public.s3.amazonaws.com/training/program/5ef46a80ad6ad898839cbb04/medias/Cover'
                />
            </div>
        </div>
    );
};
