import React from 'react';
import { NCExampleContainer } from './NCExampleContainer';
import { NCExampleIntro, NCExampleIntroProps } from './NCExampleIntro';
import { NCExampleItem, NCExampleItemProps } from './NCExampleItem';

export interface NCExamplePageProps {
    intro: NCExampleIntroProps,
    examples: Array<NCExampleItemProps>;
}

export const NCExamplePage: React.FunctionComponent<NCExamplePageProps> = (props) => {
    return (
        <NCExampleContainer
            navigation={props.examples}
        >
            <NCExampleIntro {...props.intro}></NCExampleIntro>
            {
                props.examples.map((itemProps, idx) => {
                    return <NCExampleItem key={idx} {...itemProps}></NCExampleItem>;
                })
            }
        </NCExampleContainer>
    );
};
