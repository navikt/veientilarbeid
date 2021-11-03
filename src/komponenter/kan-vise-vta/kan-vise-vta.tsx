import * as React from 'react';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { BrukerregistreringContext } from '../../contexts/brukerregistrering';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { useGlobaleInnstillinger } from '../../contexts/GlobaleInnstillinger';

interface Props {
    children: React.ReactNode;
}

function KanViseVTA(props: Props) {
    const { data: oppfolgingData } = React.useContext(OppfolgingContext);
    const { data: registreringData } = React.useContext(BrukerregistreringContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const { kreverStandardInnsatsgruppe } = useGlobaleInnstillinger();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.kanViseUtfraSituasjon'];

    const kanViseKomponent = () => {
        if (!featuretoggleAktivert) return true;
        if (kreverStandardInnsatsgruppe === true && erStandardInnsatsgruppe) return true;
        if (kreverStandardInnsatsgruppe !== true && !erStandardInnsatsgruppe) return true;
        return false;
    };

    if (!kanViseKomponent()) return null;

    return props.children ? <>{props.children}</> : null;
}

export default KanViseVTA;
