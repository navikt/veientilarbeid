import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    INTRO_FEEDBACK = 'veientilarbeid.feedback',
    INTRO_14A = 'veientilarbeid.14a-intro',
    EGENVURDERING_UKE12 = 'veientilarbeid.egenvurderinguke12',
    INTRO_DAGPENGER = 'veientilarbeid.onboardingDagpenger',
    INTRO_DAGPENGER_TOGGLE = 'veientilarbeid.onboardingDagpenger.toggle',
    KAN_VISE_UTFRA_SITUASJON = 'veientilarbeid.kanViseUtfraSituasjon',
    VIS_EGENVURDERING_MED_14A = 'veientilarbeid.vis-egenvurdering-med-14a',
    LOGG_ARBEIDSSOKERPERIODER = 'veientilarbeid.logg-arbeidssokerperioder',
    VIS_GJELDER_FRA_DATO = 'veientilarbeid.vis-gjelder-fra-dato',
    BRUK_PROFIL = 'veientilarbeid.bruk-profil',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.INTRO_14A:
            return '14a-intro';
        case FeatureToggles.INTRO_FEEDBACK:
            return 'Intro feedback';
        case FeatureToggles.EGENVURDERING_UKE12:
            return 'Egenvurdering uke 12';
        case FeatureToggles.KAN_VISE_UTFRA_SITUASJON:
            return 'Vis VTA fra situasjon';
        case FeatureToggles.VIS_EGENVURDERING_MED_14A:
            return 'Vis egenvurdering med 14a';
        case FeatureToggles.INTRO_DAGPENGER:
            return 'Onboarding dagpenger';
        case FeatureToggles.INTRO_DAGPENGER_TOGGLE:
            return 'Onboarding dagpenger toggle';
        case FeatureToggles.LOGG_ARBEIDSSOKERPERIODER:
            return 'Logg arbeidssøkerperioder';
        case FeatureToggles.VIS_GJELDER_FRA_DATO:
            return 'Gjelder fra dato';
        case FeatureToggles.BRUK_PROFIL:
            return 'Bruk profil';
    }
}

export interface Data {
    'veientilarbeid.feedback': boolean;
    'veientilarbeid.14a-intro': boolean;
    'veientilarbeid.egenvurderinguke12': boolean;
    'veientilarbeid.onboardingDagpenger': boolean;
    'veientilarbeid.onboardingDagpenger.toggle': boolean;
    'veientilarbeid.kanViseUtfraSituasjon': boolean;
    'veientilarbeid.vis-egenvurdering-med-14a': boolean;
    'veientilarbeid.logg-arbeidssokerperioder': boolean;
    'veientilarbeid.vis-gjelder-fra-dato'?: boolean;
    'veientilarbeid.bruk-profil'?: boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': false,
        'veientilarbeid.egenvurderinguke12': false,
        'veientilarbeid.onboardingDagpenger': false,
        'veientilarbeid.onboardingDagpenger.toggle': false,
        'veientilarbeid.kanViseUtfraSituasjon': false,
        'veientilarbeid.vis-egenvurdering-med-14a': false,
        'veientilarbeid.logg-arbeidssokerperioder': false,
        'veientilarbeid.vis-gjelder-fra-dato': false,
        'veientilarbeid.bruk-profil': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
