import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import getStore from './store';
import IntlProvider from './Intl-provider';
import HentInitialData from './komponenter/hent-initial-data/hent-initial-data';
import Routes from './routes';
import EndreBrukerStatus from './komponenter/endre-bruker-status/endre-bruker-status';

const store = getStore();
const basename = '/veientilarbeid';

class App extends React.Component {
    render() {

        const endreBrukerStatus =
            process.env.REACT_APP_HEROKU
                ? <EndreBrukerStatus/>
                : null;

        return (
            <Provider store={store}>
                <IntlProvider>
                    <HentInitialData>
                        {endreBrukerStatus}
                        <main id="maincontent" role="main" tabIndex={-1}>
                            <Router basename={basename}>
                                <Routes />
                            </Router>
                        </main>
                    </HentInitialData>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
