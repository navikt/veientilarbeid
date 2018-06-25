/*tslint:disable*/
import {mock, respondWith, delayed } from './utils';
import oppfolgingResponse from './oppfolging-mock';
import {VEILEDERARBEIDSSOKER_URL, VEILARBOPPFOLGINGPROXY_URL, FEATURE_URL} from '../ducks/api';
import featureTogglesMock from './feature-toggles-mock';
const teksterResponse = require('./tekster-mock.json');

const MOCK_OPPFOLGING = true;
const MOCK_TEKSTER = true;
const MOCK_FEATURE_TOGGLES = true;

if (MOCK_OPPFOLGING) {
    (mock as any).get(`${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`, respondWith(delayed(1000, oppfolgingResponse)));
}

if (MOCK_TEKSTER) {
    (mock as any).get(`${VEILEDERARBEIDSSOKER_URL}/tekster`, respondWith(delayed(1000, teksterResponse)));
}

if (MOCK_FEATURE_TOGGLES) {
    (mock as any).get(`${FEATURE_URL}`, respondWith(delayed(1000, featureTogglesMock)));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

