import { ActionTypes as OppfolgingActionTypes } from './oppfolging';
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles';
import { ActionTypes as ServicegruppeActionTypes } from './servicegruppe';
import { ActionTypes as SykeforloepMetadataActionTypes } from './sykeforloep-metadata';

type ActionsTypes = OppfolgingActionTypes
    | FeatureTogglesActionTypes
    | ServicegruppeActionTypes
    | SykeforloepMetadataActionTypes;

export default ActionsTypes;
