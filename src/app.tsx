import * as Sentry from '@sentry/react';
import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';

function App() {
    return (
        <Sentry.ErrorBoundary>
            <AutentiseringsInfoFetcher />
        </Sentry.ErrorBoundary>
    );
}

export default App;
