import React from 'react';
import { NCDivWithBackgroundImage } from '@cactus/srm-component';

import './DivWithBackgroundDemoPage.scss';

export const DivWithBackgroundDemoPage: React.FunctionComponent = () => {
    return (
        <div className='div-with-background-demo-page'>
            <NCDivWithBackgroundImage src='https://volt.nextcactus.gg/corner/volt/intro/bg-peru-xl.jpg'>
                <div>Some content inside</div>
            </NCDivWithBackgroundImage>
        </div>
    );
};
