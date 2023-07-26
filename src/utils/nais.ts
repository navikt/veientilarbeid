import { telemetryUrl } from '../innhold/lenker';

const naisTelemetryConfig = {
    telemetryCollectorURL: telemetryUrl,
    app: {
        name: 'aia',
        version: process.env.REACT_APP_BUILD_TIMESTAMP || new Date().toISOString(),
    },
};

export default naisTelemetryConfig;
