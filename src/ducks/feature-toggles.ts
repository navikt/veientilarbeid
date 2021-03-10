import * as React from 'react';
import { DataElement, STATUS } from './api';

export const alleFeatureToggles = ['veientilarbeid.feedback'];

export interface Data {
    'veientilarbeid.feedback': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.feedback': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
