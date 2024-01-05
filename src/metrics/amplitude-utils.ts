// tslint:disable align no-any
import * as amplitude from '@amplitude/analytics-browser';

import { AMPLITUDE_API_KEY_PROD, AMPLITUDE_API_KEY_TEST, AMPLITUDE_ENDPOINT } from '../utils/konstanter';
import { InnloggingsNiva } from '../contexts/autentisering';
import { erProduksjon } from '../utils/app-state-utils';
import { PermittertSvar } from '../models/endring-av-situasjon';
import * as SprakValg from '../contexts/sprak';
import { DagpengeStatus } from '../lib/beregn-dagpenge-status';
import { AntattInaktiveringsgrunn } from '../contexts/antatt-inaktiveringsgrunn';
import { DinSituasjonSvar, ForeslattInnsatsgruppe } from '../hooks/use-brukerregistrering-data';

const apiKey = erProduksjon() ? AMPLITUDE_API_KEY_PROD : AMPLITUDE_API_KEY_TEST;

const config = {
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    defaultTracking: false,
    trackingOptions: {
        ipAddress: false,
    },
};

export const initAmplitude = async () => {
    await amplitude.init(apiKey, undefined, { ...config, serverUrl: AMPLITUDE_ENDPOINT });
};

export type BrukergruppeType =
    | 'standard og ungdomsinnsats'
    | 'standard'
    | 'situasjonsbestemt'
    | 'sannsynligvis standard og inaktivert'
    | 'sannsynligvis situasjonsbestemt og inaktivert'
    | 'annet'
    | 'ukjent'
    | 'standard og ukjent alder'
    | 'standard og over 59 år';

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
    endretSituasjon: 'INGEN_DATA' | 'N/A' | DinSituasjonSvar | PermittertSvar;
    reservasjonKRR: string;
    aktiveFeatureToggles: string[];
    sprakValgFraCookie?: SprakValg.Sprak | 'IKKE_VALGT';
    harAktivArbeidssokerperiode: 'INGEN_DATA' | 'N/A' | 'Ja' | 'Nei';
    antallDagerSidenSisteArbeidssokerperiode: number | 'INGEN_DATA' | 'N/A' | 'Ikke avsluttet';
    antallUkerSidenSisteArbeidssokerperiode: number | 'INGEN_DATA' | 'N/A' | 'Ikke avsluttet';
    antallUkerMellomSisteArbeidssokerperioder: number | 'INGEN_DATA' | 'N/A' | 'Første periode';
    meldegruppe: string;
    antallMeldekortKlareForLevering: number | 'INGEN_DATA';
    vilFortsattVaereRegistrert: 'INGEN_DATA' | 'Ja' | 'Nei';
    antallDagerSidenSisteMeldeperiode: number | 'INGEN_DATA' | 'N/A';
    dagpengerStatus: 'INGEN_DATA' | DagpengeStatus;
    antallDagerSidenDagpengerStanset: 'INGEN_DATA' | number | 'N/A';
    villeBlittReaktivertAutomatisk: 'INGEN_DATA' | 'Ja' | 'Nei';
    antallDagerSidenSistInnsendtMeldekort: 'INGEN_DATA' | number;
    antattInaktiveringsgrunn: 'INGEN_DATA' | AntattInaktiveringsgrunn;
    levertMeldekortEtterInaktvering: 'INGEN_DATA' | 'Ja' | 'Nei';
    automatiskReaktivert: 'INGEN_DATA' | 'Ja';
    automatiskReaktivertSvar: 'INGEN_DATA' | 'Ikke svart' | 'ja' | 'nei';
    loggetFraSide: 'Min side' | 'Side 2' | 'INGEN_DATA';
};

export function amplitudeLogger(name: string, values?: object) {
    amplitude.logEvent(name, values);
}
