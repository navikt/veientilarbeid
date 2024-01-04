import { http, HttpResponse } from 'msw';

export default function msw_get(endpoint: string, response: Object | null, statusCode: number = 200): any {
    return http.get(endpoint, () => {
        return response ? HttpResponse.json(response) : new HttpResponse(null, { status: statusCode });
    });
}

export function msw_post(endpoint: string, response: Object | null, statusCode: number = 200): any {
    return http.post(endpoint, () => {
        return response
            ? HttpResponse.json(response, { status: statusCode })
            : new HttpResponse(null, { status: statusCode });
    });
}
