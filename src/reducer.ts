import { combineReducers } from 'redux';
import jobbsokerbesvarelseReducer, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';
import ulesteDialogerReducer, { State as UlesteDialogerState } from './ducks/dialog';
import egenvurderingbesvarelseReducer, { State as EgenvurderingbesvarelseState } from './ducks/egenvurdering';

export interface AppState {
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
    egenvurderingbesvarelse: EgenvurderingbesvarelseState;
}

export const reducer = combineReducers<AppState>({
    jobbsokerbesvarelse: jobbsokerbesvarelseReducer,
    ulesteDialoger: ulesteDialogerReducer,
    egenvurderingbesvarelse: egenvurderingbesvarelseReducer,
});
