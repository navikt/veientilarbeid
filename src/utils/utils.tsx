import { parse, stringify } from 'query-string';

// TODO Rydde opp i denne filen

export function getCurrentUrlWithoutQueryParam(queryParam: string, baseUrl?: string, search?: string) {
    let query = parse(search ? search : location.search);
    delete query[queryParam];
    const currentUrl = baseUrl ? (baseUrl + search) : location.href;

    const urlWithoutQueryParams = currentUrl.split('?')[0];
    return urlWithoutQueryParams + (
        Object.keys(query).length === 0 ? '' : '?' + stringify(query)
    );
}

export function visRettTilDagPenger(search: string) {
    return parse(search).visdagpenger === 'true';
}

export function ekspanderInformasjonsmodul(search: string) {
    return visRettTilDagPenger(search);
}