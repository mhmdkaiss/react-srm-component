import React, { useState } from 'react';
import { Game } from '../../models/Game';
import { ButtonIcon } from '../../atoms/Button/ButtonIcon';
import './GameList.scss';
import { ButtonSize } from '../..';

export interface GameListProps {
    games: Array<Game>;
    fancy?: boolean,
    onChange: (game: Game) => void;
}

export const GameList: React.FunctionComponent<GameListProps> = ({ games, fancy, onChange }: GameListProps) => {
    const [selected, setSelected] = useState<number>(0);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelected(parseInt(event.currentTarget.value));
        onChange(games[selected]);
    }

    return (
        <div className='gamelist'>
            {
                games.map((game: Game, index: number) => {
                    return <ButtonIcon value={index.toString()} size={ButtonSize.BIG} icon={game.icon} name={game.id} active={selected == index} onClick={(e) => handleClick(e)} key={index} fancy={fancy}/>
                })
            }
        </div>
    );
}