function getEnvironment() {
    let environment = 'test';
    if (/localhost/.test(window.location)) {
        environment = 'dev';
    } else if (/.nav/.test(window.location)) {
        environment = 'prod';
    }
    return environment;
}

const env = getEnvironment();

export const FORTSETT_DP_SOKNAD_URL =
    env === 'test'
        ? 'https://arbeid.dev.nav.no/arbeid/dagpenger/soknad-innsending/soknad'
        : 'https://tjenester.nav.no/soknaddagpenger-innsending/soknad';
