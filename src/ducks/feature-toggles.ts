import {
    ActionType, Handling, FeatureTogglesFEILETAction, FeatureTogglesOKAction, FeatureTogglesPENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { doThenDispatch } from './api-utils';
import { hentFeatureTogglesFetch, DataElement, STATUS } from './api';

export const servicekodeToggleKey = 'veientilarbeid.hentservicekode';
export const jobbsokerbesvarelseToggleKey = 'veientilarbeid.hentJobbsokerbesvarelse';
export const demoToggleKey = 'veientilarbeid.demo';

export interface FeatureToggles {
    [servicekodeToggleKey]: boolean;
    [jobbsokerbesvarelseToggleKey]: boolean;
    [demoToggleKey]: boolean;
}

export type FeatureToggleState = FeatureToggles & DataElement;

const initialState: FeatureToggleState = {
    status: STATUS.NOT_STARTED,
    [servicekodeToggleKey]: false,
    [jobbsokerbesvarelseToggleKey]: false,
    [demoToggleKey]: false,
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
                [jobbsokerbesvarelseToggleKey]: action.unleash[jobbsokerbesvarelseToggleKey],
                [demoToggleKey]: action.unleash[demoToggleKey]
            };
        }
        default:
            return state;
    }
}

export function hentFeatureToggles(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<FeatureToggles>(
        () => hentFeatureTogglesFetch([servicekodeToggleKey, jobbsokerbesvarelseToggleKey, demoToggleKey]), {
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