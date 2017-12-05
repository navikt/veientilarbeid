import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import IntlProvider from './Intl-provider';
import Overskrift from './komponenter/overskrift/overskrift';
import Oppgaver from './komponenter/oppgaver/oppgaver';
import Tjenester from './komponenter/tjenester/tjenester';
import Komigang from './komponenter/overskrift/kom-i-gang';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <div>
                        <Overskrift/>
                        <div className="gray-background__wrapper">
                            <div className="body__wrapper">
                                <Komigang/>
                                <Oppgaver />
                                <Tjenester/>
                            </div>
                        </div>
                    </div>
                </IntlProvider>
            </Provider >
        );
    }
}

export default App;
