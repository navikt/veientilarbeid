import { rest } from 'msw';

export default function msw_get(endpoint: string, response: Object | null, statusCode: number = 200): any {
    return rest.get(endpoint, (req, res, ctx) => {
        return res(ctx.status(statusCode), ctx.json(response === null ? {} : response));
    });
}

export function msw_post(endpoint: string, response: Object | null, statusCode: number = 200): any {
    return rest.post(endpoint, (req, res, ctx) => {
        return response ? res(ctx.status(statusCode), ctx.json(response)) : res(ctx.status(statusCode));
    });
}
