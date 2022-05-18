import { NCInput, NCProgressBar } from '@cactus/srm-component';
import React, { useState } from 'react';

export const ProgressBarInputExample: React.FunctionComponent = () => {
    const [ progress, setProgress ] = useState<number>(91);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
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
        </div>
    );
};
