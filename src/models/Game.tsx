export interface Game {
    id: string;
    route: string;
    active: number;
    title: string;
    icon: string;
}

export class NoGame {
    constructor(
        public active: boolean,
        public icon: string,
        public id: string,
        public route: string,
        public title: string,
    ) {}
}

export interface OrganisationGame {
	_id: string;
	name: string;
	value: string;
	slug: string;
    platforms?: Array<string>;
}
