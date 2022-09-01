import * as React from 'react';

import AutentiseringsInfoFetcher from './komponenter/hent-initial-data/autentiseringsInfoFetcher';
import { GlobaleInnstillingerProvider } from './contexts/GlobaleInnstillinger';

interface Props {
    kreverStandardInnsatsgruppe?: boolean;
}

class App extends React.Component<Props> {
    render() {
        return (
            <GlobaleInnstillingerProvider kreverStandardInnsatsgruppe={this.props.kreverStandardInnsatsgruppe}>
                <AutentiseringsInfoFetcher />
            </GlobaleInnstillingerProvider>
        );
    }
}

export default App;
