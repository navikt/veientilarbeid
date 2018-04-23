import { InjectedIntl } from 'react-intl';
import { parse, stringify } from 'query-string';

export function getIntlText(id: string, intl?: InjectedIntl) {
    return (!!intl && intl.messages[id]) ? intl.messages[id] : id;
}

export function getCurrentUrlWithoutQueryParam(queryParam: string, baseUrl?: string, search?: string) {
    let query = parse(search ? search : location.search);
    delete query[queryParam];
    const currentUrl = baseUrl ? (baseUrl + search) : location.href;

    const urlWithoutQueryParams = currentUrl.split('?')[0];
    return urlWithoutQueryParams + (
        Object.keys(query).length === 0 ? '' : '?' + stringify(query)
    );
}

export function skalViseInformasjonsmodul(search: string) {
    return parse(search).visInformasjonsmodul === 'true';
}

export function skalViseDagPenger(search: string) {
    return parse(search).visdagpenger === 'true';
}

export function skalEkspandereInfoModul(search: string) {
    return skalViseDagPenger(search);
}

export function hentRettTilDagpengerIndex(search: string) {
    return skalViseDagPenger(search) ? 0 : -1;
}
