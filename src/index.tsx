import '@babel/polyfill';
import 'react-app-polyfill/ie11';
import App from './app';

import './index.less';
import NAVSPA from './NAVSPA';

console.log('=========================='); /*tslint:disable-line:no-console*/
console.log('======= DEVELOPMENT ======'); /*tslint:disable-line:no-console*/
console.log('=========================='); /*tslint:disable-line:no-console*/
require('./mocks');

NAVSPA.eksporter('vta', App);
