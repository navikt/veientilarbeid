import { InjectedIntl } from 'react-intl';
import { parse, stringify } from 'query-string';

export function getIntlText(id: string, intl?: InjectedIntl) {
    return (!!intl && intl.messages[id]) ? intl.messages[id] : id;
}

export function getCurrentUrlWithoutQueryParam(queryParam: string) {
    let query = parse(location.search);
    delete query[queryParam];
    const urlWithoutQueryParams = location.href.split('?')[0];
    return urlWithoutQueryParams + (
        Object.keys(query).length === 0 ? '' : '?' + stringify(query)
    );
}