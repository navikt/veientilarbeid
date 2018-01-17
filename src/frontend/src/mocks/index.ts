/*tslint:disable*/
import { mock, respondWith, delayed, randomFailure } from './utils';

const MOCK_HENT_KRR_STATUS = true;



if(MOCK_HENT_KRR_STATUS) {
    (mock as any).get('/veilarboppfolgingproxy/api/krr', respondWith(delayed(1000, randomFailure({ reservertIKrr: false}))));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));
