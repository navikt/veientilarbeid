function getEnvironment() {
    let environment = 'test';
    if (typeof window !== undefined && /localhost/.test(window.location)) {
        environment = 'dev';
    } else if (typeof window !== undefined && /q1/.test(window.location)) {
        environment = 'q1';
    } else if (typeof window !== undefined && !/q/.test(window.location)) {
        environment = 'prod';
    }
    return environment;
}

const env = getEnvironment();
const NAVNO_URL =
    env === 'prod' ? 'https://www.nav.no' : /q/.test(env) ? `https://www-${env}.nav.no` : 'http://localhost:3002';
const TJENESTER_URL =
    env === 'prod'
        ? 'https://tjenester.nav.no'
        : /q/.test(env)
        ? `https://tjenester-${env}.nav.no`
        : 'http://localhost:3002';
const VEILEDERARBEIDSSOKER_URL =
    env === 'prod'
        ? 'https://veiledearbeidssoker.nav.no'
        : /q/.test(env)
        ? 'https://veiledearbeidssoker-q.nav.no'
        : 'http://localhost:3002';

export const lenker = {
    skjemaer: {
        tittel: 'Skjemaer',
        url: `${NAVNO_URL}/soknader`,
    },
    dinPensjon: {
        tittel: 'Din pensjon',
        url: `${TJENESTER_URL}/pselv/publisering/dinpensjon.jsf`,
    },
    veilederArbeidssoker: {
        tittel: 'Veileder for arbeidssøker',
        url: `${VEILEDERARBEIDSSOKER_URL}`,
    },
    dittSykefravaer: {
        tittel: 'Ditt sykefravær',
        url: `${TJENESTER_URL}/sykefravaer`,
    },
    saksoversikt: {
        tittel: 'Din saksoversikt',
        url: `${TJENESTER_URL}/saksoversikt`,
    },
};
