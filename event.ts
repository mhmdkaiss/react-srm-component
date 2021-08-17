import React from "react";

export interface IEvent {
    [l: string]: any
}

export type IEventCallback = (a: IEvent) => any

export type IEventEmiterStorage = {
    [l: string]: Array<IEventCallback>
}

export type IEventEmiter = {
    _events: IEventEmiterStorage,
    dispatch: (eventType: string, data: IEvent) => void,
    subscribe: (eventType: string, data: IEvent) => number,
    unsubscribe: (eventType: string, idx: number) => void,
}

export default class EventEmitter extends React.Component {
    private _events: IEventEmiterStorage = {};

    constructor(props?: any) {
        super(props);
    }

    public dispatch(eventType: string, data: IEvent) {
        if (!this._events[eventType]) return;
        for (const callback of this._events[eventType]) {
            callback(data);
        }
    }

    public subscribe(id: string, callback: (data: IEvent) => any) {
        if (!this._events[id]) {
            this._events[id] = [];
        }
        const idx = this._events[id].length;
        this._events[id].push(callback);
        return idx;
    }

    public unsubscribe(id: string, idx: number) {
        if (!this._events[id]) return;
        this._events[id].splice(idx, 1);
        if (this._events[id].length === 0) {
            delete this._events[id];
        }
    }
}
