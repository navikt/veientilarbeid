import { InjectedIntl } from 'react-intl';

export function getIntlText(intl: InjectedIntl, id: string) {
    return intl.messages[id] ? intl.messages[id] : id;
}