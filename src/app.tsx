import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import DataProvider from './komponenter/hent-initial-data/data-provider';
import Innhold from './innhold';
import FeatureToggleProvider from './komponenter/hent-initial-data/feature-toggle-provider';
import OppfolgingProvider from './komponenter/hent-initial-data/oppfolging-provider';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <FeatureToggleProvider>
                        <OppfolgingProvider>
                            <DataProvider>
                                <Innhold/>
                            </DataProvider>
                        </OppfolgingProvider>
                    </FeatureToggleProvider>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
