import { combineReducers } from 'redux';
import oppfolging, { State as OppfolgingState } from './ducks/oppfolging';
import featureToggles, { State as FeatureTogglesState } from './ducks/feature-toggles';
import servicegruppe, { State as ServicegruppeState } from './ducks/servicegruppe';

export interface AppState {
    oppfolging: OppfolgingState;
    featureToggles: FeatureTogglesState;
    servicegruppe: ServicegruppeState;
}

export default combineReducers<AppState>({
    oppfolging,
    featureToggles,
    servicegruppe,
});