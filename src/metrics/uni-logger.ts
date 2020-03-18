import { getDeviceId } from './amplitude-utils';
// import { amplitudeLogger, getDeviceId } from './amplitude-utils';
import { frontendLogger } from './metrics-utils';

const deviceId = getDeviceId();

const prefix = {
  appname: 'veientilarbeid',
  appversion: '0.1.0'
};

export function uniLogger(name: string, values?: object) {
  const data = values || {};
  // amplitudeLogger(name, {...prefix, ...data});
  frontendLogger(name, { deviceId }, {...prefix, ...data});
}
