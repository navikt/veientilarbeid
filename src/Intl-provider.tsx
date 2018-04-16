import * as React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import lokaleTekster from './tekster/alle-tekster';
import { AppState } from './reducer';
import { connect } from 'react-redux';

addLocaleData(nb);

interface StateProps {
    teksterFraState: any; // tslint:disable-line no-any
}

type Props = StateProps;

class IntlProvider extends React.Component<Props> {

    render() {
        const {children, teksterFraState, ...props} = this.props;
        const locale = 'nb';

        const tekster = {
            nb: {...teksterFraState.nb, ...lokaleTekster.nb},
            en: {...teksterFraState.en, ...lokaleTekster.en}
        };

        return (
            <Provider {...props} locale={locale} messages={tekster.nb || []}>
                {children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    teksterFraState: state.tekster.data
});

export default connect(mapStateToProps)(IntlProvider);
