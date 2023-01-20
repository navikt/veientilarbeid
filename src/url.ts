import { erProduksjon } from './utils/app-state-utils';

function getEnvironment() {
    if (erProduksjon()) {
        return 'production';
    }

    return 'development';
}

const MINE_DAGPENGER_URL = {
    development: 'https://arbeid.dev.nav.no/arbeid/dagpenger/mine-dagpenger',
    production: 'https://www.nav.no/arbeid/dagpenger/mine-dagpenger',
};

export const mine_dagpenger_url = MINE_DAGPENGER_URL[getEnvironment()];
