import React from 'react';

interface NCBoxProps {
    children: React.ReactText | React.ReactChild | Array<React.ReactChild>
}

export const NCBox: React.FunctionComponent<NCBoxProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...other
}) => {
    return (
        <div {...other}>
            {children}
        </div>
    );
};
