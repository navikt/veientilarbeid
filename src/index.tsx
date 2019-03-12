import '@babel/polyfill';
import 'react-app-polyfill/ie11';
import './polyfills/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

import './index.less';
import { erDemo } from './demo/demo-state';

if (process.env.REACT_APP_MOCK && !erDemo()) {
    console.log('=========================='); /*tslint:disable-line:no-console*/
    console.log('======= DEVELOPMENT ======'); /*tslint:disable-line:no-console*/
    console.log('=========================='); /*tslint:disable-line:no-console*/
    require('./mocks');
} else if (erDemo()) {
    require('./demo/setup-demo-mock');
}

if (erDemo()) {
    require('./demo/render-demo');
}

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);
