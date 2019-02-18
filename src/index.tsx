import 'babel-polyfill';
import './polyfills/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import DemoDashboard from './demo/demo-dashboard';

import './index.less';
import { erDemo } from './demo/demo-state';
import { sjekkStatuskode, toJson } from './ducks/api-utils';
import { demoToggleKey } from './ducks/feature-toggles';
import { FEATURE_URL, featureQueryParams, requestConfig } from './ducks/api';

if (process.env.REACT_APP_MOCK && !erDemo()) {
    console.log('=========================='); /*tslint:disable-line:no-console*/
    console.log('======= DEVELOPMENT ======'); /*tslint:disable-line:no-console*/
    console.log('=========================='); /*tslint:disable-line:no-console*/
    require('./mocks');
} else if (erDemo()) {
    require('./demo/setup-demo-mock');
}

async function featureToggleIsActive() {
    const unleashUrl = FEATURE_URL + featureQueryParams([demoToggleKey]);
    interface DemoFeatureToggle {
        [demoToggleKey]: boolean;
    }

    const respons = await fetch(unleashUrl, requestConfig);
    const gyldigRespons = sjekkStatuskode(respons);
    const json: DemoFeatureToggle = await toJson(gyldigRespons);

    if (json[demoToggleKey] === true) {
        if (erDemo()) {

            // TODO require inn fra egen fil
            ReactDOM.render(
                <DemoDashboard/>,
                document.getElementById('demo') as HTMLElement
            );
        }

    }
}

featureToggleIsActive();

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);
