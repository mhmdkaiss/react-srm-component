import * as faker from 'faker';

const trainings = [
    '5fb28e023888328391f62b99',
    '5f7c6616dbc050507bbab19d',
    '5eeb2982845d3d44b41e8ad7',
    '5e4e856ac6fa9350ccd4cef9',
    '5ef46ef096cea7dbe20aea74',
    '5ef46a80ad6ad898839cbb04',
    '5f6db79159cb1973d10545c6',
    '6062d7918ece279faec2ad5d',
]

export const createMockTraining = () => {
    return {
        id: faker.datatype.uuid(),
        name: `${faker.company.companyName()}`,
        image: `https://esm-prod-public.s3.amazonaws.com/training/program/${trainings[Math.floor(Math.random() * trainings.length)]}/medias/Cover`,
    }
};
