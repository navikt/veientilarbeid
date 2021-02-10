import * as React from 'react';
import * as Sentry from '@sentry/react';
import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';

class App extends React.Component {
    render() {
        return (
            <Sentry.ErrorBoundary>
                <AutentiseringsInfoFetcher />
            </Sentry.ErrorBoundary>
        );
    }
}

export default App;
