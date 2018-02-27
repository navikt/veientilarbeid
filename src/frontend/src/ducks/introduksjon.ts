export enum IntroduksjonActionTypes {
    INTRODUKSJON_SKIFT_SIDE = ('INTRODUKSJON_SKIFT_SIDE'),
    INTRODUKSJON_VIS_OVERLAY = ('INTRODUKSJON_VIS_OVERLAY'),
}

export interface IntroduksjonState {
    visOverlay: boolean;
    side: number;
}

interface Data {
    side?: number;
    visOverlay?: boolean;
}

const initialState: IntroduksjonState = {
    side: 0,
    visOverlay: true
};

export default function (
    state: IntroduksjonState = initialState,
    action: {type: IntroduksjonActionTypes, data: Data}
): IntroduksjonState {
    switch (action.type) {
        case IntroduksjonActionTypes.INTRODUKSJON_SKIFT_SIDE:
            return {...state, side: action.data.side === undefined ? initialState.side : action.data.side};
        case IntroduksjonActionTypes.INTRODUKSJON_VIS_OVERLAY:
            return {...state, visOverlay: action.data.visOverlay === undefined ? initialState.visOverlay : action.data.visOverlay};
        default:
            return initialState;
    }
}