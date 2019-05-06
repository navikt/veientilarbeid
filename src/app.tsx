import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import DataProvider from './komponenter/hent-initial-data/data-provider';
import FeatureToggleProvider from './komponenter/hent-initial-data/feature-toggle-provider';
import Innhold from './innhold/innhold-logikk';
import SjekkOppfolging from "./komponenter/hent-initial-data/sjekk-oppfolging";
import OppfolgingBrukerregistreringProvider
    from './komponenter/hent-initial-data/oppfolging-brukerregistrering-provider';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <FeatureToggleProvider>
                        <OppfolgingBrukerregistreringProvider>
                            <SjekkOppfolging>
                                <DataProvider>
                                    <Innhold/>
                                </DataProvider>
                            </SjekkOppfolging>
                        </OppfolgingBrukerregistreringProvider>
                    </FeatureToggleProvider>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
