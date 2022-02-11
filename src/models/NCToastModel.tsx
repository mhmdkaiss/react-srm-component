export class ToastModel {
    public id: number;

    constructor(
        public title: string,
        public content: string,
        public type?: NCToastType,
        public hide?: boolean,
        public style?: string,
        public permanent?: boolean,
        public titleIcon?: JSX.Element,
    ) {
        this.id = new Date().valueOf();
    }
}

export enum NCToastType {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    CUSTOM = 'custom',
}

export enum ToastPosition {
    TOP_RIGHT = 'top-right',
    TOP_LEFT = 'top-left',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
}
