/*tslint:disable*/
import {mock, respondWith, delayed } from './utils';
import oppfolgingResponse from './oppfolging-mock';
import {
    FEATURE_URL, JOBBSOKERBESVARELSE_URL, SERVICEGRUPPE_URL, SYKEFORLOEP_METADATA_URL,
    VEILARBOPPFOLGINGPROXY_URL
} from '../ducks/api';
import featureTogglesMock from './feature-toggles-mock';
import servicegruppeResponse from './servicegruppe-mock';
import sykeforloepMetadataResponse from './sykeforloep-metadata-mock';
import jobbsokerbesvarelseResponse from './jobbsokerbesvarelse-mock';

const MOCK_OPPFOLGING = true;
const MOCK_FEATURE_TOGGLES = true;
const MOCK_SERVICEGRUPPE = true;
const MOCK_SYKEFORLOEPMETADATAGRUPPE = true;
const MOCK_JOBBSOKERBESVARELSE = true;

const DELAY = 0;

if (MOCK_OPPFOLGING) {
    (mock as any).get(`${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`, respondWith(delayed(DELAY, oppfolgingResponse)));
}

if (MOCK_FEATURE_TOGGLES) {
    (mock as any).get(`express:${FEATURE_URL}(.*)`, respondWith(delayed(DELAY, featureTogglesMock)));
}

if (MOCK_SERVICEGRUPPE) {
    (mock as any).get(`${SERVICEGRUPPE_URL}`, respondWith(delayed(DELAY, servicegruppeResponse)));
}

if (MOCK_SYKEFORLOEPMETADATAGRUPPE) {
    (mock as any).get(`${SYKEFORLOEP_METADATA_URL}`, respondWith(delayed(DELAY, sykeforloepMetadataResponse)))
}

if (MOCK_JOBBSOKERBESVARELSE) {
    (mock as any).get(`${JOBBSOKERBESVARELSE_URL}`, respondWith(delayed(1000, jobbsokerbesvarelseResponse)));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

