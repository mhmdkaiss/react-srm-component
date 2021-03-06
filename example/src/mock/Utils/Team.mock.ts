export const TEAMS_MOCK = [
    {
        name: 'Team 1',
        slug: 'teamcurry',
        route: 'route1',
        players: {
            '5e6f53cadcfc00132e1c73b1': {
                name: 'Player 1',
                captain: false,
                premium: false,
                account: '',
                elo: 0,
            },
            '5e6f53cadcfc00132e1c73b2': {
                name: 'Player 2',
                captain: false,
                premium: false,
                account: '',
                elo: 0,
            }
        },
        avatar: '',
        ranking: 0,
        checkIn: false,
        fd: 0,
        fr: 0,
        fullScore: 0,
        pos: 0,
        team: '',
        tag: '',
        teamInfo: { members: 2 },
    },
    {
        name: 'Team 2',
        id: '5e6f53cadcfc00132e1c7354',
        slug: '',
        route: 'route2',
        players: {
            '5e6f53cadcfc00132e1c73b1': {
                name: 'Player 1',
                captain: false,
                premium: false,
                account: '',
                elo: 0,
            },
            '5e6f53cadcfc00132e1c73b2': {
                name: 'Player 2',
                captain: false,
                premium: false,
                account: '',
                elo: 0,
            }
        },
        avatar: '',
        ranking: 0,
        checkIn: false,
        fd: 0,
        fr: 0,
        fullScore: 0,
        pos: 0,
        team: 'test',
        tag: 'test',
        teamInfo: { members: 2 },
    },

];

export const PLAYERS_MOCK = TEAMS_MOCK.map(t => {
    const team = JSON.parse(JSON.stringify(t));
    delete team.players[Object.keys(t.players)[1]];
    return team;
});
