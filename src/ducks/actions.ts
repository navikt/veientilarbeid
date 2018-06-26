import { ActionTypes as OppfolgingActionTypes } from './oppfolging';
import { ActionTypes as TeksterActionTypes } from './tekster';
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles';

type ActionsTypes = OppfolgingActionTypes
    | TeksterActionTypes
    | FeatureTogglesActionTypes;

export default ActionsTypes;