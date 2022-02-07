import React, { useEffect, useRef, useState } from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';

import './NCPureAccordion.scss';

export interface NCPureAccordionProps {
    children: React.ReactNode;
    title: string;
    className?: string;
}

export const NCPureAccordion: React.FunctionComponent<NCPureAccordionProps> = (props) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ contentHeight, setContentHeight ] = useState<number>(0);
    const accordionContentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (accordionContentRef.current) {
            setContentHeight(accordionContentRef.current?.offsetHeight);
        }
    }, [accordionContentRef]);

    return <div className={`nc-pure-accordion ${props.className}`}>
        <div className={`accordion-title d-flex align-items-center px-3 cursor-pointer justify-content-between ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            {props.title}
            <Icon icon={IconType.Colapse} />
        </div>
        <div className={`accordion-content-container ${isOpen ? '' : 'closed'}`} style={{ height: contentHeight }}>
            <div className='accordion-content px-4 py-2' ref={accordionContentRef}>
                {props.children}
            </div>
        </div>
    </div>;
};
