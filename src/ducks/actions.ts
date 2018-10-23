import { ActionTypes as OppfolgingActionTypes } from './oppfolging';
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles';
import { ActionTypes as ServicegruppeActionTypes } from './servicegruppe';

type ActionsTypes = OppfolgingActionTypes
    | FeatureTogglesActionTypes
    | ServicegruppeActionTypes;

export default ActionsTypes;