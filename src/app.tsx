import * as React from 'react';
import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';
import ErrorBoundary from './error-boundary';

class App extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <AutentiseringsInfoFetcher />
            </ErrorBoundary>
        );
    }
}

export default App;
