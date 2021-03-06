import { NCMapRounds } from '@cactus/srm-component';
import React from 'react';
import CheckmateImg from '../../../styles/img/checkmate.png';
import GarrisonImg from '../../../styles/img/garrison.jpg';

export const MapRoundsExample: React.FunctionComponent = () => {
    const demoMapRounds = [
        {
            'id': '18071991',
            'type': 'classic',
            'best_of_format': 5,
            'index': 1,
            'reverseIndex': 4,
            'rounds_battle': [
                {
                    'id': '12092021',
                    'position': 0,
                    'round_mode': {
                        'position': 1,
                        'title': 'R&D [1vs1]',
                        'title_short': 'R&D [1vs1]'
                    },
                    'round_map': {
                        'title': 'Checkmate',
                        'image': CheckmateImg
                    }
                },
                {
                    'id': '11092021',
                    'position': 1,
                    'round_mode': {
                        'position': 1,
                        'title': 'R&D [1vs1]',
                        'title_short': 'R&D [1vs1]'
                    },
                    'round_map': {
                        'title': 'Garrison',
                        'image': GarrisonImg
                    }
                },
            ]
        },
    ];

    return (
        <>
            <NCMapRounds mapRounds={demoMapRounds} />
        </>
    );
};
