import * as React from 'react';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { useGlobaleInnstillinger } from '../../context/GlobaleInnstillinger';

interface Props {
    children: React.ReactElement<any>;
}

function KanViseVTA(props: Props) {
    const { data: oppfolgingData } = React.useContext(OppfolgingContext);
    const { data: registreringData } = React.useContext(BrukerregistreringContext);
    const { krevStandardInnsatsgruppe } = useGlobaleInnstillinger();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const kanViseKomponent = krevStandardInnsatsgruppe === true ? erStandardInnsatsgruppe : true;

    if (!kanViseKomponent) return null;

    return <>{props.children}</>;
}

export default KanViseVTA;
