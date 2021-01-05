export interface API {}

export declare class API implements API {
    constructor(kwargs?: object);
    base(): Promise<unknown>;
    info(): Promise<object>;
}
