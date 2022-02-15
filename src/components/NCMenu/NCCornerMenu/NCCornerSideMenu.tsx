import React, { useEffect, useRef } from 'react';
import './NCCornerSideMenu.scss';

export interface NCCornerSideMenuProps {
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}

export const NCCornerSideMenu: React.FunctionComponent<NCCornerSideMenuProps> = (props: NCCornerSideMenuProps) => {
    const sideMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (props.isOpen && sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
                props.setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ sideMenuRef, props.isOpen, props.setIsOpen ]);

    return (
        <div className={`nc-corner-side-menu d-flex flex-column ${props.isOpen ? 'visible' : ''}`} ref={sideMenuRef}>
            {props.children}
        </div>
    );
};
