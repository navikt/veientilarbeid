import { telemetryUrl } from '../innhold/lenker';
import { getEnvironment } from '../ducks/urls';

const naisTelemetryConfig = {
    telemetryCollectorURL: telemetryUrl,
    app: {
        name: 'aia',
        version: getEnvironment(),
    },
};

export default naisTelemetryConfig;
