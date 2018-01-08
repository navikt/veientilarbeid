/*tslint:disable*/
import { mock, respondWith, delayed, randomFailure } from './utils';
import startRegistreringStatus from './start-registrering-status';

const MOCK_START_REGISRERING_STATUS = true;



if(MOCK_START_REGISRERING_STATUS) {
    (mock as any).get('/veilarboppfolgingproxy/api/startregistrering', respondWith(delayed(1000, randomFailure(startRegistreringStatus))));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));
