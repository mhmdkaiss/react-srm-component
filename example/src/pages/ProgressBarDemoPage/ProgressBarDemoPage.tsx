import { NCInput, NCProgressBar } from '@cactus/srm-component';
import React, { useState } from 'react';
import './ProgressBarDemoPage.scss';

export const ProgressBarDemoPage: React.FunctionComponent = () => {
    const [ progress, setProgress ] = useState<number>(91);
    const customColor = '#4169E1';
    return (
        <div className='nc-progress-bar-demo-page'>
            <h3 className='secondary-color-cool pb-3'>NC Progress bar</h3>
            <div className="d-flex pt-3">
                <NCProgressBar width='20%' />
                <p className='secondary-color-cool pl-3'>0%</p>
            </div>
            <div className="d-flex pt-4">
                <NCProgressBar width='20%' ratio={0.18} color={customColor} />
                <p className='secondary-color-cool pl-3' style={{ color: customColor }} >
                    18% with custom color
                </p>
            </div>
            <div className="d-flex pt-4">
                <NCProgressBar width='20%' ratio={0.5} />
                <p className='secondary-color-cool pl-3'>50%</p>
            </div>
            <div className="d-flex pt-4">
                <NCProgressBar width='20%' ratio={(progress/100)} />
                <div className='pl-3'>
                    <NCInput
                        id='progress-id'
                        styleName={'progress-input'}
                        type="number"
                        value={progress}
                        onChange={(p: string) => {
                            const updateProgress = Number(p);
                            if (updateProgress >= 0 && updateProgress <= 100) {
                                setProgress(updateProgress);
                            }
                        }}
                    />
                </div>
                <p className='progress-text pl-2'>% progress</p>
            </div>
        </div>
    );
};
