import { Data as FeatureToggleData, FeatureToggles } from '../contexts/feature-toggles';
import { Reaktivering } from '../contexts/reaktivering';

export type ReaktiveringEllerNull = Reaktivering | null;

function visAutomatiskReaktiveringsKort(
    featureToggleData: FeatureToggleData,
    reaktivering: ReaktiveringEllerNull
): boolean {
    const harUbesvartReaktivering = (reaktivering && reaktivering.svar === null) || false;
    const harAktivFeatureToggle = featureToggleData[FeatureToggles.BRUK_BEKREFT_REAKTIVERING] || false;
    return harAktivFeatureToggle && harUbesvartReaktivering;
}

export { visAutomatiskReaktiveringsKort };
