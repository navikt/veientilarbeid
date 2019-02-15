import 'babel-polyfill';
import './polyfills/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import DemoDashboard from './demo/demo-dashboard';

import './index.less';
import { erDemo } from './demo/demo-state';

if (process.env.REACT_APP_MOCK && !erDemo()) {
    console.log('=========================='); /*tslint:disable-line:no-console*/
    console.log('======= DEVELOPMENT ======'); /*tslint:disable-line:no-console*/
    console.log('=========================='); /*tslint:disable-line:no-console*/
    require('./mocks');
}

if (erDemo()) {
    require('./demo/setup-demo-mock');

    // TODO require inn fra egen fil
    ReactDOM.render(
        <DemoDashboard/>,
        document.getElementById('demo') as HTMLElement
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);
