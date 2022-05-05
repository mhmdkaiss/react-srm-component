
import { ChallengeExtended, RewardKind } from '@cactus/srm-component';
import moment from 'moment';

const now = moment();

export const withoutGameSlug: ChallengeExtended = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    organization: '',
    startDate: '2022-03-07T03:24:44Z',
    endDate: now.add(5, 'day').toISOString(),
    featured: false,
    type: 1,
    isAvailableInRegion: true,
    i18n: {
        title: '4ever ongoing challenge',
        description: 'This challenge never ends',
        rules: '',
        banner: '',
    },
    participants: 1,
    game: {
        slug: '',
        name: '',
        _id: '',
        value: ''
    },
    banner: '',
    rewards: {
        0: [{
            kind: RewardKind.CASH,
            value: 10,
            cur: 'EUR'
        }],
    }

};

export const classic: ChallengeExtended = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    organization: '',
    startDate: '2022-03-07T03:24:44Z',
    endDate: '2022-04-07T13:24:44Z',
    featured: false,
    type: 0,
    isAvailableInRegion: true,
    i18n: {
        title: 'Challenge #1',
        description: 'Praesent at sagittis est. Fusce sollicitudin sed massa at ultricies.',
        rules: '',
        banner: '',
    },
    participants: 1,
    game: {
        slug: '',
        name: 'dragon ball',
        _id: '',
        value: ''
    },
    banner: '',
    rewards: {
        0: [{
            kind: RewardKind.GIFT,
            value: 99,
            cur: 'EUR'
        }],
        1: [{
            kind: RewardKind.CASH,
            value: 900,
            cur: 'EUR'
        }],
    }
};

export const japanese : ChallengeExtended = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    organization: '',
    startDate: '2022-03-07T03:24:44Z',
    endDate: '2022-04-07T13:24:44Z',
    featured: false,
    type: 1,
    isAvailableInRegion: false,
    i18n: {
        title: 'Dragon dragon ball Z challenge!',
        description: 'Goku Super Sayan 1000',
        rules: '',
        banner: ''
    },
    game: {
        slug: '',
        name: 'dragon ball',
        _id: '',
        value: ''
    },
    participants: 101,
    banner: `${process.env.REACT_APP_S3_PUBLIC_URL}/game/5e8307f2537278bb83fac7ed/medias/CarrouselImage`,
    rewards: {
        0: [{
            kind: RewardKind.CASH,
            value: 10000,
            cur: 'JPY'
        }],
    }
};

export const withGameSlug: ChallengeExtended = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    organization: '',
    startDate: now.add(1, 'day').toISOString(),
    endDate: now.add(5, 'day').toISOString(),
    featured: false,
    type: 0,
    isAvailableInRegion: true,
    i18n: {
        title: 'Challenge #7',
        description: 'Praesent at sagittis est. Fusce sollicitudin sed massa at ultricies .',
        rules: '',
        banner: ''
    },
    game: {
        slug: 'league-of-legends',
        name: 'LOL',
        _id: '',
        value: ''
    },
    participants: 10,
    banner: `${process.env.REACT_APP_S3_PUBLIC_URL}/game/5c436c2c766ea609157540e8/medias/CarrouselImage`,
    rewards: {
        0: [{
            kind: RewardKind.CASH,
            value: 300,
            cur: 'USD'
        },
        {
            kind: RewardKind.CASH,
            value: 20,
            cur: 'USD'
        }],
    }
};

export const notAvailable: ChallengeExtended = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    organization: '',
    startDate: '2022-03-07T03:24:44Z',
    endDate: '2022-04-07T13:24:44Z',
    featured: false,
    type: 2,
    isAvailableInRegion: false,
    i18n: {
        title: 'Challenge #3',
        description: 'No description',
        rules: '',
        banner: ''
    },
    game: {
        slug: 'fifa-21',
        name: 'Fifa 21',
        _id: '',
        value: ''
    },
    participants: 101,
    banner: `${process.env.REACT_APP_S3_PUBLIC_URL}/game/5f843fdaf32cc449004e0375/medias/CarrouselImage`,
    rewards: {
        0: [{
            kind: RewardKind.CASH,
            value: 500,
            cur: 'CNY'
        },
        {
            kind: RewardKind.CASH,
            value: 500,
            cur: 'CNY'
        }],
    }
};

export const ongonig: ChallengeExtended = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    organization: '',
    startDate: now.subtract(1, 'day').toISOString(),
    endDate: now.add(5, 'day').toISOString(),
    featured: false,
    type: 0,
    isAvailableInRegion: true,
    i18n: {
        title: 'Challenge #22',
        description: 'Praesent at sagittis est. Fusce sollicitudin sed massa at ultricies .',
        rules: '',
        banner: ''
    },
    game: {
        slug: 'rocket-league',
        name: 'Rocket League',
        _id: '',
        value: ''
    },
    participants: 50,
    banner: `${process.env.REACT_APP_S3_PUBLIC_URL}/game/5cbefb8ccf473930ea0237f1/medias/CarrouselImage`,
    rewards: {
        0: [{
            kind: RewardKind.COIN,
            value: 88,
            cur: 'GBP'
        }],
    }
};

export const ended: ChallengeExtended = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    organization: '',
    startDate: '2022-02-07T03:24:44Z',
    endDate: '2022-02-08T13:24:44Z',
    featured: false,
    type: 0,
    isAvailableInRegion: true,
    i18n: {
        title: 'Check mate',
        description: 'The knight moves in an L-shape!',
        rules: '',
        banner: ''
    },
    game: {
        slug: '',
        name: 'Dragon ball fighter Z',
        _id: '',
        value: ''
    },
    participants: 2,
    banner: `${process.env.REACT_APP_S3_PUBLIC_URL}/game/6082e67c848aab9ba76d25c1/medias/CarrouselImage`,
    rewards: {
        0: [{
            kind: RewardKind.GIFT,
            value: 18,
            cur: 'GBP'
        }],
    }
};
