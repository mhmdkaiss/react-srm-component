import React, { useEffect, useState } from 'react';
import { Button, NCCard } from '@cactus/srm-component';
import { NCList, NCListProps, NCListTools } from '@cactus/srm-component';

const LIST_MOCK = [
    {
        'some-cool-name': 'test1',
    },
    {
        'some-cool-name': 'fdsf',
        'some-other-name': 'hmddasm'
    },
    {
        'some-cool-name': 'fdsf',
        'some-other-name': 'hmddasm'
    },
    {
        'some-other-name': 'hmm'
    },
    {
        'some-cool-name': 'tesyhgfhfgt2',
        'some-other-name': 'hmddasm'
    },
    {
        'some-cool-name': 'fdsf',
        'some-other-name': 'hmddasm'
    },
];

export const NCListActionsExample: React.FunctionComponent = () => {
    const [ displayTemplate, setDisplayTemplate ] = useState<boolean>(false);
    const [ selectedItem, setSelectedItem ] = useState<Array<number>>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ item, setItem ] = useState<any>(null);

    const [ table, setTable ] = useState<NCListProps>({ header: [], data: [] });

    useEffect(() => {
        setTable({
            header: [
                {
                    thId: 'some-cool-name',
                    thClassName: '',
                    thContent: 'Some cool name',
                },
                {
                    thId: 'some-other-name',
                    thClassName: '',
                    thContent: 'Some other name',
                },
                {
                    thId: 'action',
                    thClassName: '',
                    thContent: 'action',
                },
            ],
            data: NCListTools.fillRows(LIST_MOCK, ((idx, item) => {
                const row = {
                    tr: {
                        trData: item,
                        trClassName: '',
                    },
                    'some-cool-name': {
                        tdClassName: '',
                        tdContent: item['some-cool-name'],
                    },
                    'some-other-name': {
                        tdClassName: '',
                        tdContent: item['some-other-name'],
                    },
                    action: {
                        tdClassName: '',
                        tdContent: <>
                            <Button setClick={(e) => {
                                console.log(e);
                                console.log(row);
                                setDisplayTemplate(prev => !prev);
                                setSelectedItem(prev => prev.length && [] || [ idx, (idx + 2) ]);
                                setItem(row.tr.trData);
                            }}>trigger</Button>
                        </>,
                    },
                };
                return row;
            }))
        });
    }, []);

    return (
        <>
            <NCList variant='nc-list' type='tr-hover tr-animated' header={table.header} data={table.data} selected={selectedItem} />
            { displayTemplate && item &&
                <NCCard transition>
                    <>
                        {JSON.stringify(item)}
                    </>
                </NCCard>
            }
        </>
    );
};
