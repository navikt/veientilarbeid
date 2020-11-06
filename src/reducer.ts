import { combineReducers } from 'redux';
import jobbsokerbesvarelseReducer, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';
import ulesteDialogerReducer, { State as UlesteDialogerState } from './ducks/dialog';

export interface AppState {
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
}

export const reducer = combineReducers<AppState>({
    jobbsokerbesvarelse: jobbsokerbesvarelseReducer,
    ulesteDialoger: ulesteDialogerReducer,
});
