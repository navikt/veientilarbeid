import { combineReducers } from 'redux';
import oppfolgingReducer, { State as OppfolgingState } from './ducks/oppfolging';
import sykmeldtInfodataReducer, { State as SykmeldtInfoState } from './ducks/sykmeldt-info';
import brukerRegistreringReducer, { State as BrukerRegistreringState } from './ducks/brukerregistrering';
import jobbsokerbesvarelseReducer, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';
import ulesteDialogerReducer, { State as UlesteDialogerState } from './ducks/dialog';
import egenvurderingbesvarelseReducer, { State as EgenvurderingbesvarelseState } from './ducks/egenvurdering';

export interface AppState {
    oppfolging: OppfolgingState;
    sykmeldtInfodata: SykmeldtInfoState;
    brukerRegistrering: BrukerRegistreringState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
    egenvurderingbesvarelse: EgenvurderingbesvarelseState;
}

export const reducer = combineReducers<AppState>({
    oppfolging: oppfolgingReducer,
    sykmeldtInfodata: sykmeldtInfodataReducer,
    brukerRegistrering: brukerRegistreringReducer,
    jobbsokerbesvarelse: jobbsokerbesvarelseReducer,
    ulesteDialoger: ulesteDialogerReducer,
    egenvurderingbesvarelse: egenvurderingbesvarelseReducer,
});
