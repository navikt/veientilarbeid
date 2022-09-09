import { getEnvironment } from '../ducks/urls';

const AKTIVITETSPLAN_URL = {
    local: 'https://aktivitetsplan.dev.nav.no',
    development: 'https://aktivitetsplan.dev.nav.no',
    production: 'https://aktivitetsplan.nav.no',
};

const DIALOG_URL = {
    local: 'https://pto.dev.nav.no/arbeid/dialog',
    development: 'https://pto.dev.nav.no/arbeid/dialog',
    production: 'https://nav.no/arbeid/dialog',
};

const ARBEIDSPLASSEN_URL = {
    local: 'https://arbeidsplassen-t.nav.no',
    development: 'https://arbeidsplassen-t.nav.no',
    production: 'https://arbeidsplassen.nav.no',
};

const SYKEFRAVAER_URL = {
    local: 'https://tjenester-q1.nav.no/sykefravaer',
    development: 'https://tjenester-q1.nav.no/sykefravaer',
    production: 'https://tjenester.nav.no/sykefravaer',
};

const BEHOVSVURDERING_URL = {
    local: 'https://behovsvurdering-q1.dev-sbs.nais.io',
    development: 'https://behovsvurdering-q1.dev-sbs.nais.io',
    production: 'https://behovsvurdering.nav.no/',
};

const START_SAMTALE_URL = {
    local: 'https://pto.dev.nav.no/arbeid/start-samtale',
    development: 'https://pto.dev.nav.no/arbeid/start-samtale',
    production: 'https://nav.no/arbeid/start-samtale',
};

const ARBEIDSSOKERREGISTRERING_URL = {
    local: 'https://arbeid.dev.nav.no/arbeid/registrering',
    development: 'https://arbeid.dev.nav.no/arbeid/registrering',
    production: 'https://www.nav.no/arbeid/registrering',
};

const OM_MELDEKORT_URL = {
    local: 'https://meldekort-frontend-q1.dev.nav.no/meldekort/send-meldekort#',
    development: 'https://meldekort-frontend-q1.dev.nav.no/meldekort/send-meldekort#',
    production: 'https://www.nav.no/meldekort/om-meldekort',
};

export const aktivitetsplanLenke = AKTIVITETSPLAN_URL[getEnvironment()];
export const dialogLenke = DIALOG_URL[getEnvironment()];
export const stillingLenke = `${ARBEIDSPLASSEN_URL[getEnvironment()]}/stillinger`;
export const cvLenke = `${ARBEIDSPLASSEN_URL[getEnvironment()]}/cv`;
export const sykefravaerLenke = SYKEFRAVAER_URL[getEnvironment()];
export const dagpengerLesmerLenke = 'https://www.nav.no/arbeid/no/arbeidsledig/';
export const dagpengerSoknadLenke = 'https://www.nav.no/arbeid/dagpenger/soknad-veileder';
export const dagpengerStartSoknadLenke = 'https://tjenester.nav.no/soknaddagpenger/utslagskriterier/start#/';
export const behovsvurderingLenke = BEHOVSVURDERING_URL[getEnvironment()];
export const motestotteLenke = START_SAMTALE_URL[getEnvironment()];
export const reaktiveringLenke = `${ARBEIDSSOKERREGISTRERING_URL[getEnvironment()]}/start`;
export const registreringsLenke = `${ARBEIDSSOKERREGISTRERING_URL[getEnvironment()]}/start`;
export const sykepengerLenke =
    'https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/Sykepenger+til+arbeidstakere#chapter-7';
export const meldekortLenke = 'https://www.nav.no/meldekort';
export const omMeldekortLenke = OM_MELDEKORT_URL[getEnvironment()];
export const aapSoknadLenke = 'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger';
export const difiLenke = 'https://brukerprofil.difi.no/minprofil/';
