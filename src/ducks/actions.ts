import { FeatureToggleState } from './feature-toggles';
import { Data as OppfolgingData } from './oppfolging';
import {Data as ServicegruppeData } from './servicegruppe';
import {Data as JobbsokerbesvarelseData } from './jobbsokerbesvarelse';
import {Data as SykmeldtInfoData } from './sykmeldt-info';

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
    SETT_JOBBSOKERBESVARELSE_OK = 'SETT_JOBBSOKERBESVARELSE_OK',
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
    data: ServicegruppeData;
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

export interface SettJobbsokerbesvarelseOKAction {
    type: ActionType.SETT_JOBBSOKERBESVARELSE_OK;
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
    | SettJobbsokerbesvarelseOKAction
    | HentSykmeldtInfoOKAction
    | HentSykmeldtInfoPENDINGAction
    | HentSykmeldtInfoFEILETAction;