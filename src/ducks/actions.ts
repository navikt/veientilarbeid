import { ActionTypes as OppfolgingActionTypes } from './oppfolging';
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles';
import { ActionTypes as ServicegruppeActionTypes } from './servicegruppe';
import { ActionTypes as SykeforloepMetadataActionTypes } from './sykeforloep-metadata';
import { ActionTypes as JobbsokerbesvarelseActionTypes } from './jobbsokerbesvarelse';
import { ActionTypes as RegistreringActionTypes } from './registrering';

type ActionsTypes = OppfolgingActionTypes
    | FeatureTogglesActionTypes
    | ServicegruppeActionTypes
    | SykeforloepMetadataActionTypes
    | JobbsokerbesvarelseActionTypes
    | RegistreringActionTypes;

export default ActionsTypes;
