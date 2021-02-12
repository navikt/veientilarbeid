import 'core-js';
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './app';

import './index.less';
import { erDemo, erMikrofrontend, erMock, erProduksjon } from './utils/app-state-utils';
import NAVSPA from './NAVSPA';
import { redirectTilDittNav } from './komponenter/hent-initial-data/redirect-dittnav-utils';

if (erMock() && !erDemo()) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
    const { mock_worker } = require('./mocks/browser');
    mock_worker.start();
} else if (erDemo()) {
    const { demo_worker } = require('./mocks/browser');
    demo_worker.start();
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
    Sentry.init({
        dsn: 'https://c24577bb13734aaeb8968748ec67a24f@sentry.gc.nav.no/59',
        environment: erProduksjon() ? 'production' : 'test',
    });
}
