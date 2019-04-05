import '@babel/polyfill';
import 'react-app-polyfill/ie11';
import App from './app';

import './index.less';
import { erDemo } from './demo/demo-state';
import NAVSPA from './NAVSPA';

if (process.env.REACT_APP_MOCK && !erDemo()) {
    console.log('=========================='); /*tslint:disable-line:no-console*/
    console.log('======= DEVELOPMENT ======'); /*tslint:disable-line:no-console*/
    console.log('=========================='); /*tslint:disable-line:no-console*/
    require('./mocks');
}

NAVSPA.eksporter('vta', App);

