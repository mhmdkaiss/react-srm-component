import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { NCExampleItemProps } from './NCExampleItem';
import { makeSlugHash } from './utils/makeSlugHash';

export interface NCExampleNavigationProps {
    basepath?: string;
    items: Array<NCExampleItemProps>;
}

export const NCExampleNavigation: React.FunctionComponent<NCExampleNavigationProps> = (props) => {
    return (
        <nav
            style={{
                top: '60px',
                marginTop: '60px',
                width: '240px',
                flexShrink: 0,
                position: 'sticky',
                height: 'calc(100vh - 70px)',
                overflowY: 'auto',
                padding: '16px 32px 16px 32px',
            }}
        >
            <p style={{ color: '#d8d8d8', fontWeight: 'bold', textTransform: 'uppercase' }}>content</p>
            <ul
                style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                }}
            >
                {props.items.map((item, idx) => {
                    if (item.disabled) {
                        return <></>;
                    }

                    return (
                        <ul
                            key={idx}
                            style={{
                                listStyle: 'none',
                            }}
                        >
                            <NavHashLink
                                to={`${props.basepath || '/'}#${makeSlugHash(item.name)}`}
                                style={{ color: '#d8d8d8', fontWeight: 'bold' }}
                                activeStyle={{ color: '#b2f617' }}
                            >
                                {item.name}
                            </NavHashLink>
                            {item.exampleList?.length && <li>
                                {item.exampleList.map((subItem, subIdx) => {
                                    return (
                                        <ul
                                            key={`${idx}-${subIdx}`}
                                            style={{
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <NavHashLink
                                                to={`${props.basepath || '/'}#${makeSlugHash(item.name, subItem.name)}`}
                                                style={{ color: '#d8d8d8' }}
                                                activeStyle={{ color: '#b2f617' }}
                                            >
                                                {subItem.name}
                                            </NavHashLink>
                                        </ul>
                                    );
                                })}
                            </li>}
                        </ul>
                    );
                })}
            </ul>
        </nav>
    );
};
