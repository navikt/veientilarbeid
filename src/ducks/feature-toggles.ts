import * as React from 'react';
import { DataElement, STATUS } from './api';

export const alleFeatureToggles = ['veientilarbeid.meldekortonboarding', 'veientilarbeid.feedback'];

export interface Data {
    'veientilarbeid.meldekortonboarding': boolean;
    'veientilarbeid.feedback': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.meldekortonboarding': false,
        'veientilarbeid.feedback': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
