/*tslint:disable*/
import {mock, respondWith, delayed } from './utils';
import oppfolgingResponse from './oppfolging-mock';
import { FEATURE_URL, SERVICEGRUPPE_URL, VEILARBOPPFOLGINGPROXY_URL } from '../ducks/api';
import featureTogglesMock from './feature-toggles-mock';
import servicegruppeResponse from './servicegruppe-mock';

const MOCK_OPPFOLGING = true;
const MOCK_FEATURE_TOGGLES = true;
const MOCK_SERVICEGRUPPE = true;

if (MOCK_OPPFOLGING) {
    (mock as any).get(`${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`, respondWith(delayed(1000, oppfolgingResponse)));
}

if (MOCK_FEATURE_TOGGLES) {
    (mock as any).get(`express:${FEATURE_URL}(.*)`, respondWith(delayed(1000, featureTogglesMock)));
}

if (MOCK_SERVICEGRUPPE) {
    (mock as any).get(`${SERVICEGRUPPE_URL}`, respondWith(delayed(1000, servicegruppeResponse)));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

