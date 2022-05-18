import { NCList, NCListProps, NCListTools } from '@cactus/srm-component';
import React, { useState } from 'react';

import { LIST_MOCK } from './nclist.example';

export const NCListTrHoverExample: React.FunctionComponent = () => {
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
                type='tr-filled'
                header={table.header}
                data={table.data}
            />
        </>
    );
};
