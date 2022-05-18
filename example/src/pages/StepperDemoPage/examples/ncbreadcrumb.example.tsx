import { NCBreadcrumb } from '@cactus/srm-component';
import React, { useRef } from 'react';

export const NCBreadcrumbExample: React.FunctionComponent = () => {
    const refSection1 = useRef<HTMLDivElement>(null);
    const refSection2 = useRef<HTMLDivElement>(null);
    const refSection3 = useRef<HTMLDivElement>(null);
    const refSection4 = useRef<HTMLDivElement>(null);

    return (
        <>
            <NCBreadcrumb
                routes={
                    [
                        { label: 'Section 1', ref: refSection1, enabled: true, checked: true },
                        { label: 'Section 2', ref: refSection2, enabled: true },
                        { label: 'Section 3', ref: refSection3, enabled: true, checked: true },
                        { label: 'Section 4', ref: refSection4 }
                    ]
                }
            />
            <div>
                <div ref={refSection1} className='breadcrumb-demo-section text-center'>Section 1</div>
                <div ref={refSection2} className='breadcrumb-demo-section text-center'>Section 2</div>
                <div ref={refSection3} className='breadcrumb-demo-section text-center'>Section 3</div>
                <div ref={refSection4} className='breadcrumb-demo-section text-center'>Section 4</div>
            </div>
        </>
    );
};
