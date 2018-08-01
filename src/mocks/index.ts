/*tslint:disable*/
import {mock, respondWith, delayed } from './utils';
import oppfolgingResponse from './oppfolging-mock';
import {VEILARBOPPFOLGINGPROXY_URL, FEATURE_URL} from '../ducks/api';
import featureTogglesMock from './feature-toggles-mock';

const MOCK_OPPFOLGING = true;
const MOCK_FEATURE_TOGGLES = true;

if (MOCK_OPPFOLGING) {
    (mock as any).get(`${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`, respondWith(delayed(1000, oppfolgingResponse)));
}

if (MOCK_FEATURE_TOGGLES) {
    (mock as any).get(`express:${FEATURE_URL}(.*)`, respondWith(delayed(1000, featureTogglesMock)));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

