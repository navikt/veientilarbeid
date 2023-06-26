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
    development: 'https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth',
    production: 'https://www.nav.no/person/nav-dekoratoren-api/auth',
};
const MINE_DAGPENGER_URL = {
    local: 'https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger',
    development: 'https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger',
    production: 'https://www.nav.no/arbeid/dagpenger/mine-dagpenger',
};

const DOKUMENTASJON_URL = {
    local: 'https://arbeid.intern.dev.nav.no/dagpenger/dialog/generell-innsending',
    development: 'https://arbeid.intern.dev.nav.no/dagpenger/dialog/generell-innsending',
    production: 'https://www.nav.no/dagpenger/dialog/generell-innsending',
};

export const mine_dagpenger_url = MINE_DAGPENGER_URL[getEnvironment()];
export const dokumentasjon_url = DOKUMENTASJON_URL[getEnvironment()];
export const konkurs_url =
    'https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/lonnsgarantiordningen';
export const innloggingsStatusUrl = INNLOGGINGSSTATUS_URL[getEnvironment()];
export const aiaBackendUrl = AIA_BACKEND_URL[getEnvironment()];
