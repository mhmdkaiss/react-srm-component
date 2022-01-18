import React, { useState } from 'react';
import { NCDialog } from '../../atoms/NCDialog/NCDialog';

interface NCImageProps {
    src: string,
    alt?: string,
    styleName?: string,
}

export const NCImage: React.FunctionComponent<NCImageProps> = (props: NCImageProps) => {
    const [ openDialog, setOpenDialog ] = useState<boolean>(false);

    return (
        <React.Fragment>
            <img className={`cursor-pointer ${props.styleName}`}
                src={props.src}
                alt={props.alt}
                onClick={() => setOpenDialog(true)}
            />
            {
                <NCDialog
                    show={openDialog}
                    setShow={() => setOpenDialog(false)}
                    noPadding
                    noHeader
                >
                    <img
                        className='w-100'
                        src={props.src}
                        alt={props.alt}
                    />
                </NCDialog>
            }
        </React.Fragment>
    );
};
