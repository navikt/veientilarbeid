import 'core-js';
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

import './index.less';
import { erDemo, erMikrofrontend, erMock } from './utils/app-state-utils';
import NAVSPA from './NAVSPA';
import { redirectTilDittNav } from './komponenter/hent-initial-data/redirect-dittnav-utils';

if (erMock() && !erDemo()) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
    const { worker } = require('./mocks/browser')
    worker.start()
} else if (erDemo()) {
    require('./demo/setup-demo-mock');
}

if (erDemo()) {
    require('./demo/render-demo');
}

const brukerReelleData = !(erMock() || erDemo());

if (!erMikrofrontend()) {
    if (brukerReelleData) {
        redirectTilDittNav();
    } else {
        ReactDOM.render(<App />, document.getElementById('maincontent') as HTMLElement);
    }
}

if (erMikrofrontend()) {
    NAVSPA.eksporter('vta', App);
}
