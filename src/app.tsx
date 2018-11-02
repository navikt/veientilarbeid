import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import HentInitialData from './komponenter/hent-initial-data/hent-initial-data';
import SjekkOppfolgingVisInnhold from './komponenter/hent-initial-data/sjekk-oppfolging-vis-innhold';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <HentInitialData>
                        <SjekkOppfolgingVisInnhold/>
                    </HentInitialData>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
