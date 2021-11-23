import React from 'react';
import './NCList.scss';

declare type NCListVariant = 'nc-tournament-list';
declare type NCListVariantion = 'thead-sticky';

export interface NCListHeader {
    thId: string,
    thClassName: string,
    thContent: React.ReactChild,
}

export interface NCListCel {
    trClassName?: string,
    trData?: any,
    actionHook?: (p?: any) => any,

    tdClassName?: string,
    tdContent?: React.ReactChild,
}

export interface NCListProps {
    variant?: NCListVariant,
    type?: NCListVariantion,
    header: Array<NCListHeader>,
    data: Array<NCListRows>,
}

export interface NCListRows {
    [thId: string]: NCListCel,
}

export const NCList: React.FunctionComponent<NCListProps> = ({ variant, type, header, data }: NCListProps) => {
    let tableVariant: string = '';

    tableVariant = variant ? ` ${variant}` : '';
    tableVariant += type ? ` ${type}` : '';

    return (
        <table className={'table color-white' + tableVariant}>
            <thead>
                <tr>
                    {
                        header.filter(h => h).map((h, index: number) => {
                            return (
                                <th key={index} scope="col" className={h.thClassName}>{h.thContent}</th>
                            );
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.filter(d => d).map((dataRow, dIndex: number) => {
                        return (
                            <tr key={dIndex} className={dataRow?.tr?.trClassName} onClick={() => {
                                if (dataRow?.tr?.actionHook) { dataRow?.tr?.actionHook(dataRow?.tr?.trData); }
                            }}>
                                {
                                    header.filter(h => h).map((h, hIndex: number) => {
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
