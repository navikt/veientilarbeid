import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import Kortbunke from './Kortbunke';
import React from 'react';
import Enkeltkort from './Enkeltkort';

function Onboarding14a(): JSX.Element | null {
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);

    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const visOnboardingForSituasjonsbestemtToggle = featuretoggleData['veientilarbeid.onboarding14a.situasjonsbestemt'];

    const kanViseSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe && visOnboardingForSituasjonsbestemtToggle;
    const kanViseKomponent = erStandardInnsatsgruppe || kanViseSituasjonsbestemt;

    if (!kanViseKomponent) return null;

    if (erStandardInnsatsgruppe) return <Kortbunke />;
    if (kanViseSituasjonsbestemt) return <Enkeltkort />;

    return null;
}

export default Onboarding14a;
