import * as faker from 'faker';

export const createMockPartner = () => {
    return {
        id: faker.datatype.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        image: `${faker.image.animals()}?random=${faker.datatype.uuid()}`,
        social: {
            facebook: faker.datatype.boolean() ? 'https://nextcactus.gg?facebook': '',
            twitter: faker.datatype.boolean() ? 'https://nextcactus.gg?twitter': '',
            twitch: faker.datatype.boolean() ? 'https://nextcactus.gg?twitch': '',
            youtube: faker.datatype.boolean() ? 'https://nextcactus.gg?youtube': '',
            steam: faker.datatype.boolean() ? 'https://nextcactus.gg?steam': '',
            discord: faker.datatype.boolean() ? 'https://nextcactus.gg?discord': '',
            instagram: faker.datatype.boolean() ? 'https://nextcactus.gg?instagram': '',
        }
    }
};
