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
    actionHook?: (idx: number, p?: any) => any,
    tdClassName?: string,
    tdContent?: React.ReactChild,
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export interface NCListProps {
    variant?: NCListVariant,
    type?: string,
    header: Array<NCListHeader>,
    data: Array<NCListRows>,
    selected?: Array<number>,
}

export interface NCListRows {
    [thId: string]: NCListCel,
}

function FillRows<T>(items: Array<T>, callback: (idx: number, item: T) => NCListRows): Array<NCListRows> {
    return items
        .map((item, idx) => {
            return callback(idx, item);
        });
}

export const NCListTools = {
    fillRows: FillRows,
};

export const NCList: React.FunctionComponent<NCListProps> = (props: NCListProps) => {
    // const [ selectedItem, setSelectedItem ] = useState<any>({}); // animate on selection ; child a pars for animation

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
                            <NCRow key={dIndex} idx={dIndex} headers={props.header} row={dataRow} selected={props.selected} />
                        );
                    })
                }
            </tbody>
        </table>
    );
};

export interface NCRowProps {
    idx: number,
    headers: Array<NCListHeader>,
    row: NCListRows,
    selected?: Array<number>,
}

export const NCRow: React.FunctionComponent<NCRowProps> = (props: NCRowProps) => {
    return (
        <tr key={props.idx} className={props.row?.tr?.trClassName + ((props.selected?.length && props.selected.includes(props.idx) && ' selected') || (props.selected?.length && 'unselected') || '')} onClick={() => {
            if (props.row?.tr?.actionHook) { props.row?.tr?.actionHook(props.idx, props.row?.tr?.trData); }
        }}>
            {
                props.headers.filter(h => h).map((h, hIndex: number) => {
                    return (
                        <td key={hIndex} className={props.row[h.thId].tdClassName}>{props.row[h.thId].tdContent}</td>
                    );
                })
            }
        </tr>
    );
};
