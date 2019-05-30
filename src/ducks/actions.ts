import { Data as OppfolgingData } from './oppfolging';
import { FetchData as InnsatsgruppeData } from './innsatsgruppe';
import { Data as JobbsokerbesvarelseData } from './jobbsokerbesvarelse';
import { Data as SykmeldtInfoData } from './sykmeldt-info';
import { Data as BrukerRegistreringData } from './brukerregistrering';
import { Data as UlesteDialogerData } from './dialog';
import { FeatureToggles } from './feature-toggles';
import { Data as EgenvurderingbesvarelseData } from './egenvurdering';

export enum ActionType {
    FEATURE_TOGGLES_PENDING = 'FEATURE_TOGGLES_PENDING',
    FEATURE_TOGGLES_OK = 'FEATURE_TOGGLES_OK',
    FEATURE_TOGGLES_FEILET = 'FEATURE_TOGGLES_FEILET',
    HENT_OPPFOLGING_OK = 'HENT_OPPFOLGING_OK',
    HENT_OPPFOLGING_PENDING = 'HENT_OPPFOLGING_PENDING',
    HENT_OPPFOLGING_FEILET = 'HENT_OPPFOLGING_FEILET',
    HENT_INNSATSGRUPPE_OK = 'HENT_INNSATSGRUPPE_OK',
    HENT_INNSATSGRUPPE_PENDING = 'HENT_INNSATSGRUPPE_PENDING',
    HENT_INNSATSGRUPPE_FEILET = 'HENT_INNSATSGRUPPE_FEILET',
    HENT_JOBBSOKERBESVARELSE_OK = 'HENT_JOBBSOKERBESVARELSE_OK',
    HENT_JOBBSOKERBESVARELSE_PENDING = 'HENT_JOBBSOKERBESVARELSE_PENDING',
    HENT_JOBBSOKERBESVARELSE_FEILET = 'HENT_JOBBSOKERBESVARELSE_FEILET',
    HENT_SYKMELDT_INFO_OK = 'HENT_SYKMELDT_INFO_OK',
    HENT_SYKMELDT_INFO_PENDING = 'HENT_SYKMELDT_INFO_PENDING',
    HENT_SYKMELDT_INFO_FEILET = 'HENT_SYKMELDT_INFO_FEILET',
    HENT_ULESTE_DIALOGER_OK = 'HENT_ULESTE_DIALOGER_OK',
    HENT_ULESTE_DIALOGER_PENDING = 'HENT_ULESTE_DIALOGER_PENDING',
    HENT_ULESTE_DIALOGER_FEILET = 'HENT_ULESTE_DIALOGER_FEILET',
    HENT_BRUKER_REGISTRERING_OK = 'HENT_BRUKER_REGISTRERING_OK',
    HENT_BRUKER_REGISTRERING_PENDING = 'HENT_BRUKER_REGISTRERING_PENDING',
    HENT_BRUKER_REGISTRERING_FEILET = 'HENT_BRUKER_REGISTRERING_FEILET',
    HENT_EGENVURDERINGBESVARELSE_OK = 'HENT_EGENVURDERINGBESVARELSE_OK',
    HENT_EGENVURDERINGBESVARELSE_PENDING = 'HENT_EGENVURDERINGBESVARELSE_PENDING',
    HENT_EGENVURDERINGBESVARELSE_FEILET = 'HENT_EGENVURDERINGBESVARELSE_FEILET',
}

export interface FeatureTogglesOKAction {
    type: ActionType.FEATURE_TOGGLES_OK;
    unleash: FeatureToggles;
}

export interface FeatureTogglesPENDINGAction {
    type: ActionType.FEATURE_TOGGLES_PENDING;
}

export interface FeatureTogglesFEILETAction {
    type: ActionType.FEATURE_TOGGLES_FEILET;
}

export interface HentOppfolgingOKAction {
    type: ActionType.HENT_OPPFOLGING_OK;
    data: OppfolgingData;
}

export interface HentOppfolgingPENDINGAction {
    type: ActionType.HENT_OPPFOLGING_PENDING;
}

