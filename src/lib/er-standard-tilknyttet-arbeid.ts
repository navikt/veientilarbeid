import { Data as FeaturetoggleData } from '../contexts/feature-toggles';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';

export function erStandardTilknyttetArbeid({
    oppfolgingData,
    registreringData,
    featuretoggleData,
}: {
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeaturetoggleData;
}): boolean {
    const brukerregistreringData = registreringData?.registrering ?? null;
    const dinSituasjon =
        brukerregistreringData?.besvarelse.dinSituasjon || Brukerregistrering.DinSituasjonSvar.INGEN_VERDI;
    const harRettSituasjon = [
        Brukerregistrering.DinSituasjonSvar.HAR_SAGT_OPP,
        Brukerregistrering.DinSituasjonSvar.MISTET_JOBBEN,
        Brukerregistrering.DinSituasjonSvar.ER_PERMITTERT,
    ].includes(dinSituasjon);
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    const visOnboardingStandardInformasjonToggle = featuretoggleData['veientilarbeid.vis-onboarding-standard'];
    const kanViseForStandard = erStandardInnsatsgruppe && visOnboardingStandardInformasjonToggle;

    return kanViseForStandard && !oppfolgingData.kanReaktiveres && harRettSituasjon;
}
