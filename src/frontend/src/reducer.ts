import { combineReducers } from 'redux';
import registreringStatus, { KrrStatusState } from './ducks/krr';

export interface AppState {
    registreringStatus: KrrStatusState;
}

export default combineReducers<AppState>({
    registreringStatus
});