import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    FEATURE_TOGGLES_PENDING = 'FEATURE_TOGGLES_PENDING',
    FEATURE_TOGGLES_OK = 'FEATURE_TOGGLES_OK',
    FEATURE_TOGGLES_FEILET = 'FEATURE_TOGGLES_FEILET',
}

export interface Data {
    'veientilarbeid.hentservicekode': boolean;
    'veientilarbeid.hentJobbsokerbesvarelse': boolean;
}

export interface State {
    data: Data;
    status: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

export const servicekodeToggleKey = 'veientilarbeid.hentservicekode';
export const sykeforloepMetadataToggleKey = 'veientilarbeid.hentSykeforloepMetadata';
export const jobbsokerbesvarelseToggleKey = 'veientilarbeid.hentJobbsokerbesvarelse';

export const alleFeatureToggles = [
    servicekodeToggleKey,
    sykeforloepMetadataToggleKey,
    jobbsokerbesvarelseToggleKey
];

const initialState = {
    data : {
        'veientilarbeid.hentservicekode': false,
        'veientilarbeid.hentJobbsokerbesvarelse': false
    },
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.FEATURE_TOGGLES_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.FEATURE_TOGGLES_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionTypes.FEATURE_TOGGLES_OK: {
            return { ...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentFeatureToggles() {
    return doThenDispatch(() => Api.hentFeatureToggles(), {
        PENDING: ActionTypes.FEATURE_TOGGLES_PENDING,
        OK : ActionTypes.FEATURE_TOGGLES_OK,
        FEILET: ActionTypes.FEATURE_TOGGLES_FEILET,
    });
}

export function selectFeatureToggles(state: AppState): State {
    return state.featureToggles;
}

export function selectHentServicegruppekodeFeatureToggle(state: AppState): boolean {
    return state.featureToggles.data[servicekodeToggleKey];
}

export function selectHentSykeforloepMetadata(state: AppState): boolean {
    return state.featureToggles.data[sykeforloepMetadataToggleKey];
}

export function selectHentJobbsokerbesvarelseFeatureToggle(state: AppState): boolean {
    return state.featureToggles.data[jobbsokerbesvarelseToggleKey];
}