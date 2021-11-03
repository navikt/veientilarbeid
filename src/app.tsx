import * as React from 'react';
import * as Sentry from '@sentry/react';
import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';
import { GlobaleInnstillingerProvider } from './contexts/GlobaleInnstillinger';

interface Props {
    kreverStandardInnsatsgruppe?: boolean;
}

class App extends React.Component<Props> {
    render() {
        return (
            <Sentry.ErrorBoundary>
                <GlobaleInnstillingerProvider kreverStandardInnsatsgruppe={this.props.kreverStandardInnsatsgruppe}>
                    <AutentiseringsInfoFetcher />
                </GlobaleInnstillingerProvider>
            </Sentry.ErrorBoundary>
        );
    }
}

export default App;
