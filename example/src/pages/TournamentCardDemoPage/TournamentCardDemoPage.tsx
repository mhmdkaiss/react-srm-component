import './TournamentCardDemoPage.scss';

import React from 'react';
import { NCTournamentCard, CardSize } from '@cactus/srm-component';

export const TournamentCardDemoPage: React.FunctionComponent = () => {

    return (
        <div className='tournament-demo-page d-flex flex-wrap'>
            {
                Object.keys(CardSize).filter(x => !(parseInt(x) >= 0)).map(size => {
                    return (
                        <div>
                            <div className="mb-2">Size {size.toUpperCase()}</div>
                            <NCTournamentCard
                                key={size}
                                name="Tournament tile"
                                banner="https://esm-dev-public.s3.amazonaws.com/game/5cbefb8ccf473930ea0237f1/medias/TournamentBanner"
                                date={1630677600}
                                platforms={['ps4']}
                                format={1}
                                prize={90}
                                size={CardSize[size]}
                                partner={'creditagricole'}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
};
