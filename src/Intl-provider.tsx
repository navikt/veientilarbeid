import * as React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import lokaleTekster from './tekster/alle-tekster';
import { AppState } from './reducer';
import { connect } from 'react-redux';
import { parse } from 'query-string';

addLocaleData(nb);

interface StateProps {
    teksterFraState: any; // tslint:disable-line no-any
}

type Props = StateProps;

function mapTeksterTilNokler(tekster: any) { // tslint:disable-line no-any
    return Object.keys(tekster)
        .map(key => ({key, value: `[${key}]`}))
        .reduce(
            (previous, current) => {
                previous[current.key] = current.value;
                return previous;
            },
            {}
        );
}

function skalViseTekstnokler(): boolean {
    const search = parse(window.location.search);
    return !!search.vistekster;
}

class IntlProvider extends React.Component<Props> {

    render() {
        const {children, teksterFraState, ...props} = this.props;
        const locale = 'nb';

        const alleTekster = {
            nb: {...teksterFraState.nb, ...lokaleTekster.nb},
            en: {...teksterFraState.en, ...lokaleTekster.en}
        };

        const tekster = skalViseTekstnokler() ? mapTeksterTilNokler(alleTekster.nb) : alleTekster.nb;

        return (
            <Provider {...props} locale={locale} messages={tekster || []}>
                {children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    teksterFraState: state.tekster.data
});

export default connect(mapStateToProps)(IntlProvider);
