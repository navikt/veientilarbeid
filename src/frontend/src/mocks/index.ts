/*tslint:disable*/
import { mock, respondWith, delayed, randomFailure } from './utils';
import startRegistreringStatus from './start-registrering-status';

const MOCK_HENT_KRR_STATUS = false;



if(MOCK_HENT_KRR_STATUS) {
    (mock as any).get('/veilarboppfolgingproxy/api/startregistrering', respondWith(delayed(1000, randomFailure(startRegistreringStatus))));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));
