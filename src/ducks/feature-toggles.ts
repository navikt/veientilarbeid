import * as React from 'react';
import { DataElement, STATUS } from './api';

export const alleFeatureToggles = [
    /* For tiden ingen feature toggles */
];

export interface Data {}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {},
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
