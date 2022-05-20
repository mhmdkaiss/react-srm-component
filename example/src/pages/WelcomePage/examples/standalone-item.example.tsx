import React, { useState } from 'react';
import { Button, NCBox, NCTypography } from '@cactus/srm-component';

export const StandaloneExampleItemExample: React.FunctionComponent = () => {
    const [ trigger, setTrigger ] = useState<boolean>(false);

    return (
        <NCBox>
            <Button setClick={() => setTrigger(prev => !prev)}>Click me</Button>
            { trigger ? <NCTypography variant='body1'>I am displayed</NCTypography> : <></>}
        </NCBox>
    );
};
