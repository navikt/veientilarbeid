import {
    ActionType, Handling, FeatureTogglesFEILETAction, FeatureTogglesOKAction, FeatureTogglesPENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { doThenDispatch } from './api-utils';
import { hentFeatureTogglesFetch, DataElement, STATUS } from './api';

export const servicekodeToggleKey = 'veientilarbeid.hentservicekode';
export const jobbsokerbesvarelseToggleKey = 'veientilarbeid.hentJobbsokerbesvarelse';

export interface FeatureToggleState extends DataElement {
    [servicekodeToggleKey]: boolean;
    [jobbsokerbesvarelseToggleKey]: boolean;
}

const initialState: FeatureToggleState = {
    status: STATUS.NOT_STARTED,
    [servicekodeToggleKey]: false,
    [jobbsokerbesvarelseToggleKey]: false,
};

export default function reducer(state: FeatureToggleState = initialState, action: Handling): FeatureToggleState {
    switch (action.type) {
        case ActionType.FEATURE_TOGGLES_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionType.FEATURE_TOGGLES_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionType.FEATURE_TOGGLES_OK: {
            return {
                ...state,
                status: STATUS.OK,
                [servicekodeToggleKey]: action.unleash[servicekodeToggleKey],
                [jobbsokerbesvarelseToggleKey]: action.unleash[jobbsokerbesvarelseToggleKey]};
        }
        default:
            return state;
    }
}

export function hentFeatureToggles(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<FeatureToggleState>(
        () => hentFeatureTogglesFetch([servicekodeToggleKey, jobbsokerbesvarelseToggleKey]), {
        ok: hentFeatureTogglesOk,
        feilet: hentFeatureTogglesFeilet,
        pending: hentFeatureTogglesPending,
    });
}

function hentFeatureTogglesOk(unleash: FeatureToggleState): FeatureTogglesOKAction {
    return {
        type: ActionType.FEATURE_TOGGLES_OK,
        unleash: unleash
    };
}

function hentFeatureTogglesFeilet(): FeatureTogglesFEILETAction {
    return {
        type: ActionType.FEATURE_TOGGLES_FEILET,
    };
}

function hentFeatureTogglesPending(): FeatureTogglesPENDINGAction {
    return {
        type: ActionType.FEATURE_TOGGLES_PENDING,
    };
}