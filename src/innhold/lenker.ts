import { contextpathDittNav, erMikrofrontend } from '../utils/app-state-utils';

export default {
    aktivitetsplan: erMikrofrontend() ? `${contextpathDittNav}/aktivitetsplan` : '/aktivitetsplan',
    dialog: erMikrofrontend() ? `${contextpathDittNav}/aktivitetsplan/dialog` : '/aktivitetsplan/dialog',
    stilling: erMikrofrontend() ? `${contextpathDittNav}/arbeidsplassen/stillinger` : '/arbeidsplassen/stillinger',
    cv: erMikrofrontend() ? `${contextpathDittNav}/arbeidsplassen/cv` : '/arbeidsplassen/cv',
    mia: erMikrofrontend() ? `${contextpathDittNav}/mia` : '/mia',
    veiviserarbeidssoker: erMikrofrontend() ? `${contextpathDittNav}/veiviserarbeidssoker` : '/veiviserarbeidssoker',
    jobbsokerkompetanse: erMikrofrontend() ? `${contextpathDittNav}/jobbsokerkompetanse/resultatside` : '/jobbsokerkompetanse/resultatside',
    tiltakinfo: erMikrofrontend() ? `${contextpathDittNav}/tiltakinfo` : '/tiltakinfo',
    sykefravaer: erMikrofrontend() ? `${contextpathDittNav}/sykefravaer` : '/sykefravaer',
    dagpenger_lesmer: erMikrofrontend() ? `${contextpathDittNav}/veiledearbeidssoker/mistet-jobben/dagpenger?sprak=nb` : '/veiledearbeidssoker/mistet-jobben/dagpenger?sprak=nb',
    dagpenger_soknad: 'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Uten+arbeid/Dagpenger',
    sosialhjelp: erMikrofrontend() ? `${contextpathDittNav}/veivisersosialhjelp` : '/veivisersosialhjelp',
    behovsvurdering: erMikrofrontend() ? `${contextpathDittNav}/behovsvurdering` : '/behovsvurdering',
    reaktivering: erMikrofrontend() ? `${contextpathDittNav}/arbeidssokerregistrering/start` : '/arbeidssokerregistrering/start',
    sykepenger: 'https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/Sykepenger+til+arbeidstakere#chapter-7',
    meldekort: 'https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsloshet+og+permittering/Meldekort+hvordan+gjor+du+det/Slik+sender+du+elektroniske+meldekort',
    aap_soknad: 'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Arbeid%2C+helse+og+sykdom/arbeidsavklaringspenger',
    difi: 'https://brukerprofil.difi.no/minprofil/',
}