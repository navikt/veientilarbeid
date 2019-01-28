import { combineReducers } from 'redux';
import oppfolgingReducer, { State as OppfolgingState } from './ducks/oppfolging';
import featureTogglesReducer, { State as FeatureTogglesState } from './ducks/feature-toggles';
import servicegruppeReducer, { State as ServicegruppeState } from './ducks/servicegruppe';
import sykmeldtInfodataReducer, { State as SykmeldtInfoState } from './ducks/sykmeldt-info';
import jobbsokerbesvarelseReducer, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';

export interface AppState {
    oppfolging: OppfolgingState;
    featureToggles: FeatureTogglesState;
    servicegruppe: ServicegruppeState;
    sykmeldtInfodata: SykmeldtInfoState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
}

export const reducer = combineReducers<AppState>({
    oppfolging: oppfolgingReducer,
    featureToggles: featureTogglesReducer,
    servicegruppe: servicegruppeReducer,
    sykmeldtInfodata: sykmeldtInfodataReducer,
    jobbsokerbesvarelse: jobbsokerbesvarelseReducer,
});


