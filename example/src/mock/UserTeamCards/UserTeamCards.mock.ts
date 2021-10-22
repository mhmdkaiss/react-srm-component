import * as faker from 'faker';

export const PLAYER_MOCK = {
    id: faker.datatype.uuid(),
    player: {
        name: `${faker.internet.userName()}#${faker.datatype.number({
            min: 1000,
            max: 9999,
        })}`,
        captain: faker.datatype.boolean(),
        premium: faker.datatype.boolean() ? 'PREMIUM' : '',
        account: faker.internet.userName(),
        elo: faker.datatype.number({ min: 0, max: 20000 }),
    },
};

export const TEAM_MOCK = {
    avatar: '',
    checkIn: true,
    fd: 0,
    fr: 0,
    fullScore: 0,
    id: faker.datatype.uuid(),
    name: `${faker.internet.userName()}#${faker.datatype.number({
        min: 1000,
        max: 9999,
    })}`,
    p: true,
    players: {
        '5f1e9d975a8f255635322add': {
            name: 'captain#4764',
            captain: true,
            account: faker.internet.userName(),
            elo: 0,
            premium: '',
        },
        '5f1e9d975a8f255635322a12': {
            name: `${faker.internet.userName()}#${faker.datatype.number({
                min: 1000,
                max: 9999,
            })}`,
            captain: false,
            account: faker.internet.userName(),
            elo: 0,
            premium: '',
        },
    },
    ranking: faker.datatype.number({ min: 1, max: 12 }),
    registration: faker.date.past().toISOString(),
    route: `teams/${faker.datatype.uuid}`,
    tag: `${faker.internet.userName()}`,
};
