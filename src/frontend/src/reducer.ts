import { combineReducers } from 'redux';
import registreringStatus, { KrrStatusState } from './ducks/krr';
import {default as introduksjonReducer, IntroduksjonState} from "./ducks/introduksjon";

export interface AppState {
    registreringStatus: KrrStatusState;
    introduksjonOverlay: IntroduksjonState;
}

export default combineReducers<AppState>({
    registreringStatus,
    introduksjonReducer
});