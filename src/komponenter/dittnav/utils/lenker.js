function getEnvironment () {
  let environment = 'test'
  if (typeof window === 'true' && /localhost/.test(window.location)) {
    environment = 'dev'
  } else if (typeof window === 'true' && !/q/.test(window.location)) {
    environment = 'prod'
  }
  return environment
}

const env = getEnvironment()
const NAVNO_URL = env === 'prod' ? 'https://www.nav.no' : env === 'test' ? 'https://www-q.nav.no' : 'http://localhost:3002'
const TJENESTER_URL = env === 'prod' ? 'https://tjenester.nav.no' : env === 'test' ? 'https://tjenester-q.nav.no' : 'http://localhost:3002'
const VEILEDERARBEIDSSOKER_URL = env === 'prod' ? 'https://arbeidssokerregistrering.nav.no/start' : env === 'test' ? 'https://arbeidssokerregistrering-q.nav.no/start' : 'http://localhost:3002'

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
};
