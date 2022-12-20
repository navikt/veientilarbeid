import { Data as FeatureToggleData, FeatureToggles } from '../contexts/feature-toggles';

import { visAutomatiskReaktiveringsKort, ReaktiveringEllerNull } from './vis-automatisk-reaktiverings-kort';

describe('Tester visAutomatiskReaktiveringsKort-funksjonen', () => {
    test('returnerer TRUE dersom begge kriterier er oppfylt', () => {
        const featuretoggles = {
            [FeatureToggles.BRUK_BEKREFT_REAKTIVERING]: true,
        } as FeatureToggleData;
        const reaktivering = {
            opprettetDato: new Date().toISOString().substring(0, 10),
            svar: null,
        } as ReaktiveringEllerNull;
        const resultat = visAutomatiskReaktiveringsKort(featuretoggles, reaktivering);
        const forventetResultat = true;
        expect(resultat).toBe(forventetResultat);
    });

    test('returnerer FALSE dersom begge reaktivering er besvart', () => {
        const featuretoggles = {
            [FeatureToggles.BRUK_BEKREFT_REAKTIVERING]: true,
        } as FeatureToggleData;
        const reaktivering = {
            opprettetDato: new Date().toISOString().substring(0, 10),
            svar: {
                opprettetDato: new Date().toISOString().substring(0, 10),
                svar: 'ja',
            },
        } as ReaktiveringEllerNull;
        const resultat = visAutomatiskReaktiveringsKort(featuretoggles, reaktivering);
        const forventetResultat = false;
        expect(resultat).toBe(forventetResultat);
    });

    test('returnerer FALSE dersom featureToggle er av', () => {
        const featuretoggles = {
            [FeatureToggles.BRUK_BEKREFT_REAKTIVERING]: false,
        } as FeatureToggleData;
        const reaktivering = {
            opprettetDato: new Date().toISOString().substring(0, 10),
            svar: null,
        } as ReaktiveringEllerNull;
        const resultat = visAutomatiskReaktiveringsKort(featuretoggles, reaktivering);
        const forventetResultat = false;
        expect(resultat).toBe(forventetResultat);
    });

    test('returnerer FALSE dersom reaktivering er null', () => {
        const featuretoggles = {
            [FeatureToggles.BRUK_BEKREFT_REAKTIVERING]: true,
        } as FeatureToggleData;
        const reaktivering = null as ReaktiveringEllerNull;
        const resultat = visAutomatiskReaktiveringsKort(featuretoggles, reaktivering);
        const forventetResultat = false;
        expect(resultat).toBe(forventetResultat);
    });

    test('returnerer FALSE dersom reaktivering er null og featureToggle er av', () => {
        const featuretoggles = {
            [FeatureToggles.BRUK_BEKREFT_REAKTIVERING]: false,
        } as FeatureToggleData;
        const reaktivering = null as ReaktiveringEllerNull;
        const resultat = visAutomatiskReaktiveringsKort(featuretoggles, reaktivering);
        const forventetResultat = false;
        expect(resultat).toBe(forventetResultat);
    });
});
