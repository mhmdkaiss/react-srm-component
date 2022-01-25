import React from 'react';
import './NCList.scss';

declare type NCListVariant = 'nc-tournament-list' | 'nc-list';

export interface NCListHeader {
    thId: string,
    thClassName: string,
    thContent: React.ReactChild,
}

export interface NCListCel {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    trClassName?: string,
    trData?: any,
    actionHook?: (p?: any) => any,
    tdClassName?: string,
    tdContent?: React.ReactChild,
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export interface NCListProps {
    variant?: NCListVariant,
    type?: string,
    header: Array<NCListHeader>,
    data: Array<NCListRows>,
}

export interface NCListRows {
    [thId: string]: NCListCel,
}

export const NCList: React.FunctionComponent<NCListProps> = (props: NCListProps) => {
    let tableVariant: string = '';

    tableVariant = props.variant ? ` ${props.variant}` : '';
    tableVariant += props.type ? ` ${props.type}` : '';

    return (
        <table className={'table color-white' + tableVariant}>
            <thead>
                <tr>
                    {
                        props.header.filter(h => h).map((h, index: number) => {
                            return (
                                <th key={index} scope="col" className={h.thClassName}>{h.thContent}</th>
                            );
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.filter(d => d).map((dataRow, dIndex: number) => {
                        return (
                            <tr key={dIndex} className={dataRow?.tr?.trClassName} onClick={() => {
                                if (dataRow?.tr?.actionHook) { dataRow?.tr?.actionHook(dataRow?.tr?.trData); }
                            }}>
                                {
                                    props.header.filter(h => h).map((h, hIndex: number) => {
                                        return (
                                            <td key={hIndex} className={dataRow[h.thId].tdClassName} onClick={dataRow[h.thId].actionHook}>{dataRow[h.thId].tdContent}</td>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};
