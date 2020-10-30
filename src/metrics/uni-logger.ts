import { amplitudeLogger, getDeviceId } from './amplitude-utils';
import { frontendLogger } from './metrics-utils';

const domene = 'veientilarbeid';
const deviceId = getDeviceId();

const prefix = {
    appname: 'veientilarbeid',
    appversion: '0.1.0',
};

export function uniLogger(name: string, values?: object) {
    const data = values || {};
    amplitudeLogger(`${domene}.${name}`, { ...prefix, ...data });
    frontendLogger(`${domene}.${name}`, { deviceId }, { ...prefix, ...data });
}