export interface HentOppfolgingFEILETAction {
    type: ActionType.HENT_OPPFOLGING_FEILET;
}

export interface HentInnsatsgruppeOKAction {
    type: ActionType.HENT_INNSATSGRUPPE_OK;
    data: InnsatsgruppeData;
}

export interface HentInnsatsgruppePENDINGAction {
    type: ActionType.HENT_INNSATSGRUPPE_PENDING;
}

export interface HentInnsatsgruppeFEILETAction {
    type: ActionType.HENT_INNSATSGRUPPE_FEILET;
}

export interface HentJobbsokerbesvarelseOKAction {
    type: ActionType.HENT_JOBBSOKERBESVARELSE_OK;
    data: JobbsokerbesvarelseData;
}

export interface HentJobbsokerbesvarelsePENDINGAction {
    type: ActionType.HENT_JOBBSOKERBESVARELSE_PENDING;
}

export interface HentJobbsokerbesvarelseFEILETAction {
    type: ActionType.HENT_JOBBSOKERBESVARELSE_FEILET;
}

export interface HentSykmeldtInfoOKAction {
    type: ActionType.HENT_SYKMELDT_INFO_OK;
    data: SykmeldtInfoData;
}

export interface HentSykmeldtInfoPENDINGAction {
    type: ActionType.HENT_SYKMELDT_INFO_PENDING;
}

export interface HentSykmeldtInfoFEILETAction {
    type: ActionType.HENT_SYKMELDT_INFO_FEILET;
}

export interface HentBrukerRegistreringOKAction {
    type: ActionType.HENT_BRUKER_REGISTRERING_OK;
    data: BrukerRegistreringData;
}

export interface HentBrukerRegistreringPENDINGAction {
    type: ActionType.HENT_BRUKER_REGISTRERING_PENDING;
}

export interface HentBrukerRegistreringFEILETAction {
    type: ActionType.HENT_BRUKER_REGISTRERING_FEILET;
}

export interface HentUlesteDialogerOKAction {
    type: ActionType.HENT_ULESTE_DIALOGER_OK;
    data: UlesteDialogerData;
}

export interface HentUlesteDialogerPENDINGAction {
    type: ActionType.HENT_ULESTE_DIALOGER_PENDING;
}

export interface HentUlesteDialogerFEILETAction {
    type: ActionType.HENT_ULESTE_DIALOGER_FEILET;
}

export interface HentEgenvurderingbesvarelseOKAction {
    type: ActionType.HENT_EGENVURDERINGBESVARELSE_OK;
    data: EgenvurderingbesvarelseData;
}

export interface HentEgenvurderingbesvarelsePENDINGAction {
    type: ActionType.HENT_EGENVURDERINGBESVARELSE_PENDING;
}

export interface HentEgenvurderingbesvarelseFEILETAction {
    type: ActionType.HENT_EGENVURDERINGBESVARELSE_FEILET;
}

export type Handling = FeatureTogglesOKAction
    | FeatureTogglesPENDINGAction
    | FeatureTogglesFEILETAction
    | HentOppfolgingOKAction
    | HentOppfolgingPENDINGAction
    | HentOppfolgingFEILETAction
    | HentInnsatsgruppeOKAction
    | HentInnsatsgruppePENDINGAction
    | HentInnsatsgruppeFEILETAction
    | HentJobbsokerbesvarelseOKAction
    | HentJobbsokerbesvarelsePENDINGAction
    | HentJobbsokerbesvarelseFEILETAction
    | HentSykmeldtInfoOKAction
    | HentSykmeldtInfoPENDINGAction
    | HentSykmeldtInfoFEILETAction
    | HentUlesteDialogerOKAction
    | HentUlesteDialogerPENDINGAction
    | HentUlesteDialogerFEILETAction
    | HentBrukerRegistreringOKAction
    | HentBrukerRegistreringPENDINGAction
    | HentBrukerRegistreringFEILETAction
    | HentEgenvurderingbesvarelseOKAction
    | HentEgenvurderingbesvarelsePENDINGAction
    | HentEgenvurderingbesvarelseFEILETAction;
