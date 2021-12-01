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
        setSelected(parseInt(event.currentTarget.value));
        props.onChange(props.games[selected]);
    };

    return (
        <div className='gamelist'>
            {
                props.games.map((game: Game, index: number) => {
                    return <ButtonIcon value={index.toString()} size={ButtonSize.BIG} icon={game.icon} name={game.id} active={selected === index} onClick={(e) => handleClick(e)} key={index} fancy={props.fancy}/>;
                })
            }
        </div>
    );
};
