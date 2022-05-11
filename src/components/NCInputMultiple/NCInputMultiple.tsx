import React, { useEffect, useState } from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { NCInput } from '../NCInput/NCInput';
import { NCMediaUpload } from '../NCMediaUpload/NCMediaUpload';
import './NCInputMultiple.scss';

export interface NCInputMultipleKeys {
    logo?: string;
    name: string;
}

export interface NCInputMultipleProps {
    list: Array<NCInputMultipleKeys>;
    onChange: (list: Array<NCInputMultipleKeys>) => void;
    onAddClick?: (event: React.MouseEvent) => void;
    label?: string;
    withMedia?: boolean;
}

export enum ClickType {
    Media = 0,
    Name = 1,
    Delete = 2,
    Add = 3
}

export const NCInputMultiple: React.FunctionComponent<NCInputMultipleProps> = (props: NCInputMultipleProps) => {
    const [ list, setList ] = useState <Array<NCInputMultipleKeys>>(props.list);

    useEffect(() => {
        setList(props.list);
    }, [props.list]);

    const updateList = (index: number, value: string, type: number) => {
        const tempArr = [...list];
        switch (type) {
            case ClickType.Media:
                tempArr[index].logo = value;
                break;
            case ClickType.Name:
                tempArr[index].name = value;
                break;
            case ClickType.Delete:
                tempArr.splice(index, 1);
                break;
            default:
                tempArr.push({ name: '' });
        }
        setList(tempArr);
        props.onChange(tempArr);
    };

    return (
        <div className='nc-input-multipule-text d-flex align-items-center'>
            <div className={`w-100 ${props.withMedia ? ' row' : ''}`}>
                {
                    list.map(
                        (i, index) => {
                            return (
                                <div key={index} className={`d-flex align-items-center ${props.withMedia ? ' col-6 mb-2' : ''}`} >
                                    { props.withMedia &&
                                        <div className='w-25 mr-4'>
                                            <NCMediaUpload
                                                mediaLibrary
                                                s3PublicUrl={String(process.env.REACT_APP_S3_PUBLIC_URL)}
                                                currentImage={
                                                    (i as NCInputMultipleKeys).logo ||
                                                    `${process.env.REACT_APP_S3_PUBLIC_URL}/media/default/default-team-banner.svg`
                                                }
                                                actionHook={(ctx, file) => {
                                                    if (ctx === 'url') {
                                                        updateList(index, file, ClickType.Media);
                                                    }
                                                }}
                                            />
                                        </div>
                                    }
                                    <NCInput label={index === 0 ? props.label : ''} value={i.name} styleName='text-input mt-2' onChange={(e) => {
                                        updateList(index, e, ClickType.Name);
                                    }} />
                                    <Icon
                                        styleName="trash-icon mt-4 ml-3"
                                        icon={IconType.Trashcan}
                                        width={24}
                                        height={24}
                                        onClick={() => {
                                            updateList(index, '', ClickType.Delete);
                                        }}
                                    />
                                </div>
                            );
                        })
                }
            </div>
            <Icon
                styleName="icon mt-4 ml-5"
                icon={IconType.Add}
                width={24}
                height={24}
                onClick={() => updateList(0, '', ClickType.Add) }
            />
        </div>
    );
};
