import { combineReducers } from 'redux';
import jobbsokerbesvarelseReducer, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';

export interface AppState {
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
}

export const reducer = combineReducers<AppState>({
    jobbsokerbesvarelse: jobbsokerbesvarelseReducer,
});
