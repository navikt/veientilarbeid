import { erProduksjon } from './utils/app-state-utils';

function getEnvironment() {
    if (erProduksjon()) {
        return 'production';
    }

    return 'development';
}

const MINE_DAGPENGER_URL = {
    development: 'https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger',
    production: 'https://www.nav.no/arbeid/dagpenger/mine-dagpenger',
};

const DOKUMENTASJON_URL = {
    development: 'https://arbeid.intern.dev.nav.no/dagpenger/dialog/generell-innsending',
    production: 'https://www.nav.no/dagpenger/dialog/generell-innsending',
};

export const mine_dagpenger_url = MINE_DAGPENGER_URL[getEnvironment()];
export const dokumentasjon_url = DOKUMENTASJON_URL[getEnvironment()];
