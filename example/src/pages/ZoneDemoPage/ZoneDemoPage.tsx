import { NCDropZone, NCTypography } from '@cactus/srm-component';
import React from 'react';

export const ZoneDemoPage: React.FunctionComponent = () => {
    return (
        <div className='buttons-demo-page'>
            <NCTypography variant='h5'>drop zone</NCTypography>
            <NCDropZone
                actionHook={(files: Array<File>) => {
                    console.log('NCDropZone:files', files);
                }}>
                drop something here
            </NCDropZone>
            <NCTypography variant='h5'>drop zone:disabled</NCTypography>
            <NCDropZone
                actionHook={(files: Array<File>) => {
                    console.log('NCDropZone:files', files);
                }}
                disabled
            >
                {'don\'t drop something here'}
            </NCDropZone>
        </div>
    );
};
