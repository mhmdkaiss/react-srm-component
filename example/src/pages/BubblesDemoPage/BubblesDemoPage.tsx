import { NCBubble, NCColors, NCStepBubble } from '@cactus/srm-component';
import React from 'react';
import './BubblesDemoPage.scss';

export const BubblesDemoPage: React.FunctionComponent = () => {
    return (
        <div className='bubbles-demo-page'>
            <h3 className='secondary-color-cool pb-3'>NC Bubble</h3>
            <p className='secondary-color-cool'> Weekday bubbles (clickable)</p>
            <div className="bubbles-container">
                <NCBubble
                    isActive={false}
                    content={{ text: 'Mo' }}
                    onClick={item => console.log('clicked: '+item) }
                />
                <NCBubble
                    isActive={true}
                    content={{ text: 'Tu' }}
                    onClick={item => console.log('clicked: '+item) }
                />
                <NCBubble
                    isActive={true}
                    content={{ text: 'We' }}
                    onClick={item => console.log('clicked: '+item) }
                />
            </div>
            <div className="bubbles-container">
                <NCBubble
                    isActive={true}
                    content={{ text: 'Lu', size: 32 }}
                    size={64}
                    onClick={item => console.log('clicked: '+item) }
                />
                <NCBubble
                    isActive={false}
                    content={{ text: 'Ma', size: 32 }}
                    size={64}
                    onClick={item => console.log('clicked: '+item) }
                />
            </div>
            <p className='secondary-color-cool pt-3'>Step bubbles</p>
            <div className="bubbles-container">
                <NCStepBubble stepNumber={1} />
                <NCStepBubble stepNumber={2} />
            </div>
            <div className="bubbles-container bubble-normal-font pt-2">
                <NCStepBubble stepNumber={3} isFilled color={NCColors.nicecactus} />
                <NCStepBubble stepNumber={4} isFilled color={NCColors.nicecactus} />
            </div>
        </div>
    );
};
