import React from 'react';

interface NCBoxProps {
    children: React.ReactChild
}

export const NCBox: React.FunctionComponent<NCBoxProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...other
}) => {
    return (
        <React.Fragment>
            <div {...other}>
                {children}
            </div>
        </React.Fragment>
    );
};
