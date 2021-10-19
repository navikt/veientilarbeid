import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
// import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import Kortbunke from './Kortbunke';
import React from 'react';

function Onboarding14A() {
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    // const erSituasjonsbestemtInnsatsgrupe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({ brukerregistreringData, oppfolgingData });

    if (erStandardInnsatsgruppe) {
        return <Kortbunke />;
    }
    return null;
}

export default Onboarding14A;
