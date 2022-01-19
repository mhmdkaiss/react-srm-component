import * as faker from 'faker';
import { FeedModel } from '@cactus/srm-component';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTwiterMockFeedModel = (): FeedModel => {
    return {
        title: faker.name.firstName(),
        content: '<p style="margin: 0px 25px">In sed sapien id ex ultrices congue in at leo. Mauris vestibulum mauris ut elit condimentum. Cras finibus elit sit amet ex dictum lacinia.<p>',
        username: faker.internet.userName(),
        date: faker.date.recent(),
        icon: `${faker.image.image()}?random=${faker.datatype.uuid()}`,
        logo: `${faker.image.animals()}?random=${faker.datatype.uuid()}`,
        verified: faker.datatype.boolean(),
        tweetId: '123'
    };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createBOMockFeedModel = (): FeedModel => {
    return {
        title: faker.name.firstName(),
        content: `<p style="margin: 0 15px" />In sed sapien id ex ultrices congue in at leo. Mauris vestibulum mauris ut elit condimentum. Cras finibus elit sit amet ex dictum lacinia.</p><img src="${faker.image.animals()}" style="width: 100%"/>`,
        date: faker.date.recent(),
        icon: 'https://public.nextcactus.gg/media/assets/nc-logo-small.png',
        logo: `${faker.image.animals()}?random=${faker.datatype.uuid()}`,
    };
};
