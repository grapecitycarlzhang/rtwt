export interface GCBase {
}
export interface GCRequest extends GCBase {
}
export interface GCResponse extends GCBase {
    data?: any;
    status?: number;
    message?: string;
    totalCount?: number;
}
export interface GCRequestParam<T> {
    Url?: string;
    Headers?: {
        [key: string]: string;
    }[];
    Data?: T;
    Querys?: GCBase;
    Prefix?: string;
}

export interface IRequest {
    get(url: string, data?: any): any;
    post(url: string, data?: any): any;
    put(url: string, data?: any): any;
    del(url: string, data?: any): any;
}

export interface ITRequest<TRequest, TResponse> extends IRequest {
    get(url: string, data?: TRequest): Promise<TResponse>;
    post(url: string, data?: TRequest): Promise<TResponse>;
    put(url: string, data?: TRequest): Promise<TResponse>;
    del(url: string, data?: TRequest): Promise<TResponse>;
}