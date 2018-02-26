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

export default function introduksjonReducer(
    state: IntroduksjonState = initialState,
    action: {type: IntroduksjonActionTypes, data: Data}
): IntroduksjonState {
    switch (action.type) {
        case IntroduksjonActionTypes.INTRODUKSJON_SKIFT_SIDE:
            return {...state, side: action.data.side || initialState.side};
        case IntroduksjonActionTypes.INTRODUKSJON_VIS_OVERLAY:
            return {...state, visOverlay: action.data.visOverlay || initialState.visOverlay};
        default:
            return initialState;
    }
}