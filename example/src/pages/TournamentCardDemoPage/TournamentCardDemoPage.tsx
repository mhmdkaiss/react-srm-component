import './TournamentCardDemoPage.scss';

import React from 'react';
import { NCTournamentCard, NCAnimatedCardList } from '@cactus/srm-component';

const tournament = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    date: 1630677600,
    gameSlug: 'rocket-league',
    min: 4,
    name: 'NPTF-37- 3',
    partner: 'creditagricole',
    platforms: [ 'ps4', 'pc', 'xbox', 'switch' ],
    entrance: {
        fee: 0,
    },
    format: 1,
};

const renderCard = (restricted?: boolean, winner?: string, gameId: string = '5cbefb8ccf473930ea0237f1', cardStyle?: number) => {
    const gameName = [ 'Small game', 'Long game name', 'Very very long game name' ][Math.floor(Math.random() * (3))];

    return (
        <NCTournamentCard
            tournament={tournament}
            banner={`${process.env.REACT_APP_S3_PUBLIC_URL}/game/${gameId}/medias/TournamentBanner`}
            gameName={gameName}
            prize="10 €"
            restricted={restricted}
            winner={winner}
            cardStyle={cardStyle}
        />
    );
};

const renderRow = (title: string, restricted?: boolean, winner?: string) => {
    return (
        <React.Fragment>
            <div>{title}</div>
            {renderCard(restricted, winner)}
            {renderCard(restricted, winner)}
            <div className='nc-hover-card opening forced'>
                {renderCard(restricted, winner)}
            </div>
            <div>
                <NCAnimatedCardList
                    cards={
                        [...Array(6)].map((_, index) => {
                            const i = index % 3;
                            const gameId = i ? i === 1 ?
                                '5ee2000cca2d921b383b5c94' :
                                '5cbefb8ccf473930ea0237f1' :
                                '5c436c2c766ea609157540e8';
                            return (renderCard(restricted, winner, gameId));
                        })
                    }
                />
            </div>
        </React.Fragment>
    );
};

export const TournamentCardDemoPage: React.FunctionComponent = () => {
    return (
        <div className='tournament-demo-page'>
            <div className='grid mt-5'>
                <div className="row-name">Default</div>
                <div></div>
                <div>Min width</div>
                <div>Max width</div>
                <div>Hover effect</div>
                <div>List</div>

                { renderRow('Default') }
                { renderRow('Winner', false, 'Winner_Name') }
                { renderRow('Restricted', true) }
                { renderRow('Restricted & Winner', true, 'Winner_Name') }
            </div>
            <div className='grid-2 mt-5'>
                <div className="row-name">Highlight</div>
                <div></div>
                <div>1</div>
                <div>2</div>

                <div>Default</div>
                {renderCard(false, undefined, '5ee2000cca2d921b383b5c94', 1)}
                {renderCard(false, undefined, '5ee2000cca2d921b383b5c94', 2)}

                <div>Winner</div>
                {renderCard(false, 'Winner_Name', '5ee2000cca2d921b383b5c94', 1)}
                {renderCard(false, 'Winner_Name', '5ee2000cca2d921b383b5c94', 2)}

                <div>Restricted</div>
                {renderCard(true, undefined, '5ee2000cca2d921b383b5c94', 1)}
                {renderCard(true, undefined, '5ee2000cca2d921b383b5c94', 2)}

                <div>Restricted & Winner</div>
                {renderCard(true, 'Winner_Name', '5ee2000cca2d921b383b5c94', 1)}
                {renderCard(true, 'Winner_Name', '5ee2000cca2d921b383b5c94', 2)}

            </div>
        </div>
    );
};
