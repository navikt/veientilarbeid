import { combineReducers } from 'redux';
import oppfolgingReducer, { State as OppfolgingState } from './ducks/oppfolging';
import featureTogglesReducer, { FeatureToggleState } from './ducks/feature-toggles';
import servicegruppeReducer, { State as ServicegruppeState } from './ducks/servicegruppe';
import sykmeldtInfodataReducer, { State as SykmeldtInfoState } from './ducks/sykmeldt-info';
import jobbsokerbesvarelseReducer, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';
import ulesteDialogerReducer, { State as UlesteDialogerState } from './ducks/dialog';

export interface AppState {
    oppfolging: OppfolgingState;
    featureToggles: FeatureToggleState;
    servicegruppe: ServicegruppeState;
    sykmeldtInfodata: SykmeldtInfoState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
}

export const reducer = combineReducers<AppState>({
    oppfolging: oppfolgingReducer,
    featureToggles: featureTogglesReducer,
    servicegruppe: servicegruppeReducer,
    sykmeldtInfodata: sykmeldtInfodataReducer,
    jobbsokerbesvarelse: jobbsokerbesvarelseReducer,
    ulesteDialoger: ulesteDialogerReducer,
});
