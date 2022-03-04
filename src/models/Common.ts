export interface Key {
    id: string;
    route: string;
}

export interface PaginatedList<T> {
    lastKey?: Key;
    list?: Array<T>
}
