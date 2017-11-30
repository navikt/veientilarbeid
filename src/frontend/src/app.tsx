import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import Overskrift from './komponenter/overskrift/overskrift';
import Oppgaver from './komponenter/oppgaver/oppgaver';
import Tjenester from './komponenter/tjenester/tjenester';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <div>
                        <Overskrift/>
                        <Oppgaver />
                        <Tjenester/>
                    </div>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
