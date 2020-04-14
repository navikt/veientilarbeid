import * as React from 'react';
import { DataElement, STATUS } from './api';

export const alleFeatureToggles = [
    'veientilarbeid.motestotte.lansert',
    'veientilarbeid.meldekort.ny-tekst',
    'veientilarbeid.permittert.ny-dialog',
    'veientilarbeid.permittert.situasjon.endre'
];

export interface Data {
    'veientilarbeid.motestotte.lansert': boolean;
    'veientilarbeid.meldekort.ny-tekst': boolean;
    'veientilarbeid.permittert.ny-dialog': boolean;
    'veientilarbeid.permittert.situasjon.endre': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.motestotte.lansert': false,
        'veientilarbeid.meldekort.ny-tekst': false,
        'veientilarbeid.permittert.ny-dialog': false,
        'veientilarbeid.permittert.situasjon.endre': false
    },
    status: STATUS.NOT_STARTED
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
