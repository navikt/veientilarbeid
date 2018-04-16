import { combineReducers } from 'redux';
import oppfolging, { State as OppfolgingState } from './ducks/oppfolging';
import tekster, { State as TeksterState } from './ducks/tekster';

export interface AppState {
    oppfolging: OppfolgingState;
    tekster: TeksterState;
}

export default combineReducers<AppState>({
    oppfolging,
    tekster
});