import '@babel/polyfill';
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

import './index.less';
import { erDemo, erMikrofrontend, erMock } from './utils/app-state-utils';
import NAVSPA from './NAVSPA';

if ((erMock() && !erDemo())) {
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

if (!erMikrofrontend()) {
    ReactDOM.render(
        <App/>,
        document.getElementById('maincontent') as HTMLElement
    );
}

if (erMikrofrontend()) {
    NAVSPA.eksporter('vta', App);
}
