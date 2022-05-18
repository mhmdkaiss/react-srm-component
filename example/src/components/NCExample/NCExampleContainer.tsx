import { NCBox } from '@cactus/srm-component/dist';
import React, { ReactChildren, ReactNodeArray } from 'react';
import { useLocation } from 'react-router-dom';
import { NCExampleItemProps } from './NCExampleItem';
import { NCExampleNavigation } from './NCExampleNavigation';

export interface NCExampleContainerProps {
    navigation?: Array<NCExampleItemProps>;
    children: ReactChildren | ReactNodeArray;
}

export const NCExampleContainer: React.FunctionComponent<NCExampleContainerProps> = (props) => {
    const location = useLocation();

    return (
        <NCBox
            style={{
                marginBottom: '2rem',
                display: 'flex',
                paddingLeft: '5rem',
                paddingRight: '5rem',
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: 'calc(100% - 240px)',
                paddingRight: '5rem',
                gap: '64px',
            }}>
                {props.children}
            </div>
            <NCExampleNavigation
                basepath={location.pathname}
                items={props.navigation || []}
            />
        </NCBox>
    );
};
