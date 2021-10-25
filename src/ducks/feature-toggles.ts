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
    RYDDING_SKJUL_OKONOMI_BOKS = 'veientilarbeid.rydding.skjulOkonomiBoks',
    RYDDING_SKJUL_AAP_RAD = 'veientilarbeid.rydding.skjulAAPRad',
    BRUKERUNDERSOKELSE_VIS = 'veientilarbeid.visbrukerundersokelse',
    INTRO_14A_IKKE_STANDARD = 'veientilarbeid.14a-intro.ikke-standard',
    INTRO_MELDEKORT_SITUASJONSBESTEMT = 'veientilarbeid.meldekort-intro.situasjonsbestemt',
    VIS_OPPDATERT_STYLING = 'veientilarbeid.oppdatert-styling',
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
        case FeatureToggles.RYDDING_SKJUL_OKONOMI_BOKS:
            return 'Skjul økonomiboks';
        case FeatureToggles.RYDDING_SKJUL_AAP_RAD:
            return 'Skjul AAP rad';
        case FeatureToggles.BRUKERUNDERSOKELSE_VIS:
            return 'Vis brukerundersøkelse';
        case FeatureToggles.INTRO_14A_IKKE_STANDARD:
            return 'Vis 14a for ikke standard';
        case FeatureToggles.INTRO_MELDEKORT_SITUASJONSBESTEMT:
            return 'Vis meldekort-intro for situasjonsbestemt';
        case FeatureToggles.VIS_OPPDATERT_STYLING:
            return 'Vis oppdatert styling';
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
    'veientilarbeid.rydding.skjulOkonomiBoks': boolean;
    'veientilarbeid.rydding.skjulAAPRad': boolean;
    'veientilarbeid.visbrukerundersokelse': boolean;
    'veientilarbeid.14a-intro.ikke-standard': boolean;
    'veientilarbeid.meldekort-intro.situasjonsbestemt': boolean;
    'veientilarbeid.oppdatert-styling': boolean;
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
        'veientilarbeid.rydding.skjulOkonomiBoks': false,
        'veientilarbeid.rydding.skjulAAPRad': false,
        'veientilarbeid.visbrukerundersokelse': false,
        'veientilarbeid.14a-intro.ikke-standard': false,
        'veientilarbeid.meldekort-intro.situasjonsbestemt': false,
        'veientilarbeid.oppdatert-styling': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
