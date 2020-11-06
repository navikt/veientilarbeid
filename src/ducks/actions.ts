import { Data as JobbsokerbesvarelseData } from './jobbsokerbesvarelse';
import { Data as UlesteDialogerData } from './dialog';

export enum ActionType {
    HENT_JOBBSOKERBESVARELSE_OK = 'HENT_JOBBSOKERBESVARELSE_OK',
    HENT_JOBBSOKERBESVARELSE_PENDING = 'HENT_JOBBSOKERBESVARELSE_PENDING',
    HENT_JOBBSOKERBESVARELSE_FEILET = 'HENT_JOBBSOKERBESVARELSE_FEILET',
    HENT_ULESTE_DIALOGER_OK = 'HENT_ULESTE_DIALOGER_OK',
    HENT_ULESTE_DIALOGER_PENDING = 'HENT_ULESTE_DIALOGER_PENDING',
    HENT_ULESTE_DIALOGER_FEILET = 'HENT_ULESTE_DIALOGER_FEILET',
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

export type Handling =
    | HentJobbsokerbesvarelseOKAction
    | HentJobbsokerbesvarelsePENDINGAction
    | HentJobbsokerbesvarelseFEILETAction
    | HentUlesteDialogerOKAction
    | HentUlesteDialogerPENDINGAction
    | HentUlesteDialogerFEILETAction;
