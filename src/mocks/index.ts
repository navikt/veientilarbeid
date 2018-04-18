/*tslint:disable*/
import {mock, respondWith, delayed } from './utils';
import oppfolgingResponse from './oppfolging-mock';
import {TEKSTER_URL, VEILARBOPPFOLGINGPROXY_URL} from '../ducks/api';
const teksterResponse = require('./tekster-mock.json');

const MOCK_OPPFOLGING = true;
const MOCK_TEKSTER = true;

if (MOCK_OPPFOLGING) {
    (mock as any).get(`${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`, respondWith(delayed(1000, oppfolgingResponse)));
}

if (MOCK_TEKSTER) {
    (mock as any).get(TEKSTER_URL, respondWith(delayed(1000, teksterResponse)));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

