// tslint:disable align no-any
import amplitude from 'amplitude-js';
import { AMPLITUDE_ENDPOINT, AMPLITUDE_API_KEY_TEST, AMPLITUDE_API_KEY_PROD } from '../utils/konstanter';
import { InnloggingsNiva } from '../ducks/autentisering';
import { erProduksjon } from '../utils/url-utils';
import { POAGruppe } from '../utils/get-poa-group';

const apiKey = erProduksjon() ? AMPLITUDE_API_KEY_PROD : AMPLITUDE_API_KEY_TEST;
const config = {
    apiEndpoint: AMPLITUDE_ENDPOINT,
    saveEvents: true,
    includeUtm: true,
    includeReferrer: true,
    trackingOptions: {
        city: false,
        ip_address: false,
    },
};

amplitude.getInstance().init(apiKey, undefined, config);

export type AmplitudeLogger = (name: string, values?: object) => void;

export type AmplitudeAktivitetsData = {
    gruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
    isKSSK: string;
    ukerRegistrert: number;
    nivaa: InnloggingsNiva;
};

export function getDeviceId() {
    return amplitude.getInstance().options.deviceId;
}

export function amplitudeLogger(name: string, values?: object) {
    amplitude.getInstance().logEvent(name, values);
}

export function setIdentifyProperty(name: string, value: string) {
    const identify = new amplitude.Identify().set(name, value);
    amplitude.getInstance().identify(identify);
}
