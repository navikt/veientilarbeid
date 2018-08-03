import { ActionTypes as OppfolgingActionTypes } from './oppfolging';
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles';

type ActionsTypes = OppfolgingActionTypes
    | FeatureTogglesActionTypes;

export default ActionsTypes;