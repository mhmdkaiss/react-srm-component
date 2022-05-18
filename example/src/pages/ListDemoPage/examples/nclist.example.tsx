import { NCList, NCListProps, NCListTools } from '@cactus/srm-component';
import React, { useState } from 'react';

export const LIST_MOCK = [
    { name: 'test1' },
    { name: 'test2' },
    { name: 'test3' }
];

export const NCListExample: React.FunctionComponent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ table, setTable ] = useState<NCListProps>({
        header: [
            {
                thId: 'name',
                thClassName: '',
                thContent: 'name',
            },
            {
                thId: 'date',
                thClassName: '',
                thContent: 'date',
            },
        ],
        data: NCListTools.fillRows(LIST_MOCK, ((idx, item) => {
            const row = {
                tr: {
                    trData: item,
                    trClassName: '',
                },
                name: {
                    tdClassName: '',
                    tdContent: item.name,
                },
                date: {
                    tdClassName: '',
                    tdContent: new Date().toLocaleString(),
                },
            };
            return row;
        }))
    });

    return (
        <>
            <NCList
                variant='nc-list'
                header={table.header}
                data={table.data}
            />
        </>
    );
};
