/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { Editor as TinyMCEEditor, RawEditorSettings } from 'tinymce';
import { NCDialog } from '../../atoms';
import { NCMediaLibrary } from '../../molecules';

export declare type TinyMceConfig = RawEditorSettings & {
    selector?: undefined;
    target?: undefined;
};

export declare type NCTinyMceProps = {
    id?: string;
    onChange: (value: string) => void;
    value: string;
    disabled?: boolean;
    apiKey?: string;
    editorConfig?: TinyMceConfig;
    s3PublicUrl: string;
};

// TODO: Create custom skin to replace 'oxide-dark', see https://www.tiny.cloud/docs/advanced/creating-a-skin/
export const NCTinyMce: React.FunctionComponent<NCTinyMceProps> = ({ id, apiKey, onChange, editorConfig, value, disabled, s3PublicUrl }: NCTinyMceProps) => {
    const [ mediaLibraryOpen, setMediaLibraryOpen ] = React.useState(false);
    const selected = (v: any) => {
        ((editorRef.current as any).editor as any).insertContent(`<img src="${v.publicUrl}" alt="${v.name}" />`);
        setMediaLibraryOpen(false);
    };

    const config: TinyMceConfig = {
        height: 500,
        external_plugins: {
            'ncmedialibrary': 'https://esm-dev-public.s3.amazonaws.com/philippe/NCTinyMedia.js',
        },
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table code help wordcount'
        ],
        toolbar: 'undo redo | copy paste | styleselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help ncmedialibrary',
        skin: 'oxide-dark',
        content_css: 'dark',
        file_picker_types: 'image',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        init_instance_callback: (_editor) => {
            _editor.on('ExecCommand', (e) => {
                console.log('The ' + e.command + ' command was fired.', e);
            });
        },
        ...editorConfig,
    };
    const editorRef = useRef(null);
    const outputFormat = 'html';

    return (
        <React.Fragment>
            <Editor
                ref={editorRef}
                id={id}
                onInit={(_, b) => {
                    (b as any).mediaLibrary = () => {
                        setMediaLibraryOpen(true);
                    };
                }}
                apiKey={apiKey}
                init={config}
                value={value}
                onEditorChange={(_, editor: TinyMCEEditor) => onChange(editor.getContent({ format: outputFormat }))}
                disabled={disabled || false}
            />

            <NCDialog show={mediaLibraryOpen} setShow={setMediaLibraryOpen}>
                <NCMediaLibrary s3PublicUrl={s3PublicUrl} actionHook={selected}></NCMediaLibrary>
            </NCDialog>
        </React.Fragment>
    );
};
