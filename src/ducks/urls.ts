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

export const bakveienTilArbeidUrl = BAKVEIENTILARBEID_URL[getEnvironment()];
