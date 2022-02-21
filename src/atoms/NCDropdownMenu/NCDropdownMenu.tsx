import { Icon } from '..';
import { IconType } from '../..';
import React from 'react';

export interface DropdownMenuItem {
    name: string;
    className?: string;
    icon?: IconType;
    onClick: () => void;
}

export interface NCDropdownMenuProps {
  items: Array<DropdownMenuItem>;
}

export const NCDropdownMenu: React.FunctionComponent<NCDropdownMenuProps> = (props) => {
    return <div className='nc-dropdown-menu d-flex flex-column'>
        {props.items.map(item => {
            return <div key={item.name} className={`cursor-pointer nc-dropdown-menu-item d-flex align-items-center ${item.className}`} onClick={item.onClick}>
                {item.icon &&
                    <Icon icon={item.icon} width={22} height={22} />
                }
                <span className={item.icon ? 'ml-2' : ''}>{item.name}</span>
            </div>;
        })}
    </div>;
};
