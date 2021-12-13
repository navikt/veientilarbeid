import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    INTRO_FEEDBACK = 'veientilarbeid.feedback',
    INTRO_14A = 'veientilarbeid.14a-intro',
    DAGPENGER_STATUS = 'veientilarbeid.dagpenger-status',
    DPSTATUS_FOR_ALLE = 'veientilarbeid.dpstatus-for-alle',
    EGENVURDERING_UKE12 = 'veientilarbeid.egenvurderinguke12',
    RYDDING_SKJUL_AAP_RAD = 'veientilarbeid.rydding.skjulAAPRad',
    INTRO_DAGPENGER = 'veientilarbeid.onboardingDagpenger',
    INTRO_DAGPENGER_TOGGLE = 'veientilarbeid.onboardingDagpenger.toggle',
    BRUK_DP_INNSYN_API = 'veientilarbeid.bruk-dp-innsyn-api',
    KAN_VISE_UTFRA_SITUASJON = 'veientilarbeid.kanViseUtfraSituasjon',
    VIS_EGENVURDERING_MED_14A = 'veientilarbeid.vis-egenvurdering-med-14a',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.INTRO_14A:
            return '14a-intro';
        case FeatureToggles.INTRO_FEEDBACK:
            return 'Intro feedback';
        case FeatureToggles.DAGPENGER_STATUS:
            return 'Dagpenger status';
        case FeatureToggles.DPSTATUS_FOR_ALLE:
            return 'Dagpenger status for alle';
        case FeatureToggles.EGENVURDERING_UKE12:
            return 'Egenvurdering uke 12';
        case FeatureToggles.RYDDING_SKJUL_AAP_RAD:
            return 'Skjul AAP rad';
        case FeatureToggles.KAN_VISE_UTFRA_SITUASJON:
            return 'Vis VTA fra situasjon';
        case FeatureToggles.VIS_EGENVURDERING_MED_14A:
            return 'Vis egenvurdering med 14a';
        case FeatureToggles.INTRO_DAGPENGER:
            return 'Onboarding dagpenger';
        case FeatureToggles.INTRO_DAGPENGER_TOGGLE:
            return 'Onboarding dagpenger toggle';
        case FeatureToggles.BRUK_DP_INNSYN_API:
            return 'Bruk dp-innsyn api';
    }
}

export interface Data {
    'veientilarbeid.feedback': boolean;
    'veientilarbeid.14a-intro': boolean;
    'veientilarbeid.dagpenger-status': boolean;
    'veientilarbeid.dpstatus-for-alle': boolean;
    'veientilarbeid.egenvurderinguke12': boolean;
    'veientilarbeid.rydding.skjulAAPRad': boolean;
    'veientilarbeid.onboardingDagpenger': boolean;
    'veientilarbeid.veientilarbeid.bruk-dp-innsyn-api'?: boolean;
    'veientilarbeid.onboardingDagpenger.toggle': boolean;
    'veientilarbeid.kanViseUtfraSituasjon': boolean;
    'veientilarbeid.vis-egenvurdering-med-14a': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': false,
        'veientilarbeid.dagpenger-status': false,
        'veientilarbeid.dpstatus-for-alle': false,
        'veientilarbeid.egenvurderinguke12': false,
        'veientilarbeid.rydding.skjulAAPRad': false,
        'veientilarbeid.onboardingDagpenger': false,
        'veientilarbeid.veientilarbeid.bruk-dp-innsyn-api': false,
        'veientilarbeid.onboardingDagpenger.toggle': false,
        'veientilarbeid.kanViseUtfraSituasjon': false,
        'veientilarbeid.vis-egenvurdering-med-14a': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
