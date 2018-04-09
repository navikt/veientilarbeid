import { combineReducers } from 'redux';
import oppfolging, { State as OppfolgingState } from './ducks/oppfolging';
import innloggingsInfo, { State as InnloggingsInfoState } from './ducks/innloggingsinfo';

export interface AppState {
    oppfolging: OppfolgingState;
    innloggingsInfo: InnloggingsInfoState;
}

export default combineReducers<AppState>({
    oppfolging,
    innloggingsInfo
});