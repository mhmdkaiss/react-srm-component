import * as faker from 'faker';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateSearchResultWithName = (search: string, length: number) => {
    const arr = [];
    for (let i = 1; i <= length; i++) {
        const name = faker.internet.userName();
        if (name.toLowerCase().startsWith(search.toLowerCase())) {
            arr.push({ name: name });
        }
    }
    return arr;
};
