import { InjectedIntl } from 'react-intl';

export function getIntlText(id: string, intl?: InjectedIntl) {
    return (!!intl && intl.messages[id]) ? intl.messages[id] : id;
}