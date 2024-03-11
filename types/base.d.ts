import { API as BaseAPI } from "yonius";

export type APIOptions = {
    params?: Record<string, unknown>;
    headers?: HeadersInit;
    kwargs?: Record<string, unknown>;
    handle?: boolean;
    data?: BodyInit | JSON;
    dataJ?: JSON;
    dataM?: Record<string, unknown>;
};

export declare class API extends BaseAPI {
    index(options: APIOptions): Promise<Blob>;
    postIndex(options: APIOptions): Promise<Blob>;
    putIndex(options: APIOptions): Promise<Blob>;
    info(): Promise<object>;
}
