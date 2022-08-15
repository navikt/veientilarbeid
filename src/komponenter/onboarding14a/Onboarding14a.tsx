import { useState, useEffect } from 'react';

import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useBrukerinfoData } from '../../contexts/bruker-info';

import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import Kortbunke from './StandardKortbunke';
import SituasjonsbestemtKortbunke from './SituasjonsbestemtKortbunke';
import { kanViseOnboarding14A } from '../../lib/kan-vise-onboarding14a';
import finnKvitteringstype from '../../lib/finn-kvitteringstype';
import BehovsvurderingKvittering from '../kvitteringer/behovsvurdering-legacy';

function Onboarding14a(): JSX.Element | null {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const brukerInfoData = useBrukerinfoData();
    const featureToggles = useFeatureToggleData();
    const [kvittering, setKvittering] = useState('');
    const [visKvittering, setVisKvittering] = useState<boolean>(finnKvitteringstype(kvittering) === 'behovsvurdering');

    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const kanViseSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe;

    const brukerNyKomponent = featureToggles['veientilarbeid.ny-standardvisning'];

    const kanViseKomponent =
        kanViseOnboarding14A({
            oppfolgingData,
            brukerInfoData,
            registreringData,
        }) && !brukerNyKomponent;

    useEffect(() => {
        setKvittering(new URLSearchParams(window.location.search).get('visKvittering') || '');
    }, []);

    useEffect(() => {
        setVisKvittering(finnKvitteringstype(kvittering) === 'behovsvurdering');
    }, [kvittering]);

    if (!kanViseKomponent) return null;
    if (visKvittering)
        return <BehovsvurderingKvittering kvittering={kvittering} onClose={() => setVisKvittering(false)} />;
    if (kanViseSituasjonsbestemt) return <SituasjonsbestemtKortbunke />;
    if (erStandardInnsatsgruppe) return <Kortbunke />;

    return null;
}

export default Onboarding14a;
