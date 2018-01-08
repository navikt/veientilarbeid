import * as React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import getStore from './store';
import IntlProvider from './Intl-provider';
import './decorator/decorator-mock';
import Home from './komponenter/home';
import ReservertKrr from './komponenter/krr/reservert-krr';
import Overskrift from './komponenter/overskrift/overskrift';

const store = getStore();

export const basename = 'veientilarbeid';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <Router basename={basename}>
                        <div>
                            <Overskrift/>
                            <div className="body__wrapper">
                                <Route exact={true} path="/" component={Home}/>
                                <Route path="/reservert" component={ReservertKrr}/>
                            </div>
                        </div>
                    </Router>
                </IntlProvider>
            </Provider >
        );
    }
}

export default App;
