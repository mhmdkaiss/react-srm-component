import { NCFlagSelector } from '@cactus/srm-component';
import React from 'react';
import { LANGS_MOCK } from '../../../mock/Utils';

export const NCFlagSelectorExample: React.FunctionComponent = () => {
    return (
        <>
            <NCFlagSelector
                key={'rule-lang'}
                languages={LANGS_MOCK}
                actionHook={(code: string) => {
                    console.log('NCFlagSelector:actionHook', code);
                }}
                publicUrl="https://esm-dev-public.s3.amazonaws.com"
            >
            </NCFlagSelector>
        </>
    );
};
