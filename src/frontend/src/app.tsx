import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import './decorator/decorator-mock';
import Home from './komponenter/home';
import Overskrift from './komponenter/overskrift/overskrift';
import { hentKrrStatustatus } from './ducks/krr';
import SjekkKrrStatus from './komponenter/krr/sjekk-krr';

const store = getStore();
const dispatch = store.dispatch;

class App extends React.Component {
    componentDidMount() {
        dispatch(hentKrrStatustatus());
    }

    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <SjekkKrrStatus >
                        <Overskrift/>
                        <Home/>
                    </SjekkKrrStatus>
                </IntlProvider>
            </Provider >
        );
    }
}

export default App;
