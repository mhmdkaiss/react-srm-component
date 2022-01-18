import './GameList.scss';

import React, { useState } from 'react';

import { ButtonIcon } from '../../atoms/Button/ButtonIcon';
import { ButtonSize } from '../../atoms/Button/Button';
import { Game } from '../../models/Game';

export interface GameListProps {
    games: Array<Game>;
    fancy?: boolean,
    onChange: (game: Game) => void;
}

export const GameList: React.FunctionComponent<GameListProps> = (props: GameListProps) => {
    const [ selected, setSelected ] = useState<number>(0);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newValue = parseInt(event.currentTarget.value);
        setSelected(newValue);
        props.onChange(props.games[newValue]);
    };

    return (
        <div className='gamelist'>
            {
                props.games.map((game: Game, index: number) => {
                    return <ButtonIcon
                        value={index.toString()}
                        size={ButtonSize.BIG}
                        icon={game.icon}
                        name={game.id}
                        active={selected === index}
                        onClick={handleClick}
                        key={index}
                        fancy={props.fancy}
                        tooltipTitle={game.title}
                    />;
                })
            }
        </div>
    );
};
