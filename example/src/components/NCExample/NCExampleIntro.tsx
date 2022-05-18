import { Button, ButtonType, NCBox, NCTypography } from '@cactus/srm-component/dist';
import React from 'react';

export interface NCExempleIntroLink {
    name: string;
    link: string;
    icon: string;
}

export interface NCExampleIntroProps {
    title: string;
    description?: string;
    links: Array<NCExempleIntroLink>;
}

export const NCExampleIntro: React.FunctionComponent<NCExampleIntroProps& React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <NCBox
            style={{
                marginBottom: '2rem',
                color: 'white',
            }}
        >
            <>
                <NCTypography variant='h1'>{props.title}</NCTypography>
                <NCTypography variant='body1'>{props.description}</NCTypography>
                <NCBox
                    style={{
                        display: 'flex',
                        gap: '1rem',
                    }}
                >
                    {
                        props.links.map((l, idx) => {
                            return (
                                <Button
                                    key={`${props.title}-${l.name}-${idx}`}
                                    type={ButtonType.TEXT}
                                >
                                    {l.name}
                                </Button>
                            );
                        })
                    }
                </NCBox>
            </>
        </NCBox>
    );
};
