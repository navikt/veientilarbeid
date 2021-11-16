// tslint:disable align no-any
import amplitude from 'amplitude-js';
import { AMPLITUDE_API_KEY_PROD, AMPLITUDE_API_KEY_TEST, AMPLITUDE_ENDPOINT } from '../utils/konstanter';
import { InnloggingsNiva } from '../contexts/autentisering';
import { erProduksjon } from '../utils/app-state-utils';
import { POAGruppe } from '../utils/get-poa-group';
import { EksperimentId } from '../eksperiment/eksperimenter';
import { DinSituasjonSvar, ForeslattInnsatsgruppe } from '../contexts/brukerregistrering';

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

export type BrukergruppeType = 'standard' | 'situasjonsbestemt' | 'annet' | 'ukjent';

export type AmplitudeData = {
    gruppe: POAGruppe;
    brukergruppe: BrukergruppeType;
    geografiskTilknytning: string;
    isKSSX: string;
    isKSSK: string;
    erSamarbeidskontor: string;
    ukerRegistrert: number | 'INGEN_DATO';
    dagerRegistrert: number | 'INGEN_DATO';
    nivaa: InnloggingsNiva;
    kanReaktiveres: string;
    formidlingsgruppe: string;
    servicegruppe: string;
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe | 'INGEN_VERDI';
    rettighetsgruppe: string;
    meldegruppe: string;
    registreringType: string;
    underOppfolging: string;
    antallDagerEtterFastsattMeldingsdag: string;
    antallMeldekortKlareForLevering: number;
    gitVersion: string;
    buildTimestamp: string;
    antallSynligeInfomeldinger: number;
    erSykmeldtMedArbeidsgiver: string;
    dinSituasjon: DinSituasjonSvar;
    reservasjonKRR: string;
    eksperimenter: EksperimentId[];
    aktiveFeatureToggles: string[];
    dagpengerVedleggEttersendes: number | 'INGEN_DATA';
    dagpengerSoknadMellomlagret: number | 'INGEN_DATA';
    dagpengerSoknadVenterPaSvar: 'ja' | 'nei' | 'INGEN_DATA';
    dagpengerDagerMellomPaabegyntSoknadOgRegistrering: number | 'INGEN_DATA';
    dagpengerDagerMellomInnsendtSoknadOgRegistrering: number | 'INGEN_DATA';
    dagpengerStatusBeregning: string;
};

export function amplitudeLogger(name: string, values?: object) {
    amplitude.getInstance().logEvent(name, values);
}

export function setIdentifyProperty(name: string, value: string) {
    const identify = new amplitude.Identify().set(name, value);
    amplitude.getInstance().identify(identify);
}
