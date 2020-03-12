// tslint:disable align no-any
import amplitude from 'amplitude-js';
import { AMPLITUDE_ENDPOINT, AMPLITUDE_API_KEY_TEST, AMPLITUDE_API_KEY_PROD } from '../utils/konstanter';
import { erProduksjon } from '../utils/url-utils';
const apiKey = erProduksjon() ? AMPLITUDE_API_KEY_PROD : AMPLITUDE_API_KEY_TEST;
const config = {
  apiEndpoint: AMPLITUDE_ENDPOINT,
  saveEvents: true,
  includeUtm: true,
  includeReferrer: true,
  trackingOptions: {
     city: false,
     ip_address: false, 
  }
};

amplitude.getInstance().init(apiKey, undefined, config);

export type AmplitudeLogger = (name: string, values?: object) => void;

export function getDeviceId () {
  return amplitude.getInstance().options.deviceId;
}

export function amplitudeLogger (name: string, values?: object) {
  amplitude.logEvent(name, values);
}
