import { Button, NCDialog, NCMediaLibrary } from '@cactus/srm-component';
import React, { useState } from 'react';

export const NCMediaLibraryDialogExample: React.FunctionComponent = () => {
    const [ open, setOpen ] = useState<boolean>(false);

    return (
        <>
            <Button label={'Media Library Modal'} setClick={() => setOpen(true)}></Button>
            <NCDialog show={open} setShow={setOpen}>
                <NCMediaLibrary actionHook={(m) => {console.log('NCDialog:NCMediaLibrary:actionHook', m);}} s3PublicUrl="https://public.nextcactus.gg" />
            </NCDialog>
        </>
    );
};
