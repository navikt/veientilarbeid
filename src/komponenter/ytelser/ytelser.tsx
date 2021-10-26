import { useContext } from 'react';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import { AmplitudeContext } from '../../ducks/amplitude-context';

import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { erKSSBruker } from '../../lib/er-kss-bruker';

function Ytelser() {
    const { data: registreringData } = useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = useContext(Oppfolging.OppfolgingContext);
    const { data: featuretoggleData } = useContext(FeaturetoggleContext);
    const { data: brukerInfoData } = useContext(BrukerInfo.BrukerInfoContext);
    const amplitudeData = useContext(AmplitudeContext);
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    const erDetteKSSBruker = erKSSBruker({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });
    const kanViseKomponent = erStandardInnsatsgruppe && !erDetteKSSBruker;

    if (!kanViseKomponent) return null;

    return <div>Ytelser!</div>;
}

export default Ytelser;
