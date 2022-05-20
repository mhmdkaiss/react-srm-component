/* eslint-disable @typescript-eslint/no-explicit-any */
import { NCBox, NCTypography } from '@cactus/srm-component/dist';
import React from 'react';
import { CopyBlock, atomOneDark } from 'react-code-blocks';
import { makeSlugHash } from './utils/makeSlugHash';

export interface NCExample {
    name: string;
    description?: React.ReactText | React.ReactChild | Array<React.ReactChild>

    renderPreview?: boolean;

    raw?: string;
    component?: React.FunctionComponent<any>;

    props?: any;
}

export interface NCExampleItemProps {
    key?: any;
    name: string;
    description?: React.ReactText | React.ReactChild | Array<React.ReactChild>

    component?: React.FunctionComponent<any>;

    exampleList: Array<NCExample>;

    disabled?: boolean;
}

const ItemContainer: React.FunctionComponent<{ children?: React.ReactText | React.ReactChild | Array<React.ReactChild> }> = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            { children }
        </div>
    );
};

export const NCExampleItem: React.FunctionComponent<NCExampleItemProps> = (props) => {
    if (props.disabled) {
        return <></>;
    }
    const renderPreview = (c: any, p: any, show: boolean = true) => {
        if (show === false) {
            return '';
        }

        return (`<${c.name} ${Object.entries(p).map((keys) => `${keys[0]}=${JSON.stringify(keys[1])}`)}>${p.children || ''}</${c.name}>`);
    };

    const renderSingleComponemt = (item: any) => {
        if (item.props && props.component) {
            const {
                children,
                ...childProps
            } = item.props;
            return <props.component {...childProps}>{children}</props.component>;
        }
        return <></>;
    };

    const renderCopyBlock = (raw?: string) => {
        if (!raw || !raw.length) {
            return <></>;
        }

        return (
            <CopyBlock
                text={raw}
                language={'jsx'}
                showLineNumbers
                wrapLines
                theme= {atomOneDark}
                codeBlock
            />
        );
    };

    return (
        <NCBox
            key={props.key}
            style={{
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <>
                <NCTypography variant='h2' id={makeSlugHash(props.name)}>{props.name}</NCTypography>
                <NCTypography variant='body1'>{props.description}</NCTypography>
                {
                    props.exampleList && props.exampleList.length && props.exampleList.map((item, idx) => {
                        return (
                            <NCBox
                                id={`${makeSlugHash(props.name, item.name)}`}
                                key={`${props.key}-${idx}`}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginBottom: '1rem',
                                }}
                            >
                                <NCTypography variant='h3'>{item.name}</NCTypography>
                                <NCTypography variant='body1'>{item.description}</NCTypography>

                                <NCBox style={{
                                    border: '4px dotted #888c88',
                                }}>
                                    <>
                                        { item.props && (
                                            <ItemContainer>
                                                {renderSingleComponemt(item)}
                                                {renderCopyBlock(renderPreview(props, item.props, item.renderPreview))}
                                            </ItemContainer>
                                        )
                                        }
                                        {
                                            (item.component) && (
                                                <ItemContainer>
                                                    <item.component />
                                                    {renderCopyBlock(item?.raw)}
                                                </ItemContainer >
                                            )
                                        }
                                    </>
                                </NCBox>
                            </NCBox>
                        );
                    })
                }
            </>
        </NCBox>
    );
};
