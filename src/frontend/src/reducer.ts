import { combineReducers } from 'redux';
import registreringStatus, { RegStatusState } from './ducks/hent-registrering-status';

export interface AppState {
    registreringStatus: RegStatusState;
}

export default combineReducers<AppState>({
    registreringStatus
});