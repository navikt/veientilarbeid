import { combineReducers } from 'redux';
import sykmeldtInfodataReducer, { State as SykmeldtInfoState } from './ducks/sykmeldt-info';
import jobbsokerbesvarelseReducer, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';
import ulesteDialogerReducer, { State as UlesteDialogerState } from './ducks/dialog';
import egenvurderingbesvarelseReducer, { State as EgenvurderingbesvarelseState } from './ducks/egenvurdering';

export interface AppState {
    sykmeldtInfodata: SykmeldtInfoState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
    egenvurderingbesvarelse: EgenvurderingbesvarelseState;
}

export const reducer = combineReducers<AppState>({
    sykmeldtInfodata: sykmeldtInfodataReducer,
    jobbsokerbesvarelse: jobbsokerbesvarelseReducer,
    ulesteDialoger: ulesteDialogerReducer,
    egenvurderingbesvarelse: egenvurderingbesvarelseReducer,
});
