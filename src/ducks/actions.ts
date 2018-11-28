import { ActionTypes as OppfolgingActionTypes } from './oppfolging';
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles';
import { ActionTypes as ServicegruppeActionTypes } from './servicegruppe';
import { ActionTypes as SykeforloepMetadataActionTypes } from './sykeforloep-metadata';
import { ActionTypes as JobbsokerbesvarelseActionTypes } from './jobbsokerbesvarelse';

type ActionsTypes = OppfolgingActionTypes
    | FeatureTogglesActionTypes
    | ServicegruppeActionTypes
    | SykeforloepMetadataActionTypes
    | JobbsokerbesvarelseActionTypes;

export default ActionsTypes;
