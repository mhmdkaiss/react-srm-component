import React, { ComponentClass, FunctionComponent } from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import './NCTypography.scss';

type MessageValue = string | number | boolean | Date | null | undefined;
type MessageValues = {[key: string]: MessageValue | JSX.Element};
interface NCTypographyProps {
    children?: React.ReactText | React.ReactChild | Array<React.ReactChild>,
    variant?: string,
    intlObj?: MessageDescriptor & { values?: MessageValues },
    intlID?: string | number,
    intlValues?: MessageValues,
    test?: {
        lala: string,
        deep: {
            lala: string,
        }
    }
}

// eslint-disable-next-line @typescript-eslint/ban-types
interface VariantType {
     [name: string]: {
        type?: FunctionComponent | ComponentClass | string,
        className: string,
    }
}

const variantMap: VariantType = {
    'hero': {
        type: 'h1',
        className: 'hero',
    },
    'h1': {
        type: 'h1',
        className: '',
    },
    'h2': {
        type: 'h2',
        className: '',
    },
    'h3': {
        type: 'h3',
        className: '',
    },
    'h4': {
        type: 'h4',
        className: '',
    },
    'h5': {
        type: 'h5',
        className: '',
    },
    'h6': {
        type: 'h6',
        className: '',
    },
    'subtitle1': {
        type: 'span',
        className: 'subtitle1',
    },
    'subtitle2': {
        type: 'span',
        className: 'subtitle2',
    },
    'overtitle': {
        type: 'span',
        className: 'overtitle',
    },
    'caption': {
        type: 'span',
        className: 'caption',
    },
    'span': {
        type: 'span',
        className: '',
    },
    'body1': {
        type: 'span',
        className: 'body1',
    },
    'body2': {
        type: 'span',
        className: 'body2',
    },
    'string': {
        type: undefined,
        className: '',
    },
};

export const NCTypography: React.FunctionComponent<NCTypographyProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    variant,
    intlObj,
    intlID,
    intlValues,
    ...other
}) => {
    const _v = variant && variantMap[variant].type || React.Fragment;
    const _c = variant && variantMap[variant].type && { className: `${variantMap[variant].className || ''} ${other['className'] || ''}` } || {};
    const _msg = (!intlObj?.id && !intlID) ? children :
        <FormattedMessage
            id={intlID || intlObj?.id}
            values={intlValues || intlObj?.values}
            description={intlObj?.description}
            defaultMessage={children ? children.toString() : ''}
        />;

    // TODO: Add input component to fill translation directly from backoffice

    return React.createElement(_v, {
        ...other,
        ..._c,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any, _msg);
};
