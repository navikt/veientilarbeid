import { ActionTypes as OppfolgingActionTypes } from './oppfolging';
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles';
import { ActionTypes as ServicegruppeActionTypes } from './servicegruppe';
import { ActionTypes as SykmeldtInfoActionTypes } from './sykmeldt-info';
import { ActionTypes as JobbsokerbesvarelseActionTypes } from './jobbsokerbesvarelse';

type ActionsTypes = OppfolgingActionTypes
    | FeatureTogglesActionTypes
    | ServicegruppeActionTypes
    | SykmeldtInfoActionTypes
    | JobbsokerbesvarelseActionTypes;

export default ActionsTypes;
