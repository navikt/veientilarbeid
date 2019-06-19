import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';
import ErrorBoundary from './error-boundary';

const store = getStore();

// TODO Legge til Error Boundaries med logging til Frontendlogger
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ErrorBoundary>
                    <AutentiseringsInfoFetcher/>
                </ErrorBoundary>
            </Provider>
        );
    }
}

export default App;
