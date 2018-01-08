/*tslint:disable*/
import * as fetchMock from 'fetch-mock';
import * as qs from 'query-string';
import * as pathRegex from 'path-to-regexp';

export const MOCK_CONFIG = {
    failureRate: -1
};

export function randomFailure(fn: any) {
    return (...args: any[]) => {
        const shouldFail = Math.random() <= MOCK_CONFIG.failureRate;
        if (shouldFail) {
            return 500;
        }

        if (typeof fn === 'function') {
            return fn(...args);
        }
        return fn; // Trust me, its data
    };
}

export function delayed(time: any, response: any): any {
    return () => new Promise((resolve) => setTimeout(() => resolve(response), time));
}

export function respondWith(handler: any) {
    return (url: any, config: any, extra: any) => {
        const queryParams = qs.parse(qs.extract(url));
        const bodyParams = config.body && JSON.parse(config.body);

        let response;

        if (typeof handler === 'function') {
            response = handler(url, config, {queryParams, bodyParams, extra});
        } else {
            response = Promise.resolve(() => handler); // Trust me, its data
        }

        response.then((res:any) => {
            console.groupCollapsed(url);
            console.groupCollapsed('config');
            console.log('url', url);
            console.log('config', config);
            console.log('queryParams', queryParams);
            console.log('bodyParams', bodyParams);
            console.log('extra', extra);
            console.groupEnd();

            console.log('response', res());
            console.groupEnd();
        });

        return response;
    };
}


(fetchMock as any)._mock(); // Må kalles slik at window.fetch blir byttet ut
export const mock = ['get', 'post', 'put', 'delete', 'head', 'patch', 'mock']
    .map((method) => ({
        [method]: (...args: any[]) => {
            const handler = args.pop();
            const routeurl = args[0];

            let preprocessor: any;
            if (routeurl.startsWith('express:')) {
                const pureUrl = routeurl.replace(/^express:/, '');
                const keys: any[] = [];
                const regexp = pathRegex(pureUrl, keys);

                preprocessor = (url: any) => {
                    const [fullMatch, ...matched] = (regexp as any).exec(url);
                    return fullMatch && keys
                            .map((key, index) => {
                                if (key.name && matched[index]) {
                                    return {[key.name]: matched[index]};
                                }
                                return null;
                            })
                            .filter((obj) => obj !== null)
                            .reduce((acc, obj) => ({...acc, ...obj}), {});
                };
            }

            return fetchMock[method](...args, (url: any, ...handlerArgs: any[]) => {
                const extra = (preprocessor && preprocessor(url, ...handlerArgs, ...args)) || {};
                extra.args = args;
                return handler(url, ...handlerArgs, extra);
            });
        }
    }))
    .reduce((acc, method) => ({...acc, ...method}), {});

mock.realFetch = (fetchMock as any).realFetch;
