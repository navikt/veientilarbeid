import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import './decorator/decorator-mock';
import Home from './komponenter/home';
import Overskrift from './komponenter/overskrift/overskrift';
import OppfolgingProvider from './komponenter/oppfolging/oppfolging-provider';
import SjekkOppfolging from './komponenter/oppfolging/sjekk-oppfolging';
import TeksterProvider from './komponenter/tekstfetching/tekster-provider';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <TeksterProvider>
                    <IntlProvider>
                        <OppfolgingProvider>
                            <SjekkOppfolging>
                                <main id="maincontent" role="main" tabIndex={-1}>
                                    <Overskrift/>
                                    <Home/>
                                </main>
                            </SjekkOppfolging>
                        </OppfolgingProvider>
                    </IntlProvider>
                </TeksterProvider>
            </Provider>
        );
    }
}

export default App;
