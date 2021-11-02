import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import { useBrukerregistreringData } from '../../context/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../context/bruker-info';
import { useFeatureToggleData } from '../../context/feature-toggles';
import Kortbunke from './Kortbunke';
import React from 'react';
import Enkeltkort from './Enkeltkort';
import { kanViseOnboarding14A } from '../../lib/kan-vise-onboarding14a';

function Onboarding14a(): JSX.Element | null {
    const registreringData = useBrukerregistreringData();
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const featuretoggleData = useFeatureToggleData();
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);

    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });
    const visOnboardingForSituasjonsbestemtToggle = featuretoggleData['veientilarbeid.onboarding14a.situasjonsbestemt'];

    const kanViseSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe && visOnboardingForSituasjonsbestemtToggle;
    const kanViseKomponent = kanViseOnboarding14A({
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    if (!kanViseKomponent) return null;

    if (erStandardInnsatsgruppe) return <Kortbunke />;
    if (kanViseSituasjonsbestemt) return <Enkeltkort />;

    return null;
}

export default Onboarding14a;
