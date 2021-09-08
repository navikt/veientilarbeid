import * as React from 'react';
import { DataElement, STATUS } from './api';

export enum FeatureToggles {
    MODAL = 'veientilarbeid.modal',
    INTRO_FEEDBACK = 'veientilarbeid.feedback',
    INTRO_14A = 'veientilarbeid.14a-intro',
    REGISTRERT_PERMITTERT = 'veientilarbeid.registrert-permittert',
    DAGPENGER_STATUS = 'veientilarbeid.dagpenger-status',
    DPSTATUS_FOR_ALLE = 'veientilarbeid.dpstatus-for-alle',
    EGENVURDERING_UKE12 = 'veientilarbeid.egenvurderinguke12',
    RYDDING_SKJUL_JOBB_BOKS = 'veientilarbeid.rydding.skjulJobbBoks',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.MODAL:
            return '14a-modal';
        case FeatureToggles.INTRO_14A:
            return '14a-intro';
        case FeatureToggles.INTRO_FEEDBACK:
            return 'Intro feedback';
        case FeatureToggles.REGISTRERT_PERMITTERT:
            return 'Registrert som permittert';
        case FeatureToggles.DAGPENGER_STATUS:
            return 'Dagpenger status';
        case FeatureToggles.DPSTATUS_FOR_ALLE:
            return 'Dagpenger status for alle';
        case FeatureToggles.EGENVURDERING_UKE12:
            return 'Egenvurdering uke 12';
        case FeatureToggles.RYDDING_SKJUL_JOBB_BOKS:
            return 'Skjul arbeidsplassen';
    }
}

export interface Data {
    'veientilarbeid.modal': boolean;
    'veientilarbeid.feedback': boolean;
    'veientilarbeid.14a-intro': boolean;
    'veientilarbeid.registrert-permittert': boolean;
    'veientilarbeid.dagpenger-status': boolean;
    'veientilarbeid.dpstatus-for-alle': boolean;
    'veientilarbeid.egenvurderinguke12': boolean;
    'veientilarbeid.rydding.skjulJobbBoks': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.modal': false,
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': false,
        'veientilarbeid.registrert-permittert': false,
        'veientilarbeid.dagpenger-status': false,
        'veientilarbeid.dpstatus-for-alle': false,
        'veientilarbeid.egenvurderinguke12': false,
        'veientilarbeid.rydding.skjulJobbBoks': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
