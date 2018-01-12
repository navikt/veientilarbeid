import { combineReducers } from 'redux';
import registreringStatus, { RegStatusState } from './ducks/krr';

export interface AppState {
    registreringStatus: RegStatusState;
}

export default combineReducers<AppState>({
    registreringStatus
});