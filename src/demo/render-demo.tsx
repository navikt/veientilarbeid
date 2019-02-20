import * as ReactDOM from 'react-dom';
import DemoDashboard from './demo-dashboard';
import * as React from 'react';
import IntlProvider from '../Intl-provider';

const Demo = () => (
    <IntlProvider>
        <DemoDashboard/>
    </IntlProvider>
);

ReactDOM.render(
    <Demo/>,
    document.getElementById('demo') as HTMLElement
);
