import './NCMediaLibrary.scss';

import { Button, NCBox, NCList, NCTypography } from '../../atoms';
import { Media, MediaLibraryService } from '../../services/media-library.service';
import { NCListProps, NCListRows } from '../../atoms/NCList/NCList';
import React, { useEffect, useState } from 'react';

import { ButtonType } from '../../atoms/Button/Button';
import { IconType } from '../../atoms/Icon/Icon';
import { NCActions } from '../NCActions/NCActions';

export interface NCMediaLibraryProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionHook: (media: Media) => any;
    s3PublicUrl?: string;
}

export const NCMediaLibrary: React.FunctionComponent<NCMediaLibraryProps> = (props: NCMediaLibraryProps) => {
    // TODO: handle commented action
    // const authorizedFiles = [ 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml' ];

    const [ selectedItem, setSelectedItem ] = useState<Media>();
    const [ currentPath, setCurrentPath ] = useState<string>('/');
    const [ paths, setPaths ] = useState<Array<string>>([currentPath]);

    const [ table, setTable ] = useState<NCListProps>({ header: [
        {
            thId: 'name',
            thClassName: '',
            thContent: 'name',
        },
        {
            thId: 'size',
            thClassName: '',
            thContent: 'size',
        },
        {
            thId: 'uploaddate',
            thClassName: '',
            thContent: 'upload date',
        },
    ], data: []
    });

    useEffect(() => {
        getMediaLibrary();
    }, []);

    const getMediaLibrary = (path: string = '') => {
        MediaLibraryService.getMediaLibrary(path).then((data: Array<Media>) => {
            filterMedia(data);
        }).catch(error => console.error(error));
    };

    const filterMedia = (medias: Array<Media>) => {
        const _m = medias.map(m => {
            m.publicUrl = props.s3PublicUrl + m.publicUrl;
            return m;
        }).sort(f => (f.file ? 1 : -1));
        setTable({
            header: table.header,
            data: fillRows(_m)
        });
    };

    const handleClickLine = (media: Media) => {
        setSelectedItem(media);
        const newPath = `${media.key}`;
        setCurrentPath(newPath);
        paths.push(newPath);
        setPaths(paths);
        if (!media.file) {
            getMediaLibrary(newPath);
        }
    };

    const handleBackPath = () => {
        setSelectedItem(undefined);
        if (currentPath !== '/') {
            paths.pop();
            setCurrentPath(paths[paths.length - 1]);
            getMediaLibrary(paths[paths.length - 1]);
        } else {
            setCurrentPath('/');
        }
    };

    // const createMedia = (name: string) => {
    //     MediaLibraryService.createMedia(`${currentPath}${name}/`, '').then(() => {
    //         getMediaLibrary(currentPath);
    //     });
    // };

    // const uploadMedia = (event: any) => {
    //     const file = event.target.files[0];
    //     if (file && authorizedFiles.includes(file.type)) {
    //         const reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             MediaLibraryService.createMedia(`${currentPath}${file.name}`, event.target.result.toString()).then(() => {
    //                 getMediaLibrary(currentPath);
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         // toast.error('You can only upload images');
    //     }
    // };

    // const deleteMedia = () => {
    //     if (selectedItem) {
    //         MediaLibraryService.deleteMedia(selectedItem.key).then(() => {
    //             selectedItem.file ? getMediaLibrary(currentPath) : handleBackPath();
    //             setSelectedItem(undefined);
    //         });
    //     }
    // };

    const convertBytes = (bytes: any) => {
        const sizes = [ 'bytes', 'kB', 'MB', 'GB', 'TB' ];

        if (bytes === 0) {
            return 'n/a';
        }

        const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));

        if (i === 0) {
            return bytes + ' ' + sizes[i];
        }

        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };

    const fillRows = (ms: Array<Media>): Array<NCListRows> => {
        return ms.map(m => {
            return {
                tr: {
                    actionHook: handleClickLine,
                    trData: m,
                },
                name: {
                    tdClassName: '',
                    tdContent: m.name,
                },
                size: {
                    tdClassName: '',
                    tdContent: convertBytes(m.size),
                },
                uploaddate: {
                    tdClassName: '',
                    tdContent: (new Date(m.modified)).toLocaleString(),
                },
            };
        });
    };

    return (
        <div className="nc-medialibrary">
            <Button
                label={currentPath}
                type={ButtonType.TEXT}
                disabled={currentPath === '/'}
                icon={{ type: IconType.Back, width: 24, height: 24 }}
                setClick={() =>
                    handleBackPath()
                }
            />
            {
                table?.header && table?.data && !selectedItem?.file && (
                    <NCBox style={{
                        overflowY: 'scroll',
                        maxHeight: '350px'
                    }}>
                        <NCList
                            variant='nc-tournament-list'
                            type='thead-sticky'
                            header={table.header}
                            data={table.data}>
                        </NCList>
                    </NCBox>
                )
            }
            {
                selectedItem?.file && (
                    <div className={'preview-container d-flex flex-column'}>
                        <img src={selectedItem.publicUrl} alt={selectedItem.name}
                            style={{
                                maxHeight: '350px',
                                objectFit: 'contain',
                            }}
                        />
                        <NCActions actions={[
                            {
                                label: <NCTypography intlID='media-library.action.choose'>Choose another</NCTypography>,
                                type: ButtonType.SECONDARY,
                                setClick: () => setSelectedItem(undefined),
                            },
                            {
                                label: 'Done',
                                setClick: () => {
                                    props.actionHook(selectedItem);
                                }
                            }
                        ]} />
                    </div>
                )
            }
        </div>
    );
};
