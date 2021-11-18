import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    INTRO_FEEDBACK = 'veientilarbeid.feedback',
    INTRO_14A = 'veientilarbeid.14a-intro',
    REGISTRERT_PERMITTERT = 'veientilarbeid.registrert-permittert',
    DAGPENGER_STATUS = 'veientilarbeid.dagpenger-status',
    DPSTATUS_FOR_ALLE = 'veientilarbeid.dpstatus-for-alle',
    EGENVURDERING_UKE12 = 'veientilarbeid.egenvurderinguke12',
    RYDDING_SKJUL_AAP_RAD = 'veientilarbeid.rydding.skjulAAPRad',
    BRUKERUNDERSOKELSE_VIS = 'veientilarbeid.visbrukerundersokelse',
    INTRO_14A_SITUASJONSBESTEMT = 'veientilarbeid.onboarding14a.situasjonsbestemt',
    INTRO_MELDEKORT_SITUASJONSBESTEMT = 'veientilarbeid.onboardingMeldekort.situasjonsbestemt',
    INTRO_YTELSER_SITUASJONSBESTEMT = 'veientilarbeid.onboardingYtelser.situasjonsbestemt',
    INTRO_DAGPENGER = 'veientilarbeid.onboardingDagpenger',
    KAN_VISE_UTFRA_SITUASJON = 'veientilarbeid.kanViseUtfraSituasjon',
    VIS_OPPDATERT_STYLING = 'veientilarbeid.vis-oppdatert-styling',
    VIS_EGENVURDERING_MED_14A = 'veientilarbeid.vis-egenvurdering-med-14a',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
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
        case FeatureToggles.RYDDING_SKJUL_AAP_RAD:
            return 'Skjul AAP rad';
        case FeatureToggles.BRUKERUNDERSOKELSE_VIS:
            return 'Vis brukerundersøkelse';
        case FeatureToggles.INTRO_14A_SITUASJONSBESTEMT:
            return 'Vis 14a-intro for situasjonsbestemt';
        case FeatureToggles.INTRO_MELDEKORT_SITUASJONSBESTEMT:
            return 'Vis meldekort-intro for situasjonsbestemt';
        case FeatureToggles.KAN_VISE_UTFRA_SITUASJON:
            return 'Vis VTA fra situasjon';
        case FeatureToggles.INTRO_YTELSER_SITUASJONSBESTEMT:
            return 'Vis ytelser fra situasjon';
        case FeatureToggles.VIS_OPPDATERT_STYLING:
            return 'Vis oppdatert styling';
        case FeatureToggles.VIS_EGENVURDERING_MED_14A:
            return 'Vis egenvurdering med 14a';
        case FeatureToggles.INTRO_DAGPENGER:
            return 'Onboarding dagpenger';
    }
}

export interface Data {
    'veientilarbeid.feedback': boolean;
    'veientilarbeid.14a-intro': boolean;
    'veientilarbeid.registrert-permittert': boolean;
    'veientilarbeid.dagpenger-status': boolean;
    'veientilarbeid.dpstatus-for-alle': boolean;
    'veientilarbeid.egenvurderinguke12': boolean;
    'veientilarbeid.rydding.skjulAAPRad': boolean;
    'veientilarbeid.visbrukerundersokelse': boolean;
    'veientilarbeid.onboarding14a.situasjonsbestemt': boolean;
    'veientilarbeid.onboardingMeldekort.situasjonsbestemt': boolean;
    'veientilarbeid.onboardingYtelser.situasjonsbestemt': boolean;
    'veientilarbeid.onboardingDagpenger': boolean;
    'veientilarbeid.kanViseUtfraSituasjon': boolean;
    'veientilarbeid.vis-oppdatert-styling': boolean;
    'veientilarbeid.vis-egenvurdering-med-14a': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': false,
        'veientilarbeid.registrert-permittert': false,
        'veientilarbeid.dagpenger-status': false,
        'veientilarbeid.dpstatus-for-alle': false,
        'veientilarbeid.egenvurderinguke12': false,
        'veientilarbeid.rydding.skjulAAPRad': false,
        'veientilarbeid.visbrukerundersokelse': false,
        'veientilarbeid.onboarding14a.situasjonsbestemt': false,
        'veientilarbeid.onboardingMeldekort.situasjonsbestemt': false,
        'veientilarbeid.onboardingYtelser.situasjonsbestemt': false,
        'veientilarbeid.onboardingDagpenger': false,
        'veientilarbeid.kanViseUtfraSituasjon': false,
        'veientilarbeid.vis-oppdatert-styling': false,
        'veientilarbeid.vis-egenvurdering-med-14a': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
