import { combineReducers } from 'redux';
import registreringStatus, { KrrStatusState } from './ducks/krr';
import { default as introduksjonOverlay, IntroduksjonState } from './ducks/introduksjon';

export interface AppState {
    registreringStatus: KrrStatusState;
    introduksjonOverlay: IntroduksjonState;
}

export default combineReducers<AppState>({
    registreringStatus,
    introduksjonOverlay
});