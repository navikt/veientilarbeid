function getEnvironment() {
    let environment = 'development';
    if (process.env.NODE_ENV === 'production') {
        environment = 'production';
    }
    return environment;
}

const SAKSOVERSIKT_URL = {
    development: 'https://arbeid.dev.nav.no/arbeid/dagpenger/mine-dagpenger',
    production: 'https://www.nav.no/arbeid/dagpenger/mine-dagpenger',
};

export const saksoversikt_url = SAKSOVERSIKT_URL[getEnvironment()];
