import React, { useEffect, useState } from 'react';
import { NCInput } from '../..';
import { NCBox, NCDialog, NCDropZone, NCList, NCTypography } from '../../atoms';
import { Button, ButtonType } from '../../atoms/Button/Button';
import { IconType } from '../../atoms/Icon/Icon';
import { NCListProps, NCListRows } from '../../atoms/NCList/NCList';
import { Media, MediaLibraryService } from '../../services/media-library.service';
import { NCActions } from '../NCActions/NCActions';
import './NCMediaLibrary.scss';

export interface NCMediaLibraryProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionHook: (media: Media) => any;
    s3PublicUrl?: string;
}

export const NCMediaLibrary: React.FunctionComponent<NCMediaLibraryProps> = (props: NCMediaLibraryProps) => {
    const authorizedFiles = [ 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml' ];

    const [ selectedItem, setSelectedItem ] = useState<Media>();
    const [ currentPath, setCurrentPath ] = useState<string>('/');
    const [ paths, setPaths ] = useState<Array<string>>([currentPath]);
    const [ open, setOpen ] = useState<boolean>(false);
    const [ newFolder, setNewFolder ] = useState<string>('');
    const [ uploading, setUploading ] = useState<boolean>(false);

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
        try {
            setSelectedItem(media);
            const newPath = `${media.key}`;
            setCurrentPath(newPath);
            paths.push(newPath);
            setPaths(paths);
            if (!media.file) {
                getMediaLibrary(newPath);
            }
        } catch (e) {
            console.log('ouloulou', e);
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

    const createFolder = (path: string, name: string) => {
        const _nFolder = `${path}${name}/`;
        MediaLibraryService.createMedia(_nFolder, '').then(() => {
            handleClickLine(new Media(_nFolder));
        });
    };

    const uploadMedia = (path: string, file: File) => {
        if (file && authorizedFiles.includes(file.type)) {
            uploading;
            const reader = new FileReader();
            reader.onload = (event: any) => {
                MediaLibraryService.createMedia(`${path}${file.name}`, event.target.result.toString()).then(() => {
                    getMediaLibrary(path);
                });
            };
            reader.readAsDataURL(file);
        } else {
            // toast.error('You can only upload images');
        }
    };

    const deleteMedia = () => {
        if (selectedItem) {
            MediaLibraryService.deleteMedia(selectedItem.key).then(() => {
                selectedItem.file ? getMediaLibrary(currentPath) : handleBackPath();
                setSelectedItem(undefined);
            });
        }
    };

    const convertBytes = (bytes: number) => {
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
                    tdContent: <NCTypography variant='body1'>{m.name}</NCTypography>,
                },
                size: {
                    tdClassName: '',
                    tdContent: <NCTypography variant='body1'>{m.file ? convertBytes(m.size) : '-'}</NCTypography>,
                },
                uploaddate: {
                    tdClassName: '',
                    tdContent: <NCTypography variant='body1'>{(new Date(m.modified)).toLocaleString()}</NCTypography>,
                },
            };
        });
    };

    return (
        <div className="nc-medialibrary">
            <NCActions
                style={{
                }}
                actions={[
                    {
                        type: ButtonType.TEXT,
                        icon: { type: IconType.Back, width: 24, height: 24 },
                        label: <NCTypography variant='body1'>{currentPath}</NCTypography>,
                        disabled: currentPath === '/',
                        setClick: () => handleBackPath()
                    },
                    {
                        type: ButtonType.TEXT,
                        containerClass: 'ml-auto',
                        icon: { type: IconType.AddFolder, width: 24, height: 24 },
                        setClick: () => {
                            setOpen(true);
                        }
                    },
                    {
                        type: ButtonType.TEXT,
                        icon: { type: IconType.Trashcan, width: 24, height: 24 },
                        disabled: !selectedItem || !selectedItem.file,
                        setClick: () => {
                            deleteMedia();
                        }
                    },
                ]} />

            <NCDialog show={open} setShow={setOpen} title={<NCTypography variant='h5'>Create new folder</NCTypography>} >
                <NCBox style={{
                    gap: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <NCInput
                        placeHolder='folder name'
                        value={newFolder}
                        onChange={(v) => {
                            setNewFolder(v);
                        }}
                    />
                    <Button
                        setClick={() => {
                            createFolder(currentPath, newFolder);
                            setNewFolder('');
                            setOpen(false);
                        }}
                    >
                        <NCTypography>Create</NCTypography>
                    </Button>
                </NCBox>
            </NCDialog>
            {
                table?.header && table?.data && !selectedItem?.file && (
                    <NCDropZone
                        actionHook={(files) => {
                            setUploading(true);
                            for (const file of files) {
                                uploadMedia(paths[(paths.length - 1)], file);
                            }
                            setUploading(false);
                        }}
                        errorHook={(e) => {
                            console.log('errorHook', e);
                        }}
                    >
                        <NCBox className='media-scrollbar'>
                            <NCList
                                variant='nc-list'
                                type='thead-sticky tr-filled'
                                header={table.header}
                                data={table.data}>
                            </NCList>
                            { table?.data?.length === 0 ? (
                                <NCBox
                                    style={{
                                        marginTop: '16rem',
                                        marginBottom: '16rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    <NCTypography variant='body1' className='red-color'>{'Sorry, no items in this folder :('}</NCTypography>
                                </NCBox>
                            ) : <React.Fragment />}
                        </NCBox>
                    </NCDropZone>
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
                                setClick: () => handleBackPath(),
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
