import React from 'react';

export interface NCDropdownMenuProps {
  items: Array<{name: string, onClick: () => void, className?: string}>;
}

export const NCDropdownMenu: React.FunctionComponent<NCDropdownMenuProps> = (props) => {
    return <div className='nc-dropdown-menu d-flex flex-column'>
        {props.items.map(i => {
            return <div key={i.name} className={`cursor-pointer nc-dropdown-menu-item ${i.className}`} onClick={i.onClick}>{i.name}</div>;
        })}
    </div>;
};
