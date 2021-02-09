import { amplitudeLogger } from './amplitude-utils';

const domene = 'veientilarbeid';

const prefix = {
    appname: 'veientilarbeid',
    appversion: '0.1.0',
};

export function uniLogger(name: string, values?: object) {
    const data = values || {};
    amplitudeLogger(`${domene}.${name}`, { ...prefix, ...data });
}
