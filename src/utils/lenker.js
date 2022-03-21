function getEnvironment() {
    let environment = 'test';
    if (/localhost/.test(window.location)) {
        environment = 'dev';
    } else if (/dev/.test(window.location)) {
        environment = 'test';
    } else if (window.location.toString().endsWith('nav.no')) {
        environment = 'prod';
    }
    return environment;
}

const env = getEnvironment();

export const FORTSETT_DP_SOKNAD_URL =
    env === 'test'
        ? 'https://arbeid.dev.nav.no/arbeid/dagpenger/soknad-innsending/soknad'
        : 'https://tjenester.nav.no/soknaddagpenger-innsending/soknad';
