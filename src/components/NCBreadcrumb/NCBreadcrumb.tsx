import './NCBreadcrumb.scss';
import React from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';

export interface BreadcrumbRoute {
    label: string,
    enabled?: boolean,
    checked?: boolean,
    ref?: React.RefObject<HTMLDivElement>,
}

interface NCBreadcrumbProps {
    routes: Array<BreadcrumbRoute>,
}

export const NCBreadcrumb: React.FunctionComponent<NCBreadcrumbProps> = (props: NCBreadcrumbProps) => {
    const currentStep = props.routes.length - 1 - props.routes.slice().reverse().findIndex(r => r.enabled);

    return (
        <div className='nc-breadcrumb'>
            {
                props.routes.map((r, i) => {
                    return (
                        <div
                            key={`${r.label}-${i}`}
                            className={`nc-breadcrumb-item d-flex flex-column align-items-center ${r.enabled ? 'enabled' : ''} ${i === currentStep ? 'current' : ''}`}
                        >
                            {
                                i > 0 &&
                                <div className='separator' />
                            }
                            <div
                                className={`position-relative ${r.ref ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                    if (r.ref) {
                                        r.ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                }}
                            >
                                <div className='label position-absolute'>{r.label}</div>
                                {
                                    r.enabled && r.checked ?
                                        <div className={`dot-container position-relative my-2 ${i === 0 ? 'first' : ''}`}>
                                            <Icon icon={IconType.Success} />
                                        </div> :
                                        <div className={`dot my-2 ${i === 0 ? 'first' : ''}`} />
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};
