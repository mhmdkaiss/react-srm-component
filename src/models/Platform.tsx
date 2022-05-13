export interface Platform {
    id: string;
    route: string;
    active: boolean;
    color: string;
    title: string;
}

export interface ExtendedPlatform extends Platform {
    checked?: boolean;
}
