import * as React from 'react';
import * as Sentry from '@sentry/react';
import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';
import { GlobaleInnstillingerProvider } from './context/GlobaleInnstillinger';

class App extends React.Component {
    render() {
        return (
            <Sentry.ErrorBoundary>
                <GlobaleInnstillingerProvider>
                    <AutentiseringsInfoFetcher />
                </GlobaleInnstillingerProvider>
            </Sentry.ErrorBoundary>
        );
    }
}

export default App;
