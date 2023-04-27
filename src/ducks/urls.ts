const isProduction = window.location.href.includes('www.nav.no');
const isDevelopment = window.location.href.includes('.dev.nav.no');

export const getEnvironment = () => {
    if (isProduction) {
        return 'production';
    }

    if (isDevelopment) {
        return 'development';
    }

    return 'local';
};

const AIA_BACKEND_URL = {
    local: 'http://localhost:3000/aia-backend',
    development: 'https://www.intern.dev.nav.no/tms-min-side-proxy/aia/aia-backend',
    production: 'https://www.nav.no/tms-min-side-proxy/aia/aia-backend',
};

const INNLOGGINGSSTATUS_URL = {
    local: 'http://localhost:3000/auth',
    development: 'https://www.dev.nav.no/person/innloggingsstatus/auth',
    production: 'https://www.nav.no/person/innloggingsstatus/auth',
};

export const innloggingsStatusUrl = INNLOGGINGSSTATUS_URL[getEnvironment()];
export const aiaBackendUrl = AIA_BACKEND_URL[getEnvironment()];
