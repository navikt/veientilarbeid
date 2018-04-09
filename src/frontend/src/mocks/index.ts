/*tslint:disable*/
import {mock, respondWith, delayed } from './utils';
import oppfolgingResponse from './oppfolging-mock';
import innloggingsInfo from './innloggings-info';
import { VEILARBOPPFOLGINGPROXY_URL } from '../ducks/api';

const MOCK_OPPFOLGING = true;
const MOCK_INNLOGGINGS_INFO = true;

if (MOCK_OPPFOLGING) {
    (mock as any).get(`${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`, respondWith(delayed(1000, oppfolgingResponse)));
}

if (MOCK_INNLOGGINGS_INFO) {
    (mock as any).get('glob:/innloggingslinje/auth*', respondWith(delayed(1000, innloggingsInfo)));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

