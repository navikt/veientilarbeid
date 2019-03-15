import * as React from 'react';
import { parse } from 'query-string';
import * as nb from 'react-intl/locale-data/nb';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import lokaleTekster from './tekster/bundle';

addLocaleData(nb);

function mapTeksterTilNokler(tekster: any) { // tslint:disable-line no-any
    return Object.keys(tekster)
        .map(key => ({key, value: `[${key}]`}))
        .reduce((previous, current) => {
            previous[current.key] = current.value;
            return previous;
        }, {});
}

function skalViseTekstnokler(): boolean {
    const search = parse(window.location.search);
    return !!search.vistekster;
}

class IntlProvider extends React.Component {

    render() {
        const {children, ...props} = this.props;
        const locale = 'nb';

        const alleTekster = {
            nb: {...lokaleTekster.nb},
        };

        const tekster = skalViseTekstnokler() ? mapTeksterTilNokler(alleTekster.nb) : alleTekster.nb;

        return (
            <Provider {...props} locale={locale} messages={tekster || []}>
                {children}
            </Provider>
        );
    }
}

export default IntlProvider;
