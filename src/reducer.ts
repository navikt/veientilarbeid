import { combineReducers } from 'redux';
import oppfolging, { State as OppfolgingState } from './ducks/oppfolging';
import featureToggles, { State as FeatureTogglesState } from './ducks/feature-toggles';
import servicegruppe, { State as ServicegruppeState } from './ducks/servicegruppe';
import sykmeldtInfodata, { State as SykmeldtInfo } from './ducks/sykmeldt-info';
import jobbsokerbesvarelse, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';

export interface AppState {
    oppfolging: OppfolgingState;
    featureToggles: FeatureTogglesState;
    servicegruppe: ServicegruppeState;
    sykmeldtInfodata: SykmeldtInfo;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
}

export default combineReducers<AppState>({
    oppfolging,
    featureToggles,
    servicegruppe,
    sykmeldtInfodata,
    jobbsokerbesvarelse,
});
