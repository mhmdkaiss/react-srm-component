import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor, RawEditorSettings } from 'tinymce';

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
};

// TODO: Create custom skin to replace 'oxide-dark', see https://www.tiny.cloud/docs/advanced/creating-a-skin/

export const NCTinyMce: React.FunctionComponent<NCTinyMceProps> = ({ id, apiKey, onChange, editorConfig, value, disabled }: NCTinyMceProps) => {
    const config: TinyMceConfig = {
        height: 500,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table code help wordcount powerpaste'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        skin: 'oxide-dark',
        content_css: 'dark',
        ...editorConfig,
    };

    const outputFormat = 'html';

    return (
        <React.Fragment>
            <Editor
                id={id}
                apiKey={apiKey}
                init={config}
                value={value}
                onEditorChange={(_, editor: TinyMCEEditor) => onChange(editor.getContent({ format: outputFormat }))}
                disabled={disabled || false}
            />
        </React.Fragment>
    );
};
