const normalizeString = (value: string) => {
    return value.replaceAll(' ', '').toLowerCase();
};

export const makeSlugHash = (parent?: string, child?: string): string => {
    let slugHash = '';

    if (parent) {
        slugHash = normalizeString(parent);
    }
    if (child) {
        slugHash += `-${normalizeString(child)}`;
    }
    return slugHash;
};
