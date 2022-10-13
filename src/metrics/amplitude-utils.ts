// tslint:disable align no-any
import amplitude from 'amplitude-js';
import { AMPLITUDE_API_KEY_PROD, AMPLITUDE_API_KEY_TEST, AMPLITUDE_ENDPOINT } from '../utils/konstanter';
import { InnloggingsNiva } from '../contexts/autentisering';
import { erProduksjon } from '../utils/app-state-utils';
import { DinSituasjonSvar, ForeslattInnsatsgruppe } from '../contexts/brukerregistrering';
import * as SprakValg from '../contexts/sprak';

const apiKey = erProduksjon() ? AMPLITUDE_API_KEY_PROD : AMPLITUDE_API_KEY_TEST;
const config = {
    apiEndpoint: AMPLITUDE_ENDPOINT,
    saveEvents: true,
    includeUtm: true,
    includeReferrer: true,
    trackingOptions: {
        city: false,
        ip_address: false,
    },
};

amplitude.getInstance().init(apiKey, undefined, config);

export type AmplitudeLogger = (name: string, values?: object) => void;

export type BrukergruppeType =
    | 'standard og ungdomsinnsats'
    | 'standard'
    | 'situasjonsbestemt'
    | 'sannsynligvis standard og inaktivert'
    | 'annet'
    | 'ukjent';

export type AmplitudeData = {
    brukergruppe: BrukergruppeType;
    geografiskTilknytning: string;
    ukerRegistrert: number | 'INGEN_DATO';
    dagerRegistrert: number | 'INGEN_DATO';
    nivaa: InnloggingsNiva;
    kanReaktiveres: string;
    formidlingsgruppe: string;
    servicegruppe: string;
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe | 'INGEN_VERDI';
    rettighetsgruppe: string;
    registreringType: string;
    underOppfolging: string;
    gitVersion: string;
    buildTimestamp: string;
    erSykmeldtMedArbeidsgiver: string;
    dinSituasjon: DinSituasjonSvar;
    reservasjonKRR: string;
    aktiveFeatureToggles: string[];
    sprakValgFraCookie?: SprakValg.Sprak | 'IKKE_VALGT';
    harAktivArbeidssokerperiode: 'INGEN_DATA' | 'N/A' | 'Ja' | 'Nei';
    antallDagerSidenSisteArbeidssokerperiode: number | 'INGEN_DATA' | 'N/A' | 'Ikke avsluttet';
    antallUkerSidenSisteArbeidssokerperiode: number | 'INGEN_DATA' | 'N/A' | 'Ikke avsluttet';
    antallUkerMellomSisteArbeidssokerperioder: number | 'INGEN_DATA' | 'N/A' | 'Første periode';
    meldegruppe: string;
    antallMeldekortKlareForLevering: number;
};

export function amplitudeLogger(name: string, values?: object) {
    amplitude.getInstance().logEvent(name, values);
}

export function setIdentifyProperty(name: string, value: string) {
    const identify = new amplitude.Identify().set(name, value);
    amplitude.getInstance().identify(identify);
}
