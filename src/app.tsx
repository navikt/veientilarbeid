import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';

const store = getStore();

// TODO Legge til Error Boundaries med logging til Frontendlogger
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <AutentiseringsInfoFetcher/>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
