import * as request from 'superagent';
import { GCRequestParam, ITRequest } from '../index';
import { DI } from '../inversify';
const { injectable } = DI
@injectable()
export class Request<TRequest, TResponse extends GCResponse> implements ITRequest<TRequest, TResponse> {
    defaultParam = {
        Url: '',
        Data: null,
        Querys: null,
        Headers: [],
        Prefix: window ? window['apiPrefix'] : ''
    } as GCRequestParam<TRequest>
    processResponse(func: (url: string) => request.SuperAgentRequest, param?: GCRequestParam<TRequest>): Promise<TResponse> {
        const request = func(param.Prefix && !param.Url.startsWith("http") ? param.Prefix + param.Url : '' + param.Url);
        request.type("json");
        param.Data && request.send(JSON.stringify(param.Data));
        param.Querys && request.query(param.Querys);
        param.Headers && param.Headers.forEach((entry) => {
            request.set(entry);
        });
        return new Promise((resolve, reject) => {
            request.end((error, response) => {
                response && response.ok && response.body ? resolve(response.body) : reject();
            });
        });
    }

    buildData(args: IArguments | any[]): GCRequestParam<TRequest> {
        if (typeof (args[0]) === "string") {
            return {
                ...this.defaultParam,
                ...{
                    Url: args[0],
                    Data: args[1]
                }
            };
        }
        else {
            return { ...this.defaultParam, ...args[0] };
        }
    }
    buildQueryParam(url: any, data: any, addRandom?: any): any {
        if (data) {
            url += "?";
            Object.getOwnPropertyNames(data)
                .forEach(name => {
                    url += name + "=" + encodeURI(data[name]) + "&";
                });
            if (addRandom) {
                url += Date.now() + "&";
            }
            url = url.slice(0, url.length - 1);
        }
        return url;
    }
    get(url: string, data?: TRequest): Promise<TResponse> {
        return this.processResponse(request.get, this.buildData([
            this.buildQueryParam(url, data, true),
            data
        ]));
    }
    post(url: string, data?: TRequest): Promise<TResponse> {
        return this.processResponse(request.post, this.buildData(arguments));
    }
    put(url: string, data?: TRequest): Promise<TResponse> {
        return this.processResponse(request.put, this.buildData(arguments));
    }
    del(url: string, data?: TRequest): Promise<TResponse> {
        return this.processResponse(request.delete, this.buildData([
            this.buildQueryParam(url, data),
            data
        ]));
    }
}