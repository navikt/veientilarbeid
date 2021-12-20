function getEnvironment() {
    let environment = 'development';
    if (process.env.NODE_ENV === 'production') {
        environment = 'production';
    }
    return environment;
}

const MINE_DAGPENGER_URL = {
    development: 'https://arbeid.dev.nav.no/arbeid/dagpenger/mine-dagpenger',
    production: 'https://www.nav.no/arbeid/dagpenger/mine-dagpenger',
};

export const mine_dagpenger_url = MINE_DAGPENGER_URL[getEnvironment()];
