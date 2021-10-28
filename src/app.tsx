import * as React from 'react';
import * as Sentry from '@sentry/react';
import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';
import { GlobaleInnstillingerProvider } from './context/GlobaleInnstillinger';

interface Props {
    krevStandardInnsatsgruppe?: boolean;
}

class App extends React.Component<Props> {
    render() {
        return (
            <Sentry.ErrorBoundary>
                <GlobaleInnstillingerProvider krevStandardInnsatsgruppe={this.props.krevStandardInnsatsgruppe}>
                    <AutentiseringsInfoFetcher />
                </GlobaleInnstillingerProvider>
            </Sentry.ErrorBoundary>
        );
    }
}

export default App;
