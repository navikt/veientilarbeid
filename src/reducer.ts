import { combineReducers } from 'redux';
import oppfolging, { State as OppfolgingState } from './ducks/oppfolging';
import featureToggles, { State as FeatureTogglesState } from './ducks/feature-toggles';

export interface AppState {
    oppfolging: OppfolgingState;
    featureToggles: FeatureTogglesState;
}

export default combineReducers<AppState>({
    oppfolging,
    featureToggles,
});