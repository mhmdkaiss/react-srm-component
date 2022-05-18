import React, { useEffect, useState } from 'react';
import { ButtonSize } from '../../atoms/Button/Button';
import { ButtonIcon } from '../../atoms/Button/ButtonIcon';
import './GameList.scss';
import { NoGame } from '../../models/Game';

export interface GameListProps {
    games: Array<NoGame>;
    fancy?: boolean,
    multiple?: boolean,
    defaultSelected?: Array<number>,
    selected?: Array<number>,
    onChange?: (game: NoGame) => void;
    selectedChanged?: (selected: Array<number>) => void;
    disabled?: boolean;
}

export const GameList: React.FunctionComponent<GameListProps> = (props: GameListProps) => {
    const [ selected, setSelected ] = useState<Array<number>>(props.selected || props.defaultSelected || [0]);

    useEffect(() => {
        if (props.selectedChanged) {
            props.selectedChanged(selected);
        }
    }, [selected]);

    useEffect(() => {
        if (props.selected) {
            setSelected(props.selected);
        }
    }, [props.selected]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newValue = parseInt(event.currentTarget.value);

        if (props.multiple) {
            const index = selected.findIndex(i => i === newValue);
            if (index > -1) {
                selected.splice(index, 1);
                setSelected([...selected]);
            } else {
                setSelected([ ...selected, newValue ]);
            }
        } else {
            setSelected([newValue]);
        }

        if (props.onChange) {
            props.onChange(props.games[newValue]);
        }
    };

    return (
        <div className='gamelist'>
            {
                props.games.map((game: NoGame, index: number) => {
                    return <ButtonIcon
                        value={index.toString()}
                        size={ButtonSize.BIG}
                        icon={game.icon}
                        name={game.id}
                        active={selected.includes(index)}
                        onClick={handleClick}
                        key={index}
                        fancy={props.fancy}
                        tooltipTitle={game.title}
                        disabled = {props.disabled}
                    />;
                })
            }
        </div>
    );
};
