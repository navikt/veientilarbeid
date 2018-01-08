import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import './decorator/decorator-mock';
import Home from './komponenter/home';
import Overskrift from './komponenter/overskrift/overskrift';
import { hentRegistreringStatus } from './ducks/hent-registrering-status';
import SjekkKrrStatus from './komponenter/krr/sjekk-krr';

const store = getStore();
const dispatch = store.dispatch;

class App extends React.Component {
    componentDidMount() {
        dispatch(hentRegistreringStatus());
    }

    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <div>
                        <Overskrift/>
                        <div className="body__wrapper">
                            <SjekkKrrStatus >
                                <Home/>
                            </SjekkKrrStatus>
                        </div>
                    </div>
                </IntlProvider>
            </Provider >
        );
    }
}

export default App;
