import { combineReducers } from 'redux';
import oppfolging, { State as OppfolgingState } from './ducks/oppfolging';
import tekster, { State as TeksterState } from './ducks/tekster';
import featureToggles, { State as FeatureTogglesState } from './ducks/feature-toggles';

export interface AppState {
    oppfolging: OppfolgingState;
    tekster: TeksterState;
    featureToggles: FeatureTogglesState;
}

export default combineReducers<AppState>({
    oppfolging,
    tekster,
    featureToggles,
});