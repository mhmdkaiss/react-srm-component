import CheckmateImg from '../../styles/img/checkmate.png';
import GarrisonImg from '../../styles/img/garrison.jpg';
import MiamiImg from '../../styles/img/miami.png';
import MoscowImg from '../../styles/img/moscow.png';

export const MAP_ROUNDS_BRACKET_MOCK = [
    {
        "id": "18071991",
        "type": "classic",
        "best_of_format": 5,
        "index": 1,
        "reverseIndex": 4,
        "rounds_battle": [
            {
                "id": "12092021",
                "position": 0,
                "round_mode": {
                    "position": 1,
                    "title": "R&D [1vs1]",
                    "title_short": "R&D [1vs1]"
                },
                "round_map": {
                    "title": "Checkmate",
                    "image": CheckmateImg
                }
            },
            {
                "id": "11092021",
                "position": 1,
                "round_mode": {
                    "position": 1,
                    "title": "R&D [1vs1]",
                    "title_short": "R&D [1vs1]"
                },
                "round_map": {
                    "title": "Moscow",
                    "image": MoscowImg
                }
            },
            {
                "id": "11092022",
                "position": 1,
                "round_mode": {
                    "position": 1,
                    "title": "R&D [1vs1]",
                    "title_short": "R&D [1vs1]"
                },
                "round_map": {
                    "title": "Miami",
                    "image": MiamiImg
                }
            },
        ]
    },
    {
        "id": "1252724",
        "type": "classic",
        "best_of_format": 3,
        "index": 2,
        "reverseIndex": 3,
        "rounds_battle": [
            {
                "id": "2500863",
                "position": 0,
                "round_mode": {
                    "position": 1,
                    "title": "R&D [1vs1]",
                    "title_short": "R&D [1vs1]"
                },
                "round_map": {
                    "title": "Garrison",
                    "image": GarrisonImg
                }
            },
            {
                "id": "2500865",
                "position": 2,
                "round_mode": {
                    "position": 1,
                    "title": "R&D [1vs1]",
                    "title_short": "R&D [1vs1]"
                },
                "round_map": {
                    "title": "Checkmate",
                    "image": CheckmateImg
                }
            }
        ]
    }
];


export const MAP_ROUNDS_BRACKET_NO_IMAGES_MOCK = [
    {
        "id": "18071991",
        "type": "classic",
        "best_of_format": 5,
        "index": 1,
        "reverseIndex": 4,
        "rounds_battle": [
            {
                "id": "12092021",
                "position": 0,
                "round_mode": {
                    "position": 1,
                    "title": "Round 1: Razzia de Gemmes",
                    "title_short": "R&D [1vs1]"
                },
                "round_map": {
                    "title": "Bruissements / Double Swoosh",
                    "image": ""
                }
            },
            {
                "id": "11092021",
                "position": 1,
                "round_mode": {
                    "position": 1,
                    "title": "Round 2: Braquage",
                    "title_short": "R&D [1vs1]"
                },
                "round_map": {
                    "title": "Arrêt au stand / Pit Stop",
                    "image": ""
                }
            },
            {
                "id": "11092022",
                "position": 1,
                "round_mode": {
                    "position": 1,
                    "title": "Round 3: Prime",
                    "title_short": "R&D [1vs1]"
                },
                "round_map": {
                    "title": "Zone électrique / Electric Zone",
                    "image": ""
                }
            },
        ]
    }
];


export const MAP_ROUNDS_DOUBLE_ELIM_MOCK = [
    {
        "id": "1252900",
        "type": "loser_bracket",
        "best_of_format": 3,
        "index": 1,
        "reverseIndex": 6,
        "rounds_battle": []
    },
    {
        "id": "1252896",
        "type": "classic",
        "best_of_format": 3,
        "index": 1,
        "reverseIndex": 4,
        "rounds_battle": []
    },
    {
        "id": "1252906",
        "type": "classic_loser_final",
        "best_of_format": 5,
        "index": 1,
        "reverseIndex": 1,
        "rounds_battle": []
    },
    {
        "id": "1252901",
        "type": "loser_bracket",
        "best_of_format": 1,
        "index": 2,
        "reverseIndex": 5,
        "rounds_battle": []
    },
    {
        "id": "1252897",
        "type": "classic",
        "best_of_format": 3,
        "index": 2,
        "reverseIndex": 3,
        "rounds_battle": []
    },
    {
        "id": "1252898",
        "type": "classic",
        "best_of_format": 3,
        "index": 3,
        "reverseIndex": 2,
        "rounds_battle": []
    },
    {
        "id": "1252902",
        "type": "loser_bracket",
        "best_of_format": 1,
        "index": 3,
        "reverseIndex": 4,
        "rounds_battle": []
    },
    {
        "id": "1252899",
        "type": "classic",
        "best_of_format": 3,
        "index": 4,
        "reverseIndex": 1,
        "rounds_battle": []
    }
];