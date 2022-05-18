import { NCMediaLibrary } from '@cactus/srm-component';
import React from 'react';

export const NCMediaLibraryExample: React.FunctionComponent = () => {
    return (
        <>
            <NCMediaLibrary actionHook={(m) => m} s3PublicUrl="https://public.nextcactus.gg" />
        </>
    );
};
