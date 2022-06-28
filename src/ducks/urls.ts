const isProduction = window.location.href.includes('www.nav.no');
const isDevelopment = window.location.href.includes('www.dev.nav.no');

const getEnvironment = () => {
    if (isProduction) {
        return 'production';
    }

    if (isDevelopment) {
        return 'development';
    }

    return 'local';
};

const BAKVEIENTILARBEID_URL = {
    local: 'http://localhost:3000/bakveientilarbeid',
    development: 'https://www.dev.nav.no/bakveientilarbeid',
    production: 'https://www.nav.no/bakveientilarbeid',
};

const INNLOGGINGSSTATUS_URL = {
    local: 'http://localhost:3000/auth',
    development: 'https://www.dev.nav.no/person/innloggingsstatus/auth',
    production: 'https://www.nav.no/person/innloggingsstatus/auth',
};

export const bakveienTilArbeidUrl = BAKVEIENTILARBEID_URL[getEnvironment()];
export const innloggingsStatusUrl = INNLOGGINGSSTATUS_URL[getEnvironment()];
