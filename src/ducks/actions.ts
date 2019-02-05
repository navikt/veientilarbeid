import { FeatureToggleState } from './feature-toggles';
import { Data as OppfolgingData } from './oppfolging';
import {State as ServicegruppeState } from './servicegruppe';
import {Data as JobbsokerbesvarelseData } from './jobbsokerbesvarelse';
import {State as SykmeldtInfoState } from './sykmeldt-info';

export enum ActionType {
    FEATURE_TOGGLES_PENDING = 'FEATURE_TOGGLES_PENDING',
    FEATURE_TOGGLES_OK = 'FEATURE_TOGGLES_OK',
    FEATURE_TOGGLES_FEILET = 'FEATURE_TOGGLES_FEILET',
    HENT_OPPFOLGING_OK = 'HENT_OPPFOLGING_OK',
    HENT_OPPFOLGING_PENDING = 'HENT_OPPFOLGING_PENDING',
    HENT_OPPFOLGING_FEILET = 'HENT_OPPFOLGING_FEILET',
    HENT_SERVICEGRUPPE_OK = 'HENT_SERVICEGRUPPE_OK',
    HENT_SERVICEGRUPPE_PENDING = 'HENT_SERVICEGRUPPE_PENDING',
    HENT_SERVICEGRUPPE_FEILET = 'HENT_SERVICEGRUPPE_FEILET',
    HENT_JOBBSOKERBESVARELSE_OK = 'HENT_JOBBSOKERBESVARELSE_OK',
    HENT_JOBBSOKERBESVARELSE_PENDING = 'HENT_JOBBSOKERBESVARELSE_PENDING',
    HENT_JOBBSOKERBESVARELSE_FEILET = 'HENT_JOBBSOKERBESVARELSE_FEILET',
    HENT_SYKMELDT_INFO_OK = 'HENT_SYKMELDT_INFO_OK',
    HENT_SYKMELDT_INFO_PENDING = 'HENT_SYKMELDT_INFO_PENDING',
    HENT_SYKMELDT_INFO_FEILET = 'HENT_SYKMELDT_INFO_FEILET',
}

export interface FeatureTogglesOKAction {
    type: ActionType.FEATURE_TOGGLES_OK;
    unleash: FeatureToggleState;
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

export interface HentServicegruppeOKAction {
    type: ActionType.HENT_SERVICEGRUPPE_OK;
    data: ServicegruppeState;
}

export interface HentServicegruppePENDINGAction {
    type: ActionType.HENT_SERVICEGRUPPE_PENDING;
}

export interface HentServicegruppeFEILETAction {
    type: ActionType.HENT_SERVICEGRUPPE_FEILET;
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
    data: SykmeldtInfoState;
}

export interface HentSykmeldtInfoPENDINGAction {
    type: ActionType.HENT_SYKMELDT_INFO_PENDING;
}

export interface HentSykmeldtInfoFEILETAction {
    type: ActionType.HENT_SYKMELDT_INFO_FEILET;
}

export type Handling = FeatureTogglesOKAction
    | FeatureTogglesPENDINGAction
    | FeatureTogglesFEILETAction
    | HentOppfolgingOKAction
    | HentOppfolgingPENDINGAction
    | HentOppfolgingFEILETAction
    | HentServicegruppeOKAction
    | HentServicegruppePENDINGAction
    | HentServicegruppeFEILETAction
    | HentJobbsokerbesvarelseOKAction
    | HentJobbsokerbesvarelsePENDINGAction
    | HentJobbsokerbesvarelseFEILETAction
    | HentSykmeldtInfoOKAction
    | HentSykmeldtInfoPENDINGAction
    | HentSykmeldtInfoFEILETAction;