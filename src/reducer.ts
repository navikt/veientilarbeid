import { combineReducers } from 'redux';
import oppfolging, { State as OppfolgingState } from './ducks/oppfolging';

export interface AppState {
    oppfolging: OppfolgingState;
}

export default combineReducers<AppState>({
    oppfolging
});